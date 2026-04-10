// Chat message types
export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Tab types for preview panel
export type Tab = "preview" | "code";