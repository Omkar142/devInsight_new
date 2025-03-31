import { useEffect, useState, useCallback, useRef } from 'react';
import ContentCard from '../components/ContentCard';
import Link from 'next/link';

export default function Home() {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const observer = useRef();

  const fetchContent = async (pageNum = 1, search = '') => {
    try {
      setLoading(true);
      const response = await fetch(`/api/content?page=${pageNum}&limit=9&search=${search}`);
      const data = await response.json();
      
      // Ensure data is an array
      const contentArray = Array.isArray(data) ? data : [];
      
      if (pageNum === 1) {
        setContents(contentArray);
      } else {
        setContents(prev => [...prev, ...contentArray]);
      }
      setHasMore(contentArray.length === 9); // If we got less than 9 items, there's no more
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchContent(1, query);
  };

  // Periodic refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchContent(1, searchQuery);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [searchQuery]);

  // Initial load
  useEffect(() => {
    fetchContent(1, searchQuery);
  }, [searchQuery]);

  // Infinite scroll setup
  const lastContentRef = useCallback(node => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Add debounce to prevent multiple calls
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
          fetchContent(page + 1, searchQuery);
        }, 300);
      }
    }, {
      rootMargin: '100px', // Load earlier to prevent bounce
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, searchQuery]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'interview', label: 'Interviews' },
    { id: 'salary', label: 'Salary' },
    { id: 'tech', label: 'Tech' },
    { id: 'reddit', label: 'Reddit' },
    { id: 'news', label: 'News' },
    { id: 'hiring', label: 'Hiring' }
  ];

  const filteredContents = contents.filter(content => 
    selectedCategory === 'all' || content.categories?.includes(selectedCategory)
  );

  const getContentByCategory = (category) => {
    return selectedCategory === 'all' 
      ? contents.filter(content => content.categories?.includes(category)).slice(0, 3)
      : filteredContents;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Tech Career Insights</h1>
        
        {/* Category Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>Error: {error}</p>
          </div>
        )}

        {selectedCategory === 'all' ? (
          // Show sections when 'all' is selected
          categories.slice(1).map(category => {
            const categoryContent = getContentByCategory(category.id);
            if (!categoryContent.length) return null;

            return (
              <section key={category.id} className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {category.label}
                  </h2>
                  <Link 
                    href={`/category/${category.id}`}
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryContent.map((item, index) => (
                    <div 
                      ref={index === categoryContent.length - 1 ? lastContentRef : null}
                      key={item._id}
                    >
                      <ContentCard content={item} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          // Show filtered content when a specific category is selected
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((item, index) => (
              <div 
                ref={index === filteredContents.length - 1 ? lastContentRef : null}
                key={item._id}
              >
                <ContentCard content={item} />
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
