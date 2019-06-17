declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

declare module 'react-router-last-location';
declare module 'svg-sprite-loader/runtime/sprite.build';
declare module 'react-head';
declare module 'react-inspector';
declare module 'react-router-hash-link';
declare module 'apiSpec';
declare module '@axetroy/react-download';
declare module 'highcharts-react-official';
declare module 'console-stamp';

interface Window {
  __PRELOADED_STATE__: any;
  __HAS_ERROR__: number;
  __APP_CONFIG__: {
    apiUrl: string;
  };
}


declare namespace NodeJS  {
  interface Global {
    __APP_CONFIG__: {
      apiUrl: string;
    };
    req: any,
  }
}

declare var window: Window;
