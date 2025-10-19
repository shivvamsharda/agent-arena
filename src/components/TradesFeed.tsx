import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency } from '../utils/format';
import { formatTimeAgo, formatHoldingTime } from '../utils/time';
import { Trade } from '../types/models';

const TradesFeed = () => {
  const { allTrades, models } = useArenaStore();
  const [displayedTrades, setDisplayedTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Show most recent 20 trades
    setDisplayedTrades(allTrades.slice(0, 20));
  }, [allTrades]);

  const getModelColor = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    return model?.color || '#6B7280';
  };

  const getModelName = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    return model?.name || modelId;
  };

  return (
    <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold font-ui text-text-primary">
            Recent Trades
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
            <span className="text-xs text-text-secondary font-ui">LIVE</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {displayedTrades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-lg bg-bg-elevated/50 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left: Model & Trade Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2 py-0.5 text-xs font-semibold font-ui rounded-full"
                      style={{
                        backgroundColor: getModelColor(trade.modelId) + '20',
                        color: getModelColor(trade.modelId),
                        border: `1px solid ${getModelColor(trade.modelId)}50`,
                      }}
                    >
                      {getModelName(trade.modelId)}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold font-ui rounded-full ${
                        trade.side === 'LONG'
                          ? 'bg-profit/20 text-profit border border-profit/50'
                          : 'bg-loss/20 text-loss border border-loss/50'
                      }`}
                    >
                      {trade.side}
                    </span>
                    <span className="text-sm font-ui text-text-primary">
                      {trade.coinEmoji} {trade.coin}
                    </span>
                  </div>

                  <div className="text-xs text-text-secondary font-data space-y-0.5">
                    <div>
                      Notional: {formatCurrency(trade.notionalEntry)} →{' '}
                      {formatCurrency(trade.notionalExit || 0)}
                    </div>
                    <div>
                      Holding: {formatHoldingTime(trade.holdingTimeMs)}
                    </div>
                  </div>
                </div>

                {/* Right: P&L */}
                <div className="text-right">
                  <div
                    className={`text-base font-bold font-data ${
                      (trade.netPnL || 0) >= 0 ? 'text-profit' : 'text-loss'
                    }`}
                  >
                    {(trade.netPnL || 0) >= 0 ? '+' : ''}
                    {formatCurrency(trade.netPnL || 0)}
                  </div>
                  <div className="text-xs text-text-tertiary font-ui">
                    {formatTimeAgo(trade.exitTime || Date.now())}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TradesFeed;
