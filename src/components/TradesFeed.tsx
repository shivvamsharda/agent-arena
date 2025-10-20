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
    <div className="bg-bg-surface border-2 border-white/10 p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-white/20">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold font-data text-text-primary uppercase tracking-widest">
            RECENT TRADES
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-profit" />
            <span className="text-xs text-text-tertiary font-data uppercase tracking-wider">LIVE</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {displayedTrades.map((trade) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="p-4 bg-bg-elevated border border-white/10 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Model & Trade Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="px-3 py-1 text-xs font-bold font-data uppercase tracking-widest"
                      style={{
                        backgroundColor: getModelColor(trade.modelId) + '20',
                        color: getModelColor(trade.modelId),
                        border: `2px solid ${getModelColor(trade.modelId)}`,
                      }}
                    >
                      {getModelName(trade.modelId)}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold font-data uppercase tracking-widest ${
                        trade.side === 'LONG'
                          ? 'bg-profit text-bg-primary border-2 border-profit'
                          : 'bg-loss text-bg-primary border-2 border-loss'
                      }`}
                    >
                      {trade.side}
                    </span>
                    <span className="text-sm font-data text-text-primary">
                      {trade.coinEmoji} {trade.coin}
                    </span>
                  </div>

                  <div className="text-xs text-text-tertiary font-data space-y-1 uppercase tracking-wider">
                    <div>
                      NOTIONAL: {formatCurrency(trade.notionalEntry)} →{' '}
                      {formatCurrency(trade.notionalExit || 0)}
                    </div>
                    <div>
                      HOLDING: {formatHoldingTime(trade.holdingTimeMs)}
                    </div>
                  </div>
                </div>

                {/* Right: P&L */}
                <div className="text-right">
                  <div
                    className={`text-lg font-bold font-data ${
                      (trade.netPnL || 0) >= 0 ? 'text-profit' : 'text-loss'
                    }`}
                  >
                    {(trade.netPnL || 0) >= 0 ? '+' : ''}
                    {formatCurrency(trade.netPnL || 0)}
                  </div>
                  <div className="text-xs text-text-tertiary font-data mt-1 uppercase tracking-wider">
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
