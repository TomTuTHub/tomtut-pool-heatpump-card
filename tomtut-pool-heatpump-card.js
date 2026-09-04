const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:d}=Object,_=globalThis,u=_.trustedTypes,f=u?u.emptyScript:"",g=_.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,g?.({ReactiveElement:y}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,T=document,z=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,Q=T.createTreeWalker(T,129);function G(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=M;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===M?"!--"===l[1]?o=H:void 0!==l[1]?o=L:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=r??M,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?R:'"'===l[3]?B:W):o===B||o===W?o=R:o===H||o===L?o=M:(o=R,r=void 0);const p=o===R&&t[e+1].startsWith("/>")?" ":"";n+=o===M?i+P:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+k+p):i+k+(-2===c?e:p)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=q.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[n++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),Q.nextNode(),a.push({type:2,index:++r});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===j)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);Q.currentNode=s;let r=Q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new J(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=Q.nextNode(),n++)}return Q.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new J(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=K(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=K(this,s[i+o],e,o),a===j&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Y{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??V)===j)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(q,J),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new J(e.insertBefore(z(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");
/*!
 * tomtut-pool-heatpump-card.js — generische Lovelace Custom Card fuer Pool-Waermepumpen
 *
 * Keine Integration noetig: alle Werte kommen aus frei konfigurierbaren Entities
 * (climate / number / sensor / switch). Hintergrundbilder liegen im Card-Repo und
 * werden von HACS nach www/community/tomtut-pool-heatpump-card/ kopiert.
 *
 * Aufbau, Look und Positions-System sind an tomtut-pool-dosing-vigipool-card angelehnt.
 */
const lt={fan_top:45,fan_left:50,fan_size:34,fan_speed:60,fan_color:"black",fan_inactive:"gray",fan_power_threshold:100,power_btn_top:6,power_btn_left:5,power_btn_scale:100,power_top:6,power_left:50,power_scale:95,power_box:!0,power_color:"white",power_label:!0,power_decimals:0,current_bottom:6,current_left:28,current_scale:100,current_box:!0,current_color:"white",current_label:!0,target_bottom:6,target_left:72,target_scale:100,target_box:!0,target_color:"white",target_label:!0,target_step:.5,label_top:18,label_left:50,label_scale:100,label_box:!0,label_color:"white"},ct={weiss:"waermepumpe_weiss.png",schwarz:"waermepumpe_schwarz.png",transparent:"waermepumpe_transparent.png"},ht=["on","true","heat","cool","heating","cooling","auto","dry","fan_only","open","home"],pt=(t,e)=>Number(t).toFixed(e).replace(".",",");class dt extends ot{static properties={hass:{attribute:!1},_config:{state:!0},_confirmOpen:{state:!0}};setConfig(t){if(!t)throw new Error("Ungueltige Konfiguration");if(!(t.switch_entity||t.power_entity||t.target_entity||t.current_entity))throw new Error("Mindestens eine Entity noetig: switch_entity, power_entity, target_entity oder current_entity");this._config={image_variant:"transparent",...t},this._confirmOpen=!1}static getConfigElement(){return document.createElement("tomtut-pool-heatpump-card-editor")}static getStubConfig(){return{image_variant:"transparent",switch_entity:"",power_entity:"",target_entity:"",current_entity:"",label_text:"Pool-Waermepumpe"}}getCardSize(){return 6}_v(t){return this._config?.[t]??lt[t]}_ent(t){return t?this.hass?.states?.[t]:void 0}get _imagePath(){if(this._config.image_url)return this._config.image_url;const t=this._config.image_variant??"transparent";return"/local/community/tomtut-pool-heatpump-card/"+(ct[t]??ct.transparent)}get _powerWatt(){const t=this._ent(this._config.power_entity);if(!t)return null;const e=parseFloat(t.state);if(isNaN(e))return null;return"kw"===(t.attributes?.unit_of_measurement||"W").toLowerCase()?1e3*e:e}get _switchOn(){const t=this._ent(this._config.switch_entity);return!!t&&ht.includes(String(t.state).toLowerCase())}get _target(){const t=this._config.target_entity,e=this._ent(t);if(!e)return null;const i=t.startsWith("climate."),s=i?e.attributes?.temperature:parseFloat(e.state);if(null==s||isNaN(s))return null;const r=e.attributes||{};return{climate:i,value:Number(s),min:i?r.min_temp??5:r.min??5,max:i?r.max_temp??40:r.max??40,step:this._config.target_step??(i?r.target_temp_step??.5:r.step??.5),unit:i?this.hass?.config?.unit_system?.temperature??"°C":r.unit_of_measurement??"°C"}}get _current(){const t=this._config.current_entity,e=this._ent(t);if(!e)return null;const i=t.startsWith("climate."),s=i?e.attributes?.current_temperature:parseFloat(e.state);return null==s||isNaN(s)?null:{value:Number(s),unit:i?this.hass?.config?.unit_system?.temperature??"°C":e.attributes?.unit_of_measurement??"°C"}}get _fanActive(){const t=this._config.fan_source??"auto",e=this._ent(this._config.fan_entity);if("power"!==t&&e){const t=String(e.state).toLowerCase();if(ht.includes(t))return!0;const i=parseFloat(t);return!isNaN(i)&&i>0}if("entity"===t)return!1;const i=this._powerWatt;return null!==i&&i>=Number(this._v("fan_power_threshold"))}_callSwitch(t){const e=this._config.switch_entity;e&&this.hass&&this.hass.callService(e.split(".")[0],t?"turn_on":"turn_off",{entity_id:e})}_onPowerClick(t){t?.stopPropagation(),this._config.switch_entity&&(this._switchOn?this._confirmOpen=!0:this._callSwitch(!0))}_confirmOff(t){t?.stopPropagation(),this._confirmOpen=!1,this._callSwitch(!1)}_cancelOff(t){t?.stopPropagation(),this._confirmOpen=!1}_stepTarget(t){const e=this._target;if(!e||!this.hass)return;let i=Math.round((e.value+t*e.step)/e.step)*e.step;i=Math.min(e.max,Math.max(e.min,i)),i=Math.round(100*i)/100,i!==e.value&&(e.climate?this.hass.callService("climate","set_temperature",{entity_id:this._config.target_entity,temperature:i}):this.hass.callService("number","set_value",{entity_id:this._config.target_entity,value:i}))}_targetUp(t){t?.stopPropagation(),this._stepTarget(1)}_targetDown(t){t?.stopPropagation(),this._stepTarget(-1)}_moreInfo(t){const e=t?.currentTarget?.dataset?.entity;e&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0})))}render(){if(!this._config||!this.hass)return V;const t=!1!==this._config.show_fan,e=!1!==this._config.show_power_button&&!!this._config.switch_entity,i=!1!==this._config.show_power&&!!this._config.power_entity,s=!1!==this._config.show_target&&!!this._config.target_entity,r=!1!==this._config.show_current&&!!this._config.current_entity,n=this._config.label_text||"",o=t&&this._fanActive,a=Number(this._v("fan_speed"))||0,l=a<=0?0:Math.max(.2,4-a/100*3.6),c="white"===this._v("fan_color")?"#ffffff":"#111111",h=this._powerWatt,p=this._target,d=this._current;return D`
      <ha-card>
        <div class="card-wrap">
          <img class="bg" src="${this._imagePath}" alt="Waermepumpe" />

          <!-- Luefter -->
          ${t?D`
                <div
                  class="fan-overlay ${o?"spinning":"hidden"===this._v("fan_inactive")?"hidden":"idle"}"
                  style="top:${this._v("fan_top")}%; left:${this._v("fan_left")}%; width:${this._v("fan_size")}%; --fan-dur:${l}s; --fan-color:${c};"
                >
                  <svg viewBox="0 0 40 40" .innerHTML="${'<circle cx="20" cy="20" r="3" fill="currentColor"/><path d="M20,17 Q20,6 12,6 Q4,6 6,14 Q8,17 20,17 Z" fill="currentColor" opacity="0.85"/><path d="M23,20 Q34,20 34,12 Q34,4 26,6 Q23,8 23,20 Z" fill="currentColor" opacity="0.85"/><path d="M20,23 Q20,34 28,34 Q36,34 34,26 Q32,23 20,23 Z" fill="currentColor" opacity="0.85"/><path d="M17,20 Q6,20 6,28 Q6,36 14,34 Q17,32 17,20 Z" fill="currentColor" opacity="0.85"/>'}"></svg>
                </div>
              `:V}

          <!-- Powerbutton -->
          ${e?D`
                <div
                  class="power-badge ${this._switchOn?"on":"off"}"
                  style="top:${this._v("power_btn_top")}%; left:${this._v("power_btn_left")}%; transform:scale(${(this._v("power_btn_scale")??100)/100});"
                  title="${this._switchOn?"Ausschalten (mit Rueckfrage)":"Einschalten"}"
                  @click="${this._onPowerClick}"
                >
                  <ha-icon icon="mdi:power"></ha-icon>
                </div>
              `:V}

          <!-- Stromverbrauch -->
          ${i?D`
                <div
                  class="value-box ${!1===this._v("power_box")?"no-bg":""}"
                  style="top:${this._v("power_top")}%; left:${this._v("power_left")}%; transform:translateX(-50%) scale(${(this._v("power_scale")??100)/100}); --val-color:${"black"===this._v("power_color")?"#111":"#fff"};"
                  data-entity="${this._config.power_entity}"
                  @click="${this._moreInfo}"
                >
                  <span class="val"
                    >${null===h?"—":pt(h,Number(this._v("power_decimals"))||0)}</span
                  >
                  ${!1===this._v("power_label")?V:D`<span class="unit">Watt</span>`}
                </div>
              `:V}

          <!-- Ist-Temperatur -->
          ${r?D`
                <div
                  class="value-box ${!1===this._v("current_box")?"no-bg":""}"
                  style="bottom:${this._v("current_bottom")}%; left:${this._v("current_left")}%; transform:translateX(-50%) scale(${(this._v("current_scale")??100)/100}); --val-color:${"black"===this._v("current_color")?"#111":"#fff"};"
                  data-entity="${this._config.current_entity}"
                  @click="${this._moreInfo}"
                >
                  <span class="val"
                    >${null===d?"—":pt(d.value,1)+" "+d.unit}</span
                  >
                  ${!1===this._v("current_label")?V:D`<span class="unit">Ist</span>`}
                </div>
              `:V}

          <!-- Soll-Temperatur mit +/- -->
          ${s?D`
                <div
                  class="value-box target ${!1===this._v("target_box")?"no-bg":""}"
                  style="bottom:${this._v("target_bottom")}%; left:${this._v("target_left")}%; transform:translateX(-50%) scale(${(this._v("target_scale")??100)/100}); --val-color:${"black"===this._v("target_color")?"#111":"#fff"};"
                >
                  <div class="target-row">
                    <button
                      class="step"
                      ?disabled="${null===p}"
                      @click="${this._targetDown}"
                      title="Soll-Temperatur senken"
                    >
                      −
                    </button>
                    <div class="target-val">
                      <span class="val"
                        >${null===p?"—":pt(p.value,1)+" "+p.unit}</span
                      >
                      ${!1===this._v("target_label")?V:D`<span class="unit">Soll</span>`}
                    </div>
                    <button
                      class="step"
                      ?disabled="${null===p}"
                      @click="${this._targetUp}"
                      title="Soll-Temperatur anheben"
                    >
                      +
                    </button>
                  </div>
                </div>
              `:V}

          <!-- Freitext -->
          ${n?D`
                <div
                  class="label-badge ${!1===this._v("label_box")?"no-bg":""}"
                  style="top:${this._v("label_top")}%; left:${this._v("label_left")}%; transform:translateX(-50%) scale(${(this._v("label_scale")??100)/100}); color:${"black"===this._v("label_color")?"#111":"#fff"};"
                >
                  ${n}
                </div>
              `:V}

          <!-- Bestaetigung vor dem Stromlos-Schalten -->
          ${this._confirmOpen?D`
                <div class="confirm-overlay" @click="${this._cancelOff}">
                  <div class="confirm-panel" @click="${t=>t.stopPropagation()}">
                    <h3><ha-icon icon="mdi:alert"></ha-icon> Wirklich stromlos schalten?</h3>
                    <p>
                      Eine laufende Waermepumpe sollte erst am Geraet bzw. ueber den Betriebsmodus
                      ausgeschaltet werden — nicht einfach den Stecker ziehen! Hartes Trennen im Betrieb
                      kann Kompressor und Elektronik schaden.
                    </p>
                    <div class="confirm-actions">
                      <button class="btn cancel" @click="${this._cancelOff}">Abbrechen</button>
                      <button class="btn danger" @click="${this._confirmOff}">
                        Trotzdem ausschalten
                      </button>
                    </div>
                  </div>
                </div>
              `:V}
        </div>
      </ha-card>
    `}static styles=n`
    ha-card { overflow: hidden; padding: 0; background: transparent; }
    .card-wrap { position: relative; width: 100%; line-height: 0; }
    .bg { width: 100%; height: auto; display: block; }

    /* Luefter */
    .fan-overlay {
      position: absolute; aspect-ratio: 1; pointer-events: none;
      transform: translate(-50%, -50%);
      color: var(--fan-color, #111);
      opacity: 0.3; filter: grayscale(1);
      transition: opacity 0.3s, filter 0.3s;
    }
    .fan-overlay svg { width: 100%; height: 100%; overflow: visible; }
    .fan-overlay.hidden { opacity: 0; }
    .fan-overlay.spinning { opacity: 0.9; filter: none; }
    .fan-overlay.spinning svg { animation: fanSpin var(--fan-dur, 1s) linear infinite; }
    @keyframes fanSpin { to { transform: rotate(360deg); } }

    /* Powerbutton */
    .power-badge {
      position: absolute; cursor: pointer; padding: 5px;
      border-radius: 50%; --mdc-icon-size: 26px;
      transition: box-shadow 0.3s, color 0.3s, opacity 0.3s;
      line-height: 0; background: rgba(0,0,0,0.45);
      transform-origin: top left; z-index: 6;
    }
    .power-badge.on { color: #4caf50; box-shadow: 0 0 10px rgba(76,175,80,0.55); }
    .power-badge.off { color: #f44336; opacity: 0.75; }
    .power-badge:hover { filter: brightness(1.2); }

    /* Wertefelder */
    .value-box {
      position: absolute; display: flex; flex-direction: column; align-items: center;
      justify-content: center; background: rgba(0,0,0,0.75);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 10px;
      padding: 6px 16px; min-width: 75px; line-height: 1.2; backdrop-filter: blur(4px);
      cursor: default;
    }
    .value-box.no-bg { background: none; border: none; backdrop-filter: none; padding: 2px 6px; }
    .val { font-size: 1.4em; font-weight: 700; color: var(--val-color, #fff); white-space: nowrap; }
    .unit {
      font-size: 0.8em; font-weight: 600; color: var(--val-color, #fff);
      opacity: 0.7; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px;
    }

    /* Soll-Temperatur */
    .value-box.target { padding: 5px 8px; }
    .target-row { display: flex; align-items: center; gap: 8px; }
    .target-val { display: flex; flex-direction: column; align-items: center; }
    .step {
      background: rgba(255,255,255,0.12); color: var(--val-color, #fff);
      border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
      width: 28px; height: 28px; font-size: 18px; font-weight: 700;
      line-height: 1; cursor: pointer; padding: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    .step:hover { background: rgba(255,255,255,0.24); }
    .step:active { transform: scale(0.92); }
    .step[disabled] { opacity: 0.35; cursor: not-allowed; }

    /* Freitext */
    .label-badge {
      position: absolute; padding: 2px 8px;
      background: rgba(0,0,0,0.6); border-radius: 4px;
      font-size: 0.8em; font-weight: 700; color: #fff;
      letter-spacing: 0.5px; line-height: 1.3;
      pointer-events: none; white-space: nowrap;
    }
    .label-badge.no-bg { background: none; }

    /* Bestaetigungs-Dialog */
    .confirm-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 20; line-height: normal;
      animation: fadeIn 0.15s ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .confirm-panel {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border-radius: 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
      padding: 18px 20px; width: min(92%, 420px);
      max-height: 92%; overflow-y: auto;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .confirm-panel h3 {
      margin: 0 0 10px 0; font-size: 1.05em; font-weight: 700;
      display: flex; align-items: center; gap: 8px;
      color: var(--warning-color, #ff9800); --mdc-icon-size: 22px;
    }
    .confirm-panel p { margin: 0 0 16px 0; font-size: 0.9em; line-height: 1.45; }
    .confirm-actions { display: flex; gap: 10px; justify-content: flex-end; }
    .btn {
      padding: 8px 14px; border-radius: 8px; font-size: 0.9em; font-weight: 600;
      cursor: pointer; border: 1px solid var(--divider-color, #555);
      background: transparent; color: var(--primary-text-color, #fff);
      font-family: inherit;
    }
    .btn.cancel:hover { background: rgba(255,255,255,0.1); }
    .btn.danger { background: #d32f2f; border-color: #d32f2f; color: #fff; }
    .btn.danger:hover { background: #b71c1c; }
  `}customElements.define("tomtut-pool-heatpump-card",dt);class _t extends ot{static properties={hass:{attribute:!1},_config:{state:!0}};setConfig(t){this._config={...t}}_ev(t){return this._config?.[t]??lt[t]}_changed(t){const e=t.target,i=e.dataset.key;let s;"range"===e.type||"number"===e.type?(s=parseFloat(e.value),isNaN(s)&&(s=void 0)):s="checkbox"===e.type?e.checked:e.value,this._config={...this._config,[i]:s},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_entityOptions(...t){const e=this.hass?.states??{};return Object.keys(e).filter(e=>t.some(t=>e.startsWith(t+"."))).sort()}_entityField(t,e,i,...s){const r=`list-${e}`;return D`
      <label
        >${t}
        <input
          type="text"
          list="${r}"
          .value="${this._config?.[e]||""}"
          data-key="${e}"
          @change="${this._changed}"
          @input="${this._changed}"
          placeholder="${s[0]}.beispiel"
        />
        <datalist id="${r}">
          ${this._entityOptions(...s).map(t=>D`<option value="${t}"></option>`)}
        </datalist>
        <small>${i}</small>
      </label>
    `}_slider(t,e,i,s,r="%",n=1){const o=this._ev(e)??0;return D`
      <div class="slider-row">
        <span class="slider-label">${t}</span>
        <input
          type="range"
          min="${i}"
          max="${s}"
          step="${n}"
          .value="${String(o)}"
          data-key="${e}"
          @input="${this._changed}"
        />
        <span class="slider-val">${o}${r}</span>
      </div>
    `}_toggle(t,e,i){const s=this._config?.[e]??i;return D`
      <div class="toggle-row">
        <span class="slider-label">${t}</span>
        <input type="checkbox" ?checked="${s}" data-key="${e}" @change="${this._changed}" />
      </div>
    `}_colorSelect(t,e){const i=this._ev(e)??"white";return D`
      <div class="slider-row">
        <span class="slider-label">${t}</span>
        <select data-key="${e}" @change="${this._changed}">
          <option value="white" ?selected="${"white"===i}">Weiß</option>
          <option value="black" ?selected="${"black"===i}">Schwarz</option>
        </select>
      </div>
    `}_section(t,e){return D`
      <details class="section">
        <summary>${t}</summary>
        <div class="section-body">${e}</div>
      </details>
    `}render(){if(!this._config)return V;const t=this._config.fan_source??"auto";return D`
      <div class="editor">
        ${this._entityField("Powerbutton — Schalter (optional)","switch_entity","z.B. die Shelly-Steckdose der Waermepumpe. Ausschalten fragt immer nach.","switch","input_boolean","light")}
        ${this._entityField("Stromverbrauch — Sensor (optional)","power_entity","Leistungssensor in W oder kW (z.B. Shelly).","sensor")}
        ${this._entityField("Soll-Temperatur — climate oder number","target_entity","climate.* nutzt die Zieltemperatur, number.* den Wert direkt.","climate","number")}
        ${this._entityField("Ist-Temperatur — climate oder sensor","current_entity","climate.* nutzt current_temperature, sensor.* den Zustand.","climate","sensor")}

        <label
          >Freitext auf der Card (optional)
          <input
            type="text"
            .value="${this._config.label_text||""}"
            data-key="label_text"
            @input="${this._changed}"
            placeholder="z.B. Pool-Waermepumpe"
          />
        </label>

        <label
          >Bildvariante
          <select data-key="image_variant" @change="${this._changed}">
            <option value="weiss" ?selected="${"weiss"===this._config.image_variant}">Weiß</option>
            <option value="schwarz" ?selected="${"schwarz"===this._config.image_variant}">
              Schwarz
            </option>
            <option
              value="transparent"
              ?selected="${"transparent"===(this._config.image_variant??"transparent")}"
            >
              Transparent (Standard)
            </option>
          </select>
        </label>

        <label
          >Eigenes Bild (optional)
          <input
            type="text"
            .value="${this._config.image_url||""}"
            data-key="image_url"
            @input="${this._changed}"
            placeholder="/local/meine_waermepumpe.png"
          />
          <small>Leer = mitgeliefertes Bild aus dem Card-Ordner.</small>
        </label>

        ${this._section("Luefter-Animation",D`
            <div class="slider-row">
              <span class="slider-label">Aktiv wenn …</span>
              <select data-key="fan_source" @change="${this._changed}">
                <option value="auto" ?selected="${"auto"===t}">
                  Automatisch (Entity, sonst Leistung)
                </option>
                <option value="entity" ?selected="${"entity"===t}">Nur Entity</option>
                <option value="power" ?selected="${"power"===t}">Nur Leistung</option>
              </select>
            </div>
            ${this._entityField("Luefter-Entity (optional)","fan_entity","an/aus oder Zahlenwert > 0 = Luefter dreht.","binary_sensor","switch","sensor","fan","climate")}
            ${this._slider("Leistungs-Schwelle","fan_power_threshold",0,2e3," W",10)}
            ${this._slider("Drehgeschwindigkeit","fan_speed",0,100)}
            <div class="slider-row">
              <span class="slider-label">Bei Stillstand</span>
              <select data-key="fan_inactive" @change="${this._changed}">
                <option value="gray" ?selected="${"gray"===(this._ev("fan_inactive")??"gray")}">
                  Grau + stehend
                </option>
                <option value="hidden" ?selected="${"hidden"===this._ev("fan_inactive")}">
                  Ausblenden
                </option>
              </select>
            </div>
            ${this._colorSelect("Farbe","fan_color")}
          `)}
        ${this._section("Elemente anzeigen",D`
            ${this._toggle("⏻ Powerbutton","show_power_button",!0)}
            ${this._toggle("⚡ Stromverbrauch","show_power",!0)}
            ${this._toggle("🌡 Ist-Temperatur","show_current",!0)}
            ${this._toggle("🎚 Soll-Temperatur","show_target",!0)}
            ${this._toggle("🌀 Luefter","show_fan",!0)}
          `)}

        <details class="section advanced">
          <summary>Erweiterte Einstellungen</summary>
          <div class="section-body advanced-body">
            ${this._section("Luefter — Position",D`
                ${this._slider("Von oben","fan_top",0,100,"%",.5)}
                ${this._slider("Von links","fan_left",0,100,"%",.5)}
                ${this._slider("Größe","fan_size",5,80,"%",.5)}
              `)}
            ${this._section("Powerbutton — Position",D`
                ${this._slider("Von oben","power_btn_top",0,100)}
                ${this._slider("Von links","power_btn_left",0,100)}
                ${this._slider("Größe","power_btn_scale",50,200)}
              `)}
            ${this._section("Stromverbrauch — Darstellung",D`
                ${this._slider("Von oben","power_top",0,100)}
                ${this._slider("Von links","power_left",0,100)}
                ${this._slider("Größe","power_scale",50,150)}
                ${this._slider("Nachkommastellen","power_decimals",0,2,"",1)}
                ${this._colorSelect("Schriftfarbe","power_color")}
                ${this._toggle("Box anzeigen","power_box",!0)}
                ${this._toggle("Einheit anzeigen","power_label",!0)}
              `)}
            ${this._section("Ist-Temperatur — Darstellung",D`
                ${this._slider("Von unten","current_bottom",0,100)}
                ${this._slider("Von links","current_left",0,100)}
                ${this._slider("Größe","current_scale",50,150)}
                ${this._colorSelect("Schriftfarbe","current_color")}
                ${this._toggle("Box anzeigen","current_box",!0)}
                ${this._toggle("Label anzeigen","current_label",!0)}
              `)}
            ${this._section("Soll-Temperatur — Darstellung",D`
                ${this._slider("Von unten","target_bottom",0,100)}
                ${this._slider("Von links","target_left",0,100)}
                ${this._slider("Größe","target_scale",50,150)}
                ${this._slider("Schrittweite","target_step",.1,5,"",.1)}
                ${this._colorSelect("Schriftfarbe","target_color")}
                ${this._toggle("Box anzeigen","target_box",!0)}
                ${this._toggle("Label anzeigen","target_label",!0)}
              `)}
            ${this._section("Freitext — Darstellung",D`
                ${this._slider("Von oben","label_top",0,100)}
                ${this._slider("Von links","label_left",0,100)}
                ${this._slider("Größe","label_scale",50,200)}
                ${this._colorSelect("Schriftfarbe","label_color")}
                ${this._toggle("Box anzeigen","label_box",!0)}
              `)}
          </div>
        </details>
      </div>
    `}static styles=n`
    .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    label { display: flex; flex-direction: column; font-weight: 500; gap: 4px; }
    input[type="text"], select {
      padding: 8px; border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px; font-size: 14px;
    }
    small { color: var(--secondary-text-color, #888); font-weight: 400; }

    .section { border: 1px solid var(--divider-color, #ccc); border-radius: 8px; overflow: hidden; }
    .section summary {
      padding: 10px 14px; font-size: 14px; font-weight: 600; cursor: pointer;
      color: var(--primary-text-color); background: var(--card-background-color, rgba(0,0,0,0.05));
      list-style: none; display: flex; align-items: center; gap: 8px; user-select: none;
    }
    .section summary::-webkit-details-marker { display: none; }
    .section summary::before { content: "▶"; font-size: 10px; transition: transform 0.2s; }
    .section[open] summary::before { transform: rotate(90deg); }
    .section-body { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; }
    .section.advanced { border-color: var(--warning-color, #ff9800); }
    .section.advanced > summary {
      font-size: 13px; color: var(--warning-color, #ff9800); background: rgba(255,152,0,0.08);
    }
    .advanced-body { gap: 8px; }

    .slider-row, .toggle-row { display: flex; align-items: center; gap: 8px; }
    .slider-label { flex: 1; font-size: 13px; color: var(--primary-text-color); }
    .slider-row input[type="range"] { flex: 2; }
    .slider-row select { flex: 2; padding: 6px; border: 1px solid var(--divider-color, #ccc); border-radius: 4px; font-size: 13px; }
    .slider-val { width: 52px; text-align: right; font-size: 13px; font-weight: 600; color: var(--primary-color); }
    .toggle-row input[type="checkbox"] { width: 18px; height: 18px; }
  `}customElements.define("tomtut-pool-heatpump-card-editor",_t),window.customCards=window.customCards||[],window.customCards.push({type:"tomtut-pool-heatpump-card",name:"TomTuT Pool Heatpump",description:"Generische Card fuer Pool-Waermepumpen: Soll-/Ist-Temperatur, Stromverbrauch, Powerbutton mit Rueckfrage und animierter Luefter — beliebige Entities, keine Integration noetig",preview:!0,documentationURL:"https://github.com/TomTuTHub/tomtut-pool-heatpump-card"});export{dt as TomtutPoolHeatpumpCard,_t as TomtutPoolHeatpumpCardEditor};
