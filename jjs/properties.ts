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
