import { readFile, writeFile } from 'fs';
import axios from 'axios';

function logOutput(output, data) {
  if (output) {
    writeFile(output, data, 'utf8', (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, output) {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    logOutput(output, data);
  });
}

async function webCat(url, output) {
  let response;
  try {
    response = await axios.get(url);
  } catch (e) {
    console.log(`Error fetching ${url}: ${e}`);
    process.exit(1);
  }

  logOutput(output, response.data);
}

let output;
let path;

if (process.argv[2] === '--out') {
  if (!(process.argv[3] && process.argv[4])) {
    console.log('must provide --out and a file name');
    process.exit(1);
  }
  output = process.argv[3]
  path = process.argv[4];
} else {
  path = process.argv[2];
}

try {
  new URL(process.argv[2]); // this will error if not valid
  await webCat(process.argv[2], output);
} catch (_) {
  cat(process.argv[2], output);
}
