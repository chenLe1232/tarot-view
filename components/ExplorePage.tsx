import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Heart, Briefcase, Users, Sparkles, Zap, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface ExplorePageProps {
  onNavigate: (page: string) => void;
}

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const divinations = [
    {
      id: 'personality',
      title: '人格测试',
      description: '了解真实的自己',
      icon: Users,
      gradient: 'from-purple-500/80 to-pink-500/80',
      emoji: '🧠'
    },
    {
      id: 'love',
      title: '爱情占卜',
      description: '探索你的感情运势',
      icon: Heart,
      gradient: 'from-pink-500/80 to-red-500/80',
      emoji: '💖'
    },
    {
      id: 'career',
      title: '事业财运',
      description: '职场发展与财富指引',
      icon: Briefcase,
      gradient: 'from-yellow-500/80 to-orange-500/80',
      emoji: '💰'
    },
    {
      id: 'future',
      title: '运势预测',
      description: '窥探未来的可能性',
      icon: Sparkles,
      gradient: 'from-blue-500/80 to-indigo-500/80',
      emoji: '🔮'
    },
    {
      id: 'energy',
      title: '能量指引',
      description: '平衡内在的力量',
      icon: Zap,
      gradient: 'from-green-500/80 to-teal-500/80',
      emoji: '⚡'
    },
    {
      id: 'wisdom',
      title: '智慧启示',
      description: '获得人生的洞察',
      icon: Crown,
      gradient: 'from-violet-500/80 to-purple-500/80',
      emoji: '✨'
    }
  ];

  return (
    <div className="p-4 pb-24 min-h-screen relative">
      {/* 背景装饰 */}
      <div className="floating-orb fixed top-16 right-8 w-32 h-32 pointer-events-none" />
      <div className="floating-orb fixed bottom-40 left-6 w-24 h-24 pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* 顶部标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 relative z-10"
      >
        <h1 className="text-3xl mb-3 text-neon-glow">探索塔罗</h1>
        <p className="text-lg text-muted-foreground">选择你感兴趣的占卜类型</p>
      </motion.div>

      {/* 占卜类型网格 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {divinations.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('shuffle')}
              className="cursor-pointer"
            >
              <Card className="liquid-card p-6 text-white relative overflow-hidden h-44 flex flex-col justify-between rounded-2xl">
                {/* 背景渐变 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} backdrop-blur-sm`} />
                
                {/* 装饰圆形 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8" />
                
                <div className="relative z-10">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-4xl mb-2"
                  >
                    {item.emoji}
                  </motion.div>
                  <h3 className="text-lg mb-1">{item.title}</h3>
                </div>
                
                <div className="relative z-10">
                  <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
                </div>

                {/* 光效 */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent rounded-2xl"
                />

                {/* 边缘闪光 */}
                <div className="absolute inset-0 rounded-2xl shimmer" />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 学习区域 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10"
      >
        <h2 className="mb-4 text-xl">塔罗学习</h2>
        <Card className="liquid-card p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
              className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center relative overflow-hidden"
            >
              <Crown className="text-gold" size={28} />
              <div className="absolute inset-0 shimmer rounded-2xl" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg mb-2">塔罗入门课程</h3>
              <p className="text-sm text-muted-foreground">学习塔罗的基础知识与解读技巧</p>
            </div>
            <Button className="glass-gold-button text-black px-6 py-3 rounded-xl">
              开始学习
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* 底部装饰渐变线 */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-full"
      />
    </div>
  );
}