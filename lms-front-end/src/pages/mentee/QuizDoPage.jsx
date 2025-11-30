// src/pages/mentee/QuizDoPage.jsx
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function QuizDoPage() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();

  const [currentQuestion] = useState(4); // demo “Câu 4”
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    navigate(`/mentee/courses/${courseId}/quizzes/${quizId}/done`);
  };

  const questions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto">
      {/* breadcrumb */}
      <div className="text-xs text-gray-500 mb-2">
        <Link to="/mentee" className="hover:underline">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to="/mentee/courses" className="hover:underline">
          Các khóa học của tôi
        </Link>{" "}
        /{" "}
        <Link to={`/mentee/courses/${courseId}`} className="hover:underline">
          [Tên lớp học]
        </Link>{" "}
        / <span>Quiz {quizId}</span>
      </div>

      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
        Quiz {quizId}
      </h1>

      <div className="flex gap-6 text-sm border-b mb-4">
        <button className="pb-2 border-b-2 border-[#0b6fe0] text-[#0b6fe0] font-semibold">
          Khóa học
        </button>
        <button className="pb-2 text-gray-500 hover:text-gray-700">
          Điểm số
        </button>
      </div>

      {/* layout 2 cột */}
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Câu hỏi */}
        <div className="flex-1 border rounded-lg bg-white p-6 min-h-[320px]">
          <p className="mb-1 text-sm text-gray-500">
            Câu {currentQuestion}
          </p>
          <h2 className="font-semibold mb-4">(Đề bài)</h2>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`w-full text-left px-4 py-2 rounded-md border text-sm ${
                  selected === opt
                    ? "bg-[#0b6fe0] text-white border-[#0b6fe0]"
                    : "bg-white hover:bg-gray-50 border-gray-300"
                }`}
              >
                Lựa chọn {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Bảng câu hỏi */}
        <div className="w-full md:w-56 border rounded-lg bg-white p-4 text-sm">
          <p className="font-semibold mb-3">Bảng câu hỏi</p>
          <div className="grid grid-cols-2 gap-2">
            {questions.map((q) => (
              <button
                key={q}
                className={`px-3 py-1 rounded-md border text-xs ${
                  q === currentQuestion
                    ? "bg-[#0b6fe0] text-white border-[#0b6fe0]"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                Câu {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* footer thời gian + nộp bài */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>10:00</span>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
        >
          Nộp bài
        </button>
      </div>
    </div>
  );
}
