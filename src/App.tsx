import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import StatusBar from './components/StatusBar';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Live from './pages/Live';
import Leaderboard from './pages/Leaderboard';
import ModelDetail from './pages/ModelDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary pb-32 lg:pb-10">
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(28, 33, 40, 0.95)',
              color: '#E6EDF3',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#00D4AA',
                secondary: '#1C2128',
              },
            },
            error: {
              iconTheme: {
                primary: '#F87171',
                secondary: '#1C2128',
              },
            },
          }}
        />

        <main className="lg:pt-0">
          <Routes>
            <Route path="/" element={<Live />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/model/:modelId" element={<ModelDetail />} />
          </Routes>
        </main>

        <StatusBar />
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
