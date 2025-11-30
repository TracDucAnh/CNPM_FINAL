package com.example.lms.tutor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST API cho màn Chiêu sinh khóa học.
 */
@RestController
@RequestMapping("/api/tutor")
@CrossOrigin(origins = "http://localhost:5173")
public class TutorCourseController {

    private final TutorCourseService tutorCourseService;

    // Constructor injection để Spring tiêm service vào
    public TutorCourseController(TutorCourseService tutorCourseService) {
        this.tutorCourseService = tutorCourseService;
    }

    // Lấy danh sách khóa học theo khoảng ngày + keyword
    @GetMapping("/courses")
    public List<TutorCourse> getCourses(
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam(required = false) String keyword
    ) {
        return tutorCourseService.getCourses(fromDate, toDate, keyword);
    }

    // Gửi yêu cầu chiêu sinh khóa học mới
    @PostMapping("/enrollment-requests")
    public ResponseEntity<Void> createEnrollmentRequest(@RequestBody EnrollmentRequestDTO dto) {
        tutorCourseService.createEnrollmentRequest(dto);
        return ResponseEntity.ok().build();
    }
}
