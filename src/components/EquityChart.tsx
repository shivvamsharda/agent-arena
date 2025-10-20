import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency } from '../utils/format';

const EquityChart = () => {
  const { equityCurve } = useArenaStore();
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
    { key: 'DeepSeek', color: '#c7f5d9', id: 'deepseek' },
    { key: 'GPT-5', color: '#ffd4a3', id: 'gpt5' },
    { key: 'Sonnet-4.5', color: '#ffb8a3', id: 'sonnet' },
    { key: 'Gemini 2.5 Pro', color: '#d4e5d0', id: 'gemini' },
    { key: 'Grok', color: '#f5d99f', id: 'grok' },
  ];

  return (
    <div className="bg-bg-surface border-2 border-white/10 p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-white/20">
        <div>
          <h2 className="text-sm font-bold font-data text-text-primary uppercase tracking-widest">
            MULTI-MODEL EQUITY CURVE
          </h2>
          <p className="text-xs text-text-tertiary font-data mt-2 uppercase tracking-wider">
            72H PERFORMANCE
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-xs font-bold font-data bg-profit text-bg-primary border-2 border-profit uppercase tracking-widest">
            72H
          </button>
          <button className="px-4 py-2 text-xs font-bold font-data bg-bg-elevated text-text-secondary border-2 border-white/20 hover:border-white/40 uppercase tracking-widest">
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
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="timestamp"
              stroke="#6a6a6a"
              tick={{ fill: '#6a6a6a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#6a6a6a"
              tick={{ fill: '#6a6a6a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                background: '#121212',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0',
                color: '#ffffff',
                fontFamily: 'JetBrains Mono',
              }}
              formatter={(value: number, name: string) => [
                formatCurrency(value, 0),
                name,
              ]}
            />

            {/* Bitcoin baseline - solid gray */}
            <Line
              type="monotone"
              dataKey="Bitcoin"
              stroke="#4a4a4a"
              strokeWidth={1}
              dot={false}
              opacity={0.6}
              activeDot={false}
            />

            {/* Model lines */}
            {modelLines.map((model) => (
              <Line
                key={model.key}
                type="monotone"
                dataKey={model.key}
                stroke={model.color}
                strokeWidth={hoveredModel === model.key ? 2 : 1.5}
                dot={false}
                activeDot={{ r: 4, fill: model.color, stroke: model.color }}
                opacity={
                  hoveredModel === null || hoveredModel === model.key
                    ? 1
                    : 0.3
                }
              />
            ))}

            <Legend
              wrapperStyle={{
                paddingTop: '24px',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquityChart;
