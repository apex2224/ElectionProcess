const Timeline = () => {
  return (
    <div className="selection:bg-secondary selection:text-on-secondary min-h-screen">
      <main className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 w-fit">
              Sovereign Intelligence
            </span>
            <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-none mb-8">
              Electoral <span className="text-secondary">Continuum</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md font-body leading-relaxed">
              The strategic roadmap of the current election cycle. Driven by
              AI-powered real-time tracking and predictive outcome modeling.
            </p>
          </div>
          <div className="relative hidden md:block h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <img
              alt="Data Analysis"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-secondary to-transparent hidden md:block opacity-80"></div>

          <div className="space-y-16 relative">
            {/* Step 1: Notification */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 flex md:justify-end md:pr-20">
                <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary font-display font-bold text-lg">
                      Oct 10
                    </span>
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      campaign
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                    Notification
                  </h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Official issuance of the election notification, formalizing
                    the commencement of the process.
                  </p>
                </div>
              </div>
              <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block"></div>
              <div className="w-full md:w-1/2 md:pl-20"></div>
            </div>

            {/* Step 2: Nomination */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 md:pr-20"></div>
              <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block"></div>
              <div className="w-full md:w-1/2 flex md:pl-20">
                <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary font-display font-bold text-lg">
                      Oct 15
                    </span>
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      assignment_ind
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                    Nomination
                  </h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Deadline for candidates to file their nomination papers and
                    legal disclosures.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Scrutiny */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 flex md:justify-end md:pr-20">
                <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary font-display font-bold text-lg">
                      Oct 20
                    </span>
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      fact_check
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                    Scrutiny
                  </h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Examination of nominations by the commission to ensure all
                    criteria are strictly met.
                  </p>
                </div>
              </div>
              <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block"></div>
              <div className="w-full md:w-1/2 md:pl-20"></div>
            </div>

            {/* Step 4: Campaigning */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 md:pr-20"></div>
              <div className="z-10 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden md:block"></div>
              <div className="w-full md:w-1/2 flex md:pl-20">
                <div className="bg-surface-variant/40 backdrop-blur-xl rounded-xl p-8 w-full max-w-md shadow-2xl transition-all hover:translate-y-[-4px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary font-display font-bold text-lg">
                      Oct 25
                    </span>
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      record_voice_over
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                    Campaigning
                  </h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Official campaign window opens. Real-time narrative tracking
                    active via ElectionIQ nodes.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5: Polling Day (ACTIVE) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 flex md:justify-end md:pr-20">
                <div className="bg-surface-container-highest backdrop-blur-3xl rounded-xl p-10 w-full max-w-md ring-4 ring-secondary/40 shadow-[0_0_40px_rgba(244,196,48,0.3)] transform scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-secondary font-display font-extrabold text-2xl">
                        Nov 5
                      </span>
                      <span className="text-xs uppercase tracking-widest text-secondary opacity-80">
                        Live Now
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-5xl">
                      how_to_vote
                    </span>
                  </div>
                  <h3 className="text-3xl font-headline font-extrabold text-on-surface mb-4">
                    Polling Day
                  </h3>
                  <p className="text-on-surface font-body leading-relaxed text-lg mb-6">
                    Global focus shift. Digital surveillance of booth turnouts
                    and sentiment volatility indicators.
                  </p>
                  <button className="w-full py-4 rounded-full bg-secondary text-on-secondary font-bold font-headline hover:opacity-90 transition-opacity">
                    View Live Dashboard
                  </button>
                </div>
              </div>
              <div className="z-20 w-8 h-8 rounded-full bg-secondary ring-8 ring-secondary/20 shadow-[0_0_30px_rgba(244,196,48,1)] hidden md:block"></div>
              <div className="w-full md:w-1/2 md:pl-20"></div>
            </div>

            {/* Step 6: Counting */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/2 md:pr-20"></div>
              <div className="z-10 w-4 h-4 rounded-full bg-on-surface-variant/30 hidden md:block"></div>
              <div className="w-full md:w-1/2 flex md:pl-20">
                <div className="bg-surface-variant/20 backdrop-blur-md rounded-xl p-8 w-full max-w-md shadow-xl border border-white/5 opacity-80">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-on-surface-variant font-display font-bold text-lg">
                      Nov 6
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl">
                      leaderboard
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface-variant mb-3">
                    Counting
                  </h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Tallying of electoral votes. Predictive modeling finalized
                    against actual reported numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Timeline;
