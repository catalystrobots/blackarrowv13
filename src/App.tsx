import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { BlogPage } from './components/BlogPage';
import { TechnologyPage } from './components/TechnologyPage';
import { AboutPage } from './components/AboutPage';
import { InstantQuoteForm } from './components/InstantQuote/InstantQuoteForm';
import { QuoteForm } from './components/QuoteForm';
import { CheckoutPage } from './components/Checkout/CheckoutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/instant-quote" element={<InstantQuoteForm />} />
          <Route path="/quote" element={<QuoteForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}