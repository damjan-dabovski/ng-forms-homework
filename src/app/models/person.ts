import { Movie } from './movie'

export class Person{
    
    id: number;
    firstName: string;
    lastName: string;
    zipCode: string;
    movies: Movie[];

    constructor (firstName: string, lastName: string, zipCode: string, movies: Movie[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipCode = zipCode;
        this.movies = movies;
    }



}