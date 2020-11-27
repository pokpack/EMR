
let token = process.env.SECRET_KEY || 'ful6fq';
const updateToken = newToken => { token = newToken }

export { token, updateToken }

export default (req, res, next) => {
  console.log(`Request to: ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
  if (req.headers.authorization === `Bearer ${token}`)
    next();
  else
    res.send("Impervious")
};
