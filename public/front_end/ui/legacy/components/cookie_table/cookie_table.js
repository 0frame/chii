import*as e from"../../../../core/common/common.js";import*as t from"../../../../core/i18n/i18n.js";import*as i from"../../../../core/platform/platform.js";import*as o from"../../../../core/root/root.js";import*as r from"../../../../core/sdk/sdk.js";import*as a from"../../../../models/issues_manager/issues_manager.js";import*as s from"../../../../panels/network/forward/forward.js";import*as l from"../../legacy.js";import*as n from"../data_grid/data_grid.js";const d=new CSSStyleSheet;d.replaceSync(".cookies-table{--override-flagged-row-background-color-odd:rgb(247 234 161);--override-flagged-row-background-color-even:rgb(255 240 155)}.-theme-with-dark-background .cookies-table,:host-context(.-theme-with-dark-background) .cookies-table{--override-flagged-row-background-color-odd:rgb(94 81 8);--override-flagged-row-background-color-even:rgb(121 103 0)}.cookies-table .cookie-warning-icon{margin-right:4px}.cookies-table td.flagged-cookie-attribute-cell .cookie-warning-icon{filter:grayscale()}.cookies-table tr.revealed.data-grid-data-grid-node.flagged-cookie-attribute-row:not(.selected):nth-child(odd){background-color:var(--override-flagged-row-background-color-odd)}.cookies-table tr.revealed.data-grid-data-grid-node.flagged-cookie-attribute-row:not(.selected):nth-child(even){background-color:var(--override-flagged-row-background-color-odd)}\n/*# sourceURL=cookiesTable.css */\n");const u={session:"Session",name:"Name",value:"Value",size:"Size",editableCookies:"Editable Cookies",cookies:"Cookies",na:"N/A",showRequestsWithThisCookie:"Show Requests With This Cookie",showIssueAssociatedWithThis:"Show issue associated with this cookie",sourcePortTooltip:"Shows the source port (range 1-65535) the cookie was set on. If the port is unknown, this shows -1.",sourceSchemeTooltip:"Shows the source scheme (`Secure`, `NonSecure`) the cookie was set on. If the scheme is unknown, this shows `Unset`.",timeAfter:"after {date}",timeAfterTooltip:"The expiration timestamp is {seconds}, which corresponds to a date after {date}",opaquePartitionKey:"(opaque)"},c=t.i18n.registerUIStrings("ui/legacy/components/cookie_table/CookiesTable.ts",u),k=t.i18n.getLocalizedString.bind(void 0,c),b=t.i18n.getLazilyComputedLocalizedString.bind(void 0,c)(u.session);class h extends l.Widget.VBox{saveCallback;refreshCallback;deleteCallback;dataGrid;lastEditedColumnId;data;cookieDomain;cookieToBlockedReasons;constructor(e,t,i,a,s){super(),this.element.classList.add("cookies-table"),this.saveCallback=t,this.refreshCallback=i,this.deleteCallback=s;const l=Boolean(t),d=[{id:r.Cookie.Attributes.Name,title:k(u.name),sortable:!0,disclosure:l,sort:n.DataGrid.Order.Ascending,longText:!0,weight:24,editable:l},{id:r.Cookie.Attributes.Value,title:k(u.value),sortable:!0,longText:!0,weight:34,editable:l},{id:r.Cookie.Attributes.Domain,title:"Domain",sortable:!0,weight:7,editable:l},{id:r.Cookie.Attributes.Path,title:"Path",sortable:!0,weight:7,editable:l},{id:r.Cookie.Attributes.Expires,title:"Expires / Max-Age",sortable:!0,weight:7,editable:l},{id:r.Cookie.Attributes.Size,title:k(u.size),sortable:!0,align:n.DataGrid.Align.Right,weight:7},{id:r.Cookie.Attributes.HttpOnly,title:"HttpOnly",sortable:!0,align:n.DataGrid.Align.Center,weight:7,dataType:n.DataGrid.DataType.Boolean,editable:l},{id:r.Cookie.Attributes.Secure,title:"Secure",sortable:!0,align:n.DataGrid.Align.Center,weight:7,dataType:n.DataGrid.DataType.Boolean,editable:l},{id:r.Cookie.Attributes.SameSite,title:"SameSite",sortable:!0,weight:7,editable:l},{id:r.Cookie.Attributes.SameParty,title:"SameParty",sortable:!0,align:n.DataGrid.Align.Center,weight:7,dataType:n.DataGrid.DataType.Boolean,editable:l},{id:r.Cookie.Attributes.PartitionKey,title:"Partition Key",sortable:!0,weight:7,editable:l},{id:r.Cookie.Attributes.Priority,title:"Priority",sortable:!0,sort:n.DataGrid.Order.Descending,weight:7,editable:l}];if(o.Runtime.experiments.isEnabled("experimentalCookieFeatures")){const e=[{id:r.Cookie.Attributes.SourceScheme,title:"SourceScheme",sortable:!0,align:n.DataGrid.Align.Center,weight:7,editable:l},{id:r.Cookie.Attributes.SourcePort,title:"SourcePort",sortable:!0,align:n.DataGrid.Align.Center,weight:7,editable:l}];d.push(...e)}this.dataGrid=l?new n.DataGrid.DataGridImpl({displayName:k(u.editableCookies),columns:d,editCallback:this.onUpdateCookie.bind(this),deleteCallback:this.onDeleteCookie.bind(this),refreshCallback:i}):new n.DataGrid.DataGridImpl({displayName:k(u.cookies),columns:d,editCallback:void 0,deleteCallback:void 0,refreshCallback:void 0}),this.dataGrid.setStriped(!0),this.dataGrid.setName("cookiesTable"),this.dataGrid.addEventListener(n.DataGrid.Events.SortingChanged,this.rebuildTable,this),this.dataGrid.setRowContextMenuCallback(this.populateContextMenu.bind(this)),e&&this.dataGrid.renderInline(),a&&this.dataGrid.addEventListener(n.DataGrid.Events.SelectedNode,a,this),this.lastEditedColumnId=null,this.dataGrid.asWidget().show(this.element),this.data=[],this.cookieDomain="",this.cookieToBlockedReasons=null}wasShown(){this.registerCSSFiles([d])}setCookies(e,t){this.setCookieFolders([{cookies:e,folderName:null}],t)}setCookieFolders(e,t){this.data=e,this.cookieToBlockedReasons=t||null,this.rebuildTable()}setCookieDomain(e){this.cookieDomain=e}selectedCookie(){const e=this.dataGrid.selectedNode;return e?e.cookie:null}getSelectionCookies(){const e=this.dataGrid.selectedNode,t=e&&e.traverseNextNode(!0),i=e&&e.traversePreviousNode(!0);return{current:e&&e.cookie,neighbor:t&&t.cookie||i&&i.cookie}}willHide(){this.lastEditedColumnId=null}findSelectedCookie(e,t){if(!t)return null;const i=e.current,o=t.find((e=>this.isSameCookie(e,i)));if(o)return o;const r=e.neighbor,a=t.find((e=>this.isSameCookie(e,r)));return a||null}isSameCookie(e,t){return null!=t&&t.name()===e.name()&&t.domain()===e.domain()&&t.path()===e.path()}rebuildTable(){const e=this.getSelectionCookies(),t=this.lastEditedColumnId;this.lastEditedColumnId=null,this.dataGrid.rootNode().removeChildren();for(let i=0;i<this.data.length;++i){const o=this.data[i],a=this.findSelectedCookie(e,o.cookies);if(o.folderName){const e={};e[r.Cookie.Attributes.Name]=o.folderName,e[r.Cookie.Attributes.Value]="",e[r.Cookie.Attributes.Size]=this.totalSize(o.cookies),e[r.Cookie.Attributes.Domain]="",e[r.Cookie.Attributes.Path]="",e[r.Cookie.Attributes.Expires]="",e[r.Cookie.Attributes.HttpOnly]="",e[r.Cookie.Attributes.Secure]="",e[r.Cookie.Attributes.SameSite]="",e[r.Cookie.Attributes.SameParty]="",e[r.Cookie.Attributes.SourcePort]="",e[r.Cookie.Attributes.SourceScheme]="",e[r.Cookie.Attributes.Priority]="";const i=new n.DataGrid.DataGridNode(e);i.selectable=!0,this.dataGrid.rootNode().appendChild(i),i.element().classList.add("row-group"),this.populateNode(i,o.cookies,a,t),i.expand()}else this.populateNode(this.dataGrid.rootNode(),o.cookies,a,t)}e.current&&t&&!this.dataGrid.selectedNode&&this.addInactiveNode(this.dataGrid.rootNode(),e.current,t),this.saveCallback&&this.dataGrid.addCreationNode(!1)}populateNode(e,t,i,o){if(e.removeChildren(),t){this.sortCookies(t);for(let r=0;r<t.length;++r){const a=t[r],s=this.createGridNode(a);e.appendChild(s),this.isSameCookie(a,i)&&(s.select(),null!==o&&this.dataGrid.startEditingNextEditableColumnOfDataGridNode(s,o))}}}addInactiveNode(e,t,i){const o=this.createGridNode(t);e.appendChild(o),o.select(),o.setInactive(!0),null!==i&&this.dataGrid.startEditingNextEditableColumnOfDataGridNode(o,i)}totalSize(e){let t=0;for(let i=0;e&&i<e.length;++i)t+=e[i].size();return t}sortCookies(e){const t=this.dataGrid.isSortOrderAscending()?1:-1;function o(e,t){switch(t){case r.Cookie.Attributes.Name:return String(e.name());case r.Cookie.Attributes.Value:return String(e.value());case r.Cookie.Attributes.Domain:return String(e.domain());case r.Cookie.Attributes.Path:return String(e.path());case r.Cookie.Attributes.HttpOnly:return String(e.httpOnly());case r.Cookie.Attributes.Secure:return String(e.secure());case r.Cookie.Attributes.SameSite:return String(e.sameSite());case r.Cookie.Attributes.SameParty:return String(e.sameParty());case r.Cookie.Attributes.PartitionKey:return e.partitionKeyOpaque()?k(u.opaquePartitionKey):String(e.partitionKey());case r.Cookie.Attributes.SourceScheme:return String(e.sourceScheme());default:return String(e.name())}}function a(e,i,o){return t*(e(i)-e(o))}let s;const l=this.dataGrid.sortColumnId()||r.Cookie.Attributes.Name;s=l===r.Cookie.Attributes.Expires?function(e,i){return e.session()!==i.session()?t*(e.session()?1:-1):e.session()?0:e.maxAge()&&i.maxAge()?t*(e.maxAge()-i.maxAge()):e.expires()&&i.expires()?t*(e.expires()-i.expires()):t*(e.expires()?1:-1)}:l===r.Cookie.Attributes.Size?a.bind(null,(e=>e.size())):l===r.Cookie.Attributes.SourcePort?a.bind(null,(e=>e.sourcePort())):l===r.Cookie.Attributes.Priority?function(e,i){const o=["Low","Medium","High"],r=o.indexOf(e.priority()),a=o.indexOf(i.priority());return t*(r-a)}:function(e,r,a){return t*i.StringUtilities.compare(o(r,e),o(a,e))}.bind(null,l),e.sort(s)}createGridNode(e){const i={};let o;if(i[r.Cookie.Attributes.Name]=e.name(),i[r.Cookie.Attributes.Value]=e.value(),e.type()===r.Cookie.Type.Request?(i[r.Cookie.Attributes.Domain]=e.domain()?e.domain():k(u.na),i[r.Cookie.Attributes.Path]=e.path()?e.path():k(u.na)):(i[r.Cookie.Attributes.Domain]=e.domain()||"",i[r.Cookie.Attributes.Path]=e.path()||""),e.maxAge())i[r.Cookie.Attributes.Expires]=t.TimeUtilities.secondsToString(Math.floor(e.maxAge()));else if(e.expires()){const t=e.expires();if(t<0)i[r.Cookie.Attributes.Expires]=b();else{const e=864e13;if(t>e){const a=new Date(e).toISOString();i[r.Cookie.Attributes.Expires]=k(u.timeAfter,{date:a}),o=k(u.timeAfterTooltip,{seconds:t,date:a})}else i[r.Cookie.Attributes.Expires]=new Date(t).toISOString()}}else i[r.Cookie.Attributes.Expires]=e.type()===r.Cookie.Type.Request?k(u.na):b();i[r.Cookie.Attributes.Size]=e.size(),i[r.Cookie.Attributes.HttpOnly]=e.httpOnly(),i[r.Cookie.Attributes.Secure]=e.secure(),i[r.Cookie.Attributes.SameSite]=e.sameSite()||"",i[r.Cookie.Attributes.SameParty]=e.sameParty(),i[r.Cookie.Attributes.SourcePort]=e.sourcePort(),i[r.Cookie.Attributes.SourceScheme]=e.sourceScheme(),i[r.Cookie.Attributes.Priority]=e.priority()||"",i[r.Cookie.Attributes.PartitionKey]=e.partitionKey()||"";const a=this.cookieToBlockedReasons?.get(e),s=new C(i,e,a||null);return o&&s.setExpiresTooltip(o),s.selectable=!0,s}onDeleteCookie(e){e.cookie&&this.deleteCallback&&this.deleteCallback(e.cookie,(()=>this.refresh()))}onUpdateCookie(e,t,i,o){this.lastEditedColumnId=t,this.setDefaults(e),this.isValidCookieData(e.data)?this.saveNode(e):e.setDirty(!0)}setDefaults(e){null===e.data[r.Cookie.Attributes.Name]&&(e.data[r.Cookie.Attributes.Name]=""),null===e.data[r.Cookie.Attributes.Value]&&(e.data[r.Cookie.Attributes.Value]=""),null===e.data[r.Cookie.Attributes.Domain]&&(e.data[r.Cookie.Attributes.Domain]=this.cookieDomain),null===e.data[r.Cookie.Attributes.Path]&&(e.data[r.Cookie.Attributes.Path]="/"),null===e.data[r.Cookie.Attributes.Expires]&&(e.data[r.Cookie.Attributes.Expires]=b()),null===e.data[r.Cookie.Attributes.PartitionKey]&&(e.data[r.Cookie.Attributes.PartitionKey]="")}saveNode(e){const t=e.cookie,i=this.createCookieFromData(e.data);e.cookie=i,this.saveCallback&&this.saveCallback(i,t).then((t=>{t?this.refresh():e.setDirty(!0)}))}createCookieFromData(e){const t=new r.Cookie.Cookie(e[r.Cookie.Attributes.Name],e[r.Cookie.Attributes.Value],null,e[r.Cookie.Attributes.Priority]);return t.addAttribute(r.Cookie.Attributes.Domain,e[r.Cookie.Attributes.Domain]),t.addAttribute(r.Cookie.Attributes.Path,e[r.Cookie.Attributes.Path]),e.expires&&e.expires!==b()&&t.addAttribute(r.Cookie.Attributes.Expires,new Date(e[r.Cookie.Attributes.Expires]).toUTCString()),e[r.Cookie.Attributes.HttpOnly]&&t.addAttribute(r.Cookie.Attributes.HttpOnly),e[r.Cookie.Attributes.Secure]&&t.addAttribute(r.Cookie.Attributes.Secure),e[r.Cookie.Attributes.SameSite]&&t.addAttribute(r.Cookie.Attributes.SameSite,e[r.Cookie.Attributes.SameSite]),e[r.Cookie.Attributes.SameParty]&&t.addAttribute(r.Cookie.Attributes.SameParty),r.Cookie.Attributes.SourceScheme in e&&t.addAttribute(r.Cookie.Attributes.SourceScheme,e[r.Cookie.Attributes.SourceScheme]),r.Cookie.Attributes.SourcePort in e&&t.addAttribute(r.Cookie.Attributes.SourcePort,Number.parseInt(e[r.Cookie.Attributes.SourcePort],10)||void 0),r.Cookie.Attributes.PartitionKey in e&&t.addAttribute(r.Cookie.Attributes.PartitionKey,e[r.Cookie.Attributes.PartitionKey]),t.setSize(e[r.Cookie.Attributes.Name].length+e[r.Cookie.Attributes.Value].length),t}isValidCookieData(e){return(Boolean(e.name)||Boolean(e.value))&&this.isValidDomain(e.domain)&&this.isValidPath(e.path)&&this.isValidDate(e.expires)}isValidDomain(t){if(!t)return!0;const i=e.ParsedURL.ParsedURL.fromString("http://"+t);return null!==i&&i.domain()===t}isValidPath(t){const i=e.ParsedURL.ParsedURL.fromString("http://example.com"+t);return null!==i&&i.path===t}isValidDate(e){return""===e||e===b()||!isNaN(Date.parse(e))}refresh(){this.refreshCallback&&this.refreshCallback()}populateContextMenu(t,i){const o=i.cookie;if(!o)return;const r=o;t.revealSection().appendItem(k(u.showRequestsWithThisCookie),(()=>{const t=s.UIFilter.UIRequestFilter.filters([{filterType:s.UIFilter.FilterType.CookieDomain,filterValue:r.domain()},{filterType:s.UIFilter.FilterType.CookieName,filterValue:r.name()}]);e.Revealer.reveal(t)})),a.RelatedIssue.hasIssues(r)&&t.revealSection().appendItem(k(u.showIssueAssociatedWithThis),(()=>{a.RelatedIssue.reveal(r)}))}}class C extends n.DataGrid.DataGridNode{cookie;blockedReasons;expiresTooltip;constructor(e,t,i){super(e),this.cookie=t,this.blockedReasons=i}createCells(e){super.createCells(e),this.blockedReasons&&this.blockedReasons.length&&e.classList.add("flagged-cookie-attribute-row")}setExpiresTooltip(e){this.expiresTooltip=e}createCell(e){const t=super.createCell(e);e===r.Cookie.Attributes.SourcePort?l.Tooltip.Tooltip.install(t,k(u.sourcePortTooltip)):e===r.Cookie.Attributes.SourceScheme?l.Tooltip.Tooltip.install(t,k(u.sourceSchemeTooltip)):e===r.Cookie.Attributes.Expires&&this.expiresTooltip?l.Tooltip.Tooltip.install(t,this.expiresTooltip):l.Tooltip.Tooltip.install(t,t.textContent||"");let i="";if(this.blockedReasons)for(const t of this.blockedReasons){const o=t.attribute===e,a=!t.attribute&&e===r.Cookie.Attributes.Name;(o||a)&&(i&&(i+="\n"),i+=t.uiString)}if(i){const e=l.Icon.Icon.create("smallicon-info","cookie-warning-icon");l.Tooltip.Tooltip.install(e,i),t.insertBefore(e,t.firstChild),t.classList.add("flagged-cookie-attribute-cell")}return t}}var m=Object.freeze({__proto__:null,CookiesTable:h,DataGridNode:C});export{m as CookiesTable};
