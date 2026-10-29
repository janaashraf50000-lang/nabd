import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { DOCTORS, type Doctor, type Review } from "@/data/doctors";

export type Lang = "ar" | "en";
export type { Doctor, Review };

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  type: "initial" | "followup";
  status: "confirmed" | "pending" | "completed" | "cancelled";
  duration: number;
}

export interface Message {
  id: string;
  from: "me" | "doctor";
  text: string;
  time: string;
}

export interface Conversation {
  doctorId: string;
  messages: Message[];
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: "lab" | "radiology" | "prescription" | "history";
  date: string;
  doctor: string;
  summary: string;
  details: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;
  doctors: Doctor[];
  appointments: Appointment[];
  addAppointment: (a: Omit<Appointment, "id">) => void;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  conversations: Conversation[];
  sendMessage: (doctorId: string, text: string) => void;
  records: MedicalRecord[];
  addRecord: (r: Omit<MedicalRecord, "id">) => void;
  deleteRecord: (id: string) => void;
  contacts: EmergencyContact[];
  addContact: (c: Omit<EmergencyContact, "id">) => void;
  deleteContact: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  doctorFavorites: string[];
  toggleDoctorFavorite: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "a1", doctorId: "doc-neurosurgery-1", date: "2025-06-18", time: "10:30", type: "initial", status: "confirmed", duration: 30 },
  { id: "a2", doctorId: "doc-cardiology-1", date: "2025-06-25", time: "08:30", type: "followup", status: "pending", duration: 20 },
  { id: "a3", doctorId: "doc-general-surgery-1", date: "2025-05-02", time: "09:30", type: "initial", status: "completed", duration: 30 },
  { id: "a4", doctorId: "doc-vascular-surgery-1", date: "2025-04-11", time: "13:00", type: "followup", status: "cancelled", duration: 20 },
];

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    doctorId: "doc-neurosurgery-1",
    messages: [
      { id: "m1", from: "doctor", text: "صباح الخير أحمد، كيف حالك اليوم؟", time: "09:12" },
      { id: "m2", from: "me", text: "صباح النور دكتور، بخير الحمد لله.", time: "09:15" },
      { id: "m3", from: "doctor", text: "ممتاز، نتائج الأشعة وصلت وسنراجعها في الموعد.", time: "09:16" },
    ],
  },
  {
    doctorId: "doc-cardiology-1",
    messages: [
      { id: "m4", from: "me", text: "دكتور، هل يجب أن أتوقف عن الدواء قبل التحليل؟", time: "أمس" },
      { id: "m5", from: "doctor", text: "لا، استمر على الجرعة المعتادة حتى الموعد.", time: "أمس" },
    ],
  },
];

const INITIAL_RECORDS: MedicalRecord[] = [
  { id: "r1", title: "تحليل صورة الدم الكاملة (CBC)", category: "lab", date: "2025-05-20", doctor: "د. عمر الدوسري", summary: "النتائج ضمن المعدل الطبيعي", details: "الهيموغلوبين 14.2 g/dL، كريات الدم البيضاء 7.1 K/uL، الصفائح الدموية 250 K/uL." },
  { id: "r2", title: "أشعة رنين مغناطيسي للدماغ", category: "radiology", date: "2025-05-14", doctor: "د. سارة المنصوري", summary: "لا توجد علامات غير طبيعية", details: "صورة الرنين المغناطيسي للدماغ بدون صبغة تُظهر أنسجة دماغية طبيعية دون أي كتل أو نزيف." },
  { id: "r3", title: "وصفة طبية - مضاد حيوي", category: "prescription", date: "2025-05-02", doctor: "د. خالد العتيبي", summary: "أموكسيسيلين 500 ملغ", details: "قرص واحد كل 8 ساعات لمدة 7 أيام بعد الأكل." },
  { id: "r4", title: "تاريخ مرضي - حساسية", category: "history", date: "2024-11-08", doctor: "د. عمر الدوسري", summary: "حساسية من البنسلين", details: "تم تسجيل حساسية معروفة من عائلة البنسلين. يجب تجنبها في جميع الوصفات." },
];

const INITIAL_CONTACTS: EmergencyContact[] = [
  { id: "c1", name: "فاطمة عبدالرحمن", relation: "الزوجة", phone: "+20 100 111 2233" },
  { id: "c2", name: "محمد عبدالرحمن", relation: "الأخ", phone: "+20 122 444 5566" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [records, setRecords] = useState<MedicalRecord[]>(INITIAL_RECORDS);
  const [contacts, setContacts] = useState<EmergencyContact[]>(INITIAL_CONTACTS);
  const [favorites, setFavorites] = useState<string[]>(["cardiology", "pediatrics"]);
  const [doctorFavorites, setDoctorFavorites] = useState<string[]>(["doc-cardiology-1"]);

  const t = useCallback((ar: string, en: string) => (lang === "ar" ? ar : en), [lang]);

  const addAppointment = useCallback((a: Omit<Appointment, "id">) => {
    setAppointments((prev) => [{ ...a, id: `a${Date.now()}` }, ...prev]);
  }, []);

  const updateAppointment = useCallback((id: string, patch: Partial<Appointment>) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }, []);

  const sendMessage = useCallback((doctorId: string, text: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setConversations((prev) => {
      const exists = prev.find((c) => c.doctorId === doctorId);
      const msg: Message = { id: `m${Date.now()}`, from: "me", text, time };
      if (exists) {
        return prev.map((c) => (c.doctorId === doctorId ? { ...c, messages: [...c.messages, msg] } : c));
      }
      return [...prev, { doctorId, messages: [msg] }];
    });
  }, []);

  const addRecord = useCallback((r: Omit<MedicalRecord, "id">) => {
    setRecords((prev) => [{ ...r, id: `r${Date.now()}` }, ...prev]);
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addContact = useCallback((c: Omit<EmergencyContact, "id">) => {
    setContacts((prev) => [...prev, { ...c, id: `c${Date.now()}` }]);
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const toggleDoctorFavorite = useCallback((id: string) => {
    setDoctorFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      lang, setLang, t, doctors: DOCTORS, appointments, addAppointment, updateAppointment,
      conversations, sendMessage, records, addRecord, deleteRecord, contacts, addContact,
      deleteContact, favorites, toggleFavorite, doctorFavorites, toggleDoctorFavorite,
    }),
    [lang, t, appointments, addAppointment, updateAppointment, conversations, sendMessage,
      records, addRecord, deleteRecord, contacts, addContact, deleteContact, favorites,
      toggleFavorite, doctorFavorites, toggleDoctorFavorite]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}