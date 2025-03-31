import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContentCard from '../components/ContentCard';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      setLoading(true);
      fetch(`/api/content?search=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Search error:', err);
          setLoading(false);
        });
    }
  }, [q]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{q}"
      </h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(item => (
            <ContentCard key={item._id} content={item} />
          ))}
        </div>
      )}
    </div>
  );
}
