import { decryption } from './crypto'
export const STATE_ID = {
  ADMIT: 1,
  TREAT: 2,
  DISPENSE: 3,
  EXAMINATION: 4,
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
  	console.log('-------2',obj.data, decryption(obj.data))
  	console.log("00000end0000")
    const objDecryption = JSON.parse(decryption(obj.data) || {})
    if (objDecryption.emrId) {
      datas[objDecryption.emrId] = Object.assign((datas[objDecryption.emrId] || {}), objDecryption);
    }
  });
  return datas;
}

export const selectionByStateId = (dataAll, stateId) => {

  const selecteDatas = []
  const objFormateData = formateData(dataAll)
  Object.keys(objFormateData).forEach(key => {
    const obj = objFormateData[key]
    if (obj.stateId === stateId && !obj.finished) {
      selecteDatas.push(obj)
    }
  });
  console.log("1111", selecteDatas)
  return selecteDatas;
}

export const dataAdmits = (dataAll = []) => {
	console.log("======", dataAll)
  return selectionByStateId(dataAll, STATE_ID.ADMIT)
}

export const dataExaminations = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.EXAMINATION)
}

export const dataDispenses = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.DISPENSE)
}

export const dataTreats = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.TREAT)
}

export const dataEMRId = (dataAll = [], hn, emrId) => {
  return (formateData(dataAll) || {})[emrId];
}

export const dataHistory = (dataAll = [], hn) => {
  const selecteDatas = []
  const objFormateData = formateData(dataAll)
  Object.keys(objFormateData).forEach(key => {
    const obj = objFormateData[key]
    if (obj.hn === hn) {
      selecteDatas.push(obj)
    }
  });
  return selecteDatas;
}

export default { setState };