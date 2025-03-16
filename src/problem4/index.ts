function normalizeInput(n: number): number {
    if (isNaN(n) || !Number.isInteger(n) || n <= 0) {
        return 0;
    }
    return n;
}
// Function 1: Iterative approach using a for loop
function sumToNIterative(n: number): number {
    const validN = normalizeInput(n);
    if (validN === 0) return 0;
    let sum = 0;
    for (let i = 1; i <= validN; i++) {
        sum += i;
    }
    return sum;
    // Time Complexity: O(n) - Linear time due to n iterations.
    // Space Complexity: O(1) - Only uses a single variable.
}

// Function 2: Mathematical formula approach
function sumToNFormula(n: number): number {
    const validN = normalizeInput(n);
    if (validN === 0) return 0;
    return (validN * (validN + 1)) / 2;
    // Time Complexity: O(1) - Constant time with a single calculation.
    // Space Complexity: O(1) - No additional memory used.
}

// Function 3: Recursive approach
function sumToNRecursive(n: number): number {
    const validN = normalizeInput(n);
    if (validN === 0) return 0;
    if (validN === 1) return 1;
    return validN + sumToNRecursive(validN - 1);
    // Time Complexity: O(n) - Linear time due to n recursive calls.
    // Space Complexity: O(n) - Linear space due to call stack.
}

function testSumToN() {
    const testCases = [-3, 0, 1, 1.5, NaN, 5, 10, 100];
    console.log('Testing sumToN functions:');
    testCases.forEach((n) => {
        console.log(`\nInput: ${n}`);
        console.log(`Iterative: ${sumToNIterative(n)}`);
        console.log(`Formula: ${sumToNFormula(n)}`);
        console.log(`Recursive: ${sumToNRecursive(n)}`);
    });
}

testSumToN();
