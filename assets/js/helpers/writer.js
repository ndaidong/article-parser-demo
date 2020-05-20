// helpers -> writer.js


const CSS = `
  html, body {
    margin: 0px;
    padding: {PADDING}px;
    background-color: #fefefd;
    overflow-x: hidden;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  img {
    max-width: 100%;
  }
`;

const setContent = (html, ifr) => {
  const padding = html.match(/^<iframe(.*)<\/iframe>/i) ? 0 : 10;
  const css = CSS.replace('{PADDING}', padding);
  const ed = ifr.contentWindow.document;
  ed.open();
  ed.write(`
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>`);
  ed.close();
};


export default {
  setContent,
};
