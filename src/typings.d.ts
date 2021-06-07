declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module 'redux-struct';

declare module 'react-router-last-location';
declare module 'svg-sprite-loader/runtime/sprite.build';
declare module 'react-head';
declare module 'react-router-hash-link';
declare module 'apiSpec';
declare module '@axetroy/react-download';
declare module 'nprogress';
declare module 'react-copy-to-clipboard';
declare module 'react-alert';
declare module 'react-alert-template-basic';
declare module 'react-truncate';

interface Window {
  __PRELOADED_STATE__: any;
  __HAS_ERROR__: number;
  __APP_CONFIG__: {
    apiUrl: string;
  };
}

declare namespace NodeJS {
  interface Global {
    __APP_CONFIG__: {
      apiUrl: string;
    };
    req: any;
  }
}

declare let window: Window;
