import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavMainProps {
  items: {
    title: string;
    items: NavItem[];
  }[];
}

// @note navigation main component with routing-based selection
export function NavMain({ items }: NavMainProps) {
  const location = useLocation();

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
                    isActive={location.pathname === navItem.url}
                    className="cursor-pointer"
                    asChild
                  >
                    <NavLink to={navItem.url}>
                      {navItem.icon && <navItem.icon />}
                      <span>{navItem.title}</span>
                    </NavLink>
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
