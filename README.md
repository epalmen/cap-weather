# Getting Started

This is a simple app that demonstrates how to consume a REST service in an [SAP Cloud Application Programming Model](https://cap.cloud.sap/docs/) app and use it as data source for an OData V4 API.

The app defines a simple weather data model and spawns an OData V4 service on top of it. The weather data is not provided by the app itself but is fetched from the [OpenWeather REST API](https://openweathermap.org/current) that is consumed via CAP's [`RemoteService`](https://cap.cloud.sap/docs/node.js/remote-services) API.

## Installation

To try out the sample app on your own, you will need an API key from [OpenWeatherMap.org](https://openweathermap.org/api).

After cloning this repo, create an `.env` file in the project root like this:

```bash
OPEN_WEATHER_API_KEY=<your API key>
```

Then run `npm install` in the root of your project.

Start the server by `cds watch` or `cds run`.

## Calling the API

You can find some sample requests in [`requests.http`](./requests.http).

Get the weather for a city of your choice by using `$filter`, like `GET /weather/CurrentWeather?$filter=city eq 'Berlin'`. Alternatively, you can use the city ID, for example `GET /weather/CurrentWeather/2643743`.
