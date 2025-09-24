"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ContactDetailsNotes({}: Record<string, never>) {
  return (
    <>
      <p className="text-xs text-muted-foreground">No notes have been associated with this conversation yet.</p>
      <Button size="sm" variant="secondary" className="mt-4">
        <Plus className="h-4 w-4" />
        Add a note
      </Button>
    </>
  );
}
