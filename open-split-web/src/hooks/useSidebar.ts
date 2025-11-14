"use client";

import { useUIStore } from "@/lib/store";

export function useSidebar() {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = useUIStore();

  return {
    isOpen: sidebarOpen,
    open: () => setSidebarOpen(true),
    close: () => setSidebarOpen(false),
    toggle: toggleSidebar,
  };
}

