import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency, formatPercentage } from '../utils/format';
import { formatTimestamp, formatHoldingTime } from '../utils/time';

const ModelDetail = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const navigate = useNavigate();
  const { models, getModelTrades, getModelPositions } = useArenaStore();

  const model = models.find((m) => m.id === modelId);
  const trades = getModelTrades(modelId || '');
  const positions = getModelPositions(modelId || '');

  if (!model) {
    return (
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center text-text-secondary">Model not found</div>
      </div>
    );
  }

  // Last 25 trades
  const recentTrades = trades.slice(0, 25);

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-ui">Back</span>
      </button>

      {/* Header Card */}
      <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="text-5xl"
              style={{ color: model.color }}
            >
              {model.glyph}
            </div>
            <div>
              <h1 className="text-3xl font-bold font-ui text-text-primary mb-1">
                {model.name}
              </h1>
              <div className="flex items-center gap-3 text-sm">
                <span
                  className={`px-2 py-1 rounded font-data ${
                    model.isActivelyTrading
                      ? 'bg-profit/20 text-profit'
                      : 'bg-neutral/20 text-neutral'
                  }`}
                >
                  {model.isActivelyTrading ? '● Active' : '○ Idle'}
                </span>
                <span className="text-text-secondary font-ui">
                  Avg Confidence: {model.avgConfidence}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div>
            <div className="text-xs text-text-secondary font-ui mb-1">
              Total Account Value
            </div>
            <div className="text-2xl font-bold font-data text-text-primary">
              {formatCurrency(model.accountValue, 2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary font-ui mb-1">
              Available Cash
            </div>
            <div className="text-2xl font-bold font-data text-text-primary">
              {formatCurrency(model.availableCash, 2)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary font-ui mb-1">
              Total P&L
            </div>
            <div
              className={`text-2xl font-bold font-data ${
                model.totalPnL >= 0 ? 'text-profit' : 'text-loss'
              }`}
            >
              {formatCurrency(model.totalPnL)}
            </div>
          </div>
          <div>
            <div className="text-xs text-text-secondary font-ui mb-1">
              Net Realized
            </div>
            <div
              className={`text-2xl font-bold font-data ${
                model.netRealized >= 0 ? 'text-profit' : 'text-loss'
              }`}
            >
              {formatCurrency(model.netRealized)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary font-ui">Avg Leverage</span>
            <span className="text-sm font-data text-text-primary">
              {model.avgLeverage.toFixed(1)}x
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary font-ui">Biggest Win</span>
            <span className="text-sm font-data text-profit">
              {formatCurrency(model.biggestWin)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary font-ui">Biggest Loss</span>
            <span className="text-sm font-data text-loss">
              {formatCurrency(model.biggestLoss)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary font-ui">Total Fees</span>
            <span className="text-sm font-data text-text-secondary">
              {formatCurrency(model.totalFees)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Positions */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Active Positions ({positions.length})
            </h2>
            {positions.length > 0 ? (
              <div className="space-y-4">
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className="p-4 bg-bg-elevated/50 rounded-lg border border-white/5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{position.coinEmoji}</span>
                        <div>
                          <div className="font-ui font-semibold text-text-primary">
                            {position.coin}
                          </div>
                          <div className="text-xs text-text-secondary font-ui">
                            {formatTimestamp(position.entryTime)}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold font-ui rounded-full ${
                          position.side === 'LONG'
                            ? 'bg-profit/20 text-profit border border-profit/50'
                            : 'bg-loss/20 text-loss border border-loss/50'
                        }`}
                      >
                        {position.side}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Entry Price</span>
                        <span className="font-data text-text-primary">
                          {formatCurrency(position.entryPrice, 2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Current</span>
                        <span className="font-data text-text-primary">
                          {formatCurrency(position.currentPrice, 2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Quantity</span>
                        <span className="font-data text-text-primary">
                          {position.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Leverage</span>
                        <span className="font-data text-text-primary">
                          {position.leverage}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Liq Price</span>
                        <span className="font-data text-loss">
                          {formatCurrency(position.liquidationPrice, 2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-ui">Unrealized P&L</span>
                        <span
                          className={`font-data font-semibold ${
                            position.unrealizedPnL >= 0 ? 'text-profit' : 'text-loss'
                          }`}
                        >
                          {formatCurrency(position.unrealizedPnL)}
                        </span>
                      </div>
                    </div>

                    {position.exitPlan && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <button className="text-xs text-profit hover:underline font-ui">
                          View Exit Plan →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary font-ui">
                No active positions
              </div>
            )}
          </div>

          {/* Last 25 Trades Table */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 pb-0">
              <h2 className="text-lg font-semibold font-ui text-text-primary mb-4">
                Last 25 Trades
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-bg-elevated/50 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold font-ui text-text-secondary">
                      Side
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold font-ui text-text-secondary">
                      Coin
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Entry
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Exit
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Holding Time
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Fees
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold font-ui text-text-secondary">
                      Net P&L
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr
                      key={trade.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold font-ui rounded-full ${
                            trade.side === 'LONG'
                              ? 'bg-profit/20 text-profit'
                              : 'bg-loss/20 text-loss'
                          }`}
                        >
                          {trade.side}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{trade.coinEmoji}</span>
                          <span className="font-ui text-text-primary">
                            {trade.coin}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-primary">
                        {formatCurrency(trade.entryPrice, 2)}
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-primary">
                        {formatCurrency(trade.exitPrice || 0, 2)}
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-secondary">
                        {formatHoldingTime(trade.holdingTimeMs)}
                      </td>
                      <td className="px-4 py-3 text-right font-data text-text-secondary">
                        {formatCurrency(trade.totalFees, 2)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-data font-semibold ${
                          (trade.netPnL || 0) >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {(trade.netPnL || 0) >= 0 ? '+' : ''}
                        {formatCurrency(trade.netPnL || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Metrics */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-ui">Return %</span>
                <span
                  className={`text-lg font-bold font-data ${
                    model.returnPercentage >= 0 ? 'text-profit' : 'text-loss'
                  }`}
                >
                  {formatPercentage(model.returnPercentage, 2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-ui">Win Rate</span>
                <span className="text-lg font-bold font-data text-text-primary">
                  {model.winRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-ui">Sharpe Ratio</span>
                <span className="text-lg font-bold font-data text-text-primary">
                  {model.sharpeRatio.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-ui">Max Drawdown</span>
                <span className="text-lg font-bold font-data text-loss">
                  {model.maxDrawdown.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Hold Times Placeholder */}
          <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold font-ui text-text-primary mb-4">
              Hold Times
            </h3>
            <div className="h-48 flex items-center justify-center text-text-tertiary text-sm font-ui">
              Donut chart (placeholder)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
