function backgroundColorChange(element, color) {
    $(element).css("background-color", color);
}

function colorChange(element, color) {
    $(element).css("color", color);
}

function fontChange(element, font) {
    $(element).css("font-family", font);
}
function fontSizeChange(element, fontSize) {
    $(element).css("font-size", fontSize);
}
function getRndInteger(min, max) {
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
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    return { x: randomX, y: randomY };
}

function placeRandomText(textElement) {
    var randomPosition = getRandomPosition();
    $(textElement).css({
        left: randomPosition.x + "px",
        top: randomPosition.y + "px"
    });
}
function adjustLuminance(color, targetLuminance) {
    const currentLuminance = calculateLuminance(color);
    const luminanceRatio = targetLuminance / currentLuminance;

    return color.map(value =>
        Math.min(255, Math.max(0, value * luminanceRatio))
    );
}

function RGBGenerator(numbers) {
    return `rgb(${numbers[0]}, ${numbers[1]}, ${numbers[2]})`;
}
function getRandomSpecialCharacter() {
    var specialCharacters = "!@#$%&*?";
    var randomIndex = Math.floor(Math.random() * specialCharacters.length);
    return specialCharacters.charAt(randomIndex);
}

function generateAndDisplayRandomCharacter(element) {
    var randomChar = getRandomSpecialCharacter(); // get the random charecter
    $(element).html("<p>" + randomChar + "</p>"); //put it somewhere nice
}
$(document).ready(function () {
    var cur = -1;
    const x = 20;
    const fonts = [
        "Architects Daughter",
        "Caveat",
        "Dancing Script",
        "Indie Flower",
        "Pacifico",
        "Permanent Marker",
        "Shadows Into Light"
    ];
    let interval = 100;

    var bodyInterval = setInterval(function () {
        const contrastRatio = 1 / 4.5;
        const bodyColor = colorGenerator();
        const bodyColorRGB = RGBGenerator(bodyColor);
        const fontColor = adjustContrast(bodyColor, contrastRatio);
        const fontColorRGB = RGBGenerator(fontColor);
        const font = fonts[getRndInteger(0, fonts.length)];

        const randomFontSize = getRndInteger(50, 80);

        fontChange("h3", font);
        backgroundColorChange("body", bodyColorRGB);
        colorChange("h3", fontColorRGB);
        fontSizeChange("h3", randomFontSize + "px");
        colorChange(".random-text", fontColor);
    }, interval);
    var getRandomSpecialCharInterval = setInterval(function () {
        generateAndDisplayRandomCharacter(".random-text");
        placeRandomText(".random-text");
        fontChange(".random-text", fonts[getRndInteger(0, fonts.length)]);
        fontSizeChange(".random-text", getRndInteger(50, 80) + "px");
    }, interval * 2);
});

function colorGenerator() {
    return Array.from({ length: 3 }, () => getRndInteger(0, 256));
}

function adjustContrast(originalColor, targetContrastRatio) {
    const luminanceOriginal = calculateLuminance(originalColor);
    const luminanceTarget =
        luminanceOriginal < 0.5
            ? (luminanceOriginal + 0.05) / targetContrastRatio - 0.05
            : (luminanceOriginal + 0.05) * targetContrastRatio - 0.05;

    const luminanceTargetAdjusted = Math.min(1, Math.max(0, luminanceTarget));
    return adjustLuminance(originalColor, luminanceTargetAdjusted);
}
