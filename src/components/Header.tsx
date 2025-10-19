import { useMemo } from 'react';
import { useTradingStore } from '../store/useTradingStore';
import { formatPercentage } from '../utils/format';

const Header = () => {
  const { agents, isConnected } = useTradingStore();

  const totalPnL = useMemo(() => {
    return agents.reduce((sum, agent) => sum + agent.pnl, 0);
  }, [agents]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-bg-primary/90 border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold font-ui text-text-primary">
            ⚡ Trading Arena
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-profit' : 'bg-loss'
              }`}
            />
            <span className="text-sm text-text-secondary font-ui">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Total Portfolio P&L */}
          <div>
            <span className="text-sm text-text-secondary font-ui block">
              Total P&L
            </span>
            <div
              className={`text-xl font-bold font-data ${
                totalPnL >= 0 ? 'text-profit' : 'text-loss'
              }`}
            >
              {formatPercentage(totalPnL, 2)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
