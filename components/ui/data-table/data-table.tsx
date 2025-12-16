"use client"

import * as React from "react"
import {
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { DataTableHeader } from "./header"
import { DataTableFooter } from "./footer"

interface DataTableProps<TData> {
  table: TanstackTable<TData>
  className?: string
  searchPlaceholder?: string
  searchValue: string
  onSearchChange: (value: string) => void
  onFilterClick?: () => void
  hideInactive?: boolean
  onToggleHideInactive?: (value: boolean) => void
  pageSizeOptions?: number[]
  totalResults?: number
  headerChildren?: React.ReactNode
  emptyMessage?: string
}

export function DataTable<TData>({
  table,
  className,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  onFilterClick,
  hideInactive = false,
  onToggleHideInactive,
  pageSizeOptions = [10, 15, 20, 25, 50],
  totalResults,
  headerChildren,
  emptyMessage = "No results found.",
}: DataTableProps<TData>) {
  const { pageSize, pageIndex } = table.getState().pagination
  const resolvedTotalResults =
    totalResults ?? table.getFilteredRowModel().rows.length
  const totalPages = Math.max(1, table.getPageCount())

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DataTableHeader
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onFilterClick={onFilterClick}
        hideInactive={hideInactive}
        onToggleHideInactive={onToggleHideInactive}
      >
        {headerChildren}
      </DataTableHeader>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTableFooter
        totalResults={resolvedTotalResults}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={(value) => {
          table.setPageSize(value)
          table.setPageIndex(0)
        }}
        pageIndex={pageIndex}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          const safePage = Math.min(Math.max(0, nextPage), totalPages - 1)
          table.setPageIndex(safePage)
        }}
      />
    </div>
  )
}

