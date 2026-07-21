class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`)
    }

    go(){
        if(this.speed <= 200 && !this.isTrunkOpen){
            this.speed+=5;
        }
    }

    break(){
        if(this.speed > 0){
            this.speed-=5;  
        }
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}


class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration  = carDetails.acceleration;
    }

    go(){
        if(this.speed <= 300){
            this.speed+=this.acceleration;
        }
    }

    openTrunk(){
    }

    closeTrunk(){
    }
}



const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const car3 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();



car2.go();
car2.go();
car2.go();
car2.go();
car2.break();

car1.displayInfo();
car2.displayInfo();


car1.openTrunk();
console.log(car1.isTrunkOpen)

car3.go();
car3.go();
car3.displayInfo();
car3.break();
car3.displayInfo();
console.log(car3);