import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (timestamp: number): string => {
  return formatDistanceToNow(timestamp, { addSuffix: true });
};

export const formatHoldingTime = (ms: number | null): string => {
  if (!ms) return '—';

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
