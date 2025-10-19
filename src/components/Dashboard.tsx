import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTradingStore } from '../store/useTradingStore';
import Header from './Header';
import AgentCard from './AgentCard';
import ActivityFeed from './ActivityFeed';
import ChartPanel from './ChartPanel';
import TradePanel from './TradePanel';

const Dashboard = () => {
  const { agents, selectedAgent, setSelectedAgent, setConnected } =
    useTradingStore();

  useEffect(() => {
    // Simulate connection after 1 second
    const timer = setTimeout(() => {
      setConnected(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setConnected]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Agent Cards */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold font-ui text-text-primary">
                AI Agents
              </h2>
              <span className="text-xs text-text-secondary font-ui">
                {agents.filter((a) => a.isActive).length} Active
              </span>
            </div>

            <AnimatePresence>
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgent?.id === agent.id}
                  onClick={() => setSelectedAgent(agent)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Main Chart Area */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <ChartPanel />
            <ActivityFeed />
          </div>

          {/* Right Sidebar - Trade Panel */}
          <div className="col-span-12 lg:col-span-3">
            <TradePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
