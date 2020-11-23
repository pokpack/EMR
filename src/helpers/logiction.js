
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
export default { setState };