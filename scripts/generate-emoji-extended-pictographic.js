/**
 * Generate the JavaScript code snippet to retrieve the grapheme breaks property used in grapheme-splitter.
 * usage:
 * ```bash
 * wget https://www.unicode.org/Public/emoji//11.0/emoji-data.txt scripts/
 * node ./scripts/generate-emoji-extended-pictographic | pbcopy
 * ```
 * Now the snippet is copied to the pasteboard and you can replace the code with the new snippet in IDE.
 * We recommend that you paste the code in IDE since the generated code snippet does not take care any code indent.
 * We will leverage IDE to ident the generated code for aesthetic pleasure.
 */
const fs = require("fs");
const path = require("path");
const convert = require("./converter");

const content = fs.readFileSync(path.resolve(__dirname, "./emoji-data.txt"), {
    encoding: 'utf8'
});

// print processed JavaScript code to stdout
console.log(convert(content, function (category) {
    return category === "Extended_Pictographic"
}));
