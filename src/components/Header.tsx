import { Users, Sparkles, Zap, Star, Orbit } from "lucide-react";

const Header = () => {
  return (
    <header className="relative text-center mb-8 md:mb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Animated particles */}
        <div className="absolute top-1/4 left-10 animate-particle">
          <Star className="w-4 h-4 text-yellow-400 animate-twinkle" />
        </div>
        <div className="absolute top-1/3 right-16 animate-particle" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="w-3 h-3 text-primary animate-twinkle" />
        </div>
        <div className="absolute bottom-1/4 left-20 animate-particle" style={{ animationDelay: "1s" }}>
          <Zap className="w-4 h-4 text-accent animate-twinkle" />
        </div>
        <div className="absolute top-1/2 right-10 animate-particle" style={{ animationDelay: "1.5s" }}>
          <Star className="w-3 h-3 text-secondary animate-twinkle" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 animate-slide-up">
        {/* Icon Container with advanced effects */}
        <div className="relative inline-flex items-center justify-center mb-6 md:mb-8 group">
          {/* Outer rotating ring */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
          
          {/* Middle pulsing ring */}
          <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse-ring" />
          
          {/* Inner glowing container */}
          <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] animate-float shadow-header-glow group-hover:shadow-header-glow-intense transition-shadow duration-500">
            <div className="w-full h-full rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slow" />
              <Users className="w-8 h-8 md:w-12 md:h-12 text-white relative z-10 drop-shadow-lg" />
            </div>
          </div>

          {/* Orbiting elements */}
          <div className="absolute w-28 h-28 md:w-40 md:h-40 animate-orbit">
            <Orbit className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 text-accent" />
          </div>
          <div className="absolute w-32 h-32 md:w-44 md:h-44 animate-orbit-reverse">
            <Sparkles className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 text-secondary" />
          </div>
        </div>

        {/* Title with advanced typography */}
        <div className="relative mb-4 md:mb-6">
          {/* Glowing background text */}
          <h1 className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-extrabold blur-2xl opacity-30">
            <span className="text-primary">Random User</span>{" "}
            <span className="text-secondary">Generator</span>
          </h1>
          
          {/* Main title */}
          <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="inline-block animate-text-gradient bg-gradient-to-r from-primary via-secondary via-accent via-primary to-secondary bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer-text">
              Random User
            </span>
            <br className="md:hidden" />
            <span className="inline-block ml-0 md:ml-4 animate-text-gradient-delay bg-gradient-to-r from-accent via-orange via-secondary to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer-text" style={{ animationDelay: "0.3s" }}>
              Generator
            </span>
          </h1>
        </div>

        {/* Subtitle with decorative elements */}
        <div className="relative inline-flex items-center justify-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary animate-twinkle" />
          </div>
          
          <p className="relative text-sm md:text-lg font-medium text-muted-foreground">
            Generate{" "}
            <span className="gradient-text font-semibold">realistic</span>
            {" "}user profiles for testing
          </p>
          
          <div className="relative flex items-center gap-1 md:gap-2">
            <Sparkles className="w-4 h-4 text-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-secondary animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-4 md:mt-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <span className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            🎨 Colorful
          </span>
          <span className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary border border-secondary/20 backdrop-blur-sm">
            ⚡ Fast
          </span>
          <span className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/20 backdrop-blur-sm">
            🌍 Global
          </span>
          <span className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-orange/20 to-orange/10 text-[hsl(var(--orange))] border border-[hsl(var(--orange))]/20 backdrop-blur-sm">
            ✨ Realistic
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
