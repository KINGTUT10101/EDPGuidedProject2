export default function convertToNameCase(text) {
    return text.split(" ").map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ")
}