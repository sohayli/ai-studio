import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export default function SliderInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  description,
}: SliderInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs font-medium">
          {label}
        </Label>
        <span className="text-xs text-muted-foreground font-mono">{value}</span>
      </div>
      <Slider
        id={id}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}