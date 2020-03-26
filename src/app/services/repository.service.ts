import { Injectable } from '@angular/core';
import { Person } from '../models/person.js'

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private people: Person[] = []
  private counter: number = 1;

  constructor() { }

  getAllPeople () {
    return this.people;
  }

  addPerson (person: Person) {
    this.people.push({id:this.counter++, ...person})
  }

  getPersonById (id: number) {
    return this.people.find((person) => {return person.id === id})
  }

  updatePersonById (id: number, newPerson: Person) {
    console.log(`in update method with id ${id} and person`)
    console.log(newPerson)
    this.people[this.people.indexOf(this.getPersonById(id))] = { id: id, ...newPerson }
  }

  deletePersonById (id: number){
    this.people = this.people.filter((person) => {return person.id !== id})
  }
}
