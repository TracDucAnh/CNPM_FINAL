import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function AccordionSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <span className="text-xs text-gray-500">{open ? "▴" : "▾"}</span>
      </button>
      {open && <div className="border-t px-4 py-2 bg-white">{children}</div>}
    </div>
  );
}

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const courseName = "[Tên lớp học]";

  return (
    <div className="min-h-screen bg-white">
      {/* Đã bỏ Navbar riêng, trang này sẽ nằm trong MainLayout chứa Navbar chung */}

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-5">
        {/* breadcrumb */}
        <div className="text-xs text-gray-500 mb-2">
          <Link to="/mentee" className="hover:underline">
            Trang chủ
          </Link>{" "}
          /{" "}
          <Link to="/mentee/courses" className="hover:underline">
            Các khóa học của tôi
          </Link>{" "}
          / <span>{courseName}</span>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {courseName}
        </h1>

        {/* tabs */}
        <div className="flex gap-6 text-sm border-b mb-4">
          <button className="pb-2 border-b-2 border-[#0b6fe0] text-[#0b6fe0] font-semibold">
            Khóa học
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Điểm số
          </button>
        </div>

        {/* ACCORDION */}
        <div className="border rounded-md bg-gray-50">
          {/* 1. Chung */}
          <AccordionSection title="Chung" defaultOpen>
            <div className="divide-y text-sm">
              <div className="flex items-center justify-between py-2">
                <span>Đề cương môn học</span>
                <button className="text-blue-600 text-xs hover:underline">
                  Xem chi tiết
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Thông báo ngày 29/10</span>
                <button className="text-blue-600 text-xs hover:underline">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </AccordionSection>

          {/* 2. Bài giảng */}
          <AccordionSection title="Bài giảng">
            <div className="divide-y text-sm">
              {["Chương 1", "Chương 2", "Chương 3", "Chương 4", "Chương 5"].map(
                (ch, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{ch}</span>
                    <button className="text-blue-600 text-xs hover:underline">
                      Xem chi tiết
                    </button>
                  </div>
                )
              )}
            </div>
          </AccordionSection>

          {/* 3. Lớp học */}
          <AccordionSection title="Lớp học">
            <div className="divide-y text-sm">
              {["Buổi 1", "Buổi 2", "Buổi 3", "Buổi 4", "Buổi 5"].map(
                (s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{s}</span>
                    <Link
                      to={`/mentee/courses/${courseId}/sessions/${i + 1}`}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      {i === 0 ? "Đã kết thúc" : "Tham gia"}
                    </Link>
                  </div>
                )
              )}
            </div>
          </AccordionSection>

          {/* 4. Bài tập */}
          <AccordionSection title="Bài tập">
            <div className="divide-y text-sm">
              {/* Bài tập ôn tập chương 1 */}
              <div className="flex items-center justify-between py-2">
                <span>Bài tập ôn tập chương 1</span>
                <button className="text-blue-600 text-xs hover:underline">
                  Xem chi tiết
                </button>
              </div>

              {/* Quiz ôn tập chương 1 */}
              <div className="flex items-center justify-between py-2">
                <span>Quiz ôn tập chương 1</span>
                <Link
                  to={`/mentee/courses/${courseId}/quizzes/1`}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Tham gia
                </Link>
              </div>

              {/* Bài tập ôn tập chương 2 */}
              <div className="flex items-center justify-between py-2">
                <span>Bài tập ôn tập chương 2</span>
                <button className="text-blue-600 text-xs hover:underline">
                  Xem chi tiết
                </button>
              </div>

              {/* Quiz ôn tập chương 2 */}
              <div className="flex items-center justify-between py-2">
                <span>Quiz ôn tập chương 2</span>
                <Link
                  to={`/mentee/courses/${courseId}/quizzes/2`}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Tham gia
                </Link>
              </div>

              {/* Quiz ôn tập giữa kỳ */}
              <div className="flex items-center justify-between py-2">
                <span>Quiz ôn tập giữa kỳ</span>
                <Link
                  to={`/mentee/courses/${courseId}/quizzes/3`}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Tham gia
                </Link>
              </div>
            </div>
          </AccordionSection>
        </div>
      </main>
    </div>
  );
}