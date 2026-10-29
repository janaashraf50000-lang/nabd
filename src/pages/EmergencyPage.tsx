import { useState } from "react";
import { Siren, MapPin, Phone, Plus, Trash2, AlertTriangle, Check, X, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader } from "@/components/Shared";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function EmergencyPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, contacts, addContact, deleteContact } = useApp();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locState, setLocState] = useState<"idle" | "loading" | "denied">("idle");
  const [reason, setReason] = useState("chest");
  const [confirming, setConfirming] = useState(false);
  const [sent, setSent] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reasons = [
    { key: "chest", ar: "ألم في الصدر", en: "Chest pain" },
    { key: "breath", ar: "صعوبة في التنفس", en: "Difficulty breathing" },
    { key: "accident", ar: "حادث أو إصابة", en: "Accident or injury" },
    { key: "faint", ar: "إغماء أو دوخة شديدة", en: "Fainting or severe dizziness" },
    { key: "other", ar: "حالة أخرى", en: "Other" },
  ];

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocState("denied");
      toast.error(t("خدمة الموقع غير مدعومة", "Geolocation not supported"));
      return;
    }
    setLocState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocState("idle");
        toast.success(t("تم تحديد موقعك", "Location detected"));
      },
      () => {
        setLocState("denied");
        toast.error(t("تم رفض إذن الموقع", "Location permission denied"));
      }
    );
  };

  const handleAddContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      toast.error(t("يرجى إدخال الاسم ورقم الهاتف", "Enter name and phone"));
      return;
    }
    addContact({ name: newName.trim(), relation: newRelation.trim() || t("جهة اتصال", "Contact"), phone: newPhone.trim() });
    setNewName("");
    setNewRelation("");
    setNewPhone("");
    setShowAdd(false);
    toast.success(t("تمت إضافة جهة الاتصال", "Contact added"));
  };

  const sendDemo = () => {
    setConfirming(false);
    setSent(true);
    toast.success(t("تم إنشاء طلب طوارئ تجريبي", "Demo emergency request created"));
  };

  if (sent) {
    return (
      <div>
        <PageHeader title={t("المساعدة الطارئة", "Emergency Assistance")} onBack={() => navigate("home")} />
        <div className="px-5 -mt-6">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-lg p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 mb-4">
              <ShieldAlert className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {t("تم إنشاء طلب تجريبي", "Demo request created")}
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {t(
                "هذا طلب تجريبي فقط. لم يتم الاتصال بأي جهة طوارئ حقيقية أو إسعاف. في حالة الطوارئ الحقيقية اتصل بالرقم 997.",
                "This is a demo request only. No real emergency service or ambulance was contacted. In a real emergency call 997."
              )}
            </p>
            <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-start">
              <p className="text-xs font-semibold text-amber-800 mb-2">
                {t("المعلومات التي كانت ستُشارك", "Information that would be shared")}
              </p>
              <div className="space-y-1 text-xs text-amber-900">
                <p>• {t("الاسم", "Name")}: {t("أحمد عبدالرحمن", "Ahmed Abdelrahman")}</p>
                <p>• {t("السبب", "Reason")}: {t(reasons.find((r) => r.key === reason)?.ar ?? "", reasons.find((r) => r.key === reason)?.en ?? "")}</p>
                <p>• {t("الموقع", "Location")}: {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : t("غير متاح", "Unavailable")}</p>
                <p>• {t("جهات الاتصال", "Contacts")}: {contacts.length}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSent(false);
                setLocation(null);
              }}
              className="mt-5 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700 transition-colors"
            >
              {t("رجوع", "Back")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t("المساعدة الطارئة", "Emergency Assistance")}
        subtitle={t("نسخة تجريبية - لا تتصل بالطوارئ الحقيقية", "Demo only - no real emergency contact")}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            {t(
              "تنبيه: هذه الميزة تجريبية ولا ترسل تنبيهات طوارئ حقيقية. في حالة الطوارئ اتصل فوراً بالرقم 997.",
              "Notice: This feature is a demo and does not send real emergency alerts. In a real emergency call 997 immediately."
            )}
          </p>
        </div>

        <button
          onClick={() => setConfirming(true)}
          className="mt-4 w-full rounded-3xl bg-gradient-to-b from-rose-500 to-rose-600 p-6 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 mb-3">
            <Siren className="h-10 w-10 text-white" />
          </div>
          <p className="text-xl font-bold text-white">{t("طلب المساعدة", "Request Help")}</p>
          <p className="text-xs text-rose-100 mt-1">{t("اضغط لبدء طلب طوارئ تجريبي", "Tap to start a demo request")}</p>
        </button>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-3">{t("سبب الطوارئ", "Emergency reason")}</h3>
          <div className="space-y-2">
            {reasons.map((r) => (
              <button
                key={r.key}
                onClick={() => setReason(r.key)}
                className={cn(
                  "w-full rounded-xl p-3 text-start text-sm font-medium border transition-colors",
                  reason === r.key
                    ? "bg-rose-50 border-rose-300 text-rose-700"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                )}
              >
                {t(r.ar, r.en)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              {t("الموقع", "Location")}
            </h3>
            <button
              onClick={requestLocation}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {locState === "loading" ? t("جارٍ التحديد...", "Locating...") : t("تحديد موقعي", "Get location")}
            </button>
          </div>
          {location ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-xs text-emerald-800 font-medium">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </span>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">
                {locState === "denied"
                  ? t("تم رفض إذن الموقع", "Location permission denied")
                  : t("لم يتم تحديد الموقع بعد", "Location not set yet")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Phone className="h-4 w-4 text-indigo-500" />
              {t("جهات اتصال الطوارئ", "Emergency contacts")}
            </h3>
            <button
              onClick={() => setShowAdd(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {contacts.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-3">{t("لا توجد جهات اتصال", "No contacts")}</p>
            ) : (
              contacts.map((c) => (
                <div key={c.id} className="rounded-xl bg-slate-50 p-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 text-xs font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.relation} • {c.phone}</p>
                  </div>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5 mb-2">
          <h3 className="font-bold text-slate-900 mb-3">{t("معاينة المعلومات", "Information preview")}</h3>
          <div className="space-y-1.5 text-xs text-slate-600">
            <p>• {t("الاسم", "Name")}: {t("أحمد عبدالرحمن", "Ahmed Abdelrahman")}</p>
            <p>• {t("السبب", "Reason")}: {t(reasons.find((r) => r.key === reason)?.ar ?? "", reasons.find((r) => r.key === reason)?.en ?? "")}</p>
            <p>• {t("الموقع", "Location")}: {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : t("غير متاح", "Unavailable")}</p>
            <p>• {t("جهات الاتصال", "Contacts")}: {contacts.length}</p>
          </div>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 mb-3">
              <Siren className="h-7 w-7 text-rose-600" />
            </div>
            <h3 className="text-center font-bold text-slate-900">{t("تأكيد الطلب التجريبي", "Confirm demo request")}</h3>
            <p className="text-center text-sm text-slate-500 mt-2 leading-relaxed">
              {t(
                "هذا طلب تجريبي ولن يتم الاتصال بأي جهة طوارئ حقيقية.",
                "This is a demo request and no real emergency service will be contacted."
              )}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 hover:bg-slate-200 transition-colors"
              >
                {t("تراجع", "Cancel")}
              </button>
              <button
                onClick={sendDemo}
                className="flex-1 rounded-xl bg-rose-600 text-white font-semibold py-2.5 hover:bg-rose-700 transition-colors"
              >
                {t("تأكيد", "Confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">{t("إضافة جهة اتصال", "Add contact")}</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t("الاسم", "Name")}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <input
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value)}
                placeholder={t("صلة القرابة", "Relation")}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder={t("رقم الهاتف", "Phone")}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
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
                onClick={handleAddContact}
                className="flex-1 rounded-xl bg-indigo-600 text-white font-semibold py-2.5 hover:bg-indigo-700 transition-colors"
              >
                {t("إضافة", "Add")}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 mb-3">
              <Trash2 className="h-7 w-7 text-rose-600" />
            </div>
            <h3 className="text-center font-bold text-slate-900">{t("حذف جهة الاتصال؟", "Delete contact?")}</h3>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl bg-slate-100 text-slate-700 font-semibold py-2.5 hover:bg-slate-200 transition-colors"
              >
                {t("تراجع", "Keep")}
              </button>
              <button
                onClick={() => {
                  deleteContact(deleteId);
                  setDeleteId(null);
                  toast.success(t("تم الحذف", "Deleted"));
                }}
                className="flex-1 rounded-xl bg-rose-600 text-white font-semibold py-2.5 hover:bg-rose-700 transition-colors"
              >
                {t("حذف", "Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}