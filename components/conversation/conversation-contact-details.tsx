"use client";

import { useState, useCallback, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MoreVertical, CheckCheck, X } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getUserById, updateUser } from "@/lib/data";

// Editable field component moved outside to prevent recreation
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

interface ContactDetailsProps {
  contactId?: string;
  contactName?: string;
  contactInitials?: string;
}

export function ContactDetails({ 
  contactId = "2",
  contactName, 
  contactInitials 
}: ContactDetailsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [contactData, setContactData] = useState(getUserById(contactId));
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'verified' | 'unverified' | null>(null);
  
  // Re-fetch contact data when refreshKey changes
  useEffect(() => {
    setContactData(getUserById(contactId));
  }, [contactId, refreshKey]);
  const displayName = contactName || contactData?.name || "Unknown Contact";
  const displayInitials = contactInitials || contactData?.initials || "UC";

  const handleEditStart = useCallback((field: string, currentValue: string) => {
    setEditingField(field);
    // Clear placeholder text when editing
    const isPlaceholder = currentValue.startsWith("Add ");
    setEditValue(isPlaceholder ? "" : currentValue);
  }, []);

  const handleEditSave = useCallback(() => {
    if (!editingField || !contactData) return;
    
    // Update the user data
    const success = updateUser(contactData.id, {
      [editingField]: editValue
    });
    
    if (success) {
      console.log(`Successfully updated ${editingField}: ${editValue}`);
      
      // Trigger animation only when email or phone is updated (verification fields)
      if (editingField === 'email' || editingField === 'phone') {
        // Determine animation type based on NEW verification status after update
        // Contact is verified if they have either email OR phone (non-empty)
        const hasEmail = editingField === 'email' ? Boolean(editValue && editValue.trim() !== '') : Boolean(contactData.email && contactData.email.trim() !== '');
        const hasPhone = editingField === 'phone' ? Boolean(editValue && editValue.trim() !== '') : Boolean(contactData.phone && contactData.phone.trim() !== '');
        const newVerifiedStatus = hasEmail || hasPhone;
        const newAnimationType = newVerifiedStatus ? 'verified' : 'unverified';
        setAnimationType(newAnimationType);
        setIsAnimating(true);
        
        // Play verification sound when contact becomes verified
        if (newVerifiedStatus) {
          const audio = new Audio('/verified.mp3');
          audio.volume = 0.3; // Reduce volume to 30%
          audio.play().catch(error => {
            console.log('Could not play verification sound:', error);
          });
        }
        
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setAnimationType(null);
        }, 600); // Animation duration
        // Don't clear timeout on cleanup since we want the animation to complete
      }
      
      // Trigger a re-render to show updated data
      setRefreshKey(prev => prev + 1);
    } else {
      console.error(`Failed to update ${editingField}`);
    }
    
    setEditingField(null);
    setEditValue("");
  }, [editingField, editValue, contactData]);

  const handleEditCancel = useCallback(() => {
    setEditingField(null);
    setEditValue("");
  }, []);

  const accordionItems = [
    { 
      id: "contact-details", 
      title: "Contact details", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "activity", 
      title: "Activity", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "conversation-analysis", 
      title: "Conversation analysis", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "tags", 
      title: "Tags", 
      isExpanded: false,
      badge: { count: 4 }
    },
    { 
      id: "notes", 
      title: "Notes", 
      isExpanded: false,
      badge: { count: 1 }
    },
    { 
      id: "forms", 
      title: "Forms", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "events", 
      title: "Events", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "campaigns", 
      title: "Campaigns", 
      isExpanded: false,
      badge: null 
    },
    { 
      id: "system-information", 
      title: "System information", 
      isExpanded: false,
      badge: null 
    },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border h-[56px]">
        <h2 className="text-md font-semibold text-foreground">Contact details</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="iconXs">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View contact</DropdownMenuItem>
            <DropdownMenuItem>View all conversations</DropdownMenuItem>
            <DropdownMenuItem>Download contact</DropdownMenuItem>
            <DropdownMenuItem>Merge contact</DropdownMenuItem>
            <DropdownMenuItem className="text-red-700 !hover:text-red-700 !hover:bg-red-50">Delete contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="h-[calc(100vh-56px-56px-48px)]">

      {/* Contact Info Section */}
      <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className={`${contactData?.avatarBg || "bg-purple-100"} ${contactData?.avatarText || "text-purple-800"} text-sm font-medium`}>
                  {displayInitials}
                </AvatarFallback>
              </Avatar>
              {/* Verification Status Icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -bottom-0.5 -right-1 size-4.5 cursor-help">
                    <div className="relative w-full h-full">
                      <Image
                        src={contactData?.verified ? "/verified.svg" : "/unverified.svg"}
                        alt={contactData?.verified ? "Verified" : "Unverified"}
                        width={18}
                        height={18}
                        className={`w-full h-full drop-shadow-sm transition-all duration-300 ease-in-out ${
                          isAnimating ? 'verification-badge-change' : ''
                        }`}
                      />
                      {/* Animated ring effect only when going to verified state (not when going to unverified) */}
                      {isAnimating && animationType === 'verified' && (
                        <div className="absolute inset-0 rounded-full border-2 verification-ring-pulse border-emerald-400" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{contactData?.verified ? "Verified contact" : "Unverified contact"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-md font-medium text-foreground">{displayName}</h3>
              </div>
            </div>
          </div>
      </div>

      {/* Accordion Sections */}
        <Accordion 
          type="multiple" 
          value={expandedSections}
          onValueChange={setExpandedSections}
          className="w-full mb-8"
        >
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-border last:border-b-1">
              <AccordionTrigger className="px-4 py-3 hover:no-underline cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-foreground">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="text-[11px] font-medium px-2 py-0.5"
                    >
                      {item.badge.count}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {item.id === "contact-details" ? (
                  contactData ? (
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
                      <EditableField 
                        field="name" 
                        value={contactData.name || "Add name"} 
                        label="Name"
                        onEditStart={handleEditStart}
                        onEditSave={handleEditSave}
                        onEditCancel={handleEditCancel}
                        editingField={editingField}
                        editValue={editValue}
                        setEditValue={setEditValue}
                      />
                      <EditableField 
                        field="email" 
                        value={contactData.email || "Add email"} 
                        label="Email"
                        onEditStart={handleEditStart}
                        onEditSave={handleEditSave}
                        onEditCancel={handleEditCancel}
                        editingField={editingField}
                        editValue={editValue}
                        setEditValue={setEditValue}
                      />
                      <EditableField 
                        field="phone" 
                        value={contactData.phone || "Add phone"} 
                        label="Phone"
                        onEditStart={handleEditStart}
                        onEditSave={handleEditSave}
                        onEditCancel={handleEditCancel}
                        editingField={editingField}
                        editValue={editValue}
                        setEditValue={setEditValue}
                      />
                      <EditableField 
                        field="language" 
                        value={contactData.language || "Add language"} 
                        label="Language"
                        onEditStart={handleEditStart}
                        onEditSave={handleEditSave}
                        onEditCancel={handleEditCancel}
                        editingField={editingField}
                        editValue={editValue}
                        setEditValue={setEditValue}
                      />
                      <EditableField 
                        field="lastSeen" 
                        value={contactData.lastSeen || "Add last seen"} 
                        label="Last seen"
                        onEditStart={handleEditStart}
                        onEditSave={handleEditSave}
                        onEditCancel={handleEditCancel}
                        editingField={editingField}
                        editValue={editValue}
                        setEditValue={setEditValue}
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <p>No contact details available.</p>
                    </div>
                  )
                ) : (
                  <div className="text-sm text-muted-foreground">
                    {/* Content will be added later */}
                    <p>Content for {item.title} will be added here.</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
