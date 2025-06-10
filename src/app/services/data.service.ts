import { Injectable } from '@angular/core';
import {Coordinator, Student} from "../models/students";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private coordinator: Coordinator = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    phone: '+1 (555) 123-4567'
  };

  private students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@student.edu',
      course: 'Computer Science',
      year: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@student.edu',
      course: 'Software Engineering',
      year: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@student.edu',
      course: 'Data Science',
      year: 4,
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily.brown@student.edu',
      course: 'Computer Science',
      year: 1,
      status: 'active'
    }
  ];

  getCoordinator(): Coordinator {
    return this.coordinator;
  }

  getStudents(): Student[] {
    return this.students;
  }

  updateCoordinator(coordinator: Coordinator): void {
    this.coordinator = { ...coordinator };
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
    }
  }

  deleteStudent(id: string): void {
    this.students = this.students.filter(s => s.id !== id);
  }
}
