import { NavLink } from 'react-router-dom';
import { Activity, Trophy, Users } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Live', icon: Activity },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/models', label: 'Models', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-surface/95 backdrop-blur-lg border-t border-white/10 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-profit' : 'text-text-secondary hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 ${isActive ? 'text-profit' : ''}`}
                />
                <span className="text-xs font-ui mt-1">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
