import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { SiteHeader } from './site-header';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {}

// @note main dashboard layout component with routing support
export function DashboardLayout({}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <div className="sticky top-0 z-10 border-b backdrop-blur-md bg-background/75 supports-[backdrop-filter]:bg-background/60">
            <SiteHeader />
          </div>
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto p-6 flex flex-1 flex-col gap-2">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
