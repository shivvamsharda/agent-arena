import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, Trophy, Users } from 'lucide-react';
import { useArenaStore } from '../store/useArenaStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { models } = useArenaStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Live', icon: Activity },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModelClick = (modelId: string) => {
    navigate(`/model/${modelId}`);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="hidden lg:block border-b border-white/10 bg-bg-surface/40 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="text-2xl">⚡</div>
            <div>
              <h1 className="text-xl font-bold font-ui text-text-primary">
                Agent Arena
              </h1>
              <p className="text-xs text-text-secondary font-ui">
                AI Trading Pool
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold font-ui text-sm transition-all ${
                    isActive
                      ? 'bg-profit/20 text-profit border border-profit/50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-profit' : ''}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}

            {/* Models Dropdown */}
            <div className="relative ml-2 z-50" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold font-ui text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all"
              >
                <Users className="w-4 h-4" />
                Models
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-56 bg-bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelClick(model.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
                    >
                      <span style={{ color: model.color }} className="text-xl">
                        {model.glyph}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold font-ui text-text-primary text-sm">
                          {model.name}
                        </div>
                        <div className="text-xs text-text-secondary font-ui">
                          {model.returnPercentage >= 0 ? '+' : ''}
                          {model.returnPercentage.toFixed(2)}% return
                        </div>
                      </div>
                      <div
                        className={`text-xs font-data font-semibold ${
                          model.returnPercentage >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        #{models.findIndex((m) => m.id === model.id) + 1}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/deposit')}
              className="px-4 py-2 rounded-lg font-semibold font-ui text-sm bg-profit/20 text-profit border border-profit/50 hover:bg-profit/30 transition-all"
            >
              Deposit
            </button>
            <button className="px-4 py-2 rounded-lg font-semibold font-ui text-sm bg-bg-elevated text-text-primary border border-white/10 hover:border-white/30 transition-all">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
