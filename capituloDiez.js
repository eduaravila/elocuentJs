const ordinal = require("ordinal");
const {days, months} = require("date-names/es");

export const formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};

console.log(formatDate(new Date(), "YYYY dddd Do M"));
const diaDeLaSemana = () => {
  const dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  return {
    nombre(numero) {
      return dias[numero];
    },
    numero(nombre) {
      return dias.indexOf(nombre);
    }
  };
};

const evaluar = func => {
  let i = 0;
  eval(func);
  return i;
};

console.log(evaluar("let i = 1"));

let funcionPrueba = Function("n", "return n +3")
console.log(funcionPrueba(10));

console.log(diaDeLaSemana().nombre(1));

