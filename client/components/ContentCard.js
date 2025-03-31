export default function ContentCard({ content }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {content.source}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          <a href={content.url} target="_blank" rel="noopener noreferrer">
            {content.title}
          </a>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {content.snippet}
        </p>
        <div className="flex flex-wrap gap-2">
          {content.categories?.map(category => (
            <span key={category} className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
