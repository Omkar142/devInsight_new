// client/src/components/content/ContentCard.js
import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiArrowUpRight, FiStar, FiTag } from 'react-icons/fi';
import { GrReddit } from 'react-icons/gr';
import { SiLeetcode, SiStackoverflow, SiHackernews } from 'react-icons/si';

export default function ContentCard({ item }) {
  const {
    _id,
    title,
    url,
    source,
    snippet,
    date,
    categories,
    tags,
    metadata,
  } = item;
  
  // Generate source initials for the badge
  const getSourceInitials = (source) => {
    switch (source) {
      case 'leetcode':
        return 'LC';
      case 'reddit':
        return 'RD';
      case 'stackoverflow':
        return 'SO';
      case 'hackernews':
        return 'HN';
      case 'news':
        return 'NW';
      default:
        return source.substring(0, 2).toUpperCase();
    }
  };
  
  // Get source icon
  const getSourceIcon = (source) => {
    switch (source) {
      case 'leetcode':
        return <SiLeetcode className="text-yellow-500" size={16} />;
      case 'reddit':
        return <GrReddit className="text-orange-500" size={16} />;
      case 'stackoverflow':
        return <SiStackoverflow className="text-orange-400" size={16} />;
      case 'hackernews':
        return <SiHackernews className="text-orange-600" size={16} />;
      default:
        return null;
    }
  };
  
  // Get color for the source badge
  const getSourceColor = (source) => {
    switch (source) {
      case 'leetcode':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reddit':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'stackoverflow':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'hackernews':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'news':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white dark:bg-dark-600 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        <div className="p-4 flex-grow">
          {/* Source and Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${getSourceColor(source)}`}>
                {getSourceInitials(source)}
              </div>
              <div className="flex items-center">
                {getSourceIcon(source)}
                <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {source.charAt(0).toUpperCase() + source.slice(1)}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(date), 'MMM d, yyyy')}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">
            {title}
          </h3>
          
          {/* Snippet */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {snippet}
          </p>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-dark-500 dark:text-gray-300"
                >
                  <FiTag className="mr-1" size={12} />
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-dark-500 dark:text-gray-300">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Metadata */}
          {source === 'reddit' && metadata?.upvotes && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{metadata.upvotes}</span> upvotes in r/{metadata.subreddit}
            </div>
          )}
          
          {source === 'stackoverflow' && metadata?.score !== undefined && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{metadata.score}</span> votes • {metadata.viewCount} views
            </div>
          )}
          
          {source === 'leetcode' && metadata?.companies && metadata.companies.length > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Companies: {metadata.companies.join(', ')}
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 border-t border-gray-100 dark:border-dark-500 flex justify-between items-center">
          <div className="text-xs text-primary-500 dark:text-primary-400 font-medium flex items-center">
            View Original
            <FiArrowUpRight className="ml-1" size={14} />
          </div>
          
          {/* Category badge */}
          {categories && categories.length > 0 && (
            <span className="text-xs px-2 py-1 rounded bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {categories[0].charAt(0).toUpperCase() + categories[0].slice(1)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}