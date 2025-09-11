import { SystemMessage as SystemMessageType } from "@/lib/data"

interface SystemMessageProps {
  message: SystemMessageType;
}

export function SystemMessage({ message }: SystemMessageProps) {
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    if (timestamp === 'now') {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('en-US', { month: 'short' });
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      // Add ordinal suffix to day
      const getOrdinalSuffix = (day: number) => {
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };
      
      return `${day}${getOrdinalSuffix(day)} ${month} ${year} at ${hours}:${minutes}`;
    }
    return timestamp;
  };

  return (
    <div className="flex justify-center my-3">
      <div className="text-center">
        <p className="text-[13px] font-medium text-foreground">{message.content}</p>
        <p className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</p>
      </div>
    </div>
  );
}