// src/pages/mentee/CourseSessionPage.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function CourseSessionPage() {
  const { courseId, sessionId } = useParams();
  const sessionName = `Buổi ${sessionId || 1}`;
  const courseName = "[Tên lớp học]";

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
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
          {courseName}
        </Link>{" "}
        / <span>{sessionName}</span>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        {sessionName}
      </h1>

      {/* Khối buổi học – chỉ giữ nút + bảng trạng thái */}
      <section className="bg-[#f5f7fb] border rounded-xl p-5 mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <button className="px-6 py-2 rounded-md bg-gray-300 text-gray-600 text-sm cursor-not-allowed">
            Tham gia
          </button>
          <button className="px-6 py-2 rounded-md bg-[#0b6fe0] text-white text-sm hover:bg-[#0552b5]">
            Xem lại
          </button>
          <Link
            to={`/mentee/courses/${courseId}/sessions/${sessionId}/forum`}
            className="px-6 py-2 rounded-md bg-[#0b6fe0] text-white text-sm hover:bg-[#0552b5]">
            Forum
          </Link>
        </div>

        <table className="w-full text-sm border rounded-md overflow-hidden bg-white">
          <tbody>
            <tr>
              <td className="px-4 py-3 bg-gray-50 w-1/3">
                Trạng thái lớp học
              </td>
              <td className="px-4 py-3 text-red-500">
                Đã kết thúc 2 ngày trước
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 bg-gray-50">Trạng thái tham gia</td>
              <td className="px-4 py-3 text-green-600">Đã tham gia</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
