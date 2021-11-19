export const badRequestHandler = (err, req, res, next) => {
  console.log(err.errorsList);
  if (err.status === 400) {
    res.status(400).send({ Message: err.errorsList });
  } else {
    next(err);
  }
};

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ Message: "Unauthorized" });
  } else {
    next(err);
  }
};

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res
      .status(404)
      .send({ Message: err.message || "Resouce not found!", success: false });
  } else {
    next(err);
  }
};

export const genericErrorHandler = (err, req, res, next) => {
  console.log(err.errorsList);

  res.status(500).send({ Message: "Generic Server Error" });
};
