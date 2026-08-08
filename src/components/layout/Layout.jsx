import { Helmet } from 'react-helmet-async';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <title>KaziLink - Connect with Verified Workers & Trusted Employers</title>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}