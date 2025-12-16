'use client'

import * as React from 'react'
import { Star } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Crumb {
  label: string
  href?: string
}

interface ContentHeaderProps {
  breadcrumbs: Crumb[]
  heading?: string
  className?: string
  actions?: React.ReactNode
}

export function ContentHeader({
  breadcrumbs,
  heading,
  className,
  actions,
}: ContentHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-b bg-white px-6 py-4 sm:gap-4',
        className
      )}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <React.Fragment key={item.label}>
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast ? <BreadcrumbSeparator /> : null}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {heading ? (
          <h1 className="text-2xl font-semibold text-gray-900">{heading}</h1>
        ) : (
          <div className="h-4" />
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Add to favourites"
          >
            <Star className="size-4" />
          </Button>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  )
}

