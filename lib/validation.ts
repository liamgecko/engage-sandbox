// Input validation utilities

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message.trim()) {
    return { isValid: false, error: "Message cannot be empty" };
  }
  
  if (message.length > 1000) {
    return { isValid: false, error: "Message is too long (max 1000 characters)" };
  }
  
  return { isValid: true };
}

export function safeSetTextareaHeight(textarea: HTMLTextAreaElement, maxHeight = 120) {
  try {
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  } catch (error) {
    console.error("Error setting textarea height:", error);
  }
}
