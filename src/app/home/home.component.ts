import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Router } from '@angular/router'
import { Person } from '../models/person';
import { Movie } from '../models/movie';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get people() {
    return this.repository.getAllPeople()
  }

  constructor(private repository: RepositoryService,
              private router: Router,
              private service: FormService) { }

  ngOnInit(): void {
    this.service.reset()
  }

  editPerson (id) {
    this.router.navigate([`step1/${id}`])
  }
  
  deletePerson (id) {
    console.log(id)
    console.log(`Deleting person with id: ${id}...`)
    this.repository.deletePersonById(id)
  }

  addMockUser () {
    this.repository.addPerson(new Person('petko','petkovski','1000',[
      new Movie('testMovie', '')
    ]))
  }

  logUsers () {
    console.log(this.repository.getAllPeople())
  }
}
