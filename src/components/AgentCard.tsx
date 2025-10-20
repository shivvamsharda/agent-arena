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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`
        relative p-5 rounded-xl cursor-pointer
        bg-bg-surface/60 backdrop-blur-xl
        border border-white/10
        hover:border-white/20
        transition-all duration-200
        ${isSelected ? 'ring-2' : ''}
      `}
      style={{
        borderColor: isSelected ? agent.color : undefined,
        boxShadow: isSelected
          ? `0 0 20px ${agent.color}33`
          : undefined,
      }}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: agent.color }}
      />

      {/* Agent Header */}
      <div className="flex items-center gap-3 mb-3 mt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl relative"
          style={{
            border: `2px solid ${agent.color}`,
            backgroundColor: '#262C36',
          }}
        >
          {agent.icon}
          {agent.isActive && (
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-profit animate-pulse"
              style={{
                boxShadow: '0 0 10px rgba(0, 212, 170, 0.5)',
              }}
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary font-ui">
            {agent.name}
          </h3>
          <span className="text-xs text-text-secondary font-ui">
            {agent.role}
          </span>
        </div>
        {agent.isActive && (
          <Activity className="w-4 h-4 text-profit animate-pulse" />
        )}
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-text-secondary text-xs mb-1 font-ui">
            Win Rate
          </div>
          <div className="font-mono font-semibold text-text-primary">
            {agent.winRate}%
          </div>
        </div>
        <div>
          <div className="text-text-secondary text-xs mb-1 font-ui">
            P&L
          </div>
          <div
            className={`font-mono font-semibold ${
              agent.pnl >= 0 ? 'text-profit' : 'text-loss'
            }`}
          >
            {formatPercentage(agent.pnl, 2)}
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-text-secondary mb-1 font-ui">
          <span>Confidence</span>
          <span>{agent.confidence}%</span>
        </div>
        <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: agent.color }}
            initial={{ width: 0 }}
            animate={{ width: `${agent.confidence}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Last Action */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="text-xs text-text-tertiary font-ui truncate">
          {agent.lastAction}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
