"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataTableFooterProps {
  className?: string
  totalResults: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageSizeChange: (value: number) => void
  pageIndex: number // zero-based
  totalPages: number
  onPageChange: (pageIndex: number) => void
}

export function DataTableFooter({
  className,
  totalResults,
  pageSize,
  pageSizeOptions = [10, 15, 20, 25, 50],
  onPageSizeChange,
  pageIndex,
  totalPages,
  onPageChange,
}: DataTableFooterProps) {
  const currentPage = pageIndex + 1
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1)

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-md border bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{totalResults} results found.</span>
        <span>Showing</span>
        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="h-9 w-20">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>results per page.</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Page</span>
          <Select
            value={String(currentPage)}
            onValueChange={(value) => onPageChange(Number(value) - 1)}
          >
            <SelectTrigger className="h-9 w-24">
              <SelectValue placeholder={currentPage} />
            </SelectTrigger>
            <SelectContent>
              {pageNumbers.map((page) => (
                <SelectItem key={page} value={String(page)}>
                  {page}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="whitespace-nowrap">of {totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex <= 0}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

