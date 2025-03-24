'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export const BaseTemplate = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Only render theme-dependent UI after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className={`relative w-full min-h-[calc(100vh-70px)] overflow-x-hidden ${props.className || ''}`}
      >
        {/* Initially render a neutral background that works for both themes */}
        {!mounted
          ? (<div className="absolute inset-0 z-0 bg-gray-50 dark:bg-gray-900"></div>)
          : (
              <>
                {/* Black and Green Gradient Background - Only render after mounting */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, #000000 0%, #05382a 120%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #dcfce7 100%)',
                  }}
                >
                </div>

                {/* Dotted Pattern with Faded Edges */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at center, transparent 100%, ${isDark ? '#0F172A80' : '#f8fafc80'} 70%), 
                                url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23${isDark ? '10b981' : '059669'}' fill-opacity='0.15'/%3E%3C/svg%3E")`,
                    backgroundSize: '16px 16px',
                  }}
                >
                </div>

                {/* Gradient Blur Div 1 - Top Left */}
                <div
                  className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] z-0"
                  style={{
                    background: isDark
                      ? 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.1) 70%)'
                      : 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.05) 70%)',
                  }}
                />

                {/* Gradient Blur Div 3 - Center Right */}
                <div
                  className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] z-0"
                  style={{
                    background: isDark
                      ? 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, rgba(13,148,136,0.1) 70%)'
                      : 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(13,148,136,0.05) 70%)',
                  }}
                />

                {/* Glass Effect Element 1 */}
                <div
                  className="absolute top-[15%] left-[10%] w-[200px] h-[200px] rounded-[30px] rotate-[12deg] z-0"
                  style={{
                    background: isDark
                      ? 'rgba(16,185,129,0.08)'
                      : 'rgba(16,185,129,0.05)',
                    backdropFilter: 'blur(8px)',
                    border: isDark
                      ? '1px solid rgba(16,185,129,0.1)'
                      : '1px solid rgba(16,185,129,0.1)',
                  }}
                />

                {/* Glass Effect Element 2 */}
                <div
                  className="absolute bottom-[20%] right-[15%] w-[250px] h-[180px] rounded-[40px] rotate-[-15deg] z-0"
                  style={{
                    background: isDark
                      ? 'rgba(16,185,129,0.06)'
                      : 'rgba(16,185,129,0.04)',
                    backdropFilter: 'blur(8px)',
                    border: isDark
                      ? '1px solid rgba(16,185,129,0.08)'
                      : '1px solid rgba(16,185,129,0.08)',
                  }}
                />

                {/* Subtle Travel Background Pattern */}
                <div
                  className="absolute inset-0 z-0 bg-repeat opacity-[0.04] dark:opacity-[0.05]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23${isDark ? '10b981' : '059669'}' stroke-width='1' stroke-opacity='0.3'%3E%3Ccircle cx='25' cy='25' r='15'/%3E%3Cpath d='M80 25l-40 40M25 80l40-40M170 25L130 65M125 125l45 45M25 125l100-100M125 25L25 125M175 75L75 175'/%3E%3Ccircle cx='175' cy='175' r='15'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                >
                </div>

                {/* Modern Compass Rose */}
                <div
                  className="hidden md:block absolute bottom-10 right-10 w-64 h-64 opacity-[0.05] dark:opacity-[0.07] z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23${isDark ? '10b981' : '059669'}' d='M50 0 L52 48 L100 50 L52 52 L50 100 L48 52 L0 50 L48 48 Z'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23${isDark ? '10b981' : '059669'}'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                </div>
              </>
            )}

        {/* Content Container - Always render */}
        <div className="container relative z-10 w-full min-h-[calc(100vh-70px)] mx-auto flex flex-col justify-center items-center py-8">
          {props.children}
        </div>
      </div>
    </>
  );
};
