// src/pages/login/LoginLMS.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginLMS() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const { token, role, name, username: u } = res.data;

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("username", u);

      // Điều hướng theo role
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TUTOR") {
        navigate("/tutor");
      } else {
        navigate("/mentee");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error;
      setErr(typeof errorMsg === "string" ? errorMsg : "Đăng nhập thất bại.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-sans">
      
      {/* --- LOGIN FRAME --- 
          Thay đổi: Dùng minHeight thay vì height cố định để khung tự giãn khi nội dung dài ra
      */}
      <div 
        className="relative bg-[#FAFAFA] shadow-2xl"
        style={{ 
          width: "685px", 
          minHeight: "492px", // Đảm bảo chiều cao tối thiểu như Figma
          height: "auto",     // Cho phép giãn chiều cao nếu form dài hơn
          paddingBottom: "30px", // Thêm khoảng đệm dưới cùng
          fontFamily: 'Inter, sans-serif' 
        }}
      >
        
        {/* --- HEADER (Rectangle 4) --- */}
        <div 
          className="absolute top-0 left-0 w-full"
          style={{ height: "60px", backgroundColor: "#1F4E79", zIndex: 20 }}
        >
          {/* Group 6/7 (Logo) */}
          <div 
            className="absolute bg-white rounded-sm flex items-center justify-center overflow-hidden"
            style={{ 
              left: "16px", 
              top: "5px", 
              width: "49px", 
              height: "50px" 
            }}
          >
             <img src="/images/logobachkhoa.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          {/* Text: ĐĂNG NHẬP */}
          <span 
            className="absolute text-white font-normal text-[14px] leading-[16px] text-center uppercase tracking-[0.005em]"
            style={{ 
              left: "76px", 
              top: "22px", 
              width: "85px", 
              height: "16px" 
            }}
          >
            ĐĂNG NHẬP
          </span>
        </div>

        {/* --- FORM LOG IN (Group 5 content) --- 
            Thay đổi: position relative + margin để đẩy chiều cao container cha
        */}
        <div 
          className="bg-white border border-[#D9D9D9] rounded-[8px] flex flex-col items-start"
          style={{ 
            position: "relative", // Quan trọng: Relative để tính toán chiều cao
            marginLeft: "183px",  // Thay cho left: 183px
            marginTop: "85px",    // Thay cho top: 85px
            width: "320px", 
            height: "auto", 
            padding: "24px",
            zIndex: 10 
          }}
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col h-full">
            
            {err && (
              <div className="text-[12px] text-red-600 mb-2">
                {err}
              </div>
            )}

            {/* --- INPUT FIELD: USERNAME --- */}
            <div className="flex flex-col gap-[8px]" style={{ width: "272px", height: "70px", marginBottom: "24px" }}>
              <label 
                className="text-[#1E1E1E] font-normal text-[16px] leading-[140%]"
                style={{ height: "22px" }}
              >
                Tên người dùng
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên người dùng của bạn"
                className="w-full bg-white border border-[#D9D9D9] rounded-[8px] text-[16px] text-[#1E1E1E] placeholder-[#B3B3B3] focus:outline-none focus:border-[#1F4E79]"
                style={{ height: "40px", padding: "12px 16px" }}
              />
            </div>

            {/* --- INPUT FIELD: PASSWORD --- */}
            <div className="flex flex-col gap-[8px]" style={{ width: "272px", height: "70px", marginBottom: "24px" }}>
              <label 
                className="text-[#1E1E1E] font-normal text-[16px] leading-[140%]"
                style={{ height: "22px" }}
              >
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                className="w-full bg-white border border-[#D9D9D9] rounded-[8px] text-[16px] text-[#1E1E1E] placeholder-[#B3B3B3] focus:outline-none focus:border-[#1F4E79]"
                style={{ height: "40px", padding: "12px 16px" }}
              />
            </div>

            {/* --- BUTTON GROUP --- */}
            <button
              type="submit"
              className="flex items-center justify-center text-[#F5F5F5] font-normal text-[16px] leading-[100%] hover:opacity-90 transition"
              style={{ 
                width: "272px", 
                height: "40px", 
                backgroundColor: "#1F4E79", 
                border: "1px solid #2C2C2C",
                borderRadius: "8px",
                marginBottom: "16px"
              }}
            >
              Đăng nhập
            </button>

            {/* Link: Quên mật khẩu? */}
            <a 
              href="#" 
              className="text-[#1E1E1E] underline font-normal text-[16px] leading-[140%]"
              style={{ width: "123px", height: "22px", marginBottom: "16px" }}
            >
              Quên mật khẩu?
            </a>

            {/* --- DEMO ACCOUNTS --- */}
            <div className="text-xs text-gray-500 border-t pt-3 w-full">
              <div className="font-semibold mb-1">Tài khoản demo:</div>
              <div>Admin: admin@example.com / Admin@123</div>
              <div>Tutor: tutor@example.com / Tutor@123</div>
              <div>Mentee: mentee@example.com / Mentee@123</div>
            </div>

          </form>
        </div>

        {/* --- RECTANGLE 19 (DECORATION) --- */}
        <div 
          className="absolute"
          style={{ 
            left: "184px", 
            top: "260px", 
            width: "100px", 
            height: "100px", 
            backgroundColor: "#D9D9D9",
            zIndex: 0 
          }}
        />

      </div>
    </div>
  );
}