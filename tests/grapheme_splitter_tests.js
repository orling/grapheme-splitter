import {readFileSync} from 'fs';
import {graphemeIterator, splitGraphemes, countGraphemes} from '../index.js';

function ucs2encode(array) {
  return array.map( value => {
    let output = '';

    if (value > 0xFFFF) {
      value -= 0x10000;
      output += String.fromCharCode(value >>> 10 & 0x3FF | 0xD800);
      value = 0xDC00 | value & 0x3FF;
    }

    output += String.fromCharCode(value);
    return output;
  }).join('');
}

function testDataFromLine(line) {
  const codePoints = line.split(/\s*[×÷]\s*/).map(c => parseInt(c, 16));
  const input = ucs2encode(codePoints);

  const expected = line.split(/\s*÷\s*/).map(sequence => {
    const codePoints = sequence.split(/\s*×\s*/).map(c => parseInt(c, 16))
    return ucs2encode(codePoints)
  });

  return { input, expected };
}

const testData = readFileSync('tests/GraphemeBreakTest.txt', 'utf-8')
      .split('\n')
      .filter(line =>
        line != null && line.length > 0 && !line.startsWith('#'))
      .map(line => line.split('#')[0])
      .map(testDataFromLine);

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------
const n_tests = testData.length;
const valuefails = [];
const countfails = [];

for (let i in testData) {
  const {input, expected} = testData[i];
  let [...results] = graphemeIterator(input)
  const count = countGraphemes(input);
  if (count !== expected.length)
    countfails.push({casenum: i, result: count, expected: expected.length});
  for (let j in results) {
    if(results[j] !== expected[j]) {
      valuefails.push({casenum: i, grapheme: i, result: results[j], expected: expected[j]});
      break;
    }
  }
}

if (valuefails.length !== 0)
  for (const {casenum, grapheme, expected, result} of valuefails)
    console.error (`iterateGraphemes: In case ${casenum}: expected`, expected, `at grapheme ${grapheme} but got`, result, `instead.`);
if (countfails.length !== 0)
  for (const {casenum, grapheme, expected, result} of valuefails)
    console.error (`countGraphemes: In case ${casenum}: expected`, expected, `graphemes but got`, result, `instead.`);

if (valuefails.length === 0 && countfails.length === 0) {
  console.log(`All ${n_tests} tests passed.`)
  process.exit(0);
} else {
  console.error(`iterateGraphemes: ${valuefails.length} of ${n_tests} failed.`)
  console.error(`countGraphemes: ${countfails.length} of ${n_tests} failed.`)
  process.exit(1);
}
