"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  checkPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  allowCreate?: boolean;
  onCreateNew?: (value: string) => void;
  footer?: React.ReactNode;
}

export function Combobox({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyText = "No items found.",
  checkPosition = "left",
  className,
  disabled = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  allowCreate = false,
  onCreateNew,
  footer,
}: ComboboxProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined);
  const [searchValue, setSearchValue] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter((item) => item !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  const handleCreateNew = () => {
    if (searchValue.trim() && onCreateNew) {
      onCreateNew(searchValue.trim());
      setSearchValue("");
    }
  };

  const canCreateNew = allowCreate && searchValue.trim() && 
    !options.some(option => 
      option.value.toLowerCase() === searchValue.toLowerCase().trim()
    );

  const selectedOptions = options.filter((option) => selected.includes(option.value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", className)}
          disabled={disabled}
        >
                  {selected.length === 0 ? (
                    placeholder
                  ) : (
                    `${selected.length} label${selected.length > 1 ? 's' : ''} selected`
                  )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        align="start"
        style={{ width: triggerWidth ? `${triggerWidth}px` : undefined }}
      >
        <Command>
          <CommandInput 
            placeholder={searchPlaceholder} 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              {canCreateNew ? (
                <div className="p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleCreateNew}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create &quot;{searchValue.trim()}&quot;
                  </Button>
                </div>
              ) : (
                emptyText
              )}
            </CommandEmpty>
            {/* Selected items group */}
            {selectedOptions.length > 0 && (
              <CommandGroup heading="Selected labels">
                {selectedOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center group",
                      checkPosition === "right" ? "justify-between" : ""
                    )}
                  >
                    {checkPosition === "left" && (
                      <div className="relative">
                        <X className="absolute h-4 w-4 text-foreground bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-foreground",
                            selected.includes(option.value) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    )}
                    <span>{option.label}</span>
                    {checkPosition === "right" && (
                      <div className="relative">
                        <X className="absolute h-4 w-4 text-foreground bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <Check
                          className={cn(
                            "h-4 w-4 text-foreground",
                            selected.includes(option.value) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Available items group */}
            {options.filter(option => !selected.includes(option.value)).length > 0 && (
              <CommandGroup heading="Available labels">
                {options.filter(option => !selected.includes(option.value)).map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center",
                      checkPosition === "right" ? "justify-between" : ""
                    )}
                  >
                    {checkPosition === "left" && (
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-foreground",
                          selected.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                    <span>{option.label}</span>
                    {checkPosition === "right" && (
                      <Check
                        className={cn(
                          "h-4 w-4 text-foreground",
                          selected.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          {footer && (
            <div className="border-t p-3">
              {footer}
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
