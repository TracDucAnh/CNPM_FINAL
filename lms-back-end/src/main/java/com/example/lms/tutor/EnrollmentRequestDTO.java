package com.example.lms.tutor;

public class EnrollmentRequestDTO {
    private String courseName;
    private String schedule;
    private String periods;
    private String fromDate;
    private String toDate;
    private int seats;

    public EnrollmentRequestDTO() {}

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public String getPeriods() { return periods; }
    public void setPeriods(String periods) { this.periods = periods; }

    public String getFromDate() { return fromDate; }
    public void setFromDate(String fromDate) { this.fromDate = fromDate; }

    public String getToDate() { return toDate; }
    public void setToDate(String toDate) { this.toDate = toDate; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
}
