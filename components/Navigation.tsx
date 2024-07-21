"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  SettingsIcon,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";
import { Themes } from "@/constants/Theme";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaintBucket } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarLinks } from "@/constants/SidebarLinks";
import Road from "./Road";
import { signOut } from "@/lib/actions/user.action";

const Navigation = (user: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState("");
  const location = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpen(location);
  }, [location]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("Green");

  const toggleDarkMode = async () => {
    setIsDarkMode(!isDarkMode);
    await saveTheme();
  };

  const handleThemeChange = async (value: any) => {
    setSelectedTheme(value);
    await saveTheme();
  };

  const saveTheme = async () => {
    if (!user) return;
    const theme = selectedTheme + (isDarkMode ? "-dark" : "");
    try {
      document.documentElement.className = theme;
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  useEffect(() => {
    saveTheme();
  }, [selectedTheme, isDarkMode]);

  return (
    <>
      <TooltipProvider>
        <div className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {SidebarLinks.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.route}
                    className={`flex items-center gap-4 px-2.5 ${
                      isMenuOpen === item.route
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky justify-between top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <div className="flex flex-col justify-between py-5 h-full">
                  <div className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">PDFigma</span>
                    </Link>
                    {SidebarLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.route}
                        className={`flex items-center gap-4 px-2.5 ${
                          isMenuOpen === item.route
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Link
                      href="/settings"
                      className={`flex items-center gap-4 px-2.5 text-lg font-medium ${
                        isMenuOpen === "/settings"
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <SettingsIcon className="h-5 w-5" />
                      Settings
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Road />
            <div className="flex flex-row items-center gap-3">
              <div className="grid gap-3">
                <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Themes.map((theme) => (
                      <SelectItem key={theme.name} value={theme.name}>
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <PaintBucket
                            style={{
                              color: theme.color,
                              padding: "2px 4px",
                              borderRadius: "4px",
                            }}
                            className="size-5"
                          />
                          <div className="grid gap-0.5">
                            <p>{theme.name}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Switch
                  id="theme-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                      src="/avatar.jpeg"
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
        </div>
      </TooltipProvider>
    </>
  );
};

export default Navigation;
