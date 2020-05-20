// templates --> main.js

import {truncate} from 'bellajs';

import {html} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

const showImage = (src) => {
  return src === '' ? '' : unsafeHTML(`
    <a href="${src}" target="_blank">
      <img src="${src}" class="responsive image">
    </a>
  `);
};

const showArticle = (content) => {
  return content === '' ? '' : unsafeHTML(`
    <iframe id="ifcontent"></iframe>
  `);
};

const showLink = (url) => {
  return url ? `<a href="${url}" target="_blank">${truncate(url, 120)}</a>` : '';
};

const listLink = (urls) => {
  const renderList = (links) => {
    const arr = [];
    links.forEach((link) => {
      arr.push(`<li>${showLink(link)}</li>`);
    });
    return '<ul>' + arr.join('') + '</ul>';
  };
  return urls.length === 0 ? '' : renderList(urls);
};

const dplNotice = (state) => {
  const title = encodeURIComponent('Extraction failed');
  return state.parserMessage === '' ? '' : html`
    <span class="error">${state.parserMessage}</span>
    <a href="https://github.com/ndaidong/article-parser/issues/new?title=${title}" target="_blank">Report</a>
  `;
};


const clearInput = () => {
  const inputUrl = document.getElementById('inputUrl');
  inputUrl.value = '';
};

const onSubmit = (e, state) => {
  e.preventDefault();
  const btnExtract = document.getElementById('btnExtract');
  if (btnExtract.classList.contains('disable')) {
    return false;
  }
  const inputUrl = document.getElementById('inputUrl');
  const url = inputUrl.value.trim();
  const {
    links = [],
  } = state.article;
  if (links.includes(url)) {
    return false;
  }
  window.App.parse(url, btnExtract);
};


export const tplMain = (state) => {
  return html`<main>
    <form @submit=${(e) => onSubmit(e, state)}">
      <fieldset class="input">
        <legend>Enter link to your favorite article:</legend>
        <input
          type="url"
          @dblclick=${clearInput}
          id="inputUrl"
          placeholder="https://..."
        >
        <button type="submit" id="btnExtract">Extract</button>
      </fieldset>
    </form>
    <div class="notice">
      ${dplNotice(state)}
    </div>
    <fieldset class="output">
      <legend>Result will display here:</legend>
      <table>
        <tr>
          <td>
            <label>title</label>
          </td>
          <td class="ap-present">
            ${unsafeHTML(state.article.title)}
          </td>
        </tr>
        <tr>
          <td>
            <label>description</label>
          </td>
          <td class="ap-present">
            ${unsafeHTML(state.article.description)}
          </td>
        </tr>
        <tr>
          <td>
            <label>image</label>
          </td>
          <td class="ap-present">
            ${showImage(state.article.image)}
          </td>
        </tr>
        <tr>
          <td>
            <label>content</label>
          </td>
          <td class="ap-present">
            ${showArticle(state.article.content)}
          </td>
        </tr>
        <tr>
          <td>
            <label>author</label>
          </td>
          <td class="ap-present">
            ${state.article.author}
          </td>
        </tr>
        <tr>
          <td>
            <label>source</label>
          </td>
          <td class="ap-present">
            ${state.article.source}
          </td>
        </tr>
        <tr>
          <td>
            <label>published</label>
          </td>
          <td class="ap-present">
            ${state.article.published}
          </td>
        </tr>
        <tr>
          <td>
            <label>url</label>
          </td>
          <td class="ap-present">
            ${unsafeHTML(showLink(state.article.url))}
          </td>
        </tr>
        <tr>
          <td>
            <label>links</label>
          </td>
          <td class="ap-present">
            ${unsafeHTML(listLink(state.article.links))}
          </td>
        </tr>
      </table>
    </fieldset>
  </main>`;
};

