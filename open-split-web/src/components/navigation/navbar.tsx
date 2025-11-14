"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">Open Split</h1>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}

