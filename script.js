document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    const literalOutputBox = document.getElementById('literalOutputBox');
    const enterButton = document.getElementById('enterButton');
    const clearButton = document.getElementById('clearButton');
    const copyButton = document.getElementById('copyButton');

    function processText(inputText) {
        const rloChar = '\u202E';
        let formattedOutput = "";
        let literalOutput = "\\u202E";

        const paragraphs = inputText.split("\n");
        paragraphs.forEach((paragraph, index) => {
            const words = paragraph.split(" ");
            const processedWords = words.map(word => {
                const reversedWord = word.split("").reverse().join("");
                return rloChar + reversedWord;
            });

            formattedOutput += processedWords.join(" ");
            literalOutput += processedWords.join(" ");

            if (index < paragraphs.length - 1) {
                formattedOutput += "\n";
                literalOutput += "\\n\\u202E";
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
