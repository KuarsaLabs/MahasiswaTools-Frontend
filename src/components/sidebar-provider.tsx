import React, { createContext, useContext, useState, useEffect } from 'react';

interface PageContextType {
  activePage: string;
  setActivePage: (page: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function usePage() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}

interface PageProviderProps {
  children: React.ReactNode;
  defaultPage?: string;
}

export function PageProvider({
  children,
  defaultPage = 'general'
}: PageProviderProps) {
  const [activePage, setActivePage] = useState(() => {
    // Check localStorage first, then fallback to defaultPage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebar_active_page');
      return stored || defaultPage;
    }
    return defaultPage;
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar_active_page', activePage);
    }
  }, [activePage]);

  const value = {
    activePage,
    setActivePage,
  };

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
}
