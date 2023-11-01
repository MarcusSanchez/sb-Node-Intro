import { readFile } from 'fs';

function cat(path) {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(data);
  });
}

cat(process.argv[2]);