import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

// @note site header component with routing-based breadcrumbs
export function SiteHeader() {
  const location = useLocation();

  // @note generate breadcrumb from current route
  const getPageTitle = (pathname: string) => {
    const pageTitles: { [key: string]: string } = {
      '/': 'Dashboard',
      '/makalah-maker': 'Makalah Maker',
      '/settings': 'Pengaturan',
    };
    return pageTitles[pathname] || pathname;
  };

  return (
    <header className="flex h-16 md:h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="ml-2 md:-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Beranda</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {getPageTitle(location.pathname)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center">
          <div className="rounded-lg bg-white/10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
