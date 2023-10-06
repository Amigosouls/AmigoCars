export interface CarsData{
    carId:number,
    make:string,
    model:string,
    variant:string,
    price:number,
    fuelType:string
}

export interface PendingCars{
    carId: number,
    registrationNo: string,
    brand: string,
    year: number,
    model: string,
    fuelType: string,
    transmission: string,
    rtoCircle: number,
    kmDriven: number,
    carLocation: number,
    sellerId: number,
    carImg: string,
    price: number,
    carStatus: string,
}