import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings, DEFAULT_SETTINGS } from "@/types/settings";
import { loadSettings, saveSettings } from "@/services/settings.service";
import SettingsForm from "@/molecules/settings-form";
import SettingsActions from "@/molecules/settings-actions";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (open) {
      const loaded = loadSettings();
      setSettings(loaded);
      setOriginalSettings(loaded);
    }
  }, [open]);

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

  const handleSave = () => {
    saveSettings(settings);
    setOriginalSettings(settings);
    onOpenChange(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleClose = () => {
    setSettings(originalSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Ayarlar
          </DialogTitle>
          <DialogDescription>
            API ayarlarını ve model parametrelerini yapılandırın
          </DialogDescription>
        </DialogHeader>

        <SettingsForm settings={settings} onChange={setSettings} />

        <SettingsActions
          onSave={handleSave}
          onReset={handleReset}
          onClose={handleClose}
          hasChanges={hasChanges}
        />
      </DialogContent>
    </Dialog>
  );
}