import { useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { useArenaStore } from '../store/useArenaStore';
import { formatCurrency } from '../utils/format';

const StatusBar = () => {
  const { marketPrices, blockHeight, latencyMs, walletConnected, setWalletConnected, updateMarketPrices } =
    useArenaStore();

  useEffect(() => {
    // Simulate wallet connection after 1 second
    const timer = setTimeout(() => {
      setWalletConnected(true);
    }, 1000);

    // Update prices every 3 seconds
    const interval = setInterval(() => {
      updateMarketPrices();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [setWalletConnected, updateMarketPrices]);

  return (
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-bg-surface border-t-2 border-white/20 z-40">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center justify-between text-sm">
          {/* Left: Market Prices */}
          <div className="flex items-center gap-6 lg:gap-8">
            {marketPrices.map((market) => (
              <div key={market.symbol} className="flex items-center gap-3 border-r border-white/10 pr-6 last:border-r-0">
                <span className="text-text-tertiary font-data text-xs uppercase tracking-widest hidden sm:inline">
                  {market.symbol}
                </span>
                <span className="sm:hidden text-text-tertiary font-data text-xs uppercase tracking-widest">
                  {market.symbol}
                </span>
                <span className="font-data text-text-primary font-bold">
                  {market.symbol === 'BTC' || market.symbol === 'ETH'
                    ? formatCurrency(market.price, 0)
                    : formatCurrency(market.price, 2)}
                </span>
                <span
                  className={`text-xs font-data font-bold ${
                    market.change24h >= 0 ? 'text-profit' : 'text-loss'
                  }`}
                >
                  {market.change24h >= 0 ? '+' : ''}
                  {market.change24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>

          {/* Right: Status Indicators */}
          <div className="flex items-center gap-6">
            {/* Wallet Status */}
            <div
              className={`flex items-center gap-2 border-l border-white/10 pl-6 ${
                walletConnected ? 'text-profit' : 'text-text-tertiary'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-data font-bold uppercase tracking-widest hidden md:inline">
                {walletConnected ? 'OK' : 'OFF'}
              </span>
            </div>

            {/* Block Height */}
            <div className="hidden lg:flex items-center gap-2 text-text-tertiary border-l border-white/10 pl-6">
              <span className="text-xs font-data font-bold uppercase tracking-widest">BLK</span>
              <span className="text-xs font-data text-text-primary">#{blockHeight.toLocaleString()}</span>
            </div>

            {/* Latency */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              <div
                className={`w-2 h-2 ${
                  latencyMs < 50
                    ? 'bg-profit'
                    : latencyMs < 100
                    ? 'bg-warning'
                    : 'bg-loss'
                }`}
              />
              <span className="text-xs font-data text-text-primary font-bold hidden sm:inline">
                {latencyMs}MS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
