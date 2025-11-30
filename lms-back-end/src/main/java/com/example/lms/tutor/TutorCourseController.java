package com.example.lms.tutor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tutor")
@CrossOrigin(origins = "http://localhost:5173")
public class TutorCourseController {

    private final TutorCourseService tutorCourseService;

    public TutorCourseController(TutorCourseService tutorCourseService) {
        this.tutorCourseService = tutorCourseService;
    }

    @GetMapping("/courses")
    public List<TutorCourse> getCourses(
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate,
            @RequestParam(required = false) String keyword
    ) {
        return tutorCourseService.getCourses(fromDate, toDate, keyword);
    }

    @PostMapping("/enrollment-requests")
    public ResponseEntity<?> createEnrollment(@RequestBody EnrollmentRequestDTO dto) {
        try {
            tutorCourseService.submitEnrollmentRequest(dto);
            return ResponseEntity.ok(Map.of(
                    "message", "Gửi yêu cầu chiêu sinh thành công"
            ));
        } catch (IllegalArgumentException ex) {
            if ("COURSE_NOT_FOUND".equals(ex.getMessage())) {
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "COURSE_NOT_FOUND",
                        "message", "Không tồn tại tên khóa học."
                ));
            }
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "BAD_REQUEST",
                    "message", "Yêu cầu không hợp lệ."
            ));
        }
    }
}
