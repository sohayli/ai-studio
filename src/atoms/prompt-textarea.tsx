import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PromptTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  rows?: number;
}

export default function PromptTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
  rows = 3,
}: PromptTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="text-sm resize-none"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}