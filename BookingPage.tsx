import { useState, useMemo, useEffect } from "react";
import { Search, Star, Check, CalendarDays, Clock, ChevronLeft, ChevronRight, X, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader, Stars } from "@/components/Shared";
import { SpecialtyIcon } from "@/components/SpecialtyIcon";
import { SPECIALTIES, CATEGORIES } from "@/data/specialties";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function BookingPage({
  navigate,
  preselectedDoctorId,
}: {
  navigate: (p: Page, id?: string) => void;
  preselectedDoctorId?: string | null;
}) {
  const { t, lang, doctors, addAppointment } = useApp();
  const [specialtyId, setSpecialtyId] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"rating" | "fee" | "experience">("rating");
  const [minRating, setMinRating] = useState(0);
  const [maxFee, setMaxFee] = useState(1000);
  const [minExp, setMinExp] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(preselectedDoctorId ?? null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [type, setType] = useState<"initial" | "followup">("initial");
  const [done, setDone] = useState(false);

  const dates = ["2025-06-18", "2025-06-19", "2025-06-20", "2025-06-22", "2025-06-23"];

  useEffect(() => {
    if (preselectedDoctorId) setSelectedDoctor(preselectedDoctorId);
  }, [preselectedDoctorId]);

  const usedSpecialtyIds = useMemo(() => {
    const ids = new Set(doctors.map((d) => d.specialtyId));
    return SPECIALTIES.filter((s) => ids.has(s.id));
  }, [doctors]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = doctors.filter((d) => {
      const matchSpec = specialtyId === "all" || d.specialtyId === specialtyId;
      const matchQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.specialtyEn.toLowerCase().includes(q);
      const matchRating = d.rating >= minRating;
      const matchFee = d.fee <= maxFee;
      const matchExp = d.experience >= minExp;
      return matchSpec && matchQuery && matchRating && matchFee && matchExp;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "fee") return a.fee - b.fee;
      return b.experience - a.experience;
    });
    return list;
  }, [doctors, specialtyId, query, sort, minRating, maxFee, minExp]);

  const doctor = doctors.find((d) => d.id === selectedDoctor);
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  const confirm = () => {
    if (!doctor || !selectedDate || !selectedTime) {
      toast.error(t("يرجى اختيار الطبيب والتاريخ والوقت", "Select doctor, date and time"));
      return;
    }
    addAppointment({
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime,
      type,
      status: "confirmed",
      duration: type === "initial" ? 30 : 20,
    });
    setDone(true);
    toast.success(t("تم تأكيد الموعد بنجاح", "Appointment confirmed"));
  };

  if (done && doctor) {
    return (
      <div>
        <PageHeader title={t("تأكيد الموعد", "Confirmation")} onBack={() => navigate("home")} />
        <div className="px-5 -mt-6">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-lg p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-4">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{t("تم تأكيد موعدك", "Appointment confirmed")}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {t("تمت إضافة الموعد إلى صفحة مواعيدك", "Added to your appointments")}
            </p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-start space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t("الطبيب", "Doctor")}</span>
                <span className="font-semibold text-slate-800">{t(doctor.name, doctor.nameEn)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t("التخصص", "Specialty")}</span>
                <span className="font-semibold text-slate-800">{t(doctor.specialty, doctor.specialtyEn)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t("التاريخ", "Date")}</span>
                <span className="font-semibold text-slate-800">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t("الوقت", "Time")}</span>
                <span className="font-semibold text-slate-800">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{t("الرسوم", "Fee")}</span>
                <span className="font-semibold text-slate-800">{doctor.fee} {t("ج.م", "EGP")}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => navigate("appointments")}
                className="flex-1 rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700 transition-colors"
              >
                {t("مواعيدي", "My appointments")}
              </button>
              <button
                onClick={() => navigate("home")}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-3 hover:bg-slate-200 transition-colors"
              >
                {t("الرئيسية", "Home")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t("حجز موعد", "Book Appointment")}
        subtitle={t("اختر التخصص والطبيب والوقت", "Choose specialty, doctor and time")}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحث عن طبيب أو تخصص...", "Search doctor or specialty...")}
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              showFilters ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">{t("أدنى تقييم", "Min rating")}</span>
                <span className="text-xs font-bold text-indigo-600">{minRating.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">{t("أقصى رسوم", "Max fee")}</span>
                <span className="text-xs font-bold text-indigo-600">{maxFee} {t("ج.م", "EGP")}</span>
              </div>
              <input
                type="range"
                min={150}
                max={1000}
                step={50}
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">{t("أدنى خبرة", "Min experience")}</span>
                <span className="text-xs font-bold text-indigo-600">{minExp} {t("سنوات", "yrs")}</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={minExp}
                onChange={(e) => setMinExp(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <span className="text-xs text-slate-500 shrink-0">{t("ترتيب:", "Sort:")}</span>
          {[
            { key: "rating" as const, ar: "الأعلى تقييماً", en: "Top rated" },
            { key: "fee" as const, ar: "الأقل رسوماً", en: "Lowest fee" },
            { key: "experience" as const, ar: "الأكثر خبرة", en: "Most exp" },
          ].map((o) => (
            <button
              key={o.key}
              onClick={() => setSort(o.key)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                sort === o.key ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {t(o.ar, o.en)}
            </button>
          ))}
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
          {usedSpecialtyIds.map((s) => {
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

        <p className="text-xs text-slate-500 mt-3">
          {filtered.length} {t("طبيب متاح", "doctors available")}
        </p>

        <div className="mt-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
              <p className="text-sm text-slate-500">{t("لا يوجد أطباء مطابقون", "No matching doctors")}</p>
            </div>
          ) : (
            filtered.slice(0, 40).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDoctor(d.id);
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className={cn(
                  "w-full rounded-2xl border p-3 flex items-center gap-3 transition-all text-start",
                  selectedDoctor === d.id
                    ? "bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-600/10"
                    : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                )}
              >
                <img src={d.image} alt={d.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{t(d.name, d.nameEn)}</h3>
                  <p className="text-xs text-indigo-600 font-medium truncate">{t(d.specialty, d.specialtyEn)}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">{d.rating.toFixed(1)}</span>
                    <span className="text-[11px] text-slate-400">
                      • {d.fee} {t("ج.م", "EGP")} • {d.experience} {t("سنة", "yrs")}
                    </span>
                  </div>
                </div>
                {selectedDoctor === d.id && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {doctor && (
          <div className="mt-5 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-indigo-500" />
              {t("اختر التاريخ", "Select date")}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    "shrink-0 rounded-xl px-3 py-2.5 text-xs font-semibold border transition-colors",
                    selectedDate === d ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <h3 className="font-bold text-slate-900 mb-3 mt-5 flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" />
              {t("اختر الوقت", "Select time")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {doctor.slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedTime(s)}
                  className={cn(
                    "rounded-xl py-2.5 text-xs font-semibold border transition-colors",
                    selectedTime === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <h3 className="font-bold text-slate-900 mb-3 mt-5">{t("نوع الموعد", "Appointment type")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "initial" as const, ar: "استشارة أولية", en: "Initial", dur: 30 },
                { key: "followup" as const, ar: "متابعة", en: "Follow-up", dur: 20 },
              ].map((o) => (
                <button
                  key={o.key}
                  onClick={() => setType(o.key)}
                  className={cn(
                    "rounded-xl p-3 text-start border transition-colors",
                    type === o.key ? "bg-indigo-50 border-indigo-400" : "bg-slate-50 border-slate-200"
                  )}
                >
                  <p className="text-sm font-semibold text-slate-800">{t(o.ar, o.en)}</p>
                  <p className="text-[11px] text-slate-500">{o.dur} {t("دقيقة", "min")}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {doctor && selectedDate && selectedTime && (
          <div className="mt-4 rounded-2xl bg-indigo-50 border border-indigo-200 p-5">
            <h3 className="font-bold text-indigo-900 mb-3">{t("ملخص الحجز", "Booking summary")}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-indigo-700/70">{t("الطبيب", "Doctor")}</span>
                <span className="font-semibold text-indigo-900">{t(doctor.name, doctor.nameEn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700/70">{t("التخصص", "Specialty")}</span>
                <span className="font-semibold text-indigo-900">{t(doctor.specialty, doctor.specialtyEn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700/70">{t("التاريخ", "Date")}</span>
                <span className="font-semibold text-indigo-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700/70">{t("الوقت", "Time")}</span>
                <span className="font-semibold text-indigo-900">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-700/70">{t("الرسوم", "Fee")}</span>
                <span className="font-semibold text-indigo-900">{doctor.fee} {t("ج.م", "EGP")}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={confirm}
          disabled={!doctor || !selectedDate || !selectedTime}
          className={cn(
            "mt-4 w-full rounded-xl font-semibold py-3.5 transition-colors flex items-center justify-center gap-2",
            doctor && selectedDate && selectedTime
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-slate-200 text-slate-400"
          )}
        >
          <Check className="h-4 w-4" />
          {t("تأكيد الموعد", "Confirm Appointment")}
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-3 mb-2">
          {t("التوفر المعروض تجريبي وليس في الوقت الفعلي", "Availability shown is demo, not real-time")}
        </p>
      </div>
    </div>
  );
}