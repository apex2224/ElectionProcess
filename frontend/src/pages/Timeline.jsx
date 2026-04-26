import { useState } from 'react';

const electionCycles = {
  "lok-sabha-2024": {
    title: "Lok Sabha 2024",
    subtitle: "18th Prime Minister Election",
    events: [
      { date: "Mar 16", icon: "campaign", title: "Notification", desc: "ECI announces the schedule for the 18th Lok Sabha elections." },
      { date: "Apr 19", icon: "how_to_vote", title: "Phase 1 Polling", desc: "Voting begins across 102 constituencies in 21 states." },
      { date: "Jun 1", icon: "how_to_vote", title: "Phase 7 Polling", desc: "Final phase of voting concludes." },
      { date: "Jun 4", icon: "leaderboard", title: "Counting", desc: "Votes are counted and results are declared." }
    ]
  },
  "lok-sabha-2019": {
    title: "Lok Sabha 2019",
    subtitle: "17th Prime Minister Election",
    events: [
      { date: "Mar 10", icon: "campaign", title: "Notification", desc: "ECI announces the schedule for the 17th Lok Sabha elections." },
      { date: "Apr 11", icon: "how_to_vote", title: "Phase 1 Polling", desc: "Voting begins across 91 constituencies." },
      { date: "May 19", icon: "how_to_vote", title: "Phase 7 Polling", desc: "Final phase of voting concludes." },
      { date: "May 23", icon: "leaderboard", title: "Counting", desc: "Votes are counted and the NDA retains power." }
    ]
  },
  "lok-sabha-2014": {
    title: "Lok Sabha 2014",
    subtitle: "16th Prime Minister Election",
    events: [
      { date: "Mar 5", icon: "campaign", title: "Notification", desc: "ECI announces the schedule for the 16th Lok Sabha elections." },
      { date: "Apr 7", icon: "how_to_vote", title: "Polling Begins", desc: "9-phase voting process starts." },
      { date: "May 12", icon: "how_to_vote", title: "Polling Ends", desc: "Record-breaking 66.4% voter turnout recorded." },
      { date: "May 16", icon: "leaderboard", title: "Counting", desc: "NDA wins with a historic majority, forming the government." }
    ]
  },
  "lok-sabha-1999": {
    title: "Lok Sabha 1999",
    subtitle: "13th Prime Minister Election (Post-Kargil)",
    events: [
      { date: "Jul 11", icon: "campaign", title: "Notification", desc: "Elections called after the fall of the previous government." },
      { date: "Sep 5", icon: "how_to_vote", title: "Polling Begins", desc: "Voting starts shortly after the Kargil conflict." },
      { date: "Oct 3", icon: "how_to_vote", title: "Polling Ends", desc: "Month-long electoral process concludes." },
      { date: "Oct 6", icon: "leaderboard", title: "Counting", desc: "NDA secures a stable majority to form the government." }
    ]
  },
  "lok-sabha-1977": {
    title: "Lok Sabha 1977",
    subtitle: "6th Prime Minister Election (Post-Emergency)",
    events: [
      { date: "Jan 18", icon: "campaign", title: "Emergency Lifted", desc: "Elections called shortly after the lifting of the Emergency." },
      { date: "Mar 16", icon: "how_to_vote", title: "Polling Begins", desc: "A massive wave of voting across the nation." },
      { date: "Mar 20", icon: "how_to_vote", title: "Polling Ends", desc: "High voter turnout observed." },
      { date: "Mar 22", icon: "leaderboard", title: "Counting", desc: "Historic shift in power as the Janata Party wins." }
    ]
  },
  "lok-sabha-1951": {
    title: "Lok Sabha 1951-52",
    subtitle: "1st General Elections of Independent India",
    events: [
      { date: "Oct 25, 1951", icon: "campaign", title: "Polling Begins", desc: "The first ever democratic election of independent India starts in Himachal Pradesh." },
      { date: "Dec 1951", icon: "how_to_vote", title: "Mass Voting", desc: "Millions vote for the first time using ballot boxes of different colors." },
      { date: "Feb 21, 1952", icon: "how_to_vote", title: "Polling Ends", desc: "The 4-month long electoral exercise comes to an end." },
      { date: "May 13, 1952", icon: "leaderboard", title: "First Session", desc: "The first Lok Sabha officially convenes." }
    ]
  },
  "state-up-2022": {
    title: "Uttar Pradesh 2022",
    subtitle: "Chief Minister Election",
    events: [
      { date: "Jan 8", icon: "campaign", title: "Notification", desc: "ECI announces 7-phase election for UP Assembly." },
      { date: "Feb 10", icon: "how_to_vote", title: "Phase 1", desc: "Polling begins in Western UP." },
      { date: "Mar 7", icon: "how_to_vote", title: "Phase 7", desc: "Final phase of voting concludes." },
      { date: "Mar 10", icon: "leaderboard", title: "Counting", desc: "BJP retains power with absolute majority." }
    ]
  },
  "state-assembly-recent": {
    title: "State Assemblies 2023",
    subtitle: "Chief Minister Elections (MP, Rajasthan, CG)",
    events: [
      { date: "Oct 9", icon: "campaign", title: "Notification", desc: "ECI announces the schedule for 5 state assemblies." },
      { date: "Nov 7", icon: "how_to_vote", title: "Polling Begins", desc: "First phase of polling starts in Chhattisgarh and Mizoram." },
      { date: "Nov 30", icon: "how_to_vote", title: "Polling Ends", desc: "Final polling takes place in Telangana." },
      { date: "Dec 3", icon: "leaderboard", title: "Counting", desc: "Votes are counted for the major states." }
    ]
  }
};

const Timeline = () => {
  const [selectedCycle, setSelectedCycle] = useState("lok-sabha-2024");
  const cycleData = electionCycles[selectedCycle];

  return (
    <div className="selection:bg-secondary selection:text-on-secondary min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 w-fit">
              Sovereign Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-4">
              Electoral <span className="text-secondary">Continuum</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md font-body leading-relaxed mb-8">
              The strategic roadmap of the election cycles. Driven by
              AI-powered real-time tracking.
            </p>
            
            {/* Cycle Selector */}
            <div className="relative w-full max-w-xs">
              <select 
                value={selectedCycle}
                onChange={(e) => setSelectedCycle(e.target.value)}
                className="w-full appearance-none bg-surface-variant/40 border border-white/10 text-on-surface font-headline font-bold text-base md:text-lg rounded-xl px-4 md:px-6 py-4 outline-none focus:border-secondary transition-colors cursor-pointer"
              >
                <optgroup label="Recent Lok Sabha (PM)" className="bg-[#0a192f] text-secondary font-bold">
                  <option value="lok-sabha-2024" className="bg-[#1b3656] text-on-surface">Lok Sabha 2024</option>
                  <option value="lok-sabha-2019" className="bg-[#1b3656] text-on-surface">Lok Sabha 2019</option>
                  <option value="lok-sabha-2014" className="bg-[#1b3656] text-on-surface">Lok Sabha 2014</option>
                </optgroup>
                <optgroup label="Historic Lok Sabha (PM)" className="bg-[#0a192f] text-secondary font-bold">
                  <option value="lok-sabha-1999" className="bg-[#1b3656] text-on-surface">Lok Sabha 1999 (Kargil)</option>
                  <option value="lok-sabha-1977" className="bg-[#1b3656] text-on-surface">Lok Sabha 1977 (Emergency)</option>
                  <option value="lok-sabha-1951" className="bg-[#1b3656] text-on-surface">Lok Sabha 1951 (First Election)</option>
                </optgroup>
                <optgroup label="State Assemblies (CM)" className="bg-[#0a192f] text-secondary font-bold">
                  <option value="state-assembly-recent" className="bg-[#1b3656] text-on-surface">Recent States (MP, RJ, CG - 2023)</option>
                  <option value="state-up-2022" className="bg-[#1b3656] text-on-surface">Uttar Pradesh 2022</option>
                </optgroup>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                expand_more
              </span>
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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-2">{cycleData.title}</h2>
          <p className="text-secondary uppercase tracking-widest text-sm font-bold">{cycleData.subtitle}</p>
        </div>

        {/* Timeline Section */}
        <section className="relative">
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
      </main>
    </div>
  );
};

export default Timeline;
