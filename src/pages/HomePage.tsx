import { useState } from "react";
import {
  Bell,
  Search,
  CalendarDays,
  FileText,
  MessageCircle,
  Siren,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { SpecialtyIcon } from "@/components/SpecialtyIcon";
import { SPECIALTIES, CATEGORIES } from "@/data/specialties";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function HomePage({ navigate }: { navigate: (p: Page, id?: string) => void }) {
  const { t, lang, doctors, appointments } = useApp();
  const [query, setQuery] = useState("");
  const [specialtyId, setSpecialtyId] = useState<string>("all");

  const popularIds = ["cardiology", "pediatrics", "dermatology", "orthopedics", "neurosurgery", "obgyn"];
  const popular = popularIds
    .map((id) => SPECIALTIES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const upcoming = appointments.find((a) => a.status === "confirmed" || a.status === "pending");
  const upcomingDoc = doctors.find((d) => d.id === upcoming?.doctorId);

  const filtered = doctors.filter((d) => {
    const matchSpec = specialtyId === "all" || d.specialtyId === specialtyId;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.specialtyEn.toLowerCase().includes(q);
    return matchSpec && matchQuery;
  });

  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <div>
      <header className="bg-gradient-to-b from-indigo-600 to-indigo-500 px-5 pt-8 pb-16 rounded-b-3xl shadow-lg shadow-indigo-600/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
              alt="Ahmed"
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/30"
            />
            <div>
              <p className="text-xs text-indigo-100">{t("صباح الخير", "Good morning")}</p>
              <h1 className="text-base font-bold text-white">
                {t("أحمد عبدالرحمن", "Ahmed Abdelrahman")}
              </h1>
            </div>
          </div>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white hover:bg-white/25 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-400" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحث عن طبيب أو تخصص...", "Search doctors or specialties...")}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
      </header>

      <div className="px-5 -mt-10">
        {upcoming && upcomingDoc && (
          <div className="rounded-3xl bg-white border border-slate-100 shadow-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {t("موعدك القادم", "Upcoming")}
              </span>
              <button
                onClick={() => navigate("appointments")}
                className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {t("عرض الكل", "View all")}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src={upcomingDoc.image} alt={upcomingDoc.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">
                  {t(upcomingDoc.name, upcomingDoc.nameEn)}
                </h3>
                <p className="text-xs text-indigo-600 font-medium">
                  {t(upcomingDoc.specialty, upcomingDoc.specialtyEn)}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {upcoming.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {upcoming.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">{t("التخصصات الشائعة", "Popular specialties")}</h2>
          <button
            onClick={() => navigate("specialties")}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            {t("عرض الكل", "View all")}
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setSpecialtyId("all")}
            className={cn(
              "shrink-0 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-colors",
              specialtyId === "all"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
            )}
          >
            {t("الكل", "All")}
          </button>
          {popular.map((s) => {
            const cat = CATEGORIES.find((c) => c.id === s.category);
            return (
              <button
                key={s.id}
                onClick={() => setSpecialtyId(s.id)}
                className={cn(
                  "shrink-0 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-colors flex items-center gap-1.5",
                  specialtyId === s.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                )}
              >
                <SpecialtyIcon name={s.icon} className={cn("h-3.5 w-3.5", specialtyId === s.id ? "text-white" : cat?.color.split(" ")[1])} />
                {t(s.ar, s.en)}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: CalendarDays, ar: "المواعيد", en: "Visits", page: "appointments" as Page, color: "bg-indigo-50 text-indigo-600" },
            { icon: FileText, ar: "السجل", en: "Records", page: "records" as Page, color: "bg-emerald-50 text-emerald-600" },
            { icon: MessageCircle, ar: "الرسائل", en: "Chat", page: "messages" as Page, color: "bg-amber-50 text-amber-600" },
          ].map((q) => {
            const Icon = q.icon;
            return (
              <button
                key={q.page}
                onClick={() => navigate(q.page)}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", q.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{t(q.ar, q.en)}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate("emergency")}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 p-4 flex items-center gap-3 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-shadow"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <Siren className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 text-start">
            <p className="font-bold text-white text-sm">{t("المساعدة الطارئة", "Emergency Help")}</p>
            <p className="text-[11px] text-rose-100">{t("اضغط للوصول السريع", "Tap for quick access")}</p>
          </div>
          <Chevron className="h-5 w-5 text-white/80" />
        </button>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">{t("أطباء موصى بهم", "Recommended doctors")}</h2>
          <button
            onClick={() => navigate("booking")}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            {t("احجز الآن", "Book now")}
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
              <p className="text-sm text-slate-500">{t("لا توجد نتائج مطابقة", "No matching results")}</p>
            </div>
          ) : (
            filtered.slice(0, 8).map((d) => (
              <button
                key={d.id}
                onClick={() => navigate("doctor", d.id)}
                className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
              >
                <img src={d.image} alt={d.name} className="h-16 w-16 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">
                    {t(d.name, d.nameEn)}
                  </h3>
                  <p className="text-xs text-indigo-600 font-medium">
                    {t(d.specialty, d.specialtyEn)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">{d.rating}</span>
                    <span className="text-[11px] text-slate-400">
                      ({d.reviews} {t("تقييم", "reviews")})
                    </span>
                  </div>
                </div>
                <Chevron className="h-5 w-5 text-slate-300" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}