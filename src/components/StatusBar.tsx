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
    <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-bg-surface/95 backdrop-blur-lg border-t border-white/10 z-40">
      <div className="container mx-auto px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Left: Market Prices */}
          <div className="flex items-center gap-4 lg:gap-6">
            {marketPrices.map((market) => (
              <div key={market.symbol} className="flex items-center gap-2">
                <span className="text-text-secondary font-ui hidden sm:inline">
                  {market.symbol}
                </span>
                <span className="sm:hidden text-text-secondary font-ui">
                  {market.symbol}
                </span>
                <span className="font-data text-text-primary">
                  {market.symbol === 'BTC' || market.symbol === 'ETH'
                    ? formatCurrency(market.price, 0)
                    : formatCurrency(market.price, 2)}
                </span>
                <span
                  className={`text-xs font-data ${
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
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            <div
              className={`flex items-center gap-1.5 ${
                walletConnected ? 'text-profit' : 'text-text-tertiary'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-ui hidden md:inline">
                {walletConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Block Height */}
            <div className="hidden lg:flex items-center gap-1.5 text-text-secondary">
              <span className="text-xs font-data">#{blockHeight.toLocaleString()}</span>
            </div>

            {/* Latency */}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  latencyMs < 50
                    ? 'bg-profit'
                    : latencyMs < 100
                    ? 'bg-warning'
                    : 'bg-loss'
                } animate-pulse`}
              />
              <span className="text-xs font-data text-text-secondary hidden sm:inline">
                {latencyMs}ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
