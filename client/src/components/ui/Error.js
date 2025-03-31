// client/src/components/ui/Error.js
import { FiAlertCircle } from 'react-icons/fi';

export default function Error({ message }) {
  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FiAlertCircle className="h-5 w-5 text-red-400 dark:text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-400">Error</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            {message || 'An error occurred. Please try again later.'}
          </div>
        </div>
      </div>
    </div>
  );
}
