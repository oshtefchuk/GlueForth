// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://bluenorthtest.azurewebsites.net',
  //apiUrl: 'http://bluenorthwebapi.azurewebsites.net',
  //apiUrl: 'http://localhost:58170',
  //adminUrl: 'http://bluenorthweb.azurewebsites.net'
  adminUrl: 'https://bluenorthadmintest.azurewebsites.net'
};
