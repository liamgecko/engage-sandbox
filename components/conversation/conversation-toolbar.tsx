"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ListFilterPlus, ChevronDown } from "lucide-react";

interface ToolbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export function Toolbar({ 
  activeTab = "my-conversations", 
  onTabChange,
  searchValue = "",
  onSearchChange,
  onFilterClick 
}: ToolbarProps) {
  // Remove unused parameter warning by using onTabChange
  const handleTabClick = (tabValue: string) => {
    onTabChange?.(tabValue);
  };
  const [search, setSearch] = useState(searchValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange?.(value);
  };

  const tabs = [
    { value: "my-conversations", label: "My conversations", count: 1, hasDot: false },
    { value: "unassigned", label: "Unassigned", count: 9775, hasDot: true },
    { value: "open", label: "Open", count: 30330, hasDot: true },
    { value: "closed", label: "Closed", count: 0, hasDot: false },
    { value: "sent", label: "Sent", count: 0, hasDot: false },
    { value: "assigned-to-bot", label: "Assigned to bot", count: 241, hasDot: true },
  ];

  return (
    <div className="bg-white border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between pl-2 py-2 pr-4">
        {/* Navigation Tabs - Responsive */}
        <div className="flex items-center space-x-[2px]">
          {/* Desktop: Show all tabs */}
          <div className="hidden xl:flex items-center space-x-[2px]">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant="ghost"
                size="sm"
                onClick={() => handleTabClick(tab.value)}
                className={`relative px-2 py-2 text-[13px] ${
                  activeTab === tab.value
                    ? "text-foreground bg-slate-100"
                    : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-1">
                  {tab.hasDot && (
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-1" />
                  )}
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({tab.count.toLocaleString()})
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Mobile/Tablet: Show dropdown */}
          <div className="xl:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3">
                  {tabs.find(tab => tab.value === activeTab)?.label || "Menu"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 space-y-px">
                {tabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.value}
                    onClick={() => handleTabClick(tab.value)}
                    className={`flex items-center gap-2 ${
                      activeTab === tab.value ? "bg-slate-100" : ""
                    }`}
                  >
                    {tab.hasDot && (
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                    )}
                    <span className="flex-1">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {tab.count.toLocaleString()}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="iconSm"
                onClick={onFilterClick}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <ListFilterPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Create custom filter</p>
            </TooltipContent>
          </Tooltip>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className="pl-8 pr-4 h-8 w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
