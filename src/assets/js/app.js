// main.js

import {html, render} from 'lit-html';

import {Store} from './helpers/store.js';

import {tplHeader} from './templates/header.js';
import {tplMain} from './templates/main.js';
import {tplFooter} from './templates/footer.js';

const App = window.App = {
  render: (state) => {
    const tplWrapper = html`<div class="wrapper">
      ${tplHeader(state)}
      ${tplMain(state)}
      ${tplFooter(state)}
    </div>`;
    const result = render(tplWrapper, document.body);
    return result;
  },
  init: async () => {
    try {
      const state = await Store.init();
      App.render(state);
    } catch (err) {
      console.trace(err);
    }
  },
};

App.init();

