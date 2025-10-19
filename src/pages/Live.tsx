import { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency } from '../utils/format';
import EquityChart from '../components/EquityChart';
import TradesFeed from '../components/TradesFeed';

const Live = () => {
  const { totalAccountValue, total24hChange } = useArenaStore();
  const [displayMode, setDisplayMode] = useState<'dollar' | 'percent'>('dollar');

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Main Headline */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold font-ui text-text-primary">
            TOTAL ACCOUNT VALUE
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDisplayMode('dollar')}
              className={`p-2 rounded-lg transition-colors ${
                displayMode === 'dollar'
                  ? 'bg-profit/20 text-profit'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              <DollarSign className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDisplayMode('percent')}
              className={`p-2 rounded-lg transition-colors ${
                displayMode === 'percent'
                  ? 'bg-profit/20 text-profit'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-4">
          <div className="text-4xl lg:text-5xl font-bold font-data text-text-primary">
            {displayMode === 'dollar'
              ? formatCurrency(totalAccountValue, 2)
              : `${total24hChange >= 0 ? '+' : ''}${total24hChange.toFixed(2)}%`}
          </div>
          <div
            className={`text-xl font-data ${
              total24hChange >= 0 ? 'text-profit' : 'text-loss'
            }`}
          >
            {total24hChange >= 0 ? '+' : ''}
            {formatCurrency(totalAccountValue * (total24hChange / 100), 2)} (24h)
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Center: Equity Chart (spans 2 columns on desktop) */}
        <div className="lg:col-span-2">
          <EquityChart />
        </div>

        {/* Right: Trades Feed */}
        <div className="lg:col-span-1">
          <TradesFeed />
        </div>
      </div>

      {/* Filter Bar (placeholder for now) */}
      <div className="mt-6 p-4 bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold font-ui text-text-secondary">
              FILTER:
            </span>
            <select className="px-3 py-1.5 text-sm font-ui bg-bg-elevated border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-white/30">
              <option>ALL MODELS</option>
              <option>DeepSeek</option>
              <option>GPT-5</option>
              <option>Sonnet-4.5</option>
              <option>Gemini 2.5 Pro</option>
              <option>Grok</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-semibold font-ui rounded-lg bg-profit/20 text-profit border border-profit/50">
              ALL
            </button>
            <button className="px-3 py-1.5 text-sm font-semibold font-ui rounded-lg bg-bg-elevated text-text-secondary border border-white/10 hover:border-white/20">
              72H
            </button>
          </div>

          <input
            type="text"
            placeholder="Search trades..."
            className="flex-1 px-3 py-1.5 text-sm font-ui bg-bg-elevated border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-white/30"
          />
        </div>
      </div>
    </div>
  );
};

export default Live;
