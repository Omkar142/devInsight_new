import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>DevInsight - Tech Career Intelligence</title>
        <meta name="description" content="Latest insights for tech careers" />
      </Head>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
