"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCheck, X } from "lucide-react";
import { User } from "@/lib/data";

// Editable field component
const EditableField = ({ 
  field, 
  value, 
  label,
  onEditStart,
  onEditSave,
  onEditCancel,
  editingField,
  editValue,
  setEditValue
}: { 
  field: string; 
  value: string; 
  label: string;
  onEditStart: (field: string, value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  editingField: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
}) => {
  const isEditing = editingField === field;
  const isPlaceholder = value?.startsWith("Add ") || false;
  
  return (
    <>
      <span className="text-muted-foreground">{label}:</span>
      <Popover open={isEditing} onOpenChange={(open) => !open && onEditCancel()}>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            className={`h-auto py-0.5 px-1 hover:bg-slate-100 justify-start font-normal text-[13px] ${
              isPlaceholder ? "text-muted-foreground" : "text-foreground"
            }`}
            onClick={() => onEditStart(field, value || '')}
          >
            {value || ''}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">{label}</label>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="mt-1 text-foreground"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEditCancel}
              >
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={onEditSave}
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

interface ContactDetailsDetailsProps {
  contactData: User | null;
  onEditStart: (field: string, value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  editingField: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
}

export function ContactDetailsDetails({
  contactData,
  onEditStart,
  onEditSave,
  onEditCancel,
  editingField,
  editValue,
  setEditValue
}: ContactDetailsDetailsProps) {
  if (!contactData) {
    return (
      <div className="text-sm text-muted-foreground">
        <p>No contact details available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
      <EditableField 
        field="name" 
        value={contactData.name || "Add name"} 
        label="Name"
        onEditStart={onEditStart}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        editingField={editingField}
        editValue={editValue}
        setEditValue={setEditValue}
      />
      <EditableField 
        field="email" 
        value={contactData.email || "Add email"} 
        label="Email"
        onEditStart={onEditStart}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        editingField={editingField}
        editValue={editValue}
        setEditValue={setEditValue}
      />
      <EditableField 
        field="phone" 
        value={contactData.phone || "Add phone"} 
        label="Phone"
        onEditStart={onEditStart}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        editingField={editingField}
        editValue={editValue}
        setEditValue={setEditValue}
      />
      <EditableField 
        field="language" 
        value={contactData.language || "Add language"} 
        label="Language"
        onEditStart={onEditStart}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        editingField={editingField}
        editValue={editValue}
        setEditValue={setEditValue}
      />
      <EditableField 
        field="lastSeen" 
        value={contactData.lastSeen || "Add last seen"} 
        label="Last seen"
        onEditStart={onEditStart}
        onEditSave={onEditSave}
        onEditCancel={onEditCancel}
        editingField={editingField}
        editValue={editValue}
        setEditValue={setEditValue}
      />
    </div>
  );
}
