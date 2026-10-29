import { Home, CalendarDays, FileText, MessageCircle, User } from "lucide-react";
import { useApp } from "@/store/AppContext";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function BottomNav({ page, navigate }: { page: Page; navigate: (p: Page) => void }) {
  const { t } = useApp();
  const items: { key: Page; icon: typeof Home; ar: string; en: string }[] = [
    { key: "home", icon: Home, ar: "الرئيسية", en: "Home" },
    { key: "appointments", icon: CalendarDays, ar: "المواعيد", en: "Visits" },
    { key: "records", icon: FileText, ar: "السجل", en: "Records" },
    { key: "messages", icon: MessageCircle, ar: "الرسائل", en: "Chat" },
    { key: "profile", icon: User, ar: "حسابي", en: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-2 py-2 flex items-center justify-around z-40 shadow-lg">
      {items.map((it) => {
        const Icon = it.icon;
        const active = page === it.key;
        return (
          <button
            key={it.key}
            onClick={() => navigate(it.key)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors"
          >
            <Icon className={cn("h-5 w-5", active ? "text-indigo-600" : "text-slate-400")} />
            <span className={cn("text-[10px] font-semibold", active ? "text-indigo-600" : "text-slate-400")}>
              {t(it.ar, it.en)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}