import { readFileSync } from 'node:fs';

const input = readFileSync('input.txt', 'utf-8');

// detects a start-of-packet marker in the datastream.
// indicated by a sequence of four characters that are all different

// identify the first position where the four most recently received characters were all different
// report the number of characters from the beginning of the buffer to 
// the end of the first such four-character marker


const findStartOfPacket = () => {
  const chars = input.split('');
  let start = 0;
  let end = 4;
  while (end < chars.length) {
    const chunk = chars.slice(start, end);
    const compare = new Set(chunk)
    // check if chunck doesn't contain any repeat characters
    if (compare.size === 4) {
      return end;
    }
    start++;
    end++;
  }
}
const packetStart = findStartOfPacket()
console.log(packetStart);
