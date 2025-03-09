require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const React = require('react');
const App = require('./src/App').default;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const html = renderToString(
    React.createElement(StaticRouter, { location: req.url },
      React.createElement(App)
    )
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});