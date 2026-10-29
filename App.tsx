import { useState, useEffect } from "react";
import { AppProvider, useApp } from "@/store/AppContext";
import { Toaster } from "sonner";
import { HomePage } from "@/pages/HomePage";
import { BookingPage } from "@/pages/BookingPage";
import { DoctorProfilePage } from "@/pages/DoctorProfilePage";
import { AppointmentsPage } from "@/pages/AppointmentsPage";
import { RecordsPage } from "@/pages/RecordsPage";
import { MessagesPage } from "@/pages/MessagesPage";
import { EmergencyPage } from "@/pages/EmergencyPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SpecialtiesPage } from "@/pages/SpecialtiesPage";
import { BottomNav } from "@/components/BottomNav";
import { Splash } from "@/components/Splash";

export type Page =
  | "home"
  | "booking"
  | "doctor"
  | "appointments"
  | "records"
  | "messages"
  | "emergency"
  | "profile"
  | "specialties";

function Shell() {
  const { lang } = useApp();
  const [page, setPage] = useState<Page>("home");
  const [doctorId, setDoctorId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const navigate = (p: Page, id?: string) => {
    if (id) setDoctorId(id);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-slate-50 min-h-screen relative pb-24 shadow-xl">
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "booking" && <BookingPage navigate={navigate} />}
        {page === "doctor" && <DoctorProfilePage navigate={navigate} doctorId={doctorId} />}
        {page === "appointments" && <AppointmentsPage navigate={navigate} />}
        {page === "records" && <RecordsPage navigate={navigate} />}
        {page === "messages" && <MessagesPage />}
        {page === "emergency" && <EmergencyPage navigate={navigate} />}
        {page === "profile" && <ProfilePage navigate={navigate} />}
        {page === "specialties" && <SpecialtiesPage navigate={navigate} />}

        <BottomNav page={page} navigate={navigate} />
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      {!ready && <Splash />}
      <Shell />
    </AppProvider>
  );
}