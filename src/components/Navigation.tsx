import { NavLink } from 'react-router-dom';
import { Activity, Trophy, Users } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Live', icon: Activity },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/models', label: 'Models', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t-2 border-white/20 lg:hidden z-50">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full border-l border-white/10 first:border-l-0 ${
                isActive ? 'bg-profit' : 'hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 ${isActive ? 'text-bg-primary' : 'text-text-secondary'}`}
                />
                <span className={`text-xs font-data mt-2 uppercase tracking-wider ${isActive ? 'text-bg-primary font-bold' : 'text-text-tertiary'}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
