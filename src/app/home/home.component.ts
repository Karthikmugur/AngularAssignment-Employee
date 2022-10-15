import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employeeForm!: FormGroup;
  editForm!: FormGroup;
  employeeDetails: any;
  employeesData: any = []

  employeeObj: Employee = {
    id: '',
    empName: '',
    empEmail: ''
  }
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      editname: ['', Validators.required],
      editemail: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getAllEmployees()
  }

  addEmployee() {
    const { value } = this.employeeForm
    console.log(value);
    this.employeeObj.id = '',
      this.employeeObj.empName = value.name,
      this.employeeObj.empEmail = value.email

    this.employeeService.addEmployee(this.employeeObj).then((employee) => {
      if (employee) {
        alert("Employee Added Successfully")
        this.employeeForm.reset();
      }
    })
  }

  //GET
  getAllEmployees() {
    this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      console.log(res)
      this.employeesData = res;
    })
  }

  deleteEmployee(employee: Employee) {
    let decision = confirm("Are you sure want to delete this employee details?");
    if (decision == true) {
      this.employeeService.deleteEmployee(employee);
    }
  }

  getAllDetails(employee: Employee) {
    this.employeeDetails = employee
    console.log(this.employeeDetails)
  }
  //UPDATE
  updateEmployee(employee: Employee) {
    const { value } = this.editForm
    console.log(value);
    this.employeeObj.id = employee.id,
    this.employeeObj.empName = value.editname,
    this.employeeObj.empEmail = value.editemail

    this.employeeService.updateEmployee(employee, this.employeeObj).then(() => {
      alert("Employee details updated successfully")
    })
    this.editForm.reset()
    
  }
}
