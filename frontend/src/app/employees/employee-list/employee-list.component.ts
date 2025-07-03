import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.bindListEmployees();
  }

  // 3. Edit Employee
  editEmployee(employee: Employee): void {
    console.log(employee);
    this.employeeService.employee = Object.assign({}, employee);
    this.router.navigate(['/employees/edit', employee.EmployeeId]);
  }

  // 4. Delete Employee
  deleteEmployee(EmployeeId: any): void {
    console.log(EmployeeId);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(EmployeeId).subscribe(
        (response) => {
          console.log('Employee deleted successfully');
          this.employeeService.bindListEmployees(); // Refresh list
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
}
