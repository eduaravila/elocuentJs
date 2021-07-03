// contains new york city weather for first few days in the month of January. Write a program that can answer following,
// What was the average temperature in first week of Jan
// What was the maximum temperature in first 10 days of Jan
// date	temperature(F)
// Jan 1	27
// Jan 2	31
// Jan 3	23
// Jan 4	34
// Jan 5	37
// Jan 6	38
// Jan 7	29
// Jan 8	30
// Jan 9	35
// Jan 10	30

interface SampleInterface {
  [key: string]: number;
}

let sample: SampleInterface = {
  "Jan 1": 27,
  "Jan 2": 31,
  "Jan 3": 23,
  "Jan 4": 34,
  "Jan 5": 37,
  "Jan 6": 38,
  "Jan 7": 29,
  "Jan 8": 30,
  "Jan 9": 35,
  "Jan 10": 30,
};

const averageTemperature = (days: number): number => {
  return Object.keys(sample)
    .slice(0, days)
    .reduce((a: number, b: string) => a + sample[b], 0);
};

const maxTemperature = (days: number): number => {
  return Object.keys(sample)
    .slice(0, days)
    .reduce((a: number, b: string) => (a < sample[b] ? (a = sample[b]) : a), 0);
};

console.log(averageTemperature(7));
console.log(maxTemperature(10));
