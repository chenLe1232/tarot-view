import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './components/HomePage';
import ShuffleAnimationPage from './components/ShuffleAnimationPage';
import DrawCardPage from './components/DrawCardPage';
import DailyCardPage from './components/DailyCardPage';
import ResultPage from './components/ResultPage';
import ChatPage from './components/ChatPage';
import CalendarPage from './components/CalendarPage';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';
import BottomNavigation from './components/BottomNavigation';

type PageType = 'home' | 'shuffle' | 'draw' | 'daily' | 'result' | 'chat' | 'calendar' | 'explore' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    const pageProps = { onNavigate: handleNavigate };
    
    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />;
      case 'shuffle':
        return <ShuffleAnimationPage {...pageProps} />;
      case 'draw':
        return <DrawCardPage {...pageProps} />;
      case 'daily':
        return <DailyCardPage {...pageProps} />;
      case 'result':
        return <ResultPage {...pageProps} />;
      case 'chat':
        return <ChatPage {...pageProps} />;
      case 'calendar':
        return <CalendarPage {...pageProps} />;
      case 'explore':
        return <ExplorePage {...pageProps} />;
      case 'profile':
        return <ProfilePage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  const showBottomNav = !['result', 'shuffle'].includes(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* 液体背景层 */}
      <div className="fixed inset-0 liquid-background" />
      
      {/* 深度背景渐变 - 使用新的 #060735 主色调 */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/95 via-purple-900/85 to-deep-blue/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-purple/3 to-neon-blue/3" />
      </div>
      
      {/* 动态装饰球体 */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="floating-orb fixed top-20 left-10 w-64 h-64 pointer-events-none opacity-25" 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0],
          y: [0, 30, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="floating-orb fixed bottom-32 right-12 w-48 h-48 pointer-events-none opacity-15" 
      />
      <motion.div 
        animate={{ 
          x: [0, 60, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="floating-orb fixed top-1/2 right-8 w-32 h-32 pointer-events-none opacity-20" 
      />
      
      {/* 主要内容区域 */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="min-h-screen"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部导航 */}
      {showBottomNav && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BottomNavigation 
            currentPage={currentPage} 
            onPageChange={handleNavigate}
          />
        </motion.div>
      )}

      {/* 全屏装饰渐变 */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-neon-purple/8 to-transparent"
        />
        <motion.div
          animate={{ 
            opacity: [0.05, 0.12, 0.05],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-gold/6 to-transparent"
        />
      </div>
    </div>
  );
}