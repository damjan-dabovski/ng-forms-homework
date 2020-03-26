export class Movie{
    name: string
    posterUri: string

    constructor(name: string, posterUri: string = ""){
        this.name = name;
        this.posterUri = posterUri
    }
}