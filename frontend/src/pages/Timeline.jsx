import { useState, useEffect } from 'react';

const INDIAN_STATES = [
  "National (Lok Sabha)",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir"
];

// Generate years from 1951 to 2026
const YEARS = Array.from({length: 2026 - 1951 + 1}, (_, i) => 2026 - i);

const Timeline = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedRegion, setSelectedRegion] = useState("National (Lok Sabha)");
  
  const [cycleData, setCycleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTimelineData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: selectedYear, region: selectedRegion })
      });

      const data = await response.json();
      
      if (response.ok) {
        setCycleData(data);
      } else {
        setError(data.error || 'Failed to fetch timeline data');
      }
    } catch (err) {
      setError('Connection to Intelligence Engine failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchTimelineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="selection:bg-secondary selection:text-on-secondary min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 w-fit animate-pulse">
              AI Historical Engine Active
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-4">
              Electoral <span className="text-secondary">Continuum</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md font-body leading-relaxed mb-8">
              Access the Sovereign Database. Generate historical insights for any election in India from 1951 to 2026.
            </p>
            
            {/* AI Selector Controls */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
              <div className="relative flex-1">
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full appearance-none bg-surface-variant/40 border border-white/10 text-on-surface font-headline font-bold text-base md:text-lg rounded-xl px-4 py-4 outline-none focus:border-secondary transition-colors cursor-pointer"
                >
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state} className="bg-[#0a192f]">{state}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                  public
                </span>
              </div>
              
              <div className="relative w-full md:w-32">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none bg-surface-variant/40 border border-white/10 text-on-surface font-headline font-bold text-base md:text-lg rounded-xl px-4 py-4 outline-none focus:border-secondary transition-colors cursor-pointer"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year} className="bg-[#0a192f]">{year}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                  calendar_today
                </span>
              </div>
              
              <button 
                onClick={fetchTimelineData}
                disabled={isLoading}
                className="bg-secondary text-on-secondary px-6 py-4 rounded-xl font-bold font-headline uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">sync</span>
                ) : (
                  <span className="material-symbols-outlined">manage_search</span>
                )}
                <span className="hidden md:inline">{isLoading ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
            
          </div>
          <div className="relative hidden md:block h-[400px] rounded-xl overflow-hidden shadow-2xl glass-refraction">
            <img
              alt="Indian EVM Machine"
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
              src="/images/timeline.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Dynamic Title Header */}
        {cycleData && !isLoading && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-2">{cycleData.title}</h2>
            <p className="text-secondary uppercase tracking-widest text-sm font-bold">{cycleData.subtitle}</p>
          </div>
        )}

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-80">
            <span className="material-symbols-outlined text-secondary text-6xl animate-spin mb-6">cycle</span>
            <h3 className="text-2xl font-headline text-on-surface">Synthesizing Historical Archives...</h3>
            <p className="text-on-surface-variant mt-2">The Intelligence Engine is analyzing {selectedRegion} data for {selectedYear}.</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-error text-6xl mb-6">warning</span>
            <h3 className="text-2xl font-headline text-on-surface">{error}</h3>
          </div>
        )}

        {/* Timeline Section */}
        {!isLoading && cycleData && cycleData.events && (
          <section className="relative animate-fade-in">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-secondary to-transparent hidden md:block opacity-80"></div>

            <div className="space-y-16 relative">
              {cycleData.events.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                    {isEven ? (
                      <>
                        <div className="w-full md:w-1/2 flex md:justify-end md:pr-20">
                          <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px] border border-white/5 hover:border-secondary/30">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-secondary font-display font-bold text-lg">{event.date}</span>
                              <span className="material-symbols-outlined text-secondary text-3xl">{event.icon}</span>
                            </div>
                            <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">{event.title}</h3>
                            <p className="text-on-surface-variant font-body leading-relaxed">{event.desc}</p>
                          </div>
                        </div>
                        <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block ring-4 ring-background"></div>
                        <div className="w-full md:w-1/2 md:pl-20"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-full md:w-1/2 md:pr-20"></div>
                        <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block ring-4 ring-background"></div>
                        <div className="w-full md:w-1/2 flex md:pl-20">
                          <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px] border border-white/5 hover:border-secondary/30">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-secondary font-display font-bold text-lg">{event.date}</span>
                              <span className="material-symbols-outlined text-secondary text-3xl">{event.icon}</span>
                            </div>
                            <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">{event.title}</h3>
                            <p className="text-on-surface-variant font-body leading-relaxed">{event.desc}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Timeline;
