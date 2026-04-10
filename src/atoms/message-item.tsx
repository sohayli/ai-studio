import { Message } from "@/types/chat";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  if (message.role === "assistant") {
    return (
      <div className="flex gap-3 message-animate">
        <div className="w-7 h-7 rounded-md bg-primary/20 flex-shrink-0 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-primary"
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
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end message-animate">
      <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-br-sm bg-primary text-primary-foreground">
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}