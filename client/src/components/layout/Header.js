// client/src/components/layout/Header.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { setDarkMode } from '@/redux/slices/uiSlice';
import { setActiveFilter, setSearchQuery, resetFilters } from '@/redux/slices/filterSlice';
import { resetContent } from '@/redux/slices/contentSlice';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkMode } = useSelector((state) => state.ui);
  const { activeFilter, searchQuery } = useSelector((state) => state.filter);
  const [searchInput, setSearchInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);
  
  const handleFilterClick = (filter) => {
    dispatch(resetContent());
    dispatch(setActiveFilter(filter));
    
    if (filter === 'all') {
      dispatch(resetFilters());
    } else {
      dispatch(setCategory(filter));
    }
    
    router.push('/');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchInput.trim()) {
      dispatch(resetContent());
      dispatch(setSearchQuery(searchInput));
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };
  
  const toggleTheme = () => {
    dispatch(setDarkMode(!isDarkMode));
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-dark-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => dispatch(resetFilters())}>
            <span className="text-2xl font-bold text-primary-500 dark:text-primary-300">
              DevInsight
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <button
              className={`px-2 py-1 rounded-md ${
                activeFilter === 'all'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleFilterClick('all')}
            >
              All
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                activeFilter === 'interview'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleFilterClick('interview')}
            >
              Interview Experiences
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                activeFilter === 'salary'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleFilterClick('salary')}
            >
              Salary Data
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                activeFilter === 'review'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleFilterClick('review')}
            >
              Company Reviews
            </button>
            <button
              className={`px-2 py-1 rounded-md ${
                activeFilter === 'news'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => handleFilterClick('news')}
            >
              Tech News
            </button>
          </nav>
          
          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 pr-4 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 w-40 md:w-48"
              />
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FiSearch size={16} />
              </button>
            </form>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-600"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FiSun className="text-yellow-400" size={20} />
              ) : (
                <FiMoon className="text-gray-700" size={20} />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-dark-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-gray-700 dark:text-gray-300" size={20} />
              ) : (
                <FiMenu className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'all'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('all');
                toggleMenu();
              }}
            >
              All
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'interview'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('interview');
                toggleMenu();
              }}
            >
              Interview Experiences
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'salary'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('salary');
                toggleMenu();
              }}
            >
              Salary Data
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'review'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('review');
                toggleMenu();
              }}
            >
              Company Reviews
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'news'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('news');
                toggleMenu();
              }}
            >
              Tech News
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'hiring'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('hiring');
                toggleMenu();
              }}
            >
              Hiring Now
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'tech'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('tech');
                toggleMenu();
              }}
            >
              Tech Stack
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeFilter === 'discussion'
                  ? 'text-primary-500 dark:text-primary-300 font-semibold bg-gray-100 dark:bg-dark-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                handleFilterClick('discussion');
                toggleMenu();
              }}
            >
              Discussions
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}