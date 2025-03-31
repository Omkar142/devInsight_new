// client/src/components/content/ContentList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { incrementPage } from '@/redux/slices/contentSlice';
import ContentCard from './ContentCard';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ContentList() {
  const dispatch = useDispatch();
  const { items, hasMore, isLoading } = useSelector((state) => state.content);
  
  const fetchMoreData = () => {
    if (!isLoading && hasMore) {
      dispatch(incrementPage());
    }
  };
  
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-6">
          <LoadingSpinner />
        </div>
      }
      endMessage={
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          {items.length > 0
            ? "You've seen all the content!"
            : "No content available."}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ContentCard key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}