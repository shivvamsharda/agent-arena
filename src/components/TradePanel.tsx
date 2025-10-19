import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradePanel = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleTrade = () => {
    console.log(`${activeTab.toUpperCase()} order:`, { amount, price });
    // This will be connected to Supabase later
  };

  return (
    <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 sticky top-24">
      <h2 className="text-lg font-semibold font-ui text-text-primary mb-4">
        Quick Trade
      </h2>

      {/* Buy/Sell Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold font-ui text-sm transition-all ${
            activeTab === 'buy'
              ? 'bg-profit/20 text-profit border border-profit/50'
              : 'bg-bg-elevated text-text-secondary border border-white/10 hover:border-white/20'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-1" />
          Buy
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold font-ui text-sm transition-all ${
            activeTab === 'sell'
              ? 'bg-loss/20 text-loss border border-loss/50'
              : 'bg-bg-elevated text-text-secondary border border-white/10 hover:border-white/20'
          }`}
        >
          <TrendingDown className="w-4 h-4 inline mr-1" />
          Sell
        </button>
      </div>

      {/* Trade Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary font-ui mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 bg-bg-elevated border border-white/10 rounded-lg text-text-primary font-data focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary font-ui mb-2">
            Price (USD)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 bg-bg-elevated border border-white/10 rounded-lg text-text-primary font-data focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <button
          onClick={handleTrade}
          className={`w-full py-3 rounded-lg font-semibold font-ui transition-all ${
            activeTab === 'buy'
              ? 'bg-profit hover:bg-profit/90 text-white'
              : 'bg-loss hover:bg-loss/90 text-white'
          }`}
        >
          {activeTab === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
        </button>
      </div>

      {/* Market Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h3 className="text-sm font-semibold text-text-secondary font-ui mb-3">
          Market Stats
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary font-ui">24h Volume</span>
            <span className="text-text-primary font-data">$2.4B</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary font-ui">Active Agents</span>
            <span className="text-text-primary font-data">4</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary font-ui">Total Trades</span>
            <span className="text-text-primary font-data">687</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
