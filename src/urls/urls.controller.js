const urls = require("../data/urls-data");
const uses = require("../data/uses-data");
///////////////////
function validateHref(req, res, next) {
  if (req.body.data.href) {
    next();
  } else {
    next({
      status: 400,
      message: `missing href`,
    });
  }
}
function validateUrl(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    next();
  } else {
    next({
      status: 404,
      message: `could not find url with id: ${urlId}`,
    });
  }
}
///////////////////
function list(req, res, next) {
  res.send({ data: urls });
}

let nextId = 2;
function create(req, res, next) {
  let newUrl = {
    id: nextId,
    href: req.body.data.href,
  };
  nextId++;
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function read(req, res, next) {
  const { url } = res.locals;
  //the weird part: save that we have used that URL by creating a new use
  uses.push({
    id: nextId,
    urlId: url.id,
    time: Date.now(),
  });
  res.send({ data: url });
}

function update(req, res, next) {
  const { url } = res.locals;
  url.href = req.body.data.href;
  res.send({ data: url });
}

module.exports = {
  list,
  create: [validateHref, create],
  read: [validateUrl, read],
  update: [validateUrl, update],
  validateUrl,
};
// const path = require("path");
// const urls = require(path.resolve("src/data/urls-data"));
// const uses = require(path.resolve("src/data/uses-data"));

// function urlIdExists(req, res, next) {
//     const { urlId } = req.params;
//     const foundUrl = urls.find((url) => url.id === Number(urlId));
//     if (foundUrl) {
//         res.locals.url = foundUrl;
//         return next();
//     }
//     next({
//         status: 404,
//         message: `Url does not exist: ${urlId}`,
//     });
// }

// function list(req, res) {
//     res.json({ data: urls });
// }

// function checkHasHref(req, res, next) {
//     const { data: { href } = {} } = req.body;
//     if (href) {
//         res.locals.href = href;
//         return next();
//     }
//     next({
//         status: 400,
//         message: "A 'href' property is required.",
//     });
// }

// function create(req, res) {
//     const { data: { href } = {} } = req.body;
//     const newUrl = {
//         id: urls.length + 1,
//         href,
//     };
//     urls.push(newUrl);
//     res.status(201).json({ data: newUrl });
// }

// function read(req, res) {
//     res.json({ data: res.locals.url });
// }

// function update(req, res) {
//     const { data: { href } = {} } = req.body;
//   res.locals.url.href = href;
//   res.json({
//     data: res.locals.url,
//   });
// }

// function destroy(req, res) {
//     const { urlId } = req.params;
//     const index = urls.findIndex((url) => url.id === Number(urlId));
//     if (index > -1) {
//         urls.splice(index, 1);
//     }
//     res.sendStatus(204);
// }

// module.exports = {
//     list,
//     create: [checkHasHref, create],
//     read: [urlIdExists, read],
//     update: [urlIdExists, checkHasHref, update],
//     delete: [urlIdExists, destroy],
//     urlIdExists,
// };
