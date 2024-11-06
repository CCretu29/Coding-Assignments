// Initialize the counter variable with a value of 0.
let count = 0;

// Function to increase the counter by 1.
function countUp() {
    // Increment the count variable by 1.
    count++;
    // Update the displayed counter value in the HTML.
    document.getElementById('counter').textContent = count;
}

// Function to decrease the counter by 1.
function countDown() {
    // Check if the count is bigger than 0 to avoid negative numbers.
    if (count > 0) {
        // Decrement the count variable by 1.
        count--;
        // Update the displayed counter value in the HTML.
        document.getElementById('counter').textContent = count;
    }
}
