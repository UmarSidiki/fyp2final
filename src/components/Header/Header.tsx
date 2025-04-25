'use client';
import LocaleSwitcher from '@/components/LocaleSwitcher2';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useScroll from '@/hooks/useScroll';
import { Home, Mail, Map, Menu, Wand2, X } from 'lucide-react';
import { useState } from 'react';
import { MdOutlineTextSnippet } from 'react-icons/md';
import { ThemeToggle } from '../ThemeToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScroll();

  const MenuItems = [
    { title: 'Home', url: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { title: 'Blog', url: '/blog', icon: <MdOutlineTextSnippet className="w-4 h-4 mr-2" /> },
    { title: 'Destinations', url: '/blog', icon: <Map className="w-4 h-4 mr-2" /> },
    { title: 'AI Planner', url: '/ai-planner', icon: <Wand2 className="w-4 h-4 mr-2" /> },
    { title: 'Contact', url: '/contact', icon: <Mail className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header
      className={`fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'left-8 right-8 py-3 mt-2 rounded-xl bg-green-50/90 dark:bg-green-950/90 shadow-lg border border-green-200 dark:border-green-800'
          : 'left-0 right-0 py-3 bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-800'
      }`}
    >
      <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div
            className={`${
              isScrolled ? 'w-8 h-8' : 'w-10 h-10'
            } bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse shadow-lg shadow-green-500/50 transition-all duration-300`}
          >
            AI
          </div>
          <h2
            className={`font-bold text-green-600 dark:text-green-400 tracking-wide transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}
          >
            TheTravelers
          </h2>
        </div>

        {/* Desktop Navigation: Menu Items (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {MenuItems.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={item.url}
                    className={`${navigationMenuTriggerStyle()} relative text-slate-700 dark:text-slate-300 
                      hover:text-green-600 dark:hover:text-green-400 px-3 py-1 transition-all duration-300 ease-in-out
                      rounded-md before:content-[''] before:absolute before:inset-0 before:-z-10 
                      before:bg-green-500/30 dark:before:bg-green-400/30 before:blur-md before:opacity-0 
                      hover:before:opacity-100 before:transition-opacity text-sm`}
                  >
                    <span className="relative z-10 flex items-center font-medium tracking-wide">
                      {item.icon}
                      {item.title}
                    </span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right-Side Buttons (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              className={`relative text-green-600 dark:text-green-400 border-green-300 dark:border-green-600 
                hover:text-green-700 dark:hover:text-green-300 hover:border-green-400 dark:hover:border-green-500 
                transition-all duration-300 rounded-md before:content-[''] before:absolute before:inset-0 before:-z-10 
                before:bg-green-500/20 dark:before:bg-green-400/20 before:blur-md before:opacity-0 
                hover:before:opacity-100 before:transition-opacity shadow-sm hover:shadow-md hover:shadow-green-500/30 ${
    isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'
    }`}
            >
              <span className="relative z-10">Sign Up</span>
            </Button>
            <Button
              className={`relative bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 
                transition-all duration-300 rounded-md before:content-[''] before:absolute before:inset-0 before:-z-10 
                before:bg-green-500/30 dark:before:bg-green-400/30 before:blur-md before:opacity-0 
                hover:before:opacity-100 before:transition-opacity shadow-md hover:shadow-lg hover:shadow-green-600/50 ${
    isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'
    }`}
            >
              <span className="relative z-10">Sign In</span>
            </Button>
            <LocaleSwitcher isScrolled={isScrolled} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-800 dark:text-slate-200 hover:bg-green-100 dark:hover:bg-green-900/20"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-green-50 dark:bg-green-950 p-0 border-r border-green-200 dark:border-green-800">
            <ScrollArea className="h-full">
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <h2 className="text-xl font-bold text-green-600 dark:text-green-400">TheTravilers</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-800 dark:text-slate-200 hover:bg-green-100 dark:hover:bg-green-900/20"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  {MenuItems.map((item, index) => (
                    <a
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      href={item.url}
                      className="text-slate-700 dark:text-slate-300 text-lg py-2 px-4 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full text-green-600 dark:text-green-400 border-green-300 dark:border-green-600 hover:text-green-700 dark:hover:text-green-300 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                  <Button
                    className="w-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                  <LocaleSwitcher isScrolled={false} />
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
