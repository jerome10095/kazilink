import { Helmet } from 'react-helmet-async';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import MobileNav from './MobileNav';

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <title>KaziLink - Connect with Verified Workers &amp; Trusted Employers</title>
        <meta name="description" content="KaziLink connects skilled workers with trusted employers through verification, training, and ongoing support. Building trust in the workforce." />
        <meta name="keywords" content="workforce development, skilled workers, recruitment, verification, training" />
        <link rel="canonical" href="https://kazilink.com" />
        <meta property="og:title" content="KaziLink - Workforce Development Platform" />
        <meta property="og:description" content="Connect with verified workers and trusted employers. Build your career with confidence." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </div>
    </>
  );
}