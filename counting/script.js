let count = 0; // Initialize a counter variable starting at 0
const counterElement = document.getElementById('counter'); // Get the HTML element with the id 'counter' to display the count

// Function to generate a random hexadecimal color
function getRandomColor() {
    const letters = '0123456789ABCDEF'; // Define the possible characters for a hex color
    let color = '#'; // Initialize the color string with a '#'
    // Loop to create a 6-character color code
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Randomly select a character from letters and append it to color
    }
    return color; // Return the generated color string
}

// Function to increment the counter and update the display
function incrementCounter() {
    count++; // Increment the counter by 1
    counterElement.textContent = count; // Update the text content of the counterElement with the new count

    // Change the background color to a random color each time the counter increments
    document.body.style.backgroundColor = getRandomColor();

    // Ensure text color stays readable: use black if count is even, white if odd
    document.body.style.color = count % 2 === 0 ? '#000' : '#fff';
}

// Set an interval to call the incrementCounter function every second (1000 milliseconds)
setInterval(incrementCounter, 1000);

