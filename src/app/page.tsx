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

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = `Kodunuz oluşturuluyor...`;
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);

      // Simulate code generation
      const code = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oluşturulan Sayfa</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Merhaba Dünya!</h1>
    <p>Bu sayfa AI tarafından oluşturuldu.</p>
  </div>
</body>
</html>`;

      setGeneratedCode(code);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Kodunuz hazır! Sağ panelde önizlemeyi görebilirsiniz." },
      ]);
    }, 1000);
  }, []);

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