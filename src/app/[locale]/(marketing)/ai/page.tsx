import ChatbotSection from '@/components/AI-Planner/chatbot-section';
import EventRecommenderSection from '@/components/AI-Planner/event-recommender-section';
import ExpenseEstimatorSection from '@/components/AI-Planner/expense-estimator-section';
import HeroSection from '@/components/AI-Planner/hero-section';
import RouteOptimizerSection from '@/components/AI-Planner/route-optimizer-section';
import WeatherSection from '@/components/AI-Planner/weather-section';
import { ThemeProvider } from 'next-themes'; // Add the correct module for ThemeProvider// import TourGuideHeader from '@/components/AI-Planner/tour-guide-header';

export default function TourGuidePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-gradient-to-b ">
        {/* <TourGuideHeader /> */}
        <div className="container mx-auto px-4 py-8">
          <HeroSection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ChatbotSection />
            <WeatherSection />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <RouteOptimizerSection />
            <ExpenseEstimatorSection />
            <EventRecommenderSection />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
