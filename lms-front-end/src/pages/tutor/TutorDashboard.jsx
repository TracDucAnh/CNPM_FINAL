// TutorDashboard.jsx
import { BookOpen, FileText, Users, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function TeacherDashboard({ user, onNavigate }) {
  // Empty data arrays - to be populated later
  const myCourses = [];
  const myAssignments = [];
  const totalStudents = 0;
  const pendingGrading = 0;

  // Empty chart data
  const submissionData = [];
  const gradeData = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tổng quan giảng dạy</h1>
        <p className="text-gray-600 mt-1">Xin chào, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Lớp học",
            value: myCourses.length,
            icon: BookOpen,
            desc: "Đang giảng dạy",
          },
          {
            title: "Sinh viên",
            value: totalStudents,
            icon: Users,
            desc: "Tổng số sinh viên",
          },
          {
            title: "Bài tập",
            value: myAssignments.length,
            icon: FileText,
            desc: "Đã tạo",
          },
          {
            title: "Chờ chấm",
            value: pendingGrading,
            icon: CheckCircle,
            desc: "Bài nộp",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{stat.title}</div>
              <stat.icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-blue-600 text-2xl font-bold mt-2">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Tình trạng nộp bài</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Đã nộp" fill="#2F80ED" />
              <Bar dataKey="Chưa nộp" fill="#E0E0E0" />
            </BarChart>
          </ResponsiveContainer>
          {submissionData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có dữ liệu
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Phân bố điểm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {gradeData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có dữ liệu
            </div>
          )}
        </div>
      </div>

      {/* Recent Courses */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Lớp học của tôi</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() =>
                  onNavigate("course-detail", { courseId: course.id })
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div>{course.name}</div>
                    <div className="text-sm text-gray-600">
                      {course.code} • {course.studentCount} sinh viên
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{course.semester}</div>
              </div>
            ))}
          </div>
          {myCourses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có lớp học nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
