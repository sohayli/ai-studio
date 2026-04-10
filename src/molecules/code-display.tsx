import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/molecules";

interface CodeDisplayProps {
  code: string | null;
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  if (!code) {
    return <EmptyState icon="code" />;
  }

  return (
    <ScrollArea className="h-full">
      <pre className="p-4 text-xs leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </ScrollArea>
  );
}