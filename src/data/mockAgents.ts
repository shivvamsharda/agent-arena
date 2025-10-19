import { Agent } from '../types';

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Alpha',
    role: 'Scalping Specialist',
    color: '#00D4AA',
    icon: '⚡',
    isActive: true,
    winRate: 68.5,
    pnl: 12.4,
    totalPnL: 2847.50,
    tradeCount: 127,
    confidence: 85,
    lastAction: 'Bought BTC @ $43,890',
    personality: {
      aggressiveness: 0.8,
      confidence: 0.7,
      riskTolerance: 0.6,
      communicationStyle: 'direct'
    }
  },
  {
    id: 'agent-2',
    name: 'Beta',
    role: 'Swing Trader',
    color: '#FF6B9D',
    icon: '📈',
    isActive: true,
    winRate: 72.3,
    pnl: 8.2,
    totalPnL: 4521.80,
    tradeCount: 89,
    confidence: 92,
    lastAction: 'Analyzing ETH trends',
    personality: {
      aggressiveness: 0.5,
      confidence: 0.8,
      riskTolerance: 0.5,
      communicationStyle: 'analytical'
    }
  },
  {
    id: 'agent-3',
    name: 'Gamma',
    role: 'Risk Manager',
    color: '#FFD60A',
    icon: '🛡️',
    isActive: false,
    winRate: 58.1,
    pnl: -2.1,
    totalPnL: -512.30,
    tradeCount: 45,
    confidence: 65,
    lastAction: 'Set stop-loss on SOL',
    personality: {
      aggressiveness: 0.3,
      confidence: 0.6,
      riskTolerance: 0.3,
      communicationStyle: 'cautious'
    }
  },
  {
    id: 'agent-4',
    name: 'Delta',
    role: 'Arbitrage Hunter',
    color: '#64D2FF',
    icon: '🎯',
    isActive: true,
    winRate: 81.7,
    pnl: 15.8,
    totalPnL: 6234.90,
    tradeCount: 203,
    confidence: 78,
    lastAction: 'Executed ARB opportunity',
    personality: {
      aggressiveness: 0.7,
      confidence: 0.9,
      riskTolerance: 0.4,
      communicationStyle: 'precise'
    }
  },
  {
    id: 'agent-5',
    name: 'Epsilon',
    role: 'DeFi Specialist',
    color: '#A78BFA',
    icon: '🔮',
    isActive: false,
    winRate: 64.2,
    pnl: 5.7,
    totalPnL: 1823.40,
    tradeCount: 67,
    confidence: 71,
    lastAction: 'Monitoring liquidity pools',
    personality: {
      aggressiveness: 0.6,
      confidence: 0.7,
      riskTolerance: 0.7,
      communicationStyle: 'innovative'
    }
  },
  {
    id: 'agent-6',
    name: 'Zeta',
    role: 'Trend Follower',
    color: '#FB923C',
    icon: '🌊',
    isActive: true,
    winRate: 75.9,
    pnl: 18.3,
    totalPnL: 7891.20,
    tradeCount: 156,
    confidence: 88,
    lastAction: 'Riding AVAX momentum',
    personality: {
      aggressiveness: 0.7,
      confidence: 0.8,
      riskTolerance: 0.6,
      communicationStyle: 'confident'
    }
  }
];
