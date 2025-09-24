"use client";

interface ContactDetailsCampaignsProps {
  contactData?: {
    name: string;
  } | null;
}

function getFirstName(name: string): string {
  return name.split(' ')[0] || name;
}

export function ContactDetailsCampaigns({ contactData }: ContactDetailsCampaignsProps) {
  const firstName = contactData ? getFirstName(contactData.name) : "User";
  
  return (
    <>
      <p className="text-xs text-muted-foreground">{firstName} isn&apos;t part of any campaigns yet.</p>
    </>
  );
}
