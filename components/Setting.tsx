"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Themes } from "@/constants/Theme";
import { PaintBucket, Settings } from "lucide-react";
import { Switch } from "./ui/switch";

const Setting = () => {
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
      <Dialog>
        <DialogTrigger>Settings</DialogTrigger>
        <DialogContent className="space-y-4 w-min">
        <DialogTitle>
          Tema App
        </DialogTitle>
          <div className="grid gap-3">
            <Switch
              id="theme-mode"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
          <div className="grid gap-3">
            <Select value={selectedTheme} onValueChange={handleThemeChange}>
              <SelectTrigger id="model" className="items-start w-min">
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Setting;
