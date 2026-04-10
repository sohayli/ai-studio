import { Settings } from "@/types/settings";
import SettingsInput from "@/atoms/settings-input";
import ApiKeyInput from "@/atoms/api-key-input";
import ModelSelect from "@/atoms/model-select";
import SliderInput from "@/atoms/slider-input";
import PromptTextarea from "@/atoms/prompt-textarea";

interface SettingsFormProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

export default function SettingsForm({ settings, onChange }: SettingsFormProps) {
  const updateField = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* API Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          API Ayarları
        </h3>
        
        <ApiKeyInput
          id="apiKey"
          label="API Anahtarı"
          value={settings.apiKey}
          onChange={(value) => updateField("apiKey", value)}
          placeholder="sk-... veya api-key-..."
        />

        <SettingsInput
          id="baseUrl"
          label="Base URL"
          value={settings.baseUrl}
          onChange={(value) => updateField("baseUrl", value)}
          placeholder="https://api.openai.com/v1"
          description="API uç noktası (OpenAI, Azure, yerel vb.)"
        />

        <ModelSelect
          value={settings.model}
          onChange={(value) => updateField("model", value)}
        />
      </div>

      {/* Model Parameters */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Model Parametreleri
        </h3>

        <SliderInput
          id="temperature"
          label="Temperature"
          value={settings.temperature}
          onChange={(value) => updateField("temperature", value)}
          min={0}
          max={2}
          step={0.1}
          description="Düşük değerler daha deterministik, yüksek değerler daha yaratıcı çıktılar"
        />

        <SliderInput
          id="maxTokens"
          label="Max Tokens"
          value={settings.maxTokens}
          onChange={(value) => updateField("maxTokens", value)}
          min={256}
          max={8192}
          step={256}
          description="Maksimum üretilecek token sayısı"
        />
      </div>

      {/* System Prompt */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Sistem Promptu
        </h3>

        <PromptTextarea
          id="systemPrompt"
          label="System Prompt"
          value={settings.systemPrompt}
          onChange={(value) => updateField("systemPrompt", value)}
          placeholder="AI asistanının davranışını tanımlayın..."
          rows={4}
          description="AI'ın nasıl davranacağını belirleyen talimatlar"
        />
      </div>
    </div>
  );
}