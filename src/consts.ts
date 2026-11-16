import Envelope from "@/icons/envelope.svg"
import GitHub from "@/icons/github.svg"
import LinkedIn from "@/icons/linkedin.svg"

export const SITE = {
  title: "Max Larsson",
  description: "Max Larsson's personal portfolio website.",
}

export const LINKS = [
  { text: "Home", href: "/" },
  { text: "Projects", href: "/projects" },
]

export const SOCIALS = [
  { name: "Email", icon: Envelope, href: "mailto:hi@maxlarsson.dev" },
  { name: "LinkedIn", icon: LinkedIn, href: "https://www.linkedin.com/in/maxslarsson/" },
  { name: "GitHub", icon: GitHub, href: "https://github.com/maxslarsson" },
]
