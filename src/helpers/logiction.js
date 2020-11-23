
export const gardenEMRId = (id, updateEMRIdFn, data) => {
  id += 1
  data.emr_id = id
  updateEMRIdFn(id)
  return data
}
export default { gardenEMRId };