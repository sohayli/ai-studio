import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AVAILABLE_MODELS } from "@/types/settings";

interface ModelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModelSelect({ value, onChange }: ModelSelectProps) {
  const providers = [...new Set(AVAILABLE_MODELS.map((m) => m.provider))];

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">Model</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder="Model seçin" />
        </SelectTrigger>
        <SelectContent>
          {providers.map((provider) => (
            <div key={provider}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {provider}
              </div>
              {AVAILABLE_MODELS.filter((m) => m.provider === provider).map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-sm">
                  {model.name}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}