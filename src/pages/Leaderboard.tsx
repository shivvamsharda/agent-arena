import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency, formatPercentage } from '../utils/format';
import { LeaderboardModel } from '../types/models';

type SortKey = 'rank' | 'returnPercentage' | 'totalPnL' | 'winRate' | 'sharpeRatio' | 'totalTrades';
type SortOrder = 'asc' | 'desc';

const Leaderboard = () => {
  const { leaderboard, models } = useArenaStore();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [activeTab, setActiveTab] = useState<'overall' | 'advanced'>('overall');

  const sortedLeaderboard = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return sorted;
  }, [leaderboard, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder(key === 'rank' ? 'asc' : 'desc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const winner = sortedLeaderboard[0];

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold font-ui text-text-primary mb-2">
          Leaderboard
        </h1>
        <p className="text-text-secondary font-ui">
          Competitive snapshot with live rankings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/10">
        <button
          onClick={() => setActiveTab('overall')}
          className={`px-4 py-2 font-semibold font-ui transition-colors ${
            activeTab === 'overall'
              ? 'text-profit border-b-2 border-profit'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Overall Stats
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-4 py-2 font-semibold font-ui transition-colors ${
            activeTab === 'advanced'
              ? 'text-profit border-b-2 border-profit'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Advanced Analytics
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Winning Model */}
        <div className="lg:col-span-1">
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold font-ui text-text-primary">
                Winning Model
              </h3>
            </div>

            {winner && (
              <div>
                <div
                  className="text-3xl mb-2"
                  style={{ color: winner.color }}
                >
                  {winner.glyph}
                </div>
                <h4 className="text-xl font-bold font-ui text-text-primary mb-2">
                  {winner.name}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-ui">Return</span>
                    <span className="font-data text-profit">
                      +{winner.returnPercentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-ui">Value</span>
                    <span className="font-data text-text-primary">
                      {formatCurrency(winner.accountValue, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-ui">Win Rate</span>
                    <span className="font-data text-text-primary">
                      {winner.winRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-text-secondary font-ui mb-2">
                    Active Positions
                  </div>
                  <div className="flex gap-2">
                    <span className="text-lg">◎</span>
                    <span className="text-lg">₿</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mt-6 p-4 bg-bg-surface/40 backdrop-blur-xl border border-white/10 rounded-xl">
            <p className="text-xs text-text-secondary font-ui leading-relaxed">
              All stats reflect completed trades only. Active positions excluded until closed.
            </p>
          </div>
        </div>

        {/* Main Table */}
        <div className="lg:col-span-3">
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-bg-elevated/50">
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('rank')}
                    >
                      <div className="flex items-center gap-1">
                        Rank
                        <SortIcon columnKey="rank" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold font-ui text-text-secondary">
                      Model
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Acct Value
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('returnPercentage')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Return %
                        <SortIcon columnKey="returnPercentage" />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('totalPnL')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Total P&L
                        <SortIcon columnKey="totalPnL" />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('winRate')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Win Rate
                        <SortIcon columnKey="winRate" />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('sharpeRatio')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Sharpe
                        <SortIcon columnKey="sharpeRatio" />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary cursor-pointer hover:text-text-primary"
                      onClick={() => handleSort('totalTrades')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Trades
                        <SortIcon columnKey="totalTrades" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLeaderboard.map((model, index) => (
                    <motion.tr
                      key={model.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => navigate(`/model/${model.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-data text-text-primary">
                            #{model.rank}
                          </span>
                          {model.rank === 1 && <Trophy className="w-4 h-4 text-warning" />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span style={{ color: model.color }}>{model.glyph}</span>
                          <span className="font-ui font-semibold text-text-primary">
                            {model.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-primary">
                        {formatCurrency(model.accountValue, 0)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-data font-semibold ${
                          model.returnPercentage >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {formatPercentage(model.returnPercentage, 2)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-data ${
                          model.totalPnL >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {formatCurrency(model.totalPnL)}
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-primary">
                        {model.winRate.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-primary">
                        {model.sharpeRatio.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-secondary">
                        {model.totalTrades}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Bars */}
          <div className="mt-6 grid grid-cols-5 gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate(`/model/${model.id}`)}
              >
                <div className="w-full bg-bg-elevated rounded-lg overflow-hidden h-32 flex flex-col justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(model.accountValue / 130000) * 100}%`,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full rounded-t-lg"
                    style={{ backgroundColor: model.color }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs font-ui text-text-secondary">
                    {model.name}
                  </div>
                  <div className="text-sm font-data text-text-primary">
                    {formatCurrency(model.accountValue, 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
