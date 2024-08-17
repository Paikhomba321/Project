let currentInput = "0";
let operator = null;
let previousInput = null;
let equalsPressed = false;

const previousInputDiv = document.getElementById("previous-input");
const currentInputDiv = document.getElementById("current-input");

function updateDisplay() {
    currentInputDiv.textContent = currentInput;

    // Adjust font size to fit the content
    adjustFontSize();
}

function adjustFontSize() {
    const container = currentInputDiv;
    let fontSize = 2; // Start with default font size in em

    container.style.fontSize = fontSize + 'em';
    
    // Continuously reduce font size until the text fits
    function resize() {
        const containerWidth = container.clientWidth;
        const contentWidth = container.scrollWidth;
        
        // Reduce font size if the content overflows
        while (contentWidth > containerWidth && fontSize > 0.5) {
            fontSize -= 0.1;
            container.style.fontSize = fontSize + 'em';
            containerWidth = container.clientWidth;
            contentWidth = container.scrollWidth;
        }

        // Ensure the font size does not go below a certain threshold
        if (fontSize < 0.5) {
            container.style.fontSize = '0.5em';
        }
    }

    // Use requestAnimationFrame for smoother resizing
    requestAnimationFrame(resize);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const value = button.textContent;

        if (type === "number") {
            if (currentInput === "0" || equalsPressed) {
                currentInput = value;
                equalsPressed = false;
            } else {
                currentInput += value;
            }
        } else if (type === "operator" && value !== "⌫") {
            if (currentInput !== "0") {
                previousInput = currentInput;
                operator = value === "x" ? "*" : value; // Replace 'x' with '*'
                currentInput = "0";
                previousInputDiv.textContent = `${previousInput} ${operator}`;
            }
        } else if (type === "equals") {
            if (operator && previousInput !== null) {
                currentInput = evaluate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                operator = null;
                previousInput = null;
                previousInputDiv.textContent = "";
                equalsPressed = true;
            }
        } else if (type === "clear") {
            currentInput = "0";
            operator = null;
            previousInput = null;
            previousInputDiv.textContent = "";
        } else if (type === "decimal") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
        } else if (type === "operator" && value === "⌫") {
            // Backspace functionality
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = "0";
            }
        }

        updateDisplay();
    });
});

function evaluate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return second !== 0 ? first / second : "Error";
        default:
            return second;
    }
}

updateDisplay();
