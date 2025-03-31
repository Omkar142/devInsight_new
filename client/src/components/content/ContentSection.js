// client/src/components/content/ContentSection.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { toggleSection } from '@/redux/slices/uiSlice';
import { useFilterContentQuery } from '@/redux/services/contentApi';
import { setItems, setHasMore } from '@/redux/slices/contentSlice';
import ContentCard from './ContentCard';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ContentSection({ title, category }) {
  const dispatch = useDispatch();
  const { expandedSections } = useSelector((state) => state.ui);
  const isExpanded = expandedSections[category];
  const { page } = useSelector((state) => state.content);
  
  const { data, error, isLoading } = useFilterContentQuery(
    { page: 1, limit: 10, category },
    { skip: !isExpanded }
  );
  
  const [sectionItems, setSectionItems] = useState([]);
  
  useEffect(() => {
    if (data && isExpanded) {
      setSectionItems(data.data);
    }
  }, [data, isExpanded]);
  
  const handleToggle = () => {
    dispatch(toggleSection(category));
  };
  
  return (
    <section className="mb-8">
      <div
        className="flex items-center justify-between py-3 px-4 bg-gray-100 dark:bg-dark-600 rounded-lg mb-4 cursor-pointer"
        onClick={handleToggle}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        <button
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-500"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? (
            <FiChevronUp className="text-gray-600 dark:text-gray-300" size={20} />
          ) : (
            <FiChevronDown className="text-gray-600 dark:text-gray-300" size={20} />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="transition-all duration-300 ease-in-out">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-500 dark:text-red-400">
              Error loading content: {error.message}
            </div>
          ) : sectionItems.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No content available in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionItems.map((item) => (
                <ContentCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}