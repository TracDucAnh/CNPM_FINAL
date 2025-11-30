// src/pages/tutor/ChieuSinhPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChieuSinhPage = () => {

  const [courses, setCourses] = useState([]);          
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    fromDate: "2025-03-10",
    toDate: "2025-06-30",
    keyword: "",
  });

  const [requestForm, setRequestForm] = useState({
    courseName: "",
    schedule: "",
    periods: "",
    fromDate: "2025-03-10",
    toDate: "2025-06-30",
    seats: 40,
  });

  const [submitting, setSubmitting] = useState(false);

  // ================== API CALLS ==================

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/tutor/courses", {
        params: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          keyword: filter.keyword,
        },
      });
      setCourses(res.data); // backend trả về mảng các khóa học
    } catch (err) {
      console.error(err);
      alert("Không tải được danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // gọi 1 lần khi load trang

  // Gửi yêu cầu chiêu sinh mới
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post("/api/tutor/enrollment-requests", requestForm);

      alert("Gửi yêu cầu chiêu sinh thành công!");

      // reset form (tùy bạn)
      setRequestForm({
        ...requestForm,
        schedule: "",
        periods: "",
        seats: 40,
      });

      // reload danh sách khóa học nếu backend cập nhật luôn
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Gửi yêu cầu thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  // ================== RENDER ==================

  return (
    <div className="chieu-sinh-page" style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      {/* Thanh header trên cùng */}
      <header
        style={{
          background: "#0a4a7a",
          color: "#fff",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 600 }}>CHIÊU SINH KHÓA HỌC</div>
        <button
          style={{
            background: "transparent",
            border: "1px solid #fff",
            borderRadius: 20,
            padding: "6px 16px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ĐĂNG XUẤT ⏻
        </button>
      </header>

      {/* Nội dung chính */}
      <main style={{ padding: 24 }}>
        <div
          style={{
            background: "#184f7d",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px 8px 0 0",
            fontWeight: 600,
          }}
        >
          DANH SÁCH CÁC KHÓA HỌC PHỤ TRÁCH
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 8px 8px",
            padding: 20,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Bộ lọc thời gian + tên khóa */}
          <div style={{ marginBottom: 16, display: "flex", gap: 16, alignItems: "flex-end" }}>
            <div>
              <label>Thời gian chiêu sinh (từ):</label>
              <input
                type="date"
                value={filter.fromDate}
                onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                style={{ display: "block", padding: 6, minWidth: 150 }}
              />
            </div>

            <div>
              <label>Đến:</label>
              <input
                type="date"
                value={filter.toDate}
                onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                style={{ display: "block", padding: 6, minWidth: 150 }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>Tên khóa học:</label>
              <input
                type="text"
                placeholder="Tên khóa học"
                value={filter.keyword}
                onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                style={{ display: "block", padding: 6, width: "100%" }}
              />
            </div>

            <button
              onClick={fetchCourses}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: "none",
                background: "#184f7d",
                color: "#fff",
                cursor: "pointer",
                height: 36,
              }}
            >
              🔍
            </button>
          </div>

          {/* Bảng khóa học phụ trách */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: 24,
              }}
            >
              <thead>
                <tr style={{ background: "#f0f4f8" }}>
                  <th style={thStyle}>Khóa học</th>
                  <th style={thStyle}>Số chỗ</th>
                  <th style={thStyle}>Lịch học</th>
                  <th style={thStyle}>Tiết</th>
                  <th style={thStyle}>Trạng thái</th>
                  <th style={thStyle}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: 16 }}>
                      Đang tải...
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: 16 }}>
                      Không có khóa học nào.
                    </td>
                  </tr>
                ) : (
                  courses.map((c) => (
                    <tr key={c.id}>
                      <td style={tdStyle}>{c.name}</td>
                      <td style={tdStyle}>
                        {c.currentSeats}/{c.maxSeats}
                      </td>
                      <td style={tdStyle}>{c.schedule}</td>
                      <td style={tdStyle}>{c.periods}</td>
                      <td style={tdStyle}>{c.status}</td>
                      <td style={tdStyle}>{c.timeline}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Form yêu cầu chiêu sinh khóa học mới */}
          <div
            style={{
              border: "1px solid #184f7d",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                background: "#184f7d",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 4,
                marginBottom: 12,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              Yêu cầu chiêu sinh khóa học mới
            </div>

            <form onSubmit={handleSubmitRequest}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label>Tên khóa học:</label>
                  <input
                    type="text"
                    required
                    value={requestForm.courseName}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, courseName: e.target.value })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>

                <div>
                  <label>Lịch học:</label>
                  <input
                    type="text"
                    placeholder="Thứ: 3, 5"
                    value={requestForm.schedule}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, schedule: e.target.value })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>

                <div>
                  <label>Tiết:</label>
                  <input
                    type="text"
                    placeholder="10, 11, 12"
                    value={requestForm.periods}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, periods: e.target.value })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>

                <div>
                  <label>Thời gian chiêu sinh (từ):</label>
                  <input
                    type="date"
                    value={requestForm.fromDate}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, fromDate: e.target.value })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>

                <div>
                  <label>Đến:</label>
                  <input
                    type="date"
                    value={requestForm.toDate}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, toDate: e.target.value })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>

                <div>
                  <label>Số chỗ:</label>
                  <input
                    type="number"
                    min="1"
                    value={requestForm.seats}
                    onChange={(e) =>
                      setRequestForm({ ...requestForm, seats: Number(e.target.value) })
                    }
                    style={{ display: "block", padding: 6, width: "100%" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "8px 24px",
                  borderRadius: 4,
                  border: "none",
                  background: "#184f7d",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

// style đơn giản cho ô bảng
const thStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #eee",
};

export default ChieuSinhPage;
