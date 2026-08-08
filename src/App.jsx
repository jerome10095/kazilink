import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import FindWorkers from './pages/FindWorkers';
import Employers from './pages/Employers';
import SuccessStories from './pages/SuccessStories';
import Training from './pages/Training';
import Impact from './pages/Impact';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/services" element={<Services />} />
            <Route path="/find-workers" element={<FindWorkers />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/training" element={<Training />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;