let e: number = 20;

interface reference_obj_interface {
  name: string;
  age: number;
}

let reference_obj = { name: "eduardo", age: 23 };

const change_reference_value = (e: reference_obj_interface) => {
  e.name = "new name";
};

const create_new_reference_value = (e: reference_obj_interface) => {
  e = { name: "Eduardo 2", age: 40 };
};

const change_value = (e: number) => {
  e = 10;
};

change_value(e);
console.log(e);

change_reference_value(reference_obj);
console.log(reference_obj);

create_new_reference_value(reference_obj);
console.log(reference_obj);
