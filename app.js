const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const appInsights = require('applicationinsights');

const app = express();
const PORT = process.env.PORT || 3000;

const instrKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

let client = null;

if (instrKey) {
  appInsights.setup(instrKey)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .start();

  client = appInsights.defaultClient;
  client.trackEvent({ name: "app_started" });
} else {
  console.warn("Application Insights Instrumentation Key tidak ditemukan. Telemetry tidak diaktifkan.");
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  if (client) {
    client.trackEvent({ name: "app_started" });  // panggil hanya kalau client ada
  }
});
