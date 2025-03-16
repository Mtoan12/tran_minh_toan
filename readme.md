# Code Challenge - Tran Minh Toan

Solutions for the Backend Code Challenge.

## Setup

1. **Clone the repository**:  
   git clone https://github.com/Mtoan12/tran_minh_toan.git

2. **Install dependencies**:  
   npm install

## Problem 4: Three ways to sum to n

-   **File**: `src/problem4/index.ts`
-   **Run**: `npm run test:problem4`
-   **Description**: Implements three unique methods to calculate the sum of numbers from 1 to `n` in TypeScript:

1. **Iterative Method**:

-   Uses a `for` loop to add numbers from 1 to `n`.
-   Time Complexity: O(n) - Linear time due to `n` iterations.
-   Space Complexity: O(1) - Constant space with a single variable.

2. **Formula Method**:

-   Uses the arithmetic series formula `(n * (n + 1)) / 2`.
-   Time Complexity: O(1) - Constant time with a direct calculation.
-   Space Complexity: O(1) - No additional memory used.

3. **Recursive Method**:

-   Recursively computes `n + sumToN(n-1)` until base case.
-   Time Complexity: O(n) - Linear time due to `n` recursive calls.
-   Space Complexity: O(n) - Linear space due to call stack.
-   **Input Handling**:
-   The `normalizeInput` function ensures valid input:
-   Returns 0 if `n` is not an integer, negative, or zero.
-   Otherwise, returns `n` for summation.
-   **How to Test**: Run `npm run test:problem4` to see results for test cases.
