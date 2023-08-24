const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

///////////////////
function useExists(req, res, next) {
  const { urlId, useId } = req.params;
  const byId = urlId ? (use) => use.urlId === Number(urlId) : () => true;
  const url = uses.filter(byId).find((use) => use.id === Number(useId));
  if (url) {
    res.locals.use = url;
    return next();
  }
  next({
    status: 404,
    message: `could not find url with id: ${useId}`,
  });
}
///////////////////

function list(req, res, next) {
  const { urlId } = req.params;
  const byId = urlId ? (use) => use.urlId === Number(urlId) : () => true;
  // res.send({data: uses})
  res.json({ data: uses.filter(byId) });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function destroy(req, res, next) {
  const { useId } = req.params;
  uses.filter((use) => use.id !== Number(useId));
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy],
};
