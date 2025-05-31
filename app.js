const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const appInsights = require('applicationinsights');

const app = express();
const PORT = 3000;

const instrKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

// Setup Application Insights
if (instrKey) {
  appInsights.setup(instrKey)
    .setAutoCollectRequests(true)         // track HTTP request otomatis
    .setAutoCollectPerformance(true)      // track performa app (CPU, memori)
    .setAutoCollectExceptions(true)       // track error
    .setAutoCollectDependencies(true)     // track dependency (DB, API)
    .setAutoDependencyCorrelation(true)
    .start();

  const client = appInsights.defaultClient;
  client.trackEvent({name: "app_started"});
} else {
  console.warn("Application Insights Instrumentation Key tidak ditemukan. Telemetry tidak diaktifkan.");
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the router for handling routes
app.use('/', indexRouter);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  client.trackEvent({ name: "app_started" });  // custom event opsional
});
