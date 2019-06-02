import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Exam } from 'src/app/models/exam.model';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit {
  private student: Student;
  private courses: Course[];
  private exams: Exam[];
  private examScores = {};

  constructor(private route: ActivatedRoute,
              private studentService: StudentRestService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.route.params.subscribe(
      async (params) => {
        const id = params.id;
        this.student = await this.studentService.getStudentById(id);
        this.courses = (await this.studentService.getCourses(id)).sort((a, b) => a.id - b.id);
        this.exams = await this.studentService.getExams(id);
        this.courses.forEach((course: Course) => {
          const average = this.calculateAverage(course.id);
          if (average) {
            this.examScores[course.id] = Math.round(average * 10) / 10;
          }
        });
      });
  }

  calculateAverage(courseId: number): number {
    const courseExams = this.exams.filter(exam => {
      const id = +(exam.course.hasOwnProperty('id') ? exam.course.id : exam.course);
      return +id === +courseId;
    });
    if (!courseExams || courseExams.length === 0) {
      return null;
    }
    const courseScores: number[] = courseExams.map(exam => +exam.score);
    return courseScores.reduce((acc, val) => acc + val) / courseScores.length;
  }

  calculateTotalAverage() {
    const keys = Object.keys(this.examScores);
    const scores = keys.map(key => this.examScores[key]);
    if (scores.length > 0) {
      const totalAverage = scores.reduce((acc, val) => acc + val) / scores.length;
      return Math.round(totalAverage * 10) / 10;
    }
    return null;
  }

}
