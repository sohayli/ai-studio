import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SettingsInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "password" | "number";
  placeholder?: string;
  description?: string;
}

export default function SettingsInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  description,
}: SettingsInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}