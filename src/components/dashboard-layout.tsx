import React from 'react';
import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './site-header';
import { PageProvider, usePage } from './sidebar-provider';
import { General } from '../pages/general';
import { Settings } from '../pages/settings';

interface DashboardContentProps {}

// @note dashboard content component that renders based on active page
function DashboardContent({}: DashboardContentProps) {
  const { activePage } = usePage();

  const renderContent = () => {
    switch (activePage) {
      case 'general':
        return <General />;
      case 'settings':
        return <Settings />;
      default:
        return <General />;
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="container mx-auto p-6 flex flex-1 flex-col gap-2">
        {renderContent()}
      </div>
    </div>
  );
}

interface DashboardLayoutProps {}

// @note main dashboard layout component
export function DashboardLayout({}: DashboardLayoutProps) {
  return (
    <PageProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col">
            <div className="sticky top-0 z-10 border-b backdrop-blur-md bg-background/75 supports-[backdrop-filter]:bg-background/60">
              <SiteHeader />
            </div>
            <div className="flex-1 overflow-auto">
              <DashboardContent />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </PageProvider>
  );
}
