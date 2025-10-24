import * as React from 'react';
import { Brain, FileText, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { NavMain } from './nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

// @note sidebar data with routing-based navigation
const sidebarData = {
  navMain: [
    {
      title: 'Main',
      items: [
        {
          title: 'Makalah Maker',
          url: '/makalah-maker',
          icon: FileText,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0"
            >
              <NavLink to="/" className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-lg">
                    <Brain className="w-5 h-5" />
                  </span>
                </div>
                <span className="font-bold text-sm md:text-lg truncate">
                  MahasiswaTools
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
