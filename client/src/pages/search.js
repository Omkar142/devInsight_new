// client/src/pages/search.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSearchContentQuery } from '@/redux/services/contentApi';
import { setItems, setHasMore, setLoading, setError } from '@/redux/slices/contentSlice';
import { setSearchQuery } from '@/redux/slices/filterSlice';
import ContentList from '@/components/content/ContentList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Error from '@/components/ui/Error';

export default function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { q } = router.query;
  const { page } = useSelector((state) => state.content);
  const { data, error, isLoading } = useSearchContentQuery(
    { page, limit: 20, q },
    { skip: !q }
  );
  
  useEffect(() => {
    if (q) {
      dispatch(setSearchQuery(q));
    }
  }, [q, dispatch]);
  
  useEffect(() => {
    if (data) {
      dispatch(setItems(data.data));
      dispatch(setHasMore(data.currentPage < data.totalPages));
      dispatch(setLoading(isLoading));
    }
  }, [data, isLoading, dispatch]);
  
  useEffect(() => {
    if (error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch]);
  
  return (
    <>
      <Head>
        <title>{q ? `Search: ${q} - DevInsight` : 'Search - DevInsight'}</title>
        <meta
          name="description"
          content={`Search results for ${q || 'tech career content'}`}
        />
        <link
          rel="canonical"
          href={`https://devinsight-clone.vercel.app/search${q ? `?q=${q}` : ''}`}
        />
      </Head>
      
      <main className="pt-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            {q ? `Search results for "${q}"` : 'Search'}
          </h1>
          
          {isLoading && page === 1 ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <Error message={error.message} />
          ) : data?.data.length === 0 ? (
            <div className="text-center text-lg dark:text-gray-300">
              No results found for &quot;{q}&quot;
            </div>
          ) : (
            <ContentList />
          )}
        </div>
      </main>
    </>
  );
}