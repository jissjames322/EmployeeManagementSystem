import { Department } from './department';

export class Employee {
  EmployeeId: number = 0;
  EmployeeName: string = '';
  Designation: string = '';
  DateOfJoining: Date = new Date();
  DepartmentId: number = 0;
  Contact: string = '';
  IsActive: boolean = false;
  //Object Oriented Model
  Department: Department = new Department();
}
