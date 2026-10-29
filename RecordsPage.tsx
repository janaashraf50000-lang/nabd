import { useState } from "react";
import {
  FileText, FlaskConical, Scan, Pill, History, Plus, Trash2, X, Droplet, AlertTriangle,
  Heart, User, CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader, EmptyState } from "@/components/Shared";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

const CAT_META = {
  lab: { icon: FlaskConical, ar: "تحاليل", en: "Labs", color: "bg-emerald-50 text-emerald-600" },
  radiology: { icon: Scan, ar: "أشعة", en: "Radiology", color: "bg-indigo-50 text-indigo-600" },
  prescription: { icon: Pill, ar: "وصفات", en: "Prescriptions", color: "bg-amber-50 text-amber-600" },
  history: { icon: History, ar: "تاريخ مرضي", en: "History", color: "bg-rose-50 text-rose-600" },
};

export function RecordsPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, records, addRecord, deleteRecord } = useApp();
  const [tab, setTab] = useState<"all" | "lab" | "radiology" | "prescription" | "history">("all");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"lab" | "radiology" | "prescription" | "history">("lab");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");

  const filtered = tab === "all" ? records : records.filter((r) => r.category === tab);
  const detail = records.find((r) => r.id === detailId);

  const handleAdd = () => {
    if (!title.trim()) {
      toast.error(t("يرجى إدخال عنوان السجل", "Enter record title"));
      return;
    }
    addRecord({
      title: title.trim(),
      category,
      date: new Date().toISOString().slice(0, 10),
      doctor: t("أحمد عبدالرحمن", "Ahmed Abdelrahman"),
      summary: summary.trim() || t("سجل تجريبي", "Sample record"),
      details: details.trim() || t("لا توجد تفاصيل إضافية", "No additional details"),
    });
    setTitle("");
    setSummary("");
    setDetails("");
    setShowAdd(false);
    toast.success(t("تمت إضافة السجل", "Record added"));
  };

  return (
    <div>
      <PageHeader
        title={t("السجل الطبي الإلكتروني", "Medical Records")}
        subtitle={`${records.length} ${t("سجل", "records")}`}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <User className="h-7 w-7 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{t("أحمد عبدالرحمن", "Ahmed Abdelrahman")}</h3>
              <p className="text-xs text-slate-500">ID: NB-2025-4471</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-rose-50 p-3 text-center">
              <Droplet className="h-4 w-4 text-rose-500 mx-auto" />
              <p className="text-[10px] text-rose-600 mt-1">{t("فصيلة الدم", "Blood")}</p>
              <p className="text-sm font-bold text-rose-700">O+</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
              <p className="text-[10px] text-amber-600 mt-1">{t("حساسية", "Allergies")}</p>
              <p className="text-sm font-bold text-amber-700">1</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-center">
              <Heart className="h-4 w-4 text-emerald-500 mx-auto" />
              <p className="text-[10px] text-emerald-600 mt-1">{t("أدوية", "Meds")}</p>
              <p className="text-sm font-bold text-emerald-700">2</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-[11px] text-amber-800">
              <span className="font-semibold">{t("حساسية معروفة:", "Known allergy:")}</span> {t("البنسلين", "Penicillin")}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {[
            { key: "all" as const, ar: "الكل", en: "All" },
            { key: "lab" as const, ar: "تحاليل", en: "Labs" },
            { key: "radiology" as const, ar: "أشعة", en: "Radiology" },
            { key: "prescription" as const, ar: "وصفات", en: "Rx" },
            { key: "history" as const, ar: "تاريخ", en: "History" },
          ].map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={cn(
                "shrink-0 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-colors",
                tab === tb.key ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200"
              )}
            >
              {t(tb.ar, tb.en)}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-2.5">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FileText}
              title={t("لا توجد سجلات", "No records")}
              desc={t("أضف سجلاً طبياً جديداً", "Add a new medical record")}
            />
          ) : (
            filtered.map((r) => {
              const meta = CAT_META[r.category];
              const Icon = meta.icon;
              return (
                <div key={r.id} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl shrink-0", meta.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{r.summary}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {r.date}
                        </span>
                        <span>{r.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setDetailId(r.id)}
                      className="flex-1 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-semibold py-2.5 hover:bg-indigo-100 transition-colors"
                    >
                      {t("عرض التفاصيل", "View details")}
                    </button>
                    <button
                      onClick={() => setDeleteId(r.id)}
                      className="rounded-xl bg-rose-50 text-rose-600 px-4 py-2.5 hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="mt-4 mb-2 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3.5 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t("إضافة سجل تجريبي", "Add sample record")}
        </button>

        <p className="text-center text-[11px] text-slate-400 mb-2">
          {t("جميع السجلات بيانات تجريبية للعرض فقط", "All records are sample demo data only")}
        </p>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">{detail.title}</h3>
              <button onClick={() => setDetailId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("التاريخ", "Date")}</p>
                <p className="text-sm font-semibold text-slate-800">{detail.date}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("الطبيب", "Doctor")}</p>
                <p className="text-sm font-semibold text-slate-800">{detail.doctor}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("الملخص", "Summary")}</p>
                <p className="text-sm text-slate-700">{detail.summary}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">{t("التفاصيل", "Details")}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{detail.details}</p>
              </div>
            </div>
            <p className="text-[10px] text-amber-700 bg-amber-50 rounded-lg p-2 mt-3 text-center">
              {t("بيانات تجريبية - ليست تشخيصاً حقيقياً", "Demo data - not a real diagnosis")}
            </p>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 mb-3">
              <Trash2 className="h-7 w-7 text-rose-600" />
            </div>
            <h3 className="text-center font-bold text-slate-900">{t("حذف السجل؟", "Delete record?")}</h3>
            <p className="text-center text-sm text-slate-500 mt-2">
              {t("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 hover:bg-slate-200 transition-colors"
              >
                {t("تراجع", "Keep")}
              </button>
              <button
                onClick={() => {
                  deleteRecord(deleteId);
                  setDeleteId(null);
                  toast.success(t("تم حذف السجل", "Record deleted"));
                }}
                className="flex-1 rounded-xl bg-rose-600 text-white font-semibold py-2.5 hover:bg-rose-700 transition-colors"
              >
                {t("حذف", "Delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">{t("إضافة سجل", "Add record")}</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("عنوان السجل", "Record title")}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "lab" as const, ar: "تحليل", en: "Lab" },
                  { key: "radiology" as const, ar: "أشعة", en: "Radiology" },
                  { key: "prescription" as const, ar: "وصفة", en: "Rx" },
                  { key: "history" as const, ar: "تاريخ", en: "History" },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={cn(
                      "rounded-xl py-2.5 text-xs font-semibold border transition-colors",
                      category === c.key ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                    )}
                  >
                    {t(c.ar, c.en)}
                  </button>
                ))}
              </div>
              <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder={t("ملخص", "Summary")}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t("التفاصيل", "Details")}
                rows={3}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
              />
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 hover:bg-slate-200 transition-colors"
              >
                {t("تراجع", "Cancel")}
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 rounded-xl bg-indigo-600 text-white font-semibold py-2.5 hover:bg-indigo-700 transition-colors"
              >
                {t("إضافة", "Add")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}