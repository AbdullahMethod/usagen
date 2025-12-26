import { useState, useEffect, useCallback } from "react";
import { Globe, UserCircle, RefreshCw, Copy, Download, Check, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UserCard from "@/components/UserCard";
import StatsBar from "@/components/StatsBar";
import SocialLinks from "@/components/SocialLinks";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
interface UserData {
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  cell: string;
  gender: string;
  nat: string;
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    postcode: string | number;
    country: string;
    timezone: { offset: string };
  };
  login: { username: string };
  picture: { large: string };
  id: { name: string; value: string };
}

const countries = [
  { code: "", name: "All Countries" },
  { code: "AU", name: "Australia" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "ES", name: "Spain" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "IN", name: "India" },
  { code: "IR", name: "Iran" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "RS", name: "Serbia" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "US", name: "United States" },
];

const Index = () => {
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [userAges, setUserAges] = useState<number[]>([]);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark";
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const generateUser = useCallback(async () => {
    setLoading(true);
    try {
      let apiUrl = "https://randomuser.me/api/?";
      if (country) apiUrl += `nat=${country}&`;
      if (gender) apiUrl += `gender=${gender}&`;
      apiUrl += "inc=name,gender,email,login,registered,phone,cell,picture,location,dob,id,nat&noinfo";

      const response = await fetch(apiUrl);
      const data = await response.json();
      const newUser = data.results[0];
      
      setUser(newUser);
      setTotalGenerated((prev) => prev + 1);
      setUserAges((prev) => [...prev, newUser.dob.age]);
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [country, gender]);

  useEffect(() => {
    generateUser();
  }, []);

  const copyToClipboard = async () => {
    if (!user) return;

    const profileText = `
Name: ${user.name.title} ${user.name.first} ${user.name.last}
Email: ${user.email}
Phone: ${user.phone}
Address: ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}
Date of Birth: ${new Date(user.dob.date).toLocaleDateString()}
Gender: ${user.gender}
Nationality: ${user.nat}
    `.trim();

    await navigator.clipboard.writeText(profileText);
    setCopied(true);
    toast.success("Profile copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadProfile = () => {
    if (!user) return;

    const dataStr = JSON.stringify(user, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `user_profile_${user.login.username}.json`);
    link.click();
    toast.success("Profile downloaded!");
  };

  const averageAge = userAges.length > 0 ? userAges.reduce((a, b) => a + b, 0) / userAges.length : 0;

  return (
    <div className="min-h-screen py-6 px-4 md:py-12">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header />

        {/* Controls */}
        <div className="glass-card rounded-2xl p-5 md:p-8 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                <Globe className="w-4 h-4" />
                Select Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border-2 border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-secondary mb-2">
                <UserCircle className="w-4 h-4" />
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border-2 border-border text-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-300"
              >
                <option value="">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={generateUser}
              disabled={loading}
              className="px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold rounded-xl bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-50 text-white"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 loading-spinner" />
              ) : (
                <Users className="w-5 h-5 mr-2" />
              )}
              Generate Random User
            </Button>
          </div>
        </div>

        {/* Stats */}
        {totalGenerated > 0 && (
          <StatsBar
            totalGenerated={totalGenerated}
            currentCountry={user?.nat || ""}
            currentGender={user?.gender || ""}
            averageAge={averageAge}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="glass-card rounded-2xl p-12 text-center mb-6">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 loading-spinner" />
            <p className="text-muted-foreground text-lg">Generating user profile...</p>
          </div>
        )}

        {/* User Profile */}
        {!loading && user && (
          <>
            <UserCard user={user} />

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 animate-fade-in">
              <Button
                onClick={generateUser}
                className="px-5 md:px-6 py-5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:translate-y-[-2px] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="px-5 md:px-6 py-5 rounded-xl border-2 border-accent text-accent hover:bg-accent/10 transition-all duration-300 hover:translate-y-[-2px]"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy All"}
              </Button>
              <Button
                onClick={downloadProfile}
                variant="outline"
                className="px-5 md:px-6 py-5 rounded-xl border-2 border-[hsl(var(--orange))] text-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/10 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download JSON
              </Button>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 md:mt-16 pt-8 border-t border-border">
          <SocialLinks />
          <p className="mt-6 text-muted-foreground">
            Random User Generator — <a href="https://abdullahcoded.blogspot.com/" target="_blank" rel="noopener noreferrer" className="gradient-text font-semibold hover:opacity-80 transition-opacity">Abdullah Coded</a>
          </p>
          <p className="mt-2 text-sm text-muted-foreground/70">
            © 2025 Abdullah | Realistic • Diverse • Customizable
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
