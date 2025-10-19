// Type definitions for the trading dashboard

export interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  icon: string;
  isActive: boolean;
  winRate: number;
  pnl: number;
  totalPnL: number;
  tradeCount: number;
  confidence: number;
  lastAction: string;
  personality: {
    aggressiveness: number;
    confidence: number;
    riskTolerance: number;
    communicationStyle: string;
  };
}

export interface Position {
  id: string;
  symbol: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  pnl: number;
  pnlPercentage: number;
  agentId: string;
}

export interface Activity {
  id: string;
  time: number;
  type: 'buy' | 'sell' | 'analyze' | 'info';
  action: string;
  details: string;
  agentId: string;
}

export interface MarketData {
  timestamp: number;
  prices: Record<string, number>;
}

export interface ChartDataPoint {
  time: string;
  pnl: number;
  value: number;
}
