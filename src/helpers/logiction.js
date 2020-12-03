import { decryption } from './crypto'
export const STATE_ID = {
  ADMIT: 1, // หน้าแรกรับ
  CURE: 2, // การรักษา
  DISPENSE: 3, // เภสัชจ่ายยา
  DIAGNOSE: 4, // หมอ/พยาบาล วินิฉัย
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
    console.log('-------2', obj.data, decryption(obj.data))
    console.log("00000end0000")
    const objDecryption = JSON.parse(decryption(obj.data) || {})
    if (objDecryption.emrId) {
      datas[objDecryption.emrId] = Object.assign((datas[objDecryption.emrId] || {}), objDecryption);
    }
  });
  return datas;
}

export const selectionByStateId = (dataAll, stateId, finished_state) => {

  const selecteDatas = []
  const objFormateData = formateData(dataAll)
  Object.keys(objFormateData).forEach(key => {
    const obj = objFormateData[key]
    if (obj.stateId === stateId && (finished_state || !obj.finished)) {
      selecteDatas.push(obj)
    }
  });
  console.log("1111", selecteDatas)
  return selecteDatas;
}

export const dataAdmiteds = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.ADMIT, true)
}

export const dataCureds = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.CURE, true)
}

export const dataDispenseds = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.DISPENSE, true)
}

export const dataDiagnoseds = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.DIAGNOSE, true)
}


export const dataAdmits = (dataAll = []) => {
  return []
  // selectionByStateId(dataAll, STATE_ID.ADMIT, false)
}

export const dataCures = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.ADMIT, false)
}

export const dataDispenses = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.CURE, false)
}

export const dataDiagnoses = (dataAll = []) => {
  return selectionByStateId(dataAll, STATE_ID.DISPENSE, false)
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