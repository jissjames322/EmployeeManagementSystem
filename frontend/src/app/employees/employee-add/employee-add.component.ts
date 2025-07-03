import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  // Error Message
  errorMessage: string | null = null;

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getAllDepartments();
  }

  // Submit Form
  onSubmit(form: NgForm): void {
    console.log(form.value);
    this.addEmployee(form);
  }

  // Insert
  addEmployee(form: NgForm): void {
    console.log("Inserting...");
    this.employeeService.insertEmployee(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          // Insert successful, clear error message
          this.errorMessage = null;

          // Refresh the list and navigate
          this.employeeService.bindListEmployees();
          this.employeeService.employees.unshift(response);
          this.router.navigate(['/employees/list']);

          // Reset the form after successful submission
          form.reset();
        },
        (error) => {
          console.log('Full error response:', error);
          this.errorMessage = 'An error occurred';
        }
      );
  }
}
