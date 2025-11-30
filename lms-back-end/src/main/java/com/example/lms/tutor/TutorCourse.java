package com.example.lms.tutor;

public class TutorCourse {
    private Long id;
    private String name;
    private int currentSeats;
    private int maxSeats;
    private String schedule;
    private String periods;
    private String status;   // "Chờ duyệt", "Chiêu sinh", ...
    private String fromDate; // "2025-03-10"
    private String toDate;   // "2025-06-30"

    public TutorCourse() {}

    public TutorCourse(Long id, String name, int currentSeats, int maxSeats,
                       String schedule, String periods, String status,
                       String fromDate, String toDate) {
        this.id = id;
        this.name = name;
        this.currentSeats = currentSeats;
        this.maxSeats = maxSeats;
        this.schedule = schedule;
        this.periods = periods;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getCurrentSeats() { return currentSeats; }
    public void setCurrentSeats(int currentSeats) { this.currentSeats = currentSeats; }

    public int getMaxSeats() { return maxSeats; }
    public void setMaxSeats(int maxSeats) { this.maxSeats = maxSeats; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public String getPeriods() { return periods; }
    public void setPeriods(String periods) { this.periods = periods; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFromDate() { return fromDate; }
    public void setFromDate(String fromDate) { this.fromDate = fromDate; }

    public String getToDate() { return toDate; }
    public void setToDate(String toDate) { this.toDate = toDate; }
}
