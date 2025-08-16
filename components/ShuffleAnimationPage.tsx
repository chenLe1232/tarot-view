import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ShuffleAnimationPageProps {
  onNavigate: (page: string) => void;
}

export default function ShuffleAnimationPage({
  onNavigate,
}: ShuffleAnimationPageProps) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleComplete, setShuffleComplete] = useState(false);

  // 创建多张卡片用于洗牌动画
  const cards = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    initialX: (i % 5) * 50 - 100,
    initialY: Math.floor(i / 5) * 60 - 60,
    rotation: Math.random() * 30 - 15,
  }));

  const startShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      setShuffleComplete(true);
    }, 3500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startShuffle();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getShuffleAnimation = (index: number) => {
    if (!isShuffling) return {};

    return {
      x: [
        0,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200,
        Math.random() * 300 - 150,
        0,
      ],
      y: [
        0,
        Math.random() * 400 - 200,
        Math.random() * 300 - 150,
        Math.random() * 200 - 100,
        0,
      ],
      rotate: [
        0,
        Math.random() * 720 - 360,
        Math.random() * 540 - 270,
        Math.random() * 360 - 180,
        Math.random() * 30 - 15,
      ],
      scale: [1, 0.6, 1.4, 0.8, 1],
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        delay: index * 0.08,
      },
    };
  };

  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
      {/* 背景液体效果 */}
      <div className="liquid-background fixed inset-0 pointer-events-none" />

      {/* 浮动装饰球体 */}
      <div className="floating-orb fixed top-20 left-5 w-40 h-40 pointer-events-none" />
      <div
        className="floating-orb fixed bottom-32 right-8 w-32 h-32 pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8 relative z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("home")}
          className="glass-card text-muted-foreground hover:text-white border-0 rounded-xl"
        >
          <ArrowLeft size={20} className="mr-2" />
          返回
        </Button>
        <h1>洗牌中</h1>
        <div className="w-16" />
      </div>

      {/* 指引文字 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-20"
      >
        {!shuffleComplete ? (
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xl mb-3 text-neon-glow">正在为你洗牌...</p>
            <p className="text-muted-foreground">
              静心等待，让牌组充满宇宙能量
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl mb-3 text-gold text-neon-glow">洗牌完成</p>
            <p className="text-muted-foreground">现在开始选择你的命运之牌</p>
          </motion.div>
        )}
      </motion.div>

      {/* 洗牌动画区域 */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-full h-96">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{
                x: card.initialX,
                y: card.initialY,
                rotate: card.rotation,
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                ...getShuffleAnimation(index),
              }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 15 - index }}
            >
              {/* 液体玻璃塔罗牌背面 */}
              <div className="w-20 h-28 liquid-card relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30" />

                {/* 卡背图案 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: isShuffling ? 360 : 0,
                      scale: isShuffling ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      rotate: {
                        duration: isShuffling ? 1.5 : 0,
                        repeat: isShuffling ? Infinity : 0,
                        ease: "linear",
                      },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                    className="text-gold/80 mb-2"
                  >
                    <Sparkles size={14} />
                  </motion.div>

                  {/* 神秘符号网格 */}
                  <div className="grid grid-cols-3 gap-0.5 opacity-60">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: isShuffling
                            ? [0.2, 1, 0.2]
                            : [0.4, 0.8, 0.4],
                          scale: isShuffling ? [0.8, 1.2, 0.8] : [1, 1, 1],
                        }}
                        transition={{
                          duration: isShuffling ? 1 : 3,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-1 h-1 bg-gold/60 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* 洗牌时的能量波纹 */}
                {isShuffling && (
                  <motion.div
                    animate={{
                      scale: [0.8, 1.5, 0.8],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                    className="absolute inset-0 border-2 border-gold/50 rounded-xl"
                  />
                )}

                {/* 光芒效果 */}
                <div className="absolute inset-0 rounded-xl shimmer" />
              </div>
            </motion.div>
          ))}

          {/* 中心能量漩涡 */}
          {isShuffling && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 1.5, 2.5, 1],
                opacity: [0, 0.8, 0.6, 0.4, 0],
                rotate: 720,
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40"
            >
              <div className="w-full h-full border-2 border-gold/30 rounded-full animate-liquid-glow" />
              <div className="absolute inset-4 border border-neon-purple/40 rounded-full" />
              <div className="absolute inset-8 border border-neon-blue/30 rounded-full" />
            </motion.div>
          )}
        </div>
      </div>

      {/* 底部按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: shuffleComplete ? 1 : 0,
          y: shuffleComplete ? 0 : 30,
        }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-20"
      >
        <Button
          onClick={() => onNavigate("draw")}
          className="glass-gold-button py-6 px-10 text-lg rounded-xl shadow-2xl"
          disabled={!shuffleComplete}
        >
          <Sparkles size={20} className="mr-2" />
          开始选牌
        </Button>
      </motion.div>

      {/* 能量粒子效果 */}
      {isShuffling && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: -10,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
              className="absolute w-1 h-1 bg-gold rounded-full animate-liquid-glow"
            />
          ))}
        </div>
      )}
    </div>
  );
}
