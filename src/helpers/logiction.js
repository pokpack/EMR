import { decryption } from './crypto'
export const STATE_ID = {
  ADMIT: 1,
  EXAMINATION: 2,
  DISPENSE: 3,
  TREAT: 4
}
export const setState = (emrId, hn, stateId, data) => {
  data.emrId = emrId
  data.hn = hn
  data.stateId = stateId
  data.finished = data.finished ? true : false

  return data
}

export const formateData = (dataAll = []) => {
  const datas = {}
  dataAll.forEach(obj => {
    const objDecryption = JSON.parse(decryption(obj.data) || {})
    if (objDecryption.emrId) {
      datas[objDecryption.emrId] = Object.assign((datas[objDecryption.emrId] || {}), objDecryption);
    }
  });
  return datas;
}

export const dataAdmits = (dataAll = []) => {
  const admits = []
  const objFormateData = formateData(dataAll)
  console.log("*****", objFormateData);
  // objFormateData.forEach((key, index) => {
  //   console.log(`${key}: ${objFormateData[key]}`);
  // });
  return objFormateData;
}

export default { setState };