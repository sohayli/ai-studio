import { UI_TEXT } from "@/constants/chat";

interface EmptyStateProps {
  icon: "chat" | "preview" | "code";
  title?: string;
  message?: string;
}

const icons = {
  chat: (
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  preview: (
    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  code: (
    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
};

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  const defaultTitles = {
    chat: UI_TEXT.WELCOME_TITLE,
    preview: UI_TEXT.PREVIEW_WAITING_TITLE,
    code: UI_TEXT.CODE_WAITING_TITLE,
  };

  const defaultMessages = {
    chat: UI_TEXT.WELCOME_MESSAGE,
    preview: UI_TEXT.PREVIEW_WAITING_MESSAGE,
    code: UI_TEXT.CODE_WAITING_MESSAGE,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        {icons[icon]}
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">
        {title || defaultTitles[icon]}
      </h3>
      <p className="text-xs text-muted-foreground max-w-xs">
        {message || defaultMessages[icon]}
      </p>
    </div>
  );
}