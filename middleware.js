
let token = process.env.SECRET_KEY || 'ful6fq';
const updateToken = newToken => { token = newToken }

export { token, updateToken }

export default (req, res, next) => {
  if (req.headers.authorization === `Bearer ${token}`)
    next();
  else
    res.send("Impervious")
};
