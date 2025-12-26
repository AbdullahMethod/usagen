interface StatsBarProps {
  totalGenerated: number;
  currentCountry: string;
  currentGender: string;
  averageAge: number;
}

const StatsBar = ({ totalGenerated, currentCountry, currentGender, averageAge }: StatsBarProps) => {
  const stats = [
    { label: "Users Generated", value: totalGenerated, color: "from-primary to-secondary" },
    { label: "Country", value: currentCountry || "-", color: "from-secondary to-pink-500" },
    { label: "Gender", value: currentGender ? currentGender.charAt(0).toUpperCase() : "-", color: "from-accent to-teal-400" },
    { label: "Avg Age", value: averageAge > 0 ? Math.round(averageAge) : "-", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 mb-6 animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center p-3 rounded-xl bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:scale-105"
          >
            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
