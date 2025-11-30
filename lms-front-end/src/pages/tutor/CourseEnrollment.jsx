// src/pages/tutor/CourseEnrollment.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PRIMARY_COLOR = "#1F4E79";

const thStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "8px 10px",
  borderBottom: "1px solid #eee",
};

export default function CourseEnrollment() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    fromDate: "2025-03-10",
    toDate: "2025-06-30",
    keyword: "",
  });

  const [requestForm, setRequestForm] = useState({
    courseName: "",
    schedule: "Thứ: 3, 5",
    periods: "10, 11, 12",
    fromDate: "2025-03-10",
    toDate: "2025-06-30",
    seats: 40,
  });

  const [submitting, setSubmitting] = useState(false);

  // modal: type = 'error' | 'confirm' | 'success'
  const [modal, setModal] = useState({
    open: false,
    type: null,
    message: "",
  });

  // ================== API ==================

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/tutor/courses", {
        params: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          keyword: filter.keyword,
        },
      });
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      setModal({
        open: true,
        type: "error",
        message: "Không tải được danh sách khóa học.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================== HANDLERS ==================

  // bước 1: khi bấm "Gửi yêu cầu" -> check tên khóa học + mở popup confirm
  const handleSubmitRequest = (e) => {
    e.preventDefault();

    const trimmedName = requestForm.courseName.trim().toLowerCase();

    // Không nhập tên
    if (!trimmedName) {
      setModal({
        open: true,
        type: "error",
        message: "Vui lòng nhập tên khóa học.",
      });
      return;
    }

    // Kiểm tra tên khóa học có tồn tại trong danh sách phụ trách không
    const exists = courses.some(
      (c) => c.name && c.name.trim().toLowerCase() === trimmedName
    );

    if (!exists) {
      // ❌ modal: không tồn tại tên khóa học
      setModal({
        open: true,
        type: "error",
        message: "Không tồn tại tên khóa học.",
      });
      return;
    }

    // ⚠️ modal confirm
    setModal({
      open: true,
      type: "confirm",
      message: "Bạn chắc chắn muốn gửi yêu cầu chiêu sinh khóa học này?",
    });
  };

  // bước 2: user bấm ĐỒNG Ý trên modal confirm
  const doSubmitRequest = async () => {
    try {
      setSubmitting(true);
      setModal({ open: false, type: null, message: "" });

      await axios.post(
        "http://localhost:8080/api/tutor/enrollment-requests",
        requestForm
      );

      // ✅ modal success
      setModal({
        open: true,
        type: "success",
        message: "Gửi yêu cầu chiêu sinh thành công.",
      });

      // reset nhẹ
      setRequestForm((prev) => ({
        ...prev,
        schedule: "Thứ: 3, 5",
        periods: "10, 11, 12",
        seats: 40,
      }));

      fetchCourses();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Gửi yêu cầu thất bại!";
      setModal({
        open: true,
        type: "error",
        message: msg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () =>
    setModal({
      open: false,
      type: null,
      message: "",
    });

  // ================== RENDER ==================

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      {/* Header trên cùng giống Figma */}
      <header
        style={{
          background: PRIMARY_COLOR,
          color: "#fff",
          padding: "12px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/images/logobachkhoa.png"
            alt="Logo BK"
            style={{ height: 40 }}
          />
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>CHIÊU SINH KHÓA HỌC</h1>
        </div>
        <button
          style={{
            background: "transparent",
            border: "1px solid #fff",
            borderRadius: 20,
            padding: "6px 16px",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          ĐĂNG XUẤT ⏻
        </button>
      </header>

      <main style={{ padding: 24 }}>
        {/* Title bar */}
        <div
          style={{
            background: "#184f7d",
            color: "#fff",
            padding: "10px 20px",
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
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Bộ lọc */}
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              gap: 16,
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <label className="text-sm font-medium">
                Thời gian chiêu sinh (Từ):
              </label>
              <input
                type="date"
                value={filter.fromDate}
                onChange={(e) =>
                  setFilter({ ...filter, fromDate: e.target.value })
                }
                style={{
                  display: "block",
                  padding: 6,
                  minWidth: 150,
                  borderRadius: 4,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Đến:</label>
              <input
                type="date"
                value={filter.toDate}
                onChange={(e) =>
                  setFilter({ ...filter, toDate: e.target.value })
                }
                style={{
                  display: "block",
                  padding: 6,
                  minWidth: 150,
                  borderRadius: 4,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="text-sm font-medium">Tên khóa học:</label>
              <input
                type="text"
                placeholder="Tên khóa học"
                value={filter.keyword}
                onChange={(e) =>
                  setFilter({ ...filter, keyword: e.target.value })
                }
                style={{
                  display: "block",
                  padding: 6,
                  width: "100%",
                  borderRadius: 4,
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <button
              onClick={fetchCourses}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: "none",
                background: PRIMARY_COLOR,
                color: "#fff",
                cursor: "pointer",
                height: 36,
                minWidth: 80,
              }}
            >
              🔍
            </button>
          </div>

          {/* Bảng khóa học */}
          <div style={{ overflowX: "auto", maxHeight: 260 }}>
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
                      <td style={tdStyle}>
                        {c.fromDate} – {c.toDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Form yêu cầu chiêu sinh mới */}
          <div
            style={{
              border: `1px solid ${PRIMARY_COLOR}`,
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                background: PRIMARY_COLOR,
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
                  <label className="text-sm font-medium">Tên khóa học:</label>
                  <input
                    type="text"
                    required
                    value={requestForm.courseName}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        courseName: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Lịch học:</label>
                  <input
                    type="text"
                    value={requestForm.schedule}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        schedule: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tiết:</label>
                  <input
                    type="text"
                    value={requestForm.periods}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        periods: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Thời gian chiêu sinh (từ):
                  </label>
                  <input
                    type="date"
                    value={requestForm.fromDate}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        fromDate: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Đến:</label>
                  <input
                    type="date"
                    value={requestForm.toDate}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        toDate: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Số chỗ:</label>
                  <input
                    type="number"
                    min="1"
                    value={requestForm.seats}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        seats: Number(e.target.value),
                      })
                    }
                    style={{
                      display: "block",
                      padding: 6,
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
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
                  background: PRIMARY_COLOR,
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

      {/* ===== MODAL (3 trạng thái) ===== */}
      {modal.open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: 360,
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontWeight: 600,
                marginBottom: 12,
                fontSize: 18,
              }}
            >
              Thông báo
            </h3>

            {/* icon */}
            <div style={{ fontSize: 40, marginBottom: 8 }}>
              {modal.type === "error" && (
                <span style={{ color: "#e53935" }}>✖</span>
              )}
              {modal.type === "confirm" && (
                <span style={{ color: "#f9a825" }}>⚠</span>
              )}
              {modal.type === "success" && (
                <span style={{ color: "#43a047" }}>✔</span>
              )}
            </div>

            <p style={{ marginBottom: 20 }}>{modal.message}</p>

            {/* nút */}
            {modal.type === "confirm" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <button
                  onClick={closeModal}
                  style={{
                    padding: "6px 18px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Thoát
                </button>
                <button
                  onClick={doSubmitRequest}
                  style={{
                    padding: "6px 18px",
                    borderRadius: 4,
                    border: "none",
                    background: PRIMARY_COLOR,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Đồng ý
                </button>
              </div>
            ) : (
              <button
                onClick={closeModal}
                style={{
                  padding: "6px 24px",
                  borderRadius: 4,
                  border: "none",
                  background: PRIMARY_COLOR,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Thoát
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
