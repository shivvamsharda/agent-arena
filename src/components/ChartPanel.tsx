import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTradingStore } from '../store/useTradingStore';

// Generate mock chart data
const generateMockData = () => {
  const data = [];
  const now = Date.now();
  let value = 100000;

  for (let i = 24; i >= 0; i--) {
    const change = (Math.random() - 0.45) * 2000;
    value += change;
    data.push({
      time: new Date(now - i * 60 * 60 * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
      }),
      pnl: ((value - 100000) / 100000) * 100,
      value: value,
    });
  }
  return data;
};

const ChartPanel = () => {
  const { selectedAgent } = useTradingStore();
  const chartData = useMemo(() => generateMockData(), []);

  const latestPnL = chartData[chartData.length - 1]?.pnl || 0;

  return (
    <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold font-ui text-text-primary">
            {selectedAgent ? `${selectedAgent.name} Performance` : 'Portfolio Performance'}
          </h2>
          <p className="text-sm text-text-secondary font-ui mt-1">
            Last 24 hours
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-text-secondary font-ui">Total P&L</div>
          <div
            className={`text-2xl font-bold font-data ${
              latestPnL >= 0 ? 'text-profit' : 'text-loss'
            }`}
          >
            {latestPnL >= 0 ? '+' : ''}
            {latestPnL.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="time"
              stroke="#8B949E"
              tick={{ fill: '#8B949E', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              stroke="#8B949E"
              tick={{ fill: '#8B949E', fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(28, 33, 40, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#E6EDF3',
              }}
              formatter={(value: number) => [
                `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`,
                'P&L',
              ]}
            />
            <Line
              type="monotone"
              dataKey="pnl"
              stroke={latestPnL >= 0 ? '#00D4AA' : '#FF3B30'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;
