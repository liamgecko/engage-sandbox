"use client";

import { useState, useCallback, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getUserById, updateUser } from "@/lib/data";
import { ContactDetailsDetails } from "./contact-details/contact-details-details";
import { ContactDetailsActivity } from "./contact-details/contact-details-activity";
import { ContactDetailsSentiment } from "./contact-details/contact-details-sentiment";
import { ContactDetailsLabels } from "./contact-details/contact-details-labels";
import { ContactDetailsNotes } from "./contact-details/contact-details-notes";
import { ContactDetailsForms } from "./contact-details/contact-details-forms";
import { ContactDetailsEvents } from "./contact-details/contact-details-events";
import { ContactDetailsCampaigns } from "./contact-details/contact-details-campaigns";
import { ContactDetailsSystem } from "./contact-details/contact-details-system";


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
        // Check the PREVIOUS verification status before the update
        const wasVerified = contactData.verified;
        
        // Determine NEW verification status after update
        // Contact is verified if they have either email OR phone (non-empty)
        const hasEmail = editingField === 'email' ? Boolean(editValue && editValue.trim() !== '') : Boolean(contactData.email && contactData.email.trim() !== '');
        const hasPhone = editingField === 'phone' ? Boolean(editValue && editValue.trim() !== '') : Boolean(contactData.phone && contactData.phone.trim() !== '');
        const newVerifiedStatus = hasEmail || hasPhone;
        
        // Only trigger animation if verification status actually changed
        if (wasVerified !== newVerifiedStatus) {
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
          
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationType(null);
          }, 600); // Animation duration
          // Don't clear timeout on cleanup since we want the animation to complete
        }
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

  // Function to calculate badge counts based on actual data
  const getBadgeCount = (sectionId: string): number | null => {
    if (!contactData) return null;
    
    switch (sectionId) {
      case "labels":
        // For now, return 0 since tags aren't implemented yet
        // This can be updated when tags functionality is added
        return 0;
      case "notes":
        // For now, return 0 since notes aren't implemented yet
        // This can be updated when notes functionality is added
        return 0;
      case "activity":
        // This can be updated when activity functionality is added
        return 0;
      case "conversation-analysis":
        // This can be updated when conversation analysis is added
        return 0;
      case "forms":
        // This can be updated when forms functionality is added
        return 0;
      case "events":
        // This can be updated when events functionality is added
        return 0;
      case "campaigns":
        // This can be updated when campaigns functionality is added
        return 0;
      case "system-information":
        // This can be updated when system information is added
        return 0;
      default:
        return null;
    }
  };

  // Define all possible accordion items
  const allAccordionItems = [
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
      badge: getBadgeCount("activity") ? { count: getBadgeCount("activity")! } : null
    },
    { 
      id: "conversation-analysis", 
      title: "Conversation analysis", 
      isExpanded: false,
      badge: getBadgeCount("conversation-analysis") ? { count: getBadgeCount("conversation-analysis")! } : null
    },
    { 
      id: "labels", 
      title: "Labels", 
      isExpanded: false,
      badge: getBadgeCount("labels") ? { count: getBadgeCount("labels")! } : null
    },
    { 
      id: "notes", 
      title: "Notes", 
      isExpanded: false,
      badge: getBadgeCount("notes") ? { count: getBadgeCount("notes")! } : null
    },
    { 
      id: "forms", 
      title: "Forms", 
      isExpanded: false,
      badge: getBadgeCount("forms") ? { count: getBadgeCount("forms")! } : null
    },
    { 
      id: "events", 
      title: "Events", 
      isExpanded: false,
      badge: getBadgeCount("events") ? { count: getBadgeCount("events")! } : null
    },
    { 
      id: "campaigns", 
      title: "Campaigns", 
      isExpanded: false,
      badge: getBadgeCount("campaigns") ? { count: getBadgeCount("campaigns")! } : null
    },
    { 
      id: "system-information", 
      title: "System information", 
      isExpanded: false,
      badge: getBadgeCount("system-information") ? { count: getBadgeCount("system-information")! } : null
    },
  ];

  // Filter accordion items based on verification status
  const accordionItems = contactData?.verified 
    ? allAccordionItems // Show all items for verified contacts
    : allAccordionItems.filter(item => 
        ["contact-details", "activity", "conversation-analysis", "labels", "notes", "system-information"].includes(item.id)
      ); // Show only specified items for unverified contacts

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
              <div className="flex flex-col">
                <h3 className="text-md font-medium text-foreground">{displayName}</h3>
                {contactData?.verified && (
                  <Link 
                    href="/contacts" 
                    className="text-[13px] text-muted-foreground hover:underline -mt-[4px]"
                  >
                    View contact
                  </Link>
                )}
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
                {item.id === "contact-details" && (
                  <ContactDetailsDetails
                    contactData={contactData || null}
                    onEditStart={handleEditStart}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    editingField={editingField}
                    editValue={editValue}
                    setEditValue={setEditValue}
                  />
                )}
                {item.id === "activity" && (
                  <ContactDetailsActivity />
                )}
                {item.id === "conversation-analysis" && (
                  <ContactDetailsSentiment />
                )}
                {item.id === "labels" && (
                  <ContactDetailsLabels />
                )}
                {item.id === "notes" && (
                  <ContactDetailsNotes />
                )}
                {item.id === "forms" && (
                  <ContactDetailsForms contactData={contactData} />
                )}
                {item.id === "events" && (
                  <ContactDetailsEvents contactData={contactData} />
                )}
                {item.id === "campaigns" && (
                  <ContactDetailsCampaigns contactData={contactData} />
                )}
                {item.id === "system-information" && (
                  <ContactDetailsSystem />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
