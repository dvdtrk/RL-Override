document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const literalOutputBox = document.getElementById('literalOutputBox');
    const enterButton = document.getElementById('enterButton');
    const clearButton = document.getElementById('clearButton');
    const copyButton = document.getElementById('copyButton');

    // Define character widths (approximate values)
    const charWidths = {
        'w': 1.2, 'M': 1.2, 'W': 1.2, 
        'i': 0.5, 'l': 0.5, 't': 0.6,
        ' ': 0.5,
        'default': 1.0 // average width for other characters
    };

    // Calculate the width of a given string
    function calculateWidth(text) {
        let width = 0;
        for (let char of text) {
            width += charWidths[char] || charWidths['default'];
        }
        return width;
    }

    // Function to process the input text with character width limit
    function processText(inputText) {
        const rloChar = '\u202E';
        const maxLineWidth = 30; // Approximate width limit for each line
        let formattedOutput = "";
        let literalOutput = "\\u202E";
        let currentLineWidth = 0;
        let lineWords = [];

        const paragraphs = inputText.split("\n");
        paragraphs.forEach((paragraph, index) => {
            const words = paragraph.split(" ");
            words.forEach(word => {
                const reversedWord = word.split("").reverse().join(""); // Reverse each word
                const wordWidth = calculateWidth(reversedWord) + calculateWidth(" ");

                // Check if adding this word would exceed the line width
                if (currentLineWidth + wordWidth > maxLineWidth) {
                    // Add the current line to the output
                    formattedOutput += rloChar + lineWords.reverse().join(" ") + "\n";
                    literalOutput += rloChar + lineWords.reverse().join(" ") + "\\n\\u202E";
                    lineWords = [];
                    currentLineWidth = 0;
                }

                lineWords.push(reversedWord);
                currentLineWidth += wordWidth;
            });

            // Add remaining words in the last line
            if (lineWords.length > 0) {
                formattedOutput += rloChar + lineWords.reverse().join(" ") + "\n";
                literalOutput += rloChar + lineWords.reverse().join(" ") + "\\n\\u202E";
            }

            if (index < paragraphs.length - 1) {
                formattedOutput += "\n";
                literalOutput += "\\n";
            }
        });

        return { formattedOutput, literalOutput };
    }

    enterButton.addEventListener('click', function () {
        const inputText = inputBox.value;
        const { formattedOutput, literalOutput } = processText(inputText);
        outputBox.textContent = formattedOutput;
        literalOutputBox.textContent = literalOutput;

        if (formattedOutput) {
            copyButton.style.display = "block";
        }
    });

    clearButton.addEventListener('click', function () {
        inputBox.value = '';
        outputBox.textContent = '';
        literalOutputBox.textContent = '';
        copyButton.style.display = "none";
    });

    copyButton.addEventListener('click', function () {
        const textToCopy = outputBox.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});
