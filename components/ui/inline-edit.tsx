 'use client'

import * as React from "react"
import { CheckCheck, Edit, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InlineEditProps {
  initialValue?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  onConfirm?: (value: string) => void
  onCancel?: () => void
}

export function InlineEdit({
  initialValue = "",
  placeholder = "Add title",
  className,
  inputClassName,
  onConfirm,
  onCancel,
}: InlineEditProps) {
  const [value, setValue] = React.useState(initialValue)
  const [draft, setDraft] = React.useState(initialValue)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleStartEdit = () => {
    setDraft(value)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDraft(value)
    setIsEditing(false)
    onCancel?.()
  }

  const handleConfirm = () => {
    setValue(draft)
    setIsEditing(false)
    onConfirm?.(draft)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleConfirm()
    }
    if (event.key === "Escape") {
      event.preventDefault()
      handleCancel()
    }
  }

  if (!isEditing) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="default"
        onClick={handleStartEdit}
        className={cn(
          "group inline-flex items-center gap-3 h-8",
          className
        )}
      >
        <span
          className={cn(
            "truncate",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {value || placeholder}
        </span>
        <Edit className="size-4 text-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
      </Button>
    )
  }

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Input
        size="default"
        value={draft}
        autoFocus
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        className={cn("pr-16 pl-3 h-8", inputClassName)}
      />
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          onClick={handleCancel}
          className="pointer-events-auto h-6 w-6 p-0"
          aria-label="Cancel editing"
        >
          <X className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          onClick={handleConfirm}
          className="pointer-events-auto h-6 w-6 p-0"
          aria-label="Confirm edit"
        >
          <CheckCheck className="size-4" />
        </Button>
      </div>
    </div>
  )
}


