// templates --> header.js

import {html} from 'lit-html';


export const tplHeader = (state) => {
  return html`<header>
    <h1>${state.title}</h1>
    </header>`
  ;
};

