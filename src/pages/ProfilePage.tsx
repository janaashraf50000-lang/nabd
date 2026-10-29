import { useState } from "react";
import { User, Mail, Phone, Bell, Globe, Shield, Save, LogOut, Check } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/store/AppContext";
import { PageHeader } from "@/components/Shared";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function ProfilePage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, lang, setLang } = useApp();
  const [name, setName] = useState(t("أحمد عبدالرحمن", "Ahmed Abdelrahman"));
  const [email, setEmail] = useState("ahmed.abdelrahman@example.com");
  const [phone, setPhone] = useState("+966 50 123 4567");
  const [notifAppt, setNotifAppt] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [shareRecords, setShareRecords] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const save = () => {
    if (!name.trim()) {
      toast.error(t("يرجى إدخال الاسم", "Please enter your name"));
      return;
    }
    if (!email.includes("@")) {
      toast.error(t("يرجى إدخال بريد إلكتروني صحيح", "Please enter a valid email"));
      return;
    }
    toast.success(t("تم حفظ التغييرات بنجاح", "Changes saved successfully"));
  };

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        on ? "bg-indigo-600" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          on ? "left-0.5" : "left-5.5"
        )}
      />
    </button>
  );

  return (
    <div>
      <PageHeader
        title={t("حسابي والإعدادات", "Profile & Settings")}
        subtitle={t("إدارة معلوماتك وتفضيلاتك", "Manage your info and preferences")}
        onBack={() => navigate("home")}
      />

      <div className="px-5 -mt-6">
        <div className="rounded-3xl bg-white border border-slate-100 shadow-lg p-5 text-center">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
            alt="Ahmed"
            className="mx-auto h-24 w-24 rounded-3xl object-cover ring-4 ring-indigo-50"
          />
          <h2 className="mt-3 font-bold text-slate-900">{name}</h2>
          <p className="text-xs text-slate-500">ID: NB-2025-4471</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">{t("موثّق", "Verified")}</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-500" />
            {t("المعلومات الشخصية", "Personal information")}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t("الاسم", "Name")}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block flex items-center gap-1">
                <Mail className="h-3 w-3" /> {t("البريد الإلكتروني", "Email")}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block flex items-center gap-1">
                <Phone className="h-3 w-3" /> {t("رقم الهاتف", "Phone")}
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-500" />
            {t("تفضيلات الإشعارات", "Notification preferences")}
          </h3>
          <div className="space-y-3">
            {[
              { label: t("تذكير المواعيد", "Appointment reminders"), on: notifAppt, set: setNotifAppt },
              { label: t("رسائل الأطباء", "Doctor messages"), on: notifMsg, set: setNotifMsg },
              { label: t("عروض وتحديثات", "Offers and updates"), on: notifPromo, set: setNotifPromo },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{n.label}</span>
                <Toggle on={n.on} onClick={() => n.set(!n.on)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-500" />
            {t("اللغة", "Language")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLang("ar")}
              className={cn(
                "rounded-xl py-3 text-sm font-semibold border transition-colors",
                lang === "ar" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
              )}
            >
              العربية
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "rounded-xl py-3 text-sm font-semibold border transition-colors",
                lang === "en" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
              )}
            >
              English
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-500" />
            {t("الخصوصية والأمان", "Privacy & security")}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{t("مشاركة السجل الطبي مع الأطباء", "Share records with doctors")}</span>
              <Toggle on={shareRecords} onClick={() => setShareRecords(!shareRecords)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{t("التحقق بخطوتين", "Two-factor authentication")}</span>
              <Toggle on={twoFactor} onClick={() => setTwoFactor(!twoFactor)} />
            </div>
          </div>
        </div>

        <button
          onClick={save}
          className="mt-4 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3.5 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          {t("حفظ التغييرات", "Save Changes")}
        </button>

        <button
          onClick={() => toast.info(t("تسجيل الخروج تجريبي فقط", "Sign out is demo only"))}
          className="mt-3 mb-2 w-full rounded-xl bg-rose-50 text-rose-600 font-semibold py-3.5 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t("تسجيل الخروج", "Sign Out")}
        </button>

        <p className="text-center text-[11px] text-slate-400 mb-2">
          {t("نبض - نسخة تجريبية للعرض", "Nabd - demo version")}
        </p>
      </div>
    </div>
  );
}