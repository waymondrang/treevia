const nouns = require("./nouns.json");
const adjectives = require("./adjectives.json");

function sort(array: string[]) {
  return array.sort();
}

// output length of longest string in array
let string = sort(nouns).reduce((a: any, b: any) =>
  a.length > b.length ? a : b
);
console.log(string.length);

// output length of longest string in array
let string2 = sort(adjectives).reduce((a: any, b: any) =>
  a.length > b.length ? a : b
);
console.log(string2.length);
