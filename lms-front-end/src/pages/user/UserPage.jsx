 import React from "react";
import { MessageSquare } from "lucide-react"; // Icon tin nhắn

// Màu chủ đạo
const PRIMARY_COLOR = "#1F4E79";
const LINK_COLOR = "#1155cc"; // Màu xanh link đặc trưng của LMS cũ

export default function UserPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Nút Đặt lại trang mặc định (Góc trên phải) */}
        <div className="flex justify-end mb-6">
          <button className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded shadow-sm transition">
            Đặt lại trang mặc định
          </button>
        </div>

        {/* 2. Header Profile (Avatar + Tên) */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Avatar khung ảnh thẻ */}
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random&size=128" // Đổi thành tên mẫu
              alt="Avatar"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md border border-gray-200 shadow-sm"
            />
          </div>

          {/* Thông tin tên & Nút tin nhắn */}
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <h1
                style={{ color: PRIMARY_COLOR }}
                className="text-2xl md:text-3xl font-bold uppercase"
              >
                NGUYỄN VĂN A
              </h1>
              
              {/* Nút tin nhắn */}
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded bg-gray-50 text-gray-700 text-sm hover:bg-gray-100 transition shadow-sm">
                <MessageSquare size={16} />
                <span>Tin nhắn</span>
              </button>
            </div>
            
            <p className="mt-2 text-gray-600 text-base">Sinh viên</p>
          </div>
        </div>

        {/* 3. Grid nội dung chính (2 cột) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* --- CỘT TRÁI --- */}
          <div className="space-y-6">
            
            {/* Card: Chi tiết người dùng */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Chi tiết người dùng
              </h2>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold mb-1">Địa chỉ thư điện tử</p>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    nguyen.vana@hcmut.edu.vn
                  </a>
                  <span className="text-gray-500 ml-1">
                    (Các thành viên khóa học có thể nhìn thấy)
                  </span>
                </div>

                <div>
                  <p className="font-semibold mb-1">Quốc gia</p>
                  <p>Việt Nam</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">Tỉnh/Thành phố</p>
                  <p>Hồ Chí Minh</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">Múi giờ</p>
                  <p>Asia/Ho_Chi_Minh</p>
                </div>
              </div>
            </div>

            {/* Card: Quyền riêng tư */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Quyền riêng tư và các chính sách
              </h2>
              <ul className="list-none space-y-2 text-sm">
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Data retention summary
                  </a>
                </li>
              </ul>
            </div>

            {/* Card: Chi tiết khóa học */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Chi tiết khóa học
              </h2>
              <ul className="list-none space-y-2 text-sm">
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Mô tả sơ lược khoá học
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* --- CỘT PHẢI --- */}
          <div className="space-y-6">
            
            {/* Card: Nội dung khác */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Nội dung khác
              </h2>
              <ul className="list-none space-y-2 text-sm">
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Các mục blog
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Bài viết diễn đàn
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Các cuộc thảo luận trong diễn đàn
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Learning plans
                  </a>
                </li>
              </ul>
            </div>

            {/* Card: Báo cáo */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Báo cáo
              </h2>
              <ul className="list-none space-y-2 text-sm">
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Browser sessions
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: LINK_COLOR }} className="hover:underline">
                    Grades overview
                  </a>
                </li>
              </ul>
            </div>

            {/* Card: Hoạt động đăng nhập */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm">
              <h2 style={{ color: PRIMARY_COLOR }} className="text-xl font-normal mb-4">
                Hoạt động đăng nhập
              </h2>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold mb-1">Lần đầu tiếp cận trang web</p>
                  <p>Thứ Hai, 1 tháng 1 2024, 8:00 AM (1 năm trước)</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">Lần truy cập gần nhất vào trang</p>
                  <p>Hôm nay, 10:30 AM (Vừa xong)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}