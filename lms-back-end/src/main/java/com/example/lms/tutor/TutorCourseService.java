package com.example.lms.tutor;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Service đơn giản quản lý danh sách khóa học trong bộ nhớ.
 */
@Service
public class TutorCourseService {

    private final List<TutorCourse> courses = new ArrayList<>();
    private long nextId = 1L;

    @PostConstruct
    public void initSampleData() {
        // Khóa 1
        TutorCourse c1 = new TutorCourse();
        c1.setId(nextId++);
        c1.setName("Nguyên lý ngôn ngữ lập trình");
        c1.setCurrentSeats(30);
        c1.setMaxSeats(50);
        c1.setSchedule("Thứ: 4, 5, CN");
        c1.setPeriods("2, 3, 4");
        c1.setStatus("Chiêu sinh");
        c1.setFromDate(LocalDate.of(2025, 3, 10));
        c1.setToDate(LocalDate.of(2025, 6, 30));
        courses.add(c1);

        // Khóa 2
        TutorCourse c2 = new TutorCourse();
        c2.setId(nextId++);
        c2.setName("Nguyên lý ngôn ngữ lập trình");
        c2.setCurrentSeats(20);
        c2.setMaxSeats(40);
        c2.setSchedule("Thứ: 2, 4, 6");
        c2.setPeriods("7, 8, 9");
        c2.setStatus("Chờ duyệt");
        c2.setFromDate(LocalDate.of(2025, 3, 10));
        c2.setToDate(LocalDate.of(2025, 6, 30));
        courses.add(c2);

        // Khóa 3
        TutorCourse c3 = new TutorCourse();
        c3.setId(nextId++);
        c3.setName("Xử lý ngôn ngữ tự nhiên");
        c3.setCurrentSeats(15);
        c3.setMaxSeats(35);
        c3.setSchedule("Thứ: 3, 5");
        c3.setPeriods("1, 2, 3");
        c3.setStatus("Chiêu sinh");
        c3.setFromDate(LocalDate.of(2025, 3, 10));
        c3.setToDate(LocalDate.of(2025, 6, 30));
        courses.add(c3);
    }

    public List<TutorCourse> getCourses(String fromDateStr, String toDateStr, String keyword) {
        LocalDate fromDate = LocalDate.parse(fromDateStr);
        LocalDate toDate = LocalDate.parse(toDateStr);

        String kw = keyword == null ? "" : keyword.trim().toLowerCase(Locale.ROOT);

        return courses.stream()
                // giao đoạn thời gian (overlap)
                .filter(c -> !c.getToDate().isBefore(fromDate) && !c.getFromDate().isAfter(toDate))
                // lọc theo tên nếu có keyword
                .filter(c -> kw.isEmpty() || c.getName().toLowerCase(Locale.ROOT).contains(kw))
                .collect(Collectors.toList());
    }

    public void createEnrollmentRequest(EnrollmentRequestDTO dto) {
        TutorCourse c = new TutorCourse();
        c.setId(nextId++);
        c.setName(dto.getCourseName());
        c.setCurrentSeats(0);
        c.setMaxSeats(dto.getSeats());
        c.setSchedule(dto.getSchedule());
        c.setPeriods(dto.getPeriods());
        c.setStatus("Chờ duyệt");
        c.setFromDate(dto.getFromDate());
        c.setToDate(dto.getToDate());
        courses.add(c);
    }
}
