const rango = (inicio, fin, p) => {
  //   let inicio = ini < fn ? ini : fn;
  //   let fin = fn > ini ? fn : ini;
  p = Math.abs(p);
  let arr = [];
  for (
    let i = inicio < fin ? inicio : fin;
    i <= (fin > inicio ? fin : inicio);
    i = i + p
  ) {
    arr = [...arr, i];
  }
  //   let final = [];
  return inicio < fin ? arr : arr.reverse();
  //   for (let i = 0; i < arr.length; i++) {
  //     if (i == fin) return final;
  //   }
};

console.log(rango(30, 20, -3));

//? arreglos en reversa

const reverseNew = arr => {
  let nuevo = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    nuevo = [...nuevo, arr[i]];
  }
  return nuevo;
};

const reverseSame = arr => {
  let mitad = Math.floor(arr.length / 2);
  let temp = 0;
  console.log(`Mitad: ${mitad}`);
  for (let i = 0; i <= mitad; i++) {
    temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
};
console.log(reverseNew([10, 29, 39, 40, 40]));
console.log(reverseSame([10, 20, 30, 40, 50]));

const arregloALista = arr => {
  let lista = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    lista = { valor: arr[i], resto: lista };
  }
  return lista;
};

const listaArreglo = lista => {
  let arr = [];
  for (let i = lista; i; i = i.resto) {
    arr = [...arr, i.valor];
  }
  return arr;
};
// return lista;
const indice = (lista, indi) => {
  let contador = 0;

  for (let i = lista; i; i = i.resto) {
    if (i.valor === indi) return contador;
    contador++;
  }
};
console.log(arregloALista([10, 30, 50]));
console.log(listaArreglo(arregloALista([10, 20, 30])));
console.log(indice(arregloALista([10, 30, 50]), 30));

// lista = {
//   //   ...lista,
//   //   ...resto:{valor: arr[i+1],resto: null} }

const identico = (uno, dos) => {
  if (uno === dos) return true;

  if (
    uno == null ||
    typeof uno != "object" ||
    dos == null ||
    typeof dos != "object"
  )
    return false;

  let llaveUno = Object.keys(uno),
    llaveDos = Object.keys(dos);

  for (const llave of llaveUno) {
    if (!llaveDos.includes(llave) || !identico(uno[llave], dos[llave]))
      return false;
  }
  return true;
};
let obj = { nombre: "Eduardo", edad: 20 };
let objdos = { nombre: "Eduardo", edad: 20 };
console.log(identico(obj, objdos));
