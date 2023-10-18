import * as readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function minimizeArray(numbers: number[]): number {
  let aux: number[] = [];
  let i = 0, j = 0, cost = 0;

  // sort the array in a descending way
  numbers = numbers.sort( (a, b) => a + b );

  while( numbers.length - i + aux.length - j > 1 ) {
    let a = 0, b = 0;

    if (i < numbers.length && j < aux.length ) {
      if (numbers[i] <= aux[j]) a = numbers[i++];
      else a = aux[j++];
    } else if (i < numbers.length) a = numbers[i++];
    else if (j < aux.length) a = aux[j++];

    if (i < numbers.length && j < aux.length) {
      if (numbers[i] <= aux[j]) b = numbers[i++];
      else b = aux[j++];
    } else if (i < numbers.length) b = numbers[i++];
    else if (j < aux.length) b = aux[j++] ;

    let sum = a + b;
    aux.push(sum);
    cost += sum; 
  }

  return cost;
}

export const main = async () => {
  let n: number | undefined;
  let numbers: number[] = [];

  try {
    const answer = await rl.question('\n[!] Enter the size of N: ');
    n = parseInt(answer);

    if (n === 0) return;
    else {
      for (let i=0; i<n; i++) {
        const value = parseInt( await rl.question('\n[!] Enter an integer value: ') );        
        numbers.push(value);
      }

      console.log('\nThe array of numbers that you wil use as an input is: ', numbers);
      const minCost = minimizeArray(numbers);
      console.log(`\n[*] Array's total cost: ${ minCost }`);
    }
} finally {
    rl.close();
  }
}

main();

