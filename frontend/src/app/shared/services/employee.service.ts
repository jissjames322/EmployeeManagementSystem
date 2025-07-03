import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Department } from '../models/department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // Declare variables - global
  employee: Employee = new Employee();
  employees: Employee[] = [];
  departments: Department[] = [];

  constructor(private httpClient: HttpClient) {}

  // 1. Get All Employees – Void Type
  bindListEmployees(): void {
    this.httpClient
      .get<Employee[]>(environment.apiUrl + 'employees/')
      .subscribe({
        next: (response) => (this.employees = response),
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Request complete'),
      });
  }

  // 2. Get All Departments
  getAllDepartments(): void {
    this.httpClient
      .get<Department[]>(environment.apiUrl + 'departments/')
      .subscribe({
        next: (response) => {
          console.log(response);
          this.departments = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // 3. Insert Employee – Used in employee-add
  insertEmployee(employee: Employee): Observable<any> {
    console.log(employee);
    return this.httpClient.post(environment.apiUrl + 'employees/', employee);
  }

  // 4. Update Employee
  updateEmployee(employee: Employee): Observable<any> {
    console.log('Update in service');
    return this.httpClient.put(
      environment.apiUrl + 'employees/' + employee.EmployeeId + '/',
      employee
    );
  }

  // 5. Delete Employee
  deleteEmployee(EmployeeId: string): Observable<any> {
    return this.httpClient.delete(
      environment.apiUrl + 'employees/' + EmployeeId + '/'
    );
  }
}
