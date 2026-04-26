import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-on-background font-body">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-8 py-4 max-w-[1440px] left-1/2 -translate-x-1/2 bg-[#1b3656]/80 backdrop-blur-[24px] z-50 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-2xl">insights</span>
          <h1 className="text-2xl font-black text-secondary tracking-tighter font-headline">ElectionIQ</h1>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors">Home</Link>
          <Link to="/timeline" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors">Timeline</Link>
          <Link to="/chat" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors">Chat</Link>
          <Link to="/quiz" className="font-headline uppercase tracking-widest text-slate-300 font-medium hover:text-secondary transition-colors">Quiz</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="md:hidden text-slate-100 p-2 hover:bg-white/10 rounded-full transition-all">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button className="hidden md:block bg-secondary text-on-secondary px-6 py-2 rounded-full font-semibold scale-95 active:scale-90 transition-transform">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-surface-container-low rounded-t-[3rem] mt-20 w-full py-12 px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 max-w-[1440px] mx-auto">
        <div className="space-y-6">
          <div className="text-lg font-bold text-secondary font-headline">ElectionIQ</div>
          <p className="text-sm text-slate-400 max-w-sm">
            © 2024 ElectionIQ. Empowering The Sovereign Intelligence. Delivering high-fidelity civic data for the modern era.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
          <Link to="/" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Home</Link>
          <Link to="/timeline" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Timeline</Link>
          <Link to="/chat" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Chat</Link>
          <Link to="/quiz" className="text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">Quiz</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
