// TutorStudents.jsx
import { useState } from "react";
import { Search, UserCheck, UserX, Eye } from "lucide-react";

export function TeacherStudents({ user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Empty data arrays - to be populated later
  const myCourses = [];
  const allStudents = [];

  // Filter by selected course
  const filteredStudents =
    selectedCourse === "all"
      ? allStudents
      : allStudents.filter((student) => true); // Placeholder filter

  // Filter by search query
  const searchedStudents = filteredStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setDetailDialogOpen(true);
  };

  const getStudentCourses = (studentId) => {
    return myCourses.filter((course) => true); // Placeholder filter
  };

  const getStudentAvgScore = () => {
    // Mock average score
    return (Math.random() * 30 + 70).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý sinh viên</h1>
        <p className="text-gray-600">
          Xem và quản lý sinh viên trong các lớp học
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="text-sm font-medium text-gray-600">
            Tổng sinh viên
          </div>
          <div className="text-blue-600 text-2xl font-bold mt-1">
            {allStudents.length}
          </div>
        </div>
        {myCourses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="text-sm font-medium text-gray-600 line-clamp-1">
              {course.code}
            </div>
            <div className="text-blue-600 text-2xl font-bold mt-1">{0} SV</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Tìm kiếm sinh viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="all">Tất cả lớp học</option>
          {myCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Danh sách sinh viên ({searchedStudents.length})
          </h2>
        </div>
        <div className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium">Mã SV</th>
                <th className="text-left py-3 font-medium">Họ và tên</th>
                <th className="text-left py-3 font-medium">Email</th>
                <th className="text-left py-3 font-medium">Lớp học</th>
                <th className="text-left py-3 font-medium">Điểm TB</th>
                <th className="text-left py-3 font-medium">Trạng thái</th>
                <th className="text-right py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {searchedStudents.map((student) => {
                const studentCourses = getStudentCourses(student.id);

                return (
                  <tr
                    key={student.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3">{student.studentId}</td>
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.email}</td>
                    <td className="py-3">
                      {selectedCourse === "all" ? (
                        <span>{studentCourses.length} lớp</span>
                      ) : (
                        myCourses.find((c) => c.id === selectedCourse)?.code
                      )}
                    </td>
                    <td className="py-3 text-blue-600">
                      {getStudentAvgScore()}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        Hoạt động
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded"
                          onClick={() => handleViewDetail(student)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded text-red-600">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {searchedStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Không tìm thấy sinh viên nào
            </div>
          )}
        </div>
      </div>

      {/* Student Detail Dialog */}
      {detailDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Thông tin sinh viên</h2>
              <p className="text-gray-600 text-sm">
                Chi tiết về sinh viên và kết quả học tập
              </p>
            </div>
            {selectedStudent && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Họ và tên</label>
                    <p>{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Mã sinh viên
                    </label>
                    <p>{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p>{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Số điện thoại
                    </label>
                    <p>{selectedStudent.phone || "Chưa cập nhật"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Lớp học đang tham gia</h3>
                  <div className="space-y-2">
                    {getStudentCourses(selectedStudent.id).map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div>{course.name}</div>
                          <div className="text-sm text-gray-600">
                            {course.code}
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          Điểm TB: {getStudentAvgScore()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Bài nộp gần đây</h3>
                  <div className="space-y-2">
                    {[].map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="text-sm">Bài nộp</div>
                          <div className="text-xs text-gray-600">
                            {new Date(
                              submission.submittedAt
                            ).toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                        {submission.score !== undefined && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                            Điểm: {submission.score}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setDetailDialogOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
