import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Lazy load pages for code splitting (improves efficiency / bundle size)
const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Chat = lazy(() => import('./pages/Chat'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Eligibility = lazy(() => import('./pages/Eligibility'));
const NearPoll = lazy(() => import('./pages/NearPoll'));

/** Loading fallback shown while a lazy page chunk is being fetched */
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    role="status"
    aria-label="Loading page content"
  >
    <div className="flex flex-col items-center gap-4">
      <span className="material-symbols-outlined text-secondary animate-spin text-5xl">refresh</span>
      <p className="text-on-surface-variant font-headline tracking-widest uppercase text-sm">
        Loading...
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="history" element={<Timeline />} />
            <Route path="assistance" element={<Chat />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="near-poll" element={<NearPoll />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
