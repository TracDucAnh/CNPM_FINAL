// src/pages/mentee/SessionForumPage.jsx
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function SessionForumPage() {
  const { courseId, sessionId } = useParams();
  const navigate = useNavigate();
  const sessionName = `Buổi ${sessionId || 1}`;

  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", content: "" });

  const topics = [
    { id: 1, title: "Nhập môn điện toán", author: "Nguyễn Văn A", replies: 0, following: true },
    { id: 2, title: "Giải tích 1", author: "Võ Hà H", replies: 3, following: true },
    { id: 3, title: "Giải tích 1", author: "Phan Công K", replies: 1, following: false },
  ];

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenTopic = (topicId) => {
    navigate(
      `/mentee/courses/${courseId}/sessions/${sessionId}/forum/${topicId}`
    );
  };

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
        /{" "}
        <Link
          to={`/mentee/courses/${courseId}/sessions/${sessionId}`}
          className="hover:underline"
        >
          {sessionName}
        </Link>{" "}
        / <span>Forum buổi {sessionId}</span>
      </div>

      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
        Forum buổi {sessionId}
      </h1>

      <div className="flex gap-6 text-sm border-b mb-4">
        <button className="pb-2 border-b-2 border-[#0b6fe0] text-[#0b6fe0] font-semibold">
          Khóa học
        </button>
        <button className="pb-2 text-gray-500 hover:text-gray-700">
          Điểm số
        </button>
      </div>

      {/* thanh công cụ */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-9 py-2 text-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
        </div>

        <button className="border border-gray-300 rounded-md px-3 py-2 text-sm">
          Lọc
        </button>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-[#0b6fe0] text-white rounded-md px-4 py-2 text-sm"
        >
          + Thêm
        </button>
      </div>

      {/* bảng topic */}
      <div className="bg-white border rounded-lg overflow-hidden text-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Chủ đề thảo luận</th>
              <th className="text-left px-4 py-3 font-medium">Người đăng</th>
              <th className="text-left px-4 py-3 font-medium">Số phản hồi</th>
              <th className="text-left px-4 py-3 font-medium">Theo dõi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((topic) => (
              <tr
                key={topic.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOpenTopic(topic.id)}
              >
                <td className="px-4 py-3">{topic.title}</td>
                <td className="px-4 py-3">{topic.author}</td>
                <td className="px-4 py-3">{topic.replies}</td>
                <td className="px-4 py-3">
                  <button className="relative inline-flex items-center w-10 h-5 rounded-full bg-[#0b6fe0]">
                    <span className="w-4 h-4 bg-white rounded-full translate-x-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTopics.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Chưa có chủ đề nào
          </div>
        )}
      </div>

      {/* phân trang fake */}
      <div className="flex justify-center gap-1 mt-4 text-xs">
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={`w-7 h-7 rounded border ${
              p === 1 ? "bg-[#0b6fe0] text-white" : "bg-white text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* modal tạo topic */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-sm font-semibold">Chủ đề thảo luận mới</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="text-gray-500 text-lg"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm">
              <div>
                <label className="block mb-1 font-medium">* Tiêu đề</label>
                <input
                  value={newTopic.title}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Nhập tiêu đề"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">* Nội dung</label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, content: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                  placeholder="Nhập nội dung"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Đính kèm (optional)
                </label>
                <div className="border rounded-md px-3 py-2 text-gray-500 text-xs">
                  Kéo thả file hoặc chọn từ máy...
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button className="px-4 py-2 rounded-md bg-[#0b6fe0] text-white">
                Đăng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
