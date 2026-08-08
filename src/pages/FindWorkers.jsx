import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import WorkerCard from '../components/ui/WorkerCard';
import { workers } from '../data';
import { Search, Filter, X } from 'lucide-react';

export default function FindWorkers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    trade: '',
    location: '',
    rating: '',
  });

  const trades = [...new Set(workers.map(w => w.trade))];
  const locations = [...new Set(workers.map(w => w.location))];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.trade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrade = !filters.trade || worker.trade === filters.trade;
    const matchesLocation = !filters.location || worker.location === filters.location;
    const matchesRating = !filters.rating || worker.rating >= parseFloat(filters.rating);
    return matchesSearch && matchesTrade && matchesLocation && matchesRating;
  });

  const clearFilters = () => {
    setFilters({ trade: '', location: '', rating: '' });
    setSearchTerm('');
  };

  return (
    <>
      <Helmet>
        <title>Find Verified Workers - KaziLink</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Find Workers</span>
              <h1 className="heading-xl mt-2">Find Verified Workers</h1>
              <p className="text-lg text-ink/60 mt-4">
                Search our directory of verified, skilled workers ready to work.
              </p>
            </div>
          </Reveal>

          {/* Search & Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or trade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={filters.trade}
                  onChange={(e) => setFilters({ ...filters, trade: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-paper-dim bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">All Trades</option>
                  {trades.map(trade => (
                    <option key={trade} value={trade}>{trade}</option>
                  ))}
                </select>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-paper-dim bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-paper-dim bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">⭐ 4.5+</option>
                  <option value="4.0">⭐ 4.0+</option>
                  <option value="3.5">⭐ 3.5+</option>
                </select>
                {(searchTerm || filters.trade || filters.location || filters.rating) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 rounded-xl border border-paper-dim hover:bg-paper-dim transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-ink/60 mb-6">
              Found {filteredWorkers.length} worker{filteredWorkers.length !== 1 ? 's' : ''}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <Reveal key={worker.id}>
                  <WorkerCard worker={worker} />
                </Reveal>
              ))}
            </div>
            {filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-ink/60">No workers found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary-500 font-medium mt-2 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}