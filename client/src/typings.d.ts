declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare module 'react-router-last-location';
declare module 'svg-sprite-loader/runtime/sprite.build';
declare module 'react-head';
declare module 'react-object-inspector';
declare module 'react-router-hash-link';
declare module 'apiSpec';
declare module '@axetroy/react-download';

interface Window {
  __PRELOADED_STATE__: any;
  __APP_CONFIG__: {
    apiUrl: string;
  };
}


declare namespace NodeJS  {
  interface Global {
    __APP_CONFIG__: {
      apiUrl: string;
    };
  }
}

declare var window: Window;
