import { useState } from "react";
import { CalendarDays, Clock, Star, X, RotateCcw, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader, EmptyState } from "@/components/Shared";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  completed: "bg-indigo-50 text-indigo-700",
  cancelled: "bg-rose-50 text-rose-700",
};

export function AppointmentsPage({ navigate }: { navigate: (p: Page, id?: string) => void }) {
  const { t, doctors, appointments, updateAppointment } = useApp();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const upcoming = appointments.filter((a) => a.status === "confirmed" || a.status === "pending");
  const past = appointments.filter((a) => a.status === "completed" || a.status === "cancelled");
  const list = tab === "upcoming" ? upcoming : past;

  const statusLabel = (s: string) =>
    ({
      confirmed: t("مؤكد", "Confirmed"),
      pending: t("قيد الانتظار", "Pending"),
      completed: t("مكتمل", "Completed"),
      cancelled: t("ملغى", "Cancelled"),
    }[s] ?? s);

  const dates = ["2025-06-18", "2025-06-19", "2025-06-20", "2025-06-22", "2025-06-23"];
  const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

  return (
    <div>
      <PageHeader
        title={t("مواعيدي", "My Appointments")}
        subtitle={`${upcoming.length} ${t("قادم", "upcoming")} • ${past.length} ${t("سابق", "past")}`}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="flex gap-1 rounded-2xl bg-slate-100 p-1">
          {[
            { key: "upcoming" as const, ar: "القادمة", en: "Upcoming" },
            { key: "past" as const, ar: "السابقة", en: "Previous" },
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

        <div className="mt-4 space-y-3">
          {list.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title={t("لا توجد مواعيد", "No appointments")}
              desc={t("احجز موعداً جديداً من صفحة الحجز", "Book a new appointment")}
            />
          ) : (
            list.map((a) => {
              const doc = doctors.find((d) => d.id === a.doctorId);
              if (!doc) return null;
              return (
                <div key={a.id} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    <img src={doc.image} alt={doc.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-900 text-sm truncate">{t(doc.name, doc.nameEn)}</h3>
                        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold", STATUS_STYLE[a.status])}>
                          {statusLabel(a.status)}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-600 font-medium truncate">{t(doc.specialty, doc.specialtyEn)}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {a.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {a.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-[11px] font-semibold text-slate-600">{doc.rating.toFixed(1)}</span>
                        <span className="text-[11px] text-slate-400">
                          • {a.type === "initial" ? t("استشارة أولية", "Initial") : t("متابعة", "Follow-up")} • {doc.fee} {t("ج.م", "EGP")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {(a.status === "confirmed" || a.status === "pending") && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setRescheduleId(a.id);
                          setNewDate(a.date);
                          setNewTime(a.time);
                        }}
                        className="flex-1 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-semibold py-2.5 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {t("إعادة جدولة", "Reschedule")}
                      </button>
                      <button
                        onClick={() => setCancelId(a.id)}
                        className="flex-1 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold py-2.5 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <X className="h-3.5 w-3.5" />
                        {t("إلغاء", "Cancel")}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => navigate("doctor", doc.id)}
                    className="mt-2 w-full rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold py-2.5 hover:bg-slate-100 transition-colors"
                  >
                    {t("عرض ملف الطبيب", "View doctor profile")}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={() => navigate("booking")}
          className="mt-4 mb-2 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3.5 hover:bg-indigo-700 transition-colors"
        >
          {t("حجز موعد جديد", "Book new appointment")}
        </button>
      </div>

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 mb-3">
              <AlertCircle className="h-7 w-7 text-rose-600" />
            </div>
            <h3 className="text-center font-bold text-slate-900">{t("إلغاء الموعد؟", "Cancel appointment?")}</h3>
            <p className="text-center text-sm text-slate-500 mt-2">
              {t("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 hover:bg-slate-200 transition-colors"
              >
                {t("تراجع", "Keep")}
              </button>
              <button
                onClick={() => {
                  updateAppointment(cancelId, { status: "cancelled" });
                  setCancelId(null);
                  toast.success(t("تم إلغاء الموعد", "Appointment cancelled"));
                }}
                className="flex-1 rounded-xl bg-rose-600 text-white font-semibold py-2.5 hover:bg-rose-700 transition-colors"
              >
                {t("تأكيد الإلغاء", "Confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {rescheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">{t("إعادة جدولة", "Reschedule")}</h3>
              <button onClick={() => setRescheduleId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-2">{t("اختر التاريخ", "Select date")}</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => setNewDate(d)}
                  className={cn(
                    "shrink-0 rounded-xl px-3 py-2 text-xs font-semibold border transition-colors",
                    newDate === d ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mb-2 mt-3">{t("اختر الوقت", "Select time")}</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((tm) => (
                <button
                  key={tm}
                  onClick={() => setNewTime(tm)}
                  className={cn(
                    "rounded-xl py-2 text-xs font-semibold border transition-colors",
                    newTime === tm ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                  )}
                >
                  {tm}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                updateAppointment(rescheduleId, { date: newDate, time: newTime, status: "confirmed" });
                setRescheduleId(null);
                toast.success(t("تمت إعادة الجدولة", "Rescheduled"));
              }}
              className="mt-5 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              {t("تأكيد", "Confirm")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}