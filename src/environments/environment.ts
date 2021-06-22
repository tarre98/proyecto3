// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


//conexion a base de datos firebase
export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyBGQqiiRlRnkl-TnsFl07kYFA9x5bDdnPI",
    authDomain: "sharebook-2d817.firebaseapp.com",
    databaseURL: "https://sharebook-2d817-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sharebook-2d817",
    storageBucket: "sharebook-2d817.appspot.com",
    messagingSenderId: "696047782520",
    appId: "1:696047782520:web:870dc6961fa67f3f397b8d",
    measurementId: "G-Q401H1DB32"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
