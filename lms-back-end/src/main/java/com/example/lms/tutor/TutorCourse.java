package com.example.lms.tutor;

import java.time.LocalDate;

/**
 * Model đơn giản lưu thông tin khóa học giảng viên phụ trách.
 * Không dùng JPA, chỉ là in-memory object.
 */
public class TutorCourse {

    private long id;
    private String name;
    private int currentSeats;
    private int maxSeats;
    private String schedule; // Ví dụ: "Thứ: 4, 5, CN"
    private String periods;  // Ví dụ: "2, 3, 4"
    private String status;   // "Chờ duyệt", "Chiêu sinh", ...
    private LocalDate fromDate;
    private LocalDate toDate;

    // =========== GETTER / SETTER ===========

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCurrentSeats() {
        return currentSeats;
    }

    public void setCurrentSeats(int currentSeats) {
        this.currentSeats = currentSeats;
    }

    public int getMaxSeats() {
        return maxSeats;
    }

    public void setMaxSeats(int maxSeats) {
        this.maxSeats = maxSeats;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getPeriods() {
        return periods;
    }

    public void setPeriods(String periods) {
        this.periods = periods;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    /**
     * Timeline dạng dd/MM/yyyy-dd/MM/yyyy
     * gửi sang frontend hiển thị giống Figma.
     */
    public String getTimeline() {
        if (fromDate == null || toDate == null) {
            return "";
        }
        return String.format(
                "%d/%d/%d-%d/%d/%d",
                fromDate.getDayOfMonth(), fromDate.getMonthValue(), fromDate.getYear(),
                toDate.getDayOfMonth(), toDate.getMonthValue(), toDate.getYear()
        );
    }
}
