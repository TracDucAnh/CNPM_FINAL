import React, { useState } from "react";

export default function SchedulePage() {
  const [autoReminder, setAutoReminder] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-xl md:text-2xl font-semibold text-[#004196] mb-4">
        Lịch học
      </h1>

      {/* Thanh điều khiển trên lịch */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="text-sm font-semibold">Tháng 10 2025</div>

        <div className="flex items-center gap-2 text-xs">
          <span>Ngày</span>
          <span className="px-3 py-1 rounded-full border text-gray-500">
            Tuần
          </span>
          <span className="px-3 py-1 rounded-full bg-[#0b6fe0] text-white">
            Tháng
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs ml-auto">
          <span>Nhắc lịch tự động</span>
          <button
            onClick={() => setAutoReminder(!autoReminder)}
            className={`w-10 h-5 rounded-full flex items-center px-1 ${
              autoReminder ? "bg-[#0b6fe0]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
                autoReminder ? "translate-x-4" : ""
              }`}
            />
          </button>
          <button className="px-2 text-lg">〈</button>
          <button className="px-2 text-lg">〉</button>
        </div>
      </div>

      {/* Lịch dạng tháng (static demo) */}
      <div className="border rounded-lg overflow-hidden">
        {/* header thứ trong tuần */}
        <div className="grid grid-cols-7 bg-gray-50 border-b text-xs text-center">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <div key={d} className="py-2 font-medium text-gray-600">
              {d}
            </div>
          ))}
        </div>

        {/* 5 tuần – data tĩnh cho hình demo */}
        <div className="grid grid-cols-7 text-xs">
          {Array.from({ length: 35 }).map((_, idx) => {
            const day = idx - 1; // để ngày 1 rơi vào Wednesday như ví dụ
            let display = "";
            if (day >= 1 && day <= 31) display = String(day);

            // event demo
            let extraClass = "";
            let label = "";
            if (day === 11) {
              extraClass = "bg-blue-100 border-blue-300";
              label = "Vật lý 1";
            }
            if (day === 15) {
              extraClass = "bg-red-100 border-red-300";
              label = "Quiz 1";
            }

            return (
              <div
                key={idx}
                className={`h-24 border border-gray-100 p-1 align-top ${extraClass}`}
              >
                <div className="text-[10px] text-gray-500">{display}</div>
                {label && (
                  <div className="mt-1 text-[10px] text-gray-700">{label}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
