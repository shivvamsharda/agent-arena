import { useEffect, useState } from 'react';
import { Activity } from '../types';
import { formatTimestamp } from '../utils/format';
import { useTradingStore } from '../store/useTradingStore';

const mockActivities: Activity[] = [
  {
    id: '1',
    time: Date.now() - 5000,
    type: 'buy',
    action: 'BUY',
    details: 'BTC @ $43,890 (0.5 units) - Alpha',
    agentId: 'agent-1',
  },
  {
    id: '2',
    time: Date.now() - 12000,
    type: 'analyze',
    action: 'ANALYZE',
    details: 'ETH trend analysis complete - Beta',
    agentId: 'agent-2',
  },
  {
    id: '3',
    time: Date.now() - 25000,
    type: 'sell',
    action: 'SELL',
    details: 'SOL @ $98.50 (2.3 units) - Gamma',
    agentId: 'agent-3',
  },
  {
    id: '4',
    time: Date.now() - 38000,
    type: 'info',
    action: 'INFO',
    details: 'Arbitrage opportunity detected - Delta',
    agentId: 'agent-4',
  },
  {
    id: '5',
    time: Date.now() - 52000,
    type: 'buy',
    action: 'BUY',
    details: 'AVAX @ $35.20 (5 units) - Zeta',
    agentId: 'agent-6',
  },
];

const ActivityFeed = () => {
  const { isConnected } = useTradingStore();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  useEffect(() => {
    if (!isConnected) return;

    // Simulate new activities every 5 seconds
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        time: Date.now(),
        type: ['buy', 'sell', 'analyze', 'info'][
          Math.floor(Math.random() * 4)
        ] as Activity['type'],
        action: ['BUY', 'SELL', 'ANALYZE', 'INFO'][
          Math.floor(Math.random() * 4)
        ],
        details: `Random activity at ${new Date().toLocaleTimeString()}`,
        agentId: `agent-${Math.floor(Math.random() * 6) + 1}`,
      };

      setActivities((prev) => [newActivity, ...prev].slice(0, 20));
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="bg-bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold font-ui text-text-primary">
          Activity Feed
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
          <span className="text-xs text-text-secondary font-ui">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto font-data text-sm">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="py-2 px-3 border-b border-white/5 flex gap-3 items-start hover:bg-white/5 transition-colors rounded"
          >
            <span className="text-text-tertiary text-xs whitespace-nowrap">
              [{formatTimestamp(activity.time)}]
            </span>
            <span
              className={`font-semibold ${
                activity.type === 'buy'
                  ? 'text-profit'
                  : activity.type === 'sell'
                  ? 'text-loss'
                  : activity.type === 'analyze'
                  ? 'text-info'
                  : 'text-warning'
              }`}
            >
              {activity.action}
            </span>
            <span className="text-text-secondary flex-1">
              {activity.details}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
