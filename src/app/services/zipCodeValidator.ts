import { AbstractControl } from '@angular/forms'

const validZipCodes = [
    {
        code: '1000',
        city: 'Skopje'
    },
    {
        code: '1200',
        city: 'Tetovo'
    },
    {
        code: '6000',
        city: 'Ohrid'
    },
    {
        code: '7000',
        city: 'Bitola'
    }
]

export function ValidateZip (control: AbstractControl) {
    for (let code of validZipCodes) {
        if (control.value === code.code) {
            return { cityName: code.city }
        }
    }
    return null
}