import { AIModel, Trade, Position, EquityPoint, MarketPrice } from '../types/models';

// 5 AI Models with realistic stats
export const mockModels: AIModel[] = [
  {
    id: 'gpt5',
    name: 'GPT-5',
    color: '#10B981',
    glyph: '🧠',
    accountValue: 128450.82,
    availableCash: 45200.30,
    totalPnL: 28450.82,
    totalFees: 1240.50,
    netRealized: 27210.32,
    returnPercentage: 28.45,
    winRate: 68.5,
    biggestWin: 4521.80,
    biggestLoss: -1823.40,
    sharpeRatio: 1.85,
    maxDrawdown: -8.2,
    totalTrades: 127,
    avgLeverage: 3.2,
    avgConfidence: 82,
    isActivelyTrading: true,
  },
  {
    id: 'sonnet',
    name: 'Sonnet-4.5',
    color: '#F97316',
    glyph: '📝',
    accountValue: 115230.45,
    availableCash: 38100.20,
    totalPnL: 15230.45,
    totalFees: 980.25,
    netRealized: 14250.20,
    returnPercentage: 15.23,
    winRate: 71.2,
    biggestWin: 3890.50,
    biggestLoss: -1205.30,
    sharpeRatio: 1.62,
    maxDrawdown: -5.8,
    totalTrades: 98,
    avgLeverage: 2.8,
    avgConfidence: 79,
    isActivelyTrading: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    color: '#0EA5E9',
    glyph: '🔍',
    accountValue: 108920.30,
    availableCash: 32450.15,
    totalPnL: 8920.30,
    totalFees: 1120.40,
    netRealized: 7799.90,
    returnPercentage: 8.92,
    winRate: 64.8,
    biggestWin: 2847.60,
    biggestLoss: -1450.20,
    sharpeRatio: 1.42,
    maxDrawdown: -11.5,
    totalTrades: 142,
    avgLeverage: 3.5,
    avgConfidence: 75,
    isActivelyTrading: false,
  },
  {
    id: 'gemini',
    name: 'Gemini 2.5 Pro',
    color: '#EC4899',
    glyph: '💎',
    accountValue: 97540.80,
    availableCash: 28900.45,
    totalPnL: -2459.20,
    totalFees: 1340.60,
    netRealized: -3799.80,
    returnPercentage: -2.46,
    winRate: 58.3,
    biggestWin: 3120.70,
    biggestLoss: -2890.40,
    sharpeRatio: 0.82,
    maxDrawdown: -15.3,
    totalTrades: 115,
    avgLeverage: 4.1,
    avgConfidence: 71,
    isActivelyTrading: true,
  },
  {
    id: 'grok',
    name: 'Grok',
    color: '#8B5CF6',
    glyph: '⚡',
    accountValue: 92340.15,
    availableCash: 25100.30,
    totalPnL: -7659.85,
    totalFees: 1580.90,
    netRealized: -9240.75,
    returnPercentage: -7.66,
    winRate: 55.1,
    biggestWin: 2650.30,
    biggestLoss: -3240.80,
    sharpeRatio: 0.65,
    maxDrawdown: -18.9,
    totalTrades: 156,
    avgLeverage: 4.8,
    avgConfidence: 68,
    isActivelyTrading: false,
  },
];

// Coin emoji mapping
const coinEmojis: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  SOL: '◎',
  DOGE: '🐕',
  WIF: '🎩',
  BONK: '🔨',
  JUP: '🪐',
  AVAX: '🏔️',
  MATIC: '💜',
  ARB: '🔵',
};

// Generate realistic completed trades
export const generateMockTrades = (): Trade[] => {
  const trades: Trade[] = [];
  const coins = ['BTC', 'ETH', 'SOL', 'DOGE', 'WIF', 'BONK', 'JUP', 'AVAX'];
  const models: AIModel['id'][] = ['deepseek', 'gpt5', 'sonnet', 'gemini', 'grok'];

  let tradeId = 1;
  const now = Date.now();

  models.forEach((modelId) => {
    const numTrades = 25; // Last 25 trades per model

    for (let i = 0; i < numTrades; i++) {
      const coin = coins[Math.floor(Math.random() * coins.length)];
      const side: 'LONG' | 'SHORT' = Math.random() > 0.5 ? 'LONG' : 'SHORT';
      const entryPrice = Math.random() * 100 + 10;
      const priceChange = (Math.random() - 0.5) * 0.1; // -5% to +5%
      const exitPrice = entryPrice * (1 + priceChange);
      const quantity = Math.random() * 10 + 1;
      const leverage = Math.floor(Math.random() * 5) + 1;

      const notionalEntry = entryPrice * quantity * leverage;
      const notionalExit = exitPrice * quantity * leverage;
      const grossPnL = side === 'LONG'
        ? (exitPrice - entryPrice) * quantity * leverage
        : (entryPrice - exitPrice) * quantity * leverage;

      const fees = notionalEntry * 0.001; // 0.1% fee
      const netPnL = grossPnL - fees;

      const hoursAgo = Math.random() * 72; // Last 72 hours
      const exitTime = now - (hoursAgo * 60 * 60 * 1000);
      const holdingTime = (Math.random() * 6 + 0.5) * 60 * 60 * 1000; // 0.5-6 hours
      const entryTime = exitTime - holdingTime;

      trades.push({
        id: `trade-${tradeId++}`,
        modelId,
        side,
        coin,
        coinEmoji: coinEmojis[coin] || '💰',
        entryPrice,
        exitPrice,
        quantity,
        leverage,
        entryTime,
        exitTime,
        holdingTimeMs: holdingTime,
        notionalEntry,
        notionalExit,
        totalFees: fees,
        netPnL,
        isActive: false,
      });
    }
  });

  return trades.sort((a, b) => (b.exitTime || 0) - (a.exitTime || 0));
};

// Generate active positions
export const generateMockPositions = (): Position[] => {
  const positions: Position[] = [
    {
      id: 'pos-1',
      modelId: 'gpt5',
      side: 'LONG',
      coin: 'SOL',
      coinEmoji: '◎',
      entryPrice: 98.45,
      currentPrice: 101.20,
      quantity: 50,
      leverage: 3,
      entryTime: Date.now() - (2.5 * 60 * 60 * 1000), // 2.5h ago
      liquidationPrice: 82.15,
      margin: 1640.83,
      unrealizedPnL: 412.50,
      exitPlan: {
        takeProfit: 105.00,
        stopLoss: 95.00,
        invalidationNote: 'Break below 4h support @ $94.50',
      },
    },
    {
      id: 'pos-2',
      modelId: 'sonnet',
      side: 'SHORT',
      coin: 'BTC',
      coinEmoji: '₿',
      entryPrice: 43890.00,
      currentPrice: 43720.00,
      quantity: 0.5,
      leverage: 2,
      entryTime: Date.now() - (1.8 * 60 * 60 * 1000), // 1.8h ago
      liquidationPrice: 48279.00,
      margin: 21945.00,
      unrealizedPnL: 170.00,
      exitPlan: {
        takeProfit: 42500.00,
        stopLoss: 44500.00,
        invalidationNote: 'Reclaim $44.2K with volume',
      },
    },
    {
      id: 'pos-3',
      modelId: 'gemini',
      side: 'LONG',
      coin: 'DOGE',
      coinEmoji: '🐕',
      entryPrice: 0.0845,
      currentPrice: 0.0832,
      quantity: 100000,
      leverage: 5,
      entryTime: Date.now() - (0.5 * 60 * 60 * 1000), // 30min ago
      liquidationPrice: 0.0677,
      margin: 1690.00,
      unrealizedPnL: -650.00,
      exitPlan: {
        takeProfit: 0.0920,
        stopLoss: 0.0820,
        invalidationNote: 'Lost 1h trend support',
      },
    },
  ];

  return positions;
};

// Generate 72-hour equity curve data
export const generateEquityCurve = (): EquityPoint[] => {
  const points: EquityPoint[] = [];
  const now = Date.now();
  const hours = 72;

  // Starting values
  let deepseek = 100000;
  let gpt5 = 100000;
  let sonnet = 100000;
  let gemini = 100000;
  let grok = 100000;
  let bitcoin = 100000;

  for (let i = hours; i >= 0; i--) {
    // Different volatility for each model
    deepseek += (Math.random() - 0.48) * 800;
    gpt5 += (Math.random() - 0.42) * 1000;
    sonnet += (Math.random() - 0.44) * 900;
    gemini += (Math.random() - 0.52) * 950;
    grok += (Math.random() - 0.54) * 1100;
    bitcoin += (Math.random() - 0.50) * 400; // Lower volatility baseline

    points.push({
      timestamp: now - (i * 60 * 60 * 1000),
      deepseek,
      gpt5,
      sonnet,
      gemini,
      grok,
      bitcoin,
    });
  }

  return points;
};

// Current market prices
export const mockMarketPrices: MarketPrice[] = [
  { symbol: 'BTC', price: 43720.50, change24h: 2.34 },
  { symbol: 'ETH', price: 2284.80, change24h: -1.12 },
  { symbol: 'SOL', price: 101.20, change24h: 5.67 },
];
