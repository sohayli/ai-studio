import { Button } from "@/components/ui/button";

interface SettingsActionsProps {
  onSave: () => void;
  onReset: () => void;
  onClose: () => void;
  hasChanges: boolean;
}

export default function SettingsActions({
  onSave,
  onReset,
  onClose,
  hasChanges,
}: SettingsActionsProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="text-xs text-muted-foreground hover:text-destructive"
      >
        Varsayılana Sıfırla
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          İptal
        </Button>
        <Button size="sm" onClick={onSave} disabled={!hasChanges}>
          Kaydet
        </Button>
      </div>
    </div>
  );
}