import { Tab } from "@/types/chat";
import { TabButton } from "@/atoms";
import { UI_TEXT } from "@/constants/chat";

interface TabSwitcherProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
      <TabButton active={activeTab === "preview"} onClick={() => onTabChange("preview")}>
        {UI_TEXT.PREVIEW_TAB}
      </TabButton>
      <TabButton active={activeTab === "code"} onClick={() => onTabChange("code")}>
        {UI_TEXT.CODE_TAB}
      </TabButton>
    </div>
  );
}