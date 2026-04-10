import { Button } from "@/components/ui/button";
import { UI_TEXT } from "@/constants/chat";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-semibold text-sm">{UI_TEXT.APP_NAME}</h1>
          <p className="text-xs text-muted-foreground">{UI_TEXT.APP_SUBTITLE}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-xs">
        {UI_TEXT.NEW_CHAT}
      </Button>
    </div>
  );
}