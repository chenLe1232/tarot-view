import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ArrowLeft, Send, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

export default function ChatPage({ onNavigate }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        '你好！我是你的专属塔罗咨询师。✨ 我可以为你解读刚才抽中的"愚者"牌，或者回答你关于塔罗牌的任何问题。',
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      '根据你抽中的"愚者"牌，我感受到你内心对新开始的渴望。这张牌鼓励你放下过往的束缚，以纯真的心态面对未来。你目前是否正在考虑做出某个重要决定？',
      "愚者牌在你的生活中出现，意味着宇宙在邀请你踏出舒适圈。这可能涉及到你的职业、感情或个人成长。相信你的直觉，它会引导你找到正确的方向。",
      "从塔罗的角度来看，愚者代表着信心和勇气。虽然前方的路可能充满未知，但正是这种不确定性蕴含着无限的可能。你准备好迎接这个新的开始了吗？",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "请详细解读愚者牌",
    "这张牌对我的感情有什么建议？",
    "我该如何把握新机遇？",
    "现在是换工作的好时机吗？",
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("home")}
          className="text-muted-foreground"
        >
          <ArrowLeft size={20} className="mr-2" />
          返回
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-mystical-gradient rounded-full flex items-center justify-center">
            <Sparkles className="text-gold" size={16} />
          </div>
          <div>
            <h1>塔罗咨询师</h1>
            <p className="text-xs text-muted-foreground">在线</p>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* 头像 */}
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-gold text-black"
                      : "bg-mystical-gradient"
                  }`}
                >
                  {message.sender === "user" ? (
                    "你"
                  ) : (
                    <Star size={14} className="text-gold" />
                  )}
                </div>

                {/* 消息气泡 */}
                <Card
                  className={`p-3 ${
                    message.sender === "user"
                      ? "bg-gold text-black"
                      : "card-mystical"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-black/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("zh-CN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 正在输入指示器 */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-mystical-gradient rounded-full flex items-center justify-center">
                  <Star size={14} className="text-gold" />
                </div>
                <Card className="card-mystical p-3">
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gold rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* 快捷问题 */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="px-4 pb-4"
        >
          <p className="text-sm text-muted-foreground mb-2">快速提问：</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                onClick={() => setInputValue(question)}
                className="px-3 py-2 bg-muted/20 text-muted-foreground text-xs rounded-lg hover:bg-muted/30 transition-colors"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 输入区域 */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入你的问题..."
            className="bg-muted/20 border-0 rounded-lg"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gold-gradient hover:opacity-90 text-black rounded-lg px-4"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
