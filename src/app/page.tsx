"use client";

import { useState, useCallback } from "react";
import { ChatPanel, PreviewPanel } from "@/organisms";
import { useResize } from "@/hooks";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const { width, isResizing, containerRef, handleMouseDown } = useResize({ initialWidth: 50 });

  const handleSendMessage = useCallback(async (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content }],
          stream: false 
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || 'Yanıt alınamadı';
      
      setMessages((prev) => [...prev, { role: 'assistant', content: aiMessage }]);
      
      // Check if response contains HTML code
      const codeMatch = aiMessage.match(/```(?:html)?\s*([\s\S]*?)```/);
      if (codeMatch) {
        setGeneratedCode(codeMatch[1].trim());
      }
    } catch (error) {
      console.error('API error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Bir hata oluştu. API bağlantısını kontrol edin.' }
      ]);
    }
  }, [messages]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background" ref={containerRef}>
      <div className="flex h-full">
        {/* Chat Panel */}
        <div
          className="flex-shrink-0 h-full overflow-hidden"
          style={{ width: `${width}%` }}
        >
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} isLoading={false} />
        </div>

        {/* Resize Handle */}
        <div
          className={`resize-handle ${isResizing ? "active" : ""}`}
          onMouseDown={handleMouseDown}
        />

        {/* Preview Panel */}
        <div className="flex-1 h-full overflow-hidden">
          <PreviewPanel code={generatedCode} />
        </div>
      </div>
    </main>
  );
}