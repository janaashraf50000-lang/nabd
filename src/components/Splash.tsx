import { Activity } from "lucide-react";

export function Splash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-500">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
        <Activity className="h-12 w-12 text-white" />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-white">نبض</h1>
      <p className="text-sm text-indigo-100 mt-1">Nabd</p>
      <p className="text-xs text-indigo-200 mt-4 px-8 text-center">
        ملفك الطبي في جيبك، والدكتور على بُعد ضغطة
      </p>
    </div>
  );
}