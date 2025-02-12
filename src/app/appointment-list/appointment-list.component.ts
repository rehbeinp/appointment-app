import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  isPriority: boolean = false;
  priorities: AppComponent[] = [];
  appointments: Appointment[] = [];

  ngOnInit() {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []

  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };

      if (this.isPriority) {
        newAppointment.title = this.newAppointmentTitle.toUpperCase();
        this.priorities.push(newAppointment);
      }

      this.appointments.push(newAppointment);
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();
      this.isPriority = false;
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
      localStorage.setItem("priorities",JSON.stringify(this.priorities))

    }
  };

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }


}
