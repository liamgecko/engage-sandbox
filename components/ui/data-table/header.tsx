"use client"

import * as React from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DataTableHeaderProps {
  className?: string
  searchPlaceholder?: string
  searchValue: string
  onSearchChange: (value: string) => void
  onFilterClick?: () => void
  hideInactive?: boolean
  onToggleHideInactive?: (value: boolean) => void
  children?: React.ReactNode
}

export function DataTableHeader({
  className,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  onFilterClick,
  hideInactive = false,
  onToggleHideInactive,
  children,
}: DataTableHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-md border bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex w-full flex-col gap-2 sm:max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-9"
            placeholder={searchPlaceholder}
          />
        </div>
        {/* Mobile filter button */}
        <Button
          variant="outline"
          className="w-full sm:hidden"
          onClick={onFilterClick}
        >
          <SlidersHorizontal className="size-4" />
          Filter
        </Button>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Button variant="outline" onClick={onFilterClick}>
          <SlidersHorizontal className="size-4" />
          Filter
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {children}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Hide inactive workflows</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={hideInactive}
              onChange={(event) => onToggleHideInactive?.(event.target.checked)}
            />
            <div className="peer h-6 w-11 rounded-full border border-input bg-muted transition peer-checked:bg-primary" />
            <div className="absolute left-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </label>
        </div>
      </div>
    </div>
  )
}

