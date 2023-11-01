import { readFile } from 'fs';
import axios from 'axios';

function cat(path) {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(data);
  });
}

async function webCat(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (e) {
    console.log(`Error fetching ${url}: ${e}`);
    process.exit(1);
  }

  console.log(response.data);
}

try {
  new URL(process.argv[2]); // this will error if not valid
  await webCat(process.argv[2]);
} catch (_) {
  cat(process.argv[2]);
}



