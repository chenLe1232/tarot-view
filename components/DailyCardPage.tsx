import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Stars, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface DailyCardPageProps {
  onNavigate: (page: string) => void;
}

export default function DailyCardPage({ onNavigate }: DailyCardPageProps) {
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  const todaysDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDrawCard = () => {
    onNavigate('animation');
  };

  return (
    <div className="p-4 pb-20 min-h-screen">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('home')}
          className="text-muted-foreground"
        >
          <ArrowLeft size={20} className="mr-2" />
          返回
        </Button>
        <h1>每日一牌</h1>
        <div className="w-16" /> {/* 占位符保持居中 */}
      </div>

      {/* 日期显示 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Stars className="text-gold" size={20} />
          <p className="text-gold">{todaysDate}</p>
          <Stars className="text-gold" size={20} />
        </div>
        <h2 className="text-xl">今日塔罗指引</h2>
      </motion.div>

      {!hasDrawnToday ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 神秘背景卡片 */}
          <div className="relative mb-8 mx-auto w-48 h-72">
            <motion.div
              animate={{ rotateY: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-full h-full"
            >
              <Card className="w-full h-full bg-mystical-gradient border-gold/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-purple-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-gold/50">?</div>
                </div>
                {/* 神秘光效 */}
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/10 to-transparent"
                />
              </Card>
            </motion.div>
          </div>

          {/* 指引文字 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-muted-foreground mb-2">静心冥想，感受内心的声音</p>
            <p className="text-sm text-muted-foreground">点击下方按钮，抽取你的每日指引牌</p>
          </motion.div>

          {/* 抽牌按钮 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleDrawCard}
              className="bg-gold-gradient hover:opacity-90 text-black px-8 py-3 rounded-xl relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <Sparkles size={20} className="mr-2" />
              开始抽牌
            </Button>
          </motion.div>

          {/* 温馨提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="card-mystical p-4">
              <div className="flex items-start gap-3">
                <Stars className="text-gold flex-shrink-0 mt-1" size={16} />
                <div>
                  <h4 className="font-medium mb-2">温馨提示</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 每天只能抽取一张指引牌</li>
                    <li>• 抽牌前请保持内心宁静</li>
                    <li>• 用心感受牌面传达的信息</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        /* 已抽牌状态 */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">今日已抽牌</p>
          <Card className="card-mystical p-6 mb-6">
            <h3 className="mb-2">愚者 (The Fool)</h3>
            <p className="text-muted-foreground">新的开始即将到来，保持童心与好奇心。</p>
          </Card>
          <Button
            onClick={() => onNavigate('calendar')}
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10"
          >
            <RefreshCw size={16} className="mr-2" />
            查看历史记录
          </Button>
        </motion.div>
      )}
    </div>
  );
}