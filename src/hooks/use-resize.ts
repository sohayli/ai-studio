import { useState, useCallback, useRef, useEffect } from "react";

interface UseResizeOptions {
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number;
}

interface UseResizeReturn {
  width: number;
  isResizing: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleMouseDown: () => void;
}

export function useResize(options: UseResizeOptions = {}): UseResizeReturn {
  const { minWidth = 20, maxWidth = 80, initialWidth = 50 } = options;

  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
    },
    [isResizing, minWidth, maxWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return { width, isResizing, containerRef, handleMouseDown };
}