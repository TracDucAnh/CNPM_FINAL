// TutorAssignments.jsx
import { useState } from "react";
import { Search, Plus, Edit, Trash2, Users, Eye } from "lucide-react";

export function TeacherAssignments({ user, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeData, setGradeData] = useState({ score: "", feedback: "" });
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    dueDate: "",
    maxScore: "100",
  });

  // Empty data arrays - to be populated later
  const myCourses = [];
  const myAssignments = [];

  const filteredAssignments = myAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAssignment = () => {
    setCreateDialogOpen(false);
    setFormData({
      courseId: "",
      title: "",
      description: "",
      dueDate: "",
      maxScore: "100",
    });
  };

  const getSubmissionStats = (assignmentId) => {
    const submissions = [];
    const graded = submissions.filter((s) => s.status === "graded").length;
    return { total: submissions.length, graded };
  };

  const handleViewSubmissions = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setGradeDialogOpen(true);
  };

  const assignmentSubmissions = selectedAssignment ? [] : [];

  const handleOpenSubmission = (submission) => {
    setSelectedSubmission(submission);
    setSubmissionDialogOpen(true);
  };

  const handleGradeSubmission = () => {
    if (selectedSubmission) {
      setGradeDialogOpen(false);
      setSubmissionDialogOpen(false);
      setGradeData({ score: "", feedback: "" });
      setSelectedSubmission(null);
      setSelectedAssignment(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quản lý bài tập</h1>
          <p className="text-gray-600">Tạo và quản lý bài tập cho lớp học</p>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo bài tập mới
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          placeholder="Tìm kiếm bài tập..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* Assignments Table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Danh sách bài tập ({filteredAssignments.length})
          </h2>
        </div>
        <div className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium">Tiêu đề</th>
                <th className="text-left py-3 font-medium">Lớp học</th>
                <th className="text-left py-3 font-medium">Hạn nộp</th>
                <th className="text-left py-3 font-medium">Điểm</th>
                <th className="text-left py-3 font-medium">Bài nộp</th>
                <th className="text-right py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => {
                const stats = getSubmissionStats(assignment.id);
                const dueDate = new Date(assignment.dueDate);
                const isOverdue = dueDate < new Date();

                return (
                  <tr
                    key={assignment.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3">{assignment.title}</td>
                    <td className="py-3">{assignment.courseName || "N/A"}</td>
                    <td className="py-3">
                      <span className={isOverdue ? "text-red-600" : ""}>
                        {dueDate.toLocaleDateString("vi-VN")}
                      </span>
                    </td>
                    <td className="py-3">{assignment.maxScore}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span>
                          {stats.graded}/{stats.total}
                        </span>
                        {stats.total > 0 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {stats.total - stats.graded} chờ chấm
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded"
                          onClick={() => handleViewSubmissions(assignment.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy bài tập nào
            </div>
          )}
        </div>
      </div>

      {/* Create Assignment Dialog */}
      {createDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Tạo bài tập mới</h2>
              <p className="text-gray-600 text-sm">
                Nhập thông tin để tạo bài tập cho lớp học
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
                  Tiêu đề bài tập
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

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  placeholder="Mô tả yêu cầu bài tập..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hạn nộp
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Điểm tối đa
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.maxScore}
                    onChange={(e) =>
                      setFormData({ ...formData, maxScore: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setCreateDialogOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleCreateAssignment}
              >
                Tạo bài tập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Dialog */}
      {gradeDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                Danh sách bài nộp và chấm điểm
              </h2>
              <p className="text-gray-600 text-sm">
                Xem và chấm điểm bài nộp của sinh viên
              </p>
            </div>
            <div className="p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium">Sinh viên</th>
                    <th className="text-left py-3 font-medium">
                      Thời gian nộp
                    </th>
                    <th className="text-left py-3 font-medium">File</th>
                    <th className="text-left py-3 font-medium">Điểm</th>
                    <th className="text-left py-3 font-medium">Trạng thái</th>
                    <th className="text-right py-3 font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3">{submission.studentName}</td>
                      <td className="py-3">
                        {new Date(submission.submittedAt).toLocaleString(
                          "vi-VN"
                        )}
                      </td>
                      <td className="py-3">{submission.fileUrl || "-"}</td>
                      <td className="py-3">
                        {submission.score !== undefined
                          ? submission.score
                          : "-"}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            submission.status === "graded"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {submission.status === "graded"
                            ? "Đã chấm"
                            : "Chưa chấm"}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                          onClick={() => handleOpenSubmission(submission)}
                        >
                          Chấm điểm
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {assignmentSubmissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Chưa có bài nộp nào
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submission Dialog */}
      {submissionDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Chấm điểm bài nộp</h2>
              <p className="text-gray-600 text-sm">
                Nhập điểm số và phản hồi cho bài nộp của sinh viên
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Điểm số
                </label>
                <input
                  type="number"
                  placeholder="Nhập điểm số..."
                  value={gradeData.score}
                  onChange={(e) =>
                    setGradeData({ ...gradeData, score: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phản hồi
                </label>
                <textarea
                  placeholder="Nhập phản hồi..."
                  value={gradeData.feedback}
                  onChange={(e) =>
                    setGradeData({ ...gradeData, feedback: e.target.value })
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setSubmissionDialogOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleGradeSubmission}
              >
                Chấm điểm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
