/*global define*/
define({
  appName: 'Identify3D Admin App',
  defaultRoutePath: '/',
  version: "0.1.0",
  debug: true,
  apiEndpoint: '',
  apiFunctions: {
    login: {uri: "api/login" },
    ping: {uri: "api/ping" },
    stats: {uri: "api/dash" },
    orders: {uri: "api/job" },
    devices: {uri: "api/devices" },
  }
});
