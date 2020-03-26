import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Person } from '../models/person';
import { Movie } from '../models/movie';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormService } from '../services/form.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ValidateZip } from '../services/zipCodeValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup
  currentStep: string

  constructor(private repository: RepositoryService,
              private formBuilder: FormBuilder,
              private service: FormService,
              private router: Router,
              private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['',[Validators.required , Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      zipCode: ['', [Validators.required, ValidateZip]],
      movies: this.formBuilder.array([])
    })

    this.currentStep = this.router.url.split('/')[1]

    let currentId = this.router.url.split('/')[2]
    if (currentId) {
      this.service.init(currentId)
    }
    this.form.patchValue({
      firstName: this.service.firstStepData.firstName,
      lastName: this.service.firstStepData.lastName,
      zipCode: this.service.firstStepData.zipCode
    })
    this.form.setControl('movies', this.setMoviesControl(this.service.secondStepData.movies))
  }

  get movies () : FormArray {
    return this.form.get('movies') as FormArray
  }

  addMovie () {
    this.movies.push(this.formBuilder.group({
      name: ['', Validators.required],
      posterUri: ['']
    }))
  }

  removeMovie (index) {
    this.movies.removeAt(index)
  }

  nextStep () {
    if (this.currentStep === 'step1') {
      this.service.firstStepData.firstName = this.form.get('firstName').value
      this.service.firstStepData.lastName = this.form.get('lastName').value
      this.service.firstStepData.zipCode = this.form.get('zipCode').value
      console.log(this.service.firstStepData)
      this.currentRoute.params.subscribe((params) => {
        this.router.navigate([`/step2/${params.id ? params.id : ''}`])
      })
    } else {
      this.saveMoviesToService()
      let personToAdd: Person = new Person(
        this.service.firstStepData.firstName,
        this.service.firstStepData.lastName,
        this.service.firstStepData.zipCode,
        this.service.secondStepData.movies
      )

      let currentId = this.router.url.split('/')[2]
      if (currentId) {
        this.repository.updatePersonById(+currentId, personToAdd)
      } else {
        this.repository.addPerson(personToAdd)
      }
      this.router.navigate(['/'])
    }
  }

  previousStep () {
    this.saveMoviesToService()
    this.currentRoute.params.subscribe((params) => {
      this.router.navigate([`/step1/${params.id ? params.id : ''}`])
    })
  }
  
  setMoviesControl(movies: Movie[]): FormArray {
    let formArray = new FormArray([])
    movies.forEach(movie => {
      formArray.push(this.formBuilder.group({
        name: [movie.name, Validators.required],
        posterUri: [movie.posterUri || '']
      }))
    })
    return formArray
  }

  saveMoviesToService(): void {
    let movies = this.form.get('movies') as FormArray
    let movieArray = []
    for(let control of movies.controls){
      movieArray.push(control.value)
    }
    this.service.secondStepData.movies = movieArray
  }

  getInputValidity(): boolean {
    let thingsToValidate: AbstractControl[] = [ this.form.get('firstName'), this.form.get('lastName') ]

    let isFormValid: boolean = true
    for (let item of thingsToValidate) {
      if (!item.valid) {
        isFormValid = false
        break
      }
    }

    if(!this.form.get('zipCode').errors?.cityName) {
      isFormValid = false
    }

    return isFormValid
  }

  getZipCodeCity(): string {
    let cityName = this.form.get('zipCode').errors?.cityName
    if (cityName) {
      return cityName
    } else {
      return 'Invalid Zip code'
    }
  }

}