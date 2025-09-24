"use client";

export function ContactDetailsSystem({}: Record<string, never>) {
  // Mock system information data - in a real app this would come from props or API
  const systemInfo = {
    deviceType: "Mobile",
    operatingSystem: "iOS 15.3",
    browser: "Safari",
    country: "United Kingdom",
    county: "Fife",
    city: "Cowdenbeath",
    language: "English (EN)",
    ipAddress: "123.45.67.89"
  };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
      <span className="text-muted-foreground">Device type:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.deviceType}</span>
      
      <span className="text-muted-foreground">Operating system:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.operatingSystem}</span>
      
      <span className="text-muted-foreground">Browser:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.browser}</span>
      
      <span className="text-muted-foreground">Country:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.country}</span>
      
      <span className="text-muted-foreground">County:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.county}</span>
      
      <span className="text-muted-foreground">City:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.city}</span>
      
      <span className="text-muted-foreground">Language:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.language}</span>
      
      <span className="text-muted-foreground">IP address:</span>
      <span className="text-foreground py-0.5 px-1">{systemInfo.ipAddress}</span>
    </div>
  );
}
