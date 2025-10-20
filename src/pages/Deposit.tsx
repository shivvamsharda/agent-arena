import { useState } from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, Info } from 'lucide-react';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency, formatPercentage } from '../utils/format';
import { motion } from 'framer-motion';

const Deposit = () => {
  const { totalAccountValue, models, walletConnected } = useArenaStore();
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const depositValue = parseFloat(depositAmount) || 0;

  // Calculate expected returns based on model performance
  const avgReturn = models.reduce((sum, m) => sum + m.returnPercentage, 0) / models.length;
  const projectedReturn = depositValue * (avgReturn / 100);

  // APY calculation (simplified for demo)
  const apy = avgReturn * 12; // Annualized

  const durationOptions = [
    { value: '7d', label: '7 Days', multiplier: 1 },
    { value: '30d', label: '30 Days', multiplier: 1.2 },
    { value: '90d', label: '90 Days', multiplier: 1.5 },
    { value: '1y', label: '1 Year', multiplier: 2 },
  ];

  const handleDeposit = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }
    if (depositValue <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }
    // This will be connected to actual deposit logic later
    alert(`Deposit of ${formatCurrency(depositValue)} initiated for ${selectedDuration}!`);
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold font-ui text-text-primary mb-2">
          Deposit to Trading Pool
        </h1>
        <p className="text-text-secondary font-ui">
          Fund the AI agent pool and earn passive returns from algorithmic trading
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Deposit Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Deposit Card */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold font-ui text-text-primary mb-6">
              Deposit Amount
            </h2>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm text-text-secondary font-ui mb-2">
                Enter Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-data text-text-secondary">
                  $
                </span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-data bg-bg-elevated border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-profit transition-colors"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[100, 500, 1000, 5000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount.toString())}
                    className="px-3 py-1.5 text-sm font-semibold font-ui rounded-lg bg-bg-elevated text-text-secondary border border-white/10 hover:border-profit hover:text-profit transition-all"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Lock Duration */}
            <div className="mb-6">
              <label className="block text-sm text-text-secondary font-ui mb-3">
                Lock Duration (Higher duration = Better returns)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedDuration(option.value as any)}
                    className={`px-4 py-3 rounded-lg font-semibold font-ui text-sm transition-all ${
                      selectedDuration === option.value
                        ? 'bg-profit/20 text-profit border border-profit/50'
                        : 'bg-bg-elevated text-text-secondary border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Returns */}
            {depositValue > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-bg-elevated/50 rounded-lg border border-profit/20 mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary font-ui">
                    Projected Returns
                  </span>
                  <span className="text-sm text-text-tertiary font-ui">
                    Based on avg. performance
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-data text-profit">
                    {formatCurrency(projectedReturn)}
                  </span>
                  <span className="text-sm font-data text-text-secondary">
                    ({formatPercentage(avgReturn, 2)})
                  </span>
                </div>
              </motion.div>
            )}

            {/* Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={depositValue <= 0 || !walletConnected}
              className={`w-full py-4 rounded-lg font-semibold font-ui text-lg transition-all flex items-center justify-center gap-2 ${
                depositValue > 0 && walletConnected
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-bg-elevated text-text-tertiary border border-white/10 cursor-not-allowed'
              }`}
            >
              {walletConnected ? (
                <>
                  Deposit {depositValue > 0 ? formatCurrency(depositValue) : ''}
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                'Connect Wallet to Deposit'
              )}
            </button>

            {walletConnected && depositValue > 0 && (
              <p className="text-xs text-text-tertiary font-ui text-center mt-3">
                You'll receive LP tokens representing your share of the pool
              </p>
            )}
          </div>

          {/* Pool Stats */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Pool Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-text-secondary font-ui mb-1">
                  Total Pool Value
                </div>
                <div className="text-xl font-bold font-data text-text-primary">
                  {formatCurrency(totalAccountValue, 0)}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary font-ui mb-1">
                  Average APY
                </div>
                <div className="text-xl font-bold font-data text-profit">
                  {apy.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary font-ui mb-1">
                  Active Models
                </div>
                <div className="text-xl font-bold font-data text-text-primary">
                  {models.filter((m) => m.isActivelyTrading).length} / {models.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary font-ui mb-1">
                  Total Trades (24h)
                </div>
                <div className="text-xl font-bold font-data text-text-primary">
                  87
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Why Deposit */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Why Deposit?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-profit/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-profit" />
                </div>
                <div>
                  <div className="font-semibold font-ui text-text-primary text-sm mb-1">
                    Passive Returns
                  </div>
                  <div className="text-xs text-text-secondary font-ui">
                    Earn from AI-powered trading strategies 24/7
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-info" />
                </div>
                <div>
                  <div className="font-semibold font-ui text-text-primary text-sm mb-1">
                    Risk Diversification
                  </div>
                  <div className="text-xs text-text-secondary font-ui">
                    Portfolio spread across 5 independent AI models
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <div className="font-semibold font-ui text-text-primary text-sm mb-1">
                    No Management
                  </div>
                  <div className="text-xs text-text-secondary font-ui">
                    Fully automated - deposit and let AI work for you
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Disclosure */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-warning/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold font-ui text-text-primary">
                Risk Disclosure
              </h3>
            </div>
            <div className="space-y-2 text-xs text-text-secondary font-ui leading-relaxed">
              <p>
                • Trading involves risk. Past performance does not guarantee future results.
              </p>
              <p>
                • Your funds will be used for algorithmic trading on crypto exchanges.
              </p>
              <p>
                • Lock periods prevent early withdrawal. Choose duration carefully.
              </p>
              <p>
                • AI models may experience losses. Only deposit what you can afford to lose.
              </p>
            </div>
          </div>

          {/* Model Performance Preview */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Model Performance
            </h3>
            <div className="space-y-3">
              {models.slice(0, 3).map((model) => (
                <div key={model.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ color: model.color }}>{model.glyph}</span>
                    <span className="text-sm font-ui text-text-primary">
                      {model.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-data font-semibold ${
                      model.returnPercentage >= 0 ? 'text-profit' : 'text-loss'
                    }`}
                  >
                    {formatPercentage(model.returnPercentage, 1)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-ui text-text-secondary">
                    Pool Average
                  </span>
                  <span className="text-sm font-data font-semibold text-profit">
                    {formatPercentage(avgReturn, 2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
