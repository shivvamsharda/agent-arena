// Type definitions for Agent Arena

export type ModelId = 'deepseek' | 'gpt5' | 'sonnet' | 'gemini' | 'grok';

export type TradeSide = 'LONG' | 'SHORT';

export interface AIModel {
  id: ModelId;
  name: string;
  color: string;
  glyph: string;
  accountValue: number;
  availableCash: number;
  totalPnL: number;
  totalFees: number;
  netRealized: number;
  returnPercentage: number;
  winRate: number;
  biggestWin: number;
  biggestLoss: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalTrades: number;
  avgLeverage: number;
  avgConfidence: number;
  isActivelyTrading: boolean;
}

export interface Trade {
  id: string;
  modelId: ModelId;
  side: TradeSide;
  coin: string;
  coinEmoji: string;
  entryPrice: number;
  exitPrice: number | null;  // null if still open
  quantity: number;
  leverage: number;
  entryTime: number;
  exitTime: number | null;
  holdingTimeMs: number | null;
  notionalEntry: number;
  notionalExit: number | null;
  totalFees: number;
  netPnL: number | null;
  isActive: boolean;
}

export interface Position {
  id: string;
  modelId: ModelId;
  side: TradeSide;
  coin: string;
  coinEmoji: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  leverage: number;
  entryTime: number;
  liquidationPrice: number;
  margin: number;
  unrealizedPnL: number;
  exitPlan?: {
    takeProfit: number;
    stopLoss: number;
    invalidationNote: string;
  };
}

export interface EquityPoint {
  timestamp: number;
  deepseek: number;
  gpt5: number;
  sonnet: number;
  gemini: number;
  grok: number;
  bitcoin: number;  // baseline
}

export interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export interface LeaderboardModel extends AIModel {
  rank: number;
  rankChange: number;  // +2, -1, etc.
}

export type TimeRange = 'ALL' | '72H' | '7D' | '24H';
export type MetricFocus = 'return' | 'sharpe' | 'drawdown';
export type AssetScope = 'majors' | 'all';
