import { ChevronLeft, ChevronRight, Star, type LucideIcon } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  const { lang } = useApp();
  const Back = lang === "ar" ? ChevronRight : ChevronLeft;
  return (
    <header className="bg-gradient-to-b from-indigo-600 to-indigo-500 px-5 pt-8 pb-16 rounded-b-3xl shadow-lg shadow-indigo-600/20">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors shrink-0"
          >
            <Back className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{title}</h1>
          {subtitle && <p className="text-xs text-indigo-100 truncate">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

export function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(cls, i <= Math.round(value) ? "text-amber-400 fill-amber-400" : "text-slate-300")}
        />
      ))}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
        <Icon className="h-8 w-8 text-indigo-500" />
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  );
}