
import fs from 'fs'

export const write_file = (arr) => {
  const data = JSON.stringify(arr);
  fs.writeFile('blockchain.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });

}

export default { write_file };