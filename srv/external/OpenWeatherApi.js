const cds = require("@sap/cds");

class OpenWeatherApi extends cds.RemoteService {
  async init() {
    this.reject(["CREATE", "UPDATE", "DELETE"], "*");

    this.before("READ", "*", (req) => {
      const queryParams = parseQueryParams(req);
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");
      req.query = `GET /weather?${queryString}`;
    });

    this.on("READ", "*", async (req, next) => {
      const response = await next(req);
      return parseResponse(response);
    });

    super.init();
  }
}

function parseQueryParams(req) {}

function parseResponse(response) {}

module.exports = OpenWeatherApi;
