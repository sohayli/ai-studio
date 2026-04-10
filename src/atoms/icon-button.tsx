import { Button } from "@/components/ui/button";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function IconButton({ onClick, icon, disabled, loading }: IconButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={disabled}>
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon
      )}
    </Button>
  );
}