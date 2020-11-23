
export const STATE_ID = {
  ADMIT: 1
}
export const setId = (emrId, hn, stateId, data) => {
  data.emrId = emrId
  data.hn = hn
  data.stateId = stateId
  return data
}
export default { setId };