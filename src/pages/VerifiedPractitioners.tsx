import React, { useState, useEffect } from 'react';
import { api } from '../api/data';
import { Search, Star, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifiedPractitioners = () => {
  const [practitioners, setPractitioners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPracs = async () => {
      setLoading(true);
      const data = await api.getPractitioners({ verifiedOnly: true });
      setPractitioners(data);
      setLoading(false);
    };
    fetchPracs();
  }, []);

  const filteredPractitioners = practitioners.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
       <header className="mb-6">
        <h1 className="text-3xl font-serif text-primary font-bold">Verified Database</h1>
        <p className="text-stone text-sm mt-1">Insforge Verified Ruqyah & Hijama Practitioners</p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p>Scanning Verification Database...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPractitioners.length === 0 ? (
            <div className="text-center py-10 text-stone">
              <p>No verified practitioners found matching your criteria.</p>
            </div>
          ) : (
            filteredPractitioners.map((prac) => (
              <div key={prac.id} className="card-natural p-5 flex flex-col sm:flex-row gap-5">
                <div className="w-20 h-20 bg-sand rounded-2xl shrink-0 flex items-center justify-center font-serif text-2xl text-primary italic">
                  {prac.name.charAt(0)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-charcoal flex items-center gap-2">
                        {prac.name}
                        <ShieldCheck size={18} className="text-blue-500" />
                      </h3>
                      <p className="text-sm font-medium text-primary">{prac.type}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-sand px-2 py-1 rounded-lg">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold">{prac.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone">
                    <span className="flex items-center gap-1"><MapPin size={12} /> Global (Online)</span>
                    <span className={`flex items-center gap-1 ${prac.available ? 'text-green-600' : 'text-amber-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${prac.available ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      {prac.available ? 'Available Now' : 'Booked'}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border mt-3 flex justify-end">
                    <Link to={`/booking/${prac.type.toLowerCase().includes('hijama') ? 'hijama' : 'ruqyah'}`} className="btn-natural py-2 px-4 flex items-center gap-2">
                      <Calendar size={16} /> Book Session
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VerifiedPractitioners;
