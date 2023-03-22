import*as e from"../../../../core/i18n/i18n.js";import*as t from"../../../../ui/components/buttons/buttons.js";import*as a from"../../../../ui/components/helpers/helpers.js";import*as r from"../../../../ui/lit-html/lit-html.js";import*as n from"../../../../ui/components/icon_button/icon_button.js";import*as i from"../utils/utils.js";const o=new CSSStyleSheet;o.replaceSync(":host{--client-hints-form-icon-color:var(--color-text-primary)}.root{color:var(--color-text-primary);width:100%}.tree-title{font-weight:700;display:flex;align-items:center}.rotate-icon{transform:rotate(-90deg)}.form-container{display:grid;grid-template-columns:1fr 1fr 1fr auto;align-items:center;column-gap:10px;row-gap:8px;padding:0 10px}.full-row{grid-column:1/5}.half-row{grid-column:span 2}.mobile-checkbox-container{display:flex}.device-model-input{grid-column:1/4}.input-field{color:var(--color-text-primary);padding:3px 6px;border:none;border-radius:2px;box-shadow:var(--legacy-focus-ring-inactive-shadow);background-color:var(--color-background);font-size:inherit;height:18px}.input-field:focus{box-shadow:var(--legacy-focus-ring-active-shadow);outline-width:0}.add-container{cursor:pointer;display:flex;align-items:center;gap:6px}.add-icon{margin-right:5px}.delete-icon{cursor:pointer}.brand-row{display:flex;align-items:center;gap:10px;justify-content:space-between}.brand-row>input{width:100%}.info-link{display:flex;align-items:center;margin-left:5px}.hide-container{display:none}.input-field-label-container{display:flex;flex-direction:column;gap:10px}@media (forced-colors:active){:host{--client-hints-form-icon-color:fieldtext}.input-field{border:1px solid}.tree-title[aria-disabled=true]{color:GrayText}}\n/*# sourceURL=userAgentClientHintsForm.css */\n");const s={title:"User agent client hints",brands:"Brands",brandProperties:"Brand properties",brandName:"Brand",brandNameAriaLabel:"Brand {PH1}",version:"Version",brandVersionAriaLabel:"Version {PH1}",addBrand:"Add Brand",deleteTooltip:"Delete",brandDeleteAriaLabel:"Delete {PH1}",fullBrowserVersion:"Full browser version",fullBrowserVersionPlaceholder:"Full browser version (e.g. 87.0.4280.88)",platformLabel:"Platform",platformProperties:"Platform properties",platformVersion:"Platform version",platformPlaceholder:"Platform (e.g. Android)",architecture:"Architecture",architecturePlaceholder:"Architecture (e.g. x86)",deviceProperties:"Device properties",deviceModel:"Device model",mobileCheckboxLabel:"Mobile",update:"Update",notRepresentable:"Not representable as structured headers string.",userAgentClientHintsInfo:"User agent client hints are an alternative to the user agent string that identify the browser and the device in a more structured way with better privacy accounting. Click the button to learn more.",addedBrand:"Added brand row",deletedBrand:"Deleted brand row"},l=e.i18n.registerUIStrings("panels/settings/emulation/components/UserAgentClientHintsForm.ts",s),d=e.i18n.getLocalizedString.bind(void 0,l);class c extends Event{static eventName="clienthintschange";constructor(){super(c.eventName)}}class h extends Event{static eventName="clienthintssubmit";detail;constructor(e){super(h.eventName),this.detail={value:e}}}const p={brands:[{brand:"",version:""}],fullVersion:"",platform:"",platformVersion:"",architecture:"",model:"",mobile:!1};class u extends HTMLElement{static litTagName=r.literal`devtools-user-agent-client-hints-form`;shadow=this.attachShadow({mode:"open"});isFormOpened=!1;isFormDisabled=!1;metaData=p;showMobileCheckbox=!1;showSubmitButton=!1;brandsModifiedAriaMessage="";connectedCallback(){this.shadow.adoptedStyleSheets=[o]}set value(e){const{metaData:t=p,showMobileCheckbox:a=!1,showSubmitButton:r=!1}=e;this.metaData={...this.metaData,...t},this.showMobileCheckbox=a,this.showSubmitButton=r,this.render()}get value(){return{metaData:this.metaData}}set disabled(e){this.isFormDisabled=e,this.isFormOpened=!1,this.render()}get disabled(){return this.isFormDisabled}handleTreeExpand=e=>{"Space"!==e.code&&"Enter"!==e.code&&"ArrowLeft"!==e.code&&"ArrowRight"!==e.code||(e.stopPropagation(),this.handleTreeClick(e.code))};handleTreeClick=e=>{this.isFormDisabled||"ArrowLeft"===e&&!this.isFormOpened||"ArrowRight"===e&&this.isFormOpened||(this.isFormOpened=!this.isFormOpened,this.render())};handleBrandInputChange=(e,t,a)=>{const r=this.metaData.brands?.map(((r,n)=>{if(n===t){const{brand:t,version:n}=r;return"brandName"===a?{brand:e,version:n}:{brand:t,version:e}}return r}));this.metaData={...this.metaData,brands:r},this.dispatchEvent(new c),this.render()};handleBrandDelete=e=>{const{brands:t=[]}=this.metaData;t.splice(e,1),this.metaData={...this.metaData,brands:t},this.dispatchEvent(new c),this.brandsModifiedAriaMessage=d(s.deletedBrand),this.render();let a=this.shadowRoot?.getElementById(`brand-${e+1}-input`);a||(a=this.shadowRoot?.getElementById("add-brand-button")),a?.focus()};handleAddBrandClick=()=>{const{brands:e}=this.metaData;this.metaData={...this.metaData,brands:[...Array.isArray(e)?e:[],{brand:"",version:""}]},this.dispatchEvent(new c),this.brandsModifiedAriaMessage=d(s.addedBrand),this.render();const t=this.shadowRoot?.querySelectorAll(".brand-name-input");if(t){const e=Array.from(t).pop();e&&e.focus()}};handleAddBrandKeyPress=e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),this.handleAddBrandClick())};handleInputChange=(e,t)=>{e in this.metaData&&(this.metaData={...this.metaData,[e]:t},this.render()),this.dispatchEvent(new c)};handleLinkPress=e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),e.target.click())};handleSubmit=e=>{e.preventDefault(),this.showSubmitButton&&(this.dispatchEvent(new h(this.metaData)),this.render())};renderInputWithLabel(e,t,a,n){return r.html` <label class="full-row label input-field-label-container"> ${e} <input class="input-field" type="text" @input="${e=>{const t=e.target.value;this.handleInputChange(n,t)}}" .value="${a}" placeholder="${t}"> </label> `}renderPlatformSection(){const{platform:e,platformVersion:t}=this.metaData;return r.html` <span class="full-row label">${d(s.platformLabel)}</span> <div class="full-row brand-row" aria-label="${d(s.platformProperties)}" role="group"> <input class="input-field half-row" type="text" @input="${e=>{const t=e.target.value;this.handleInputChange("platform",t)}}" .value="${e}" placeholder="${d(s.platformPlaceholder)}" aria-label="${d(s.platformLabel)}"> <input class="input-field half-row" type="text" @input="${e=>{const t=e.target.value;this.handleInputChange("platformVersion",t)}}" .value="${t}" placeholder="${d(s.platformVersion)}" aria-label="${d(s.platformVersion)}"> </div> `}renderDeviceModelSection(){const{model:e,mobile:t}=this.metaData,a=this.showMobileCheckbox?r.html` <label class="mobile-checkbox-container"> <input type="checkbox" @input="${e=>{const t=e.target.checked;this.handleInputChange("mobile",t)}}" .checked="${t}"> ${d(s.mobileCheckboxLabel)} </label> `:r.html``;return r.html` <span class="full-row label">${d(s.deviceModel)}</span> <div class="full-row brand-row" aria-label="${d(s.deviceProperties)}" role="group"> <input class="input-field ${this.showMobileCheckbox?"device-model-input":"full-row"}" type="text" @input="${e=>{const t=e.target.value;this.handleInputChange("model",t)}}" .value="${e}" placeholder="${d(s.deviceModel)}"> ${a} </div> `}renderBrands(){const{brands:e=[{brand:"",version:""}]}=this.metaData,t=e.map(((e,t)=>{const{brand:a,version:i}=e,o=()=>{this.handleBrandDelete(t)};return r.html` <div class="full-row brand-row" aria-label="${d(s.brandProperties)}" role="group"> <input class="input-field brand-name-input" type="text" @input="${e=>{const a=e.target.value;this.handleBrandInputChange(a,t,"brandName")}}" .value="${a}" id="brand-${t+1}-input" placeholder="${d(s.brandName)}" aria-label="${d(s.brandNameAriaLabel,{PH1:t+1})}"> <input class="input-field" type="text" @input="${e=>{const a=e.target.value;this.handleBrandInputChange(a,t,"brandVersion")}}" .value="${i}" placeholder="${d(s.version)}" aria-label="${d(s.brandVersionAriaLabel,{PH1:t+1})}"> <${n.Icon.Icon.litTagName} .data="${{color:"var(--client-hints-form-icon-color)",iconName:"trash_bin_icon",width:"10px",height:"14px"}}" title="${d(s.deleteTooltip)}" class="delete-icon" tabindex="0" role="button" @click="${o}" @keypress="${e=>{"Space"!==e.code&&"Enter"!==e.code||(e.preventDefault(),o())}}" aria-label="${d(s.brandDeleteAriaLabel,{PH1:t+1})}"> </${n.Icon.Icon.litTagName}> </div> `}));return r.html` <span class="full-row label">${d(s.brands)}</span> ${t} <div class="add-container full-row" role="button" tabindex="0" id="add-brand-button" aria-label="${d(s.addBrand)}" @click="${this.handleAddBrandClick}" @keypress="${this.handleAddBrandKeyPress}"> <${n.Icon.Icon.litTagName} aria-hidden="true" .data="${{color:"var(--client-hints-form-icon-color)",iconName:"add-icon",width:"10px"}}"> </${n.Icon.Icon.litTagName}> ${d(s.addBrand)} </div> `}render(){const{fullVersion:e,architecture:a}=this.metaData,i=this.renderBrands(),o=this.renderInputWithLabel(d(s.fullBrowserVersion),d(s.fullBrowserVersionPlaceholder),e||"","fullVersion"),l=this.renderPlatformSection(),c=this.renderInputWithLabel(d(s.architecture),d(s.architecturePlaceholder),a,"architecture"),h=this.renderDeviceModelSection(),p=this.showSubmitButton?r.html` <${t.Button.Button.litTagName} .variant="${"secondary"}" .type="${"submit"}"> ${d(s.update)} </${t.Button.Button.litTagName}> `:r.html``,u=r.html` <section class="root"> <div class="tree-title" role="button" @click="${this.handleTreeClick}" tabindex="0" @keydown="${this.handleTreeExpand}" aria-expanded="${this.isFormOpened}" aria-controls="form-container" @disabled="${this.isFormDisabled}" aria-disabled="${this.isFormDisabled}"> <${n.Icon.Icon.litTagName} class="${this.isFormOpened?"":"rotate-icon"}" .data="${{color:"var(--client-hints-form-icon-color)",iconName:"chromeSelect",width:"20px"}}"> </${n.Icon.Icon.litTagName}> ${d(s.title)} <x-link tabindex="0" href="https://web.dev/user-agent-client-hints/" target="_blank" class="info-link" @keypress="${this.handleLinkPress}" aria-label="${d(s.userAgentClientHintsInfo)}"> <${n.Icon.Icon.litTagName} .data="${{color:"var(--client-hints-form-icon-color)",iconName:"ic_info_black_18dp",width:"14px"}}"> </${n.Icon.Icon.litTagName}> </x-link> </div> <form id="form-container" class="form-container ${this.isFormOpened?"":"hide-container"}" @submit="${this.handleSubmit}"> ${i} ${o} ${l} ${c} ${h} ${p} </form> <div aria-live="polite" aria-label="${this.brandsModifiedAriaMessage}"></div> </section> `;r.render(u,this.shadow,{host:this})}validate=()=>{for(const[e,t]of Object.entries(this.metaData))if("brands"===e){const e=this.metaData.brands?.every((({brand:e,version:t})=>{const a=i.UserAgentMetadata.validateAsStructuredHeadersString(e,d(s.notRepresentable)),r=i.UserAgentMetadata.validateAsStructuredHeadersString(t,d(s.notRepresentable));return a.valid&&r.valid}));if(!e)return{valid:!1,errorMessage:d(s.notRepresentable)}}else{const e=i.UserAgentMetadata.validateAsStructuredHeadersString(t,d(s.notRepresentable));if(!e.valid)return e}return{valid:!0}}}a.CustomElements.defineComponent("devtools-user-agent-client-hints-form",u);var m=Object.freeze({__proto__:null,ClientHintsChangeEvent:c,ClientHintsSubmitEvent:h,UserAgentClientHintsForm:u});export{m as UserAgentClientHintsForm};
