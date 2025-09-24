"use client";

interface ContactDetailsFormsProps {
  contactData?: {
    name: string;
  } | null;
}

function getFirstName(name: string): string {
  return name.split(' ')[0] || name;
}

export function ContactDetailsForms({ contactData }: ContactDetailsFormsProps) {
  const firstName = contactData ? getFirstName(contactData.name) : "User";
  
  return (
    <>
      <p className="text-xs text-muted-foreground">{firstName} hasn&apos;t submitted out any forms yet.</p>
    </>
  );
}
