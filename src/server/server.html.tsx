export const serverHtml = ({ body, assets, helmet, spriteContent, preloadedState, hasError }: { body: string, assets: any, helmet: any, spriteContent: any, preloadedState: any, hasError: boolean }) => `<!DOCTYPE html><html>
    <head>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'/>
      
      <link rel='manifest' href='/manifest.json'/>
      <link rel='shortcut icon' href='/favicon.png'/>
      
      <link rel='stylesheet' href='/${assets['main.css']}'/>
      
      ${ helmet.title.toString() }
      <script src='/app.config.js'></script>
    </head>
    <body class='ssr'>
     ${ spriteContent }

    <div id='root'>${ body }</div>
      
      <script>
          window.__PRELOADED_STATE__ = ${
  JSON.stringify(preloadedState)
    .replace(/</g, '\\\u003c')
  }
          window.__HAS_ERROR__ = ${ hasError ? 1 : 0};
      </script>
    
    <script src='/${assets['main.js']}'></script>
    </body>
    </html>
  `;
