import{i as C,s as A,j as D,k as M,m as P,o as I,p as b,q as Y,H as j,r as q,t as T,v as g,w as O,x as B,f as v,y as $,z,A as F,B as G,C as W,D as J,F as K,d as Q,G as U,h as E,I as X,c as Z}from"./CItLrmMQ.js";import{b as x}from"./DHIX-hIT.js";const rr=["touchstart","touchmove"];function er(r){return rr.includes(r)}const k=new Set,S=new Set;function nr(r){for(var e=0;e<r.length;e++)k.add(r[e]);for(var a of S)a(r)}function m(r){var R;var e=this,a=e.ownerDocument,c=r.type,i=((R=r.composedPath)==null?void 0:R.call(r))||[],t=i[0]||r.target,d=0,_=r.__root;if(_){var u=i.indexOf(_);if(u!==-1&&(e===document||e===window)){r.__root=e;return}var h=i.indexOf(e);if(h===-1)return;u<=h&&(d=u)}if(t=i[d]||r.target,t!==e){C(r,"currentTarget",{configurable:!0,get(){return t||a}});var w=P,o=I;A(null),D(null);try{for(var s,n=[];t!==null;){var f=t.assignedSlot||t.parentNode||t.host||null;try{var l=t["__"+c];if(l!==void 0&&(!t.disabled||r.target===t))if(M(l)){var[L,...V]=l;L.apply(t,[r,...V])}else l.call(t,r)}catch(y){s?n.push(y):s=y}if(r.cancelBubble||f===e||f===null)break;t=f}if(s){for(let y of n)queueMicrotask(()=>{throw y});throw s}}finally{r.__root=e,delete r.currentTarget,A(w),D(o)}}}function or(r,e){var a=e==null?"":typeof e=="object"?e+"":e;a!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=a,r.nodeValue=a+"")}function tr(r,e){return H(r,e)}function ir(r,e){b(),e.intro=e.intro??!1;const a=e.target,c=E,i=v;try{for(var t=Y(a);t&&(t.nodeType!==8||t.data!==j);)t=q(t);if(!t)throw T;g(!0),O(t),B();const d=H(r,{...e,anchor:t});if(v===null||v.nodeType!==8||v.data!==$)throw z(),T;return g(!1),d}catch(d){if(d===T)return e.recover===!1&&F(),b(),G(a),g(!1),tr(r,e);throw d}finally{g(c),O(i)}}const p=new Map;function H(r,{target:e,anchor:a,props:c={},events:i,context:t,intro:d=!0}){b();var _=new Set,u=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!_.has(n)){_.add(n);var f=er(n);e.addEventListener(n,m,{passive:f});var l=p.get(n);l===void 0?(document.addEventListener(n,m,{passive:f}),p.set(n,1)):p.set(n,l+1)}}};u(W(k)),S.add(u);var h=void 0,w=J(()=>{var o=a??e.appendChild(K());return Q(()=>{if(t){U({});var s=Z;s.c=t}i&&(c.$$events=i),E&&x(o,null),h=r(o,c)||{},E&&(I.nodes_end=v),t&&X()}),()=>{var f;for(var s of _){e.removeEventListener(s,m);var n=p.get(s);--n===0?(document.removeEventListener(s,m),p.delete(s)):p.set(s,n)}S.delete(u),o!==a&&((f=o.parentNode)==null||f.removeChild(o))}});return N.set(h,w),h}let N=new WeakMap;function fr(r,e){const a=N.get(r);return a?(N.delete(r),a(e)):Promise.resolve()}export{nr as d,ir as h,tr as m,or as s,fr as u};
