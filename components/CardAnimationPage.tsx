import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CardAnimationPageProps {
  onNavigate: (page: string) => void;
}

export default function CardAnimationPage({ onNavigate }: CardAnimationPageProps) {
  const [animationStage, setAnimationStage] = useState<'shuffling' | 'revealing' | 'complete'>('shuffling');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const cards = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    x: (i - 3) * 20,
    rotation: (i - 3) * 5
  }));

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage('revealing');
      setSelectedCardIndex(3); // 选择中间的牌
    }, 2000);

    const timer2 = setTimeout(() => {
      setAnimationStage('complete');
    }, 4000);

    const timer3 = setTimeout(() => {
      onNavigate('result');
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNavigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景粒子效果 */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -20, -40],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="text-center">
        {/* 顶部文字 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-2xl mb-4">
            {animationStage === 'shuffling' && '正在洗牌...'}
            {animationStage === 'revealing' && '感受牌的召唤'}
            {animationStage === 'complete' && '选定了！'}
          </h1>
          <p className="text-muted-foreground">
            {animationStage === 'shuffling' && '让宇宙为你选择最合适的指引'}
            {animationStage === 'revealing' && '你的直觉正在引导你'}
            {animationStage === 'complete' && '你的每日指引已经显现'}
          </p>
        </motion.div>

        {/* 卡牌区域 */}
        <div className="relative w-full h-80 flex items-center justify-center">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute"
                initial={{
                  x: card.x,
                  rotate: card.rotation,
                  scale: 1
                }}
                animate={{
                  x: animationStage === 'shuffling' 
                    ? [card.x, card.x + Math.sin(Date.now() / 1000 + index) * 10, card.x]
                    : selectedCardIndex === index 
                      ? 0 
                      : animationStage === 'revealing' 
                        ? card.x * 2 
                        : card.x,
                  rotate: animationStage === 'shuffling'
                    ? [card.rotation, card.rotation + 10, card.rotation]
                    : selectedCardIndex === index
                      ? 0
                      : card.rotation * 2,
                  scale: selectedCardIndex === index ? 1.2 : 
                    animationStage === 'revealing' && index !== selectedCardIndex ? 0.8 : 1,
                  opacity: animationStage === 'complete' && index !== selectedCardIndex ? 0.3 : 1
                }}
                transition={{
                  duration: animationStage === 'shuffling' ? 1.5 : 0.8,
                  repeat: animationStage === 'shuffling' ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <Card className={`w-24 h-36 bg-mystical-gradient border-gold/30 relative overflow-hidden cursor-pointer
                  ${selectedCardIndex === index ? 'ring-2 ring-gold animate-glow' : ''}
                `}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-purple-500/10" />
                  
                  {/* 神秘符号 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="text-gold/50" size={20} />
                    </motion.div>
                  </div>

                  {/* 选中时的特效 */}
                  {selectedCardIndex === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      className="absolute inset-0 bg-gold/20 rounded-lg"
                    />
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 底部加载指示器 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gold rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}