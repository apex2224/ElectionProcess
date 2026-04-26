import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="selection:bg-secondary selection:text-on-secondary overflow-x-hidden min-h-screen">
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] px-8 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
          {/* Background Atmospheric Glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary-container/20 border border-secondary/20">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest">Sovereign Intelligence v2.0</span>
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] mb-6 tracking-tight">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Civic Intelligence</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed opacity-90">
              Empowering your vote with real-time AI insights, interactive guides, and civic clarity. Experience the next generation of democratic engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/timeline" className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-secondary/20 hover:brightness-110 active:scale-95 transition-all text-center">
                Start Exploring
              </Link>
              <Link to="/chat" className="bg-surface-variant/40 backdrop-blur-md px-10 py-4 rounded-full font-semibold text-lg text-on-surface hover:bg-surface-variant/60 transition-all border border-white/5 text-center">
                Ask AI Assistant
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative w-full aspect-square md:aspect-auto">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden glass-refraction bg-surface-variant/20 backdrop-blur-xl shadow-2xl">
              <img 
                alt="Cybersecurity and data visualization" 
                className="w-full h-full object-cover mix-blend-overlay opacity-60" 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/80 via-transparent to-secondary/10"></div>
              
              {/* Floating UI Card Overlay */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-lg bg-surface-bright/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary">auto_awesome</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">AI Analysis Complete</h4>
                    <p className="text-xs text-on-surface-variant">Real-time polling data integrated</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 md:px-20 py-24 max-w-7xl mx-auto">
          <div className="mb-16 md:w-1/2">
            <h3 className="font-headline text-4xl font-extrabold text-on-surface mb-4">Architected for Clarity</h3>
            <p className="text-on-surface-variant">We bridge the gap between complex political data and sovereign individual action through advanced computational tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-8 group relative rounded-xl bg-surface-container-high p-10 overflow-hidden glass-refraction transition-all hover:bg-surface-container-highest">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">insights</span>
                </div>
                <h4 className="text-2xl font-bold font-headline mb-4">Interactive Guides</h4>
                <p className="text-on-surface-variant max-w-md leading-relaxed">
                  Navigate the complex landscape of electoral districts, policy implications, and candidate histories with our dynamically updating visual charts.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="md:col-span-4 group rounded-xl bg-surface-container-high p-10 glass-refraction hover:bg-surface-container-highest transition-all">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">smart_toy</span>
              </div>
              <h4 className="text-2xl font-bold font-headline mb-4">AI Chatbot</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Get instant answers to complex civic questions using our neutral, fact-verified intelligence engine.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="md:col-span-5 group rounded-xl bg-surface-container-high p-10 glass-refraction hover:bg-surface-container-highest transition-all">
              <div className="w-14 h-14 rounded-2xl bg-tertiary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-tertiary text-3xl">quiz</span>
              </div>
              <h4 className="text-2xl font-bold font-headline mb-4">Civic Quizzes</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Test your knowledge on constitutional rights and current legislative proposals through gamified insights.
              </p>
            </div>
            
            {/* Decorative Callout */}
            <div className="md:col-span-7 rounded-xl bg-gradient-to-br from-primary-container to-surface-container-lowest p-10 flex flex-col justify-center items-center text-center border border-white/5">
              <p className="font-headline text-3xl font-light italic mb-6">"Intelligence is the bedrock of democracy."</p>
              <div className="h-[1px] w-24 bg-secondary"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
