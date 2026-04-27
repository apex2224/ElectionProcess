import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';

import Timeline from './pages/Timeline';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import Eligibility from './pages/Eligibility';
import NearPoll from './pages/NearPoll';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
