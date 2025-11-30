import React, { useState } from "react";

// Định nghĩa màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";

// DỮ LIỆU MOCK (Cần định nghĩa lại để component chạy độc lập)
const MOCK_TUTORS = [
  { id: 1, name: "Phạm Văn Thành", email: "thanh.pv@lms.edu", role: "Tutor", phone: "0901xxxxxx", status: "Active", classes: ["MT101-L01", "MT101-L02", "GT201-L01", "KT305-L01"] },
  { id: 2, name: "Nguyễn Thị Hoa", email: "hoa.nt@lms.edu", role: "Tutor", phone: "0938xxxxxx", status: "Active", classes: ["GT201-L02", "KT305-L02"] },
  { id: 3, name: "Lê Minh Trí", email: "tri.lm@lms.edu", role: "Tutor", phone: "0888xxxxxx", status: "Inactive", classes: ["MT101-L03"] },
  { id: 4, name: "Võ Hải Quý", email: "quy.vh@lms.edu", role: "Tutor", phone: "0909xxxxxx", status: "Active", classes: ["NN401-L01"] },
];

const MOCK_STUDENTS = [
  { id: 101, name: "Trần Văn Luận", email: "luan.tv@std.edu", role: "Mentee", major: "Khoa học MT", courses: 6 },
  { id: 102, name: "Đào Thị Thu", email: "thu.dt@std.edu", role: "Mentee", major: "Kỹ thuật PM", courses: 5 },
  { id: 103, name: "Vũ Đình Nam", email: "nam.vd@std.edu", role: "Mentee", major: "Điện tử", courses: 4 },
  { id: 104, name: "Nguyễn Kim Ngân", email: "ngan.nkn@std.edu", role: "Mentee", major: "Công nghệ TT", courses: 7 },
];

// Component Table List
const UserListTable = ({ users, type, onShowDetail }) => {
  const [search, setSearch] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Thanh tìm kiếm và thêm mới */}
        <input 
          type="text"
          placeholder={`Tìm kiếm theo tên hoặc email...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm w-full md:w-1/3 outline-none focus:border-blue-500"
        />
        
        <div className="flex gap-2">
            <button 
                className="px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90 transition"
                style={{ backgroundColor: PRIMARY_COLOR }}
            >
                Thêm {type}
            </button>
            <button 
                className="px-3 py-2 text-sm border rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
                Xuất file
            </button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="py-3 px-4 text-left font-semibold">Họ và tên</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Vai trò</th>
              {type === 'Tutor' && <th className="py-3 px-4 text-left font-semibold">Trạng thái</th>}
              {type === 'Student' && <th className="py-3 px-4 text-left font-semibold">Chuyên ngành</th>}
              <th className="py-3 px-4 text-center font-semibold">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 text-xs text-gray-500">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                {user.status && (
                    <td className="py-3 px-4">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {user.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}
                        </span>
                    </td>
                )}
                {user.major && <td className="py-3 px-4 text-xs">{user.major}</td>}
                <td className="py-3 px-4 text-center">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => onShowDetail(user)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function UserManage() {
  const [activeTab, setActiveTab] = useState("tutors"); 
  const [selectedUser, setSelectedUser] = useState(null); // State lưu trữ user được chọn

  const handleShowDetail = (user) => {
      setSelectedUser(user);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tutors":
        return <UserListTable users={MOCK_TUTORS} type="Tutor" onShowDetail={handleShowDetail} />;
      case "students":
        return <UserListTable users={MOCK_STUDENTS} type="Student" onShowDetail={handleShowDetail} />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: "tutors", label: "Tutor (Giảng viên)" },
    { id: "students", label: "Học sinh (Mentee)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedUser(null); }}
            className={`px-4 py-2 text-base font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-b-4 font-bold text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            style={{ borderColor: activeTab === tab.id ? PRIMARY_COLOR : 'transparent' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {renderTabContent()}

      {/* MODAL CHI TIẾT TUTOR / MENTEE */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                Chi tiết {selectedUser.role}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-700 border-b pb-4">
                <p><strong>Họ và tên:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                {selectedUser.phone && <p><strong>SĐT:</strong> {selectedUser.phone}</p>}
                {selectedUser.major && <p><strong>Chuyên ngành:</strong> {selectedUser.major}</p>}
                {selectedUser.courses && <p><strong>Số khóa học đã tham gia:</strong> {selectedUser.courses}</p>}
                {selectedUser.status && <p><strong>Trạng thái:</strong> {selectedUser.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}</p>}
              </div>

              {/* HIỂN THỊ LỚP HỌC CHỈ CHO TUTOR */}
              {selectedUser.role === 'Tutor' && selectedUser.classes && (
                <div className="pt-4">
                    <p className="font-semibold mb-2">Các lớp đang giảng dạy ({selectedUser.classes.length}):</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 max-h-24 overflow-y-auto pl-2">
                        {selectedUser.classes.map(cls => <li key={cls} className="py-0.5">{cls}</li>)}
                    </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end p-4 border-t">
              <button 
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
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