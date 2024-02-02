function setBackgroundColor(element, color) {
    $(element).css("background-color", color);
}

function setTextColor(element, color) {
    $(element).css("color", color);
}

function setFont(element, font) {
    $(element).css("font-family", font);
}

function setFontSize(element, fontSize) {
    $(element).css("font-size", fontSize);
    console.log(fontSize);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculateLuminance(color) {
    return color
        .map(value =>
            value / 255 <= 0.03928
                ? value / 255 / 12.92
                : Math.pow((value / 255 + 0.055) / 1.055, 2.4)
        )
        .reduce(
            (sum, val, index) => sum + val * [0.2126, 0.7152, 0.0722][index],
            0
        );
}

function getRandomPosition() {
    return {
        x: getRandomInteger(0, window.innerWidth),
        y: getRandomInteger(0, window.innerHeight)
    };
}

function replaceRandomLetter(str) {
    let strArray = str.split("");
    let n = getRandomInteger(0, strArray.length);
    let replacementLetter = getRandomSpecialCharacter();
    if (strArray != " ") {
        strArray[n] = replacementLetter;
    }
    return strArray.join("");
}

function setRandomTextPosition(textElement) {
    let randomPosition = getRandomPosition();
    $(textElement).css({
        left: randomPosition.x + "px",
        top: randomPosition.y + "px"
    });
}

function adjustColorLuminance(color, targetLuminance) {
    const currentLuminance = calculateLuminance(color);
    const luminanceRatio = targetLuminance / currentLuminance;
    return color.map(value =>
        Math.min(255, Math.max(0, value * luminanceRatio))
    );
}

function generateRGB(numbers) {
    return `rgb(${numbers[0]}, ${numbers[1]}, ${numbers[2]})`;
}

function getRandomSpecialCharacter() {
    const specialCharacters = "!@#$%&*?";
    const randomIndex = getRandomInteger(0, specialCharacters.length);
    return specialCharacters.charAt(randomIndex);
}
function setRandomCharacter(element) {
    const randomChar = getRandomSpecialCharacter();
    $(element).html("<p>" + randomChar + "</p>");
}
$(document).ready(function () {
    const fonts = [
        "Architects Daughter",
        "Caveat",
        "Dancing Script",
        "Indie Flower",
        "Pacifico",
        "Permanent Marker",
        "Shadows Into Light"
    ];
    const contrastRatio = 1 / 4.5;
    const interval = 100;
    function updateBodyStyles() {
        const bodyColor = colorGenerator();
        const bodyColorRGB = generateRGB(bodyColor);
        const fontColor = adjustColorLuminance(bodyColor, contrastRatio);
        const fontColorRGB = generateRGB(fontColor);

        setBackgroundColor("body", bodyColorRGB);
        setTextColor("h3", fontColorRGB);
        setTextColor(
            "footer",
            generateRGB(adjustColorLuminance(colorGenerator(), contrastRatio))
        );
        setTextColor(".random-text", fontColor);
    }
    function updateRandomCharacters() {
        const font = fonts[getRandomInteger(0, fonts.length)];
        const randomFontSize = getRandomInteger(100, 600);
        setFont("h3", font);
        setFont("footer", font);
        $("#main-text").html(replaceRandomLetter("FUCK YOU"));
        setFontSize("#main-text", randomFontSize + "%");
        for (let i = 0; i <= 5; i++) {
            const id = "#randomText" + i;

            setRandomCharacter(id);
            setRandomTextPosition(id);
            setFont(id, fonts[getRandomInteger(0, fonts.length)]);
            setFontSize(id, getRandomInteger(10, 200) + "%");
        }
    }

    setInterval(updateBodyStyles, interval);
    setInterval(updateRandomCharacters, interval * 2.5);
});

function colorGenerator() {
    return Array.from({ length: 3 }, () => getRandomInteger(0, 256));
}

function adjustContrast(originalColor, targetContrastRatio) {
    const luminanceOriginal = calculateLuminance(originalColor);
    const luminanceTarget =
        luminanceOriginal < 0.5
            ? (luminanceOriginal + 0.05) / targetContrastRatio - 0.05
            : (luminanceOriginal + 0.05) * targetContrastRatio - 0.05;

    const luminanceTargetAdjusted = Math.min(1, Math.max(0, luminanceTarget));
    return adjustColorLuminance(originalColor, luminanceTargetAdjusted);
}
