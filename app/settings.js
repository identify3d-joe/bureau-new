/*global define*/
define({
  appName: 'Identify3D Admin App',
  defaultRoutePath: '/',
  version: "0.1.0",
  debug: true,
  apiEndpoint: 'http://staging.identify3d.net:3030/',
  apiFunctions: {
    login: {uri: "api/login" },
    ping: {uri: "api/ping" },
    stats: {uri: "api/dash" },
    orders: {uri: "api/job" },
    devices: {uri: "api/devices" },
    report: {uri: "api/report" },
  }
});
