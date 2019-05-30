import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { Exam, ExamSubmission } from 'src/app/models/exam.model';
import * as M from 'materialize-css';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit, AfterViewInit {
  courseId: number;
  studentId: number;
  student: Student;
  exams: Exam[];
  newGrade = 0;
  averageGrade = 0;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute,
              private studentService: StudentRestService) { }

  ngOnInit() {
    const parentParams = this.route.parent.params.subscribe(
      (params: Params) => {
        this.courseId = params.courseId;
      }
    );
    const routeParams = this.route.params.subscribe(
      async (params: Params) => {
        this.studentId = params.studentId;
        this.student = await this.studentService.getStudentById(this.studentId);
        this.exams = await this.studentService.getExamsByIds(this.studentId, this.courseId);
        console.log(this.exams);
        this.averageGrade = this.average();
      }
    );
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  average() {
    if (this.exams.length === 0) {
      return null;
    }

    let total = 0;
    this.exams.forEach(exam => {
      total += +exam.score;
      console.log(exam);
      console.log(exam.score);
    });
    let avg = total / this.exams.length;
    return Math.round(avg * 10) / 10;
  }

  async deleteExam(examId: number) {
    await this.studentService.deleteExam(examId);
    this.exams = this.exams.filter((exam) => +exam.id !== +examId);
    this.averageGrade = this.average();
  }

  async addGrade() {
    const grade = this.form.value.newGrade;
    const course = 'http://localhost:8080/api/courses/' + this.courseId;
    const student = 'http://localhost:8080/api/students/' + this.studentId;
    const exam = new ExamSubmission(grade, course, student);
    const newExam = await this.studentService.addExam(exam);
    this.exams.push(newExam);
    this.averageGrade = this.average();
  }
}
