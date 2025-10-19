import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency } from '../utils/format';

const EquityChart = () => {
  const { equityCurve, models } = useArenaStore();
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  // Transform equity data for chart
  const chartData = equityCurve.map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    DeepSeek: point.deepseek,
    'GPT-5': point.gpt5,
    'Sonnet-4.5': point.sonnet,
    'Gemini 2.5 Pro': point.gemini,
    Grok: point.grok,
    Bitcoin: point.bitcoin,
  }));

  const modelLines = [
    { key: 'DeepSeek', color: '#0EA5E9', id: 'deepseek' },
    { key: 'GPT-5', color: '#10B981', id: 'gpt5' },
    { key: 'Sonnet-4.5', color: '#F97316', id: 'sonnet' },
    { key: 'Gemini 2.5 Pro', color: '#EC4899', id: 'gemini' },
    { key: 'Grok', color: '#8B5CF6', id: 'grok' },
  ];

  return (
    <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold font-ui text-text-primary">
            Multi-Model Equity Curve
          </h2>
          <p className="text-sm text-text-secondary font-ui mt-1">
            Last 72 hours performance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold font-ui rounded-lg bg-profit/20 text-profit border border-profit/50">
            72H
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold font-ui rounded-lg bg-bg-elevated text-text-secondary border border-white/10 hover:border-white/20">
            ALL
          </button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
            onMouseMove={(e: any) => {
              if (e?.activeLabel) {
                // Detect which line is being hovered based on proximity
                const activePayload = e.activePayload;
                if (activePayload && activePayload.length > 0) {
                  setHoveredModel(activePayload[0].dataKey);
                }
              }
            }}
            onMouseLeave={() => setHoveredModel(null)}
          >
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="timestamp"
              stroke="#8B949E"
              tick={{ fill: '#8B949E', fontSize: 11 }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#8B949E"
              tick={{ fill: '#8B949E', fontSize: 11 }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(28, 33, 40, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#E6EDF3',
              }}
              formatter={(value: number, name: string) => [
                formatCurrency(value, 0),
                name,
              ]}
            />

            {/* Bitcoin baseline - dashed gray */}
            <Line
              type="monotone"
              dataKey="Bitcoin"
              stroke="#6B7280"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              opacity={0.5}
              activeDot={false}
            />

            {/* Model lines */}
            {modelLines.map((model) => (
              <Line
                key={model.key}
                type="monotone"
                dataKey={model.key}
                stroke={model.color}
                strokeWidth={hoveredModel === model.key ? 3 : 2}
                dot={false}
                activeDot={{ r: 6 }}
                opacity={
                  hoveredModel === null || hoveredModel === model.key
                    ? 1
                    : 0.4
                }
              />
            ))}

            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px',
                fontFamily: 'Space Grotesk',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquityChart;
