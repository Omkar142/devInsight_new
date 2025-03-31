// client/src/components/layout/Footer.js
import Link from 'next/link';
import { FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-600 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} DevInsight Clone. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              A content aggregator for tech career resources.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/devinsight-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition"
              aria-label="GitHub repository"
            >
              <FiGithub size={20} />
            </a>
            
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              Built with <FiHeart className="text-red-500 mx-1" size={14} /> as a clone project
            </span>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-500 text-center">
          <p>
            DevInsight is a content aggregator that links to original sources.
            All content belongs to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}