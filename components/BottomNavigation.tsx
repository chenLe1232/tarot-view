import { Sparkles, Compass, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'explore', icon: Compass, label: '探索' },
    { id: 'home', icon: Sparkles, label: '占卜', isCenter: true },
    { id: 'profile', icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-navigation">
        <div className="flex items-end justify-around py-3 px-6 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isCenter = item.isCenter;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: isCenter ? 1.05 : 1.1 }}
                whileTap={{ scale: isCenter ? 0.95 : 0.95 }}
                onClick={() => onPageChange(item.id)}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  isCenter 
                    ? 'p-4 -mt-6' // 中间按钮更大，向上偏移
                    : 'p-3'
                } ${
                  isActive 
                    ? 'text-gold' 
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                {/* 中间按钮的特殊背景 */}
                {isCenter && (
                  <motion.div
                    animate={isActive ? { 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 glass-card rounded-3xl"
                  />
                )}
                
                {/* 普通tab的活跃状态背景 */}
                {!isCenter && isActive && (
                  <motion.div
                    layoutId="normalTab"
                    className="absolute inset-0 glass-card rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* 图标和文字 */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    animate={isActive ? { 
                      y: isCenter ? [0, -3, 0] : [0, -2, 0],
                      rotate: isCenter ? [0, 10, -10, 0] : [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: isCenter ? 3 : 2, repeat: Infinity }}
                    className={isCenter ? "mb-2" : "mb-1"}
                  >
                    <Icon size={isCenter ? 28 : 22} />
                  </motion.div>
                  <span className={`text-xs ${isCenter ? 'text-sm' : ''}`}>
                    {item.label}
                  </span>
                </div>

                {/* 中间按钮的特殊光晕效果 */}
                {isCenter && isActive && (
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.9, 1.2, 0.9]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gold/15 rounded-3xl blur-sm"
                  />
                )}

                {/* 普通tab的活跃光晕 */}
                {!isCenter && isActive && (
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gold/10 rounded-2xl blur-sm"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* 底部装饰线 */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.5, 1, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-full"
        />
      </div>
    </div>
  );
}