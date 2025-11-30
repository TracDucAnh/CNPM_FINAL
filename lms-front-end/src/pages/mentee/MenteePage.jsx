export default function MenteePage() {
  const mentees = [
    {
      name: "Nguyễn Văn A",
      name: "Nguyễn Văn A",
      role: "Mentee",
      phone: "09013949401",
      email: "a.nguyenvan@example.edu.vn",
      createdAt: "23/10/2025",
    },
    {
      name: "Phạm Văn B",
      role: "Mentee",
      phone: "0938475178",
      email: "b.phamvan@example.edu.vn",
      createdAt: "23/10/2025",
    },
    {
      name: "Trương Tấn P",
      role: "Mentee",
      phone: "0384695871",
      email: "p.truongtan@example.edu.vn",
      createdAt: "23/10/2025",
    },
    {
      name: "Võ Hải Q",
      role: "Mentee",
      phone: "0834616171",
      email: "q.vohai@example.edu.vn",
      createdAt: "23/10/2025",
    },
    // ... thêm dữ liệu nếu cần
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-10 py-8">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-semibold text-[#0053a6] mb-6">
        Quản lý mentee
      </h1>

      {/* Card danh sách mentee */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Header card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Logo / icon đơn giản */}
            <div className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center">
              <span className="text-green-500 text-xl">👥</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Danh sách mentee
              </h2>
              <p className="text-xs text-gray-500">
                Quản lý thông tin mentee trong hệ thống
              </p>
            </div>
          </div>

          {/* Thanh công cụ: search + filter + add */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Ô tìm kiếm */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f7fb] rounded-full min-w-[220px]">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>

            {/* Nút lọc */}
            <button className="flex items-center gap-1 px-3 py-2 text-sm border rounded-full border-gray-200 hover:bg-gray-50">
              <span>⚙️</span>
              <span>Lọc</span>
            </button>

            {/* Nút thêm mentee */}
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full bg-[#0053a6] text-white hover:bg-[#01428a]">
              <span>＋</span>
              <span>Thêm</span>
            </button>

            {/* Nút thùng rác (tuỳ chọn) */}
            <button className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-50">
              🗑️
            </button>
          </div>
        </div>

        {/* Bảng mentee */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-4 font-semibold">Họ và tên</th>
                <th className="py-3 px-4 font-semibold">Vai trò</th>
                <th className="py-3 px-4 font-semibold">Số điện thoại</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Ngày tạo</th>
                <th className="py-3 px-4 font-semibold text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {mentees.map((mentee, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-[#f9fafc]"
                >
                  <td className="py-3 px-4">{mentee.name}</td>
                  <td className="py-3 px-4">{mentee.role}</td>
                  <td className="py-3 px-4">{mentee.phone}</td>
                  <td className="py-3 px-4">{mentee.email}</td>
                  <td className="py-3 px-4">{mentee.createdAt}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-[#0053a6] text-base">{">"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
