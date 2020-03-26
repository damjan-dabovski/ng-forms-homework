import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  hasCurrentData: boolean = false

  firstStepData = {
    firstName: '',
    lastName: '',
    zipCode: ''
  }

  secondStepData = {
    movies: []
  }

  constructor(private repository: RepositoryService) { }

  init(id): void {
    if (id && !this.hasCurrentData) {
      this.hasCurrentData = true
      let person = this.repository.getPersonById(+id)
      this.firstStepData.firstName = person.firstName
      this.firstStepData.lastName = person.lastName
      this.firstStepData.zipCode = person.zipCode
      this.secondStepData.movies = person.movies
    }
  }

  reset(): void {
    this.firstStepData = {
      firstName: '',
      lastName: '',
      zipCode: ''
    }
    this.secondStepData = {
      movies: []
    }
    this.hasCurrentData = false
  }

}
