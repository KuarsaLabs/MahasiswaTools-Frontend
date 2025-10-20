import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { usePage } from './sidebar-provider';

interface NavItem {
  title: string;
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: {
    title: string;
    id: string;
  }[];
}

interface NavMainProps {
  items: {
    title: string;
    items: NavItem[];
  }[];
}

// @note navigation main component with state-based selection
export function NavMain({ items }: NavMainProps) {
  const { activePage, setActivePage } = usePage();

  const handleNavClick = (itemId: string) => {
    setActivePage(itemId);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {item.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
            <SidebarMenu>
              {item.items.map((navItem) => (
                <SidebarMenuItem key={navItem.title}>
                  <SidebarMenuButton
                    isActive={activePage === navItem.id}
                    onClick={() => handleNavClick(navItem.id)}
                    className="cursor-pointer"
                  >
                    {navItem.icon && <navItem.icon />}
                    <span>{navItem.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </React.Fragment>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
