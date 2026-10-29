import { useState, useMemo } from "react";
import { Search, Star, ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { PageHeader } from "@/components/Shared";
import { SpecialtyIcon } from "@/components/SpecialtyIcon";
import { SPECIALTIES, CATEGORIES } from "@/data/specialties";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function SpecialtiesPage({ navigate }: { navigate: (p: Page, id?: string) => void }) {
  const { t, lang, doctors, favorites, toggleFavorite } = useApp();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [sort, setSort] = useState<"name" | "doctors">("name");
  const [selected, setSelected] = useState<string | null>(null);

  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  const countFor = (id: string) => doctors.filter((d) => d.specialtyId === id).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SPECIALTIES.filter((s) => {
      const matchCat = activeCat === "all" || s.category === activeCat;
      const matchQ =
        !q ||
        s.ar.toLowerCase().includes(q) ||
        s.en.toLowerCase().includes(q) ||
        s.descAr.toLowerCase().includes(q) ||
        s.descEn.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    if (sort === "name") {
      list = [...list].sort((a, b) => (lang === "ar" ? a.ar.localeCompare(b.ar, "ar") : a.en.localeCompare(b.en)));
    } else {
      list = [...list].sort((a, b) => countFor(b.id) - countFor(a.id));
    }
    return list;
  }, [query, activeCat, sort, lang, doctors]);

  const selectedSpec = SPECIALTIES.find((s) => s.id === selected);
  const specDoctors = selected ? doctors.filter((d) => d.specialtyId === selected) : [];

  if (selectedSpec) {
    const cat = CATEGORIES.find((c) => c.id === selectedSpec.category);
    return (
      <div>
        <PageHeader
          title={t(selectedSpec.ar, selectedSpec.en)}
          subtitle={t(selectedSpec.descAr, selectedSpec.descEn)}
          onBack={() => setSelected(null)}
        />
        <div className="px-5 -mt-6">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-lg p-5">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", cat?.color ?? "bg-indigo-50 text-indigo-600")}>
                <SpecialtyIcon name={selectedSpec.icon} className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-slate-900">{t(selectedSpec.ar, selectedSpec.en)}</h2>
                <p className="text-xs text-slate-500">{t(cat?.ar ?? "", cat?.en ?? "")}</p>
              </div>
              <button
                onClick={() => toggleFavorite(selectedSpec.id)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                  favorites.includes(selectedSpec.id)
                    ? "bg-rose-50 text-rose-500"
                    : "bg-slate-100 text-slate-400 hover:text-rose-400"
                )}
              >
                <Heart className={cn("h-5 w-5", favorites.includes(selectedSpec.id) && "fill-rose-500")} />
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {t(selectedSpec.descAr, selectedSpec.descEn)}
            </p>
            <div className="mt-3 rounded-xl bg-indigo-50 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-indigo-700">{t("عدد الأطباء المتاحين", "Available doctors")}</span>
              <span className="text-sm font-bold text-indigo-700">{specDoctors.length}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 mt-5 mb-3">{t("الأطباء في هذا التخصص", "Doctors in this specialty")}</h3>
          {specDoctors.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
              <p className="text-sm text-slate-500">{t("لا يوجد أطباء متاحون حالياً", "No doctors available yet")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {specDoctors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => navigate("doctor", d.id)}
                  className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
                >
                  <img src={d.image} alt={d.name} className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{t(d.name, d.nameEn)}</h4>
                    <p className="text-xs text-indigo-600 font-medium">{t(d.specialty, d.specialtyEn)}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-700">{d.rating}</span>
                      <span className="text-[11px] text-slate-400">• {d.fee} {t("ر.س", "SAR")}</span>
                    </div>
                  </div>
                  <Chevron className="h-5 w-5 text-slate-300" />
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate("booking")}
            className="mt-4 mb-2 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3.5 hover:bg-indigo-700 transition-colors"
          >
            {t("احجز موعداً في هذا التخصص", "Book in this specialty")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t("دليل التخصصات الطبية", "Medical Specialties")}
        subtitle={`${SPECIALTIES.length} ${t("تخصص", "specialties")}`}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحث عن تخصص...", "Search specialty...")}
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-slate-500">{t("ترتيب:", "Sort:")}</span>
          <button
            onClick={() => setSort("name")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              sort === "name" ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
            )}
          >
            {t("أبجدي", "A-Z")}
          </button>
          <button
            onClick={() => setSort("doctors")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              sort === "doctors" ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
            )}
          >
            {t("الأكثر أطباء", "Most doctors")}
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setActiveCat("all")}
            className={cn(
              "shrink-0 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-colors",
              activeCat === "all"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200"
            )}
          >
            {t("الكل", "All")}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "shrink-0 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-colors",
                activeCat === c.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200"
              )}
            >
              {t(c.ar, c.en)}
            </button>
          ))}
        </div>

        {favorites.length > 0 && activeCat === "all" && !query && (
          <div className="mt-4">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              {t("المفضلة", "Favorites")}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {favorites.map((fid) => {
                const s = SPECIALTIES.find((x) => x.id === fid);
                if (!s) return null;
                return (
                  <button
                    key={fid}
                    onClick={() => setSelected(fid)}
                    className="shrink-0 rounded-2xl bg-white border border-rose-200 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    {t(s.ar, s.en)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
              <p className="text-sm text-slate-500">{t("لا توجد تخصصات مطابقة", "No matching specialties")}</p>
            </div>
          ) : (
            filtered.map((s) => {
              const cat = CATEGORIES.find((c) => c.id === s.category);
              const count = countFor(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shrink-0", cat?.color ?? "bg-indigo-50 text-indigo-600")}>
                    <SpecialtyIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{t(s.ar, s.en)}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{t(s.descAr, s.descEn)}</p>
                    <p className="text-[11px] text-indigo-600 font-medium mt-0.5">
                      {count} {t("طبيب متاح", "doctors")}
                    </p>
                  </div>
                  {favorites.includes(s.id) && <Heart className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />}
                  <Chevron className="h-5 w-5 text-slate-300 shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4 mb-2">
          {t("التخصصات المتاحة تعتمد على بيانات الأطباء التجريبية", "Available specialties depend on demo doctor data")}
        </p>
      </div>
    </div>
  );
}