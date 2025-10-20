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
    <nav className="hidden lg:block border-b-2 border-white/20 bg-bg-surface relative z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <div className="text-2xl border-2 border-white/30 w-12 h-12 flex items-center justify-center">⚡</div>
            <div>
              <h1 className="text-base font-bold font-data text-text-primary uppercase tracking-widest">
                AGENT ARENA
              </h1>
              <p className="text-xs text-text-tertiary font-data uppercase tracking-wider">
                AI TRADING POOL
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
                  `flex items-center gap-3 px-5 py-3 font-bold font-data text-xs uppercase tracking-widest ${
                    isActive
                      ? 'bg-profit text-bg-primary border-2 border-profit'
                      : 'text-text-secondary hover:text-text-primary border-2 border-transparent hover:border-white/20'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-bg-primary' : ''}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}

            {/* Models Dropdown */}
            <div className="relative ml-2 z-50" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-5 py-3 font-bold font-data text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary border-2 border-transparent hover:border-white/20"
              >
                <Users className="w-4 h-4" />
                MODELS
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
                <div className="absolute top-full mt-2 w-64 bg-bg-surface border-2 border-white/20 overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelClick(model.id)}
                      className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/10 border-b border-white/10 last:border-b-0 text-left"
                    >
                      <span style={{ color: model.color }} className="text-xl">
                        {model.glyph}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold font-data text-text-primary text-xs uppercase tracking-wider">
                          {model.name}
                        </div>
                        <div className="text-xs text-text-tertiary font-data mt-1">
                          {model.returnPercentage >= 0 ? '+' : ''}
                          {model.returnPercentage.toFixed(2)}%
                        </div>
                      </div>
                      <div
                        className={`text-xs font-data font-bold ${
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/deposit')}
              className="px-6 py-3 font-bold font-data text-xs uppercase tracking-widest bg-info text-bg-primary border-2 border-info hover:bg-warning hover:border-warning"
            >
              DEPOSIT
            </button>
            <button className="px-6 py-3 font-bold font-data text-xs uppercase tracking-widest bg-transparent text-text-primary border-2 border-white/30 hover:border-white/50">
              CONNECT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
