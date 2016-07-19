/*global define*/
'use strict';

define([], function () {

  function authInterceptorFactory($q, sessionStorageService, $injector) {

    return {
      request: function (config) {
        config.headers = config.headers || {};
        // TODO: what's the performace issues of having this pulled up
        // by the injector each time?
        var Identify3D = $injector.get('Identify3DObject');

        var token = Identify3D.authToken();

        if (token) {
          config.headers.Authorization = 'Basic ' + token;
        }

        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    }

  }

  return {'authInterceptorService': ['$q', 'sessionStorageService', '$injector', authInterceptorFactory]};
});
