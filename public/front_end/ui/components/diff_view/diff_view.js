import*as e from"../../../core/i18n/i18n.js";import*as i from"../../../third_party/diff/diff.js";import*as n from"../../lit-html/lit-html.js";import*as t from"../code_highlighter/code_highlighter.js";import*as r from"../helpers/helpers.js";const o=new CSSStyleSheet;o.replaceSync(".diff-listing{display:grid;grid-template-columns:max-content max-content max-content auto;font-family:var(--source-code-font-family);font-size:var(--source-code-font-size);white-space:pre;line-height:1.2em}.diff-line-number{color:var(--color-line-number);padding:0 3px 0 9px;text-align:right}.diff-line-marker{border-right:1px solid var(--color-details-hairline);width:20px;text-align:center}.diff-line-content{padding:0 4px}.diff-line-addition,.diff-line-marker-addition{--override-addition-background-color:hsl(144deg 55% 49% / 20%);background-color:var(--override-addition-background-color)}.diff-line-deletion,.diff-line-marker-deletion{--override-deletion-background-color:rgb(255 0 0 / 20%);background-color:var(--override-deletion-background-color)}.diff-line-addition .inner-diff{--override-addition-inner-diff-background-color:hsl(144deg 55% 49% / 30%);background-color:var(--override-addition-inner-diff-background-color)}.diff-line-deletion .inner-diff{--override-deletion-inner-diff-background-color:rgb(255 0 0 / 30%);background-color:var(--override-deletion-inner-diff-background-color)}.diff-hidden-text{display:inline-block;width:0;overflow:hidden}.diff-line-equal{opacity:50%}.diff-line-spacer{--override-spacer-background-color:rgb(0 0 255 / 10%);text-align:center;background-color:var(--override-spacer-background-color)}\n/*# sourceURL=diffView.css */\n");const a={deletions:"Deletion:",additions:"Addition:",changesDiffViewer:"Changes diff viewer",SkippingDMatchingLines:"( … Skipping {PH1} matching lines … )"},d=e.i18n.registerUIStrings("ui/components/diff_view/DiffView.ts",a),l=e.i18n.getLocalizedString.bind(void 0,d);function s(e){const i=new Map;for(let n=0,t=0;t<e.length;t++)i.set(t+1,n),n+=e[t].length+1;return i}class f{originalHighlighter;originalMap;currentHighlighter;currentMap;constructor(e,i,n,t){this.originalHighlighter=e,this.originalMap=i,this.currentHighlighter=n,this.currentMap=t}render(e){return n.html` <div class="diff-listing" aria-label="${l(a.changesDiffViewer)}"> ${e.map((e=>this.renderRow(e)))} </div>`}renderRow(e){const i="equal"===e.type||"deletion"===e.type?String(e.originalLineNumber):"",t="equal"===e.type||"addition"===e.type?String(e.currentLineNumber):"";let r="",o="diff-line-marker",d=null;return"addition"===e.type?(r="+",o+=" diff-line-addition",d=n.html`<span class="diff-hidden-text">${l(a.additions)}</span>`):"deletion"===e.type&&(r="-",o+=" diff-line-deletion",d=n.html`<span class="diff-hidden-text">${l(a.deletions)}</span>`),n.html` <div class="diff-line-number" aria-hidden="true">${i}</div> <div class="diff-line-number" aria-hidden="true">${t}</div> <div class="${o}" aria-hidden="true">${r}</div> <div class="diff-line-content diff-line-${e.type}" data-line-number="${t}">${d}${this.renderRowContent(e)}</div>`}renderRowContent(e){if("spacer"===e.type)return e.tokens.map((e=>n.html`${e.text}`));const[i,t]="deletion"===e.type?[this.originalHighlighter,this.originalMap.get(e.originalLineNumber)]:[this.currentHighlighter,this.currentMap.get(e.currentLineNumber)],r=[];let o=t;for(const t of e.tokens){const e=[];i.highlightRange(o,o+t.text.length,((i,t)=>{e.push(t?n.html`<span class="${t}">${i}</span>`:i)})),r.push(t.className?n.html`<span class="${t.className}">${e}</span>`:n.html`${e}`),o+=t.text.length}return r}static async render(e,r,o){const{originalLines:d,currentLines:c,rows:h}=function(e){let n=0,t=0;const r=[],o=[],d=[];for(let n=0;n<e.length;++n){const t=e[n];switch(t[0]){case i.Diff.Operation.Equal:d.push(...s(t[1],0===n,n===e.length-1)),r.push(...t[1]),o.push(...t[1]);break;case i.Diff.Operation.Insert:for(const e of t[1])d.push(c(e,"addition"));o.push(...t[1]);break;case i.Diff.Operation.Delete:if(r.push(...t[1]),e[n+1]&&e[n+1][0]===i.Diff.Operation.Insert)n++,d.push(...f(t[1].join("\n"),e[n][1].join("\n"))),o.push(...e[n][1]);else for(const e of t[1])d.push(c(e,"deletion"))}}return{originalLines:r,currentLines:o,rows:d};function s(e,i,r){const o=[];if(!i){for(let i=0;i<3&&i<e.length;i++)o.push(c(e[i],"equal"));e.length>7&&!r&&o.push(c(l(a.SkippingDMatchingLines,{PH1:e.length-6}),"spacer"))}if(!r){const r=Math.max(e.length-3-1,i?0:3);let a=e.length-3-1;i||(a-=3),a>0&&(t+=a,n+=a);for(let i=r;i<e.length;i++)o.push(c(e[i],"equal"))}return o}function f(e,n){const t=i.Diff.DiffWrapper.charDiff(e,n,!0),r=[c("","deletion")],o=[c("","addition")];for(const e of t){const n=e[1],t=e[0],a=t===i.Diff.Operation.Equal?"":"inner-diff",d=n.split("\n");for(let e=0;e<d.length;e++)e>0&&t!==i.Diff.Operation.Insert&&r.push(c("","deletion")),e>0&&t!==i.Diff.Operation.Delete&&o.push(c("","addition")),d[e]&&(t!==i.Diff.Operation.Insert&&r[r.length-1].tokens.push({text:d[e],className:a}),t!==i.Diff.Operation.Delete&&o[o.length-1].tokens.push({text:d[e],className:a}))}return r.concat(o)}function c(e,i){return"addition"===i&&n++,"deletion"===i&&t++,"equal"===i&&(t++,n++),{originalLineNumber:t,currentLineNumber:n,tokens:e?[{text:e,className:"inner-diff"}]:[],type:i}}}(e),g=new f(await t.CodeHighlighter.create(d.join("\n"),r),s(d),await t.CodeHighlighter.create(c.join("\n"),r),s(c));n.render(g.render(h),o,{host:this})}}class c extends HTMLElement{static litTagName=n.literal`devtools-diff-view`;#e=this.attachShadow({mode:"open"});loaded;constructor(e){super(),this.#e.adoptedStyleSheets=[o,t.Style.default],this.loaded=e?f.render(e.diff,e.mimeType,this.#e):Promise.resolve()}set data(e){this.loaded=f.render(e.diff,e.mimeType,this.#e)}}r.CustomElements.defineComponent("devtools-diff-view",c);var h=Object.freeze({__proto__:null,DiffView:c});export{h as DiffView};
