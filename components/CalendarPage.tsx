import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion } from "motion/react";

interface CalendarPageProps {
  onNavigate: (page: string) => void;
}

interface CardRecord {
  date: string;
  cardName: string;
  cardType: "major" | "minor";
  mood: "positive" | "neutral" | "negative";
  keywords: string[];
}

export default function CalendarPage({ onNavigate }: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 模拟抽牌记录数据
  const cardRecords: CardRecord[] = [
    {
      date: "2024-12-20",
      cardName: "愚者",
      cardType: "major",
      mood: "positive",
      keywords: ["新开始", "冒险", "潜能"],
    },
    {
      date: "2024-12-19",
      cardName: "女皇",
      cardType: "major",
      mood: "positive",
      keywords: ["创造", "繁荣", "母性"],
    },
    {
      date: "2024-12-18",
      cardName: "隐士",
      cardType: "major",
      mood: "neutral",
      keywords: ["内省", "智慧", "指引"],
    },
    {
      date: "2024-12-17",
      cardName: "圣杯三",
      cardType: "minor",
      mood: "positive",
      keywords: ["庆祝", "友谊", "创意"],
    },
    {
      date: "2024-12-16",
      cardName: "宝剑五",
      cardType: "minor",
      mood: "negative",
      keywords: ["冲突", "挫败", "损失"],
    },
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // 生成日历数据
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  // 添加空白天数
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }

  // 添加实际天数
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDateString = (day: number) => {
    return `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const getCardForDate = (day: number) => {
    const dateString = getDateString(day);
    return cardRecords.find((record) => record.date === dateString);
  };

  const selectedRecord = selectedDate
    ? cardRecords.find((r) => r.date === selectedDate)
    : null;

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "positive":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "negative":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="p-4 pb-20 min-h-screen">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("home")}
          className="text-muted-foreground"
        >
          <ArrowLeft size={20} className="mr-2" />
          返回
        </Button>
        <h1>抽牌历史</h1>
        <div className="w-16" />
      </div>

      {/* 月份导航 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth("prev")}
          className="text-muted-foreground"
        >
          <ChevronLeft size={20} />
        </Button>

        <div className="text-center">
          <h2 className="text-xl">
            {currentDate.toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
            })}
          </h2>
          <p className="text-sm text-muted-foreground">
            本月共抽牌{" "}
            {
              cardRecords.filter((r) =>
                r.date.startsWith(
                  `${currentYear}-${(currentMonth + 1)
                    .toString()
                    .padStart(2, "0")}`
                )
              ).length
            }{" "}
            次
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth("next")}
          className="text-muted-foreground"
        >
          <ChevronRight size={20} />
        </Button>
      </motion.div>

      {/* 日历网格 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <Card className="card-mystical p-4">
          {/* 星期标题 */}
          <div className="grid grid-cols-7 mb-2">
            {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
              <div
                key={day}
                className="text-center py-2 text-sm text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              // Create unique key for each cell
              const uniqueKey = `calendar-${currentYear}-${currentMonth}-${index}-${
                day || "empty"
              }`;

              if (!day) {
                return <div key={uniqueKey} className="aspect-square" />;
              }

              const dateString = getDateString(day);
              const cardRecord = getCardForDate(day);
              const isToday =
                dateString === new Date().toISOString().split("T")[0];
              const isSelected = selectedDate === dateString;

              return (
                <motion.button
                  key={uniqueKey}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  onClick={() =>
                    setSelectedDate(cardRecord ? dateString : null)
                  }
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all duration-300 relative ${
                    cardRecord
                      ? isSelected
                        ? "bg-gold/30 border-2 border-gold text-white scale-105"
                        : "bg-muted/30 hover:bg-muted/50 border border-border/50"
                      : "hover:bg-muted/20"
                  } ${isToday ? "ring-2 ring-primary/50" : ""}`}
                >
                  <span className={`${cardRecord ? "font-medium" : ""}`}>
                    {day}
                  </span>

                  {cardRecord && (
                    <>
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-1 ${
                          getMoodColor(cardRecord.mood)
                            .replace("bg-", "bg-")
                            .split(" ")[0]
                        }`}
                      />
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-gold/10 rounded-lg"
                        />
                      )}
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* 选中日期详情 */}
      {selectedRecord && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="card-mystical p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="text-gold" size={20} />
              <h3>
                {new Date(selectedRecord.date).toLocaleDateString("zh-CN", {
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <Badge className={getMoodColor(selectedRecord.mood)}>
                {selectedRecord.cardType === "major" ? "大阿卡纳" : "小阿卡纳"}
              </Badge>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">
                {selectedRecord.cardName}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecord.keywords.map((keyword, index) => (
                  <span
                    key={`${selectedRecord.date}-${keyword}-${index}`}
                    className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-md border border-gold/30"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onNavigate("chat")}
                size="sm"
                className="bg-neon-gradient hover:opacity-90 text-white"
              >
                重新解读
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                查看详情
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* 统计信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        {[
          { label: "总抽牌次数", value: cardRecords.length, icon: "🎯" },
          {
            label: "积极卡牌",
            value: cardRecords.filter((r) => r.mood === "positive").length,
            icon: "✨",
          },
          {
            label: "大阿卡纳",
            value: cardRecords.filter((r) => r.cardType === "major").length,
            icon: "⭐",
          },
        ].map((stat, index) => (
          <motion.div
            key={`stat-${stat.label}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <Card className="card-mystical p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-gold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
