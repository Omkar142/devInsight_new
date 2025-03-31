// client/src/components/ui/NoResults.js
import { FiSearch } from 'react-icons/fi';

export default function NoResults({ query }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-600 mb-4">
        <FiSearch className="h-8 w-8 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No results found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        {query
          ? `We couldn't find any results for "${query}". Try different keywords or filters.`
          : 'No content available for the selected filters.'}
      </p>
    </div>
  );
}