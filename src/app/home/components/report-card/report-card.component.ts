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
    const params: Params = this.route.params.subscribe()
    const id = params.id;
    this.student = await this.studentService.getStudentById(id);
    this.courses = await this.studentService.getCourses(id);
    this.exams = await this.studentService.getExams(id);
    this.courses.forEach(course => {
      this.examScores[course.id] =(this.calculateAverage(course.id));
    })
  }

  calculateAverage(courseId: number): number {
    const courseExams: Exam[] = this.exams.filter(
      (exam: Exam) => +exam.course.id === +courseId
    )
    console.log(courseExams);
    const courseScores: number[] = courseExams.map(exam => exam.score);

    if (courseScores.length < 1) return null;

    return courseScores.reduce((acc, val) => acc + val) / courseScores.length;
  }

  calculateTotalAverage() {
    const scoreList = Object.keys(this.examScores).map(key => this.examScores[key]);
    return Math.round((scoreList.reduce((acc, val) => acc + val) / scoreList.length * 10)) / 10;
  }

}
