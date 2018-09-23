let roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office"
];
// ? Crea un arreglo de objetos con inicio y destino y viceversa
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// console.log(roadGraph);
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    // ? si las direcciones no incluyen la el destino solicitado de no se mueve a ningun lugar
    if (!roadGraph[this.place].includes(destination)) {
      //? no puedo ir al destino solicitado desde mi ubicacion actual
      return this;
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p; // ? mi ubicacion actual es diferente a la ubicacin requerida para poder llegar a mi destino
          return { place: destination, address: p.address };
        })
        .filter(p => p.place != p.address); // ?retorna solo las parelas que sean distintas el destino a el lugar actual
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" }
]);
let next = first.move("Alice's House");
// console.log(next.place);
// console.log(next.parcels);
// console.log(first.parcels);
// console.log(first.place);

/*
        stado es {place: 'mi casa' ,parcelas:[{place ...., adress: ...}]}
        robot es {direccion: 'la tienta}
        */

function runRobot(state, robot, memory) {
  let turn = 0;
  for (turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`); // ? estado actual es decir no tiene a mas lugares a donde ir
      break;
    }
    // * Selecciona una uneva direccion random
    let action = robot(state, memory); // ? si la memoria no existe la ignora ?? Robot es un randomRobot

    state = state.move(action.direction); // ? cambia de direccion eliminando esa ruta y cambiando el place del villagestate
    memory = action.memory; // Avanza de una a una direccion
    // console.log(`Moved to ${action.direction}`);
  }
  return turn;
}

//* selecciona al asar un elemento del arreglo
function randomPick(arr) {
  let eleccion = Math.floor(Math.random() * arr.length);
  return arr[eleccion];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) }; // ? selecciona una direccion valida dependiendo el estado actual
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}
// ? se agrega una nueva propiedad a la clase villageState es igual a VillageState.prototype.random = function() .......
VillageState.random = function(parcelCount = 5) {
  // ?pobla las parcels del villageState
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph)); //? se optiene una direccion random por lo menos 4 veces
    let place;
    do {
      place = randomPick(Object.keys(roadGraph)); //? elige una direccion random hasta que el destino es igual a la ubicaion actual
    } while (place == address);
    parcels.push({ place, address });
  }
  console.log(parcels);
  return new VillageState("Post Office", parcels); // ? crea un nuevo villageState para poder accesar a las propiedades place y parcels
};
// runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// let rutaRobot = runRobot(VillageState.random(), routeRobot, [], 0);
// let buscarRobot =runRobot(VillageState.random(), goalOrientedRobot, [], 0);
let ruta = new promedio(100, runRobot(VillageState.random(), routeRobot, []));
let busqueda = new promedio(
  100,
  runRobot(VillageState.random(), goalOrientedRobot, [])
);
function promedio(repeticiones, funcion) {
  this.suma = 0;
  this.promedio = 0;
  for (let index = 0; ; index++) {
    this.valor = funcion;
    this.suma += funcion;
    // console.log(`La suma mas el resultador ${this.valor} es ${this.suma}`);
    if (index >= repeticiones) {
      this.promedio = this.suma / repeticiones;
      console.log(`La suma fue ${this.suma}: El promedio fue ${this.promedio}`);
      break;
    }
  }
}

class Grupo {
  constructor(valores) {
    this.grupo = valores;
  }
//   get vacio() {
//     this.grupo = [];
// }
  add(valor) {
    return new Grupo((this.grupo = [...this.grupo, valor]));
  }
  eliminar(valor) {
    return new Grupo(this.grupo.filter(i => i !== valor));
  }
  has(valor) {
    return this.grupo.some(i => i === valor);
  }
}

Grupo.vacio = new Grupo([]);
let a = Grupo.vacio.add("a");
console.log(a.has('a'));
