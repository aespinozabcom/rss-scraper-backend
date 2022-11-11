const FeedMedio = require("../models/FeedMedio");
const { isValidUrl } = require("./isValidUrl");

const validarUrlFeed = async (req, res, next) => {
  const { urlFeedly } = req.body;

  if (urlFeedly !== undefined && urlFeedly !== null) {
    if (typeof urlFeedly !== "string") {
      return res.status(404).json({
        msg: `La url feedly tiene que ser un string`,
      });
    }
  }

  if (!urlFeedly.includes("feed")) {
    return res.status(400).json({
      msg: `La url feed no es un feed valido - includes feed`,
    });
  }

  //   const isValidUrl = (urlString) => {
  //     var urlPattern = new RegExp(
  //       "^(https?:\\/\\/)?" + // validate protocol
  //         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
  //         "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
  //         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
  //         "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
  //         "(\\#[-a-z\\d_]*)?$",
  //       "i"
  //     );
  //     return !!urlPattern.test(urlString);
  //   };

  console.log(
    decodeURIComponent(urlFeedly).replace("feed/", "").replace("http", "https")
  );

  if (
    !isValidUrl(
      decodeURIComponent(urlFeedly)
        .replace("feed/", "")
        .replace("http", "https")
    )
  ) {
    return res.status(400).json({
      msg: `La url feed no es un feed valido - valid url`,
    });
  }

  next();
};

module.exports = {
  validarUrlFeed,
};
