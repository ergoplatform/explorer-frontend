export const serverHtml = ({ body, assets, spriteContent, preloadedState }: { body: string, assets: any, spriteContent: any, preloadedState: any }) => `
    <html>
    <head>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'/>
      
      <link rel='manifest' href='/manifest.json'/>
      <link rel='shortcut icon' href='/favicon.png'/>
      
      <link rel='stylesheet' href='/${assets['main.css']}'/>
      
      <title>Blockchain Explorer</title>
    </head>
    <body class='ssr'>
     ${ spriteContent }

    <div id='root'>${ body }</div>
      
      <script>
          window.__PRELOADED_STATE__ = ${
  JSON.stringify(preloadedState)
    .replace(/</g, '\\\u003c')
  }
      </script>
    
    <script src='/${assets['main.js']}'></script>
    </body>
    </html>
  `;
