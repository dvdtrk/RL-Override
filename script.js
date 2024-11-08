document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const literalOutputBox = document.getElementById('literalOutputBox');
    const enterButton = document.getElementById('enterButton');
    const clearButton = document.getElementById('clearButton');
    const copyButton = document.getElementById('copyButton');

    // Function to process the input text
    function processText(inputText) {
        const rloChar = '\u202E'; // Right-to-Left Override character
        let formattedOutput = "";
        let literalOutput = "\\u202E"; // Start with RLO in the literal output

        // Split the input text into paragraphs
        const paragraphs = inputText.split("\n");
        
        paragraphs.forEach((paragraph, index) => {
            const words = paragraph.split(" ");
            const processedWords = words.map(word => {
                const reversedWord = word.split("").reverse().join(""); // Reverse each word's letters
                return rloChar + reversedWord;
            });

            // Join words back into a single paragraph
            formattedOutput += processedWords.join(" ");
            literalOutput += processedWords.join(" ");

            // Add a newline character between paragraphs
            if (index < paragraphs.length - 1) {
                formattedOutput += "\n";
                literalOutput += "\\n\\u202E";
            }
        });

        return { formattedOutput, literalOutput };
    }

    // Event listener for the Enter button
    enterButton.addEventListener('click', function () {
        const inputText = inputBox.value;
        const { formattedOutput, literalOutput } = processText(inputText);
        outputBox.textContent = formattedOutput;
        literalOutputBox.textContent = literalOutput;
        
        // Show the Copy button if there's output
        if (formattedOutput) {
            copyButton.style.display = "block";
        }
    });

    // Event listener for the Clear button
    clearButton.addEventListener('click', function () {
        inputBox.value = '';
        outputBox.textContent = '';
        literalOutputBox.textContent = '';
        copyButton.style.display = "none"; // Hide the Copy button
    });

    // Event listener for the Copy button
    copyButton.addEventListener('click', function () {
        const textToCopy = outputBox.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});
