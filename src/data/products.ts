import {
  Smartphone,
  BookOpen,
  FileText,
  Zap,
  Timer,
  Calculator,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  type: string;
  category: "apps" | "guides" | "templates";
  tag: string | null;
  icon: LucideIcon;
  accentColor: string;
  desc: string;
  features: string[];
  /**
   * Flip this to `false` once the product is ready to sell.
   * While `true`, the product shows a simple "Coming Soon" label
   * instead of a price / Buy button, everywhere it appears on the site.
   */
  comingSoon: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "student-planner-app",
    name: "Student Planner App",
    price: 99,
    type: "PWA App",
    category: "apps",
    tag: "Popular",
    icon: Smartphone,
    accentColor: "#f5c518",
    desc: "Stay on top of tasks, deadlines, and study schedules — right from your phone. Works offline too.",
    features: ["Offline support", "Task management", "Study scheduler"],
    comingSoon: true,
  },
  {
    id: 2,
    slug: "upcat-prep-app",
    name: "UPCAT Prep App",
    price: 149,
    type: "PWA App",
    category: "apps",
    tag: "Best Seller",
    icon: Zap,
    accentColor: "#f5c518",
    desc: "Full UPCAT reviewer with practice tests, timers, and progress tracking. Start your review today.",
    features: ["Practice tests", "Progress tracker", "Offline access"],
    comingSoon: true,
  },
  {
    id: 3,
    slug: "science-reviewer",
    name: "Science Reviewer",
    price: 79,
    type: "PDF Guide",
    category: "guides",
    tag: null,
    icon: BookOpen,
    accentColor: "#7a9e87",
    desc: "Compact, exam-ready science notes covering all major high school topics. Print or read on-screen.",
    features: ["All science subjects", "Printable PDF", "Exam-focused"],
    comingSoon: true,
  },
  {
    id: 4,
    slug: "note-taking-template-pack",
    name: "Note-taking Template Pack",
    price: 49,
    type: "Template",
    category: "templates",
    tag: "Bestseller",
    icon: FileText,
    accentColor: "#7a9e87",
    desc: "Clean, printable note templates that make studying less painful. Cornell, outline, and more.",
    features: ["5 template styles", "A4 & letter size", "Editable PDF"],
    comingSoon: true,
  },
  {
    id: 5,
    slug: "math-formula-sheet",
    name: "Math Formula Sheet",
    price: 39,
    type: "PDF Guide",
    category: "guides",
    tag: null,
    icon: Calculator,
    accentColor: "#7a9e87",
    desc: "All the formulas you need in one place — algebra, geometry, trig, and basic calculus.",
    features: ["All math topics", "Quick reference", "Print-ready"],
    comingSoon: true,
  },
  {
    id: 6,
    slug: "pomodoro-study-timer",
    name: "Pomodoro Study Timer",
    price: 59,
    type: "PWA App",
    category: "apps",
    tag: "New",
    icon: Timer,
    accentColor: "#f5c518",
    desc: "Beat procrastination with timed study sessions. Customizable breaks, session logs, and streaks.",
    features: ["Custom timers", "Session history", "Streak tracking"],
    comingSoon: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
