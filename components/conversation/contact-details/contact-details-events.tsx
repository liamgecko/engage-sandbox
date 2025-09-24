"use client";

interface ContactDetailsEventsProps {
  contactData?: {
    name: string;
  } | null;
}

function getFirstName(name: string): string {
  return name.split(' ')[0] || name;
}

export function ContactDetailsEvents({ contactData }: ContactDetailsEventsProps) {
  const firstName = contactData ? getFirstName(contactData.name) : "User";
  
  return (
    <>
      <p className="text-xs text-muted-foreground">{firstName} hasn&apos;t registered for any events yet.</p>
    </>
  );
}
