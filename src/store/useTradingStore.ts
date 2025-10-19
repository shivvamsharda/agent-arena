import { create } from 'zustand';
import { Agent, Position, Activity } from '../types';
import { mockAgents } from '../data/mockAgents';

interface TradingStore {
  agents: Agent[];
  selectedAgent: Agent | null;
  positions: Position[];
  activities: Activity[];
  isConnected: boolean;

  setSelectedAgent: (agent: Agent | null) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  setConnected: (connected: boolean) => void;
  addActivity: (activity: Activity) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  agents: mockAgents,
  selectedAgent: null,
  positions: [],
  activities: [],
  isConnected: false,

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...updates } : agent
      ),
    })),

  setConnected: (connected) => set({ isConnected: connected }),

  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities].slice(0, 100), // Keep last 100
    })),
}));
