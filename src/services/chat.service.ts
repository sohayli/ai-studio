import { Message } from "@/types/chat";

// Chat service API calls
export async function sendMessage(content: string): Promise<Message> {
  // TODO: Implement actual API call
  // For now, return mock response
  return {
    role: "assistant",
    content: "Mock response - implement actual API call",
  };
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}