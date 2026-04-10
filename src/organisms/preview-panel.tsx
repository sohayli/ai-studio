import { useState, useEffect } from "react";
import { Tab } from "@/types/chat";
import { ChatHeader, ChatInput, EmptyState, CodeDisplay, PreviewFrame, TabSwitcher } from "@/molecules";
import { IconButton } from "@/atoms";
import { copyToClipboard } from "@/services/chat.service";

interface PreviewPanelProps {
  code: string | null;
}

// Icons
const RefreshIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const CopyIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

export default function PreviewPanel({ code }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (code) {
      setIframeKey((prev) => prev + 1);
    }
  }, [code]);

  const handleRefresh = () => setIframeKey((prev) => prev + 1);
  const handleCopyCode = () => code && copyToClipboard(code);

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex items-center gap-2">
          {activeTab === "preview" && code && (
            <IconButton onClick={handleRefresh} icon={RefreshIcon} />
          )}
          {activeTab === "code" && code && (
            <IconButton onClick={handleCopyCode} icon={CopyIcon} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "preview" ? (
          <PreviewFrame code={code} iframeKey={iframeKey} />
        ) : (
          <CodeDisplay code={code} />
        )}
      </div>
    </div>
  );
}