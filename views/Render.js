import ReactDOM from 'react-dom';
import React from 'react';

export function renderDOM(app) {
  ReactDOM.render(
    <React.StrictMode>{app}</React.StrictMode>,
    document.getElementById('root')
  );
}