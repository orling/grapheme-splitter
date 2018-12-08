/**
 * Generate the JavaScript code snippet to retrieve the grapheme breaks property used in grapheme-splitter.
 * usage:
 * ```bash
 * wget http://www.unicode.org/Public/11.0.0/ucd/auxiliary/GraphemeBreakProperty.txt
 * node ./scripts/generate-grapheme-break | pbcopy
 * ```
 * Now the snippet is copied to the pasteboard and you can replace the code with the new snippet in IDE.
 * We recommend that you paste the code in IDE since the generated code snippet does not take care any code indent.
 * We will leverage IDE to ident the generated code for aesthetic pleasure.
 */
const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.resolve(__dirname, "./GraphemeBreakProperty.txt"), {
    encoding: 'utf8'
});

const ifTemplate = (condition, category) => `
if(
  ${condition}
){
  return ${category};
}`;

const conditionExpressionTemplate = (condition, comment, isLast) => `${condition}${isLast ? "": " ||"} //${comment}`;

const conditionTemplate = (codepoints) => {
    if (codepoints.length === 1) {
        return `0x${codepoints[0]} === code`
    } else if (codepoints.length === 2) {
        return `(0x${codepoints[0]} <= code && code <= 0x${codepoints[1]})`
    }
    throw new Error(`Unexpected codepoints length: ${codepoints.length}`);
};

function processOneProperty(lines) {
    const category = lines[0].split(";")[1].split("#")[0].trim();
    const codes = [];
    for (let i = 0; i < lines.length; i++) {
        const isLast = (i === lines.length - 1);
        const [codepointRange, others] = lines[i].split(";");
        const codepoints = codepointRange.trimRight().split("..");
        const comment = others.split("#")[1];
        codes.push(
            conditionExpressionTemplate(
                conditionTemplate(codepoints),
                comment,
                isLast
            )
        )
    }
    return ifTemplate(codes.join("\n"), category);
}

function splitPropertyChunk(content) {
    const chunks = [];
    let previousLineStartsWithCodepoint = false;
    for (const line of content.split("\n")) {
        if (/^[0-9A-F]/.test(line)) {
            if (!previousLineStartsWithCodepoint) {
                chunks.push([]);
                previousLineStartsWithCodepoint = true;
            }
            chunks[chunks.length - 1].push(line);
        } else {
            previousLineStartsWithCodepoint = false;
        }
    }
    return chunks;
}

function process(content) {
    const propertChunks = splitPropertyChunk(content);
    return propertChunks.map(processOneProperty).join("");
}

// print processed JavaScript code to stdout
console.log(process(content));
