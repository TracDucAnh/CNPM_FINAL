package com.example.lms.tutor;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TutorCourseService {

    private final ObjectMapper objectMapper;
    private final Path courseFile = Paths.get("data", "tutor-courses.json");
    private final Path requestFile = Paths.get("data", "enrollment-requests.json");

    private List<TutorCourse> courses = new ArrayList<>();
    private List<EnrollmentRequestDTO> requests = new ArrayList<>();

    public TutorCourseService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        initData();
    }

    private void initData() {
        try {
            if (!Files.exists(courseFile)) {
                Files.createDirectories(courseFile.getParent());
                // dữ liệu mẫu giống figma
                courses = new ArrayList<>();
                courses.add(new TutorCourse(
                        1L,
                        "Nguyên lý ngôn ngữ lập trình",
                        15,
                        30,
                        "Thứ: 4, 5, CN",
                        "2,3,4",
                        "Chờ duyệt",
                        "2025-03-10",
                        "2025-06-30"
                ));
                courses.add(new TutorCourse(
                        2L,
                        "Nguyên lý ngôn ngữ lập trình",
                        25,
                        40,
                        "Thứ: 2, 7",
                        "2,3,4",
                        "Chiêu sinh",
                        "2025-03-10",
                        "2025-06-30"
                ));
                courses.add(new TutorCourse(
                        3L,
                        "Xử lý ngôn ngữ tự nhiên",
                        20,
                        50,
                        "Thứ: 2, 6, CN",
                        "6,7,8",
                        "Chiêu sinh",
                        "2025-03-10",
                        "2025-06-30"
                ));
                saveCourses();
            } else {
                courses = objectMapper.readValue(
                        Files.readAllBytes(courseFile),
                        new TypeReference<List<TutorCourse>>() {}
                );
            }

            if (Files.exists(requestFile)) {
                requests = objectMapper.readValue(
                        Files.readAllBytes(requestFile),
                        new TypeReference<List<EnrollmentRequestDTO>>() {}
                );
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void saveCourses() {
        try {
          Files.createDirectories(courseFile.getParent());
          objectMapper.writerWithDefaultPrettyPrinter()
                  .writeValue(courseFile.toFile(), courses);
        } catch (IOException e) {
          e.printStackTrace();
        }
    }

    private void saveRequests() {
        try {
            Files.createDirectories(requestFile.getParent());
            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(requestFile.toFile(), requests);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<TutorCourse> getCourses(String fromDateStr, String toDateStr, String keyword) {
        LocalDate from = fromDateStr != null && !fromDateStr.isBlank()
                ? LocalDate.parse(fromDateStr)
                : LocalDate.MIN;
        LocalDate to = toDateStr != null && !toDateStr.isBlank()
                ? LocalDate.parse(toDateStr)
                : LocalDate.MAX;
        String kw = keyword == null ? "" : keyword.toLowerCase().trim();

        return courses.stream()
                .filter(c -> {
                    LocalDate cFrom = LocalDate.parse(c.getFromDate());
                    LocalDate cTo = LocalDate.parse(c.getToDate());
                    boolean timeOk = !cTo.isBefore(from) && !cFrom.isAfter(to);
                    boolean nameOk = kw.isEmpty()
                            || (c.getName() != null && c.getName().toLowerCase().contains(kw));
                    return timeOk && nameOk;
                })
                .collect(Collectors.toList());
    }

    public void submitEnrollmentRequest(EnrollmentRequestDTO dto) {
    String name = dto.getCourseName() == null ? "" : dto.getCourseName().trim().toLowerCase();
    Optional<TutorCourse> courseOpt = courses.stream()
            .filter(c -> c.getName() != null
                    && c.getName().trim().toLowerCase().equals(name))
            .findFirst();

    if (courseOpt.isEmpty()) {
        throw new IllegalArgumentException("COURSE_NOT_FOUND");
    }


    requests.add(dto);
    saveRequests();

    long nextId = courses.stream()
            .mapToLong(c -> c.getId() == null ? 0L : c.getId())
            .max()
            .orElse(0L) + 1L;

    TutorCourse newCourse = new TutorCourse();
    newCourse.setId(nextId);
    newCourse.setName(dto.getCourseName());
    newCourse.setCurrentSeats(0);                    
    newCourse.setMaxSeats(dto.getSeats());            
    newCourse.setSchedule(dto.getSchedule());
    newCourse.setPeriods(dto.getPeriods());
    newCourse.setStatus("Chờ duyệt");                 
    newCourse.setFromDate(dto.getFromDate());
    newCourse.setToDate(dto.getToDate());

    courses.add(newCourse);
    saveCourses();
}
}
