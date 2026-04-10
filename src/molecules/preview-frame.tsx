import { EmptyState } from "@/molecules";

interface PreviewFrameProps {
  code: string | null;
  iframeKey: number;
}

export default function PreviewFrame({ code, iframeKey }: PreviewFrameProps) {
  if (!code) {
    return (
      <div className="h-full bg-muted/30">
        <EmptyState icon="preview" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <iframe
        key={iframeKey}
        srcDoc={code}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}