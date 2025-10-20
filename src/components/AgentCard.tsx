import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Agent } from '../types';
import { formatPercentage } from '../utils/format';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

const AgentCard = ({ agent, isSelected, onClick }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className={`
        relative p-6 cursor-pointer
        bg-bg-surface border-2
        hover:border-white/30
        ${isSelected ? 'border-4' : 'border-white/10'}
      `}
      style={{
        borderColor: isSelected ? agent.color : undefined,
      }}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: agent.color }}
      />

      {/* Agent Header */}
      <div className="flex items-center gap-4 mb-4 mt-2">
        <div
          className="w-12 h-12 flex items-center justify-center text-xl relative"
          style={{
            border: `2px solid ${agent.color}`,
            backgroundColor: agent.color + '15',
          }}
        >
          {agent.icon}
          {agent.isActive && (
            <div
              className="absolute -top-1 -right-1 w-2 h-2 bg-profit"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary font-data tracking-wide uppercase text-sm">
            {agent.name}
          </h3>
          <span className="text-xs text-text-tertiary font-data uppercase tracking-wider">
            {agent.role}
          </span>
        </div>
        {agent.isActive && (
          <Activity className="w-4 h-4 text-profit" />
        )}
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="border border-white/10 p-3">
          <div className="text-text-tertiary text-xs mb-2 font-data uppercase tracking-widest">
            WIN RATE
          </div>
          <div className="font-data font-bold text-text-primary text-lg">
            {agent.winRate}%
          </div>
        </div>
        <div className="border border-white/10 p-3">
          <div className="text-text-tertiary text-xs mb-2 font-data uppercase tracking-widest">
            P&L
          </div>
          <div
            className={`font-data font-bold text-lg ${
              agent.pnl >= 0 ? 'text-profit' : 'text-loss'
            }`}
          >
            {formatPercentage(agent.pnl, 2)}
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-tertiary mb-2 font-data uppercase tracking-widest">
          <span>CONFIDENCE</span>
          <span>{agent.confidence}%</span>
        </div>
        <div className="h-2 bg-bg-elevated overflow-hidden">
          <div
            className="h-full"
            style={{
              backgroundColor: agent.color,
              width: `${agent.confidence}%`
            }}
          />
        </div>
      </div>

      {/* Last Action */}
      <div className="pt-4 border-t border-white/10">
        <div className="text-xs text-text-secondary font-data">
          {agent.lastAction}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
