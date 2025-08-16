import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  User,
  Settings,
  Heart,
  Calendar,
  BookOpen,
  Crown,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const menuItems = [
    {
      id: "calendar",
      icon: Calendar,
      title: "占卜记录",
      description: "查看我的占卜历史",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: "favorites",
      icon: Heart,
      title: "我的收藏",
      description: "收藏的塔罗牌和解读",
      color: "from-pink-500/20 to-red-500/20",
    },
    {
      id: "learning",
      icon: BookOpen,
      title: "学习进度",
      description: "塔罗课程和成就",
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      id: "vip",
      icon: Crown,
      title: "会员中心",
      description: "升级获得更多功能",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      id: "settings",
      icon: Settings,
      title: "设置",
      description: "账户和应用设置",
      color: "from-gray-500/20 to-slate-500/20",
    },
  ];

  return (
    <div className="p-4 pb-24 min-h-screen relative">
      {/* 背景装饰 */}
      <div className="floating-orb fixed top-20 left-8 w-32 h-32 pointer-events-none" />
      <div
        className="floating-orb fixed bottom-40 right-6 w-24 h-24 pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      {/* 顶部用户信息卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 relative z-10"
      >
        <Card className="liquid-card p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
            >
              <User className="text-gold" size={32} />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">神秘占卜师</h2>
              <p className="text-sm text-muted-foreground">
                探索塔罗奥秘，感受宇宙能量
              </p>
            </div>
          </div>

          {/* 用户统计 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl text-gold mb-1"
              >
                128
              </motion.div>
              <p className="text-xs text-muted-foreground">占卜次数</p>
            </div>
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="text-2xl text-neon-purple mb-1"
              >
                42
              </motion.div>
              <p className="text-xs text-muted-foreground">学习天数</p>
            </div>
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="text-2xl text-neon-blue mb-1"
              >
                Level 3
              </motion.div>
              <p className="text-xs text-muted-foreground">占卜等级</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 功能菜单列表 */}
      <div className="space-y-4 relative z-10">
        {menuItems.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (item.id === "calendar") {
                  onNavigate("calendar");
                } else {
                  // 其他功能暂时保持在当前页面
                  console.log(`Navigate to ${item.id}`);
                }
              }}
              className="cursor-pointer"
            >
              <Card className="liquid-card p-4 rounded-2xl relative overflow-hidden">
                {/* 背景装饰 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-50`}
                />

                <div className="relative z-10 flex items-center">
                  <motion.div
                    animate={
                      item.id === "vip"
                        ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`w-12 h-12 glass-card rounded-xl flex items-center justify-center mr-4 ${
                      item.id === "vip" ? "text-gold" : "text-white"
                    }`}
                  >
                    <ItemIcon size={20} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight size={20} className="text-muted-foreground" />
                </div>

                {/* 光效 */}
                <div className="absolute inset-0 shimmer rounded-2xl" />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 底部装饰 */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent rounded-full"
      />
    </div>
  );
}
