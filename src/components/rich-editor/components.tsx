import React from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

// @note toolbar component for rich editor
export const Toolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-1 p-2 border-b bg-muted/50 rounded-t-lg",
      className,
    )}
    {...props}
  />
));
Toolbar.displayName = "Toolbar";

// @note toolbar button component
interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(({ className, active, ...props }, ref) => (
  <Button
    ref={ref}
    variant={active ? "default" : "ghost"}
    size="sm"
    className={cn(
      "h-8 w-8 p-0",
      active && "bg-primary text-primary-foreground",
      className,
    )}
    {...props}
  />
));
ToolbarButton.displayName = "ToolbarButton";

// @note icon component for toolbar buttons
interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center text-base",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);
Icon.displayName = "Icon";
