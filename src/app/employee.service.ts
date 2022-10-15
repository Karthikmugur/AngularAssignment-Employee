import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fs:Firestore) { }

  //ADD new employee
  addEmployee(employee:Employee){
    employee.id = doc(collection(this.fs,'id')).id
    return addDoc(collection(this.fs, 'Employees'),employee)
  }

  //EDIT employee
  getEmployees():Observable<Employee[]>{
    let employeesRef = collection(this.fs, 'Employees')
    return collectionData(employeesRef,{idField:'id'}) as Observable<Employee[]>
  }

  //Delete employees
  deleteEmployee(employee:Employee){
    let docRef = doc(this.fs, `Employees/${employee.id}`);
    return deleteDoc(docRef)
  }

  //Update
  updateEmployee(employee:Employee, employees:any){
  let docRef = doc(this.fs, `Employees/${employee.id}`);
  return updateDoc(docRef, employees)
  }
}
