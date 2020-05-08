!function(){const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},i={},r={},a=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${o}`);class c{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,c=0;const{strings:h,values:{length:m}}=t;for(;c<m;){const t=i.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)d(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=h[c],n=p.exec(e)[2],s=n.toLowerCase()+"$lit$",i=t.getAttribute(s);t.removeAttribute(s);const r=i.split(l);this.parts.push({type:"attribute",index:o,name:n,strings:r}),c+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const s=t.parentNode,i=e.split(l),r=i.length-1;for(let e=0;e<r;e++){let n,r=i[e];if(""===r)n=u();else{const t=p.exec(r);null!==t&&d(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(r)}s.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(u(),t),n.push(t)):t.data=i[r],c+=r}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(u(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),c++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),c++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const d=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},h=t=>-1!==t.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,a=0,o=0,l=i.nextNode();for(;a<s.length;)if(r=s[a],h(r)){for(;o<r.index;)o++,"TEMPLATE"===l.nodeName&&(e.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=e.pop(),l=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));a++}else this.__parts.push(void 0),a++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}const g=` ${a} `;class f{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const r=p.exec(t);e+=null===r?t+(n?g:o):t.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+a}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const v=t=>null===t||!("object"==typeof t||"function"==typeof t),_=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class b{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(v(t)||!_(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===i||v(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=i,t(this)}this.value!==i&&this.committer.commit()}}class y{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}const t=this.__pendingValue;t!==i&&(v(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):_(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const n=new m(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)n=e[s],void 0===n&&(n=new y(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class w{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=i}}class N extends b{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new $(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class $ extends x{}let E=!1;(()=>{try{const t={get capture(){return E=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class V{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=this.__pendingValue,n=this.value,s=null==t||null!=n&&(t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive),r=null!=t&&(null==n||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=A(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=i}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(E?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const M=new class{handleAttributeExpressions(t,e,n,s){const i=e[0];if("."===i){return new N(t,e.slice(1),n).parts}return"@"===i?[new V(t,e.slice(1),s.eventContext)]:"?"===i?[new w(t,e.slice(1),n)]:new b(t,e,n).parts}handleTextExpression(t){return new y(t)}};function T(t){let e=k.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},k.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(a);return n=e.keyString.get(s),void 0===n&&(n=new c(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const k=new Map,S=new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const I=(t,...e)=>new f(t,e,"html",M),L=t=>({}.toString.call(t)),P=t=>Array.isArray(t),C=t=>"[object Object]"===L(t)&&!P(t),j=(t,e)=>!(!t||!e)&&Object.prototype.hasOwnProperty.call(t,e),O=t=>{const e="[object Number]"===L(t)?String(t):t;if(!(t=>"[object String]"===L(t))(e))throw new Error("InvalidInput: String required.");return e},H=(new Date).getTimezoneOffset(),B=((()=>{const t=Math.abs(H/60);["GMT",H<0?"+":"-",String(t).padStart(4,"0")].join("")})(),t=>{if((t=>t instanceof Date&&!isNaN(t.valueOf()))(t))return new Date(t.valueOf());const e=t=>{const e=Object.create({});for(const n in t)j(t,n)&&(e[n]=B(t[n]));return e},n=t=>[...t].map(t=>P(t)?n(t):C(t)?e(t):B(t));return P(t)?n(t):C(t)?e(t):t});var D=(()=>{const t={url:"",links:[],title:"",description:"",image:"",author:"",content:"",source:"",published:""},e={title:"Article Parser",author:"@ndaidong",authorLink:"https://twitter.com/ndaidong",overlayMessage:"",parserMessage:"",article:B(t)},n=()=>(e.parserMessage="",e.article=B(t),e),s=()=>e;return{init:async()=>(n(),s()),setOverlayMessage:t=>(e.overlayMessage=t,e),setParserMessage:t=>(e.parserMessage=t,e),setArticle:t=>(e.article=t,e),unsetArticle:n,getState:s}})();var W=async t=>{try{const e="https://us-central1-technews-251304.cloudfunctions.net/article-parser?url="+encodeURIComponent(t);return(await fetch(e)).json()}catch(t){console.trace(t)}};const R="\n  html, body {\n    margin: 0px;\n    padding: {PADDING}px;\n    background-color: #fefefd;\n    overflow-x: hidden;\n  }\n  iframe {\n    width: 100%;\n    height: 100%;\n  }\n  img {\n    max-width: 100%;\n  }\n";var F=(t,e)=>{const n=t.match(/^<iframe(.*)<\/iframe>/i)?0:10,s=R.replace("{PADDING}",n),i=e.contentWindow.document;i.open(),i.write(`\n    <html>\n      <head>\n        <style>${s}</style>\n      </head>\n      <body>${t}</body>\n    </html>`),i.close()};const U=new WeakMap,G=(q=t=>e=>{if(!(e instanceof y))throw new Error("unsafeHTML can only be used in text bindings");const n=U.get(e);if(void 0!==n&&v(t)&&t===n.value&&e.value===n.fragment)return;const s=document.createElement("template");s.innerHTML=t;const i=document.importNode(s.content,!0);e.setValue(i),U.set(e,{value:t,fragment:i})},(...e)=>{const n=q(...e);return t.set(n,!0),n});var q;const z=t=>t?`<a href="${t}" target="_blank">${((t,e)=>{const n=O(t),s=e||140;if(n.length<=s)return n;let i=n.substring(0,s);const r=i.split(" ");let a="";return r.length>1?(r.pop(),a+=r.join(" "),a.length<n.length&&(a+="...")):(i=i.substring(0,s-3),a=i+"..."),a})(t,120)}</a>`:"",J=()=>{document.getElementById("inputUrl").value=""},K=t=>{return I`<main>
    <form @submit=${e=>((t,e)=>{t.preventDefault();const n=document.getElementById("btnExtract");if(n.classList.contains("disable"))return!1;const s=document.getElementById("inputUrl").value.trim(),{links:i=[]}=e.article;if(i.includes(s))return!1;window.App.parse(s,n)})(e,t)}">
      <fieldset class="input">
        <legend>Enter link to your favorite article:</legend>
        <input
          type="url"
          @dblclick=${J}
          id="inputUrl"
          placeholder="https://..."
        >
        <button type="submit" id="btnExtract">Extract</button>
      </fieldset>
    </form>
    <div class="notice">
      ${(t=>{const e=encodeURIComponent("Extraction failed");return""===t.parserMessage?"":I`
    <span class="error">${t.parserMessage}</span>
    <a href="https://github.com/ndaidong/article-parser/issues/new?title=${e}" target="_blank">Report</a>
  `})(t)}
    </div>
    <fieldset class="output">
      <legend>Result will display here:</legend>
      <table>
        <tr>
          <td>
            <label>title</label>
          </td>
          <td class="ap-present">
            ${G(t.article.title)}
          </td>
        </tr>
        <tr>
          <td>
            <label>description</label>
          </td>
          <td class="ap-present">
            ${G(t.article.description)}
          </td>
        </tr>
        <tr>
          <td>
            <label>image</label>
          </td>
          <td class="ap-present">
            ${s=t.article.image,""===s?"":G(`\n    <a href="${s}" target="_blank">\n      <img src="${s}" class="responsive image">\n    </a>\n  `)}
          </td>
        </tr>
        <tr>
          <td>
            <label>content</label>
          </td>
          <td class="ap-present">
            ${n=t.article.content,""===n?"":G('\n    <iframe id="ifcontent"></iframe>\n  ')}
          </td>
        </tr>
        <tr>
          <td>
            <label>author</label>
          </td>
          <td class="ap-present">
            ${t.article.author}
          </td>
        </tr>
        <tr>
          <td>
            <label>source</label>
          </td>
          <td class="ap-present">
            ${t.article.source}
          </td>
        </tr>
        <tr>
          <td>
            <label>published</label>
          </td>
          <td class="ap-present">
            ${t.article.published}
          </td>
        </tr>
        <tr>
          <td>
            <label>url</label>
          </td>
          <td class="ap-present">
            ${G(z(t.article.url))}
          </td>
        </tr>
        <tr>
          <td>
            <label>links</label>
          </td>
          <td class="ap-present">
            ${G((e=t.article.links,0===e.length?"":(t=>{const e=[];return t.forEach(t=>{e.push(`<li>${z(t)}</li>`)}),"<ul>"+e.join("")+"</ul>"})(e)))}
          </td>
        </tr>
      </table>
    </fieldset>
  </main>`;var e,n,s},Q=()=>{window.location.reload()},X=t=>t.overlayMessage?I`
    <div class="overlay">
      <div class="inner">
        <div class="full under"></div>
        <div class="full over">
          <div class="msg-box">
            ${t.overlayMessage}
            <br>
            Please 
              <span
                class="ctrl"
                @click=${Q}>reload page</span> 
            to get new one.
          </div>
        </div>
      </div>
    </div>
  `:"",Y=window.App={render:t=>((t,e,n)=>{let i=S.get(e);void 0===i&&(s(e,e.firstChild),S.set(e,i=new y(Object.assign({templateFactory:T},n))),i.appendInto(e)),i.setValue(t),i.commit()})(I`<div class="wrapper">
      ${(t=>I`<header>
    <h1><a href="https://github.com/ndaidong/article-parser">${t.title}</a></h1>
    </header>`)(t)}
      ${K(t)}
      ${(t=>I`<footer>
      <hr>
      <div class="copyright">
          <a href="${t.authorLink}" target="twitter">${t.author}</a>
      </div>
    </footer>`)(t)}
      ${X(t)}
    </div>`,document.body),parse:async(t,e)=>{var n;(n=e).classList.add("disable"),n.textContent="Extracting...",n.disabled=!0;const s=D.unsetArticle();Y.render(s);const i=await W(t);if(i.error){const t=D.setParserMessage(i.message);Y.render(t)}else{const{data:t}=i,e=D.setArticle(t);Y.render(e);const n=document.getElementById("ifcontent");n&&e.article.content&&F(e.article.content,n)}(t=>{t.classList.remove("disable"),t.textContent="Extract",t.disabled=!1})(e)},init:async()=>{try{const t=await D.init();Y.render(t)}catch(t){console.trace(t)}}};Y.init()}();