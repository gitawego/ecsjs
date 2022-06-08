var se=Object.defineProperty,ae=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var lt=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var J=(e,n,t)=>n in e?se(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,X=(e,n)=>{for(var t in n||(n={}))de.call(n,t)&&J(e,t,n[t]);if(lt)for(var t of lt(n))ue.call(n,t)&&J(e,t,n[t]);return e},ft=(e,n)=>ae(e,ce(n));var le=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var p=(e,n,t)=>(J(e,typeof n!="symbol"?n+"":n,t),t);var Yo=le((w,_)=>{const fe=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}};fe();var jt={exports:{}};(function(e){var n=Object.prototype.hasOwnProperty,t="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(t=!1));function o(c,u,d){this.fn=c,this.context=u,this.once=d||!1}function i(c,u,d,l,g){if(typeof d!="function")throw new TypeError("The listener must be a function");var m=new o(d,l||c,g),h=t?t+u:u;return c._events[h]?c._events[h].fn?c._events[h]=[c._events[h],m]:c._events[h].push(m):(c._events[h]=m,c._eventsCount++),c}function a(c,u){--c._eventsCount===0?c._events=new r:delete c._events[u]}function s(){this._events=new r,this._eventsCount=0}s.prototype.eventNames=function(){var u=[],d,l;if(this._eventsCount===0)return u;for(l in d=this._events)n.call(d,l)&&u.push(t?l.slice(1):l);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(d)):u},s.prototype.listeners=function(u){var d=t?t+u:u,l=this._events[d];if(!l)return[];if(l.fn)return[l.fn];for(var g=0,m=l.length,h=new Array(m);g<m;g++)h[g]=l[g].fn;return h},s.prototype.listenerCount=function(u){var d=t?t+u:u,l=this._events[d];return l?l.fn?1:l.length:0},s.prototype.emit=function(u,d,l,g,m,h){var S=t?t+u:u;if(!this._events[S])return!1;var f=this._events[S],T=arguments.length,O,v;if(f.fn){switch(f.once&&this.removeListener(u,f.fn,void 0,!0),T){case 1:return f.fn.call(f.context),!0;case 2:return f.fn.call(f.context,d),!0;case 3:return f.fn.call(f.context,d,l),!0;case 4:return f.fn.call(f.context,d,l,g),!0;case 5:return f.fn.call(f.context,d,l,g,m),!0;case 6:return f.fn.call(f.context,d,l,g,m,h),!0}for(v=1,O=new Array(T-1);v<T;v++)O[v-1]=arguments[v];f.fn.apply(f.context,O)}else{var ie=f.length,L;for(v=0;v<ie;v++)switch(f[v].once&&this.removeListener(u,f[v].fn,void 0,!0),T){case 1:f[v].fn.call(f[v].context);break;case 2:f[v].fn.call(f[v].context,d);break;case 3:f[v].fn.call(f[v].context,d,l);break;case 4:f[v].fn.call(f[v].context,d,l,g);break;default:if(!O)for(L=1,O=new Array(T-1);L<T;L++)O[L-1]=arguments[L];f[v].fn.apply(f[v].context,O)}}return!0},s.prototype.on=function(u,d,l){return i(this,u,d,l,!1)},s.prototype.once=function(u,d,l){return i(this,u,d,l,!0)},s.prototype.removeListener=function(u,d,l,g){var m=t?t+u:u;if(!this._events[m])return this;if(!d)return a(this,m),this;var h=this._events[m];if(h.fn)h.fn===d&&(!g||h.once)&&(!l||h.context===l)&&a(this,m);else{for(var S=0,f=[],T=h.length;S<T;S++)(h[S].fn!==d||g&&!h[S].once||l&&h[S].context!==l)&&f.push(h[S]);f.length?this._events[m]=f.length===1?f[0]:f:a(this,m)}return this},s.prototype.removeAllListeners=function(u){var d;return u?(d=t?t+u:u,this._events[d]&&a(this,d)):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=t,s.EventEmitter=s,e.exports=s})(jt);var G=jt.exports,U,pe=new Uint8Array(16);function he(){if(!U&&(U=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!U))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return U(pe)}var ye=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function me(e){return typeof e=="string"&&ye.test(e)}var b=[];for(var W=0;W<256;++W)b.push((W+256).toString(16).substr(1));function ge(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t=(b[e[n+0]]+b[e[n+1]]+b[e[n+2]]+b[e[n+3]]+"-"+b[e[n+4]]+b[e[n+5]]+"-"+b[e[n+6]]+b[e[n+7]]+"-"+b[e[n+8]]+b[e[n+9]]+"-"+b[e[n+10]]+b[e[n+11]]+b[e[n+12]]+b[e[n+13]]+b[e[n+14]]+b[e[n+15]]).toLowerCase();if(!me(t))throw TypeError("Stringified UUID is invalid");return t}function Ct(e,n,t){e=e||{};var r=e.random||(e.rng||he)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,n){t=t||0;for(var o=0;o<16;++o)n[t+o]=r[o];return n}return ge(r)}class pt{constructor(n){p(this,"afters",[]);this.id=n}}function ve(e){const n={},t=[],r={};e.forEach(i=>{const a=i[0],s=i[1];n[a]||(n[a]=new pt(a)),n[s]||(n[s]=new pt(s)),n[a].afters.push(s)});const o=(i,a=[])=>{const s=n[i],c=s.id;r[i]||(Array.isArray(a)||(a=[]),a.push(c),r[i]=!0,s.afters.forEach(u=>{if(a.indexOf(u)>=0)throw new Error(`closed chain : ${u} is in ${c}`);o(u.toString(),a.slice(0))}),t.unshift(c))};return Object.keys(n).forEach(i=>{o(i)}),t}const N={entityAdd:"entity:add",entityRemove:"entity:remove"};class be extends G{constructor(t,r){super();p(this,"entityIds",new Set);p(this,"events",[]);this.componentNames=t,this.world=r,this.indexeEntities();const o=a=>{a.entity.findComponents(this.componentNames).filter(s=>!!s).length===this.componentNames.length&&(this.entityIds.add(a.entity.id),this.emit(N.entityAdd,a.entity.id))},i=a=>{this.entityIds.delete(a.id),this.emit(N.entityRemove,a.id)};this.world.on(N.entityAdd,o),this.world.on(N.entityRemove,i),this.events.push(()=>{this.world.off(N.entityAdd,o)}),this.events.push(()=>{this.world.off(N.entityRemove,i)})}indexeEntities(){const t=this.world.queryEntitiesByComponents(this.componentNames).map(r=>r.id);this.entityIds=new Set(t)}dispose(){this.events.forEach(t=>t()),this.events.length=0}}function ht(e,n){return e.every(t=>n.includes(t))}function we(e){return e.reduce((n,t)=>{const[r,o]=t.split(":");return n[r]=o||r,n},{})}function rt(e){return`${e.componentName}::${e.entityId}`}class _e{constructor(n,t){p(this,"id");p(this,"updated",!1);this.opt=n,this.world=t,this.id=this.opt.id||Ct()}init(){for(const n of this.opt.components||[])this.addComponent({componentName:n.componentName,initialData:n.data,importData:this.opt.importData})}get components(){const n=new RegExp(this.id);return Object.keys(this.world.componentInstances).filter(t=>n.test(t))}addChild(n){n.tags=n.tags||[],n.tags.push(`parent:${this.id}`),this.world.addEntity(n)}children(){const n=`parent:${this.id}`;return Object.values(this.world.entities).filter(t=>{var r;return(r=t.opt.tags)==null?void 0:r.includes(n)})}moveToParent(n){if(!this.world.findEntityById(n))throw new Error(`moveToParent: parent ${n} is not found`);const r=we(this.opt.tags||[]);r.parent!==n&&(this.removeTag(`parent:${r.parent}`),this.addTag(`parent:${n}`),this.world.emit("entity:parent:change",{id:this.id,fromParent:r.parent,toParent:n}))}findComponents(n){return n.reduce((t,r)=>{const o=rt({componentName:r,entityId:this.id}),i=this.world.componentInstances[o];return t.push(i||null),t},[])}addComponent({componentName:n,initialData:t,importData:r=!1}){const[o]=this.findComponents([n]);if(o&&(console.warn(`Entity: component ${n} is already added, overwrite data`),r)){console.log("importing data for component",n),o.setData(t,!0);return}this.world.addComponentToEntity({componentName:n,data:t,entityId:this.id,importData:r})}removeComponent(n){return this.world.removeComponentFromEntity({componentName:n,entityId:this.id})}disposeComponents(){const n=new RegExp(this.id);for(const t of Object.keys(this.world.componentInstances))n.test(t)&&this.world.removeComponentFromEntity({componentId:t,entityId:this.id})}addTag(n){const t=new Set(this.opt.tags);t.has(n)||(t.add(n),this.opt.tags=[...t],this.world.emit("entity:tag:add",{id:this.id,tag:n}))}removeTag(n){const t=new Set(this.opt.tags);t.has(n)||(t.delete(n),this.opt.tags=[...t],this.world.emit("entity:tag:remove",{id:this.id,tag:n}))}dispose(){this.children().forEach(n=>n.dispose()),this.disposeComponents(),this.world.removeEntityById(this.id)}toJSON(){return this.world.exportEntity(this)}}var Se=typeof global=="object"&&global&&global.Object===Object&&global,Pt=Se,Ee=typeof self=="object"&&self&&self.Object===Object&&self,Te=Pt||Ee||Function("return this")(),P=Te,Ie=P.Symbol,j=Ie,Dt=Object.prototype,Oe=Dt.hasOwnProperty,xe=Dt.toString,R=j?j.toStringTag:void 0;function $e(e){var n=Oe.call(e,R),t=e[R];try{e[R]=void 0;var r=!0}catch{}var o=xe.call(e);return r&&(n?e[R]=t:delete e[R]),o}var Ae=Object.prototype,Ne=Ae.toString;function je(e){return Ne.call(e)}var Ce="[object Null]",Pe="[object Undefined]",yt=j?j.toStringTag:void 0;function F(e){return e==null?e===void 0?Pe:Ce:yt&&yt in Object(e)?$e(e):je(e)}function D(e){return e!=null&&typeof e=="object"}var De="[object Symbol]";function ot(e){return typeof e=="symbol"||D(e)&&F(e)==De}function Be(e,n){for(var t=-1,r=e==null?0:e.length,o=Array(r);++t<r;)o[t]=n(e[t],t,e);return o}var Le=Array.isArray,C=Le,Re=1/0,mt=j?j.prototype:void 0,gt=mt?mt.toString:void 0;function Bt(e){if(typeof e=="string")return e;if(C(e))return Be(e,Bt)+"";if(ot(e))return gt?gt.call(e):"";var n=e+"";return n=="0"&&1/e==-Re?"-0":n}function $(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}function Lt(e){return e}var qe="[object AsyncFunction]",Me="[object Function]",Fe="[object GeneratorFunction]",ze="[object Proxy]";function it(e){if(!$(e))return!1;var n=F(e);return n==Me||n==Fe||n==qe||n==ze}var Ue=P["__core-js_shared__"],Y=Ue,vt=function(){var e=/[^.]+$/.exec(Y&&Y.keys&&Y.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function He(e){return!!vt&&vt in e}var Ge=Function.prototype,Ve=Ge.toString;function ke(e){if(e!=null){try{return Ve.call(e)}catch{}try{return e+""}catch{}}return""}var Ke=/[\\^$.*+?()[\]{}|]/g,Je=/^\[object .+?Constructor\]$/,Xe=Function.prototype,We=Object.prototype,Ye=Xe.toString,Ze=We.hasOwnProperty,Qe=RegExp("^"+Ye.call(Ze).replace(Ke,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function tn(e){if(!$(e)||He(e))return!1;var n=it(e)?Qe:Je;return n.test(ke(e))}function en(e,n){return e==null?void 0:e[n]}function st(e,n){var t=en(e,n);return tn(t)?t:void 0}var bt=Object.create,nn=function(){function e(){}return function(n){if(!$(n))return{};if(bt)return bt(n);e.prototype=n;var t=new e;return e.prototype=void 0,t}}(),rn=nn;function on(e,n,t){switch(t.length){case 0:return e.call(n);case 1:return e.call(n,t[0]);case 2:return e.call(n,t[0],t[1]);case 3:return e.call(n,t[0],t[1],t[2])}return e.apply(n,t)}function sn(e,n){var t=-1,r=e.length;for(n||(n=Array(r));++t<r;)n[t]=e[t];return n}var an=800,cn=16,dn=Date.now;function un(e){var n=0,t=0;return function(){var r=dn(),o=cn-(r-t);if(t=r,o>0){if(++n>=an)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}function ln(e){return function(){return e}}var fn=function(){try{var e=st(Object,"defineProperty");return e({},"",{}),e}catch{}}(),H=fn,pn=H?function(e,n){return H(e,"toString",{configurable:!0,enumerable:!1,value:ln(n),writable:!0})}:Lt,hn=pn,yn=un(hn),mn=yn,gn=9007199254740991,vn=/^(?:0|[1-9]\d*)$/;function Rt(e,n){var t=typeof e;return n=n==null?gn:n,!!n&&(t=="number"||t!="symbol"&&vn.test(e))&&e>-1&&e%1==0&&e<n}function at(e,n,t){n=="__proto__"&&H?H(e,n,{configurable:!0,enumerable:!0,value:t,writable:!0}):e[n]=t}function V(e,n){return e===n||e!==e&&n!==n}var bn=Object.prototype,wn=bn.hasOwnProperty;function _n(e,n,t){var r=e[n];(!(wn.call(e,n)&&V(r,t))||t===void 0&&!(n in e))&&at(e,n,t)}function Sn(e,n,t,r){var o=!t;t||(t={});for(var i=-1,a=n.length;++i<a;){var s=n[i],c=r?r(t[s],e[s],s,t,e):void 0;c===void 0&&(c=e[s]),o?at(t,s,c):_n(t,s,c)}return t}var wt=Math.max;function En(e,n,t){return n=wt(n===void 0?e.length-1:n,0),function(){for(var r=arguments,o=-1,i=wt(r.length-n,0),a=Array(i);++o<i;)a[o]=r[n+o];o=-1;for(var s=Array(n+1);++o<n;)s[o]=r[o];return s[n]=t(a),on(e,this,s)}}function Tn(e,n){return mn(En(e,n,Lt),e+"")}var In=9007199254740991;function qt(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=In}function ct(e){return e!=null&&qt(e.length)&&!it(e)}function On(e,n,t){if(!$(t))return!1;var r=typeof n;return(r=="number"?ct(t)&&Rt(n,t.length):r=="string"&&n in t)?V(t[n],e):!1}function xn(e){return Tn(function(n,t){var r=-1,o=t.length,i=o>1?t[o-1]:void 0,a=o>2?t[2]:void 0;for(i=e.length>3&&typeof i=="function"?(o--,i):void 0,a&&On(t[0],t[1],a)&&(i=o<3?void 0:i,o=1),n=Object(n);++r<o;){var s=t[r];s&&e(n,s,r,i)}return n})}var $n=Object.prototype;function Mt(e){var n=e&&e.constructor,t=typeof n=="function"&&n.prototype||$n;return e===t}function An(e,n){for(var t=-1,r=Array(e);++t<e;)r[t]=n(t);return r}var Nn="[object Arguments]";function _t(e){return D(e)&&F(e)==Nn}var Ft=Object.prototype,jn=Ft.hasOwnProperty,Cn=Ft.propertyIsEnumerable,Pn=_t(function(){return arguments}())?_t:function(e){return D(e)&&jn.call(e,"callee")&&!Cn.call(e,"callee")},tt=Pn;function Dn(){return!1}var zt=typeof w=="object"&&w&&!w.nodeType&&w,St=zt&&typeof _=="object"&&_&&!_.nodeType&&_,Bn=St&&St.exports===zt,Et=Bn?P.Buffer:void 0,Ln=Et?Et.isBuffer:void 0,Rn=Ln||Dn,Ut=Rn,qn="[object Arguments]",Mn="[object Array]",Fn="[object Boolean]",zn="[object Date]",Un="[object Error]",Hn="[object Function]",Gn="[object Map]",Vn="[object Number]",kn="[object Object]",Kn="[object RegExp]",Jn="[object Set]",Xn="[object String]",Wn="[object WeakMap]",Yn="[object ArrayBuffer]",Zn="[object DataView]",Qn="[object Float32Array]",tr="[object Float64Array]",er="[object Int8Array]",nr="[object Int16Array]",rr="[object Int32Array]",or="[object Uint8Array]",ir="[object Uint8ClampedArray]",sr="[object Uint16Array]",ar="[object Uint32Array]",y={};y[Qn]=y[tr]=y[er]=y[nr]=y[rr]=y[or]=y[ir]=y[sr]=y[ar]=!0;y[qn]=y[Mn]=y[Yn]=y[Fn]=y[Zn]=y[zn]=y[Un]=y[Hn]=y[Gn]=y[Vn]=y[kn]=y[Kn]=y[Jn]=y[Xn]=y[Wn]=!1;function cr(e){return D(e)&&qt(e.length)&&!!y[F(e)]}function dr(e){return function(n){return e(n)}}var Ht=typeof w=="object"&&w&&!w.nodeType&&w,q=Ht&&typeof _=="object"&&_&&!_.nodeType&&_,ur=q&&q.exports===Ht,Z=ur&&Pt.process,lr=function(){try{var e=q&&q.require&&q.require("util").types;return e||Z&&Z.binding&&Z.binding("util")}catch{}}(),Tt=lr,It=Tt&&Tt.isTypedArray,fr=It?dr(It):cr,Gt=fr,pr=Object.prototype,hr=pr.hasOwnProperty;function yr(e,n){var t=C(e),r=!t&&tt(e),o=!t&&!r&&Ut(e),i=!t&&!r&&!o&&Gt(e),a=t||r||o||i,s=a?An(e.length,String):[],c=s.length;for(var u in e)(n||hr.call(e,u))&&!(a&&(u=="length"||o&&(u=="offset"||u=="parent")||i&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Rt(u,c)))&&s.push(u);return s}function mr(e,n){return function(t){return e(n(t))}}function gr(e){var n=[];if(e!=null)for(var t in Object(e))n.push(t);return n}var vr=Object.prototype,br=vr.hasOwnProperty;function wr(e){if(!$(e))return gr(e);var n=Mt(e),t=[];for(var r in e)r=="constructor"&&(n||!br.call(e,r))||t.push(r);return t}function Vt(e){return ct(e)?yr(e,!0):wr(e)}var _r=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Sr=/^\w*$/;function Er(e,n){if(C(e))return!1;var t=typeof e;return t=="number"||t=="symbol"||t=="boolean"||e==null||ot(e)?!0:Sr.test(e)||!_r.test(e)||n!=null&&e in Object(n)}var Tr=st(Object,"create"),M=Tr;function Ir(){this.__data__=M?M(null):{},this.size=0}function Or(e){var n=this.has(e)&&delete this.__data__[e];return this.size-=n?1:0,n}var xr="__lodash_hash_undefined__",$r=Object.prototype,Ar=$r.hasOwnProperty;function Nr(e){var n=this.__data__;if(M){var t=n[e];return t===xr?void 0:t}return Ar.call(n,e)?n[e]:void 0}var jr=Object.prototype,Cr=jr.hasOwnProperty;function Pr(e){var n=this.__data__;return M?n[e]!==void 0:Cr.call(n,e)}var Dr="__lodash_hash_undefined__";function Br(e,n){var t=this.__data__;return this.size+=this.has(e)?0:1,t[e]=M&&n===void 0?Dr:n,this}function x(e){var n=-1,t=e==null?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1])}}x.prototype.clear=Ir;x.prototype.delete=Or;x.prototype.get=Nr;x.prototype.has=Pr;x.prototype.set=Br;function Lr(){this.__data__=[],this.size=0}function k(e,n){for(var t=e.length;t--;)if(V(e[t][0],n))return t;return-1}var Rr=Array.prototype,qr=Rr.splice;function Mr(e){var n=this.__data__,t=k(n,e);if(t<0)return!1;var r=n.length-1;return t==r?n.pop():qr.call(n,t,1),--this.size,!0}function Fr(e){var n=this.__data__,t=k(n,e);return t<0?void 0:n[t][1]}function zr(e){return k(this.__data__,e)>-1}function Ur(e,n){var t=this.__data__,r=k(t,e);return r<0?(++this.size,t.push([e,n])):t[r][1]=n,this}function E(e){var n=-1,t=e==null?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1])}}E.prototype.clear=Lr;E.prototype.delete=Mr;E.prototype.get=Fr;E.prototype.has=zr;E.prototype.set=Ur;var Hr=st(P,"Map"),kt=Hr;function Gr(){this.size=0,this.__data__={hash:new x,map:new(kt||E),string:new x}}function Vr(e){var n=typeof e;return n=="string"||n=="number"||n=="symbol"||n=="boolean"?e!=="__proto__":e===null}function K(e,n){var t=e.__data__;return Vr(n)?t[typeof n=="string"?"string":"hash"]:t.map}function kr(e){var n=K(this,e).delete(e);return this.size-=n?1:0,n}function Kr(e){return K(this,e).get(e)}function Jr(e){return K(this,e).has(e)}function Xr(e,n){var t=K(this,e),r=t.size;return t.set(e,n),this.size+=t.size==r?0:1,this}function I(e){var n=-1,t=e==null?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1])}}I.prototype.clear=Gr;I.prototype.delete=kr;I.prototype.get=Kr;I.prototype.has=Jr;I.prototype.set=Xr;var Wr="Expected a function";function dt(e,n){if(typeof e!="function"||n!=null&&typeof n!="function")throw new TypeError(Wr);var t=function(){var r=arguments,o=n?n.apply(this,r):r[0],i=t.cache;if(i.has(o))return i.get(o);var a=e.apply(this,r);return t.cache=i.set(o,a)||i,a};return t.cache=new(dt.Cache||I),t}dt.Cache=I;var Yr=500;function Zr(e){var n=dt(e,function(r){return t.size===Yr&&t.clear(),r}),t=n.cache;return n}var Qr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,to=/\\(\\)?/g,eo=Zr(function(e){var n=[];return e.charCodeAt(0)===46&&n.push(""),e.replace(Qr,function(t,r,o,i){n.push(o?i.replace(to,"$1"):r||t)}),n}),no=eo;function ro(e){return e==null?"":Bt(e)}function oo(e,n){return C(e)?e:Er(e,n)?[e]:no(ro(e))}var io=1/0;function so(e){if(typeof e=="string"||ot(e))return e;var n=e+"";return n=="0"&&1/e==-io?"-0":n}function ao(e,n){n=oo(n,e);for(var t=0,r=n.length;e!=null&&t<r;)e=e[so(n[t++])];return t&&t==r?e:void 0}function Ot(e,n,t){var r=e==null?void 0:ao(e,n);return r===void 0?t:r}var co=mr(Object.getPrototypeOf,Object),Kt=co,uo="[object Object]",lo=Function.prototype,fo=Object.prototype,Jt=lo.toString,po=fo.hasOwnProperty,ho=Jt.call(Object);function yo(e){if(!D(e)||F(e)!=uo)return!1;var n=Kt(e);if(n===null)return!0;var t=po.call(n,"constructor")&&n.constructor;return typeof t=="function"&&t instanceof t&&Jt.call(t)==ho}function mo(){this.__data__=new E,this.size=0}function go(e){var n=this.__data__,t=n.delete(e);return this.size=n.size,t}function vo(e){return this.__data__.get(e)}function bo(e){return this.__data__.has(e)}var wo=200;function _o(e,n){var t=this.__data__;if(t instanceof E){var r=t.__data__;if(!kt||r.length<wo-1)return r.push([e,n]),this.size=++t.size,this;t=this.__data__=new I(r)}return t.set(e,n),this.size=t.size,this}function B(e){var n=this.__data__=new E(e);this.size=n.size}B.prototype.clear=mo;B.prototype.delete=go;B.prototype.get=vo;B.prototype.has=bo;B.prototype.set=_o;var Xt=typeof w=="object"&&w&&!w.nodeType&&w,xt=Xt&&typeof _=="object"&&_&&!_.nodeType&&_,So=xt&&xt.exports===Xt,$t=So?P.Buffer:void 0,At=$t?$t.allocUnsafe:void 0;function Eo(e,n){if(n)return e.slice();var t=e.length,r=At?At(t):new e.constructor(t);return e.copy(r),r}var To=P.Uint8Array,Nt=To;function Io(e){var n=new e.constructor(e.byteLength);return new Nt(n).set(new Nt(e)),n}function Oo(e,n){var t=n?Io(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)}function xo(e){return typeof e.constructor=="function"&&!Mt(e)?rn(Kt(e)):{}}function $o(e){return function(n,t,r){for(var o=-1,i=Object(n),a=r(n),s=a.length;s--;){var c=a[e?s:++o];if(t(i[c],c,i)===!1)break}return n}}var Ao=$o(),No=Ao;function et(e,n,t){(t!==void 0&&!V(e[n],t)||t===void 0&&!(n in e))&&at(e,n,t)}function jo(e){return D(e)&&ct(e)}function nt(e,n){if(!(n==="constructor"&&typeof e[n]=="function")&&n!="__proto__")return e[n]}function Co(e){return Sn(e,Vt(e))}function Po(e,n,t,r,o,i,a){var s=nt(e,t),c=nt(n,t),u=a.get(c);if(u){et(e,t,u);return}var d=i?i(s,c,t+"",e,n,a):void 0,l=d===void 0;if(l){var g=C(c),m=!g&&Ut(c),h=!g&&!m&&Gt(c);d=c,g||m||h?C(s)?d=s:jo(s)?d=sn(s):m?(l=!1,d=Eo(c,!0)):h?(l=!1,d=Oo(c,!0)):d=[]:yo(c)||tt(c)?(d=s,tt(s)?d=Co(s):(!$(s)||it(s))&&(d=xo(c))):l=!1}l&&(a.set(c,d),o(d,c,r,i,a),a.delete(c)),et(e,t,d)}function Wt(e,n,t,r,o){e!==n&&No(n,function(i,a){if(o||(o=new B),$(i))Po(e,n,a,t,Wt,r,o);else{var s=r?r(nt(e,a),i,a+"",e,n,o):void 0;s===void 0&&(s=i),et(e,a,s)}},Vt)}var Do=xn(function(e,n,t){Wt(e,n,t)}),Bo=Do;function Lo(e){const n=[],t=new Proxy(e,{set(r,o,i){const a=X({},r);return r[o]=i,n.forEach(s=>{Ot(r,s.key)!==Ot(a,s.key)&&s.callback(r,a)}),!0}});return{get(r){return t[r]},set(r,o){t[r]=o},subscribe(r,o){const i={key:r,callback:o};return n.push(i),{unsubscribe:()=>{const a=n.indexOf(i);a>-1&&n.splice(a,1)}}}}}const Ro="tick:error";class qo extends G{constructor(t){super();p(this,"systems",{});p(this,"components",{});p(this,"componentInstances",{});p(this,"entities",{});p(this,"queryMapping",{id:this.queryEntitiesByIds.bind(this),tag:this.queryEntitiesByTags.bind(this),component:this.queryEntitiesByComponents.bind(this)});p(this,"state",Lo({}));this.options=t}archetype(t){return new be(t,this)}registerComponents(t){for(const r of Object.values(t))this.registerComponent(r)}registerComponent(t){if(this.components[t.componentName])throw new Error(`World: component ${t.componentName} is already added`);return this.components[t.componentName]=t,this}unregisterComponent(t){for(const r of Object.values(this.entities))this.removeComponentFromEntity({componentName:t,entityId:r.id});delete this.components[t]}addComponentToEntity(t){const r=this.components[t.componentName];if(!r)throw new Error(`World: component ${t.componentName} not found`);const o=new r(t,this);return t.importData&&o.importData(t.data),this.componentInstances[o.id]=o,this.emit("component:add",t),this}getComponent(t){return this.components[t]}removeComponentFromEntity(t){const r=t.componentId||rt({componentName:t.componentName,entityId:t.entityId});return this.componentInstances[r]?(this.componentInstances[r].dispose(),this.emit("component:remove",t),!0):!1}addSystems(t){for(const r of Object.values(t))this.addSystem(r)}addSystem(t,r){const o=new t(this,r);return this.systems[o.opt.name]=o,this}getSystem(t){return this.systems[t]}sortSystems(t=Object.values(this.systems)){const r=[],o=[],i=[],a=t.reduce((s,c)=>{const u=c.opt.name;return c.opt.beforeAll?(o.push(u),s):c.opt.afterAll?(i.push(u),s):(c.opt.updateBefore?s.push([u,c.opt.updateBefore]):c.opt.updateAfter?s.push([c.opt.updateAfter,u]):r.push(u),s)},[]);return{beforeAll:o,afterAll:i,orderedSystems:ve(a),systems:r}}async tick(){const t=Ct();this.emit("tick:before",{tickId:t,timestamp:Date.now()});const r=this.sortSystems(),o=r.beforeAll.map(async s=>this.runSystem(s,t));await Promise.allSettled(o);const i=r.systems.map(async s=>this.runSystem(s,t));Promise.allSettled(i);for(const s of r.orderedSystems)await this.runSystem(s,t);const a=r.afterAll.map(async s=>this.runSystem(s,t));await Promise.allSettled(a),this.emit("tick:after",{tickId:t,timestamp:Date.now()})}async runSystem(t,r){var o;try{return await((o=this.getSystem(t))==null?void 0:o.run())}catch(i){return this.emit(Ro,{error:i,systemName:t,tickId:r,timestamp:Date.now()}),null}}exportEntities(){return Object.values(this.entities).map(t=>this.exportEntity(t))}exportEntity(t){const r=t.components.map(o=>{const i=this.componentInstances[o];return{componentName:i.componentName,data:i.exportData()}});return{id:t.id,tags:t.opt.tags,components:r}}loadEntities(t){for(const r of t)this.addEntity(ft(X({},r),{importData:!0}))}addEntity(t){const r=new _e(t,this);return this.entities[r.id]=r,r.init(),this.emit("entity:add",{entity:r}),r}removeEntityByTags(t){for(const r of Object.values(this.entities))ht(t,r.opt.tags||[])&&this.removeEntityById(r.id);return this}removeEntityById(t){if(this.entities[t]){const r=this.entities[t].opt.tags;delete this.entities[t],this.emit("entity:remove",{id:t,tags:r})}return this}findEntityById(t){return this.entities[t]}*queryComponents(t){for(const r of Object.values(this.entities)){const o=r.findComponents(t);o.filter(i=>!!i).length===t.length&&(yield o)}}queryEntities(t,r="id"){return this.queryMapping[r](t)}queryEntitiesByTags(t){return Object.values(this.entities).reduce((r,o)=>(ht(t,o.opt.tags||[])&&r.push(o),r),[])}queryEntitiesByIds(t){return t.map(r=>this.entities[r])}queryEntitiesByComponents(t){return Object.values(this.entities).reduce((r,o)=>(o.findComponents(t).filter(a=>!!a).length===t.length&&r.push(o),r),[])}}class A{constructor(n,t){p(this,"id");p(this,"componentName");p(this,"data");p(this,"entityId");var r;this.world=t,this.entityId=n.entityId,this.componentName=this.constructor.componentName,this.id=rt({componentName:this.componentName,entityId:this.entityId}),this.setData(n.data,!0),(r=this.init)==null||r.call(this)}importData(n){this.data=n}exportData(){return this.data}setData(n,t=!1){t?this.data=n:Bo(this.data,n);const r=this.world.findEntityById(this.entityId);r?r.updated=!0:console.warn(`entity ${this.entityId} not found`)}dispose(){delete this.world.componentInstances[this.id]}}p(A,"componentName");class Yt extends A{init(){var n,t;this.data=this.data||{type:"session"},(t=(n=this.data).type)!=null||(n.type="session")}}p(Yt,"componentName","initStorage");class Zt extends A{init(){var n,t;this.data=this.data||{type:"session"},(t=(n=this.data).type)!=null||(n.type="session")}}p(Zt,"componentName","storage");class Qt extends A{}p(Qt,"componentName","create");class te extends A{}p(te,"componentName","remove");class ee extends A{}p(ee,"componentName","toDoItem");class ne extends A{}p(ne,"componentName","toDoList");const Mo={create:Qt,toDoItem:ee,toDoList:ne,storage:Zt,initStorage:Yt,remove:te},Fo=(e,n)=>{n.addEntity({components:[{componentName:"toDoItem",data:{content:e,createdAt:new Date().toISOString(),status:"pending"}},{componentName:"storage",data:{type:"local"}}]})},zo=e=>{e.addEntity({id:"initStorage",components:[{componentName:"initStorage",data:{type:"local"}}]})},Uo=e=>{e.addEntity({id:"search-field",components:[{componentName:"create",data:{nodeSelector:".create-container"}}]})},Ho=e=>{e.addEntity({id:"todo-list",components:[{componentName:"toDoList",data:{renderType:"all",container:".todo-list-items"}},{componentName:"storage",data:{type:"local"}}]})};class ut extends G{constructor(t){super();p(this,"storage",localStorage);p(this,"prefix");this.collectionName=t,this.prefix=`ecs.${this.collectionName}`}getId(t){return`${this.prefix}.${t}`}async get(t){const r=this.storage.getItem(this.getId(t));return r&&JSON.parse(r)}async set(t,r){this.storage.setItem(this.getId(t),JSON.stringify(r)),this.emit("add",{id:t,val:r})}async remove(t){return this.storage.removeItem(this.getId(t)),this.emit("remove",{id:t}),!0}async query(t={}){const r=new RegExp(this.prefix);return Object.keys(this.storage).reduce((o,i)=>{if(!r.test(i))return o;const a=JSON.parse(this.storage.getItem(i));return(Object.keys(t).length===0||this.matchValues(t,a))&&o.push(a),o},[])}matchValues(t={},r){return Object.keys(t).every(o=>t[o]===r[o])}}class re extends G{constructor(t){super();p(this,"data",{});this.collectionName=t}async get(t){return this.data[t]}async set(t,r){this.data[t]=r,this.emit("add",{id:t,val:r})}async remove(t){return delete this.data[t],this.emit("remove",{id:t}),!0}async query(t={}){return Object.keys(this.data).reduce((r,o)=>{const i=this.data[o];return(Object.keys(t).length===0||this.matchValues(t,i))&&r.push(i),r},[])}matchValues(t={},r){return Object.keys(t).every(o=>t[o]===r[o])}}class oe extends ut{constructor(){super(...arguments);p(this,"storage",sessionStorage)}}class z{constructor(n,t){this.world=n,this.opt=t}async run(){var n,t;await((n=this.preUpdate)==null?void 0:n.call(this));for(const r of this.queryComponents())try{await this.update(r)}catch(o){console.error(o.message,o.stack),this.world.emit("system:error",{systemName:this.opt.name,components:r})}await((t=this.postUpdate)==null?void 0:t.call(this))}queryComponents(){return this.world.queryComponents(this.opt.componentNames)}}class Go extends z{constructor(t){super(t,{componentNames:["initStorage"],name:"initStorage",updateBefore:"storage",beforeAll:!0});p(this,"storage",{memory:new re("entity"),session:new oe("entity"),local:new ut("entity")})}async update([t]){if(!t)return;const r=this.world.findEntityById(t.entityId),o=this.storage[t.data.type];t.data.initialized||(this.world.loadEntities(await o.query()),t.data.initialized=!0,t.setData({initialized:!0}),r.dispose(),this.world.tick())}}class Vo extends z{constructor(t){super(t,{componentNames:["storage"],name:"storage"});p(this,"storage",{memory:new re("entity"),session:new oe("entity"),local:new ut("entity")})}async update([t]){if(!t)return;const r=this.world.findEntityById(t.entityId),o=this.storage[t.data.type];if(o){if(t.data.toBeRemoved){await o.remove(r.id);return}r!=null&&r.updated&&(await o.set(r.id,this.world.exportEntity(r)),r.updated=!1)}}}class ko extends z{constructor(n){super(n,{componentNames:["create"],name:"creation"}),this.world=n}async update([n]){var t,r,o;n.data.node=n.data.node||((r=(t=this.world.options)==null?void 0:t.screen)==null?void 0:r.querySelector(n.data.nodeSelector)),n.data.node&&!((o=n.data.node)!=null&&o.classList.contains("initialized"))&&(n.data.node.innerHTML=`
      <div class="input-group">
        <input type="text" class="form-control creation-input" placeholder="to do content" aria-label="to do content">
        <button class="btn btn-outline-secondary submit-btn" type="button" id="button-addon2">Add</button>
      </div>`,n.data.node.classList.add("initialized"),n.data.node.querySelector(".submit-btn").addEventListener("click",i=>{var s;console.log(i);const a=(s=n.data.node)==null?void 0:s.querySelector(".creation-input").value;console.log("val",a),a&&(Fo(a,this.world),this.world.tick())}))}}class Ko extends z{constructor(n){super(n,{componentNames:["toDoItem","remove"],name:"remove",afterAll:!0}),this.world=n}container(n){var t,r;return(r=(t=this.world.options)==null?void 0:t.screen)==null?void 0:r.querySelector(n)}async update([,n]){const t=this.world.findEntityById(n.entityId);!t||(t.dispose(),await this.world.tick())}}function Q(e,n,t,r){const o=i=>{var s;const a=(s=i.target)==null?void 0:s.closest(n);a&&r(a)};return t.addEventListener(e,o),function(){t.removeEventListener(e,o)}}class Jo extends z{constructor(t){super(t,{componentNames:["toDoList"],name:"toDoList",updateBefore:"storage"});p(this,"toDoItemsArchType");this.world=t,this.toDoItemsArchType=this.world.archetype(["toDoItem"])}container(t){var r,o;return(o=(r=this.world.options)==null?void 0:r.screen)==null?void 0:o.querySelector(t)}async update([t]){if(!this.world.findEntityById(t.entityId))return;if(!this.container(t.data.container)){console.warn("toDoListSystem: container not found");return}this.renderContainer(t),this.renderToDoItems(t)}getItemsNode(t){const r=this.container(t);return r==null?void 0:r.querySelector(".to-do-list-items")}renderContainer(t){const r=this.container(t.data.container);if(!r){console.warn("toDoListSystem: container not found");return}let o=r.querySelector(".to-do-list-action");const i=t.data.renderType;if(o)o.setAttribute("data-type",i);else{r.innerHTML=`
        <div class="to-do-list-action btn-group" data-type="${i}">

        </div>
        <ul class="to-do-list-items list-group"></ul>
      `;const u=r.querySelector(".to-do-list-items");o=r.querySelector(".to-do-list-action"),Q("click",".btn",o,d=>{console.log("node",d);const l=d.getAttribute("data-type");t.setData({renderType:l}),this.world.tick()}),Q("click",'input[type="checkbox"]',u,d=>{console.log("node",d,d.checked);const l=d.parentElement.getAttribute("data-id");this.world.findEntityById(l).findComponents(["toDoItem"])[0].setData({status:d.checked?"completed":"pending"}),this.world.tick()}),Q("click","button.btn-remove-item",u,d=>{const l=d.parentElement.getAttribute("data-id"),g=this.world.findEntityById(l);g.addComponent({componentName:"remove"});const[m]=g.findComponents(["storage"]);m.setData({toBeRemoved:!0}),this.world.tick()})}const a=i==="all"?"active":"",s=i==="pending"?"active":"",c=i==="completed"?"active":"";o.innerHTML=`<button type="button" class="btn btn-outline-secondary all-btn ${a}" type="submit" data-type="all">All</button>
    <button type="button" class="btn btn-outline-secondary pending-btn ${s}" type="submit" data-type="pending">Pending</button>
    <button type="button" class="btn btn-outline-secondary completed-btn ${c}" type="submit" data-type="completed">Completed</button>`}renderToDoItems(t){const r=this.getItemsNode(t.data.container);for(const i of this.toDoItemsArchType.entityIds){const a=this.world.findEntityById(i);if(!a)continue;const c=a.findComponents(["toDoItem"])[0],u=t.data.renderType;let d=this.findNodeById(i,r);if(u!=="all"&&c.data.status!==u){d==null||d.remove();continue}const l=c.data.status==="completed"?"checked":"";d?(d.classList[l?"add":"remove"]("checked"),d.querySelector("input")[l?"setAttribute":"removeAttribute"](l,"")):(r==null||r.insertAdjacentHTML("beforeend",`<li class="list-group-item d-flex to-do-list-item ${l}" data-id=${i}>
            <input class="form-check-input me-2" type="checkbox" ${l}>
            <span class="to-do-list-content">${c.data.content}</span>
            <button type="button" class="btn btn-outline-danger btn-remove-item">Remove</button>
          </li>`),d=this.findNodeById(i,r))}this.findNodes(r).forEach(i=>{const a=i.getAttribute("data-id");a&&!this.toDoItemsArchType.entityIds.has(a)&&i.remove()})}findNodeById(t,r){return r==null?void 0:r.querySelector(`.to-do-list-item[data-id="${t}"]`)}findNodes(t){return t?Array.from(t.querySelectorAll(".to-do-list-item[data-id]")||[]):[]}}const Xo={creation:ko,toDoList:Jo,initStorage:Go,storage:Vo,remove:Ko};class Wo extends HTMLElement{constructor(){super();p(this,"world");this.world=new qo({screen:this}),this.registerComponents(),this.registerSystems()}connectedCallback(){this.innerHTML=`<div class="todo-list-container">
      <div class="create-container"></div>
      <div class="todo-list-items"></div>
    </div>`,zo(this.world),Uo(this.world),Ho(this.world),this.world.tick()}registerComponents(){this.world.registerComponents(Mo)}registerSystems(){this.world.addSystems(Xo)}}customElements.define("todo-list",Wo)});export default Yo();
