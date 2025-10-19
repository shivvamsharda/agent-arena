import { create } from 'zustand';
import { AIModel, Trade, Position, EquityPoint, MarketPrice, TimeRange, LeaderboardModel } from '../types/models';
import { mockModels, generateMockTrades, generateMockPositions, generateEquityCurve, mockMarketPrices } from '../data/mockModels';

interface ArenaStore {
  // Models & Leaderboard
  models: AIModel[];
  leaderboard: LeaderboardModel[];

  // Trades & Positions
  allTrades: Trade[];
  positions: Position[];

  // Equity Data
  equityCurve: EquityPoint[];

  // Market Data
  marketPrices: MarketPrice[];
  blockHeight: number;
  latencyMs: number;

  // UI State
  selectedModelId: string | null;
  timeRange: TimeRange;
  walletConnected: boolean;

  // Total Account Value
  totalAccountValue: number;
  total24hChange: number;

  // Actions
  setSelectedModel: (modelId: string | null) => void;
  setTimeRange: (range: TimeRange) => void;
  setWalletConnected: (connected: boolean) => void;
  updateMarketPrices: () => void;
  calculateLeaderboard: () => void;
  getModelTrades: (modelId: string) => Trade[];
  getModelPositions: (modelId: string) => Position[];
}

export const useArenaStore = create<ArenaStore>((set, get) => ({
  // Initial data
  models: mockModels,
  leaderboard: [],
  allTrades: generateMockTrades(),
  positions: generateMockPositions(),
  equityCurve: generateEquityCurve(),
  marketPrices: mockMarketPrices,
  blockHeight: 245678901,
  latencyMs: 45,

  // UI State
  selectedModelId: null,
  timeRange: 'ALL',
  walletConnected: false,

  // Calculated values
  totalAccountValue: mockModels.reduce((sum, m) => sum + m.accountValue, 0),
  total24hChange: 4.23, // Mock value

  // Actions
  setSelectedModel: (modelId) => set({ selectedModelId: modelId }),

  setTimeRange: (range) => set({ timeRange: range }),

  setWalletConnected: (connected) => set({ walletConnected: connected }),

  updateMarketPrices: () => {
    // Simulate price updates
    set((state) => ({
      marketPrices: state.marketPrices.map((price) => ({
        ...price,
        price: price.price * (1 + (Math.random() - 0.5) * 0.001),
      })),
      latencyMs: Math.floor(Math.random() * 30) + 35,
      blockHeight: state.blockHeight + 1,
    }));
  },

  calculateLeaderboard: () => {
    const { models } = get();
    const sorted = [...models].sort((a, b) => b.returnPercentage - a.returnPercentage);

    const leaderboard: LeaderboardModel[] = sorted.map((model, index) => ({
      ...model,
      rank: index + 1,
      rankChange: 0, // TODO: Track rank changes over time
    }));

    set({ leaderboard });
  },

  getModelTrades: (modelId) => {
    const { allTrades } = get();
    return allTrades.filter((trade) => trade.modelId === modelId);
  },

  getModelPositions: (modelId) => {
    const { positions } = get();
    return positions.filter((pos) => pos.modelId === modelId);
  },
}));

// Calculate leaderboard on initialization
setTimeout(() => {
  useArenaStore.getState().calculateLeaderboard();
}, 0);
