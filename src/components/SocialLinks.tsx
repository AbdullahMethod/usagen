import { Instagram, Github, Send, Globe } from "lucide-react";

const SocialLinks = () => {
  const socials = [
    {
      name: "Website",
      url: "https://abdullahcoded.blogspot.com/",
      icon: Globe,
      gradient: "from-primary to-secondary",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/em.abdullah__/",
      icon: Instagram,
      gradient: "from-pink-500 to-orange-500",
    },
    {
      name: "GitHub",
      url: "https://github.com/iemabdullah/",
      icon: Github,
      gradient: "from-gray-600 to-gray-800",
    },
    {
      name: "Telegram",
      url: "https://t.me/ABDULLAHMETHOD",
      icon: Send,
      gradient: "from-sky-400 to-blue-500",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-link text-foreground bg-gradient-to-r ${social.gradient} hover:shadow-lg`}
          title={social.name}
        >
          <social.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
