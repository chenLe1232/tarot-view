import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DrawCardPageProps {
  onNavigate: (page: string) => void;
}

export default function DrawCardPage({ onNavigate }: DrawCardPageProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    rotation: (i - 3) * 8,
    y: Math.abs(i - 3) * 20,
    x: (i - 3) * 45,
  }));

  const handleCardSelect = (cardId: number) => {
    setSelectedCard(cardId);
    setTimeout(() => {
      onNavigate("result");
    }, 800);
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("shuffle")}
          className="text-muted-foreground"
        >
          <ArrowLeft size={20} className="mr-2" />
          重新洗牌
        </Button>
        <h1>选择你的牌</h1>
        <div className="w-20" />
      </div>

      {/* 指引文字 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-lg mb-2">静心冥想</p>
        <p className="text-muted-foreground">用心感受，选择与你有缘的牌</p>
      </motion.div>

      {/* 卡牌选择区域 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full h-80">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{
                opacity: 1,
                scale: selectedCard === card.id ? 1.3 : 1,
                y: card.y,
                rotate: card.rotation,
                x: card.x,
                filter:
                  selectedCard !== null && selectedCard !== card.id
                    ? "blur(2px) opacity(0.3)"
                    : "blur(0px) opacity(1)",
                zIndex: selectedCard === card.id ? 10 : 5 - Math.abs(index - 3),
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{
                scale: selectedCard === null ? 1.1 : undefined,
                y: selectedCard === null ? card.y - 10 : card.y,
              }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => selectedCard === null && handleCardSelect(card.id)}
            >
              {/* 塔罗牌背面 */}
              <div className="relative">
                <div className="w-20 h-28 bg-mystical-gradient border-2 border-gold/30 rounded-lg relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple-500/20" />

                  {/* 卡背装饰 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-gold/70 mb-2"
                    >
                      <Sparkles size={16} />
                    </motion.div>

                    {/* 神秘符号 */}
                    <div className="grid grid-cols-3 gap-1 opacity-60">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-1 h-1 bg-gold/50 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* 悬浮光环 */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/10 to-transparent rounded-lg"
                  />
                </div>

                {/* 选中特效 */}
                {selectedCard === card.id && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 1.2],
                        opacity: [0, 0.8, 0.5],
                      }}
                      className="absolute inset-0 w-20 h-28 bg-gold/20 border-2 border-gold rounded-lg shadow-2xl"
                    />

                    {/* 选中光芒 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 bg-gold/10 rounded-lg blur-sm scale-150"
                    />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground">
          {selectedCard === null ? "点击选择一张牌" : "正在为你解读..."}
        </p>
      </motion.div>
    </div>
  );
}
