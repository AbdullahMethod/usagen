import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  value: string;
  className?: string;
}

const CopyButton = ({ value, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn flex-shrink-0 ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-accent" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
};

export default CopyButton;
