const cds = require("@sap/cds");

class OpenWeatherApi extends cds.RemoteService {
  async init() {
    this.reject(["CREATE", "UPDATE", "DELETE"], "*");

    this.before("READ", "*", (req) => {
      try {
        const queryParams = parseQueryParams(req);
        const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join("&");
        req.query = `GET /weather?${queryString}`;
      } catch (error) {
        req.reject(400, error.message);
      }
    });

    this.on("READ", "*", async (req, next) => {
      const response = await next(req);
      return parseResponse(response);
    });

    super.init();
  }
}

function parseQueryParams(req) {
  const select = req.query.SELECT;

  const filter = {};
  Object.assign(
    filter,
    parseExpression(select.from.ref[0].where),
    parseExpression(select.where)
  );

  if (!Object.keys.length) {
    throw new Error("At least one filter is required");
  }

  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const params = {
    appid: apiKey,
    units: "metric",
  };

  for (const key of Object.keys(filter)) {
    switch (key) {
      case "id":
        params["id"] = filter[key];
        break;
      case "city":
        params["q"] = filter[key];
        break;
      default:
        throw new Error(`Filter by '${key}' is not supported.`);
    }
  }

  return params;
}

function parseExpression(expr) {
  if (!expr) {
    return {};
  }
  const [property, operator, value] = expr;
  if (operator !== "=") {
    throw new Error(`Expression with '${operator}' is not allowed.`);
  }
  const parsed = {};
  if (property && value) {
    parsed[property.ref[0]] = value.val;
  }
  return parsed;
}

function parseResponse(response) {}

module.exports = OpenWeatherApi;
