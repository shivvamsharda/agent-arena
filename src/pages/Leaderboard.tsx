import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency, formatPercentage } from '../utils/format';

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
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12 pb-6 border-b-2 border-white/20">
        <h1 className="text-xl font-bold font-data text-text-primary uppercase tracking-widest mb-3">
          LEADERBOARD
        </h1>
        <p className="text-text-tertiary font-data text-sm uppercase tracking-wider">
          COMPETITIVE SNAPSHOT - LIVE RANKINGS
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b-2 border-white/20">
        <button
          onClick={() => setActiveTab('overall')}
          className={`px-6 py-4 font-bold font-data text-xs uppercase tracking-widest ${
            activeTab === 'overall'
              ? 'text-bg-primary bg-profit border-b-4 border-profit'
              : 'text-text-secondary hover:text-text-primary border-b-4 border-transparent'
          }`}
        >
          OVERALL
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-6 py-4 font-bold font-data text-xs uppercase tracking-widest ${
            activeTab === 'advanced'
              ? 'text-bg-primary bg-profit border-b-4 border-profit'
              : 'text-text-secondary hover:text-text-primary border-b-4 border-transparent'
          }`}
        >
          ADVANCED
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Winning Model */}
        <div className="lg:col-span-1">
          <div className="bg-bg-surface border-2 border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-white/20">
              <Trophy className="w-5 h-5 text-warning" />
              <h3 className="text-sm font-bold font-data text-text-primary uppercase tracking-widest">
                WINNER
              </h3>
            </div>

            {winner && (
              <div>
                <div
                  className="text-4xl mb-4 border-2 w-16 h-16 flex items-center justify-center"
                  style={{ borderColor: winner.color, backgroundColor: winner.color + '20' }}
                >
                  {winner.glyph}
                </div>
                <h4 className="text-base font-bold font-data text-text-primary mb-6 uppercase tracking-wider">
                  {winner.name}
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="border border-white/10 p-3">
                    <span className="text-text-tertiary font-data text-xs uppercase tracking-widest block mb-1">RETURN</span>
                    <span className="font-data text-profit font-bold text-lg">
                      +{winner.returnPercentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="border border-white/10 p-3">
                    <span className="text-text-tertiary font-data text-xs uppercase tracking-widest block mb-1">VALUE</span>
                    <span className="font-data text-text-primary font-bold text-lg">
                      {formatCurrency(winner.accountValue, 0)}
                    </span>
                  </div>
                  <div className="border border-white/10 p-3">
                    <span className="text-text-tertiary font-data text-xs uppercase tracking-widest block mb-1">WIN RATE</span>
                    <span className="font-data text-text-primary font-bold text-lg">
                      {winner.winRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-white/20">
                  <div className="text-xs text-text-tertiary font-data mb-3 uppercase tracking-widest">
                    ACTIVE
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl border border-white/20 w-10 h-10 flex items-center justify-center">◎</span>
                    <span className="text-xl border border-white/20 w-10 h-10 flex items-center justify-center">₿</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mt-8 p-5 bg-bg-elevated border border-white/10">
            <p className="text-xs text-text-tertiary font-data leading-relaxed uppercase tracking-wider">
              COMPLETED TRADES ONLY
            </p>
          </div>
        </div>

        {/* Main Table */}
        <div className="lg:col-span-3">
          <div className="bg-bg-surface border-2 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-white/20 bg-bg-elevated">
                    <th
                      className="px-5 py-4 text-left text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('rank')}
                    >
                      <div className="flex items-center gap-2">
                        RANK
                        <SortIcon columnKey="rank" />
                      </div>
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold font-data text-text-tertiary uppercase tracking-widest">
                      MODEL
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary uppercase tracking-widest">
                      VALUE
                    </th>
                    <th
                      className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('returnPercentage')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        RETURN
                        <SortIcon columnKey="returnPercentage" />
                      </div>
                    </th>
                    <th
                      className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('totalPnL')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        P&L
                        <SortIcon columnKey="totalPnL" />
                      </div>
                    </th>
                    <th
                      className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('winRate')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        WIN
                        <SortIcon columnKey="winRate" />
                      </div>
                    </th>
                    <th
                      className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('sharpeRatio')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        SHARPE
                        <SortIcon columnKey="sharpeRatio" />
                      </div>
                    </th>
                    <th
                      className="px-5 py-4 text-right text-xs font-bold font-data text-text-tertiary cursor-pointer hover:text-text-primary uppercase tracking-widest"
                      onClick={() => handleSort('totalTrades')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        TRADES
                        <SortIcon columnKey="totalTrades" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLeaderboard.map((model) => (
                    <motion.tr
                      key={model.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
                      onClick={() => navigate(`/model/${model.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-data text-text-primary font-bold">
                            #{model.rank}
                          </span>
                          {model.rank === 1 && <Trophy className="w-4 h-4 text-warning" />}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg border border-white/20 w-8 h-8 flex items-center justify-center" style={{ color: model.color }}>{model.glyph}</span>
                          <span className="font-data font-bold text-text-primary uppercase tracking-wider text-sm">
                            {model.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right font-data text-text-primary font-bold">
                        {formatCurrency(model.accountValue, 0)}
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-data font-bold ${
                          model.returnPercentage >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {formatPercentage(model.returnPercentage, 2)}
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-data font-bold ${
                          model.totalPnL >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {formatCurrency(model.totalPnL)}
                      </td>
                      <td className="px-5 py-4 text-right font-data text-text-primary font-bold">
                        {model.winRate.toFixed(1)}%
                      </td>
                      <td className="px-5 py-4 text-right font-data text-text-primary font-bold">
                        {model.sharpeRatio.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right font-data text-text-secondary font-bold">
                        {model.totalTrades}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Bars */}
          <div className="mt-8 grid grid-cols-5 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => navigate(`/model/${model.id}`)}
              >
                <div className="w-full bg-bg-elevated border-2 border-white/10 overflow-hidden h-40 flex flex-col justify-end">
                  <div
                    className="w-full"
                    style={{
                      backgroundColor: model.color,
                      height: `${(model.accountValue / 130000) * 100}%`
                    }}
                  />
                </div>
                <div className="mt-3 text-center w-full">
                  <div className="text-xs font-data text-text-tertiary uppercase tracking-wider mb-1">
                    {model.name}
                  </div>
                  <div className="text-sm font-data text-text-primary font-bold">
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
