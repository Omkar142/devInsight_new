import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  const handleSearch = (query) => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-primary-500 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                D
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">evInsight</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex space-x-4 items-center">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
