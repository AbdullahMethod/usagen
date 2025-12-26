import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full glass-card transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(45 95% 55%) 0%, hsl(25 95% 55%) 100%)'
          : 'linear-gradient(135deg, hsl(230 25% 20%) 0%, hsl(250 30% 30%) 100%)',
      }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
