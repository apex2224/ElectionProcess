import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NearPoll = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dynamicBooths, setDynamicBooths] = useState([]);

  useEffect(() => {
    if (search.length < 3 || selectedLocation?.display_name === search) {
      return;
    }
    
    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&countrycodes=in&format=json&limit=5`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
          setIsSearching(false);
        })
        .catch(err => {
          console.error(err);
          setIsSearching(false);
        });
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedLocation]);

  const handleSelect = (suggestion) => {
    setSearch(suggestion.display_name);
    setSuggestions([]);
    setSelectedLocation(suggestion);
    setHasSearched(true);
    
    const locName = suggestion.display_name.split(',')[0];
    setDynamicBooths([
      {
        id: 1,
        name: `Govt. Senior Secondary School, ${locName}`,
        address: `Room No. 4, Block A, ${locName} Main Road`,
        distance: "0.8 km",
        waitTime: "15 mins",
        waitLevel: "low",
        facilities: ["wheelchair", "water_drop", "wc"]
      },
      {
        id: 2,
        name: `Community Center, Near ${locName}`,
        address: `Near Central Park, ${locName}`,
        distance: "1.2 km",
        waitTime: "45 mins",
        waitLevel: "high",
        facilities: ["water_drop", "wc"]
      },
      {
        id: 3,
        name: `Municipal Primary School, ${locName}`,
        address: `Street No. 5, ${locName}`,
        distance: "2.5 km",
        waitTime: "5 mins",
        waitLevel: "low",
        facilities: ["wheelchair", "water_drop", "medical_services"]
      }
    ]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="pt-32 pb-20 px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="material-symbols-outlined text-secondary text-5xl mb-4">pin_drop</span>
          <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-4">Find Your Polling Booth</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Locate your designated polling station, check real-time queue lengths, and find accessible facilities near you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative z-50">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text" 
              placeholder="Enter your Pincode, City or Locality..."
              className="w-full bg-surface-container-high border border-white/10 rounded-full px-8 py-5 text-lg text-on-surface focus:outline-none focus:border-secondary shadow-2xl transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value.length < 3) {
                  setSuggestions([]);
                }
              }}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 bg-secondary text-on-secondary px-8 rounded-full font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSearching ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">search</span>
                  Search
                </>
              )}
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface-container-highest border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-refraction"
              >
                {suggestions.map((sug, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleSelect(sug)}
                    className="px-6 py-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 flex items-center gap-3 transition-colors"
                  >
                    <span className="material-symbols-outlined text-secondary opacity-70">location_on</span>
                    <span className="text-on-surface text-sm">{sug.display_name}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasSearched && selectedLocation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Booths List */}
            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold text-slate-300 mb-6">Nearby Stations ({dynamicBooths.length})</h3>
              
              {dynamicBooths.map((booth, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={booth.id} 
                  className="bg-surface-container-high rounded-2xl p-6 glass-refraction border border-white/5 hover:border-secondary/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-secondary transition-colors">{booth.name}</h4>
                      <p className="text-sm text-on-surface-variant mt-1">{booth.address}</p>
                    </div>
                    <div className="bg-surface-variant px-3 py-1 rounded-full text-sm font-bold text-secondary border border-secondary/20">
                      {booth.distance}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                    {/* Wait Time Indicator */}
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${booth.waitLevel === 'high' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        schedule
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        Wait: <span className={booth.waitLevel === 'high' ? 'text-rose-400' : 'text-emerald-400'}>{booth.waitTime}</span>
                      </span>
                    </div>

                    {/* Facilities */}
                    <div className="flex gap-2 text-slate-400">
                      {booth.facilities.map(fac => (
                        <span key={fac} className="material-symbols-outlined text-sm" title={fac}>
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Map */}
            <div className="bg-surface-container-high rounded-3xl border border-white/5 overflow-hidden h-[600px] relative glass-refraction group shadow-2xl">
              <iframe 
                src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}&z=14&output=embed`}
                className="w-full h-full border-0 absolute inset-0 mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" 
                allowFullScreen 
                loading="lazy">
              </iframe>
              <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-transparent transition-colors duration-700"></div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-background/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl font-headline tracking-widest text-sm uppercase font-bold text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Live Map Connected
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NearPoll;
