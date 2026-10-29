import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/store/AppContext";
import { PageHeader, EmptyState } from "@/components/Shared";
import type { Page } from "@/App";
import { cn } from "@/lib/utils";

export function MessagesPage() {
  const { t, lang, doctors, conversations, sendMessage } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.doctorId === activeId);
  const activeDoctor = doctors.find((d) => d.id === activeId);
  const Back = lang === "ar" ? ChevronRight : ChevronLeft;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [active?.messages.length, activeId]);

  const handleSend = () => {
    if (!text.trim() || !activeId) return;
    sendMessage(activeId, text.trim());
    setText("");
  };

  if (activeId && activeDoctor) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-gradient-to-b from-indigo-600 to-indigo-500 px-4 pt-6 pb-4 flex items-center gap-3 shadow-lg shadow-indigo-600/20">
          <button
            onClick={() => setActiveId(null)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 transition-colors"
          >
            <Back className="h-5 w-5" />
          </button>
          <img src={activeDoctor.image} alt={activeDoctor.name} className="h-10 w-10 rounded-xl object-cover" />
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white">{t(activeDoctor.name, activeDoctor.nameEn)}</h2>
            <p className="text-[11px] text-indigo-100">{t(activeDoctor.specialty, activeDoctor.specialtyEn)}</p>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
          {active?.messages.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
                  m.from === "me"
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white text-slate-800 border border-slate-100 rounded-bl-md"
                )}
              >
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className={cn("text-[10px] mt-1", m.from === "me" ? "text-indigo-200" : "text-slate-400")}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("اكتب رسالتك...", "Type your message...")}
              className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl transition-colors",
                text.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-200 text-slate-400"
              )}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            {t("نسخة تجريبية - لا يتم إرسال الرسائل لأطباء حقيقيين", "Demo - messages are not sent to real doctors")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t("الرسائل", "Messages")}
        subtitle={`${conversations.length} ${t("محادثة", "conversations")}`}
      />
      <div className="px-5 -mt-6">
        {conversations.length === 0 ? (
          <EmptyState
            icon={MessageCircle}
            title={t("لا توجد محادثات", "No conversations")}
            desc={t("ابدأ محادثة مع طبيبك", "Start a conversation with your doctor")}
          />
        ) : (
          <div className="space-y-2.5">
            {conversations.map((c) => {
              const doc = doctors.find((d) => d.id === c.doctorId);
              if (!doc) return null;
              const last = c.messages[c.messages.length - 1];
              return (
                <button
                  key={c.doctorId}
                  onClick={() => setActiveId(c.doctorId)}
                  className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
                >
                  <img src={doc.image} alt={doc.name} className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{t(doc.name, doc.nameEn)}</h3>
                      <span className="text-[10px] text-slate-400 shrink-0">{last?.time}</span>
                    </div>
                    <p className="text-xs text-indigo-600 font-medium">{t(doc.specialty, doc.specialtyEn)}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{last?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-bold text-slate-900 mb-3">{t("ابدأ محادثة جديدة", "Start new chat")}</h3>
          <div className="space-y-2">
            {doctors
              .filter((d) => !conversations.some((c) => c.doctorId === d.id))
              .slice(0, 4)
              .map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveId(d.id)}
                  className="w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow text-start"
                >
                  <img src={d.image} alt={d.name} className="h-11 w-11 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{t(d.name, d.nameEn)}</h4>
                    <p className="text-xs text-slate-500">{t(d.specialty, d.specialtyEn)}</p>
                  </div>
                  <MessageCircle className="h-4 w-4 text-indigo-400" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}