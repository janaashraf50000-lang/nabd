import { useState } from "react";
import {
  Star, MapPin, Clock, Award, Heart, CalendarDays, MessageCircle, ChevronLeft, ChevronRight,
  Building2, BadgeCheck, Info,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader, Stars } from "@/components/Shared";
import { getDoctorsBySpecialty } from "@/data/doctors";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function DoctorProfilePage({
  navigate,
  doctorId,
}: {
  navigate: (p: Page, id?: string) => void;
  doctorId: string | null;
}) {
  const { t, lang, doctors, doctorFavorites, toggleDoctorFavorite } = useApp();
  const [tab, setTab] = useState<"about" | "reviews" | "slots">("about");

  const doctor = doctors.find((d) => d.id === doctorId);
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  if (!doctor) {
    return (
      <div>
        <PageHeader title={t("ملف الطبيب", "Doctor Profile")} onBack={() => navigate("home")} />
        <div className="px-5 -mt-6">
          <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
            <p className="text-sm text-slate-500">{t("لم يتم العثور على الطبيب", "Doctor not found")}</p>
          </div>
        </div>
      </div>
    );
  }

  const isFav = doctorFavorites.includes(doctor.id);
  const related = getDoctorsBySpecialty(doctor.specialtyId).filter((d) => d.id !== doctor.id).slice(0, 3);

  return (
    <div>
      <PageHeader title={t("ملف الطبيب", "Doctor Profile")} onBack={() => navigate("home")} />

      <div className="px-5 -mt-6">
        <div className="rounded-3xl bg-white border border-slate-100 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-b from-indigo-600 to-indigo-500 px-5 pt-5 pb-16 relative">
            <button
              onClick={() => toggleDoctorFavorite(doctor.id)}
              className={cn(
                "absolute top-4 flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                lang === "ar" ? "left-4" : "right-4",
                isFav ? "bg-white text-rose-500" : "bg-white/15 text-white hover:bg-white/25"
              )}
            >
              <Heart className={cn("h-5 w-5", isFav && "fill-rose-500")} />
            </button>
          </div>
          <div className="px-5 pb-5 -mt-12">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-24 w-24 rounded-3xl object-cover ring-4 ring-white shadow-md"
            />
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                  {t(doctor.name, doctor.nameEn)}
                  <BadgeCheck className="h-4 w-4 text-indigo-500 shrink-0" />
                </h1>
                <p className="text-sm text-indigo-600 font-medium">{t(doctor.specialty, doctor.specialtyEn)}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-amber-700">{doctor.rating.toFixed(1)}</span>
                <span className="text-[11px] text-amber-600">/ 5</span>
              </div>
              <span className="text-xs text-slate-500">
                {doctor.reviews} {t("تقييم", "reviews")}
              </span>
              <span className="text-xs text-slate-500">
                {doctor.experience} {t("سنوات خبرة", "yrs exp")}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("رسوم الاستشارة", "Consultation fee")}</p>
                <p className="text-sm font-bold text-slate-800">{doctor.fee} {t("ج.م", "EGP")}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("أقرب موعد", "Next available")}</p>
                <p className="text-sm font-bold text-slate-800">{doctor.nextSlot}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate("booking", doctor.id)}
                className="flex-1 rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <CalendarDays className="h-4 w-4" />
                {t("احجز موعداً", "Book Appointment")}
              </button>
              <button
                onClick={() => {
                  navigate("messages");
                  toast.info(t("افتح المحادثة مع الطبيب", "Open chat with the doctor"));
                }}
                className="rounded-xl bg-indigo-50 text-indigo-600 font-semibold px-4 py-3 hover:bg-indigo-100 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-1 rounded-2xl bg-slate-100 p-1">
          {[
            { key: "about" as const, ar: "نبذة", en: "About" },
            { key: "reviews" as const, ar: "التقييمات", en: "Reviews" },
            { key: "slots" as const, ar: "المواعيد", en: "Slots" },
          ].map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-xs font-semibold transition-colors",
                tab === tb.key ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
              )}
            >
              {t(tb.ar, tb.en)}
            </button>
          ))}
        </div>

        {tab === "about" && (
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-2">{t("نبذة مهنية", "Biography")}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-500" />
                {t("المؤهلات والخبرة", "Qualifications")}
              </h3>
              <ul className="space-y-2">
                {doctor.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-500" />
                {t("العيادة", "Clinic")}
              </h3>
              <p className="text-sm font-semibold text-slate-800">{doctor.clinic}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {doctor.address}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <Clock className="h-3.5 w-3.5" />
                {doctor.hours}
              </p>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{doctor.rating.toFixed(1)}</p>
                  <Stars value={doctor.rating} />
                  <p className="text-[11px] text-slate-500 mt-1">{doctor.reviews} {t("تقييم", "reviews")}</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const pct = s === 5 ? 72 : s === 4 ? 20 : s === 3 ? 6 : s === 2 ? 1 : 1;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 w-3">{s}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800">
                {t("جميع التقييمات والمراجعات بيانات تجريبية وليست من مرضى حقيقيين.", "All ratings and reviews are sample demo data, not from real patients.")}
              </p>
            </div>

            {doctor.reviewList.length === 0 ? (
              <div className="rounded-2xl bg-white border border-slate-100 p-8 text-center">
                <p className="text-sm text-slate-500">{t("لا توجد مراجعات بعد", "No reviews yet")}</p>
              </div>
            ) : (
              doctor.reviewList.map((rv) => (
                <div key={rv.id} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                      {rv.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{rv.author}</p>
                      <p className="text-[10px] text-slate-400">{rv.date}</p>
                    </div>
                    <Stars value={rv.rating} size="sm" />
                  </div>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{rv.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "slots" && (
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3">{t("أيام العمل", "Working days")}</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.days.map((d) => (
                  <span key={d} className="rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5">
                    {d}
                  </span>
                ))}
              </div>
              <h3 className="font-bold text-slate-900 mb-3 mt-5">{t("الأوقات المتاحة", "Available slots")}</h3>
              <div className="grid grid-cols-3 gap-2">
                {doctor.slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => navigate("booking", doctor.id)}
                    className="rounded-xl bg-slate-50 border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-5">
            <h3 className="font-bold text-slate-900 mb-3">{t("أطباء مشابهون", "Related doctors")}</h3>
            <div className="space-y-2.5">
              {related.map((d) => (
                <button
                  key={d.id}
                  onClick={() => navigate("doctor", d.id)}
                  className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
                >
                  <img src={d.image} alt={d.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{t(d.name, d.nameEn)}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-semibold text-slate-600">{d.rating.toFixed(1)}</span>
                      <span className="text-[11px] text-slate-400">• {d.fee} {t("ج.م", "EGP")}</span>
                    </div>
                  </div>
                  <Chevron className="h-4 w-4 text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 mt-4 mb-2">
          {t("بيانات تجريبية للعرض فقط", "Sample demo data only")}
        </p>
      </div>
    </div>
  );
}