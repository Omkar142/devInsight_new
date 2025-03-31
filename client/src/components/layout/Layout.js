// client/src/components/layout/Layout.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'next-themes';
import { setDarkMode } from '@/redux/slices/uiSlice';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.ui);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, setTheme]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setDarkMode(savedTheme === 'dark'));
    }
  }, [dispatch]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
