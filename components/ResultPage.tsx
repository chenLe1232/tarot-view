import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, MessageCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ResultPageProps {
  onNavigate: (page: string) => void;
}

export default function ResultPage({ onNavigate }: ResultPageProps) {
  const cardData = {
    name: "愚者",
    englishName: "The Fool",
    number: "0",
    description:
      "愚者代表着新的开始和无限的可能性。这是一张充满希望和冒险精神的牌，暗示着你正处在人生的一个新起点。保持开放的心态，勇敢地迎接未知的挑战。你的直觉会指引你走向正确的方向，相信自己的内心声音。",
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("home")}
          className="text-muted-foreground"
        >
          <ArrowLeft size={20} className="mr-2" />
          返回
        </Button>
        <h1>解读结果</h1>
        <div className="w-16" />
      </div>

      <div className="flex flex-col items-center">
        {/* 塔罗牌展示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <Card className="w-48 h-72 bg-mystical-gradient border-gold relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple-500/20" />

            {/* 卡牌内容 */}
            <div className="h-full flex flex-col items-center justify-center text-white p-4">
              <div className="text-sm text-gold mb-2">{cardData.number}</div>
              <div className="text-4xl mb-4">🌟</div>
              <div className="text-xl font-bold mb-2">{cardData.name}</div>
              <div className="text-sm opacity-75">{cardData.englishName}</div>
            </div>

            {/* 光效 */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/10 to-transparent"
            />
          </Card>

          {/* 周围光环 */}
          <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl scale-110 animate-pulse" />
        </motion.div>

        {/* 解读内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <Card className="card-mystical p-6 mb-8">
            <h3 className="mb-4 text-center">{cardData.name}的指引</h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              {cardData.description}
            </p>
          </Card>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-3 w-full max-w-sm"
        >
          <Button
            onClick={() => onNavigate("chat")}
            className="flex-1 bg-neon-gradient hover:opacity-90 text-white rounded-xl"
          >
            <MessageCircle size={16} className="mr-2" />
            深度解读
          </Button>
          <Button
            onClick={() => onNavigate("draw")}
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10 rounded-xl px-6"
          >
            <RefreshCw size={16} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
