import*as e from"../../../core/common/common.js";import*as n from"../../../ui/components/helpers/helpers.js";import*as t from"../../../core/i18n/i18n.js";import*as s from"../../../ui/lit-html/lit-html.js";import*as i from"../../../ui/components/settings/settings.js";import*as o from"../../../core/sdk/sdk.js";const a=new CSSStyleSheet;a.replaceSync(":host{break-inside:avoid;display:block;padding-bottom:9px;width:288px}fieldset{border:0;margin-left:20px;padding:0}legend{color:var(--color-text-secondary);font-size:120%;margin-left:-20px;padding:0;text-align:left}.link{color:var(--color-link);text-decoration:underline;cursor:pointer;padding:2px 0}img{background-size:32px 32px;border:0;border-radius:50%;display:block;height:32px;width:32px}.warning{display:block;margin-top:12px}.account-info{display:flex;align-items:center;margin-top:12px}.account-email{display:flex;flex-direction:column;margin-left:8px}\n/*# sourceURL=syncSection.css */\n");const c={syncDisabled:"To turn this setting on, you must enable Chrome sync.",preferencesSyncDisabled:"To turn this setting on, you must first enable settings sync in Chrome.",settings:"Go to Settings",signedIn:"Signed into Chrome as:"},r=t.i18n.registerUIStrings("panels/settings/components/SyncSection.ts",c),l=t.i18n.getLocalizedString.bind(void 0,r);class d extends HTMLElement{static litTagName=s.literal`devtools-sync-section`;shadow=this.attachShadow({mode:"open"});syncInfo={isSyncActive:!1};syncSetting;boundRender=this.render.bind(this);connectedCallback(){this.shadow.adoptedStyleSheets=[a]}set data(e){this.syncInfo=e.syncInfo,this.syncSetting=e.syncSetting,n.ScheduledRender.scheduleRender(this,this.boundRender)}render(){if(!this.syncSetting)throw new Error("SyncSection not properly initialized");const n=!this.syncInfo.isSyncActive||!this.syncInfo.arePreferencesSynced;s.render(s.html` <fieldset> <legend>${e.Settings.getLocalizedSettingsCategory(e.Settings.SettingCategory.SYNC)}</legend> ${function(e){if(!e.isSyncActive){const e="chrome://settings/syncSetup";return s.html` <span class="warning"> ${l(c.syncDisabled)} <a href="${e}" class="link" target="_blank" @click="${n=>g(e,n)}" @keydown="${n=>g(e,n)}">${l(c.settings)} </a></span>`}if(!e.arePreferencesSynced){const e="chrome://settings/syncSetup/advanced";return s.html` <span class="warning"> ${l(c.preferencesSyncDisabled)} <a href="${e}" class="link" target="_blank" @click="${n=>g(e,n)}" @keydown="${n=>g(e,n)}">${l(c.settings)} </a></span>`}return s.html` <div class="account-info"> <img src="data:image/png;base64, ${e.accountImage}" alt="Account avatar"> <div class="account-email"> <span>${l(c.signedIn)}</span> <span>${e.accountEmail}</span> </div> </div>`}(this.syncInfo)} <${i.SettingCheckbox.SettingCheckbox.litTagName} .data="${{setting:this.syncSetting,disabled:n}}"> </${i.SettingCheckbox.SettingCheckbox.litTagName}> </fieldset> `,this.shadow,{host:this})}}function g(e,n){if("click"===n.type||"keydown"===n.type&&self.isEnterOrSpaceKey(n)){const t=o.TargetManager.TargetManager.instance().mainTarget();t&&t.targetAgent().invoke_createTarget({url:e}),n.consume(!0)}}n.CustomElements.defineComponent("devtools-sync-section",d);var p=Object.freeze({__proto__:null,SyncSection:d});export{p as SyncSection};
