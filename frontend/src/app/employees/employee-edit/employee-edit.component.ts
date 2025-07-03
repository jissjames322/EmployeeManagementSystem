import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  // Error message variable for template
  errorMessage: string | null = null;

  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeService.getAllDepartments();

    // Load employee data if route param exists
    const empId = +this.route.snapshot.paramMap.get('id')!;
    const found = this.employeeService.employees.find(
      (e) => e.EmployeeId === empId
    );

    if (found) {
      this.employeeService.employee = { ...found };
    } else {
      this.errorMessage = 'Employee not found!';
    }
  }

  // Submit form
  onSubmit(form: NgForm): void {
    console.log(form.value);
    this.updateEmployee(form);
  }

  // Update employee
  updateEmployee(form: NgForm): void {
    console.log('Updating...');
    this.employeeService.updateEmployee(form.value).subscribe({
      next: (response) => {
        console.log(response);
        this.errorMessage = null;

        // Refresh list and navigate back
        this.employeeService.bindListEmployees();
        this.router.navigate(['/employees/list']);
      },
      error: (error) => {
        console.log('Full error response:', error);
        this.errorMessage = 'An error occurred';
      },
    });
  }
}
