// TutorDocuments.jsx
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Upload,
  FileText,
  Video,
  Presentation,
} from "lucide-react";

export function TeacherDocuments({ user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    type: "pdf",
    category: "",
  });

  // Empty data arrays - to be populated later
  const myCourses = [];
  const myDocuments = [];

  const filteredDocuments = myDocuments.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
    setUploadDialogOpen(false);
    setFormData({
      courseId: "",
      title: "",
      type: "pdf",
      category: "",
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "video":
        return <Video className="w-5 h-5 text-blue-500" />;
      case "slide":
        return <Presentation className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      pdf: "PDF",
      video: "Video",
      slide: "Slide",
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý tài liệu</h1>
          <p className="text-gray-600">Upload và quản lý tài liệu học tập</p>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setUploadDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload tài liệu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Tổng tài liệu", value: myDocuments.length },
          {
            title: "PDF",
            value: myDocuments.filter((d) => d.type === "pdf").length,
          },
          {
            title: "Video",
            value: myDocuments.filter((d) => d.type === "video").length,
          },
          {
            title: "Slide",
            value: myDocuments.filter((d) => d.type === "slide").length,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="text-sm font-medium text-gray-600">
              {stat.title}
            </div>
            <div className="text-blue-600 text-2xl font-bold mt-1">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          placeholder="Tìm kiếm tài liệu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* Documents Table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Danh sách tài liệu ({filteredDocuments.length})
          </h2>
        </div>
        <div className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium">Tiêu đề</th>
                <th className="text-left py-3 font-medium">Lớp học</th>
                <th className="text-left py-3 font-medium">Loại</th>
                <th className="text-left py-3 font-medium">Phân loại</th>
                <th className="text-left py-3 font-medium">Ngày upload</th>
                <th className="text-right py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => {
                const course = myCourses.find((c) => c.id === doc.courseId);

                return (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {getIcon(doc.type)}
                        <span>{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3">{course?.name}</td>
                    <td className="py-3">{getTypeLabel(doc.type)}</td>
                    <td className="py-3">{doc.category}</td>
                    <td className="py-3">
                      {new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy tài liệu nào
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      {uploadDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Upload tài liệu mới</h2>
              <p className="text-gray-600 text-sm">
                Thêm tài liệu học tập cho lớp học
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Lớp học
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) =>
                    setFormData({ ...formData, courseId: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Chọn lớp học</option>
                  {myCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tiêu đề tài liệu
                </label>
                <input
                  placeholder="Nhập tiêu đề..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Loại tài liệu
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="slide">Slide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phân loại
                  </label>
                  <input
                    placeholder="VD: Chương 1"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Kéo và thả file hoặc</p>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Chọn file
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Hỗ trợ: PDF, MP4, PPTX (Tối đa 100MB)
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setUploadDialogOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
