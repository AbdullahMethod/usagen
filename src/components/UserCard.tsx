import { User, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import CopyButton from "./CopyButton";

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

interface UserCardProps {
  user: UserData;
}

interface DetailItemProps {
  label: string;
  value: string;
  colorClass?: string;
}

const DetailItem = ({ label, value, colorClass = "text-primary" }: DetailItemProps) => (
  <div className="group flex justify-between items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
    <span className={`text-sm font-medium ${colorClass}`}>{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground text-right break-all max-w-[55%]">
        {value}
      </span>
      <CopyButton value={value} />
    </div>
  </div>
);

const UserCard = ({ user }: UserCardProps) => {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const birthDate = new Date(user.dob.date).toLocaleDateString();
  const registrationDate = new Date(user.registered.date).toLocaleDateString();
  const fullAddress = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`;

  const detailCards = [
    {
      title: "Personal Info",
      icon: User,
      colorClass: "colorful-card-1",
      iconColor: "text-primary",
      items: [
        { label: "Gender", value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1) },
        { label: "Date of Birth", value: birthDate },
        { label: "Age", value: `${user.dob.age} years` },
        { label: "Nationality", value: user.nat },
      ],
      delay: "0.1s",
    },
    {
      title: "Contact",
      icon: Phone,
      colorClass: "colorful-card-2",
      iconColor: "text-secondary",
      items: [
        { label: "Phone", value: user.phone },
        { label: "Cell", value: user.cell },
        { label: "Email", value: user.email },
        { label: "Username", value: user.login.username },
      ],
      delay: "0.2s",
    },
    {
      title: "Address",
      icon: MapPin,
      colorClass: "colorful-card-3",
      iconColor: "text-accent",
      items: [
        { label: "Street", value: `${user.location.street.number} ${user.location.street.name}` },
        { label: "City", value: user.location.city },
        { label: "State", value: user.location.state },
        { label: "Postcode", value: String(user.location.postcode) },
        { label: "Country", value: user.location.country },
      ],
      delay: "0.3s",
    },
    {
      title: "Additional Info",
      icon: Briefcase,
      colorClass: "colorful-card-4",
      iconColor: "text-[hsl(var(--orange))]",
      items: [
        { label: "Registered", value: registrationDate },
        { label: "Member for", value: `${user.registered.age} years` },
        { label: "User ID", value: `${user.id.name || "N/A"} ${user.id.value || ""}` },
        { label: "Timezone", value: user.location.timezone.offset },
      ],
      delay: "0.4s",
    },
  ];

  return (
    <div className="animate-scale-in">
      {/* User Header */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-rainbow" />
            <img
              src={user.picture.large}
              alt={fullName}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                {fullName}
              </h2>
              <CopyButton value={fullName} className="opacity-100" />
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div className="group flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-sm md:text-base break-all">{user.email}</span>
                <CopyButton value={user.email} />
              </div>
              <div className="group flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm md:text-base">{user.location.city}, {user.location.country}</span>
                <CopyButton value={`${user.location.city}, ${user.location.country}`} />
              </div>
              <div className="group flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4 text-[hsl(var(--orange))]" />
                <span className="text-sm md:text-base">Age: {user.dob.age} years</span>
                <CopyButton value={`${user.dob.age}`} />
              </div>
            </div>
            {/* Full Address Copy */}
            <div className="mt-4 p-3 rounded-xl bg-muted/50 group">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Full Address</span>
                <CopyButton value={fullAddress} className="opacity-100" />
              </div>
              <p className="text-sm text-foreground mt-1 break-all">{fullAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {detailCards.map((card) => (
          <div
            key={card.title}
            className={`glass-card rounded-2xl p-5 md:p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg animate-slide-up ${card.colorClass}`}
            style={{ animationDelay: card.delay }}
          >
            <h3 className={`flex items-center gap-2 text-lg font-semibold ${card.iconColor} mb-4`}>
              <card.icon className="w-5 h-5" />
              {card.title}
            </h3>
            <div className="space-y-1">
              {card.items.map((item) => (
                <DetailItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  colorClass={card.iconColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
