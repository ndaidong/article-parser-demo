// templates --> main.js

import {html} from 'lit-html';


const showLink = (url) => {
  return url ? `<a href="${url}" target="_blank">${url}</a>` : '';
};

export const tplMain = (state) => {
  return html`<main>
    <form onsubmit="return false;">
      <fieldset class="input">
        <legend>Please enter a valid URL</legend>
        <input type="url" id="inputUrl" placeholder="https://...">
        <button type="submit" id="btnExtract">Extract</button>
      </fieldset>
    </form>
    <fieldset class="output">
      <legend>Result</legend>
      <section>
        <label>url</label>
        <div class="ap-present">${showLink(state.article.url)}</div>
      </section>
      <section>
        <label>title</label>
        <div class="ap-present">${state.article.title}</div>
      </section>
      <section>
        <label>description</label>
        <div class="ap-present">${state.article.description}</div>
      </section>
      <section>
        <label>image</label>
        <div class="ap-present">${state.article.image}</div>
      </section>
      <section>
        <label>author</label>
        <div class="ap-present">${state.article.author}</div>
      </section>
      <section>
        <label>content</label>
        <div class="ap-present">${state.article.content}</div>
      </section>
      <section>
        <label>source</label>
        <div class="ap-present">${state.article.source}</div>
      </section>
      <section>
        <label>published</label>
        <div class="ap-present">${state.article.published}</div>
      </section>
      <section>
        <label>links</label>
        <div class="ap-present">${state.article.links.map(showLink)}</div>
      </section>
    </fieldset>
    <hr>
  </main>`;
};

