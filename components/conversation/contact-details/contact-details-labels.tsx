"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";


export function ContactDetailsLabels({}: Record<string, never>) {
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [savedLabels, setSavedLabels] = useState<string[]>([]);
  const [availableLabels, setAvailableLabels] = useState([
    { value: "urgent", label: "Urgent" },
    { value: "follow-up", label: "Follow up" },
    { value: "vip", label: "VIP" },
    { value: "technical", label: "Technical" },
    { value: "billing", label: "Billing" },
    { value: "support", label: "Support" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
  ]);

  const handleAddLabel = () => {
    setIsAddingLabel(true);
    setPopoverOpen(true);
  };

  const handleCancel = () => {
    setIsAddingLabel(false);
    setSelectedLabels([]);
    setPopoverOpen(false);
  };

  const handleSave = () => {
    // Save the selected labels, avoiding duplicates
    setSavedLabels(prev => {
      const newLabels = selectedLabels.filter(label => !prev.includes(label));
      return [...prev, ...newLabels];
    });
    console.log("Selected labels:", selectedLabels);
    setIsAddingLabel(false);
    setSelectedLabels([]);
    setPopoverOpen(false);
  };

  const handleCreateNew = (newLabel: string) => {
    const newLabelValue = newLabel.toLowerCase().replace(/\s+/g, '-');
    const newLabelOption = { value: newLabelValue, label: newLabel };
    
    // Add to available labels
    setAvailableLabels(prev => [...prev, newLabelOption]);
    
    // Add to selected labels
    setSelectedLabels(prev => [...prev, newLabelValue]);
  };

  const handleRemoveLabel = (labelValue: string) => {
    setSavedLabels(prev => prev.filter(label => label !== labelValue));
  };

  const getLabelDisplayName = (labelValue: string) => {
    const label = availableLabels.find(l => l.value === labelValue);
    return label ? label.label : labelValue;
  };

  if (isAddingLabel) {
    return (
      <Combobox
        options={availableLabels}
        selected={selectedLabels}
        onSelectionChange={setSelectedLabels}
        placeholder="Select labels..."
        searchPlaceholder="Search labels..."
        emptyText="No labels found."
        checkPosition="right"
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        allowCreate={true}
        onCreateNew={handleCreateNew}
        footer={
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={selectedLabels.length === 0}>
              <Plus className="h-4 w-4" />
              Add {selectedLabels.length > 0 ? `${selectedLabels.length} label${selectedLabels.length > 1 ? 's' : ''}` : 'labels'}
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <>
      {savedLabels.length === 0 ? (
        <>
          <p className="text-xs text-muted-foreground">No labels have been associated with this conversation yet.</p>
          <Button size="sm" variant="secondary" className="mt-4" onClick={handleAddLabel}>
            <Plus className="h-4 w-4" />
            Add a label
          </Button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {savedLabels.map((labelValue) => (
              <Badge
                key={labelValue}
                variant="outline"
                className="inline-flex items-center gap-1 py-1 px-2 pr-1"
              >
                <span>{getLabelDisplayName(labelValue)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveLabel(labelValue)}
                  className="h-4 w-4 p-0"
                >
                  <X className="!h-3 !w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button size="sm" variant="secondary" onClick={handleAddLabel}>
            <Plus className="h-4 w-4" />
            Add a label
          </Button>
        </div>
      )}
    </>
  );
}
