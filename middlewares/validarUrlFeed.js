const { isValidUrl } = require("./isValidUrl");

const validarUrlFeed = async (req, res, next) => {
  const { urlFeedly } = req.body;

  if (urlFeedly !== undefined && urlFeedly !== null) {
    if (typeof urlFeedly !== "string") {
      return res.status(404).json({
        msg: `La url feedly tiene que ser un string`,
      });
    }

    if (!urlFeedly.includes("feed")) {
      return res.status(400).json({
        msg: `La url feed no es un feed valido - includes feed`,
      });
    }

    if (
      !isValidUrl(
        urlFeedly.includes("https")
          ? decodeURIComponent(urlFeedly).replace("feed/", "")
          : decodeURIComponent(urlFeedly)
              .replace("feed/", "")
              .replace("http", "https")
      )
    ) {
      return res.status(400).json({
        msg: `La url feed no es un feed valido - valid url`,
      });
    }
  }

  next();
};

module.exports = {
  validarUrlFeed,
};
