const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {
  const { CurrentWeather } = this.entities;

  this.on("READ", CurrentWeather, (req) => {
    console.log("Read weather by ID");
  });
});
