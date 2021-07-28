interface DetectiveObject {
  surname: string;
  address: Address;
}

interface Address {
  city: string;
}

let holmes: DetectiveObject = {
  surname: "Holmes",
  address: { city: "London" },
};

let john: DetectiveObject = {
  surname: "Walter",
  address: holmes.address,
};

john.surname = "Lennon";
john.address.city = "Malibu";

console.log(holmes.surname); // Holmes
console.log(holmes.address.city); // Malibu
console.log(john.surname); // Lennon
console.log(john.address.city); // Malibu

let singer = { surname: "Turner" };
let pilot = { surname: "Kamal" };
let temp = singer.surname;
singer.surname = pilot.surname;
pilot.surname = temp;

console.log(singer.surname); // "Kamal"
console.log(pilot.surname); // "Turner"


let president:any = {
  name: 'Pooh',
  next: null,
};

president.next = {
  name: 'Paddington',
  next: president,
};

console.log(president.next);

let station = {
    Owner: { name: 'Fred' },
  };
  //            undefined
  //         |‾‾‾‾‾‾‾‾‾‾‾|  
let name = station.owner.name;
  //                      ^
  //                    crash
console.log(name === station.Owner.name);