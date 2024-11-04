document.addEventListener('DOMContentLoaded', function () {
    function processText(inputText) {
        const rloChar = '\u202E'; // Right-to-Left Override character
        let outputText = "";

        // Split the input text into paragraphs
        const paragraphs = inputText.split("\n");
        
        paragraphs.forEach((paragraph, index) => {
            const words = paragraph.split(" ");
            const processedWords = words.map(word => {
                const reversedWord = word.split("").reverse().join(""); // Reverse each word's letters
                return rloChar + reversedWord;
            });

            outputText += processedWords.join(" ");

            if (index < paragraphs.length - 1) {
                outputText += "\n";
            }
        });

        return outputText;
    }

    // Event listener for the Enter button
    document.getElementById('enterButton').addEventListener('click', function () {
        const inputText = document.getElementById('inputBox').value;
        const outputText = processText(inputText);
        document.getElementById('outputBox').textContent = outputText;
    });

    // Event listener for the Clear button
    document.getElementById('clearButton').addEventListener('click', function () {
        document.getElementById('inputBox').value = '';
        document.getElementById('outputBox').textContent = '';
    });
});
