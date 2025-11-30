package com.example.lms.tutor;

import java.time.LocalDate;

/**
 * DTO nhận dữ liệu JSON từ form chiêu sinh khóa học bên frontend.
 */
public class EnrollmentRequestDTO {

    private String courseName;
    private String schedule;
    private String periods;
    private int seats;
    private LocalDate fromDate;
    private LocalDate toDate;

    // ======= GETTER / SETTER =======

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
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

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
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
}
