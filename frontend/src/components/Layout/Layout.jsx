import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
const Layout = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-8 py-4 max-w-[1440px] left-1/2 -translate-x-1/2 bg-[#1b3656]/80 backdrop-blur-[24px] z-50 border-b border-white/5 rounded-b-[2rem] shadow-xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-2xl">insights</span>
          <h1 className="text-2xl font-black text-secondary tracking-tighter font-headline">ElectionIQ</h1>
        </Link>
        
        <div className="flex items-center gap-8 ml-auto">
          <nav className="hidden xl:flex gap-6 items-center">
            <Link to="/" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">Home</Link>
            <Link to="/history" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">History</Link>
            <Link to="/assistance" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">Assistance</Link>
            <Link to="/quiz" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">Quiz</Link>
            <Link to="/eligibility" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">Voter Eligibility</Link>
            <Link to="/near-poll" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors text-sm">Near Poll</Link>
          </nav>
        
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-slate-100 p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-headline text-on-surface-variant font-bold">{user.displayName}</span>
              <button 
                onClick={handleSignOut}
                className="bg-primary text-on-primary px-5 py-2 rounded-full font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="hidden md:flex items-center gap-2 bg-secondary text-on-secondary px-6 py-2 rounded-full font-semibold scale-95 active:scale-90 hover:brightness-110 transition-all"
            >
              Sign In
            </button>
          )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#0a192f]/95 backdrop-blur-3xl z-40 md:hidden border-t border-white/10">
          <nav className="flex flex-col p-8 gap-6">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/history" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">History</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/assistance" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">Assistance</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/quiz" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">Quiz</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/eligibility" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">Voter Eligibility</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/near-poll" className="font-headline uppercase tracking-widest text-xl text-slate-300 font-medium hover:text-secondary transition-colors">Near Poll</Link>
            
            <div className="h-px bg-white/10 my-4"></div>
            
            {!user ? (
              <button 
                onClick={() => { handleSignIn(); setIsMobileMenuOpen(false); }}
                className="flex justify-center items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full font-bold uppercase tracking-widest"
              >
                Sign In
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="text-lg font-headline text-on-surface-variant font-bold">Hi, {user.displayName}</span>
                <button 
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                  className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold uppercase tracking-widest text-center"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <Outlet />

      {/* Global Civic Duty Banner */}
      <div className="max-w-[1440px] mx-auto px-6 mt-20">
        <div className="bg-secondary/10 border border-secondary/20 rounded-[2rem] p-8 md:p-10 text-center shadow-[0_0_40px_rgba(240,193,44,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <span className="material-symbols-outlined text-secondary text-5xl mb-4 relative z-10">how_to_vote</span>
          <h3 className="text-2xl md:text-3xl font-headline font-black text-secondary mb-4 relative z-10">Vote Dena Hamari Duty Hai</h3>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-body relative z-10">
            Kisi ke pressure mein aakar ya kisi dusre ko dekh kar vote na karein. Apne adhikar ka sahi aur azaad istemaal karein. Agar aapko lagta hai ki koi bhi umeedwar sahi nahi hai, toh <strong>NOTA</strong> (None of the Above) choose karne ka adhikar bhi aapke paas hai.
            <br/><br/>
            <span className="font-black text-secondary tracking-widest uppercase text-xl mt-2 inline-block">Jai Hind, Jai Bharat 🇮🇳</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-low rounded-t-[3rem] mt-20 w-full py-12 px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 max-w-[1440px] mx-auto">
        <div className="space-y-6">
          <div className="text-lg font-bold text-secondary font-headline">ElectionIQ</div>
          <p className="text-sm text-slate-400 max-w-sm">
            © 2024 ElectionIQ. Empowering The Sovereign Intelligence. Delivering high-fidelity civic data for the modern era.
          </p>
          
          {/* Live State Results Tracker */}
          <div className="mt-4 inline-block relative w-full max-w-xs">
            <select className="w-full appearance-none bg-surface-variant/40 border border-white/5 text-secondary font-headline text-sm rounded-lg px-4 py-2 outline-none focus:border-secondary/50 cursor-pointer">
              <option value="" disabled selected className="bg-[#0a192f]">Live State Results 2024</option>
              <option value="up" className="bg-[#0a192f]">Uttar Pradesh: BJP (Lead)</option>
              <option value="dl" className="bg-[#0a192f]">Delhi: AAP/INC (Lead)</option>
              <option value="ka" className="bg-[#0a192f]">Karnataka: INC (Lead)</option>
              <option value="mh" className="bg-[#0a192f]">Maharashtra: NDA (Lead)</option>
              <option value="wb" className="bg-[#0a192f]">West Bengal: AITC (Lead)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 pointer-events-none text-sm">
              poll
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-start h-full pt-2">
          <Link to="/" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Home</Link>
          <Link to="/history" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">History</Link>
          <Link to="/assistance" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Assistance</Link>
          <Link to="/quiz" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Quiz</Link>
          <Link to="/eligibility" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Voter Eligibility</Link>
          <Link to="/near-poll" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Near Poll</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
