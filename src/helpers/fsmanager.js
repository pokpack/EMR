
import fs from 'fs'

const fileInfo = "blockchain.json";

export const writeData = arr => {
  const data = JSON.stringify(arr);
  fs.writeFile(fileInfo, data, (err) => {
    if (err) {
      throw err;
    }
    // console.log("JSON data is saved.");
  });
}
export const readData = (defaultData) => {
  try {
    const rawdata = fs.readFileSync(fileInfo);
    // console.log("read data", rawdata)
    return JSON.parse(rawdata);
  }
  catch (err) {
    return defaultData
  }

}

export default { writeData, readData };