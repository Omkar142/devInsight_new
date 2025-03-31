// client/src/pages/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useGetContentQuery } from '@/redux/services/contentApi';
import { setItems, setHasMore, setLoading, setError } from '@/redux/slices/contentSlice';
import ContentSection from '@/components/content/ContentSection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Error from '@/components/ui/Error';

export default function Home() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.content);
  const { data, error, isLoading } = useGetContentQuery({ page, limit: 20 });
  
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
        <title>DevInsight - Tech Career Content Aggregator</title>
        <meta
          name="description"
          content="Discover tech career content from LeetCode, Reddit, Stack Overflow and more"
        />
        <meta
          name="keywords"
          content="tech careers, software engineer, interview preparation, coding interview, salary negotiation"
        />
        <link rel="canonical" href="https://devinsight-clone.vercel.app" />
        
        {/* Schema.org markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DevInsight',
              url: 'https://devinsight-clone.vercel.app',
              description: 'Tech career content aggregator',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://devinsight-clone.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>
      
      <main>
        {isLoading && page === 1 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <Error message={error.message} />
        ) : (
          <>
            <ContentSection
              title="Interview Experiences"
              category="interview"
            />
            
            <ContentSection
              title="Salary Data"
              category="salary"
            />
            
            <ContentSection
              title="Company Reviews"
              category="review"
            />
            
            <ContentSection
              title="Tech News"
              category="news"
            />
            
            <ContentSection
              title="Hiring Now"
              category="hiring"
            />
            
            <ContentSection
              title="Tech Stack"
              category="tech"
            />
            
            <ContentSection
              title="Discussions"
              category="discussion"
            />
          </>
        )}
      </main>
    </>
  );
}