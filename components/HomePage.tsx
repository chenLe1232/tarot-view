import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sparkles, MessageCircle, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24 relative">
      {/* 背景装饰球体 */}
      <div className="floating-orb fixed top-20 left-10 w-32 h-32 pointer-events-none" />
      <div
        className="floating-orb fixed bottom-40 right-12 w-24 h-24 pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
        style={{
          fontFamily:
            '"PingFang SC", "PingFang TC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif',
        }}
      >
        <h1 className="text-4xl mb-3 text-neon-glow">塔罗占卜</h1>
        <p className="text-lg text-muted-foreground">探索内心，指引未来</p>
      </motion.div>

      {/* 主卡片 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mb-12"
      >
        <Card className="w-52 h-80 liquid-card relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 animate-liquid-glow rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20" />

          {/* 主要内容 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="text-7xl mb-4"
            >
              🌟
            </motion.div>
            <div className="text-center">
              <h3 className="text-gold mb-2">神秘塔罗</h3>
              <p className="text-sm text-muted-foreground px-4">
                感受宇宙的能量
              </p>
            </div>
          </div>

          {/* 神秘光效 */}
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              rotate: 180,
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/10 to-transparent"
          />

          {/* 边缘光晕 */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
        </Card>
      </motion.div>

      {/* 主要操作按钮 - 确保高度为50px */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col w-full max-w-sm gap-4 relative z-10"
      >
        <Button
          onClick={() => onNavigate("shuffle")}
          className="glass-gold-button text-lg rounded-xl shadow-2xl h-[50px] flex items-center justify-center"
          style={{
            fontFamily:
              '"PingFang SC", "PingFang TC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif',
          }}
        >
          <Sparkles size={20} className="mr-2" />
          开始抽牌
        </Button>

        <Button
          onClick={() => onNavigate("daily")}
          className="glass-button py-3 text-lg rounded-xl text-white shadow-xl h-[50px] flex items-center justify-center"
          style={{
            fontFamily:
              '"PingFang SC", "PingFang TC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif',
          }}
        >
          每日一牌
        </Button>
      </motion.div>

      {/* 辅助功能 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex gap-8 mt-10 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("chat")}
          className="glass-card flex flex-col items-center text-muted-foreground hover:text-white transition-all duration-300 p-4 rounded-xl"
          style={{
            fontFamily:
              '"PingFang SC", "PingFang TC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif',
          }}
        >
          <MessageCircle size={28} className="mb-2" />
          <span className="text-sm">AI咨询</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("calendar")}
          className="glass-card flex flex-col items-center text-muted-foreground hover:text-white transition-all duration-300 p-4 rounded-xl"
          style={{
            fontFamily:
              '"PingFang SC", "PingFang TC", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif',
          }}
        >
          <Calendar size={28} className="mb-2" />
          <span className="text-sm">历史记录</span>
        </motion.button>
      </motion.div>

      {/* 底部装饰 */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-8 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </div>
  );
}
