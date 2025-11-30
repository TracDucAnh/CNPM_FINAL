// TutorReports.jsx
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
  LineChart,
  Line,
} from "recharts";
import { BookOpen, Users, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";

export function TeacherReports({ user }) {
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Empty data arrays - to be populated later
  const myCourses = [];
  const myAssignments = [];
  const totalStudents = 0;

  // Empty chart data
  const submissionData = [];
  const gradeData = [];
  const attendanceData = [];
  const coursePerformance = [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Thống kê lớp học</h1>
          <p className="text-gray-600">
            Theo dõi hiệu quả giảng dạy và kết quả học tập
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-48 border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">Tất cả lớp học</option>
            {myCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Xuất báo cáo PDF
          </button>
        </div>
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
            desc: "Tổng số",
          },
          {
            title: "Bài tập",
            value: myAssignments.length,
            icon: FileText,
            desc: "Đã giao",
          },
          {
            title: "Điểm TB",
            value: "0/10",
            icon: TrendingUp,
            desc: "Toàn khóa",
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
        {/* Submission Status */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Tình trạng nộp bài</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Đã nộp" fill="#2F80ED" />
              <Bar dataKey="Chưa nộp" fill="#F59E0B" />
              <Bar dataKey="Quá hạn" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
          {submissionData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có dữ liệu
            </div>
          )}
        </div>

        {/* Grade Distribution */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Phân bố điểm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.value}%`}
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
          {gradeData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Chưa có dữ liệu
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {gradeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attendance Rate */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Tỷ lệ tham gia theo tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#2F80ED"
                name="Tỷ lệ (%)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          {attendanceData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có dữ liệu
            </div>
          )}
        </div>

        {/* Course Performance */}
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Hiệu quả theo lớp học</h3>
          <div className="space-y-3">
            {coursePerformance.map((course, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="line-clamp-1">{course.name}</span>
                  <span className="text-blue-600">
                    Điểm TB: {course["Điểm TB"]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course["Tỷ lệ đạt"]}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  Tỷ lệ đạt: {course["Tỷ lệ đạt"]}%
                </div>
              </div>
            ))}
          </div>
          {coursePerformance.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Chưa có dữ liệu
            </div>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Tổng kết chi tiết</h3>
        </div>
        <div className="p-4">
          <div className="text-center py-8 text-gray-500">
            Chưa có dữ liệu thống kê
          </div>
        </div>
      </div>
    </div>
  );
}
