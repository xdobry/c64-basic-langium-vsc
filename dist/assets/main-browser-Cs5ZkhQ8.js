(function(){"use strict";function Be(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Wt(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function Dv(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Vs(t){return typeof t=="object"&&t!==null&&Be(t.container)&&Wt(t.reference)&&typeof t.message=="string"}class uf{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,n){return Be(e)&&this.isSubtype(e.$type,n)}isSubtype(e,n){if(e===n)return!0;let r=this.subtypes[e];r||(r=this.subtypes[e]={});const i=r[n];if(i!==void 0)return i;{const s=this.computeIsSubtype(e,n);return r[n]=s,s}}getAllSubTypes(e){const n=this.allSubtypes[e];if(n)return n;{const r=this.getAllTypes(),i=[];for(const s of r)this.isSubtype(s,e)&&i.push(s);return this.allSubtypes[e]=i,i}}}function on(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function Yn(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function lf(t){return on(t)&&typeof t.fullText=="string"}class Ue{constructor(e,n){this.startFn=e,this.nextFn=n}iterator(){const e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){const e=this.iterator();let n=0,r=e.next();for(;!r.done;)n++,r=e.next();return n}toArray(){const e=[],n=this.iterator();let r;do r=n.next(),r.value!==void 0&&e.push(r.value);while(!r.done);return e}toSet(){return new Set(this)}toMap(e,n){const r=this.map(i=>[e?e(i):i,n?n(i):i]);return new Map(r)}toString(){return this.join()}concat(e){return new Ue(()=>({first:this.startFn(),firstDone:!1,iterator:e[Symbol.iterator]()}),n=>{let r;if(!n.firstDone){do if(r=this.nextFn(n.first),!r.done)return r;while(!r.done);n.firstDone=!0}do if(r=n.iterator.next(),!r.done)return r;while(!r.done);return ut})}join(e=","){const n=this.iterator();let r="",i,s=!1;do i=n.next(),i.done||(s&&(r+=e),r+=Ov(i.value)),s=!0;while(!i.done);return r}indexOf(e,n=0){const r=this.iterator();let i=0,s=r.next();for(;!s.done;){if(i>=n&&s.value===e)return i;s=r.next(),i++}return-1}every(e){const n=this.iterator();let r=n.next();for(;!r.done;){if(!e(r.value))return!1;r=n.next()}return!0}some(e){const n=this.iterator();let r=n.next();for(;!r.done;){if(e(r.value))return!0;r=n.next()}return!1}forEach(e){const n=this.iterator();let r=0,i=n.next();for(;!i.done;)e(i.value,r),i=n.next(),r++}map(e){return new Ue(this.startFn,n=>{const{done:r,value:i}=this.nextFn(n);return r?ut:{done:!1,value:e(i)}})}filter(e){return new Ue(this.startFn,n=>{let r;do if(r=this.nextFn(n),!r.done&&e(r.value))return r;while(!r.done);return ut})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,n){const r=this.iterator();let i=n,s=r.next();for(;!s.done;)i===void 0?i=s.value:i=e(i,s.value),s=r.next();return i}reduceRight(e,n){return this.recursiveReduce(this.iterator(),e,n)}recursiveReduce(e,n,r){const i=e.next();if(i.done)return r;const s=this.recursiveReduce(e,n,r);return s===void 0?i.value:n(s,i.value)}find(e){const n=this.iterator();let r=n.next();for(;!r.done;){if(e(r.value))return r.value;r=n.next()}}findIndex(e){const n=this.iterator();let r=0,i=n.next();for(;!i.done;){if(e(i.value))return r;i=n.next(),r++}return-1}includes(e){const n=this.iterator();let r=n.next();for(;!r.done;){if(r.value===e)return!0;r=n.next()}return!1}flatMap(e){return new Ue(()=>({this:this.startFn()}),n=>{do{if(n.iterator){const s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}const{done:r,value:i}=this.nextFn(n.this);if(!r){const s=e(i);if(Xs(s))n.iterator=s[Symbol.iterator]();else return{done:!1,value:s}}}while(n.iterator);return ut})}flat(e){if(e===void 0&&(e=1),e<=0)return this;const n=e>1?this.flat(e-1):this;return new Ue(()=>({this:n.startFn()}),r=>{do{if(r.iterator){const o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}const{done:i,value:s}=n.nextFn(r.this);if(!i)if(Xs(s))r.iterator=s[Symbol.iterator]();else return{done:!1,value:s}}while(r.iterator);return ut})}head(){const n=this.iterator().next();if(!n.done)return n.value}tail(e=1){return new Ue(()=>{const n=this.startFn();for(let r=0;r<e;r++)if(this.nextFn(n).done)return n;return n},this.nextFn)}limit(e){return new Ue(()=>({size:0,state:this.startFn()}),n=>(n.size++,n.size>e?ut:this.nextFn(n.state)))}distinct(e){return new Ue(()=>({set:new Set,internalState:this.startFn()}),n=>{let r;do if(r=this.nextFn(n.internalState),!r.done){const i=e?e(r.value):r.value;if(!n.set.has(i))return n.set.add(i),r}while(!r.done);return ut})}exclude(e,n){const r=new Set;for(const i of e){const s=n?n(i):i;r.add(s)}return this.filter(i=>{const s=n?n(i):i;return!r.has(s)})}}function Ov(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Xs(t){return!!t&&typeof t[Symbol.iterator]=="function"}const Ys=new Ue(()=>{},()=>ut),ut=Object.freeze({done:!0,value:void 0});function Se(...t){if(t.length===1){const e=t[0];if(e instanceof Ue)return e;if(Xs(e))return new Ue(()=>e[Symbol.iterator](),n=>n.next());if(typeof e.length=="number")return new Ue(()=>({index:0}),n=>n.index<e.length?{done:!1,value:e[n.index++]}:ut)}return t.length>1?new Ue(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){const n=e.iterator.next();if(!n.done)return n;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){const n=t[e.collIndex++];Xs(n)?e.iterator=n[Symbol.iterator]():n&&typeof n.length=="number"&&(e.array=n)}}while(e.iterator||e.array||e.collIndex<t.length);return ut}):Ys}class Js extends Ue{constructor(e,n,r){super(()=>({iterators:r?.includeRoot?[[e][Symbol.iterator]()]:[n(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){const o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(n(o.value)[Symbol.iterator]()),o}return ut})}iterator(){const e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}}var Zc;(function(t){function e(s){return s.reduce((o,a)=>o+a,0)}t.sum=e;function n(s){return s.reduce((o,a)=>o*a,0)}t.product=n;function r(s){return s.reduce((o,a)=>Math.min(o,a))}t.min=r;function i(s){return s.reduce((o,a)=>Math.max(o,a))}t.max=i})(Zc||(Zc={}));function ei(t){return new Js(t,e=>on(e)?e.content:[],{includeRoot:!0})}function xv(t){return ei(t).filter(Yn)}function Lv(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function eu(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function Qs(t){if(!t)return;const{offset:e,end:n,range:r}=t;return{range:r,offset:e,end:n,length:n-e}}var an;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside",t[t.Outside=5]="Outside"})(an||(an={}));function Mv(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<=e.start.character)return an.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>=e.end.character)return an.After;const n=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,r=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return n&&r?an.Inside:n?an.OverlapBack:r?an.OverlapFront:an.Outside}function Fv(t,e){return Mv(t,e)>an.After}const df=/^[\w\p{L}]$/u;function Jn(t,e,n=df){if(t){if(e>0){const r=e-t.offset,i=t.text.charAt(r);n.test(i)||e--}return hf(t,e)}}function jv(t,e){if(t){const n=qv(t,!0);if(n&&ff(n,e))return n;if(lf(t)){const r=t.content.findIndex(i=>!i.hidden);for(let i=r-1;i>=0;i--){const s=t.content[i];if(ff(s,e))return s}}}}function ff(t,e){return Yn(t)&&e.includes(t.tokenType.name)}function hf(t,e){if(Yn(t))return t;if(on(t)){const n=pf(t,e,!1);if(n)return hf(n,e)}}function tu(t,e){if(Yn(t))return t;if(on(t)){const n=pf(t,e,!0);if(n)return tu(n,e)}}function pf(t,e,n){let r=0,i=t.content.length-1,s;for(;r<=i;){const o=Math.floor((r+i)/2),a=t.content[o];if(a.offset<=e&&a.end>e)return a;a.end<=e?(s=n?a:void 0,r=o+1):i=o-1}return s}function qv(t,e=!0){for(;t.container;){const n=t.container;let r=n.content.indexOf(t);for(;r>0;){r--;const i=n.content[r];if(e||!i.hidden)return i}t=n}}function Hv(t,e=!0){for(;t.container;){const n=t.container;let r=n.content.indexOf(t);const i=n.content.length-1;for(;r<i;){r++;const s=n.content[r];if(e||!s.hidden)return s}t=n}}function Uv(t,e){const n=Gv(t,e);return n?n.parent.content.slice(n.a+1,n.b):[]}function Gv(t,e){const n=mf(t),r=mf(e);let i;for(let s=0;s<n.length&&s<r.length;s++){const o=n[s],a=r[s];if(o.parent===a.parent)i={parent:o.parent,a:o.index,b:a.index};else break}return i}function mf(t){const e=[];for(;t.container;){const n=t.container,r=n.content.indexOf(t);e.push({parent:n,index:r}),t=n}return e.reverse()}class gf extends Error{constructor(e,n){super(e?`${n} at ${e.range.start.line}:${e.range.start.character}`:n)}}function Zs(t){throw new Error("Error! The input value was not handled.")}const eo="AbstractRule",to="AbstractType",nu="Condition",yf="TypeDefinition",ru="ValueLiteral",ti="AbstractElement";function vf(t){return ie.isInstance(t,ti)}const no="ArrayLiteral",ro="ArrayType",ni="BooleanLiteral";function Wv(t){return ie.isInstance(t,ni)}const ri="Conjunction";function Bv(t){return ie.isInstance(t,ri)}const ii="Disjunction";function Kv(t){return ie.isInstance(t,ii)}const io="Grammar",iu="GrammarImport",si="InferredType";function Tf(t){return ie.isInstance(t,si)}const oi="Interface";function Rf(t){return ie.isInstance(t,oi)}const su="NamedArgument",ai="Negation";function zv(t){return ie.isInstance(t,ai)}const so="NumberLiteral",oo="Parameter",ci="ParameterReference";function Vv(t){return ie.isInstance(t,ci)}const ui="ParserRule";function Qe(t){return ie.isInstance(t,ui)}const ao="ReferenceType",co="ReturnType";function Xv(t){return ie.isInstance(t,co)}const li="SimpleType";function Yv(t){return ie.isInstance(t,li)}const uo="StringLiteral",yr="TerminalRule";function Pn(t){return ie.isInstance(t,yr)}const di="Type";function Sf(t){return ie.isInstance(t,di)}const ou="TypeAttribute",lo="UnionType",fi="Action";function hi(t){return ie.isInstance(t,fi)}const pi="Alternatives";function au(t){return ie.isInstance(t,pi)}const mi="Assignment";function Bt(t){return ie.isInstance(t,mi)}const gi="CharacterRange";function Jv(t){return ie.isInstance(t,gi)}const yi="CrossReference";function vi(t){return ie.isInstance(t,yi)}const Ti="EndOfFile";function Qv(t){return ie.isInstance(t,Ti)}const Ri="Group";function Qn(t){return ie.isInstance(t,Ri)}const Si="Keyword";function Kt(t){return ie.isInstance(t,Si)}const bi="NegatedToken";function Zv(t){return ie.isInstance(t,bi)}const _i="RegexToken";function eT(t){return ie.isInstance(t,_i)}const Ei="RuleCall";function cn(t){return ie.isInstance(t,Ei)}const wi="TerminalAlternatives";function tT(t){return ie.isInstance(t,wi)}const ki="TerminalGroup";function nT(t){return ie.isInstance(t,ki)}const Ci="TerminalRuleCall";function rT(t){return ie.isInstance(t,Ci)}const Ai="UnorderedGroup";function cu(t){return ie.isInstance(t,Ai)}const Ni="UntilToken";function iT(t){return ie.isInstance(t,Ni)}const Pi="Wildcard";function sT(t){return ie.isInstance(t,Pi)}class bf extends uf{getAllTypes(){return[ti,eo,to,fi,pi,no,ro,mi,ni,gi,nu,ri,yi,ii,Ti,io,iu,Ri,si,oi,Si,su,bi,ai,so,oo,ci,ui,ao,_i,co,Ei,li,uo,wi,ki,yr,Ci,di,ou,yf,lo,Ai,Ni,ru,Pi]}computeIsSubtype(e,n){switch(e){case fi:case pi:case mi:case gi:case yi:case Ti:case Ri:case Si:case bi:case _i:case Ei:case wi:case ki:case Ci:case Ai:case Ni:case Pi:return this.isSubtype(ti,n);case no:case so:case uo:return this.isSubtype(ru,n);case ro:case ao:case li:case lo:return this.isSubtype(yf,n);case ni:return this.isSubtype(nu,n)||this.isSubtype(ru,n);case ri:case ii:case ai:case ci:return this.isSubtype(nu,n);case si:case oi:case di:return this.isSubtype(to,n);case ui:return this.isSubtype(eo,n)||this.isSubtype(to,n);case yr:return this.isSubtype(eo,n);default:return!1}}getReferenceType(e){const n=`${e.container.$type}:${e.property}`;switch(n){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return to;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return eo;case"Grammar:usedGrammars":return io;case"NamedArgument:parameter":case"ParameterReference:parameter":return oo;case"TerminalRuleCall:rule":return yr;default:throw new Error(`${n} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case ti:return{name:ti,properties:[{name:"cardinality"},{name:"lookahead"}]};case no:return{name:no,properties:[{name:"elements",defaultValue:[]}]};case ro:return{name:ro,properties:[{name:"elementType"}]};case ni:return{name:ni,properties:[{name:"true",defaultValue:!1}]};case ri:return{name:ri,properties:[{name:"left"},{name:"right"}]};case ii:return{name:ii,properties:[{name:"left"},{name:"right"}]};case io:return{name:io,properties:[{name:"definesHiddenTokens",defaultValue:!1},{name:"hiddenTokens",defaultValue:[]},{name:"imports",defaultValue:[]},{name:"interfaces",defaultValue:[]},{name:"isDeclared",defaultValue:!1},{name:"name"},{name:"rules",defaultValue:[]},{name:"types",defaultValue:[]},{name:"usedGrammars",defaultValue:[]}]};case iu:return{name:iu,properties:[{name:"path"}]};case si:return{name:si,properties:[{name:"name"}]};case oi:return{name:oi,properties:[{name:"attributes",defaultValue:[]},{name:"name"},{name:"superTypes",defaultValue:[]}]};case su:return{name:su,properties:[{name:"calledByName",defaultValue:!1},{name:"parameter"},{name:"value"}]};case ai:return{name:ai,properties:[{name:"value"}]};case so:return{name:so,properties:[{name:"value"}]};case oo:return{name:oo,properties:[{name:"name"}]};case ci:return{name:ci,properties:[{name:"parameter"}]};case ui:return{name:ui,properties:[{name:"dataType"},{name:"definesHiddenTokens",defaultValue:!1},{name:"definition"},{name:"entry",defaultValue:!1},{name:"fragment",defaultValue:!1},{name:"hiddenTokens",defaultValue:[]},{name:"inferredType"},{name:"name"},{name:"parameters",defaultValue:[]},{name:"returnType"},{name:"wildcard",defaultValue:!1}]};case ao:return{name:ao,properties:[{name:"referenceType"}]};case co:return{name:co,properties:[{name:"name"}]};case li:return{name:li,properties:[{name:"primitiveType"},{name:"stringType"},{name:"typeRef"}]};case uo:return{name:uo,properties:[{name:"value"}]};case yr:return{name:yr,properties:[{name:"definition"},{name:"fragment",defaultValue:!1},{name:"hidden",defaultValue:!1},{name:"name"},{name:"type"}]};case di:return{name:di,properties:[{name:"name"},{name:"type"}]};case ou:return{name:ou,properties:[{name:"defaultValue"},{name:"isOptional",defaultValue:!1},{name:"name"},{name:"type"}]};case lo:return{name:lo,properties:[{name:"types",defaultValue:[]}]};case fi:return{name:fi,properties:[{name:"cardinality"},{name:"feature"},{name:"inferredType"},{name:"lookahead"},{name:"operator"},{name:"type"}]};case pi:return{name:pi,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case mi:return{name:mi,properties:[{name:"cardinality"},{name:"feature"},{name:"lookahead"},{name:"operator"},{name:"terminal"}]};case gi:return{name:gi,properties:[{name:"cardinality"},{name:"left"},{name:"lookahead"},{name:"right"}]};case yi:return{name:yi,properties:[{name:"cardinality"},{name:"deprecatedSyntax",defaultValue:!1},{name:"lookahead"},{name:"terminal"},{name:"type"}]};case Ti:return{name:Ti,properties:[{name:"cardinality"},{name:"lookahead"}]};case Ri:return{name:Ri,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"guardCondition"},{name:"lookahead"}]};case Si:return{name:Si,properties:[{name:"cardinality"},{name:"lookahead"},{name:"value"}]};case bi:return{name:bi,properties:[{name:"cardinality"},{name:"lookahead"},{name:"terminal"}]};case _i:return{name:_i,properties:[{name:"cardinality"},{name:"lookahead"},{name:"regex"}]};case Ei:return{name:Ei,properties:[{name:"arguments",defaultValue:[]},{name:"cardinality"},{name:"lookahead"},{name:"rule"}]};case wi:return{name:wi,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case ki:return{name:ki,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case Ci:return{name:Ci,properties:[{name:"cardinality"},{name:"lookahead"},{name:"rule"}]};case Ai:return{name:Ai,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case Ni:return{name:Ni,properties:[{name:"cardinality"},{name:"lookahead"},{name:"terminal"}]};case Pi:return{name:Pi,properties:[{name:"cardinality"},{name:"lookahead"}]};default:return{name:e,properties:[]}}}}const ie=new bf;function oT(t){for(const[e,n]of Object.entries(t))e.startsWith("$")||(Array.isArray(n)?n.forEach((r,i)=>{Be(r)&&(r.$container=t,r.$containerProperty=e,r.$containerIndex=i)}):Be(n)&&(n.$container=t,n.$containerProperty=e))}function rt(t,e){let n=t;for(;n;){if(e(n))return n;n=n.$container}}function gt(t){const n=aT(t).$document;if(!n)throw new Error("AST node has no document.");return n}function aT(t){for(;t.$container;)t=t.$container;return t}function fo(t,e){if(!t)throw new Error("Node must be an AstNode.");const n=e?.range;return new Ue(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),r=>{for(;r.keyIndex<r.keys.length;){const i=r.keys[r.keyIndex];if(!i.startsWith("$")){const s=t[i];if(Be(s)){if(r.keyIndex++,_f(s,n))return{done:!1,value:s}}else if(Array.isArray(s)){for(;r.arrayIndex<s.length;){const o=r.arrayIndex++,a=s[o];if(Be(a)&&_f(a,n))return{done:!1,value:a}}r.arrayIndex=0}}r.keyIndex++}return ut})}function Zn(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Js(t,n=>fo(n,e))}function vr(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Js(t,n=>fo(n,e),{includeRoot:!0})}function _f(t,e){var n;if(!e)return!0;const r=(n=t.$cstNode)===null||n===void 0?void 0:n.range;return r?Fv(r,e):!1}function Ef(t){return new Ue(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){const n=e.keys[e.keyIndex];if(!n.startsWith("$")){const r=t[n];if(Wt(r))return e.keyIndex++,{done:!1,value:{reference:r,container:t,property:n}};if(Array.isArray(r)){for(;e.arrayIndex<r.length;){const i=e.arrayIndex++,s=r[i];if(Wt(s))return{done:!1,value:{reference:s,container:t,property:n,index:i}}}e.arrayIndex=0}}e.keyIndex++}return ut})}function wf(t,e){const n=t.getTypeMetaData(e.$type),r=e;for(const i of n.properties)i.defaultValue!==void 0&&r[i.name]===void 0&&(r[i.name]=kf(i.defaultValue))}function kf(t){return Array.isArray(t)?[...t.map(kf)]:t}function W(t){return t.charCodeAt(0)}function uu(t,e){Array.isArray(t)?t.forEach(function(n){e.push(n)}):e.push(t)}function $i(t,e){if(t[e]===!0)throw"duplicate flag "+e;t[e],t[e]=!0}function Tr(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function cT(){throw Error("Internal Error - Should never get here!")}function Cf(t){return t.type==="Character"}const ho=[];for(let t=W("0");t<=W("9");t++)ho.push(t);const po=[W("_")].concat(ho);for(let t=W("a");t<=W("z");t++)po.push(t);for(let t=W("A");t<=W("Z");t++)po.push(t);const Af=[W(" "),W("\f"),W(`
`),W("\r"),W("	"),W("\v"),W("	"),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W(" "),W("\u2028"),W("\u2029"),W(" "),W(" "),W("　"),W("\uFEFF")],uT=/[0-9a-fA-F]/,mo=/[0-9]/,lT=/[1-9]/;class Nf{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");const n=this.disjunction();this.consumeChar("/");const r={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":$i(r,"global");break;case"i":$i(r,"ignoreCase");break;case"m":$i(r,"multiLine");break;case"u":$i(r,"unicode");break;case"y":$i(r,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:r,value:n,loc:this.loc(0)}}disjunction(){const e=[],n=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(n)}}alternative(){const e=[],n=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(n)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){const e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let n;switch(this.popChar()){case"=":n="Lookahead";break;case"!":n="NegativeLookahead";break}Tr(n);const r=this.disjunction();return this.consumeChar(")"),{type:n,value:r,loc:this.loc(e)}}return cT()}quantifier(e=!1){let n;const r=this.idx;switch(this.popChar()){case"*":n={atLeast:0,atMost:1/0};break;case"+":n={atLeast:1,atMost:1/0};break;case"?":n={atLeast:0,atMost:1};break;case"{":const i=this.integerIncludingZero();switch(this.popChar()){case"}":n={atLeast:i,atMost:i};break;case",":let s;this.isDigit()?(s=this.integerIncludingZero(),n={atLeast:i,atMost:s}):n={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&n===void 0)return;Tr(n);break}if(!(e===!0&&n===void 0)&&Tr(n))return this.peekChar(0)==="?"?(this.consumeChar("?"),n.greedy=!1):n.greedy=!0,n.type="Quantifier",n.loc=this.loc(r),n}atom(){let e;const n=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}if(e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),Tr(e))return e.loc=this.loc(n),this.isQuantifier()&&(e.quantifier=this.quantifier()),e}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[W(`
`),W("\r"),W("\u2028"),W("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,n=!1;switch(this.popChar()){case"d":e=ho;break;case"D":e=ho,n=!0;break;case"s":e=Af;break;case"S":e=Af,n=!0;break;case"w":e=po;break;case"W":e=po,n=!0;break}if(Tr(e))return{type:"Set",value:e,complement:n}}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=W("\f");break;case"n":e=W(`
`);break;case"r":e=W("\r");break;case"t":e=W("	");break;case"v":e=W("\v");break}if(Tr(e))return{type:"Character",value:e}}controlLetterEscapeAtom(){this.consumeChar("c");const e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:W("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){const e=this.popChar();return{type:"Character",value:W(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:const e=this.popChar();return{type:"Character",value:W(e)}}}characterClass(){const e=[];let n=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),n=!0);this.isClassAtom();){const r=this.classAtom();if(r.type,Cf(r)&&this.isRangeDash()){this.consumeChar("-");const i=this.classAtom();if(i.type,Cf(i)){if(i.value<r.value)throw Error("Range out of order in character class");e.push({from:r.value,to:i.value})}else uu(r.value,e),e.push(W("-")),uu(i.value,e)}else uu(r.value,e)}return this.consumeChar("]"),{type:"Set",complement:n,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:W("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}const n=this.disjunction();this.consumeChar(")");const r={type:"Group",capturing:e,value:n};return e&&(r.idx=this.groupIdx),r}positiveInteger(){let e=this.popChar();if(lT.test(e)===!1)throw Error("Expecting a positive integer");for(;mo.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(mo.test(e)===!1)throw Error("Expecting an integer");for(;mo.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){const e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:W(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return mo.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){const e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let n="";for(let i=0;i<e;i++){const s=this.popChar();if(uT.test(s)===!1)throw Error("Expecting a HexDecimal digits");n+=s}return{type:"Character",value:parseInt(n,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){const e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}}class go{visitChildren(e){for(const n in e){const r=e[n];e.hasOwnProperty(n)&&(r.type!==void 0?this.visit(r):Array.isArray(r)&&r.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}}const dT=/\r?\n/gm,fT=new Nf;class hT extends go{constructor(){super(...arguments),this.isStarting=!0,this.endRegexpStack=[],this.multiline=!1}get endRegex(){return this.endRegexpStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegexp="",this.isStarting=!0,this.endRegexpStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexpStack=[])}visitCharacter(e){const n=String.fromCharCode(e.value);if(!this.multiline&&n===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexpStack=[];else{const r=yo(n);this.endRegexpStack.push(r),this.isStarting&&(this.startRegexp+=r)}}visitSet(e){if(!this.multiline){const n=this.regex.substring(e.loc.begin,e.loc.end),r=new RegExp(n);this.multiline=!!`
`.match(r)}if(e.quantifier)this.isStarting=!1,this.endRegexpStack=[];else{const n=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexpStack.push(n),this.isStarting&&(this.startRegexp+=n)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}}const lu=new hT;function pT(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),lu.reset(t),lu.visit(fT.pattern(t)),lu.multiline}catch{return!1}}function Pf(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function yo(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function mT(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:yo(e)).join("")}function gT(t,e){const n=yT(t),r=e.match(n);return!!r&&r[0].length>0}function yT(t){typeof t=="string"&&(t=new RegExp(t));const e=t,n=t.source;let r=0;function i(){let s="",o;function a(u){s+=n.substr(r,u),r+=u}function c(u){s+="(?:"+n.substr(r,u)+"|$)",r+=u}for(;r<n.length;)switch(n[r]){case"\\":switch(n[r+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?n[r+2]==="{"?c(n.indexOf("}",r)-r+1):c(6):c(2);break;case"p":case"P":e.unicode?c(n.indexOf("}",r)-r+1):c(2);break;case"k":c(n.indexOf(">",r)-r+1);break;default:c(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=r,o=o.exec(n)||[],c(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=r,o=o.exec(n),o?a(o[0].length):c(1);break;case"(":if(n[r+1]==="?")switch(n[r+2]){case":":s+="(?:",r+=3,s+=i()+"|$)";break;case"=":s+="(?=",r+=3,s+=i()+")";break;case"!":o=r,r+=3,i(),s+=n.substr(o,r-o);break;case"<":switch(n[r+3]){case"=":case"!":o=r,r+=4,i(),s+=n.substr(o,r-o);break;default:a(n.indexOf(">",r)-r+1),s+=i()+"|$)";break}break}else a(1),s+=i()+"|$)";break;case")":return++r,s;default:c(1);break}return s}return new RegExp(i(),t.flags)}function du(t){return t.rules.find(e=>Qe(e)&&e.entry)}function vT(t){return t.rules.filter(e=>Pn(e)&&e.hidden)}function $f(t,e){const n=new Set,r=du(t);if(!r)return new Set(t.rules);const i=[r].concat(vT(t));for(const o of i)If(o,n,e);const s=new Set;for(const o of t.rules)(n.has(o.name)||Pn(o)&&o.hidden)&&s.add(o);return s}function If(t,e,n){e.add(t.name),Zn(t).forEach(r=>{if(cn(r)||n){const i=r.rule.ref;i&&!e.has(i.name)&&If(i,e,n)}})}function Df(t){if(t.terminal)return t.terminal;if(t.type.ref){const e=Mf(t.type.ref);return e?.terminal}}function TT(t){return t.hidden&&!To(t).test(" ")}function Of(t,e){return!t||!e?[]:hu(t,e,t.astNode,!0)}function fu(t,e,n){if(!t||!e)return;const r=hu(t,e,t.astNode,!0);if(r.length!==0)return n!==void 0?n=Math.max(0,Math.min(n,r.length-1)):n=0,r[n]}function hu(t,e,n,r){if(!r){const i=rt(t.grammarSource,Bt);if(i&&i.feature===e)return[t]}return on(t)&&t.astNode===n?t.content.flatMap(i=>hu(i,e,n,!1)):[]}function RT(t,e){return t?Lf(t,e,t?.astNode):[]}function xf(t,e,n){if(!t)return;const r=Lf(t,e,t?.astNode);if(r.length!==0)return n!==void 0?n=Math.max(0,Math.min(n,r.length-1)):n=0,r[n]}function Lf(t,e,n){if(t.astNode!==n)return[];if(Kt(t.grammarSource)&&t.grammarSource.value===e)return[t];const r=ei(t).iterator();let i;const s=[];do if(i=r.next(),!i.done){const o=i.value;o.astNode===n?Kt(o.grammarSource)&&o.grammarSource.value===e&&s.push(o):r.prune()}while(!i.done);return s}function ST(t){var e;const n=t.astNode;for(;n===((e=t.container)===null||e===void 0?void 0:e.astNode);){const r=rt(t.grammarSource,Bt);if(r)return r;t=t.container}}function Mf(t){let e=t;return Tf(e)&&(hi(e.$container)?e=e.$container.$container:Qe(e.$container)?e=e.$container:Zs(e.$container)),Ff(t,e,new Map)}function Ff(t,e,n){var r;function i(s,o){let a;return rt(s,Bt)||(a=Ff(o,o,n)),n.set(t,a),a}if(n.has(t))return n.get(t);n.set(t,void 0);for(const s of Zn(e)){if(Bt(s)&&s.feature.toLowerCase()==="name")return n.set(t,s),s;if(cn(s)&&Qe(s.rule.ref))return i(s,s.rule.ref);if(Yv(s)&&(!((r=s.typeRef)===null||r===void 0)&&r.ref))return i(s,s.typeRef.ref)}}function Ii(t,e){return t==="?"||t==="*"||Qn(e)&&!!e.guardCondition}function bT(t){return t==="*"||t==="+"}function jf(t){return qf(t,new Set)}function qf(t,e){if(e.has(t))return!0;e.add(t);for(const n of Zn(t))if(cn(n)){if(!n.rule.ref||Qe(n.rule.ref)&&!qf(n.rule.ref,e))return!1}else{if(Bt(n))return!1;if(hi(n))return!1}return!!t.definition}function Di(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){const e=t.returnType.ref;if(e){if(Qe(e))return e.name;if(Rf(e)||Sf(e))return e.name}}}function vo(t){var e;if(Qe(t))return jf(t)?t.name:(e=Di(t))!==null&&e!==void 0?e:t.name;if(Rf(t)||Sf(t)||Xv(t))return t.name;if(hi(t)){const n=_T(t);if(n)return n}else if(Tf(t))return t.name;throw new Error("Cannot get name of Unknown Type")}function _T(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return vo(t.type.ref)}function ET(t){var e,n,r;return Pn(t)?(n=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&n!==void 0?n:"string":(r=Di(t))!==null&&r!==void 0?r:t.name}function To(t){const e={s:!1,i:!1,u:!1},n=Rr(t.definition,e),r=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(n,r)}const pu=/[\s\S]/.source;function Rr(t,e){if(tT(t))return wT(t);if(nT(t))return kT(t);if(Jv(t))return NT(t);if(rT(t)){const n=t.rule.ref;if(!n)throw new Error("Missing rule reference.");return un(Rr(n.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Zv(t))return AT(t);if(iT(t))return CT(t);if(eT(t)){const n=t.regex.lastIndexOf("/"),r=t.regex.substring(1,n),i=t.regex.substring(n+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),un(r,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(sT(t))return un(pu,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function wT(t){return un(t.elements.map(e=>Rr(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function kT(t){return un(t.elements.map(e=>Rr(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function CT(t){return un(`${pu}*?${Rr(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function AT(t){return un(`(?!${Rr(t.terminal)})${pu}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function NT(t){return t.right?un(`[${mu(t.left)}-${mu(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):un(mu(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function mu(t){return yo(t.value)}function un(t,e){var n;return(e.wrap!==!1||e.lookahead)&&(t=`(${(n=e.lookahead)!==null&&n!==void 0?n:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function PT(t){const e=[],n=t.Grammar;for(const r of n.rules)Pn(r)&&TT(r)&&pT(To(r))&&e.push(r.name);return{multilineCommentRules:e,nameRegexp:df}}var Hf=typeof global=="object"&&global&&global.Object===Object&&global,$T=typeof self=="object"&&self&&self.Object===Object&&self,zt=Hf||$T||Function("return this")(),_t=zt.Symbol,Uf=Object.prototype,IT=Uf.hasOwnProperty,DT=Uf.toString,Oi=_t?_t.toStringTag:void 0;function OT(t){var e=IT.call(t,Oi),n=t[Oi];try{t[Oi]=void 0;var r=!0}catch{}var i=DT.call(t);return r&&(e?t[Oi]=n:delete t[Oi]),i}var xT=Object.prototype,LT=xT.toString;function MT(t){return LT.call(t)}var FT="[object Null]",jT="[object Undefined]",Gf=_t?_t.toStringTag:void 0;function $n(t){return t==null?t===void 0?jT:FT:Gf&&Gf in Object(t)?OT(t):MT(t)}function Ot(t){return t!=null&&typeof t=="object"}var qT="[object Symbol]";function xi(t){return typeof t=="symbol"||Ot(t)&&$n(t)==qT}function Ro(t,e){for(var n=-1,r=t==null?0:t.length,i=Array(r);++n<r;)i[n]=e(t[n],n,t);return i}var ee=Array.isArray,HT=1/0,Wf=_t?_t.prototype:void 0,Bf=Wf?Wf.toString:void 0;function Kf(t){if(typeof t=="string")return t;if(ee(t))return Ro(t,Kf)+"";if(xi(t))return Bf?Bf.call(t):"";var e=t+"";return e=="0"&&1/t==-HT?"-0":e}var UT=/\s/;function GT(t){for(var e=t.length;e--&&UT.test(t.charAt(e)););return e}var WT=/^\s+/;function BT(t){return t&&t.slice(0,GT(t)+1).replace(WT,"")}function Et(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var zf=NaN,KT=/^[-+]0x[0-9a-f]+$/i,zT=/^0b[01]+$/i,VT=/^0o[0-7]+$/i,XT=parseInt;function YT(t){if(typeof t=="number")return t;if(xi(t))return zf;if(Et(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Et(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=BT(t);var n=zT.test(t);return n||VT.test(t)?XT(t.slice(2),n?2:8):KT.test(t)?zf:+t}var Vf=1/0,JT=17976931348623157e292;function QT(t){if(!t)return t===0?t:0;if(t=YT(t),t===Vf||t===-Vf){var e=t<0?-1:1;return e*JT}return t===t?t:0}function So(t){var e=QT(t),n=e%1;return e===e?n?e-n:e:0}function er(t){return t}var ZT="[object AsyncFunction]",eR="[object Function]",tR="[object GeneratorFunction]",nR="[object Proxy]";function ln(t){if(!Et(t))return!1;var e=$n(t);return e==eR||e==tR||e==ZT||e==nR}var gu=zt["__core-js_shared__"],Xf=function(){var t=/[^.]+$/.exec(gu&&gu.keys&&gu.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function rR(t){return!!Xf&&Xf in t}var iR=Function.prototype,sR=iR.toString;function tr(t){if(t!=null){try{return sR.call(t)}catch{}try{return t+""}catch{}}return""}var oR=/[\\^$.*+?()[\]{}|]/g,aR=/^\[object .+?Constructor\]$/,cR=Function.prototype,uR=Object.prototype,lR=cR.toString,dR=uR.hasOwnProperty,fR=RegExp("^"+lR.call(dR).replace(oR,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function hR(t){if(!Et(t)||rR(t))return!1;var e=ln(t)?fR:aR;return e.test(tr(t))}function pR(t,e){return t?.[e]}function nr(t,e){var n=pR(t,e);return hR(n)?n:void 0}var yu=nr(zt,"WeakMap"),Yf=Object.create,mR=function(){function t(){}return function(e){if(!Et(e))return{};if(Yf)return Yf(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();function gR(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}function Fe(){}function yR(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}var vR=800,TR=16,RR=Date.now;function SR(t){var e=0,n=0;return function(){var r=RR(),i=TR-(r-n);if(n=r,i>0){if(++e>=vR)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}function bR(t){return function(){return t}}var bo=function(){try{var t=nr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),_R=bo?function(t,e){return bo(t,"toString",{configurable:!0,enumerable:!1,value:bR(e),writable:!0})}:er,ER=SR(_R);function Jf(t,e){for(var n=-1,r=t==null?0:t.length;++n<r&&e(t[n],n,t)!==!1;);return t}function Qf(t,e,n,r){for(var i=t.length,s=n+-1;++s<i;)if(e(t[s],s,t))return s;return-1}function wR(t){return t!==t}function kR(t,e,n){for(var r=n-1,i=t.length;++r<i;)if(t[r]===e)return r;return-1}function vu(t,e,n){return e===e?kR(t,e,n):Qf(t,wR,n)}function Zf(t,e){var n=t==null?0:t.length;return!!n&&vu(t,e,0)>-1}var CR=9007199254740991,AR=/^(?:0|[1-9]\d*)$/;function _o(t,e){var n=typeof t;return e=e??CR,!!e&&(n=="number"||n!="symbol"&&AR.test(t))&&t>-1&&t%1==0&&t<e}function Tu(t,e,n){e=="__proto__"&&bo?bo(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}function Li(t,e){return t===e||t!==t&&e!==e}var NR=Object.prototype,PR=NR.hasOwnProperty;function Eo(t,e,n){var r=t[e];(!(PR.call(t,e)&&Li(r,n))||n===void 0&&!(e in t))&&Tu(t,e,n)}function Ru(t,e,n,r){var i=!n;n||(n={});for(var s=-1,o=e.length;++s<o;){var a=e[s],c=void 0;c===void 0&&(c=t[a]),i?Tu(n,a,c):Eo(n,a,c)}return n}var eh=Math.max;function $R(t,e,n){return e=eh(e===void 0?t.length-1:e,0),function(){for(var r=arguments,i=-1,s=eh(r.length-e,0),o=Array(s);++i<s;)o[i]=r[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=r[i];return a[e]=n(o),gR(t,this,a)}}function Su(t,e){return ER($R(t,e,er),t+"")}var IR=9007199254740991;function bu(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=IR}function Vt(t){return t!=null&&bu(t.length)&&!ln(t)}function th(t,e,n){if(!Et(n))return!1;var r=typeof e;return(r=="number"?Vt(n)&&_o(e,n.length):r=="string"&&e in n)?Li(n[e],t):!1}function DR(t){return Su(function(e,n){var r=-1,i=n.length,s=i>1?n[i-1]:void 0,o=i>2?n[2]:void 0;for(s=t.length>3&&typeof s=="function"?(i--,s):void 0,o&&th(n[0],n[1],o)&&(s=i<3?void 0:s,i=1),e=Object(e);++r<i;){var a=n[r];a&&t(e,a,r,s)}return e})}var OR=Object.prototype;function Mi(t){var e=t&&t.constructor,n=typeof e=="function"&&e.prototype||OR;return t===n}function xR(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}var LR="[object Arguments]";function nh(t){return Ot(t)&&$n(t)==LR}var rh=Object.prototype,MR=rh.hasOwnProperty,FR=rh.propertyIsEnumerable,wo=nh(function(){return arguments}())?nh:function(t){return Ot(t)&&MR.call(t,"callee")&&!FR.call(t,"callee")};function jR(){return!1}var ih=typeof exports=="object"&&exports&&!exports.nodeType&&exports,sh=ih&&typeof module=="object"&&module&&!module.nodeType&&module,qR=sh&&sh.exports===ih,oh=qR?zt.Buffer:void 0,HR=oh?oh.isBuffer:void 0,Fi=HR||jR,UR="[object Arguments]",GR="[object Array]",WR="[object Boolean]",BR="[object Date]",KR="[object Error]",zR="[object Function]",VR="[object Map]",XR="[object Number]",YR="[object Object]",JR="[object RegExp]",QR="[object Set]",ZR="[object String]",eS="[object WeakMap]",tS="[object ArrayBuffer]",nS="[object DataView]",rS="[object Float32Array]",iS="[object Float64Array]",sS="[object Int8Array]",oS="[object Int16Array]",aS="[object Int32Array]",cS="[object Uint8Array]",uS="[object Uint8ClampedArray]",lS="[object Uint16Array]",dS="[object Uint32Array]",de={};de[rS]=de[iS]=de[sS]=de[oS]=de[aS]=de[cS]=de[uS]=de[lS]=de[dS]=!0,de[UR]=de[GR]=de[tS]=de[WR]=de[nS]=de[BR]=de[KR]=de[zR]=de[VR]=de[XR]=de[YR]=de[JR]=de[QR]=de[ZR]=de[eS]=!1;function fS(t){return Ot(t)&&bu(t.length)&&!!de[$n(t)]}function ko(t){return function(e){return t(e)}}var ah=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ji=ah&&typeof module=="object"&&module&&!module.nodeType&&module,hS=ji&&ji.exports===ah,_u=hS&&Hf.process,In=function(){try{var t=ji&&ji.require&&ji.require("util").types;return t||_u&&_u.binding&&_u.binding("util")}catch{}}(),ch=In&&In.isTypedArray,Eu=ch?ko(ch):fS,pS=Object.prototype,mS=pS.hasOwnProperty;function uh(t,e){var n=ee(t),r=!n&&wo(t),i=!n&&!r&&Fi(t),s=!n&&!r&&!i&&Eu(t),o=n||r||i||s,a=o?xR(t.length,String):[],c=a.length;for(var u in t)(e||mS.call(t,u))&&!(o&&(u=="length"||i&&(u=="offset"||u=="parent")||s&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||_o(u,c)))&&a.push(u);return a}function lh(t,e){return function(n){return t(e(n))}}var gS=lh(Object.keys,Object),yS=Object.prototype,vS=yS.hasOwnProperty;function dh(t){if(!Mi(t))return gS(t);var e=[];for(var n in Object(t))vS.call(t,n)&&n!="constructor"&&e.push(n);return e}function wt(t){return Vt(t)?uh(t):dh(t)}var TS=Object.prototype,RS=TS.hasOwnProperty,yt=DR(function(t,e){if(Mi(e)||Vt(e)){Ru(e,wt(e),t);return}for(var n in e)RS.call(e,n)&&Eo(t,n,e[n])});function SS(t){var e=[];if(t!=null)for(var n in Object(t))e.push(n);return e}var bS=Object.prototype,_S=bS.hasOwnProperty;function ES(t){if(!Et(t))return SS(t);var e=Mi(t),n=[];for(var r in t)r=="constructor"&&(e||!_S.call(t,r))||n.push(r);return n}function fh(t){return Vt(t)?uh(t,!0):ES(t)}var wS=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,kS=/^\w*$/;function wu(t,e){if(ee(t))return!1;var n=typeof t;return n=="number"||n=="symbol"||n=="boolean"||t==null||xi(t)?!0:kS.test(t)||!wS.test(t)||e!=null&&t in Object(e)}var qi=nr(Object,"create");function CS(){this.__data__=qi?qi(null):{},this.size=0}function AS(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var NS="__lodash_hash_undefined__",PS=Object.prototype,$S=PS.hasOwnProperty;function IS(t){var e=this.__data__;if(qi){var n=e[t];return n===NS?void 0:n}return $S.call(e,t)?e[t]:void 0}var DS=Object.prototype,OS=DS.hasOwnProperty;function xS(t){var e=this.__data__;return qi?e[t]!==void 0:OS.call(e,t)}var LS="__lodash_hash_undefined__";function MS(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=qi&&e===void 0?LS:e,this}function rr(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}rr.prototype.clear=CS,rr.prototype.delete=AS,rr.prototype.get=IS,rr.prototype.has=xS,rr.prototype.set=MS;function FS(){this.__data__=[],this.size=0}function Co(t,e){for(var n=t.length;n--;)if(Li(t[n][0],e))return n;return-1}var jS=Array.prototype,qS=jS.splice;function HS(t){var e=this.__data__,n=Co(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():qS.call(e,n,1),--this.size,!0}function US(t){var e=this.__data__,n=Co(e,t);return n<0?void 0:e[n][1]}function GS(t){return Co(this.__data__,t)>-1}function WS(t,e){var n=this.__data__,r=Co(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}function dn(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}dn.prototype.clear=FS,dn.prototype.delete=HS,dn.prototype.get=US,dn.prototype.has=GS,dn.prototype.set=WS;var Hi=nr(zt,"Map");function BS(){this.size=0,this.__data__={hash:new rr,map:new(Hi||dn),string:new rr}}function KS(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function Ao(t,e){var n=t.__data__;return KS(e)?n[typeof e=="string"?"string":"hash"]:n.map}function zS(t){var e=Ao(this,t).delete(t);return this.size-=e?1:0,e}function VS(t){return Ao(this,t).get(t)}function XS(t){return Ao(this,t).has(t)}function YS(t,e){var n=Ao(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}function fn(t){var e=-1,n=t==null?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}fn.prototype.clear=BS,fn.prototype.delete=zS,fn.prototype.get=VS,fn.prototype.has=XS,fn.prototype.set=YS;var JS="Expected a function";function ku(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(JS);var n=function(){var r=arguments,i=e?e.apply(this,r):r[0],s=n.cache;if(s.has(i))return s.get(i);var o=t.apply(this,r);return n.cache=s.set(i,o)||s,o};return n.cache=new(ku.Cache||fn),n}ku.Cache=fn;var QS=500;function ZS(t){var e=ku(t,function(r){return n.size===QS&&n.clear(),r}),n=e.cache;return e}var eb=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,tb=/\\(\\)?/g,nb=ZS(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(eb,function(n,r,i,s){e.push(i?s.replace(tb,"$1"):r||n)}),e});function rb(t){return t==null?"":Kf(t)}function No(t,e){return ee(t)?t:wu(t,e)?[t]:nb(rb(t))}var ib=1/0;function Ui(t){if(typeof t=="string"||xi(t))return t;var e=t+"";return e=="0"&&1/t==-ib?"-0":e}function Cu(t,e){e=No(e,t);for(var n=0,r=e.length;t!=null&&n<r;)t=t[Ui(e[n++])];return n&&n==r?t:void 0}function sb(t,e,n){var r=t==null?void 0:Cu(t,e);return r===void 0?n:r}function Au(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}var hh=_t?_t.isConcatSpreadable:void 0;function ob(t){return ee(t)||wo(t)||!!(hh&&t&&t[hh])}function Nu(t,e,n,r,i){var s=-1,o=t.length;for(n||(n=ob),i||(i=[]);++s<o;){var a=t[s];n(a)?Au(i,a):r||(i[i.length]=a)}return i}function kt(t){var e=t==null?0:t.length;return e?Nu(t):[]}var ph=lh(Object.getPrototypeOf,Object);function mh(t,e,n){var r=-1,i=t.length;e<0&&(e=-e>i?0:i+e),n=n>i?i:n,n<0&&(n+=i),i=e>n?0:n-e>>>0,e>>>=0;for(var s=Array(i);++r<i;)s[r]=t[r+e];return s}function ab(t,e,n,r){var i=-1,s=t==null?0:t.length;for(r&&s&&(n=t[++i]);++i<s;)n=e(n,t[i],i,t);return n}function cb(){this.__data__=new dn,this.size=0}function ub(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}function lb(t){return this.__data__.get(t)}function db(t){return this.__data__.has(t)}var fb=200;function hb(t,e){var n=this.__data__;if(n instanceof dn){var r=n.__data__;if(!Hi||r.length<fb-1)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new fn(r)}return n.set(t,e),this.size=n.size,this}function Xt(t){var e=this.__data__=new dn(t);this.size=e.size}Xt.prototype.clear=cb,Xt.prototype.delete=ub,Xt.prototype.get=lb,Xt.prototype.has=db,Xt.prototype.set=hb;function pb(t,e){return t&&Ru(e,wt(e),t)}var gh=typeof exports=="object"&&exports&&!exports.nodeType&&exports,yh=gh&&typeof module=="object"&&module&&!module.nodeType&&module,mb=yh&&yh.exports===gh,vh=mb?zt.Buffer:void 0,Th=vh?vh.allocUnsafe:void 0;function gb(t,e){var n=t.length,r=Th?Th(n):new t.constructor(n);return t.copy(r),r}function Pu(t,e){for(var n=-1,r=t==null?0:t.length,i=0,s=[];++n<r;){var o=t[n];e(o,n,t)&&(s[i++]=o)}return s}function Rh(){return[]}var yb=Object.prototype,vb=yb.propertyIsEnumerable,Sh=Object.getOwnPropertySymbols,$u=Sh?function(t){return t==null?[]:(t=Object(t),Pu(Sh(t),function(e){return vb.call(t,e)}))}:Rh;function Tb(t,e){return Ru(t,$u(t),e)}var Rb=Object.getOwnPropertySymbols,Sb=Rb?function(t){for(var e=[];t;)Au(e,$u(t)),t=ph(t);return e}:Rh;function bh(t,e,n){var r=e(t);return ee(t)?r:Au(r,n(t))}function Iu(t){return bh(t,wt,$u)}function bb(t){return bh(t,fh,Sb)}var Du=nr(zt,"DataView"),Ou=nr(zt,"Promise"),Sr=nr(zt,"Set"),_h="[object Map]",_b="[object Object]",Eh="[object Promise]",wh="[object Set]",kh="[object WeakMap]",Ch="[object DataView]",Eb=tr(Du),wb=tr(Hi),kb=tr(Ou),Cb=tr(Sr),Ab=tr(yu),Ct=$n;(Du&&Ct(new Du(new ArrayBuffer(1)))!=Ch||Hi&&Ct(new Hi)!=_h||Ou&&Ct(Ou.resolve())!=Eh||Sr&&Ct(new Sr)!=wh||yu&&Ct(new yu)!=kh)&&(Ct=function(t){var e=$n(t),n=e==_b?t.constructor:void 0,r=n?tr(n):"";if(r)switch(r){case Eb:return Ch;case wb:return _h;case kb:return Eh;case Cb:return wh;case Ab:return kh}return e});var Nb=Object.prototype,Pb=Nb.hasOwnProperty;function $b(t){var e=t.length,n=new t.constructor(e);return e&&typeof t[0]=="string"&&Pb.call(t,"index")&&(n.index=t.index,n.input=t.input),n}var Po=zt.Uint8Array;function Ib(t){var e=new t.constructor(t.byteLength);return new Po(e).set(new Po(t)),e}function Db(t,e){var n=t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}var Ob=/\w*$/;function xb(t){var e=new t.constructor(t.source,Ob.exec(t));return e.lastIndex=t.lastIndex,e}var Ah=_t?_t.prototype:void 0,Nh=Ah?Ah.valueOf:void 0;function Lb(t){return Nh?Object(Nh.call(t)):{}}function Mb(t,e){var n=t.buffer;return new t.constructor(n,t.byteOffset,t.length)}var Fb="[object Boolean]",jb="[object Date]",qb="[object Map]",Hb="[object Number]",Ub="[object RegExp]",Gb="[object Set]",Wb="[object String]",Bb="[object Symbol]",Kb="[object ArrayBuffer]",zb="[object DataView]",Vb="[object Float32Array]",Xb="[object Float64Array]",Yb="[object Int8Array]",Jb="[object Int16Array]",Qb="[object Int32Array]",Zb="[object Uint8Array]",e_="[object Uint8ClampedArray]",t_="[object Uint16Array]",n_="[object Uint32Array]";function r_(t,e,n){var r=t.constructor;switch(e){case Kb:return Ib(t);case Fb:case jb:return new r(+t);case zb:return Db(t);case Vb:case Xb:case Yb:case Jb:case Qb:case Zb:case e_:case t_:case n_:return Mb(t);case qb:return new r;case Hb:case Wb:return new r(t);case Ub:return xb(t);case Gb:return new r;case Bb:return Lb(t)}}function i_(t){return typeof t.constructor=="function"&&!Mi(t)?mR(ph(t)):{}}var s_="[object Map]";function o_(t){return Ot(t)&&Ct(t)==s_}var Ph=In&&In.isMap,a_=Ph?ko(Ph):o_,c_="[object Set]";function u_(t){return Ot(t)&&Ct(t)==c_}var $h=In&&In.isSet,l_=$h?ko($h):u_,Ih="[object Arguments]",d_="[object Array]",f_="[object Boolean]",h_="[object Date]",p_="[object Error]",Dh="[object Function]",m_="[object GeneratorFunction]",g_="[object Map]",y_="[object Number]",Oh="[object Object]",v_="[object RegExp]",T_="[object Set]",R_="[object String]",S_="[object Symbol]",b_="[object WeakMap]",__="[object ArrayBuffer]",E_="[object DataView]",w_="[object Float32Array]",k_="[object Float64Array]",C_="[object Int8Array]",A_="[object Int16Array]",N_="[object Int32Array]",P_="[object Uint8Array]",$_="[object Uint8ClampedArray]",I_="[object Uint16Array]",D_="[object Uint32Array]",ue={};ue[Ih]=ue[d_]=ue[__]=ue[E_]=ue[f_]=ue[h_]=ue[w_]=ue[k_]=ue[C_]=ue[A_]=ue[N_]=ue[g_]=ue[y_]=ue[Oh]=ue[v_]=ue[T_]=ue[R_]=ue[S_]=ue[P_]=ue[$_]=ue[I_]=ue[D_]=!0,ue[p_]=ue[Dh]=ue[b_]=!1;function $o(t,e,n,r,i,s){var o;if(o!==void 0)return o;if(!Et(t))return t;var a=ee(t);if(a)return o=$b(t),yR(t,o);var c=Ct(t),u=c==Dh||c==m_;if(Fi(t))return gb(t);if(c==Oh||c==Ih||u&&!i)return o=u?{}:i_(t),Tb(t,pb(o,t));if(!ue[c])return i?t:{};o=r_(t,c),s||(s=new Xt);var l=s.get(t);if(l)return l;s.set(t,o),l_(t)?t.forEach(function(h){o.add($o(h,e,n,h,t,s))}):a_(t)&&t.forEach(function(h,v){o.set(v,$o(h,e,n,v,t,s))});var d=Iu,f=a?void 0:d(t);return Jf(f||t,function(h,v){f&&(v=h,h=t[v]),Eo(o,v,$o(h,e,n,v,t,s))}),o}var O_=4;function Ke(t){return $o(t,O_)}function Gi(t){for(var e=-1,n=t==null?0:t.length,r=0,i=[];++e<n;){var s=t[e];s&&(i[r++]=s)}return i}var x_="__lodash_hash_undefined__";function L_(t){return this.__data__.set(t,x_),this}function M_(t){return this.__data__.has(t)}function br(t){var e=-1,n=t==null?0:t.length;for(this.__data__=new fn;++e<n;)this.add(t[e])}br.prototype.add=br.prototype.push=L_,br.prototype.has=M_;function xh(t,e){for(var n=-1,r=t==null?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}function xu(t,e){return t.has(e)}var F_=1,j_=2;function Lh(t,e,n,r,i,s){var o=n&F_,a=t.length,c=e.length;if(a!=c&&!(o&&c>a))return!1;var u=s.get(t),l=s.get(e);if(u&&l)return u==e&&l==t;var d=-1,f=!0,h=n&j_?new br:void 0;for(s.set(t,e),s.set(e,t);++d<a;){var v=t[d],S=e[d];if(r)var w=o?r(S,v,d,e,t,s):r(v,S,d,t,e,s);if(w!==void 0){if(w)continue;f=!1;break}if(h){if(!xh(e,function(R,m){if(!xu(h,m)&&(v===R||i(v,R,n,r,s)))return h.push(m)})){f=!1;break}}else if(!(v===S||i(v,S,n,r,s))){f=!1;break}}return s.delete(t),s.delete(e),f}function q_(t){var e=-1,n=Array(t.size);return t.forEach(function(r,i){n[++e]=[i,r]}),n}function Lu(t){var e=-1,n=Array(t.size);return t.forEach(function(r){n[++e]=r}),n}var H_=1,U_=2,G_="[object Boolean]",W_="[object Date]",B_="[object Error]",K_="[object Map]",z_="[object Number]",V_="[object RegExp]",X_="[object Set]",Y_="[object String]",J_="[object Symbol]",Q_="[object ArrayBuffer]",Z_="[object DataView]",Mh=_t?_t.prototype:void 0,Mu=Mh?Mh.valueOf:void 0;function eE(t,e,n,r,i,s,o){switch(n){case Z_:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case Q_:return!(t.byteLength!=e.byteLength||!s(new Po(t),new Po(e)));case G_:case W_:case z_:return Li(+t,+e);case B_:return t.name==e.name&&t.message==e.message;case V_:case Y_:return t==e+"";case K_:var a=q_;case X_:var c=r&H_;if(a||(a=Lu),t.size!=e.size&&!c)return!1;var u=o.get(t);if(u)return u==e;r|=U_,o.set(t,e);var l=Lh(a(t),a(e),r,i,s,o);return o.delete(t),l;case J_:if(Mu)return Mu.call(t)==Mu.call(e)}return!1}var tE=1,nE=Object.prototype,rE=nE.hasOwnProperty;function iE(t,e,n,r,i,s){var o=n&tE,a=Iu(t),c=a.length,u=Iu(e),l=u.length;if(c!=l&&!o)return!1;for(var d=c;d--;){var f=a[d];if(!(o?f in e:rE.call(e,f)))return!1}var h=s.get(t),v=s.get(e);if(h&&v)return h==e&&v==t;var S=!0;s.set(t,e),s.set(e,t);for(var w=o;++d<c;){f=a[d];var R=t[f],m=e[f];if(r)var y=o?r(m,R,f,e,t,s):r(R,m,f,t,e,s);if(!(y===void 0?R===m||i(R,m,n,r,s):y)){S=!1;break}w||(w=f=="constructor")}if(S&&!w){var _=t.constructor,M=e.constructor;_!=M&&"constructor"in t&&"constructor"in e&&!(typeof _=="function"&&_ instanceof _&&typeof M=="function"&&M instanceof M)&&(S=!1)}return s.delete(t),s.delete(e),S}var sE=1,Fh="[object Arguments]",jh="[object Array]",Io="[object Object]",oE=Object.prototype,qh=oE.hasOwnProperty;function aE(t,e,n,r,i,s){var o=ee(t),a=ee(e),c=o?jh:Ct(t),u=a?jh:Ct(e);c=c==Fh?Io:c,u=u==Fh?Io:u;var l=c==Io,d=u==Io,f=c==u;if(f&&Fi(t)){if(!Fi(e))return!1;o=!0,l=!1}if(f&&!l)return s||(s=new Xt),o||Eu(t)?Lh(t,e,n,r,i,s):eE(t,e,c,n,r,i,s);if(!(n&sE)){var h=l&&qh.call(t,"__wrapped__"),v=d&&qh.call(e,"__wrapped__");if(h||v){var S=h?t.value():t,w=v?e.value():e;return s||(s=new Xt),i(S,w,n,r,s)}}return f?(s||(s=new Xt),iE(t,e,n,r,i,s)):!1}function Fu(t,e,n,r,i){return t===e?!0:t==null||e==null||!Ot(t)&&!Ot(e)?t!==t&&e!==e:aE(t,e,n,r,Fu,i)}var cE=1,uE=2;function lE(t,e,n,r){var i=n.length,s=i;if(t==null)return!s;for(t=Object(t);i--;){var o=n[i];if(o[2]?o[1]!==t[o[0]]:!(o[0]in t))return!1}for(;++i<s;){o=n[i];var a=o[0],c=t[a],u=o[1];if(o[2]){if(c===void 0&&!(a in t))return!1}else{var l=new Xt,d;if(!(d===void 0?Fu(u,c,cE|uE,r,l):d))return!1}}return!0}function Hh(t){return t===t&&!Et(t)}function dE(t){for(var e=wt(t),n=e.length;n--;){var r=e[n],i=t[r];e[n]=[r,i,Hh(i)]}return e}function Uh(t,e){return function(n){return n==null?!1:n[t]===e&&(e!==void 0||t in Object(n))}}function fE(t){var e=dE(t);return e.length==1&&e[0][2]?Uh(e[0][0],e[0][1]):function(n){return n===t||lE(n,t,e)}}function hE(t,e){return t!=null&&e in Object(t)}function Gh(t,e,n){e=No(e,t);for(var r=-1,i=e.length,s=!1;++r<i;){var o=Ui(e[r]);if(!(s=t!=null&&n(t,o)))break;t=t[o]}return s||++r!=i?s:(i=t==null?0:t.length,!!i&&bu(i)&&_o(o,i)&&(ee(t)||wo(t)))}function pE(t,e){return t!=null&&Gh(t,e,hE)}var mE=1,gE=2;function yE(t,e){return wu(t)&&Hh(e)?Uh(Ui(t),e):function(n){var r=sb(n,t);return r===void 0&&r===e?pE(n,t):Fu(e,r,mE|gE)}}function vE(t){return function(e){return e?.[t]}}function TE(t){return function(e){return Cu(e,t)}}function RE(t){return wu(t)?vE(Ui(t)):TE(t)}function xt(t){return typeof t=="function"?t:t==null?er:typeof t=="object"?ee(t)?yE(t[0],t[1]):fE(t):RE(t)}function SE(t,e,n,r){for(var i=-1,s=t==null?0:t.length;++i<s;){var o=t[i];e(r,o,n(o),t)}return r}function bE(t){return function(e,n,r){for(var i=-1,s=Object(e),o=r(e),a=o.length;a--;){var c=o[++i];if(n(s[c],c,s)===!1)break}return e}}var _E=bE();function EE(t,e){return t&&_E(t,e,wt)}function wE(t,e){return function(n,r){if(n==null)return n;if(!Vt(n))return t(n,r);for(var i=n.length,s=-1,o=Object(n);++s<i&&r(o[s],s,o)!==!1;);return n}}var ir=wE(EE);function kE(t,e,n,r){return ir(t,function(i,s,o){e(r,i,n(i),o)}),r}function CE(t,e){return function(n,r){var i=ee(n)?SE:kE,s=e?e():{};return i(n,t,xt(r),s)}}var Wh=Object.prototype,AE=Wh.hasOwnProperty,ju=Su(function(t,e){t=Object(t);var n=-1,r=e.length,i=r>2?e[2]:void 0;for(i&&th(e[0],e[1],i)&&(r=1);++n<r;)for(var s=e[n],o=fh(s),a=-1,c=o.length;++a<c;){var u=o[a],l=t[u];(l===void 0||Li(l,Wh[u])&&!AE.call(t,u))&&(t[u]=s[u])}return t});function Bh(t){return Ot(t)&&Vt(t)}var NE=200;function PE(t,e,n,r){var i=-1,s=Zf,o=!0,a=t.length,c=[],u=e.length;if(!a)return c;e.length>=NE&&(s=xu,o=!1,e=new br(e));e:for(;++i<a;){var l=t[i],d=l;if(l=l!==0?l:0,o&&d===d){for(var f=u;f--;)if(e[f]===d)continue e;c.push(l)}else s(e,d,r)||c.push(l)}return c}var Do=Su(function(t,e){return Bh(t)?PE(t,Nu(e,1,Bh,!0)):[]});function _r(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}function ze(t,e,n){var r=t==null?0:t.length;return r?(e=e===void 0?1:So(e),mh(t,e<0?0:e,r)):[]}function Wi(t,e,n){var r=t==null?0:t.length;return r?(e=e===void 0?1:So(e),e=r-e,mh(t,0,e<0?0:e)):[]}function $E(t){return typeof t=="function"?t:er}function H(t,e){var n=ee(t)?Jf:ir;return n(t,$E(e))}function IE(t,e){for(var n=-1,r=t==null?0:t.length;++n<r;)if(!e(t[n],n,t))return!1;return!0}function DE(t,e){var n=!0;return ir(t,function(r,i,s){return n=!!e(r,i,s),n}),n}function Lt(t,e,n){var r=ee(t)?IE:DE;return r(t,xt(e))}function Kh(t,e){var n=[];return ir(t,function(r,i,s){e(r,i,s)&&n.push(r)}),n}function vt(t,e){var n=ee(t)?Pu:Kh;return n(t,xt(e))}function OE(t){return function(e,n,r){var i=Object(e);if(!Vt(e)){var s=xt(n);e=wt(e),n=function(a){return s(i[a],a,i)}}var o=t(e,n,r);return o>-1?i[s?e[o]:o]:void 0}}var xE=Math.max;function LE(t,e,n){var r=t==null?0:t.length;if(!r)return-1;var i=n==null?0:So(n);return i<0&&(i=xE(r+i,0)),Qf(t,xt(e),i)}var Er=OE(LE);function Mt(t){return t&&t.length?t[0]:void 0}function ME(t,e){var n=-1,r=Vt(t)?Array(t.length):[];return ir(t,function(i,s,o){r[++n]=e(i,s,o)}),r}function x(t,e){var n=ee(t)?Ro:ME;return n(t,xt(e))}function Tt(t,e){return Nu(x(t,e))}var FE=Object.prototype,jE=FE.hasOwnProperty,qE=CE(function(t,e,n){jE.call(t,n)?t[n].push(e):Tu(t,n,[e])}),HE=Object.prototype,UE=HE.hasOwnProperty;function GE(t,e){return t!=null&&UE.call(t,e)}function U(t,e){return t!=null&&Gh(t,e,GE)}var WE="[object String]";function lt(t){return typeof t=="string"||!ee(t)&&Ot(t)&&$n(t)==WE}function BE(t,e){return Ro(e,function(n){return t[n]})}function je(t){return t==null?[]:BE(t,wt(t))}var KE=Math.max;function it(t,e,n,r){t=Vt(t)?t:je(t),n=n&&!r?So(n):0;var i=t.length;return n<0&&(n=KE(i+n,0)),lt(t)?n<=i&&t.indexOf(e,n)>-1:!!i&&vu(t,e,n)>-1}function zh(t,e,n){var r=t==null?0:t.length;if(!r)return-1;var i=0;return vu(t,e,i)}var zE="[object Map]",VE="[object Set]",XE=Object.prototype,YE=XE.hasOwnProperty;function ae(t){if(t==null)return!0;if(Vt(t)&&(ee(t)||typeof t=="string"||typeof t.splice=="function"||Fi(t)||Eu(t)||wo(t)))return!t.length;var e=Ct(t);if(e==zE||e==VE)return!t.size;if(Mi(t))return!dh(t).length;for(var n in t)if(YE.call(t,n))return!1;return!0}var JE="[object RegExp]";function QE(t){return Ot(t)&&$n(t)==JE}var Vh=In&&In.isRegExp,hn=Vh?ko(Vh):QE;function pn(t){return t===void 0}function ZE(t,e){return t<e}function ew(t,e,n){for(var r=-1,i=t.length;++r<i;){var s=t[r],o=e(s);if(o!=null&&(a===void 0?o===o&&!xi(o):n(o,a)))var a=o,c=s}return c}function tw(t){return t&&t.length?ew(t,er,ZE):void 0}var nw="Expected a function";function rw(t){if(typeof t!="function")throw new TypeError(nw);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}function iw(t,e,n,r){if(!Et(t))return t;e=No(e,t);for(var i=-1,s=e.length,o=s-1,a=t;a!=null&&++i<s;){var c=Ui(e[i]),u=n;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=o){var l=a[c];u=void 0,u===void 0&&(u=Et(l)?l:_o(e[i+1])?[]:{})}Eo(a,c,u),a=a[c]}return t}function sw(t,e,n){for(var r=-1,i=e.length,s={};++r<i;){var o=e[r],a=Cu(t,o);n(a,o)&&iw(s,No(o,t),a)}return s}function Ft(t,e){if(t==null)return{};var n=Ro(bb(t),function(r){return[r]});return e=xt(e),sw(t,n,function(r,i){return e(r,i[0])})}function ow(t,e,n,r,i){return i(t,function(s,o,a){n=r?(r=!1,s):e(n,s,o,a)}),n}function st(t,e,n){var r=ee(t)?ab:ow,i=arguments.length<3;return r(t,xt(e),n,i,ir)}function Oo(t,e){var n=ee(t)?Pu:Kh;return n(t,rw(xt(e)))}function aw(t,e){var n;return ir(t,function(r,i,s){return n=e(r,i,s),!n}),!!n}function Xh(t,e,n){var r=ee(t)?xh:aw;return r(t,xt(e))}var cw=1/0,uw=Sr&&1/Lu(new Sr([,-0]))[1]==cw?function(t){return new Sr(t)}:Fe,lw=200;function Yh(t,e,n){var r=-1,i=Zf,s=t.length,o=!0,a=[],c=a;if(s>=lw){var u=e?null:uw(t);if(u)return Lu(u);o=!1,i=xu,c=new br}else c=e?[]:a;e:for(;++r<s;){var l=t[r],d=e?e(l):l;if(l=l!==0?l:0,o&&d===d){for(var f=c.length;f--;)if(c[f]===d)continue e;e&&c.push(d),a.push(l)}else i(c,d,n)||(c!==a&&c.push(d),a.push(l))}return a}function qu(t){return t&&t.length?Yh(t):[]}function dw(t,e){return t&&t.length?Yh(t,xt(e)):[]}function Hu(t){console&&console.error&&console.error(`Error: ${t}`)}function Jh(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function Qh(t){const e=new Date().getTime(),n=t();return{time:new Date().getTime()-e,value:n}}function Zh(t){function e(){}e.prototype=t;const n=new e;function r(){return typeof n.bar}return r(),r(),t}function fw(t){return hw(t)?t.LABEL:t.name}function hw(t){return lt(t.LABEL)&&t.LABEL!==""}class Yt{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),H(this.definition,n=>{n.accept(e)})}}class ot extends Yt{constructor(e){super([]),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}}class wr extends Yt{constructor(e){super(e.definition),this.orgText="",yt(this,Ft(e,n=>n!==void 0))}}class dt extends Yt{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,yt(this,Ft(e,n=>n!==void 0))}}class Ve extends Yt{constructor(e){super(e.definition),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}}class Rt extends Yt{constructor(e){super(e.definition),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}}class St extends Yt{constructor(e){super(e.definition),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}}class be extends Yt{constructor(e){super(e.definition),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}}class ft extends Yt{constructor(e){super(e.definition),this.idx=1,yt(this,Ft(e,n=>n!==void 0))}}class ht extends Yt{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,yt(this,Ft(e,n=>n!==void 0))}}class fe{constructor(e){this.idx=1,yt(this,Ft(e,n=>n!==void 0))}accept(e){e.visit(this)}}function pw(t){return x(t,xo)}function xo(t){function e(n){return x(n,xo)}if(t instanceof ot){const n={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return lt(t.label)&&(n.label=t.label),n}else{if(t instanceof dt)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Ve)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Rt)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof St)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:xo(new fe({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof ft)return{type:"RepetitionWithSeparator",idx:t.idx,separator:xo(new fe({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof be)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof ht)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof fe){const n={type:"Terminal",name:t.terminalType.name,label:fw(t.terminalType),idx:t.idx};lt(t.label)&&(n.terminalLabel=t.label);const r=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=hn(r)?r.source:r),n}else{if(t instanceof wr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}class kr{visit(e){const n=e;switch(n.constructor){case ot:return this.visitNonTerminal(n);case dt:return this.visitAlternative(n);case Ve:return this.visitOption(n);case Rt:return this.visitRepetitionMandatory(n);case St:return this.visitRepetitionMandatoryWithSeparator(n);case ft:return this.visitRepetitionWithSeparator(n);case be:return this.visitRepetition(n);case ht:return this.visitAlternation(n);case fe:return this.visitTerminal(n);case wr:return this.visitRule(n);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}}function mw(t){return t instanceof dt||t instanceof Ve||t instanceof be||t instanceof Rt||t instanceof St||t instanceof ft||t instanceof fe||t instanceof wr}function Lo(t,e=[]){return t instanceof Ve||t instanceof be||t instanceof ft?!0:t instanceof ht?Xh(t.definition,r=>Lo(r,e)):t instanceof ot&&it(e,t)?!1:t instanceof Yt?(t instanceof ot&&e.push(t),Lt(t.definition,r=>Lo(r,e))):!1}function gw(t){return t instanceof ht}function Jt(t){if(t instanceof ot)return"SUBRULE";if(t instanceof Ve)return"OPTION";if(t instanceof ht)return"OR";if(t instanceof Rt)return"AT_LEAST_ONE";if(t instanceof St)return"AT_LEAST_ONE_SEP";if(t instanceof ft)return"MANY_SEP";if(t instanceof be)return"MANY";if(t instanceof fe)return"CONSUME";throw Error("non exhaustive match")}class Mo{walk(e,n=[]){H(e.definition,(r,i)=>{const s=ze(e.definition,i+1);if(r instanceof ot)this.walkProdRef(r,s,n);else if(r instanceof fe)this.walkTerminal(r,s,n);else if(r instanceof dt)this.walkFlat(r,s,n);else if(r instanceof Ve)this.walkOption(r,s,n);else if(r instanceof Rt)this.walkAtLeastOne(r,s,n);else if(r instanceof St)this.walkAtLeastOneSep(r,s,n);else if(r instanceof ft)this.walkManySep(r,s,n);else if(r instanceof be)this.walkMany(r,s,n);else if(r instanceof ht)this.walkOr(r,s,n);else throw Error("non exhaustive match")})}walkTerminal(e,n,r){}walkProdRef(e,n,r){}walkFlat(e,n,r){const i=n.concat(r);this.walk(e,i)}walkOption(e,n,r){const i=n.concat(r);this.walk(e,i)}walkAtLeastOne(e,n,r){const i=[new Ve({definition:e.definition})].concat(n,r);this.walk(e,i)}walkAtLeastOneSep(e,n,r){const i=ep(e,n,r);this.walk(e,i)}walkMany(e,n,r){const i=[new Ve({definition:e.definition})].concat(n,r);this.walk(e,i)}walkManySep(e,n,r){const i=ep(e,n,r);this.walk(e,i)}walkOr(e,n,r){const i=n.concat(r);H(e.definition,s=>{const o=new dt({definition:[s]});this.walk(o,i)})}}function ep(t,e,n){return[new Ve({definition:[new fe({terminalType:t.separator})].concat(t.definition)})].concat(e,n)}function Bi(t){if(t instanceof ot)return Bi(t.referencedRule);if(t instanceof fe)return Tw(t);if(mw(t))return yw(t);if(gw(t))return vw(t);throw Error("non exhaustive match")}function yw(t){let e=[];const n=t.definition;let r=0,i=n.length>r,s,o=!0;for(;i&&o;)s=n[r],o=Lo(s),e=e.concat(Bi(s)),r=r+1,i=n.length>r;return qu(e)}function vw(t){const e=x(t.definition,n=>Bi(n));return qu(kt(e))}function Tw(t){return[t.terminalType]}const tp="_~IN~_";class Rw extends Mo{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,n,r){}walkProdRef(e,n,r){const i=bw(e.referencedRule,e.idx)+this.topProd.name,s=n.concat(r),o=new dt({definition:s}),a=Bi(o);this.follows[i]=a}}function Sw(t){const e={};return H(t,n=>{const r=new Rw(n).startWalking();yt(e,r)}),e}function bw(t,e){return t.name+e+tp}let Fo={};const _w=new Nf;function jo(t){const e=t.toString();if(Fo.hasOwnProperty(e))return Fo[e];{const n=_w.pattern(e);return Fo[e]=n,n}}function Ew(){Fo={}}const np="Complement Sets are not supported for first char optimization",qo=`Unable to use "first char" lexer optimizations:
`;function ww(t,e=!1){try{const n=jo(t);return Uu(n.value,{},n.flags.ignoreCase)}catch(n){if(n.message===np)e&&Jh(`${qo}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let r="";e&&(r=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),Hu(`${qo}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+r)}}return[]}function Uu(t,e,n){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Uu(t.value[i],e,n);break;case"Alternative":const r=t.value;for(let i=0;i<r.length;i++){const s=r[i];switch(s.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}const o=s;switch(o.type){case"Character":Ho(o.value,e,n);break;case"Set":if(o.complement===!0)throw Error(np);H(o.value,c=>{if(typeof c=="number")Ho(c,e,n);else{const u=c;if(n===!0)for(let l=u.from;l<=u.to;l++)Ho(l,e,n);else{for(let l=u.from;l<=u.to&&l<zi;l++)Ho(l,e,n);if(u.to>=zi){const l=u.from>=zi?u.from:zi,d=u.to,f=Dn(l),h=Dn(d);for(let v=f;v<=h;v++)e[v]=v}}}});break;case"Group":Uu(o.value,e,n);break;default:throw Error("Non Exhaustive Match")}const a=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&Gu(o)===!1||o.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return je(e)}function Ho(t,e,n){const r=Dn(t);e[r]=r,n===!0&&kw(t,e)}function kw(t,e){const n=String.fromCharCode(t),r=n.toUpperCase();if(r!==n){const i=Dn(r.charCodeAt(0));e[i]=i}else{const i=n.toLowerCase();if(i!==n){const s=Dn(i.charCodeAt(0));e[s]=s}}}function rp(t,e){return Er(t.value,n=>{if(typeof n=="number")return it(e,n);{const r=n;return Er(e,i=>r.from<=i&&i<=r.to)!==void 0}})}function Gu(t){const e=t.quantifier;return e&&e.atLeast===0?!0:t.value?ee(t.value)?Lt(t.value,Gu):Gu(t.value):!1}class Cw extends go{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){it(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?rp(e,this.targetCharCodes)===void 0&&(this.found=!0):rp(e,this.targetCharCodes)!==void 0&&(this.found=!0)}}function Wu(t,e){if(e instanceof RegExp){const n=jo(e),r=new Cw(t);return r.visit(n),r.found}else return Er(e,n=>it(t,n.charCodeAt(0)))!==void 0}const sr="PATTERN",Ki="defaultMode",Uo="modes";let ip=typeof new RegExp("(?:)").sticky=="boolean";function Aw(t,e){e=ju(e,{useSticky:ip,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(m,y)=>y()});const n=e.tracer;n("initCharCodeToOptimizedIndexMap",()=>{Jw()});let r;n("Reject Lexer.NA",()=>{r=Oo(t,m=>m[sr]===Ze.NA)});let i=!1,s;n("Transform Patterns",()=>{i=!1,s=x(r,m=>{const y=m[sr];if(hn(y)){const _=y.source;return _.length===1&&_!=="^"&&_!=="$"&&_!=="."&&!y.ignoreCase?_:_.length===2&&_[0]==="\\"&&!it(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],_[1])?_[1]:e.useSticky?op(y):sp(y)}else{if(ln(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{const _=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),M=new RegExp(_);return e.useSticky?op(M):sp(M)}}else throw Error("non exhaustive match")}})});let o,a,c,u,l;n("misc mapping",()=>{o=x(r,m=>m.tokenTypeIdx),a=x(r,m=>{const y=m.GROUP;if(y!==Ze.SKIPPED){if(lt(y))return y;if(pn(y))return!1;throw Error("non exhaustive match")}}),c=x(r,m=>{const y=m.LONGER_ALT;if(y)return ee(y)?x(y,M=>zh(r,M)):[zh(r,y)]}),u=x(r,m=>m.PUSH_MODE),l=x(r,m=>U(m,"POP_MODE"))});let d;n("Line Terminator Handling",()=>{const m=up(e.lineTerminatorCharacters);d=x(r,y=>!1),e.positionTracking!=="onlyOffset"&&(d=x(r,y=>U(y,"LINE_BREAKS")?!!y.LINE_BREAKS:cp(y,m)===!1&&Wu(m,y.PATTERN)))});let f,h,v,S;n("Misc Mapping #2",()=>{f=x(r,ap),h=x(s,Vw),v=st(r,(m,y)=>{const _=y.GROUP;return lt(_)&&_!==Ze.SKIPPED&&(m[_]=[]),m},{}),S=x(s,(m,y)=>({pattern:s[y],longerAlt:c[y],canLineTerminator:d[y],isCustom:f[y],short:h[y],group:a[y],push:u[y],pop:l[y],tokenTypeIdx:o[y],tokenType:r[y]}))});let w=!0,R=[];return e.safeMode||n("First Char Optimization",()=>{R=st(r,(m,y,_)=>{if(typeof y.PATTERN=="string"){const M=y.PATTERN.charCodeAt(0),K=Dn(M);Bu(m,K,S[_])}else if(ee(y.START_CHARS_HINT)){let M;H(y.START_CHARS_HINT,K=>{const Q=typeof K=="string"?K.charCodeAt(0):K,pe=Dn(Q);M!==pe&&(M=pe,Bu(m,pe,S[_]))})}else if(hn(y.PATTERN))if(y.PATTERN.unicode)w=!1,e.ensureOptimizations&&Hu(`${qo}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{const M=ww(y.PATTERN,e.ensureOptimizations);ae(M)&&(w=!1),H(M,K=>{Bu(m,K,S[_])})}else e.ensureOptimizations&&Hu(`${qo}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),w=!1;return m},[])}),{emptyGroups:v,patternIdxToConfig:S,charCodeToPatternIdxToConfig:R,hasCustom:i,canBeOptimized:w}}function Nw(t,e){let n=[];const r=$w(t);n=n.concat(r.errors);const i=Iw(r.valid),s=i.valid;return n=n.concat(i.errors),n=n.concat(Pw(s)),n=n.concat(qw(s)),n=n.concat(Hw(s,e)),n=n.concat(Uw(s)),n}function Pw(t){let e=[];const n=vt(t,r=>hn(r[sr]));return e=e.concat(Ow(n)),e=e.concat(Mw(n)),e=e.concat(Fw(n)),e=e.concat(jw(n)),e=e.concat(xw(n)),e}function $w(t){const e=vt(t,i=>!U(i,sr)),n=x(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:_e.MISSING_PATTERN,tokenTypes:[i]})),r=Do(t,e);return{errors:n,valid:r}}function Iw(t){const e=vt(t,i=>{const s=i[sr];return!hn(s)&&!ln(s)&&!U(s,"exec")&&!lt(s)}),n=x(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:_e.INVALID_PATTERN,tokenTypes:[i]})),r=Do(t,e);return{errors:n,valid:r}}const Dw=/[^\\][$]/;function Ow(t){class e extends go{constructor(){super(...arguments),this.found=!1}visitEndAnchor(s){this.found=!0}}const n=vt(t,i=>{const s=i.PATTERN;try{const o=jo(s),a=new e;return a.visit(o),a.found}catch{return Dw.test(s.source)}});return x(n,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:_e.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function xw(t){const e=vt(t,r=>r.PATTERN.test(""));return x(e,r=>({message:"Token Type: ->"+r.name+"<- static 'PATTERN' must not match an empty string",type:_e.EMPTY_MATCH_PATTERN,tokenTypes:[r]}))}const Lw=/[^\\[][\^]|^\^/;function Mw(t){class e extends go{constructor(){super(...arguments),this.found=!1}visitStartAnchor(s){this.found=!0}}const n=vt(t,i=>{const s=i.PATTERN;try{const o=jo(s),a=new e;return a.visit(o),a.found}catch{return Lw.test(s.source)}});return x(n,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:_e.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function Fw(t){const e=vt(t,r=>{const i=r[sr];return i instanceof RegExp&&(i.multiline||i.global)});return x(e,r=>({message:"Token Type: ->"+r.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:_e.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[r]}))}function jw(t){const e=[];let n=x(t,s=>st(t,(o,a)=>(s.PATTERN.source===a.PATTERN.source&&!it(e,a)&&a.PATTERN!==Ze.NA&&(e.push(a),o.push(a)),o),[]));n=Gi(n);const r=vt(n,s=>s.length>1);return x(r,s=>{const o=x(s,c=>c.name);return{message:`The same RegExp pattern ->${Mt(s).PATTERN}<-has been used in all of the following Token Types: ${o.join(", ")} <-`,type:_e.DUPLICATE_PATTERNS_FOUND,tokenTypes:s}})}function qw(t){const e=vt(t,r=>{if(!U(r,"GROUP"))return!1;const i=r.GROUP;return i!==Ze.SKIPPED&&i!==Ze.NA&&!lt(i)});return x(e,r=>({message:"Token Type: ->"+r.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:_e.INVALID_GROUP_TYPE_FOUND,tokenTypes:[r]}))}function Hw(t,e){const n=vt(t,i=>i.PUSH_MODE!==void 0&&!it(e,i.PUSH_MODE));return x(n,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:_e.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function Uw(t){const e=[],n=st(t,(r,i,s)=>{const o=i.PATTERN;return o===Ze.NA||(lt(o)?r.push({str:o,idx:s,tokenType:i}):hn(o)&&Ww(o)&&r.push({str:o.source,idx:s,tokenType:i})),r},[]);return H(t,(r,i)=>{H(n,({str:s,idx:o,tokenType:a})=>{if(i<o&&Gw(s,r.PATTERN)){const c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:_e.UNREACHABLE_PATTERN,tokenTypes:[r,a]})}})}),e}function Gw(t,e){if(hn(e)){const n=e.exec(t);return n!==null&&n.index===0}else{if(ln(e))return e(t,0,[],{});if(U(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Ww(t){return Er([".","\\","[","]","|","^","$","(",")","?","*","+","{"],n=>t.source.indexOf(n)!==-1)===void 0}function sp(t){const e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function op(t){const e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function Bw(t,e,n){const r=[];return U(t,Ki)||r.push({message:"A MultiMode Lexer cannot be initialized without a <"+Ki+`> property in its definition
`,type:_e.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),U(t,Uo)||r.push({message:"A MultiMode Lexer cannot be initialized without a <"+Uo+`> property in its definition
`,type:_e.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),U(t,Uo)&&U(t,Ki)&&!U(t.modes,t.defaultMode)&&r.push({message:`A MultiMode Lexer cannot be initialized with a ${Ki}: <${t.defaultMode}>which does not exist
`,type:_e.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),U(t,Uo)&&H(t.modes,(i,s)=>{H(i,(o,a)=>{if(pn(o))r.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${s}> at index: <${a}>
`,type:_e.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(U(o,"LONGER_ALT")){const c=ee(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];H(c,u=>{!pn(u)&&!it(i,u)&&r.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${o.name}> outside of mode <${s}>
`,type:_e.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),r}function Kw(t,e,n){const r=[];let i=!1;const s=Gi(kt(je(t.modes))),o=Oo(s,c=>c[sr]===Ze.NA),a=up(n);return e&&H(o,c=>{const u=cp(c,a);if(u!==!1){const d={message:Yw(c,u),type:u.issue,tokenType:c};r.push(d)}else U(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):Wu(a,c.PATTERN)&&(i=!0)}),e&&!i&&r.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:_e.NO_LINE_BREAKS_FLAGS}),r}function zw(t){const e={},n=wt(t);return H(n,r=>{const i=t[r];if(ee(i))e[r]=[];else throw Error("non exhaustive match")}),e}function ap(t){const e=t.PATTERN;if(hn(e))return!1;if(ln(e))return!0;if(U(e,"exec"))return!0;if(lt(e))return!1;throw Error("non exhaustive match")}function Vw(t){return lt(t)&&t.length===1?t.charCodeAt(0):!1}const Xw={test:function(t){const e=t.length;for(let n=this.lastIndex;n<e;n++){const r=t.charCodeAt(n);if(r===10)return this.lastIndex=n+1,!0;if(r===13)return t.charCodeAt(n+1)===10?this.lastIndex=n+2:this.lastIndex=n+1,!0}return!1},lastIndex:0};function cp(t,e){if(U(t,"LINE_BREAKS"))return!1;if(hn(t.PATTERN)){try{Wu(e,t.PATTERN)}catch(n){return{issue:_e.IDENTIFY_TERMINATOR,errMsg:n.message}}return!1}else{if(lt(t.PATTERN))return!1;if(ap(t))return{issue:_e.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function Yw(t,e){if(e.issue===_e.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===_e.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function up(t){return x(t,n=>lt(n)?n.charCodeAt(0):n)}function Bu(t,e,n){t[e]===void 0?t[e]=[n]:t[e].push(n)}const zi=256;let Go=[];function Dn(t){return t<zi?t:Go[t]}function Jw(){if(ae(Go)){Go=new Array(65536);for(let t=0;t<65536;t++)Go[t]=t>255?255+~~(t/255):t}}function Vi(t,e){const n=t.tokenTypeIdx;return n===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[n]===!0}function Wo(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}let lp=1;const dp={};function Xi(t){const e=Qw(t);Zw(e),tk(e),ek(e),H(e,n=>{n.isParent=n.categoryMatches.length>0})}function Qw(t){let e=Ke(t),n=t,r=!0;for(;r;){n=Gi(kt(x(n,s=>s.CATEGORIES)));const i=Do(n,e);e=e.concat(i),ae(i)?r=!1:n=i}return e}function Zw(t){H(t,e=>{hp(e)||(dp[lp]=e,e.tokenTypeIdx=lp++),pp(e)&&!ee(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),pp(e)||(e.CATEGORIES=[]),nk(e)||(e.categoryMatches=[]),rk(e)||(e.categoryMatchesMap={})})}function ek(t){H(t,e=>{e.categoryMatches=[],H(e.categoryMatchesMap,(n,r)=>{e.categoryMatches.push(dp[r].tokenTypeIdx)})})}function tk(t){H(t,e=>{fp([],e)})}function fp(t,e){H(t,n=>{e.categoryMatchesMap[n.tokenTypeIdx]=!0}),H(e.CATEGORIES,n=>{const r=t.concat(e);it(r,n)||fp(r,n)})}function hp(t){return U(t,"tokenTypeIdx")}function pp(t){return U(t,"CATEGORIES")}function nk(t){return U(t,"categoryMatches")}function rk(t){return U(t,"categoryMatchesMap")}function ik(t){return U(t,"tokenTypeIdx")}const sk={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,n,r,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${n} characters.`}};var _e;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(_e||(_e={}));const Yi={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:sk,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Yi);class Ze{constructor(e,n=Yi){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,s)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;const o=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${o}--> <${i}>`);const{time:a,value:c}=Qh(s),u=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(`${o}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return s()},typeof n=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=yt({},Yi,n);const r=this.config.traceInitPerf;r===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof r=="number"&&(this.traceInitMaxIdent=r,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,s=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Yi.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Xw;else if(this.config.lineTerminatorCharacters===Yi.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(n.safeMode&&n.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),ee(e)?i={modes:{defaultMode:Ke(e)},defaultMode:Ki}:(s=!1,i=Ke(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Bw(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(Kw(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},H(i.modes,(a,c)=>{i.modes[c]=Oo(a,u=>pn(u))});const o=wt(i.modes);if(H(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Nw(a,o))}),ae(this.lexerDefinitionErrors)){Xi(a);let u;this.TRACE_INIT("analyzeTokenTypes",()=>{u=Aw(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:n.positionTracking,ensureOptimizations:n.ensureOptimizations,safeMode:n.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=u.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=u.charCodeToPatternIdxToConfig,this.emptyGroups=yt({},this.emptyGroups,u.emptyGroups),this.hasCustom=u.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=u.canBeOptimized}})}),this.defaultMode=i.defaultMode,!ae(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){const c=x(this.lexerDefinitionErrors,u=>u.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}H(this.lexerDefinitionWarning,a=>{Jh(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(ip?(this.chopInput=er,this.match=this.matchWithTest):(this.updateLastIndex=Fe,this.match=this.matchWithExec),s&&(this.handleModes=Fe),this.trackStartLines===!1&&(this.computeNewColumn=er),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=Fe),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{const a=st(this.canModeBeOptimized,(c,u,l)=>(u===!1&&c.push(l),c),[]);if(n.ensureOptimizations&&!ae(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{Ew()}),this.TRACE_INIT("toFastProperties",()=>{Zh(this)})})}tokenize(e,n=this.defaultMode){if(!ae(this.lexerDefinitionErrors)){const i=x(this.lexerDefinitionErrors,s=>s.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,n)}tokenizeInternal(e,n){let r,i,s,o,a,c,u,l,d,f,h,v,S,w,R;const m=e,y=m.length;let _=0,M=0;const K=this.hasCustom?0:Math.floor(e.length/10),Q=new Array(K),pe=[];let ve=this.trackStartLines?1:void 0,Te=this.trackStartLines?1:void 0;const P=zw(this.emptyGroups),E=this.trackStartLines,T=this.config.lineTerminatorsPattern;let k=0,I=[],N=[];const $=[],L=[];Object.freeze(L);let A;function V(){return I}function nt(me){const qe=Dn(me),Ye=N[qe];return Ye===void 0?L:Ye}const tn=me=>{if($.length===1&&me.tokenType.PUSH_MODE===void 0){const qe=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(me);pe.push({offset:me.startOffset,line:me.startLine,column:me.startColumn,length:me.image.length,message:qe})}else{$.pop();const qe=_r($);I=this.patternIdxToConfig[qe],N=this.charCodeToPatternIdxToConfig[qe],k=I.length;const Ye=this.canModeBeOptimized[qe]&&this.config.safeMode===!1;N&&Ye?A=nt:A=V}};function nn(me){$.push(me),N=this.charCodeToPatternIdxToConfig[me],I=this.patternIdxToConfig[me],k=I.length,k=I.length;const qe=this.canModeBeOptimized[me]&&this.config.safeMode===!1;N&&qe?A=nt:A=V}nn.call(this,n);let Me;const rn=this.config.recoveryEnabled;for(;_<y;){c=null;const me=m.charCodeAt(_),qe=A(me),Ye=qe.length;for(r=0;r<Ye;r++){Me=qe[r];const ge=Me.pattern;u=null;const Je=Me.short;if(Je!==!1?me===Je&&(c=ge):Me.isCustom===!0?(R=ge.exec(m,_,Q,P),R!==null?(c=R[0],R.payload!==void 0&&(u=R.payload)):c=null):(this.updateLastIndex(ge,_),c=this.match(ge,e,_)),c!==null){if(a=Me.longerAlt,a!==void 0){const Pe=a.length;for(s=0;s<Pe;s++){const Y=I[a[s]],We=Y.pattern;if(l=null,Y.isCustom===!0?(R=We.exec(m,_,Q,P),R!==null?(o=R[0],R.payload!==void 0&&(l=R.payload)):o=null):(this.updateLastIndex(We,_),o=this.match(We,e,_)),o&&o.length>c.length){c=o,u=l,Me=Y;break}}}break}}if(c!==null){if(d=c.length,f=Me.group,f!==void 0&&(h=Me.tokenTypeIdx,v=this.createTokenInstance(c,_,h,Me.tokenType,ve,Te,d),this.handlePayload(v,u),f===!1?M=this.addToken(Q,M,v):P[f].push(v)),e=this.chopInput(e,d),_=_+d,Te=this.computeNewColumn(Te,d),E===!0&&Me.canLineTerminator===!0){let ge=0,Je,Pe;T.lastIndex=0;do Je=T.test(c),Je===!0&&(Pe=T.lastIndex-1,ge++);while(Je===!0);ge!==0&&(ve=ve+ge,Te=d-Pe,this.updateTokenEndLineColumnLocation(v,f,Pe,ge,ve,Te,d))}this.handleModes(Me,tn,nn,v)}else{const ge=_,Je=ve,Pe=Te;let Y=rn===!1;for(;Y===!1&&_<y;)for(e=this.chopInput(e,1),_++,i=0;i<k;i++){const We=I[i],le=We.pattern,mt=We.short;if(mt!==!1?m.charCodeAt(_)===mt&&(Y=!0):We.isCustom===!0?Y=le.exec(m,_,Q,P)!==null:(this.updateLastIndex(le,_),Y=le.exec(e)!==null),Y===!0)break}if(S=_-ge,Te=this.computeNewColumn(Te,S),w=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(m,ge,S,Je,Pe),pe.push({offset:ge,line:Je,column:Pe,length:S,message:w}),rn===!1)break}}return this.hasCustom||(Q.length=M),{tokens:Q,groups:P,errors:pe}}handleModes(e,n,r,i){if(e.pop===!0){const s=e.push;n(i),s!==void 0&&r.call(this,s)}else e.push!==void 0&&r.call(this,e.push)}chopInput(e,n){return e.substring(n)}updateLastIndex(e,n){e.lastIndex=n}updateTokenEndLineColumnLocation(e,n,r,i,s,o,a){let c,u;n!==void 0&&(c=r===a-1,u=c?-1:0,i===1&&c===!0||(e.endLine=s+u,e.endColumn=o-1+-u))}computeNewColumn(e,n){return e+n}createOffsetOnlyToken(e,n,r,i){return{image:e,startOffset:n,tokenTypeIdx:r,tokenType:i}}createStartOnlyToken(e,n,r,i,s,o){return{image:e,startOffset:n,startLine:s,startColumn:o,tokenTypeIdx:r,tokenType:i}}createFullToken(e,n,r,i,s,o,a){return{image:e,startOffset:n,endOffset:n+a-1,startLine:s,endLine:s,startColumn:o,endColumn:o+a-1,tokenTypeIdx:r,tokenType:i}}addTokenUsingPush(e,n,r){return e.push(r),n}addTokenUsingMemberAccess(e,n,r){return e[n]=r,n++,n}handlePayloadNoCustom(e,n){}handlePayloadWithCustom(e,n){n!==null&&(e.payload=n)}matchWithTest(e,n,r){return e.test(n)===!0?n.substring(r,e.lastIndex):null}matchWithExec(e,n){const r=e.exec(n);return r!==null?r[0]:null}}Ze.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",Ze.NA=/NOT_APPLICABLE/;function Cr(t){return mp(t)?t.LABEL:t.name}function mp(t){return lt(t.LABEL)&&t.LABEL!==""}const ok="parent",gp="categories",yp="label",vp="group",Tp="push_mode",Rp="pop_mode",Sp="longer_alt",bp="line_breaks",_p="start_chars_hint";function Ku(t){return ak(t)}function ak(t){const e=t.pattern,n={};if(n.name=t.name,pn(e)||(n.PATTERN=e),U(t,ok))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return U(t,gp)&&(n.CATEGORIES=t[gp]),Xi([n]),U(t,yp)&&(n.LABEL=t[yp]),U(t,vp)&&(n.GROUP=t[vp]),U(t,Rp)&&(n.POP_MODE=t[Rp]),U(t,Tp)&&(n.PUSH_MODE=t[Tp]),U(t,Sp)&&(n.LONGER_ALT=t[Sp]),U(t,bp)&&(n.LINE_BREAKS=t[bp]),U(t,_p)&&(n.START_CHARS_HINT=t[_p]),n}const On=Ku({name:"EOF",pattern:Ze.NA});Xi([On]);function zu(t,e,n,r,i,s,o,a){return{image:e,startOffset:n,endOffset:r,startLine:i,endLine:s,startColumn:o,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Ep(t,e){return Vi(t,e)}const Ar={buildMismatchTokenMessage({expected:t,actual:e,previous:n,ruleName:r}){return`Expecting ${mp(t)?`--> ${Cr(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:n,customUserDescription:r,ruleName:i}){const s="Expecting: ",a=`
but found: '`+Mt(e).image+"'";if(r)return s+r+a;{const c=st(t,(f,h)=>f.concat(h),[]),u=x(c,f=>`[${x(f,h=>Cr(h)).join(", ")}]`),d=`one of these possible Token sequences:
${x(u,(f,h)=>`  ${h+1}. ${f}`).join(`
`)}`;return s+d+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:n,ruleName:r}){const i="Expecting: ",o=`
but found: '`+Mt(e).image+"'";if(n)return i+n+o;{const c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${x(t,u=>`[${x(u,l=>Cr(l)).join(",")}]`).join(" ,")}>`;return i+c+o}}};Object.freeze(Ar);const ck={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},or={buildDuplicateFoundError(t,e){function n(l){return l instanceof fe?l.terminalType.name:l instanceof ot?l.nonTerminalName:""}const r=t.name,i=Mt(e),s=i.idx,o=Jt(i),a=n(i),c=s>0;let u=`->${o}${c?s:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return u=u.replace(/[ \t]+/g," "),u=u.replace(/\s\s+/g,`
`),u},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){const e=x(t.prefixPath,i=>Cr(i)).join(", "),n=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){const e=x(t.prefixPath,i=>Cr(i)).join(", "),n=t.alternation.idx===0?"":t.alternation.idx;let r=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return r=r+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,r},buildEmptyRepetitionError(t){let e=Jt(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){const e=t.topLevelRule.name,n=x(t.leftRecursionPath,s=>s.name),r=`${e} --> ${n.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof wr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function uk(t,e){const n=new lk(t,e);return n.resolveRefs(),n.errors}class lk extends kr{constructor(e,n){super(),this.nameToTopRule=e,this.errMsgProvider=n,this.errors=[]}resolveRefs(){H(je(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){const n=this.nameToTopRule[e.nonTerminalName];if(n)e.referencedRule=n;else{const r=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:r,type:at.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}}class dk extends Mo{constructor(e,n){super(),this.topProd=e,this.path=n,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Ke(this.path.ruleStack).reverse(),this.occurrenceStack=Ke(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,n=[]){this.found||super.walk(e,n)}walkProdRef(e,n,r){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){const i=n.concat(r);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){ae(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}}class fk extends dk{constructor(e,n){super(e,n),this.path=n,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,n,r){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){const i=n.concat(r),s=new dt({definition:i});this.possibleTokTypes=Bi(s),this.found=!0}}}class Bo extends Mo{constructor(e,n){super(),this.topRule=e,this.occurrence=n,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}}class hk extends Bo{walkMany(e,n,r){if(e.idx===this.occurrence){const i=Mt(n.concat(r));this.result.isEndOfRule=i===void 0,i instanceof fe&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,n,r)}}class wp extends Bo{walkManySep(e,n,r){if(e.idx===this.occurrence){const i=Mt(n.concat(r));this.result.isEndOfRule=i===void 0,i instanceof fe&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,n,r)}}class pk extends Bo{walkAtLeastOne(e,n,r){if(e.idx===this.occurrence){const i=Mt(n.concat(r));this.result.isEndOfRule=i===void 0,i instanceof fe&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,n,r)}}class kp extends Bo{walkAtLeastOneSep(e,n,r){if(e.idx===this.occurrence){const i=Mt(n.concat(r));this.result.isEndOfRule=i===void 0,i instanceof fe&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,n,r)}}function Vu(t,e,n=[]){n=Ke(n);let r=[],i=0;function s(a){return a.concat(ze(t,i+1))}function o(a){const c=Vu(s(a),e,n);return r.concat(c)}for(;n.length<e&&i<t.length;){const a=t[i];if(a instanceof dt)return o(a.definition);if(a instanceof ot)return o(a.definition);if(a instanceof Ve)r=o(a.definition);else if(a instanceof Rt){const c=a.definition.concat([new be({definition:a.definition})]);return o(c)}else if(a instanceof St){const c=[new dt({definition:a.definition}),new be({definition:[new fe({terminalType:a.separator})].concat(a.definition)})];return o(c)}else if(a instanceof ft){const c=a.definition.concat([new be({definition:[new fe({terminalType:a.separator})].concat(a.definition)})]);r=o(c)}else if(a instanceof be){const c=a.definition.concat([new be({definition:a.definition})]);r=o(c)}else{if(a instanceof ht)return H(a.definition,c=>{ae(c.definition)===!1&&(r=o(c.definition))}),r;if(a instanceof fe)n.push(a.terminalType);else throw Error("non exhaustive match")}i++}return r.push({partialPath:n,suffixDef:ze(t,i)}),r}function Cp(t,e,n,r){const i="EXIT_NONE_TERMINAL",s=[i],o="EXIT_ALTERNATIVE";let a=!1;const c=e.length,u=c-r-1,l=[],d=[];for(d.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!ae(d);){const f=d.pop();if(f===o){a&&_r(d).idx<=u&&d.pop();continue}const h=f.def,v=f.idx,S=f.ruleStack,w=f.occurrenceStack;if(ae(h))continue;const R=h[0];if(R===i){const m={idx:v,def:ze(h),ruleStack:Wi(S),occurrenceStack:Wi(w)};d.push(m)}else if(R instanceof fe)if(v<c-1){const m=v+1,y=e[m];if(n(y,R.terminalType)){const _={idx:m,def:ze(h),ruleStack:S,occurrenceStack:w};d.push(_)}}else if(v===c-1)l.push({nextTokenType:R.terminalType,nextTokenOccurrence:R.idx,ruleStack:S,occurrenceStack:w}),a=!0;else throw Error("non exhaustive match");else if(R instanceof ot){const m=Ke(S);m.push(R.nonTerminalName);const y=Ke(w);y.push(R.idx);const _={idx:v,def:R.definition.concat(s,ze(h)),ruleStack:m,occurrenceStack:y};d.push(_)}else if(R instanceof Ve){const m={idx:v,def:ze(h),ruleStack:S,occurrenceStack:w};d.push(m),d.push(o);const y={idx:v,def:R.definition.concat(ze(h)),ruleStack:S,occurrenceStack:w};d.push(y)}else if(R instanceof Rt){const m=new be({definition:R.definition,idx:R.idx}),y=R.definition.concat([m],ze(h)),_={idx:v,def:y,ruleStack:S,occurrenceStack:w};d.push(_)}else if(R instanceof St){const m=new fe({terminalType:R.separator}),y=new be({definition:[m].concat(R.definition),idx:R.idx}),_=R.definition.concat([y],ze(h)),M={idx:v,def:_,ruleStack:S,occurrenceStack:w};d.push(M)}else if(R instanceof ft){const m={idx:v,def:ze(h),ruleStack:S,occurrenceStack:w};d.push(m),d.push(o);const y=new fe({terminalType:R.separator}),_=new be({definition:[y].concat(R.definition),idx:R.idx}),M=R.definition.concat([_],ze(h)),K={idx:v,def:M,ruleStack:S,occurrenceStack:w};d.push(K)}else if(R instanceof be){const m={idx:v,def:ze(h),ruleStack:S,occurrenceStack:w};d.push(m),d.push(o);const y=new be({definition:R.definition,idx:R.idx}),_=R.definition.concat([y],ze(h)),M={idx:v,def:_,ruleStack:S,occurrenceStack:w};d.push(M)}else if(R instanceof ht)for(let m=R.definition.length-1;m>=0;m--){const y=R.definition[m],_={idx:v,def:y.definition.concat(ze(h)),ruleStack:S,occurrenceStack:w};d.push(_),d.push(o)}else if(R instanceof dt)d.push({idx:v,def:R.definition.concat(ze(h)),ruleStack:S,occurrenceStack:w});else if(R instanceof wr)d.push(mk(R,v,S,w));else throw Error("non exhaustive match")}return l}function mk(t,e,n,r){const i=Ke(n);i.push(t.name);const s=Ke(r);return s.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:s}}var ye;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(ye||(ye={}));function Xu(t){if(t instanceof Ve||t==="Option")return ye.OPTION;if(t instanceof be||t==="Repetition")return ye.REPETITION;if(t instanceof Rt||t==="RepetitionMandatory")return ye.REPETITION_MANDATORY;if(t instanceof St||t==="RepetitionMandatoryWithSeparator")return ye.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof ft||t==="RepetitionWithSeparator")return ye.REPETITION_WITH_SEPARATOR;if(t instanceof ht||t==="Alternation")return ye.ALTERNATION;throw Error("non exhaustive match")}function Ap(t){const{occurrence:e,rule:n,prodType:r,maxLookahead:i}=t,s=Xu(r);return s===ye.ALTERNATION?Ko(e,n,i):zo(e,n,s,i)}function gk(t,e,n,r,i,s){const o=Ko(t,e,n),a=Ip(o)?Wo:Vi;return s(o,r,a,i)}function yk(t,e,n,r,i,s){const o=zo(t,e,i,n),a=Ip(o)?Wo:Vi;return s(o[0],a,r)}function vk(t,e,n,r){const i=t.length,s=Lt(t,o=>Lt(o,a=>a.length===1));if(e)return function(o){const a=x(o,c=>c.GATE);for(let c=0;c<i;c++){const u=t[c],l=u.length,d=a[c];if(!(d!==void 0&&d.call(this)===!1))e:for(let f=0;f<l;f++){const h=u[f],v=h.length;for(let S=0;S<v;S++){const w=this.LA(S+1);if(n(w,h[S])===!1)continue e}return c}}};if(s&&!r){const o=x(t,c=>kt(c)),a=st(o,(c,u,l)=>(H(u,d=>{U(c,d.tokenTypeIdx)||(c[d.tokenTypeIdx]=l),H(d.categoryMatches,f=>{U(c,f)||(c[f]=l)})}),c),{});return function(){const c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let o=0;o<i;o++){const a=t[o],c=a.length;e:for(let u=0;u<c;u++){const l=a[u],d=l.length;for(let f=0;f<d;f++){const h=this.LA(f+1);if(n(h,l[f])===!1)continue e}return o}}}}function Tk(t,e,n){const r=Lt(t,s=>s.length===1),i=t.length;if(r&&!n){const s=kt(t);if(s.length===1&&ae(s[0].categoryMatches)){const a=s[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{const o=st(s,(a,c,u)=>(a[c.tokenTypeIdx]=!0,H(c.categoryMatches,l=>{a[l]=!0}),a),[]);return function(){const a=this.LA(1);return o[a.tokenTypeIdx]===!0}}}else return function(){e:for(let s=0;s<i;s++){const o=t[s],a=o.length;for(let c=0;c<a;c++){const u=this.LA(c+1);if(e(u,o[c])===!1)continue e}return!0}return!1}}class Rk extends Mo{constructor(e,n,r){super(),this.topProd=e,this.targetOccurrence=n,this.targetProdType=r}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,n,r,i){return e.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=r.concat(i),!0):!1}walkOption(e,n,r){this.checkIsTarget(e,ye.OPTION,n,r)||super.walkOption(e,n,r)}walkAtLeastOne(e,n,r){this.checkIsTarget(e,ye.REPETITION_MANDATORY,n,r)||super.walkOption(e,n,r)}walkAtLeastOneSep(e,n,r){this.checkIsTarget(e,ye.REPETITION_MANDATORY_WITH_SEPARATOR,n,r)||super.walkOption(e,n,r)}walkMany(e,n,r){this.checkIsTarget(e,ye.REPETITION,n,r)||super.walkOption(e,n,r)}walkManySep(e,n,r){this.checkIsTarget(e,ye.REPETITION_WITH_SEPARATOR,n,r)||super.walkOption(e,n,r)}}class Np extends kr{constructor(e,n,r){super(),this.targetOccurrence=e,this.targetProdType=n,this.targetRef=r,this.result=[]}checkIsTarget(e,n){e.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,ye.OPTION)}visitRepetition(e){this.checkIsTarget(e,ye.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,ye.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,ye.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,ye.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,ye.ALTERNATION)}}function Pp(t){const e=new Array(t);for(let n=0;n<t;n++)e[n]=[];return e}function Yu(t){let e=[""];for(let n=0;n<t.length;n++){const r=t[n],i=[];for(let s=0;s<e.length;s++){const o=e[s];i.push(o+"_"+r.tokenTypeIdx);for(let a=0;a<r.categoryMatches.length;a++){const c="_"+r.categoryMatches[a];i.push(o+c)}}e=i}return e}function Sk(t,e,n){for(let r=0;r<t.length;r++){if(r===n)continue;const i=t[r];for(let s=0;s<e.length;s++){const o=e[s];if(i[o]===!0)return!1}}return!0}function $p(t,e){const n=x(t,o=>Vu([o],1)),r=Pp(n.length),i=x(n,o=>{const a={};return H(o,c=>{const u=Yu(c.partialPath);H(u,l=>{a[l]=!0})}),a});let s=n;for(let o=1;o<=e;o++){const a=s;s=Pp(a.length);for(let c=0;c<a.length;c++){const u=a[c];for(let l=0;l<u.length;l++){const d=u[l].partialPath,f=u[l].suffixDef,h=Yu(d);if(Sk(i,h,c)||ae(f)||d.length===e){const S=r[c];if(Ju(S,d)===!1){S.push(d);for(let w=0;w<h.length;w++){const R=h[w];i[c][R]=!0}}}else{const S=Vu(f,o+1,d);s[c]=s[c].concat(S),H(S,w=>{const R=Yu(w.partialPath);H(R,m=>{i[c][m]=!0})})}}}}return r}function Ko(t,e,n,r){const i=new Np(t,ye.ALTERNATION,r);return e.accept(i),$p(i.result,n)}function zo(t,e,n,r){const i=new Np(t,n);e.accept(i);const s=i.result,a=new Rk(e,t,n).startWalking(),c=new dt({definition:s}),u=new dt({definition:a});return $p([c,u],r)}function Ju(t,e){e:for(let n=0;n<t.length;n++){const r=t[n];if(r.length===e.length){for(let i=0;i<r.length;i++){const s=e[i],o=r[i];if((s===o||o.categoryMatchesMap[s.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function bk(t,e){return t.length<e.length&&Lt(t,(n,r)=>{const i=e[r];return n===i||i.categoryMatchesMap[n.tokenTypeIdx]})}function Ip(t){return Lt(t,e=>Lt(e,n=>Lt(n,r=>ae(r.categoryMatches))))}function _k(t){const e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return x(e,n=>Object.assign({type:at.CUSTOM_LOOKAHEAD_VALIDATION},n))}function Ek(t,e,n,r){const i=Tt(t,c=>wk(c,n)),s=Mk(t,e,n),o=Tt(t,c=>Dk(c,n)),a=Tt(t,c=>Ak(c,t,r,n));return i.concat(s,o,a)}function wk(t,e){const n=new Ck;t.accept(n);const r=n.allProductions,i=qE(r,kk),s=Ft(i,a=>a.length>1);return x(je(s),a=>{const c=Mt(a),u=e.buildDuplicateFoundError(t,a),l=Jt(c),d={message:u,type:at.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:l,occurrence:c.idx},f=Dp(c);return f&&(d.parameter=f),d})}function kk(t){return`${Jt(t)}_#_${t.idx}_#_${Dp(t)}`}function Dp(t){return t instanceof fe?t.terminalType.name:t instanceof ot?t.nonTerminalName:""}class Ck extends kr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}}function Ak(t,e,n,r){const i=[];if(st(e,(o,a)=>a.name===t.name?o+1:o,0)>1){const o=r.buildDuplicateRuleNameError({topLevelRule:t,grammarName:n});i.push({message:o,type:at.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function Nk(t,e,n){const r=[];let i;return it(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `,r.push({message:i,type:at.INVALID_RULE_OVERRIDE,ruleName:t})),r}function Op(t,e,n,r=[]){const i=[],s=Vo(e.definition);if(ae(s))return[];{const o=t.name;it(s,t)&&i.push({message:n.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:r}),type:at.LEFT_RECURSION,ruleName:o});const c=Do(s,r.concat([t])),u=Tt(c,l=>{const d=Ke(r);return d.push(l),Op(t,l,n,d)});return i.concat(u)}}function Vo(t){let e=[];if(ae(t))return e;const n=Mt(t);if(n instanceof ot)e.push(n.referencedRule);else if(n instanceof dt||n instanceof Ve||n instanceof Rt||n instanceof St||n instanceof ft||n instanceof be)e=e.concat(Vo(n.definition));else if(n instanceof ht)e=kt(x(n.definition,s=>Vo(s.definition)));else if(!(n instanceof fe))throw Error("non exhaustive match");const r=Lo(n),i=t.length>1;if(r&&i){const s=ze(t);return e.concat(Vo(s))}else return e}class Qu extends kr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}}function Pk(t,e){const n=new Qu;t.accept(n);const r=n.alternations;return Tt(r,s=>{const o=Wi(s.definition);return Tt(o,(a,c)=>{const u=Cp([a],[],Vi,1);return ae(u)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:s,emptyChoiceIdx:c}),type:at.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:s.idx,alternative:c+1}]:[]})})}function $k(t,e,n){const r=new Qu;t.accept(r);let i=r.alternations;return i=Oo(i,o=>o.ignoreAmbiguities===!0),Tt(i,o=>{const a=o.idx,c=o.maxLookahead||e,u=Ko(a,t,c,o),l=xk(u,o,t,n),d=Lk(u,o,t,n);return l.concat(d)})}class Ik extends kr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}}function Dk(t,e){const n=new Qu;t.accept(n);const r=n.alternations;return Tt(r,s=>s.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:s}),type:at.TOO_MANY_ALTS,ruleName:t.name,occurrence:s.idx}]:[])}function Ok(t,e,n){const r=[];return H(t,i=>{const s=new Ik;i.accept(s);const o=s.allProductions;H(o,a=>{const c=Xu(a),u=a.maxLookahead||e,l=a.idx,f=zo(l,i,c,u)[0];if(ae(kt(f))){const h=n.buildEmptyRepetitionError({topLevelRule:i,repetition:a});r.push({message:h,type:at.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),r}function xk(t,e,n,r){const i=[],s=st(t,(a,c,u)=>(e.definition[u].ignoreAmbiguities===!0||H(c,l=>{const d=[u];H(t,(f,h)=>{u!==h&&Ju(f,l)&&e.definition[h].ignoreAmbiguities!==!0&&d.push(h)}),d.length>1&&!Ju(i,l)&&(i.push(l),a.push({alts:d,path:l}))}),a),[]);return x(s,a=>{const c=x(a.alts,l=>l+1);return{message:r.buildAlternationAmbiguityError({topLevelRule:n,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:at.AMBIGUOUS_ALTS,ruleName:n.name,occurrence:e.idx,alternatives:a.alts}})}function Lk(t,e,n,r){const i=st(t,(o,a,c)=>{const u=x(a,l=>({idx:c,path:l}));return o.concat(u)},[]);return Gi(Tt(i,o=>{if(e.definition[o.idx].ignoreAmbiguities===!0)return[];const c=o.idx,u=o.path,l=vt(i,f=>e.definition[f.idx].ignoreAmbiguities!==!0&&f.idx<c&&bk(f.path,u));return x(l,f=>{const h=[f.idx+1,c+1],v=e.idx===0?"":e.idx;return{message:r.buildAlternationPrefixAmbiguityError({topLevelRule:n,alternation:e,ambiguityIndices:h,prefixPath:f.path}),type:at.AMBIGUOUS_PREFIX_ALTS,ruleName:n.name,occurrence:v,alternatives:h}})}))}function Mk(t,e,n){const r=[],i=x(e,s=>s.name);return H(t,s=>{const o=s.name;if(it(i,o)){const a=n.buildNamespaceConflictError(s);r.push({message:a,type:at.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),r}function Fk(t){const e=ju(t,{errMsgProvider:ck}),n={};return H(t.rules,r=>{n[r.name]=r}),uk(n,e.errMsgProvider)}function jk(t){return t=ju(t,{errMsgProvider:or}),Ek(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}const xp="MismatchedTokenException",Lp="NoViableAltException",Mp="EarlyExitException",Fp="NotAllInputParsedException",jp=[xp,Lp,Mp,Fp];Object.freeze(jp);function Xo(t){return it(jp,t.name)}class Yo extends Error{constructor(e,n){super(e),this.token=n,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class qp extends Yo{constructor(e,n,r){super(e,n),this.previousToken=r,this.name=xp}}class qk extends Yo{constructor(e,n,r){super(e,n),this.previousToken=r,this.name=Lp}}class Hk extends Yo{constructor(e,n){super(e,n),this.name=Fp}}class Uk extends Yo{constructor(e,n,r){super(e,n),this.previousToken=r,this.name=Mp}}const Zu={},Hp="InRuleRecoveryException";class Gk extends Error{constructor(e){super(e),this.name=Hp}}class Wk{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=U(e,"recoveryEnabled")?e.recoveryEnabled:mn.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=Bk)}getTokenToInsert(e){const n=zu(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return n.isInsertedInRecovery=!0,n}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,n,r,i){const s=this.findReSyncTokenType(),o=this.exportLexerState(),a=[];let c=!1;const u=this.LA(1);let l=this.LA(1);const d=()=>{const f=this.LA(0),h=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:u,previous:f,ruleName:this.getCurrRuleFullName()}),v=new qp(h,u,this.LA(0));v.resyncedTokens=Wi(a),this.SAVE_ERROR(v)};for(;!c;)if(this.tokenMatcher(l,i)){d();return}else if(r.call(this)){d(),e.apply(this,n);return}else this.tokenMatcher(l,s)?c=!0:(l=this.SKIP_TOKEN(),this.addToResyncTokens(l,a));this.importLexerState(o)}shouldInRepetitionRecoveryBeTried(e,n,r){return!(r===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,n)))}getFollowsForInRuleRecovery(e,n){const r=this.getCurrentGrammarPath(e,n);return this.getNextPossibleTokenTypes(r)}tryInRuleRecovery(e,n){if(this.canRecoverWithSingleTokenInsertion(e,n))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){const r=this.SKIP_TOKEN();return this.consumeToken(),r}throw new Gk("sad sad panda")}canPerformInRuleRecovery(e,n){return this.canRecoverWithSingleTokenInsertion(e,n)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,n){if(!this.canTokenTypeBeInsertedInRecovery(e)||ae(n))return!1;const r=this.LA(1);return Er(n,s=>this.tokenMatcher(r,s))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){const n=this.getCurrFollowKey(),r=this.getFollowSetFromFollowKey(n);return it(r,e)}findReSyncTokenType(){const e=this.flattenFollowSet();let n=this.LA(1),r=2;for(;;){const i=Er(e,s=>Ep(n,s));if(i!==void 0)return i;n=this.LA(r),r++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return Zu;const e=this.getLastExplicitRuleShortName(),n=this.getLastExplicitRuleOccurrenceIndex(),r=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:n,inRule:this.shortRuleNameToFullName(r)}}buildFullFollowKeyStack(){const e=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return x(e,(r,i)=>i===0?Zu:{ruleName:this.shortRuleNameToFullName(r),idxInCallingRule:n[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){const e=x(this.buildFullFollowKeyStack(),n=>this.getFollowSetFromFollowKey(n));return kt(e)}getFollowSetFromFollowKey(e){if(e===Zu)return[On];const n=e.ruleName+e.idxInCallingRule+tp+e.inRule;return this.resyncFollows[n]}addToResyncTokens(e,n){return this.tokenMatcher(e,On)||n.push(e),n}reSyncTo(e){const n=[];let r=this.LA(1);for(;this.tokenMatcher(r,e)===!1;)r=this.SKIP_TOKEN(),this.addToResyncTokens(r,n);return Wi(n)}attemptInRepetitionRecovery(e,n,r,i,s,o,a){}getCurrentGrammarPath(e,n){const r=this.getHumanReadableRuleStack(),i=Ke(this.RULE_OCCURRENCE_STACK);return{ruleStack:r,occurrenceStack:i,lastTok:e,lastTokOccurrence:n}}getHumanReadableRuleStack(){return x(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}}function Bk(t,e,n,r,i,s,o){const a=this.getKeyForAutomaticLookahead(r,i);let c=this.firstAfterRepMap[a];if(c===void 0){const f=this.getCurrRuleFullName(),h=this.getGAstProductions()[f];c=new s(h,i).startWalking(),this.firstAfterRepMap[a]=c}let u=c.token,l=c.occurrence;const d=c.isEndOfRule;this.RULE_STACK.length===1&&d&&u===void 0&&(u=On,l=1),!(u===void 0||l===void 0)&&this.shouldInRepetitionRecoveryBeTried(u,l,o)&&this.tryInRepetitionRecovery(t,e,n,u)}const Kk=4,xn=8,Up=1<<xn,Gp=2<<xn,el=3<<xn,tl=4<<xn,nl=5<<xn,Jo=6<<xn;function rl(t,e,n){return n|e|t}class il{constructor(e){var n;this.maxLookahead=(n=e?.maxLookahead)!==null&&n!==void 0?n:mn.maxLookahead}validate(e){const n=this.validateNoLeftRecursion(e.rules);if(ae(n)){const r=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),s=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...n,...r,...i,...s]}return n}validateNoLeftRecursion(e){return Tt(e,n=>Op(n,n,or))}validateEmptyOrAlternatives(e){return Tt(e,n=>Pk(n,or))}validateAmbiguousAlternationAlternatives(e,n){return Tt(e,r=>$k(r,n,or))}validateSomeNonEmptyLookaheadPath(e,n){return Ok(e,n,or)}buildLookaheadForAlternation(e){return gk(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,vk)}buildLookaheadForOptional(e){return yk(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Xu(e.prodType),Tk)}}class zk{initLooksAhead(e){this.dynamicTokensEnabled=U(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:mn.dynamicTokensEnabled,this.maxLookahead=U(e,"maxLookahead")?e.maxLookahead:mn.maxLookahead,this.lookaheadStrategy=U(e,"lookaheadStrategy")?e.lookaheadStrategy:new il({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){H(e,n=>{this.TRACE_INIT(`${n.name} Rule Lookahead`,()=>{const{alternation:r,repetition:i,option:s,repetitionMandatory:o,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=Xk(n);H(r,u=>{const l=u.idx===0?"":u.idx;this.TRACE_INIT(`${Jt(u)}${l}`,()=>{const d=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:u.idx,rule:n,maxLookahead:u.maxLookahead||this.maxLookahead,hasPredicates:u.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),f=rl(this.fullRuleNameToShort[n.name],Up,u.idx);this.setLaFuncCache(f,d)})}),H(i,u=>{this.computeLookaheadFunc(n,u.idx,el,"Repetition",u.maxLookahead,Jt(u))}),H(s,u=>{this.computeLookaheadFunc(n,u.idx,Gp,"Option",u.maxLookahead,Jt(u))}),H(o,u=>{this.computeLookaheadFunc(n,u.idx,tl,"RepetitionMandatory",u.maxLookahead,Jt(u))}),H(a,u=>{this.computeLookaheadFunc(n,u.idx,Jo,"RepetitionMandatoryWithSeparator",u.maxLookahead,Jt(u))}),H(c,u=>{this.computeLookaheadFunc(n,u.idx,nl,"RepetitionWithSeparator",u.maxLookahead,Jt(u))})})})}computeLookaheadFunc(e,n,r,i,s,o){this.TRACE_INIT(`${o}${n===0?"":n}`,()=>{const a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:n,rule:e,maxLookahead:s||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=rl(this.fullRuleNameToShort[e.name],r,n);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,n){const r=this.getLastExplicitRuleShortName();return rl(r,e,n)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,n){this.lookAheadFuncsCache.set(e,n)}}class Vk extends kr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}}const Qo=new Vk;function Xk(t){Qo.reset(),t.accept(Qo);const e=Qo.dslMethods;return Qo.reset(),e}function Wp(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function Bp(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function Yk(t,e,n){t.children[n]===void 0?t.children[n]=[e]:t.children[n].push(e)}function Jk(t,e,n){t.children[e]===void 0?t.children[e]=[n]:t.children[e].push(n)}const Qk="name";function Kp(t,e){Object.defineProperty(t,Qk,{enumerable:!1,configurable:!0,writable:!1,value:e})}function Zk(t,e){const n=wt(t),r=n.length;for(let i=0;i<r;i++){const s=n[i],o=t[s],a=o.length;for(let c=0;c<a;c++){const u=o[c];u.tokenTypeIdx===void 0&&this[u.name](u.children,e)}}}function eC(t,e){const n=function(){};Kp(n,t+"BaseSemantics");const r={visit:function(i,s){if(ee(i)&&(i=i[0]),!pn(i))return this[i.name](i.children,s)},validateVisitor:function(){const i=nC(this,e);if(!ae(i)){const s=x(i,o=>o.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${s.join(`

`).replace(/\n/g,`
	`)}`)}}};return n.prototype=r,n.prototype.constructor=n,n._RULE_NAMES=e,n}function tC(t,e,n){const r=function(){};Kp(r,t+"BaseSemanticsWithDefaults");const i=Object.create(n.prototype);return H(e,s=>{i[s]=Zk}),r.prototype=i,r.prototype.constructor=r,r}var sl;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(sl||(sl={}));function nC(t,e){return rC(t,e)}function rC(t,e){const n=vt(e,i=>ln(t[i])===!1),r=x(n,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:sl.MISSING_METHOD,methodName:i}));return Gi(r)}class iC{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=U(e,"nodeLocationTracking")?e.nodeLocationTracking:mn.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=Fe,this.cstFinallyStateUpdate=Fe,this.cstPostTerminal=Fe,this.cstPostNonTerminal=Fe,this.cstPostRule=Fe;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Bp,this.setNodeLocationFromNode=Bp,this.cstPostRule=Fe,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=Fe,this.setNodeLocationFromNode=Fe,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Wp,this.setNodeLocationFromNode=Wp,this.cstPostRule=Fe,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=Fe,this.setNodeLocationFromNode=Fe,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=Fe,this.setNodeLocationFromNode=Fe,this.cstPostRule=Fe,this.setInitialNodeLocation=Fe;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){const n=this.LA(1);e.location={startOffset:n.startOffset,startLine:n.startLine,startColumn:n.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){const n={name:e,children:Object.create(null)};this.setInitialNodeLocation(n),this.CST_STACK.push(n)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){const n=this.LA(0),r=e.location;r.startOffset<=n.startOffset?(r.endOffset=n.endOffset,r.endLine=n.endLine,r.endColumn=n.endColumn):(r.startOffset=NaN,r.startLine=NaN,r.startColumn=NaN)}cstPostRuleOnlyOffset(e){const n=this.LA(0),r=e.location;r.startOffset<=n.startOffset?r.endOffset=n.endOffset:r.startOffset=NaN}cstPostTerminal(e,n){const r=this.CST_STACK[this.CST_STACK.length-1];Yk(r,n,e),this.setNodeLocationFromToken(r.location,n)}cstPostNonTerminal(e,n){const r=this.CST_STACK[this.CST_STACK.length-1];Jk(r,n,e),this.setNodeLocationFromNode(r.location,e.location)}getBaseCstVisitorConstructor(){if(pn(this.baseCstVisitorConstructor)){const e=eC(this.className,wt(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(pn(this.baseCstVisitorWithDefaultsConstructor)){const e=tC(this.className,wt(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){const e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){const e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){const e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}}class sC{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ta}LA(e){const n=this.currIdx+e;return n<0||this.tokVectorLength<=n?ta:this.tokVector[n]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}}class oC{ACTION(e){return e.call(this)}consume(e,n,r){return this.consumeInternal(n,e,r)}subrule(e,n,r){return this.subruleInternal(n,e,r)}option(e,n){return this.optionInternal(n,e)}or(e,n){return this.orInternal(n,e)}many(e,n){return this.manyInternal(e,n)}atLeastOne(e,n){return this.atLeastOneInternal(e,n)}CONSUME(e,n){return this.consumeInternal(e,0,n)}CONSUME1(e,n){return this.consumeInternal(e,1,n)}CONSUME2(e,n){return this.consumeInternal(e,2,n)}CONSUME3(e,n){return this.consumeInternal(e,3,n)}CONSUME4(e,n){return this.consumeInternal(e,4,n)}CONSUME5(e,n){return this.consumeInternal(e,5,n)}CONSUME6(e,n){return this.consumeInternal(e,6,n)}CONSUME7(e,n){return this.consumeInternal(e,7,n)}CONSUME8(e,n){return this.consumeInternal(e,8,n)}CONSUME9(e,n){return this.consumeInternal(e,9,n)}SUBRULE(e,n){return this.subruleInternal(e,0,n)}SUBRULE1(e,n){return this.subruleInternal(e,1,n)}SUBRULE2(e,n){return this.subruleInternal(e,2,n)}SUBRULE3(e,n){return this.subruleInternal(e,3,n)}SUBRULE4(e,n){return this.subruleInternal(e,4,n)}SUBRULE5(e,n){return this.subruleInternal(e,5,n)}SUBRULE6(e,n){return this.subruleInternal(e,6,n)}SUBRULE7(e,n){return this.subruleInternal(e,7,n)}SUBRULE8(e,n){return this.subruleInternal(e,8,n)}SUBRULE9(e,n){return this.subruleInternal(e,9,n)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,n,r=na){if(it(this.definedRulesNames,e)){const o={message:or.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:at.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(o)}this.definedRulesNames.push(e);const i=this.defineRule(e,n,r);return this[e]=i,i}OVERRIDE_RULE(e,n,r=na){const i=Nk(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);const s=this.defineRule(e,n,r);return this[e]=s,s}BACKTRACK(e,n){return function(){this.isBackTrackingStack.push(1);const r=this.saveRecogState();try{return e.apply(this,n),!0}catch(i){if(Xo(i))return!1;throw i}finally{this.reloadRecogState(r),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return pw(je(this.gastProductionsCache))}}class aC{initRecognizerEngine(e,n){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Wo,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},U(n,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(ee(e)){if(ae(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(ee(e))this.tokensMap=st(e,(s,o)=>(s[o.name]=o,s),{});else if(U(e,"modes")&&Lt(kt(je(e.modes)),ik)){const s=kt(je(e.modes)),o=qu(s);this.tokensMap=st(o,(a,c)=>(a[c.name]=c,a),{})}else if(Et(e))this.tokensMap=Ke(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=On;const r=U(e,"modes")?kt(je(e.modes)):je(e),i=Lt(r,s=>ae(s.categoryMatches));this.tokenMatcher=i?Wo:Vi,Xi(je(this.tokensMap))}defineRule(e,n,r){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);const i=U(r,"resyncEnabled")?r.resyncEnabled:na.resyncEnabled,s=U(r,"recoveryValueFunc")?r.recoveryValueFunc:na.recoveryValueFunc,o=this.ruleShortNameIdx<<Kk+xn;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;let a;return this.outputCst===!0?a=function(...l){try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),n.apply(this,l);const d=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(d),d}catch(d){return this.invokeRuleCatch(d,i,s)}finally{this.ruleFinallyStateUpdate()}}:a=function(...l){try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),n.apply(this,l)}catch(d){return this.invokeRuleCatch(d,i,s)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:n})}invokeRuleCatch(e,n,r){const i=this.RULE_STACK.length===1,s=n&&!this.isBackTracking()&&this.recoveryEnabled;if(Xo(e)){const o=e;if(s){const a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(o.resyncedTokens=this.reSyncTo(a),this.outputCst){const c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return r(e);else{if(this.outputCst){const c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,o.partialCstResult=c}throw o}}else{if(i)return this.moveToTerminatedState(),r(e);throw o}}else throw e}optionInternal(e,n){const r=this.getKeyForAutomaticLookahead(Gp,n);return this.optionInternalLogic(e,n,r)}optionInternalLogic(e,n,r){let i=this.getLaFuncFromCache(r),s;if(typeof e!="function"){s=e.DEF;const o=e.GATE;if(o!==void 0){const a=i;i=()=>o.call(this)&&a.call(this)}}else s=e;if(i.call(this)===!0)return s.call(this)}atLeastOneInternal(e,n){const r=this.getKeyForAutomaticLookahead(tl,e);return this.atLeastOneInternalLogic(e,n,r)}atLeastOneInternalLogic(e,n,r){let i=this.getLaFuncFromCache(r),s;if(typeof n!="function"){s=n.DEF;const o=n.GATE;if(o!==void 0){const a=i;i=()=>o.call(this)&&a.call(this)}}else s=n;if(i.call(this)===!0){let o=this.doSingleRepetition(s);for(;i.call(this)===!0&&o===!0;)o=this.doSingleRepetition(s)}else throw this.raiseEarlyExitException(e,ye.REPETITION_MANDATORY,n.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,n],i,tl,e,pk)}atLeastOneSepFirstInternal(e,n){const r=this.getKeyForAutomaticLookahead(Jo,e);this.atLeastOneSepFirstInternalLogic(e,n,r)}atLeastOneSepFirstInternalLogic(e,n,r){const i=n.DEF,s=n.SEP;if(this.getLaFuncFromCache(r).call(this)===!0){i.call(this);const a=()=>this.tokenMatcher(this.LA(1),s);for(;this.tokenMatcher(this.LA(1),s)===!0;)this.CONSUME(s),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,s,a,i,kp],a,Jo,e,kp)}else throw this.raiseEarlyExitException(e,ye.REPETITION_MANDATORY_WITH_SEPARATOR,n.ERR_MSG)}manyInternal(e,n){const r=this.getKeyForAutomaticLookahead(el,e);return this.manyInternalLogic(e,n,r)}manyInternalLogic(e,n,r){let i=this.getLaFuncFromCache(r),s;if(typeof n!="function"){s=n.DEF;const a=n.GATE;if(a!==void 0){const c=i;i=()=>a.call(this)&&c.call(this)}}else s=n;let o=!0;for(;i.call(this)===!0&&o===!0;)o=this.doSingleRepetition(s);this.attemptInRepetitionRecovery(this.manyInternal,[e,n],i,el,e,hk,o)}manySepFirstInternal(e,n){const r=this.getKeyForAutomaticLookahead(nl,e);this.manySepFirstInternalLogic(e,n,r)}manySepFirstInternalLogic(e,n,r){const i=n.DEF,s=n.SEP;if(this.getLaFuncFromCache(r).call(this)===!0){i.call(this);const a=()=>this.tokenMatcher(this.LA(1),s);for(;this.tokenMatcher(this.LA(1),s)===!0;)this.CONSUME(s),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,s,a,i,wp],a,nl,e,wp)}}repetitionSepSecondInternal(e,n,r,i,s){for(;r();)this.CONSUME(n),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,n,r,i,s],r,Jo,e,s)}doSingleRepetition(e){const n=this.getLexerPosition();return e.call(this),this.getLexerPosition()>n}orInternal(e,n){const r=this.getKeyForAutomaticLookahead(Up,n),i=ee(e)?e:e.DEF,o=this.getLaFuncFromCache(r).call(this,i);if(o!==void 0)return i[o].ALT.call(this);this.raiseNoAltException(n,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){const e=this.LA(1),n=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Hk(n,e))}}subruleInternal(e,n,r){let i;try{const s=r!==void 0?r.ARGS:void 0;return this.subruleIdx=n,i=e.apply(this,s),this.cstPostNonTerminal(i,r!==void 0&&r.LABEL!==void 0?r.LABEL:e.ruleName),i}catch(s){throw this.subruleInternalError(s,r,e.ruleName)}}subruleInternalError(e,n,r){throw Xo(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,n!==void 0&&n.LABEL!==void 0?n.LABEL:r),delete e.partialCstResult),e}consumeInternal(e,n,r){let i;try{const s=this.LA(1);this.tokenMatcher(s,e)===!0?(this.consumeToken(),i=s):this.consumeInternalError(e,s,r)}catch(s){i=this.consumeInternalRecovery(e,n,s)}return this.cstPostTerminal(r!==void 0&&r.LABEL!==void 0?r.LABEL:e.name,i),i}consumeInternalError(e,n,r){let i;const s=this.LA(0);throw r!==void 0&&r.ERR_MSG?i=r.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:n,previous:s,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new qp(i,n,s))}consumeInternalRecovery(e,n,r){if(this.recoveryEnabled&&r.name==="MismatchedTokenException"&&!this.isBackTracking()){const i=this.getFollowsForInRuleRecovery(e,n);try{return this.tryInRuleRecovery(e,i)}catch(s){throw s.name===Hp?r:s}}else throw r}saveRecogState(){const e=this.errors,n=Ke(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:n,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,n,r){this.RULE_OCCURRENCE_STACK.push(r),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(n)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){const e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),On)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}}class cC{initErrorHandler(e){this._errors=[],this.errorMessageProvider=U(e,"errorMessageProvider")?e.errorMessageProvider:mn.errorMessageProvider}SAVE_ERROR(e){if(Xo(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Ke(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Ke(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,n,r){const i=this.getCurrRuleFullName(),s=this.getGAstProductions()[i],a=zo(e,s,n,this.maxLookahead)[0],c=[];for(let l=1;l<=this.maxLookahead;l++)c.push(this.LA(l));const u=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:r,ruleName:i});throw this.SAVE_ERROR(new Uk(u,this.LA(1),this.LA(0)))}raiseNoAltException(e,n){const r=this.getCurrRuleFullName(),i=this.getGAstProductions()[r],s=Ko(e,i,this.maxLookahead),o=[];for(let u=1;u<=this.maxLookahead;u++)o.push(this.LA(u));const a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:s,actual:o,previous:a,customUserDescription:n,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new qk(c,this.LA(1),a))}}class uC{initContentAssist(){}computeContentAssist(e,n){const r=this.gastProductionsCache[e];if(pn(r))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Cp([r],n,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){const n=Mt(e.ruleStack),i=this.getGAstProductions()[n];return new fk(i,e).startWalking()}}const Zo={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Zo);const zp=!0,Vp=Math.pow(2,xn)-1,Xp=Ku({name:"RECORDING_PHASE_TOKEN",pattern:Ze.NA});Xi([Xp]);const Yp=zu(Xp,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(Yp);const lC={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}};class dC{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){const n=e>0?e:"";this[`CONSUME${n}`]=function(r,i){return this.consumeInternalRecord(r,e,i)},this[`SUBRULE${n}`]=function(r,i){return this.subruleInternalRecord(r,e,i)},this[`OPTION${n}`]=function(r){return this.optionInternalRecord(r,e)},this[`OR${n}`]=function(r){return this.orInternalRecord(r,e)},this[`MANY${n}`]=function(r){this.manyInternalRecord(e,r)},this[`MANY_SEP${n}`]=function(r){this.manySepFirstInternalRecord(e,r)},this[`AT_LEAST_ONE${n}`]=function(r){this.atLeastOneInternalRecord(e,r)},this[`AT_LEAST_ONE_SEP${n}`]=function(r){this.atLeastOneSepFirstInternalRecord(e,r)}}this.consume=function(e,n,r){return this.consumeInternalRecord(n,e,r)},this.subrule=function(e,n,r){return this.subruleInternalRecord(n,e,r)},this.option=function(e,n){return this.optionInternalRecord(n,e)},this.or=function(e,n){return this.orInternalRecord(n,e)},this.many=function(e,n){this.manyInternalRecord(e,n)},this.atLeastOne=function(e,n){this.atLeastOneInternalRecord(e,n)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{const e=this;for(let n=0;n<10;n++){const r=n>0?n:"";delete e[`CONSUME${r}`],delete e[`SUBRULE${r}`],delete e[`OPTION${r}`],delete e[`OR${r}`],delete e[`MANY${r}`],delete e[`MANY_SEP${r}`],delete e[`AT_LEAST_ONE${r}`],delete e[`AT_LEAST_ONE_SEP${r}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,n){return()=>!0}LA_RECORD(e){return ta}topLevelRuleRecord(e,n){try{const r=new wr({definition:[],name:e});return r.name=e,this.recordingProdStack.push(r),n.call(this),this.recordingProdStack.pop(),r}catch(r){if(r.KNOWN_RECORDER_ERROR!==!0)try{r.message=r.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw r}throw r}}optionInternalRecord(e,n){return Ji.call(this,Ve,e,n)}atLeastOneInternalRecord(e,n){Ji.call(this,Rt,n,e)}atLeastOneSepFirstInternalRecord(e,n){Ji.call(this,St,n,e,zp)}manyInternalRecord(e,n){Ji.call(this,be,n,e)}manySepFirstInternalRecord(e,n){Ji.call(this,ft,n,e,zp)}orInternalRecord(e,n){return fC.call(this,e,n)}subruleInternalRecord(e,n,r){if(ea(n),!e||U(e,"ruleName")===!1){const a=new Error(`<SUBRULE${Jp(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}const i=_r(this.recordingProdStack),s=e.ruleName,o=new ot({idx:n,nonTerminalName:s,label:r?.LABEL,referencedRule:void 0});return i.definition.push(o),this.outputCst?lC:Zo}consumeInternalRecord(e,n,r){if(ea(n),!hp(e)){const o=new Error(`<CONSUME${Jp(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw o.KNOWN_RECORDER_ERROR=!0,o}const i=_r(this.recordingProdStack),s=new fe({idx:n,terminalType:e,label:r?.LABEL});return i.definition.push(s),Yp}}function Ji(t,e,n,r=!1){ea(n);const i=_r(this.recordingProdStack),s=ln(e)?e:e.DEF,o=new t({definition:[],idx:n});return r&&(o.separator=e.SEP),U(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),s.call(this),i.definition.push(o),this.recordingProdStack.pop(),Zo}function fC(t,e){ea(e);const n=_r(this.recordingProdStack),r=ee(t)===!1,i=r===!1?t:t.DEF,s=new ht({definition:[],idx:e,ignoreAmbiguities:r&&t.IGNORE_AMBIGUITIES===!0});U(t,"MAX_LOOKAHEAD")&&(s.maxLookahead=t.MAX_LOOKAHEAD);const o=Xh(i,a=>ln(a.GATE));return s.hasPredicates=o,n.definition.push(s),H(i,a=>{const c=new dt({definition:[]});s.definition.push(c),U(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:U(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),Zo}function Jp(t){return t===0?"":`${t}`}function ea(t){if(t<0||t>Vp){const e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${Vp+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}class hC{initPerformanceTracer(e){if(U(e,"traceInitPerf")){const n=e.traceInitPerf,r=typeof n=="number";this.traceInitMaxIdent=r?n:1/0,this.traceInitPerf=r?n>0:n}else this.traceInitMaxIdent=0,this.traceInitPerf=mn.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,n){if(this.traceInitPerf===!0){this.traceInitIndent++;const r=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${r}--> <${e}>`);const{time:i,value:s}=Qh(n),o=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&o(`${r}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,s}else return n()}}function pC(t,e){e.forEach(n=>{const r=n.prototype;Object.getOwnPropertyNames(r).forEach(i=>{if(i==="constructor")return;const s=Object.getOwnPropertyDescriptor(r,i);s&&(s.get||s.set)?Object.defineProperty(t.prototype,i,s):t.prototype[i]=n.prototype[i]})})}const ta=zu(On,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ta);const mn=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:Ar,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),na=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0});var at;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(at||(at={}));function Qp(t=void 0){return function(){return t}}class Qi{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;const n=this.className;this.TRACE_INIT("toFastProps",()=>{Zh(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),H(this.definedRulesNames,i=>{const o=this[i].originalGrammarAction;let a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,o)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let r=[];if(this.TRACE_INIT("Grammar Resolving",()=>{r=Fk({rules:je(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(r)}),this.TRACE_INIT("Grammar Validations",()=>{if(ae(r)&&this.skipValidations===!1){const i=jk({rules:je(this.gastProductionsCache),tokenTypes:je(this.tokensMap),errMsgProvider:or,grammarName:n}),s=_k({lookaheadStrategy:this.lookaheadStrategy,rules:je(this.gastProductionsCache),tokenTypes:je(this.tokensMap),grammarName:n});this.definitionErrors=this.definitionErrors.concat(i,s)}}),ae(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{const i=Sw(je(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,s;(s=(i=this.lookaheadStrategy).initialize)===null||s===void 0||s.call(i,{rules:je(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(je(this.gastProductionsCache))})),!Qi.DEFER_DEFINITION_ERRORS_HANDLING&&!ae(this.definitionErrors))throw e=x(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,n){this.definitionErrors=[],this.selfAnalysisDone=!1;const r=this;if(r.initErrorHandler(n),r.initLexerAdapter(),r.initLooksAhead(n),r.initRecognizerEngine(e,n),r.initRecoverable(n),r.initTreeBuilder(n),r.initContentAssist(),r.initGastRecorder(n),r.initPerformanceTracer(n),U(n,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=U(n,"skipValidations")?n.skipValidations:mn.skipValidations}}Qi.DEFER_DEFINITION_ERRORS_HANDLING=!1,pC(Qi,[Wk,zk,iC,sC,aC,oC,cC,uC,dC,hC]);class mC extends Qi{constructor(e,n=mn){const r=Ke(n);r.outputCst=!1,super(e,r)}}function Nr(t,e,n){return`${t.name}_${e}_${n}`}const Ln=1,gC=2,Zp=4,em=5,Zi=7,yC=8,vC=9,TC=10,RC=11,tm=12;class ol{constructor(e){this.target=e}isEpsilon(){return!1}}class al extends ol{constructor(e,n){super(e),this.tokenType=n}}class nm extends ol{constructor(e){super(e)}isEpsilon(){return!0}}class cl extends ol{constructor(e,n,r){super(e),this.rule=n,this.followState=r}isEpsilon(){return!0}}function SC(t){const e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};bC(e,t);const n=t.length;for(let r=0;r<n;r++){const i=t[r],s=ar(e,i,i);s!==void 0&&DC(e,i,s)}return e}function bC(t,e){const n=e.length;for(let r=0;r<n;r++){const i=e[r],s=Ge(t,i,void 0,{type:gC}),o=Ge(t,i,void 0,{type:Zi});s.stop=o,t.ruleToStartState.set(i,s),t.ruleToStopState.set(i,o)}}function rm(t,e,n){return n instanceof fe?ul(t,e,n.terminalType,n):n instanceof ot?IC(t,e,n):n instanceof ht?CC(t,e,n):n instanceof Ve?AC(t,e,n):n instanceof be?_C(t,e,n):n instanceof ft?EC(t,e,n):n instanceof Rt?wC(t,e,n):n instanceof St?kC(t,e,n):ar(t,e,n)}function _C(t,e,n){const r=Ge(t,e,n,{type:em});Mn(t,r);const i=Pr(t,e,r,n,ar(t,e,n));return sm(t,e,n,i)}function EC(t,e,n){const r=Ge(t,e,n,{type:em});Mn(t,r);const i=Pr(t,e,r,n,ar(t,e,n)),s=ul(t,e,n.separator,n);return sm(t,e,n,i,s)}function wC(t,e,n){const r=Ge(t,e,n,{type:Zp});Mn(t,r);const i=Pr(t,e,r,n,ar(t,e,n));return im(t,e,n,i)}function kC(t,e,n){const r=Ge(t,e,n,{type:Zp});Mn(t,r);const i=Pr(t,e,r,n,ar(t,e,n)),s=ul(t,e,n.separator,n);return im(t,e,n,i,s)}function CC(t,e,n){const r=Ge(t,e,n,{type:Ln});Mn(t,r);const i=x(n.definition,o=>rm(t,e,o));return Pr(t,e,r,n,...i)}function AC(t,e,n){const r=Ge(t,e,n,{type:Ln});Mn(t,r);const i=Pr(t,e,r,n,ar(t,e,n));return NC(t,e,n,i)}function ar(t,e,n){const r=vt(x(n.definition,i=>rm(t,e,i)),i=>i!==void 0);return r.length===1?r[0]:r.length===0?void 0:$C(t,r)}function im(t,e,n,r,i){const s=r.left,o=r.right,a=Ge(t,e,n,{type:RC});Mn(t,a);const c=Ge(t,e,n,{type:tm});return s.loopback=a,c.loopback=a,t.decisionMap[Nr(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",n.idx)]=a,Oe(o,a),i===void 0?(Oe(a,s),Oe(a,c)):(Oe(a,c),Oe(a,i.left),Oe(i.right,s)),{left:s,right:c}}function sm(t,e,n,r,i){const s=r.left,o=r.right,a=Ge(t,e,n,{type:TC});Mn(t,a);const c=Ge(t,e,n,{type:tm}),u=Ge(t,e,n,{type:vC});return a.loopback=u,c.loopback=u,Oe(a,s),Oe(a,c),Oe(o,u),i!==void 0?(Oe(u,c),Oe(u,i.left),Oe(i.right,s)):Oe(u,a),t.decisionMap[Nr(e,i?"RepetitionWithSeparator":"Repetition",n.idx)]=a,{left:a,right:c}}function NC(t,e,n,r){const i=r.left,s=r.right;return Oe(i,s),t.decisionMap[Nr(e,"Option",n.idx)]=i,r}function Mn(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Pr(t,e,n,r,...i){const s=Ge(t,e,r,{type:yC,start:n});n.end=s;for(const a of i)a!==void 0?(Oe(n,a.left),Oe(a.right,s)):Oe(n,s);const o={left:n,right:s};return t.decisionMap[Nr(e,PC(r),r.idx)]=n,o}function PC(t){if(t instanceof ht)return"Alternation";if(t instanceof Ve)return"Option";if(t instanceof be)return"Repetition";if(t instanceof ft)return"RepetitionWithSeparator";if(t instanceof Rt)return"RepetitionMandatory";if(t instanceof St)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function $C(t,e){const n=e.length;for(let s=0;s<n-1;s++){const o=e[s];let a;o.left.transitions.length===1&&(a=o.left.transitions[0]);const c=a instanceof cl,u=a,l=e[s+1].left;o.left.type===Ln&&o.right.type===Ln&&a!==void 0&&(c&&u.followState===o.right||a.target===o.right)?(c?u.followState=l:a.target=l,OC(t,o.right)):Oe(o.right,l)}const r=e[0],i=e[n-1];return{left:r.left,right:i.right}}function ul(t,e,n,r){const i=Ge(t,e,r,{type:Ln}),s=Ge(t,e,r,{type:Ln});return ll(i,new al(s,n)),{left:i,right:s}}function IC(t,e,n){const r=n.referencedRule,i=t.ruleToStartState.get(r),s=Ge(t,e,n,{type:Ln}),o=Ge(t,e,n,{type:Ln}),a=new cl(i,r,o);return ll(s,a),{left:s,right:o}}function DC(t,e,n){const r=t.ruleToStartState.get(e);Oe(r,n.left);const i=t.ruleToStopState.get(e);return Oe(n.right,i),{left:r,right:i}}function Oe(t,e){const n=new nm(e);ll(t,n)}function Ge(t,e,n,r){const i=Object.assign({atn:t,production:n,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},r);return t.states.push(i),i}function ll(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function OC(t,e){t.states.splice(t.states.indexOf(e),1)}const ra={};class dl{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){const n=om(e);n in this.map||(this.map[n]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return x(this.configs,e=>e.alt)}get key(){let e="";for(const n in this.map)e+=n+":";return e}}function om(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(n=>n.stateNumber.toString()).join("_")}`}function xC(t,e){const n={};return r=>{const i=r.toString();let s=n[i];return s!==void 0||(s={atnStartState:t,decision:e,states:{}},n[i]=s),s}}class am{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,n){this.predicates[e]=n}toString(){let e="";const n=this.predicates.length;for(let r=0;r<n;r++)e+=this.predicates[r]===!0?"1":"0";return e}}const cm=new am;class LC extends il{constructor(e){var n;super(),this.logging=(n=e?.logging)!==null&&n!==void 0?n:r=>console.log(r)}initialize(e){this.atn=SC(e.rules),this.dfas=MC(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){const{prodOccurrence:n,rule:r,hasPredicates:i,dynamicTokensEnabled:s}=e,o=this.dfas,a=this.logging,c=Nr(r,"Alternation",n),l=this.atn.decisionMap[c].decision,d=x(Ap({maxLookahead:1,occurrence:n,prodType:"Alternation",rule:r}),f=>x(f,h=>h[0]));if(um(d,!1)&&!s){const f=st(d,(h,v,S)=>(H(v,w=>{w&&(h[w.tokenTypeIdx]=S,H(w.categoryMatches,R=>{h[R]=S}))}),h),{});return i?function(h){var v;const S=this.LA(1),w=f[S.tokenTypeIdx];if(h!==void 0&&w!==void 0){const R=(v=h[w])===null||v===void 0?void 0:v.GATE;if(R!==void 0&&R.call(this)===!1)return}return w}:function(){const h=this.LA(1);return f[h.tokenTypeIdx]}}else return i?function(f){const h=new am,v=f===void 0?0:f.length;for(let w=0;w<v;w++){const R=f?.[w].GATE;h.set(w,R===void 0||R.call(this))}const S=fl.call(this,o,l,h,a);return typeof S=="number"?S:void 0}:function(){const f=fl.call(this,o,l,cm,a);return typeof f=="number"?f:void 0}}buildLookaheadForOptional(e){const{prodOccurrence:n,rule:r,prodType:i,dynamicTokensEnabled:s}=e,o=this.dfas,a=this.logging,c=Nr(r,i,n),l=this.atn.decisionMap[c].decision,d=x(Ap({maxLookahead:1,occurrence:n,prodType:i,rule:r}),f=>x(f,h=>h[0]));if(um(d)&&d[0][0]&&!s){const f=d[0],h=kt(f);if(h.length===1&&ae(h[0].categoryMatches)){const S=h[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===S}}else{const v=st(h,(S,w)=>(w!==void 0&&(S[w.tokenTypeIdx]=!0,H(w.categoryMatches,R=>{S[R]=!0})),S),{});return function(){const S=this.LA(1);return v[S.tokenTypeIdx]===!0}}}return function(){const f=fl.call(this,o,l,cm,a);return typeof f=="object"?!1:f===0}}}function um(t,e=!0){const n=new Set;for(const r of t){const i=new Set;for(const s of r){if(s===void 0){if(e)break;return!1}const o=[s.tokenTypeIdx].concat(s.categoryMatches);for(const a of o)if(n.has(a)){if(!i.has(a))return!1}else n.add(a),i.add(a)}}return!0}function MC(t){const e=t.decisionStates.length,n=Array(e);for(let r=0;r<e;r++)n[r]=xC(t.decisionStates[r],r);return n}function fl(t,e,n,r){const i=t[e](n);let s=i.start;if(s===void 0){const a=VC(i.atnStartState);s=fm(i,lm(a)),i.start=s}return FC.apply(this,[i,s,n,r])}function FC(t,e,n,r){let i=e,s=1;const o=[];let a=this.LA(s++);for(;;){let c=WC(i,a);if(c===void 0&&(c=jC.apply(this,[t,i,a,s,n,r])),c===ra)return GC(o,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,o.push(a),a=this.LA(s++)}}function jC(t,e,n,r,i,s){const o=BC(e.configs,n,i);if(o.size===0)return dm(t,e,n,ra),ra;let a=lm(o);const c=zC(o,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(QC(o)){const u=tw(o.alts);a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u,qC.apply(this,[t,r,o.alts,s])}return a=dm(t,e,n,a),a}function qC(t,e,n,r){const i=[];for(let u=1;u<=e;u++)i.push(this.LA(u).tokenType);const s=t.atnStartState,o=s.rule,a=s.production,c=HC({topLevelRule:o,ambiguityIndices:n,production:a,prefixPath:i});r(c)}function HC(t){const e=x(t.prefixPath,i=>Cr(i)).join(", "),n=t.production.idx===0?"":t.production.idx;let r=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${UC(t.production)}${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return r=r+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,r}function UC(t){if(t instanceof ot)return"SUBRULE";if(t instanceof Ve)return"OPTION";if(t instanceof ht)return"OR";if(t instanceof Rt)return"AT_LEAST_ONE";if(t instanceof St)return"AT_LEAST_ONE_SEP";if(t instanceof ft)return"MANY_SEP";if(t instanceof be)return"MANY";if(t instanceof fe)return"CONSUME";throw Error("non exhaustive match")}function GC(t,e,n){const r=Tt(e.configs.elements,s=>s.state.transitions),i=dw(r.filter(s=>s instanceof al).map(s=>s.tokenType),s=>s.tokenTypeIdx);return{actualToken:n,possibleTokenTypes:i,tokenPath:t}}function WC(t,e){return t.edges[e.tokenTypeIdx]}function BC(t,e,n){const r=new dl,i=[];for(const o of t.elements){if(n.is(o.alt)===!1)continue;if(o.state.type===Zi){i.push(o);continue}const a=o.state.transitions.length;for(let c=0;c<a;c++){const u=o.state.transitions[c],l=KC(u,e);l!==void 0&&r.add({state:l,alt:o.alt,stack:o.stack})}}let s;if(i.length===0&&r.size===1&&(s=r),s===void 0){s=new dl;for(const o of r.elements)ia(o,s)}if(i.length>0&&!YC(s))for(const o of i)s.add(o);return s}function KC(t,e){if(t instanceof al&&Ep(e,t.tokenType))return t.target}function zC(t,e){let n;for(const r of t.elements)if(e.is(r.alt)===!0){if(n===void 0)n=r.alt;else if(n!==r.alt)return}return n}function lm(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function dm(t,e,n,r){return r=fm(t,r),e.edges[n.tokenTypeIdx]=r,r}function fm(t,e){if(e===ra)return e;const n=e.configs.key,r=t.states[n];return r!==void 0?r:(e.configs.finalize(),t.states[n]=e,e)}function VC(t){const e=new dl,n=t.transitions.length;for(let r=0;r<n;r++){const s={state:t.transitions[r].target,alt:r,stack:[]};ia(s,e)}return e}function ia(t,e){const n=t.state;if(n.type===Zi){if(t.stack.length>0){const i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};ia(o,e)}else e.add(t);return}n.epsilonOnlyTransitions||e.add(t);const r=n.transitions.length;for(let i=0;i<r;i++){const s=n.transitions[i],o=XC(t,s);o!==void 0&&ia(o,e)}}function XC(t,e){if(e instanceof nm)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof cl){const n=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:n}}}function YC(t){for(const e of t.elements)if(e.state.type===Zi)return!0;return!1}function JC(t){for(const e of t.elements)if(e.state.type!==Zi)return!1;return!0}function QC(t){if(JC(t))return!0;const e=ZC(t.elements);return eA(e)&&!tA(e)}function ZC(t){const e=new Map;for(const n of t){const r=om(n,!1);let i=e.get(r);i===void 0&&(i={},e.set(r,i)),i[n.alt]=!0}return e}function eA(t){for(const e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function tA(t){for(const e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var hl;(function(t){function e(n){return typeof n=="string"}t.is=e})(hl||(hl={}));var sa;(function(t){function e(n){return typeof n=="string"}t.is=e})(sa||(sa={}));var pl;(function(t){t.MIN_VALUE=-2147483648,t.MAX_VALUE=2147483647;function e(n){return typeof n=="number"&&t.MIN_VALUE<=n&&n<=t.MAX_VALUE}t.is=e})(pl||(pl={}));var es;(function(t){t.MIN_VALUE=0,t.MAX_VALUE=2147483647;function e(n){return typeof n=="number"&&t.MIN_VALUE<=n&&n<=t.MAX_VALUE}t.is=e})(es||(es={}));var re;(function(t){function e(r,i){return r===Number.MAX_VALUE&&(r=es.MAX_VALUE),i===Number.MAX_VALUE&&(i=es.MAX_VALUE),{line:r,character:i}}t.create=e;function n(r){let i=r;return b.objectLiteral(i)&&b.uinteger(i.line)&&b.uinteger(i.character)}t.is=n})(re||(re={}));var Z;(function(t){function e(r,i,s,o){if(b.uinteger(r)&&b.uinteger(i)&&b.uinteger(s)&&b.uinteger(o))return{start:re.create(r,i),end:re.create(s,o)};if(re.is(r)&&re.is(i))return{start:r,end:i};throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${o}]`)}t.create=e;function n(r){let i=r;return b.objectLiteral(i)&&re.is(i.start)&&re.is(i.end)}t.is=n})(Z||(Z={}));var ts;(function(t){function e(r,i){return{uri:r,range:i}}t.create=e;function n(r){let i=r;return b.objectLiteral(i)&&Z.is(i.range)&&(b.string(i.uri)||b.undefined(i.uri))}t.is=n})(ts||(ts={}));var ml;(function(t){function e(r,i,s,o){return{targetUri:r,targetRange:i,targetSelectionRange:s,originSelectionRange:o}}t.create=e;function n(r){let i=r;return b.objectLiteral(i)&&Z.is(i.targetRange)&&b.string(i.targetUri)&&Z.is(i.targetSelectionRange)&&(Z.is(i.originSelectionRange)||b.undefined(i.originSelectionRange))}t.is=n})(ml||(ml={}));var oa;(function(t){function e(r,i,s,o){return{red:r,green:i,blue:s,alpha:o}}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&b.numberRange(i.red,0,1)&&b.numberRange(i.green,0,1)&&b.numberRange(i.blue,0,1)&&b.numberRange(i.alpha,0,1)}t.is=n})(oa||(oa={}));var gl;(function(t){function e(r,i){return{range:r,color:i}}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&Z.is(i.range)&&oa.is(i.color)}t.is=n})(gl||(gl={}));var yl;(function(t){function e(r,i,s){return{label:r,textEdit:i,additionalTextEdits:s}}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&b.string(i.label)&&(b.undefined(i.textEdit)||jt.is(i))&&(b.undefined(i.additionalTextEdits)||b.typedArray(i.additionalTextEdits,jt.is))}t.is=n})(yl||(yl={}));var vl;(function(t){t.Comment="comment",t.Imports="imports",t.Region="region"})(vl||(vl={}));var Tl;(function(t){function e(r,i,s,o,a,c){const u={startLine:r,endLine:i};return b.defined(s)&&(u.startCharacter=s),b.defined(o)&&(u.endCharacter=o),b.defined(a)&&(u.kind=a),b.defined(c)&&(u.collapsedText=c),u}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&b.uinteger(i.startLine)&&b.uinteger(i.startLine)&&(b.undefined(i.startCharacter)||b.uinteger(i.startCharacter))&&(b.undefined(i.endCharacter)||b.uinteger(i.endCharacter))&&(b.undefined(i.kind)||b.string(i.kind))}t.is=n})(Tl||(Tl={}));var aa;(function(t){function e(r,i){return{location:r,message:i}}t.create=e;function n(r){let i=r;return b.defined(i)&&ts.is(i.location)&&b.string(i.message)}t.is=n})(aa||(aa={}));var Rl;(function(t){t.Error=1,t.Warning=2,t.Information=3,t.Hint=4})(Rl||(Rl={}));var Sl;(function(t){t.Unnecessary=1,t.Deprecated=2})(Sl||(Sl={}));var bl;(function(t){function e(n){const r=n;return b.objectLiteral(r)&&b.string(r.href)}t.is=e})(bl||(bl={}));var ns;(function(t){function e(r,i,s,o,a,c){let u={range:r,message:i};return b.defined(s)&&(u.severity=s),b.defined(o)&&(u.code=o),b.defined(a)&&(u.source=a),b.defined(c)&&(u.relatedInformation=c),u}t.create=e;function n(r){var i;let s=r;return b.defined(s)&&Z.is(s.range)&&b.string(s.message)&&(b.number(s.severity)||b.undefined(s.severity))&&(b.integer(s.code)||b.string(s.code)||b.undefined(s.code))&&(b.undefined(s.codeDescription)||b.string((i=s.codeDescription)===null||i===void 0?void 0:i.href))&&(b.string(s.source)||b.undefined(s.source))&&(b.undefined(s.relatedInformation)||b.typedArray(s.relatedInformation,aa.is))}t.is=n})(ns||(ns={}));var cr;(function(t){function e(r,i,...s){let o={title:r,command:i};return b.defined(s)&&s.length>0&&(o.arguments=s),o}t.create=e;function n(r){let i=r;return b.defined(i)&&b.string(i.title)&&b.string(i.command)}t.is=n})(cr||(cr={}));var jt;(function(t){function e(s,o){return{range:s,newText:o}}t.replace=e;function n(s,o){return{range:{start:s,end:s},newText:o}}t.insert=n;function r(s){return{range:s,newText:""}}t.del=r;function i(s){const o=s;return b.objectLiteral(o)&&b.string(o.newText)&&Z.is(o.range)}t.is=i})(jt||(jt={}));var ur;(function(t){function e(r,i,s){const o={label:r};return i!==void 0&&(o.needsConfirmation=i),s!==void 0&&(o.description=s),o}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&b.string(i.label)&&(b.boolean(i.needsConfirmation)||i.needsConfirmation===void 0)&&(b.string(i.description)||i.description===void 0)}t.is=n})(ur||(ur={}));var Xe;(function(t){function e(n){const r=n;return b.string(r)}t.is=e})(Xe||(Xe={}));var gn;(function(t){function e(s,o,a){return{range:s,newText:o,annotationId:a}}t.replace=e;function n(s,o,a){return{range:{start:s,end:s},newText:o,annotationId:a}}t.insert=n;function r(s,o){return{range:s,newText:"",annotationId:o}}t.del=r;function i(s){const o=s;return jt.is(o)&&(ur.is(o.annotationId)||Xe.is(o.annotationId))}t.is=i})(gn||(gn={}));var rs;(function(t){function e(r,i){return{textDocument:r,edits:i}}t.create=e;function n(r){let i=r;return b.defined(i)&&is.is(i.textDocument)&&Array.isArray(i.edits)}t.is=n})(rs||(rs={}));var $r;(function(t){function e(r,i,s){let o={kind:"create",uri:r};return i!==void 0&&(i.overwrite!==void 0||i.ignoreIfExists!==void 0)&&(o.options=i),s!==void 0&&(o.annotationId=s),o}t.create=e;function n(r){let i=r;return i&&i.kind==="create"&&b.string(i.uri)&&(i.options===void 0||(i.options.overwrite===void 0||b.boolean(i.options.overwrite))&&(i.options.ignoreIfExists===void 0||b.boolean(i.options.ignoreIfExists)))&&(i.annotationId===void 0||Xe.is(i.annotationId))}t.is=n})($r||($r={}));var Ir;(function(t){function e(r,i,s,o){let a={kind:"rename",oldUri:r,newUri:i};return s!==void 0&&(s.overwrite!==void 0||s.ignoreIfExists!==void 0)&&(a.options=s),o!==void 0&&(a.annotationId=o),a}t.create=e;function n(r){let i=r;return i&&i.kind==="rename"&&b.string(i.oldUri)&&b.string(i.newUri)&&(i.options===void 0||(i.options.overwrite===void 0||b.boolean(i.options.overwrite))&&(i.options.ignoreIfExists===void 0||b.boolean(i.options.ignoreIfExists)))&&(i.annotationId===void 0||Xe.is(i.annotationId))}t.is=n})(Ir||(Ir={}));var Dr;(function(t){function e(r,i,s){let o={kind:"delete",uri:r};return i!==void 0&&(i.recursive!==void 0||i.ignoreIfNotExists!==void 0)&&(o.options=i),s!==void 0&&(o.annotationId=s),o}t.create=e;function n(r){let i=r;return i&&i.kind==="delete"&&b.string(i.uri)&&(i.options===void 0||(i.options.recursive===void 0||b.boolean(i.options.recursive))&&(i.options.ignoreIfNotExists===void 0||b.boolean(i.options.ignoreIfNotExists)))&&(i.annotationId===void 0||Xe.is(i.annotationId))}t.is=n})(Dr||(Dr={}));var ca;(function(t){function e(n){let r=n;return r&&(r.changes!==void 0||r.documentChanges!==void 0)&&(r.documentChanges===void 0||r.documentChanges.every(i=>b.string(i.kind)?$r.is(i)||Ir.is(i)||Dr.is(i):rs.is(i)))}t.is=e})(ca||(ca={}));class ua{constructor(e,n){this.edits=e,this.changeAnnotations=n}insert(e,n,r){let i,s;if(r===void 0?i=jt.insert(e,n):Xe.is(r)?(s=r,i=gn.insert(e,n,r)):(this.assertChangeAnnotations(this.changeAnnotations),s=this.changeAnnotations.manage(r),i=gn.insert(e,n,s)),this.edits.push(i),s!==void 0)return s}replace(e,n,r){let i,s;if(r===void 0?i=jt.replace(e,n):Xe.is(r)?(s=r,i=gn.replace(e,n,r)):(this.assertChangeAnnotations(this.changeAnnotations),s=this.changeAnnotations.manage(r),i=gn.replace(e,n,s)),this.edits.push(i),s!==void 0)return s}delete(e,n){let r,i;if(n===void 0?r=jt.del(e):Xe.is(n)?(i=n,r=gn.del(e,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=gn.del(e,i)),this.edits.push(r),i!==void 0)return i}add(e){this.edits.push(e)}all(){return this.edits}clear(){this.edits.splice(0,this.edits.length)}assertChangeAnnotations(e){if(e===void 0)throw new Error("Text edit change is not configured to manage change annotations.")}}class hm{constructor(e){this._annotations=e===void 0?Object.create(null):e,this._counter=0,this._size=0}all(){return this._annotations}get size(){return this._size}manage(e,n){let r;if(Xe.is(e)?r=e:(r=this.nextId(),n=e),this._annotations[r]!==void 0)throw new Error(`Id ${r} is already in use.`);if(n===void 0)throw new Error(`No annotation provided for id ${r}`);return this._annotations[r]=n,this._size++,r}nextId(){return this._counter++,this._counter.toString()}}class nA{constructor(e){this._textEditChanges=Object.create(null),e!==void 0?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new hm(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach(n=>{if(rs.is(n)){const r=new ua(n.edits,this._changeAnnotations);this._textEditChanges[n.textDocument.uri]=r}})):e.changes&&Object.keys(e.changes).forEach(n=>{const r=new ua(e.changes[n]);this._textEditChanges[n]=r})):this._workspaceEdit={}}get edit(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit}getTextEditChange(e){if(is.is(e)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");const n={uri:e.uri,version:e.version};let r=this._textEditChanges[n.uri];if(!r){const i=[],s={textDocument:n,edits:i};this._workspaceEdit.documentChanges.push(s),r=new ua(i,this._changeAnnotations),this._textEditChanges[n.uri]=r}return r}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");let n=this._textEditChanges[e];if(!n){let r=[];this._workspaceEdit.changes[e]=r,n=new ua(r),this._textEditChanges[e]=n}return n}}initDocumentChanges(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new hm,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())}initChanges(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))}createFile(e,n,r){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let i;ur.is(n)||Xe.is(n)?i=n:r=n;let s,o;if(i===void 0?s=$r.create(e,r):(o=Xe.is(i)?i:this._changeAnnotations.manage(i),s=$r.create(e,r,o)),this._workspaceEdit.documentChanges.push(s),o!==void 0)return o}renameFile(e,n,r,i){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let s;ur.is(r)||Xe.is(r)?s=r:i=r;let o,a;if(s===void 0?o=Ir.create(e,n,i):(a=Xe.is(s)?s:this._changeAnnotations.manage(s),o=Ir.create(e,n,i,a)),this._workspaceEdit.documentChanges.push(o),a!==void 0)return a}deleteFile(e,n,r){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let i;ur.is(n)||Xe.is(n)?i=n:r=n;let s,o;if(i===void 0?s=Dr.create(e,r):(o=Xe.is(i)?i:this._changeAnnotations.manage(i),s=Dr.create(e,r,o)),this._workspaceEdit.documentChanges.push(s),o!==void 0)return o}}var _l;(function(t){function e(r){return{uri:r}}t.create=e;function n(r){let i=r;return b.defined(i)&&b.string(i.uri)}t.is=n})(_l||(_l={}));var El;(function(t){function e(r,i){return{uri:r,version:i}}t.create=e;function n(r){let i=r;return b.defined(i)&&b.string(i.uri)&&b.integer(i.version)}t.is=n})(El||(El={}));var is;(function(t){function e(r,i){return{uri:r,version:i}}t.create=e;function n(r){let i=r;return b.defined(i)&&b.string(i.uri)&&(i.version===null||b.integer(i.version))}t.is=n})(is||(is={}));var wl;(function(t){function e(r,i,s,o){return{uri:r,languageId:i,version:s,text:o}}t.create=e;function n(r){let i=r;return b.defined(i)&&b.string(i.uri)&&b.string(i.languageId)&&b.integer(i.version)&&b.string(i.text)}t.is=n})(wl||(wl={}));var la;(function(t){t.PlainText="plaintext",t.Markdown="markdown";function e(n){const r=n;return r===t.PlainText||r===t.Markdown}t.is=e})(la||(la={}));var Or;(function(t){function e(n){const r=n;return b.objectLiteral(n)&&la.is(r.kind)&&b.string(r.value)}t.is=e})(Or||(Or={}));var kl;(function(t){t.Text=1,t.Method=2,t.Function=3,t.Constructor=4,t.Field=5,t.Variable=6,t.Class=7,t.Interface=8,t.Module=9,t.Property=10,t.Unit=11,t.Value=12,t.Enum=13,t.Keyword=14,t.Snippet=15,t.Color=16,t.File=17,t.Reference=18,t.Folder=19,t.EnumMember=20,t.Constant=21,t.Struct=22,t.Event=23,t.Operator=24,t.TypeParameter=25})(kl||(kl={}));var Cl;(function(t){t.PlainText=1,t.Snippet=2})(Cl||(Cl={}));var Al;(function(t){t.Deprecated=1})(Al||(Al={}));var Nl;(function(t){function e(r,i,s){return{newText:r,insert:i,replace:s}}t.create=e;function n(r){const i=r;return i&&b.string(i.newText)&&Z.is(i.insert)&&Z.is(i.replace)}t.is=n})(Nl||(Nl={}));var Pl;(function(t){t.asIs=1,t.adjustIndentation=2})(Pl||(Pl={}));var $l;(function(t){function e(n){const r=n;return r&&(b.string(r.detail)||r.detail===void 0)&&(b.string(r.description)||r.description===void 0)}t.is=e})($l||($l={}));var Il;(function(t){function e(n){return{label:n}}t.create=e})(Il||(Il={}));var Dl;(function(t){function e(n,r){return{items:n||[],isIncomplete:!!r}}t.create=e})(Dl||(Dl={}));var ss;(function(t){function e(r){return r.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}t.fromPlainText=e;function n(r){const i=r;return b.string(i)||b.objectLiteral(i)&&b.string(i.language)&&b.string(i.value)}t.is=n})(ss||(ss={}));var Ol;(function(t){function e(n){let r=n;return!!r&&b.objectLiteral(r)&&(Or.is(r.contents)||ss.is(r.contents)||b.typedArray(r.contents,ss.is))&&(n.range===void 0||Z.is(n.range))}t.is=e})(Ol||(Ol={}));var xl;(function(t){function e(n,r){return r?{label:n,documentation:r}:{label:n}}t.create=e})(xl||(xl={}));var Ll;(function(t){function e(n,r,...i){let s={label:n};return b.defined(r)&&(s.documentation=r),b.defined(i)?s.parameters=i:s.parameters=[],s}t.create=e})(Ll||(Ll={}));var Ml;(function(t){t.Text=1,t.Read=2,t.Write=3})(Ml||(Ml={}));var Fl;(function(t){function e(n,r){let i={range:n};return b.number(r)&&(i.kind=r),i}t.create=e})(Fl||(Fl={}));var jl;(function(t){t.File=1,t.Module=2,t.Namespace=3,t.Package=4,t.Class=5,t.Method=6,t.Property=7,t.Field=8,t.Constructor=9,t.Enum=10,t.Interface=11,t.Function=12,t.Variable=13,t.Constant=14,t.String=15,t.Number=16,t.Boolean=17,t.Array=18,t.Object=19,t.Key=20,t.Null=21,t.EnumMember=22,t.Struct=23,t.Event=24,t.Operator=25,t.TypeParameter=26})(jl||(jl={}));var ql;(function(t){t.Deprecated=1})(ql||(ql={}));var Hl;(function(t){function e(n,r,i,s,o){let a={name:n,kind:r,location:{uri:s,range:i}};return o&&(a.containerName=o),a}t.create=e})(Hl||(Hl={}));var Ul;(function(t){function e(n,r,i,s){return s!==void 0?{name:n,kind:r,location:{uri:i,range:s}}:{name:n,kind:r,location:{uri:i}}}t.create=e})(Ul||(Ul={}));var Gl;(function(t){function e(r,i,s,o,a,c){let u={name:r,detail:i,kind:s,range:o,selectionRange:a};return c!==void 0&&(u.children=c),u}t.create=e;function n(r){let i=r;return i&&b.string(i.name)&&b.number(i.kind)&&Z.is(i.range)&&Z.is(i.selectionRange)&&(i.detail===void 0||b.string(i.detail))&&(i.deprecated===void 0||b.boolean(i.deprecated))&&(i.children===void 0||Array.isArray(i.children))&&(i.tags===void 0||Array.isArray(i.tags))}t.is=n})(Gl||(Gl={}));var Wl;(function(t){t.Empty="",t.QuickFix="quickfix",t.Refactor="refactor",t.RefactorExtract="refactor.extract",t.RefactorInline="refactor.inline",t.RefactorRewrite="refactor.rewrite",t.Source="source",t.SourceOrganizeImports="source.organizeImports",t.SourceFixAll="source.fixAll"})(Wl||(Wl={}));var os;(function(t){t.Invoked=1,t.Automatic=2})(os||(os={}));var Bl;(function(t){function e(r,i,s){let o={diagnostics:r};return i!=null&&(o.only=i),s!=null&&(o.triggerKind=s),o}t.create=e;function n(r){let i=r;return b.defined(i)&&b.typedArray(i.diagnostics,ns.is)&&(i.only===void 0||b.typedArray(i.only,b.string))&&(i.triggerKind===void 0||i.triggerKind===os.Invoked||i.triggerKind===os.Automatic)}t.is=n})(Bl||(Bl={}));var Kl;(function(t){function e(r,i,s){let o={title:r},a=!0;return typeof i=="string"?(a=!1,o.kind=i):cr.is(i)?o.command=i:o.edit=i,a&&s!==void 0&&(o.kind=s),o}t.create=e;function n(r){let i=r;return i&&b.string(i.title)&&(i.diagnostics===void 0||b.typedArray(i.diagnostics,ns.is))&&(i.kind===void 0||b.string(i.kind))&&(i.edit!==void 0||i.command!==void 0)&&(i.command===void 0||cr.is(i.command))&&(i.isPreferred===void 0||b.boolean(i.isPreferred))&&(i.edit===void 0||ca.is(i.edit))}t.is=n})(Kl||(Kl={}));var zl;(function(t){function e(r,i){let s={range:r};return b.defined(i)&&(s.data=i),s}t.create=e;function n(r){let i=r;return b.defined(i)&&Z.is(i.range)&&(b.undefined(i.command)||cr.is(i.command))}t.is=n})(zl||(zl={}));var Vl;(function(t){function e(r,i){return{tabSize:r,insertSpaces:i}}t.create=e;function n(r){let i=r;return b.defined(i)&&b.uinteger(i.tabSize)&&b.boolean(i.insertSpaces)}t.is=n})(Vl||(Vl={}));var Xl;(function(t){function e(r,i,s){return{range:r,target:i,data:s}}t.create=e;function n(r){let i=r;return b.defined(i)&&Z.is(i.range)&&(b.undefined(i.target)||b.string(i.target))}t.is=n})(Xl||(Xl={}));var Yl;(function(t){function e(r,i){return{range:r,parent:i}}t.create=e;function n(r){let i=r;return b.objectLiteral(i)&&Z.is(i.range)&&(i.parent===void 0||t.is(i.parent))}t.is=n})(Yl||(Yl={}));var Jl;(function(t){t.namespace="namespace",t.type="type",t.class="class",t.enum="enum",t.interface="interface",t.struct="struct",t.typeParameter="typeParameter",t.parameter="parameter",t.variable="variable",t.property="property",t.enumMember="enumMember",t.event="event",t.function="function",t.method="method",t.macro="macro",t.keyword="keyword",t.modifier="modifier",t.comment="comment",t.string="string",t.number="number",t.regexp="regexp",t.operator="operator",t.decorator="decorator"})(Jl||(Jl={}));var Ql;(function(t){t.declaration="declaration",t.definition="definition",t.readonly="readonly",t.static="static",t.deprecated="deprecated",t.abstract="abstract",t.async="async",t.modification="modification",t.documentation="documentation",t.defaultLibrary="defaultLibrary"})(Ql||(Ql={}));var Zl;(function(t){function e(n){const r=n;return b.objectLiteral(r)&&(r.resultId===void 0||typeof r.resultId=="string")&&Array.isArray(r.data)&&(r.data.length===0||typeof r.data[0]=="number")}t.is=e})(Zl||(Zl={}));var ed;(function(t){function e(r,i){return{range:r,text:i}}t.create=e;function n(r){const i=r;return i!=null&&Z.is(i.range)&&b.string(i.text)}t.is=n})(ed||(ed={}));var td;(function(t){function e(r,i,s){return{range:r,variableName:i,caseSensitiveLookup:s}}t.create=e;function n(r){const i=r;return i!=null&&Z.is(i.range)&&b.boolean(i.caseSensitiveLookup)&&(b.string(i.variableName)||i.variableName===void 0)}t.is=n})(td||(td={}));var nd;(function(t){function e(r,i){return{range:r,expression:i}}t.create=e;function n(r){const i=r;return i!=null&&Z.is(i.range)&&(b.string(i.expression)||i.expression===void 0)}t.is=n})(nd||(nd={}));var rd;(function(t){function e(r,i){return{frameId:r,stoppedLocation:i}}t.create=e;function n(r){const i=r;return b.defined(i)&&Z.is(r.stoppedLocation)}t.is=n})(rd||(rd={}));var da;(function(t){t.Type=1,t.Parameter=2;function e(n){return n===1||n===2}t.is=e})(da||(da={}));var fa;(function(t){function e(r){return{value:r}}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&(i.tooltip===void 0||b.string(i.tooltip)||Or.is(i.tooltip))&&(i.location===void 0||ts.is(i.location))&&(i.command===void 0||cr.is(i.command))}t.is=n})(fa||(fa={}));var id;(function(t){function e(r,i,s){const o={position:r,label:i};return s!==void 0&&(o.kind=s),o}t.create=e;function n(r){const i=r;return b.objectLiteral(i)&&re.is(i.position)&&(b.string(i.label)||b.typedArray(i.label,fa.is))&&(i.kind===void 0||da.is(i.kind))&&i.textEdits===void 0||b.typedArray(i.textEdits,jt.is)&&(i.tooltip===void 0||b.string(i.tooltip)||Or.is(i.tooltip))&&(i.paddingLeft===void 0||b.boolean(i.paddingLeft))&&(i.paddingRight===void 0||b.boolean(i.paddingRight))}t.is=n})(id||(id={}));var sd;(function(t){function e(n){return{kind:"snippet",value:n}}t.createSnippet=e})(sd||(sd={}));var od;(function(t){function e(n,r,i,s){return{insertText:n,filterText:r,range:i,command:s}}t.create=e})(od||(od={}));var ad;(function(t){function e(n){return{items:n}}t.create=e})(ad||(ad={}));var cd;(function(t){t.Invoked=0,t.Automatic=1})(cd||(cd={}));var ud;(function(t){function e(n,r){return{range:n,text:r}}t.create=e})(ud||(ud={}));var ld;(function(t){function e(n,r){return{triggerKind:n,selectedCompletionInfo:r}}t.create=e})(ld||(ld={}));var dd;(function(t){function e(n){const r=n;return b.objectLiteral(r)&&sa.is(r.uri)&&b.string(r.name)}t.is=e})(dd||(dd={}));const rA=[`
`,`\r
`,"\r"];var fd;(function(t){function e(s,o,a,c){return new iA(s,o,a,c)}t.create=e;function n(s){let o=s;return!!(b.defined(o)&&b.string(o.uri)&&(b.undefined(o.languageId)||b.string(o.languageId))&&b.uinteger(o.lineCount)&&b.func(o.getText)&&b.func(o.positionAt)&&b.func(o.offsetAt))}t.is=n;function r(s,o){let a=s.getText(),c=i(o,(l,d)=>{let f=l.range.start.line-d.range.start.line;return f===0?l.range.start.character-d.range.start.character:f}),u=a.length;for(let l=c.length-1;l>=0;l--){let d=c[l],f=s.offsetAt(d.range.start),h=s.offsetAt(d.range.end);if(h<=u)a=a.substring(0,f)+d.newText+a.substring(h,a.length);else throw new Error("Overlapping edit");u=f}return a}t.applyEdits=r;function i(s,o){if(s.length<=1)return s;const a=s.length/2|0,c=s.slice(0,a),u=s.slice(a);i(c,o),i(u,o);let l=0,d=0,f=0;for(;l<c.length&&d<u.length;)o(c[l],u[d])<=0?s[f++]=c[l++]:s[f++]=u[d++];for(;l<c.length;)s[f++]=c[l++];for(;d<u.length;)s[f++]=u[d++];return s}})(fd||(fd={}));let iA=class{constructor(e,n,r,i){this._uri=e,this._languageId=n,this._version=r,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let n=this.offsetAt(e.start),r=this.offsetAt(e.end);return this._content.substring(n,r)}return this._content}update(e,n){this._content=e.text,this._version=n,this._lineOffsets=void 0}getLineOffsets(){if(this._lineOffsets===void 0){let e=[],n=this._content,r=!0;for(let i=0;i<n.length;i++){r&&(e.push(i),r=!1);let s=n.charAt(i);r=s==="\r"||s===`
`,s==="\r"&&i+1<n.length&&n.charAt(i+1)===`
`&&i++}r&&n.length>0&&e.push(n.length),this._lineOffsets=e}return this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let n=this.getLineOffsets(),r=0,i=n.length;if(i===0)return re.create(0,e);for(;r<i;){let o=Math.floor((r+i)/2);n[o]>e?i=o:r=o+1}let s=r-1;return re.create(s,e-n[s])}offsetAt(e){let n=this.getLineOffsets();if(e.line>=n.length)return this._content.length;if(e.line<0)return 0;let r=n[e.line],i=e.line+1<n.length?n[e.line+1]:this._content.length;return Math.max(Math.min(r+e.character,i),r)}get lineCount(){return this.getLineOffsets().length}};var b;(function(t){const e=Object.prototype.toString;function n(h){return typeof h<"u"}t.defined=n;function r(h){return typeof h>"u"}t.undefined=r;function i(h){return h===!0||h===!1}t.boolean=i;function s(h){return e.call(h)==="[object String]"}t.string=s;function o(h){return e.call(h)==="[object Number]"}t.number=o;function a(h,v,S){return e.call(h)==="[object Number]"&&v<=h&&h<=S}t.numberRange=a;function c(h){return e.call(h)==="[object Number]"&&-2147483648<=h&&h<=2147483647}t.integer=c;function u(h){return e.call(h)==="[object Number]"&&0<=h&&h<=2147483647}t.uinteger=u;function l(h){return e.call(h)==="[object Function]"}t.func=l;function d(h){return h!==null&&typeof h=="object"}t.objectLiteral=d;function f(h,v){return Array.isArray(h)&&h.every(v)}t.typedArray=f})(b||(b={}));var sA=Object.freeze({__proto__:null,get AnnotatedTextEdit(){return gn},get ChangeAnnotation(){return ur},get ChangeAnnotationIdentifier(){return Xe},get CodeAction(){return Kl},get CodeActionContext(){return Bl},get CodeActionKind(){return Wl},get CodeActionTriggerKind(){return os},get CodeDescription(){return bl},get CodeLens(){return zl},get Color(){return oa},get ColorInformation(){return gl},get ColorPresentation(){return yl},get Command(){return cr},get CompletionItem(){return Il},get CompletionItemKind(){return kl},get CompletionItemLabelDetails(){return $l},get CompletionItemTag(){return Al},get CompletionList(){return Dl},get CreateFile(){return $r},get DeleteFile(){return Dr},get Diagnostic(){return ns},get DiagnosticRelatedInformation(){return aa},get DiagnosticSeverity(){return Rl},get DiagnosticTag(){return Sl},get DocumentHighlight(){return Fl},get DocumentHighlightKind(){return Ml},get DocumentLink(){return Xl},get DocumentSymbol(){return Gl},get DocumentUri(){return hl},EOL:rA,get FoldingRange(){return Tl},get FoldingRangeKind(){return vl},get FormattingOptions(){return Vl},get Hover(){return Ol},get InlayHint(){return id},get InlayHintKind(){return da},get InlayHintLabelPart(){return fa},get InlineCompletionContext(){return ld},get InlineCompletionItem(){return od},get InlineCompletionList(){return ad},get InlineCompletionTriggerKind(){return cd},get InlineValueContext(){return rd},get InlineValueEvaluatableExpression(){return nd},get InlineValueText(){return ed},get InlineValueVariableLookup(){return td},get InsertReplaceEdit(){return Nl},get InsertTextFormat(){return Cl},get InsertTextMode(){return Pl},get Location(){return ts},get LocationLink(){return ml},get MarkedString(){return ss},get MarkupContent(){return Or},get MarkupKind(){return la},get OptionalVersionedTextDocumentIdentifier(){return is},get ParameterInformation(){return xl},get Position(){return re},get Range(){return Z},get RenameFile(){return Ir},get SelectedCompletionInfo(){return ud},get SelectionRange(){return Yl},get SemanticTokenModifiers(){return Ql},get SemanticTokenTypes(){return Jl},get SemanticTokens(){return Zl},get SignatureInformation(){return Ll},get StringValue(){return sd},get SymbolInformation(){return Hl},get SymbolKind(){return jl},get SymbolTag(){return ql},get TextDocument(){return fd},get TextDocumentEdit(){return rs},get TextDocumentIdentifier(){return _l},get TextDocumentItem(){return wl},get TextEdit(){return jt},get URI(){return sa},get VersionedTextDocumentIdentifier(){return El},WorkspaceChange:nA,get WorkspaceEdit(){return ca},get WorkspaceFolder(){return dd},get WorkspaceSymbol(){return Ul},get integer(){return pl},get uinteger(){return es}});class oA{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new mm(e),this.rootNode.root=this.rootNode,this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){const n=new pd;return n.grammarSource=e,n.root=this.rootNode,this.current.content.push(n),this.nodeStack.push(n),n}buildLeafNode(e,n){const r=new hd(e.startOffset,e.image.length,eu(e),e.tokenType,!1);return r.grammarSource=n,r.root=this.rootNode,this.current.content.push(r),r}removeNode(e){const n=e.container;if(n){const r=n.content.indexOf(e);r>=0&&n.content.splice(r,1)}}construct(e){const n=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=n;const r=this.nodeStack.pop();r?.content.length===0&&this.removeNode(r)}addHiddenTokens(e){for(const n of e){const r=new hd(n.startOffset,n.image.length,eu(n),n.tokenType,!0);r.root=this.rootNode,this.addHiddenToken(this.rootNode,r)}}addHiddenToken(e,n){const{offset:r,end:i}=n;for(let s=0;s<e.content.length;s++){const o=e.content[s],{offset:a,end:c}=o;if(on(o)&&r>a&&i<c){this.addHiddenToken(o,n);return}else if(i<=a){e.content.splice(s,0,n);return}}e.content.push(n)}}class pm{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,n;const r=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(n=this.container)===null||n===void 0?void 0:n.astNode;if(!r)throw new Error("This node has no associated AST element");return r}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}}class hd extends pm{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,n,r,i,s=!1){super(),this._hidden=s,this._offset=e,this._tokenType=i,this._length=n,this._range=r}}class pd extends pm{constructor(){super(...arguments),this.content=new md(this)}get children(){return this.content}get offset(){var e,n;return(n=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&n!==void 0?n:0}get length(){return this.end-this.offset}get end(){var e,n;return(n=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&n!==void 0?n:0}get range(){const e=this.firstNonHiddenNode,n=this.lastNonHiddenNode;if(e&&n){if(this._rangeCache===void 0){const{range:r}=e,{range:i}=n;this._rangeCache={start:r.start,end:i.end.line<r.start.line?r.start:i.end}}return this._rangeCache}else return{start:re.create(0,0),end:re.create(0,0)}}get firstNonHiddenNode(){for(const e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){const n=this.content[e];if(!n.hidden)return n}return this.content[this.content.length-1]}}class md extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,md.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,n,...r){return this.addParents(r),super.splice(e,n,...r)}addParents(e){for(const n of e)n.container=this.parent}}class mm extends pd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}}const gd=Symbol("Datatype");function yd(t){return t.$type===gd}const gm="​",ym=t=>t.endsWith(gm)?t:t+gm;class vm{constructor(e){this._unorderedGroups=new Map,this.allRules=new Map,this.lexer=e.parser.Lexer;const n=this.lexer.definition;this.wrapper=new dA(n,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,n){this.wrapper.wrapOr(e,n)}optional(e,n){this.wrapper.wrapOption(e,n)}many(e,n){this.wrapper.wrapMany(e,n)}atLeastOne(e,n){this.wrapper.wrapAtLeastOne(e,n)}getRule(e){return this.allRules.get(e)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}}class aA extends vm{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new oA,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,n){const r=this.computeRuleType(e),i=this.wrapper.DEFINE_RULE(ym(e.name),this.startImplementation(r,n).bind(this));return this.allRules.set(e.name,i),e.entry&&(this.mainRule=i),i}computeRuleType(e){if(!e.fragment){if(jf(e))return gd;{const n=Di(e);return n??e.name}}}parse(e,n={}){this.nodeBuilder.buildRootNode(e);const r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;const i=n.rule?this.allRules.get(n.rule):this.mainRule;if(!i)throw new Error(n.rule?`No rule found with name '${n.rule}'`:"No main rule available.");const s=i.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:s,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,n){return r=>{if(!this.isRecording()){const s={$type:e};this.stack.push(s),e===gd&&(s.value="")}let i;try{i=n(r)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,n,r){const i=this.wrapper.wrapConsume(e,n);if(!this.isRecording()&&this.isValidToken(i)){const s=this.nodeBuilder.buildLeafNode(i,r),{assignment:o,isCrossRef:a}=this.getAssignment(r),c=this.current;if(o){const u=Kt(r)?i.image:this.converter.convert(i.image,s);this.assign(o.operator,o.feature,u,s,a)}else if(yd(c)){let u=i.image;Kt(r)||(u=this.converter.convert(u,s).toString()),c.value+=u}}}isValidToken(e){return!e.isInsertedInRecovery&&!isNaN(e.startOffset)&&typeof e.endOffset=="number"&&!isNaN(e.endOffset)}subrule(e,n,r,i){let s;this.isRecording()||(s=this.nodeBuilder.buildCompositeNode(r));const o=this.wrapper.wrapSubrule(e,n,i);!this.isRecording()&&s&&s.length>0&&this.performSubruleAssignment(o,r,s)}performSubruleAssignment(e,n,r){const{assignment:i,isCrossRef:s}=this.getAssignment(n);if(i)this.assign(i.operator,i.feature,e,r,s);else if(!i){const o=this.current;if(yd(o))o.value+=e.toString();else if(typeof e=="object"&&e){const a=e.$type,c=this.assignWithoutOverride(e,o);a&&(c.$type=a);const u=c;this.stack.pop(),this.stack.push(u)}}}action(e,n){if(!this.isRecording()){let r=this.current;if(n.feature&&n.operator){r=this.construct(),this.nodeBuilder.buildCompositeNode(n).content.push(r.$cstNode);const s={$type:e};this.stack.push(s),this.assign(n.operator,n.feature,r,r.$cstNode,!1)}else r.$type=e}}construct(){if(this.isRecording())return;const e=this.current;return oT(e),this.nodeBuilder.construct(e),this.stack.pop(),yd(e)?this.converter.convert(e.value,e.$cstNode):(wf(this.astReflection,e),e)}getAssignment(e){if(!this.assignmentMap.has(e)){const n=rt(e,Bt);this.assignmentMap.set(e,{assignment:n,isCrossRef:n?vi(n.terminal):!1})}return this.assignmentMap.get(e)}assign(e,n,r,i,s){const o=this.current;let a;switch(s&&typeof r=="string"?a=this.linker.buildReference(o,n,i,r):a=r,e){case"=":{o[n]=a;break}case"?=":{o[n]=!0;break}case"+=":Array.isArray(o[n])||(o[n]=[]),o[n].push(a)}}assignWithoutOverride(e,n){for(const[i,s]of Object.entries(n)){const o=e[i];o===void 0?e[i]=s:Array.isArray(o)&&Array.isArray(s)&&(s.push(...o),e[i]=s)}const r=e.$cstNode;return r&&(r.astNode=void 0,e.$cstNode=void 0),e}get definitionErrors(){return this.wrapper.definitionErrors}}class cA{buildMismatchTokenMessage(e){return Ar.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return Ar.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return Ar.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Ar.buildEarlyExitMessage(e)}}class Tm extends cA{buildMismatchTokenMessage({expected:e,actual:n}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${n.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}}class uA extends vm{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();const n=this.lexer.tokenize(e);return this.tokens=n.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,n){const r=this.wrapper.DEFINE_RULE(ym(e.name),this.startImplementation(n).bind(this));return this.allRules.set(e.name,r),e.entry&&(this.mainRule=r),r}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return n=>{const r=this.keepStackSize();try{e(n)}finally{this.resetStackSize(r)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){const e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,n,r){this.wrapper.wrapConsume(e,n),this.isRecording()||(this.lastElementStack=[...this.elementStack,r],this.nextTokenIndex=this.currIdx+1)}subrule(e,n,r,i){this.before(r),this.wrapper.wrapSubrule(e,n,i),this.after(r)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){const n=this.elementStack.lastIndexOf(e);n>=0&&this.elementStack.splice(n)}}get currIdx(){return this.wrapper.currIdx}}const lA={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Tm};class dA extends mC{constructor(e,n){const r=n&&"maxLookahead"in n;super(e,Object.assign(Object.assign(Object.assign({},lA),{lookaheadStrategy:r?new il({maxLookahead:n.maxLookahead}):new LC}),n))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,n){return this.RULE(e,n)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,n){return this.consume(e,n)}wrapSubrule(e,n,r){return this.subrule(e,n,{ARGS:[r]})}wrapOr(e,n){this.or(e,n)}wrapOption(e,n){this.option(e,n)}wrapMany(e,n){this.many(e,n)}wrapAtLeastOne(e,n){this.atLeastOne(e,n)}}function Rm(t,e,n){return fA({parser:e,tokens:n,ruleNames:new Map},t),e}function fA(t,e){const n=$f(e,!1),r=Se(e.rules).filter(Qe).filter(i=>n.has(i));for(const i of r){const s=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});t.parser.rule(i,lr(s,i.definition))}}function lr(t,e,n=!1){let r;if(Kt(e))r=TA(t,e);else if(hi(e))r=hA(t,e);else if(Bt(e))r=lr(t,e.terminal);else if(vi(e))r=Sm(t,e);else if(cn(e))r=pA(t,e);else if(au(e))r=gA(t,e);else if(cu(e))r=yA(t,e);else if(Qn(e))r=vA(t,e);else if(Qv(e)){const i=t.consume++;r=()=>t.parser.consume(i,On,e)}else throw new gf(e.$cstNode,`Unexpected element type: ${e.$type}`);return bm(t,n?void 0:ha(e),r,e.cardinality)}function hA(t,e){const n=vo(e);return()=>t.parser.action(n,e)}function pA(t,e){const n=e.rule.ref;if(Qe(n)){const r=t.subrule++,i=e.arguments.length>0?mA(n,e.arguments):()=>({});return s=>t.parser.subrule(r,_m(t,n),e,i(s))}else if(Pn(n)){const r=t.consume++,i=vd(t,n.name);return()=>t.parser.consume(r,i,e)}else if(n)Zs();else throw new gf(e.$cstNode,`Undefined rule type: ${e.$type}`)}function mA(t,e){const n=e.map(r=>yn(r.value));return r=>{const i={};for(let s=0;s<n.length;s++){const o=t.parameters[s],a=n[s];i[o.name]=a(r)}return i}}function yn(t){if(Kv(t)){const e=yn(t.left),n=yn(t.right);return r=>e(r)||n(r)}else if(Bv(t)){const e=yn(t.left),n=yn(t.right);return r=>e(r)&&n(r)}else if(zv(t)){const e=yn(t.value);return n=>!e(n)}else if(Vv(t)){const e=t.parameter.ref.name;return n=>n!==void 0&&n[e]===!0}else if(Wv(t)){const e=!!t.true;return()=>e}Zs()}function gA(t,e){if(e.elements.length===1)return lr(t,e.elements[0]);{const n=[];for(const i of e.elements){const s={ALT:lr(t,i,!0)},o=ha(i);o&&(s.GATE=yn(o)),n.push(s)}const r=t.or++;return i=>t.parser.alternatives(r,n.map(s=>{const o={ALT:()=>s.ALT(i)},a=s.GATE;return a&&(o.GATE=()=>a(i)),o}))}}function yA(t,e){if(e.elements.length===1)return lr(t,e.elements[0]);const n=[];for(const a of e.elements){const c={ALT:lr(t,a,!0)},u=ha(a);u&&(c.GATE=yn(u)),n.push(c)}const r=t.or++,i=(a,c)=>{const u=c.getRuleStack().join("-");return`uGroup_${a}_${u}`},s=a=>t.parser.alternatives(r,n.map((c,u)=>{const l={ALT:()=>!0},d=t.parser;l.ALT=()=>{if(c.ALT(a),!d.isRecording()){const h=i(r,d);d.unorderedGroups.get(h)||d.unorderedGroups.set(h,[]);const v=d.unorderedGroups.get(h);typeof v?.[u]>"u"&&(v[u]=!0)}};const f=c.GATE;return f?l.GATE=()=>f(a):l.GATE=()=>{const h=d.unorderedGroups.get(i(r,d));return!h?.[u]},l})),o=bm(t,ha(e),s,"*");return a=>{o(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(r,t.parser))}}function vA(t,e){const n=e.elements.map(r=>lr(t,r));return r=>n.forEach(i=>i(r))}function ha(t){if(Qn(t))return t.guardCondition}function Sm(t,e,n=e.terminal){if(n)if(cn(n)&&Qe(n.rule.ref)){const r=t.subrule++;return i=>t.parser.subrule(r,_m(t,n.rule.ref),e,i)}else if(cn(n)&&Pn(n.rule.ref)){const r=t.consume++,i=vd(t,n.rule.ref.name);return()=>t.parser.consume(r,i,e)}else if(Kt(n)){const r=t.consume++,i=vd(t,n.value);return()=>t.parser.consume(r,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);const r=Mf(e.type.ref),i=r?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+vo(e.type.ref));return Sm(t,e,i)}}function TA(t,e){const n=t.consume++,r=t.tokens[e.value];if(!r)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(n,r,e)}function bm(t,e,n,r){const i=e&&yn(e);if(!r)if(i){const s=t.or++;return o=>t.parser.alternatives(s,[{ALT:()=>n(o),GATE:()=>i(o)},{ALT:Qp(),GATE:()=>!i(o)}])}else return n;if(r==="*"){const s=t.many++;return o=>t.parser.many(s,{DEF:()=>n(o),GATE:i?()=>i(o):void 0})}else if(r==="+"){const s=t.many++;if(i){const o=t.or++;return a=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(s,{DEF:()=>n(a)}),GATE:()=>i(a)},{ALT:Qp(),GATE:()=>!i(a)}])}else return o=>t.parser.atLeastOne(s,{DEF:()=>n(o)})}else if(r==="?"){const s=t.optional++;return o=>t.parser.optional(s,{DEF:()=>n(o),GATE:i?()=>i(o):void 0})}else Zs()}function _m(t,e){const n=RA(t,e),r=t.parser.getRule(n);if(!r)throw new Error(`Rule "${n}" not found."`);return r}function RA(t,e){if(Qe(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let n=e,r=n.$container,i=e.$type;for(;!Qe(r);)(Qn(r)||au(r)||cu(r))&&(i=r.elements.indexOf(n).toString()+":"+i),n=r,r=r.$container;return i=r.name+":"+i,t.ruleNames.set(e,i),i}}function vd(t,e){const n=t.tokens[e];if(!n)throw new Error(`Token "${e}" not found."`);return n}function SA(t){const e=t.Grammar,n=t.parser.Lexer,r=new uA(t);return Rm(e,r,n.definition),r.finalize(),r}function bA(t){const e=_A(t);return e.finalize(),e}function _A(t){const e=t.Grammar,n=t.parser.Lexer,r=new aA(t);return Rm(e,r,n.definition)}class EA{buildTokens(e,n){const r=Se($f(e,!1)),i=this.buildTerminalTokens(r),s=this.buildKeywordTokens(r,i,n);return i.forEach(o=>{const a=o.PATTERN;typeof a=="object"&&a&&"test"in a&&Pf(a)?s.unshift(o):s.push(o)}),s}buildTerminalTokens(e){return e.filter(Pn).filter(n=>!n.fragment).map(n=>this.buildTerminalToken(n)).toArray()}buildTerminalToken(e){const n=To(e),r=this.requiresCustomPattern(n)?this.regexPatternFunction(n):n,i={name:e.name,PATTERN:r,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=Pf(n)?Ze.SKIPPED:"hidden"),i}requiresCustomPattern(e){return e.flags.includes("u")?!0:!!(e.source.includes("?<=")||e.source.includes("?<!"))}regexPatternFunction(e){const n=new RegExp(e,e.flags+"y");return(r,i)=>(n.lastIndex=i,n.exec(r))}buildKeywordTokens(e,n,r){return e.filter(Qe).flatMap(i=>Zn(i).filter(Kt)).distinct(i=>i.value).toArray().sort((i,s)=>s.value.length-i.value.length).map(i=>this.buildKeywordToken(i,n,!!r?.caseInsensitive))}buildKeywordToken(e,n,r){return{name:e.value,PATTERN:this.buildKeywordPattern(e,r),LONGER_ALT:this.findLongerAlt(e,n)}}buildKeywordPattern(e,n){return n?new RegExp(mT(e.value)):e.value}findLongerAlt(e,n){return n.reduce((r,i)=>{const s=i?.PATTERN;return s?.source&&gT("^"+s.source+"$",e.value)&&r.push(i),r},[])}}class wA{convert(e,n){let r=n.grammarSource;if(vi(r)&&(r=Df(r)),cn(r)){const i=r.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,n)}return e}runConverter(e,n,r){var i;switch(e.name.toUpperCase()){case"INT":return vn.convertInt(n);case"STRING":return vn.convertString(n);case"ID":return vn.convertID(n)}switch((i=ET(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return vn.convertNumber(n);case"boolean":return vn.convertBoolean(n);case"bigint":return vn.convertBigint(n);case"date":return vn.convertDate(n);default:return n}}}var vn;(function(t){function e(u){let l="";for(let d=1;d<u.length-1;d++){const f=u.charAt(d);if(f==="\\"){const h=u.charAt(++d);l+=n(h)}else l+=f}return l}t.convertString=e;function n(u){switch(u){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return u}}function r(u){return u.charAt(0)==="^"?u.substring(1):u}t.convertID=r;function i(u){return parseInt(u)}t.convertInt=i;function s(u){return BigInt(u)}t.convertBigint=s;function o(u){return new Date(u)}t.convertDate=o;function a(u){return Number(u)}t.convertNumber=a;function c(u){return u.toLowerCase()==="true"}t.convertBoolean=c})(vn||(vn={}));var xe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function kA(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var i=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,i.get?i:{enumerable:!0,get:function(){return t[r]}})}),n}var Fn={},Tn={};Object.defineProperty(Tn,"__esModule",{value:!0});let Td;function Rd(){if(Td===void 0)throw new Error("No runtime abstraction layer installed");return Td}(function(t){function e(n){if(n===void 0)throw new Error("No runtime abstraction layer provided");Td=n}t.install=e})(Rd||(Rd={})),Tn.default=Rd;var Le={};Object.defineProperty(Le,"__esModule",{value:!0}),Le.stringArray=Le.array=Le.func=Le.error=Le.number=Le.string=Le.boolean=void 0;function CA(t){return t===!0||t===!1}Le.boolean=CA;function Em(t){return typeof t=="string"||t instanceof String}Le.string=Em;function AA(t){return typeof t=="number"||t instanceof Number}Le.number=AA;function NA(t){return t instanceof Error}Le.error=NA;function PA(t){return typeof t=="function"}Le.func=PA;function wm(t){return Array.isArray(t)}Le.array=wm;function $A(t){return wm(t)&&t.every(e=>Em(e))}Le.stringArray=$A;var Qt={};Object.defineProperty(Qt,"__esModule",{value:!0});var km=Qt.Emitter=Qt.Event=void 0;const IA=Tn;var Cm;(function(t){const e={dispose(){}};t.None=function(){return e}})(Cm||(Qt.Event=Cm={}));class DA{add(e,n=null,r){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(n),Array.isArray(r)&&r.push({dispose:()=>this.remove(e,n)})}remove(e,n=null){if(!this._callbacks)return;let r=!1;for(let i=0,s=this._callbacks.length;i<s;i++)if(this._callbacks[i]===e)if(this._contexts[i]===n){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else r=!0;if(r)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];const n=[],r=this._callbacks.slice(0),i=this._contexts.slice(0);for(let s=0,o=r.length;s<o;s++)try{n.push(r[s].apply(i[s],e))}catch(a){(0,IA.default)().console.error(a)}return n}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}}class pa{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,n,r)=>{this._callbacks||(this._callbacks=new DA),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,n);const i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,n),i.dispose=pa._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(r)&&r.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}}km=Qt.Emitter=pa,pa._noop=function(){};var Ce;Object.defineProperty(Fn,"__esModule",{value:!0});var Sd=Fn.CancellationTokenSource=Ce=Fn.CancellationToken=void 0;const OA=Tn,xA=Le,bd=Qt;var ma;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:bd.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:bd.Event.None});function e(n){const r=n;return r&&(r===t.None||r===t.Cancelled||xA.boolean(r.isCancellationRequested)&&!!r.onCancellationRequested)}t.is=e})(ma||(Ce=Fn.CancellationToken=ma={}));const LA=Object.freeze(function(t,e){const n=(0,OA.default)().timer.setTimeout(t.bind(e),0);return{dispose(){n.dispose()}}});class Am{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?LA:(this._emitter||(this._emitter=new bd.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}}class MA{get token(){return this._token||(this._token=new Am),this._token}cancel(){this._token?this._token.cancel():this._token=ma.Cancelled}dispose(){this._token?this._token instanceof Am&&this._token.dispose():this._token=ma.None}}Sd=Fn.CancellationTokenSource=MA;function FA(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}let Nm=0,jA=10;const ga=Symbol("OperationCancelled");function as(t){return t===ga}async function At(t){if(t===Ce.None)return;const e=Date.now();if(e-Nm>=jA&&(Nm=e,await FA()),t.isCancellationRequested)throw ga}class _d{constructor(){this.promise=new Promise((e,n)=>{this.resolve=r=>(e(r),this),this.reject=r=>(n(r),this)})}}class cs{constructor(e,n,r,i){this._uri=e,this._languageId=n,this._version=r,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){const n=this.offsetAt(e.start),r=this.offsetAt(e.end);return this._content.substring(n,r)}return this._content}update(e,n){for(let r of e)if(cs.isIncremental(r)){const i=$m(r.range),s=this.offsetAt(i.start),o=this.offsetAt(i.end);this._content=this._content.substring(0,s)+r.text+this._content.substring(o,this._content.length);const a=Math.max(i.start.line,0),c=Math.max(i.end.line,0);let u=this._lineOffsets;const l=Pm(r.text,!1,s);if(c-a===l.length)for(let f=0,h=l.length;f<h;f++)u[f+a+1]=l[f];else l.length<1e4?u.splice(a+1,c-a,...l):this._lineOffsets=u=u.slice(0,a+1).concat(l,u.slice(c+1));const d=r.text.length-(o-s);if(d!==0)for(let f=a+1+l.length,h=u.length;f<h;f++)u[f]=u[f]+d}else if(cs.isFull(r))this._content=r.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=n}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=Pm(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let n=this.getLineOffsets(),r=0,i=n.length;if(i===0)return{line:0,character:e};for(;r<i;){let o=Math.floor((r+i)/2);n[o]>e?i=o:r=o+1}let s=r-1;return{line:s,character:e-n[s]}}offsetAt(e){let n=this.getLineOffsets();if(e.line>=n.length)return this._content.length;if(e.line<0)return 0;let r=n[e.line],i=e.line+1<n.length?n[e.line+1]:this._content.length;return Math.max(Math.min(r+e.character,i),r)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let n=e;return n!=null&&typeof n.text=="string"&&n.range!==void 0&&(n.rangeLength===void 0||typeof n.rangeLength=="number")}static isFull(e){let n=e;return n!=null&&typeof n.text=="string"&&n.range===void 0&&n.rangeLength===void 0}}var ya;(function(t){function e(i,s,o,a){return new cs(i,s,o,a)}t.create=e;function n(i,s,o){if(i instanceof cs)return i.update(s,o),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=n;function r(i,s){let o=i.getText(),a=Ed(s.map(qA),(l,d)=>{let f=l.range.start.line-d.range.start.line;return f===0?l.range.start.character-d.range.start.character:f}),c=0;const u=[];for(const l of a){let d=i.offsetAt(l.range.start);if(d<c)throw new Error("Overlapping edit");d>c&&u.push(o.substring(c,d)),l.newText.length&&u.push(l.newText),c=i.offsetAt(l.range.end)}return u.push(o.substr(c)),u.join("")}t.applyEdits=r})(ya||(ya={}));function Ed(t,e){if(t.length<=1)return t;const n=t.length/2|0,r=t.slice(0,n),i=t.slice(n);Ed(r,e),Ed(i,e);let s=0,o=0,a=0;for(;s<r.length&&o<i.length;)e(r[s],i[o])<=0?t[a++]=r[s++]:t[a++]=i[o++];for(;s<r.length;)t[a++]=r[s++];for(;o<i.length;)t[a++]=i[o++];return t}function Pm(t,e,n=0){const r=e?[n]:[];for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);(s===13||s===10)&&(s===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,r.push(n+i+1))}return r}function $m(t){const e=t.start,n=t.end;return e.line>n.line||e.line===n.line&&e.character>n.character?{start:n,end:e}:t}function qA(t){const e=$m(t.range);return e!==t.range?{newText:t.newText,range:e}:t}var Im;(()=>{var t={470:i=>{function s(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function o(c,u){for(var l,d="",f=0,h=-1,v=0,S=0;S<=c.length;++S){if(S<c.length)l=c.charCodeAt(S);else{if(l===47)break;l=47}if(l===47){if(!(h===S-1||v===1))if(h!==S-1&&v===2){if(d.length<2||f!==2||d.charCodeAt(d.length-1)!==46||d.charCodeAt(d.length-2)!==46){if(d.length>2){var w=d.lastIndexOf("/");if(w!==d.length-1){w===-1?(d="",f=0):f=(d=d.slice(0,w)).length-1-d.lastIndexOf("/"),h=S,v=0;continue}}else if(d.length===2||d.length===1){d="",f=0,h=S,v=0;continue}}u&&(d.length>0?d+="/..":d="..",f=2)}else d.length>0?d+="/"+c.slice(h+1,S):d=c.slice(h+1,S),f=S-h-1;h=S,v=0}else l===46&&v!==-1?++v:v=-1}return d}var a={resolve:function(){for(var c,u="",l=!1,d=arguments.length-1;d>=-1&&!l;d--){var f;d>=0?f=arguments[d]:(c===void 0&&(c=process.cwd()),f=c),s(f),f.length!==0&&(u=f+"/"+u,l=f.charCodeAt(0)===47)}return u=o(u,!l),l?u.length>0?"/"+u:"/":u.length>0?u:"."},normalize:function(c){if(s(c),c.length===0)return".";var u=c.charCodeAt(0)===47,l=c.charCodeAt(c.length-1)===47;return(c=o(c,!u)).length!==0||u||(c="."),c.length>0&&l&&(c+="/"),u?"/"+c:c},isAbsolute:function(c){return s(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,u=0;u<arguments.length;++u){var l=arguments[u];s(l),l.length>0&&(c===void 0?c=l:c+="/"+l)}return c===void 0?".":a.normalize(c)},relative:function(c,u){if(s(c),s(u),c===u||(c=a.resolve(c))===(u=a.resolve(u)))return"";for(var l=1;l<c.length&&c.charCodeAt(l)===47;++l);for(var d=c.length,f=d-l,h=1;h<u.length&&u.charCodeAt(h)===47;++h);for(var v=u.length-h,S=f<v?f:v,w=-1,R=0;R<=S;++R){if(R===S){if(v>S){if(u.charCodeAt(h+R)===47)return u.slice(h+R+1);if(R===0)return u.slice(h+R)}else f>S&&(c.charCodeAt(l+R)===47?w=R:R===0&&(w=0));break}var m=c.charCodeAt(l+R);if(m!==u.charCodeAt(h+R))break;m===47&&(w=R)}var y="";for(R=l+w+1;R<=d;++R)R!==d&&c.charCodeAt(R)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+u.slice(h+w):(h+=w,u.charCodeAt(h)===47&&++h,u.slice(h))},_makeLong:function(c){return c},dirname:function(c){if(s(c),c.length===0)return".";for(var u=c.charCodeAt(0),l=u===47,d=-1,f=!0,h=c.length-1;h>=1;--h)if((u=c.charCodeAt(h))===47){if(!f){d=h;break}}else f=!1;return d===-1?l?"/":".":l&&d===1?"//":c.slice(0,d)},basename:function(c,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');s(c);var l,d=0,f=-1,h=!0;if(u!==void 0&&u.length>0&&u.length<=c.length){if(u.length===c.length&&u===c)return"";var v=u.length-1,S=-1;for(l=c.length-1;l>=0;--l){var w=c.charCodeAt(l);if(w===47){if(!h){d=l+1;break}}else S===-1&&(h=!1,S=l+1),v>=0&&(w===u.charCodeAt(v)?--v==-1&&(f=l):(v=-1,f=S))}return d===f?f=S:f===-1&&(f=c.length),c.slice(d,f)}for(l=c.length-1;l>=0;--l)if(c.charCodeAt(l)===47){if(!h){d=l+1;break}}else f===-1&&(h=!1,f=l+1);return f===-1?"":c.slice(d,f)},extname:function(c){s(c);for(var u=-1,l=0,d=-1,f=!0,h=0,v=c.length-1;v>=0;--v){var S=c.charCodeAt(v);if(S!==47)d===-1&&(f=!1,d=v+1),S===46?u===-1?u=v:h!==1&&(h=1):u!==-1&&(h=-1);else if(!f){l=v+1;break}}return u===-1||d===-1||h===0||h===1&&u===d-1&&u===l+1?"":c.slice(u,d)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(u,l){var d=l.dir||l.root,f=l.base||(l.name||"")+(l.ext||"");return d?d===l.root?d+f:d+"/"+f:f}(0,c)},parse:function(c){s(c);var u={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return u;var l,d=c.charCodeAt(0),f=d===47;f?(u.root="/",l=1):l=0;for(var h=-1,v=0,S=-1,w=!0,R=c.length-1,m=0;R>=l;--R)if((d=c.charCodeAt(R))!==47)S===-1&&(w=!1,S=R+1),d===46?h===-1?h=R:m!==1&&(m=1):h!==-1&&(m=-1);else if(!w){v=R+1;break}return h===-1||S===-1||m===0||m===1&&h===S-1&&h===v+1?S!==-1&&(u.base=u.name=v===0&&f?c.slice(1,S):c.slice(v,S)):(v===0&&f?(u.name=c.slice(1,h),u.base=c.slice(1,S)):(u.name=c.slice(v,h),u.base=c.slice(v,S)),u.ext=c.slice(h,S)),v>0?u.dir=c.slice(0,v-1):f&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function n(i){var s=e[i];if(s!==void 0)return s.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,n),o.exports}n.d=(i,s)=>{for(var o in s)n.o(s,o)&&!n.o(i,o)&&Object.defineProperty(i,o,{enumerable:!0,get:s[o]})},n.o=(i,s)=>Object.prototype.hasOwnProperty.call(i,s),n.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var r={};(()=>{let i;n.r(r),n.d(r,{URI:()=>f,Utils:()=>Te}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);const s=/^\w[\w\d+.-]*$/,o=/^\//,a=/^\/\//;function c(P,E){if(!P.scheme&&E)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${P.authority}", path: "${P.path}", query: "${P.query}", fragment: "${P.fragment}"}`);if(P.scheme&&!s.test(P.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(P.path){if(P.authority){if(!o.test(P.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(P.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}const u="",l="/",d=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class f{static isUri(E){return E instanceof f||!!E&&typeof E.authority=="string"&&typeof E.fragment=="string"&&typeof E.path=="string"&&typeof E.query=="string"&&typeof E.scheme=="string"&&typeof E.fsPath=="string"&&typeof E.with=="function"&&typeof E.toString=="function"}scheme;authority;path;query;fragment;constructor(E,T,k,I,N,$=!1){typeof E=="object"?(this.scheme=E.scheme||u,this.authority=E.authority||u,this.path=E.path||u,this.query=E.query||u,this.fragment=E.fragment||u):(this.scheme=function(L,A){return L||A?L:"file"}(E,$),this.authority=T||u,this.path=function(L,A){switch(L){case"https":case"http":case"file":A?A[0]!==l&&(A=l+A):A=l}return A}(this.scheme,k||u),this.query=I||u,this.fragment=N||u,c(this,$))}get fsPath(){return m(this)}with(E){if(!E)return this;let{scheme:T,authority:k,path:I,query:N,fragment:$}=E;return T===void 0?T=this.scheme:T===null&&(T=u),k===void 0?k=this.authority:k===null&&(k=u),I===void 0?I=this.path:I===null&&(I=u),N===void 0?N=this.query:N===null&&(N=u),$===void 0?$=this.fragment:$===null&&($=u),T===this.scheme&&k===this.authority&&I===this.path&&N===this.query&&$===this.fragment?this:new v(T,k,I,N,$)}static parse(E,T=!1){const k=d.exec(E);return k?new v(k[2]||u,K(k[4]||u),K(k[5]||u),K(k[7]||u),K(k[9]||u),T):new v(u,u,u,u,u)}static file(E){let T=u;if(i&&(E=E.replace(/\\/g,l)),E[0]===l&&E[1]===l){const k=E.indexOf(l,2);k===-1?(T=E.substring(2),E=l):(T=E.substring(2,k),E=E.substring(k)||l)}return new v("file",T,E,u,u)}static from(E){const T=new v(E.scheme,E.authority,E.path,E.query,E.fragment);return c(T,!0),T}toString(E=!1){return y(this,E)}toJSON(){return this}static revive(E){if(E){if(E instanceof f)return E;{const T=new v(E);return T._formatted=E.external,T._fsPath=E._sep===h?E.fsPath:null,T}}return E}}const h=i?1:void 0;class v extends f{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=m(this)),this._fsPath}toString(E=!1){return E?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){const E={$mid:1};return this._fsPath&&(E.fsPath=this._fsPath,E._sep=h),this._formatted&&(E.external=this._formatted),this.path&&(E.path=this.path),this.scheme&&(E.scheme=this.scheme),this.authority&&(E.authority=this.authority),this.query&&(E.query=this.query),this.fragment&&(E.fragment=this.fragment),E}}const S={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function w(P,E,T){let k,I=-1;for(let N=0;N<P.length;N++){const $=P.charCodeAt(N);if($>=97&&$<=122||$>=65&&$<=90||$>=48&&$<=57||$===45||$===46||$===95||$===126||E&&$===47||T&&$===91||T&&$===93||T&&$===58)I!==-1&&(k+=encodeURIComponent(P.substring(I,N)),I=-1),k!==void 0&&(k+=P.charAt(N));else{k===void 0&&(k=P.substr(0,N));const L=S[$];L!==void 0?(I!==-1&&(k+=encodeURIComponent(P.substring(I,N)),I=-1),k+=L):I===-1&&(I=N)}}return I!==-1&&(k+=encodeURIComponent(P.substring(I))),k!==void 0?k:P}function R(P){let E;for(let T=0;T<P.length;T++){const k=P.charCodeAt(T);k===35||k===63?(E===void 0&&(E=P.substr(0,T)),E+=S[k]):E!==void 0&&(E+=P[T])}return E!==void 0?E:P}function m(P,E){let T;return T=P.authority&&P.path.length>1&&P.scheme==="file"?`//${P.authority}${P.path}`:P.path.charCodeAt(0)===47&&(P.path.charCodeAt(1)>=65&&P.path.charCodeAt(1)<=90||P.path.charCodeAt(1)>=97&&P.path.charCodeAt(1)<=122)&&P.path.charCodeAt(2)===58?P.path[1].toLowerCase()+P.path.substr(2):P.path,i&&(T=T.replace(/\//g,"\\")),T}function y(P,E){const T=E?R:w;let k="",{scheme:I,authority:N,path:$,query:L,fragment:A}=P;if(I&&(k+=I,k+=":"),(N||I==="file")&&(k+=l,k+=l),N){let V=N.indexOf("@");if(V!==-1){const nt=N.substr(0,V);N=N.substr(V+1),V=nt.lastIndexOf(":"),V===-1?k+=T(nt,!1,!1):(k+=T(nt.substr(0,V),!1,!1),k+=":",k+=T(nt.substr(V+1),!1,!0)),k+="@"}N=N.toLowerCase(),V=N.lastIndexOf(":"),V===-1?k+=T(N,!1,!0):(k+=T(N.substr(0,V),!1,!0),k+=N.substr(V))}if($){if($.length>=3&&$.charCodeAt(0)===47&&$.charCodeAt(2)===58){const V=$.charCodeAt(1);V>=65&&V<=90&&($=`/${String.fromCharCode(V+32)}:${$.substr(3)}`)}else if($.length>=2&&$.charCodeAt(1)===58){const V=$.charCodeAt(0);V>=65&&V<=90&&($=`${String.fromCharCode(V+32)}:${$.substr(2)}`)}k+=T($,!0,!1)}return L&&(k+="?",k+=T(L,!1,!1)),A&&(k+="#",k+=E?A:w(A,!1,!1)),k}function _(P){try{return decodeURIComponent(P)}catch{return P.length>3?P.substr(0,3)+_(P.substr(3)):P}}const M=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function K(P){return P.match(M)?P.replace(M,E=>_(E)):P}var Q=n(470);const pe=Q.posix||Q,ve="/";var Te;(function(P){P.joinPath=function(E,...T){return E.with({path:pe.join(E.path,...T)})},P.resolvePath=function(E,...T){let k=E.path,I=!1;k[0]!==ve&&(k=ve+k,I=!0);let N=pe.resolve(k,...T);return I&&N[0]===ve&&!E.authority&&(N=N.substring(1)),E.with({path:N})},P.dirname=function(E){if(E.path.length===0||E.path===ve)return E;let T=pe.dirname(E.path);return T.length===1&&T.charCodeAt(0)===46&&(T=""),E.with({path:T})},P.basename=function(E){return pe.basename(E.path)},P.extname=function(E){return pe.extname(E.path)}})(Te||(Te={}))})(),Im=r})();const{URI:Nt,Utils:us}=Im;var Rn;(function(t){t.basename=us.basename,t.dirname=us.dirname,t.extname=us.extname,t.joinPath=us.joinPath,t.resolvePath=us.resolvePath;function e(r,i){return r?.toString()===i?.toString()}t.equals=e;function n(r,i){const s=typeof r=="string"?r:r.path,o=typeof i=="string"?i:i.path,a=s.split("/").filter(f=>f.length>0),c=o.split("/").filter(f=>f.length>0);let u=0;for(;u<a.length&&a[u]===c[u];u++);const l="../".repeat(a.length-u),d=c.slice(u).join("/");return l+d}t.relative=n})(Rn||(Rn={}));var q;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(q||(q={}));class HA{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}async fromUri(e,n=Ce.None){const r=await this.fileSystemProvider.readFile(e);return this.createAsync(e,r,n)}fromTextDocument(e,n,r){return n=n??Nt.parse(e.uri),Ce.is(r)?this.createAsync(n,e,r):this.create(n,e,r)}fromString(e,n,r){return Ce.is(r)?this.createAsync(n,e,r):this.create(n,e,r)}fromModel(e,n){return this.create(n,{$model:e})}create(e,n,r){if(typeof n=="string"){const i=this.parse(e,n,r);return this.createLangiumDocument(i,e,void 0,n)}else if("$model"in n){const i={value:n.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(i,e)}else{const i=this.parse(e,n.getText(),r);return this.createLangiumDocument(i,e,n)}}async createAsync(e,n,r){if(typeof n=="string"){const i=await this.parseAsync(e,n,r);return this.createLangiumDocument(i,e,void 0,n)}else{const i=await this.parseAsync(e,n.getText(),r);return this.createLangiumDocument(i,e,n)}}createLangiumDocument(e,n,r,i){let s;if(r)s={parseResult:e,uri:n,state:q.Parsed,references:[],textDocument:r};else{const o=this.createTextDocumentGetter(n,i);s={parseResult:e,uri:n,state:q.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=s,s}async update(e,n){var r,i;const s=(r=e.parseResult.value.$cstNode)===null||r===void 0?void 0:r.root.fullText,o=(i=this.textDocuments)===null||i===void 0?void 0:i.get(e.uri.toString()),a=o?o.getText():await this.fileSystemProvider.readFile(e.uri);if(o)Object.defineProperty(e,"textDocument",{value:o});else{const c=this.createTextDocumentGetter(e.uri,a);Object.defineProperty(e,"textDocument",{get:c})}return s!==a&&(e.parseResult=await this.parseAsync(e.uri,a,n),e.parseResult.value.$document=e),e.state=q.Parsed,e}parse(e,n,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(n,r)}parseAsync(e,n,r){return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(n,r)}createTextDocumentGetter(e,n){const r=this.serviceRegistry;let i;return()=>i??(i=ya.create(e.toString(),r.getServices(e).LanguageMetaData.languageId,0,n??""))}}class UA{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.serviceRegistry=e.ServiceRegistry}get all(){return Se(this.documentMap.values())}addDocument(e){const n=e.uri.toString();if(this.documentMap.has(n))throw new Error(`A document with the URI '${n}' is already present.`);this.documentMap.set(n,e)}getDocument(e){const n=e.toString();return this.documentMap.get(n)}async getOrCreateDocument(e,n){let r=this.getDocument(e);return r||(r=await this.langiumDocumentFactory.fromUri(e,n),this.addDocument(r),r)}createDocument(e,n,r){if(r)return this.langiumDocumentFactory.fromString(n,e,r).then(i=>(this.addDocument(i),i));{const i=this.langiumDocumentFactory.fromString(n,e);return this.addDocument(i),i}}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){const n=e.toString(),r=this.documentMap.get(n);return r&&(this.serviceRegistry.getServices(e).references.Linker.unlink(r),r.state=q.Changed,r.precomputedScopes=void 0,r.diagnostics=void 0),r}deleteDocument(e){const n=e.toString(),r=this.documentMap.get(n);return r&&(r.state=q.Changed,this.documentMap.delete(n)),r}}class GA{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,n=Ce.None){for(const r of vr(e.parseResult.value))await At(n),Ef(r).forEach(i=>this.doLink(i,e))}doLink(e,n){const r=e.reference;if(r._ref===void 0){try{const i=this.getCandidate(e);if(Vs(i))r._ref=i;else if(r._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){const s=this.loadAstNode(i);r._ref=s??this.createLinkingError(e,i)}}catch(i){r._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${r.$refText}': ${i}`})}n.references.push(r)}}unlink(e){for(const n of e.references)delete n._ref,delete n._nodeDescription;e.references=[]}getCandidate(e){const r=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return r??this.createLinkingError(e)}buildReference(e,n,r,i){const s=this,o={$refNode:r,$refText:i,get ref(){var a;if(Be(this._ref))return this._ref;if(Dv(this._nodeDescription)){const c=s.loadAstNode(this._nodeDescription);this._ref=c??s.createLinkingError({reference:o,container:e,property:n},this._nodeDescription)}else if(this._ref===void 0){const c=s.getLinkedNode({reference:o,container:e,property:n});if(c.error&&gt(e).state<q.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr,gt(e).references.push(this)}return Be(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Vs(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{const n=this.getCandidate(e);if(Vs(n))return{error:n};const r=this.loadAstNode(n);return r?{node:r,descr:n}:{descr:n,error:this.createLinkingError(e,n)}}catch(n){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${n}`})}}}loadAstNode(e){if(e.node)return e.node;const n=this.langiumDocuments().getDocument(e.documentUri);if(n)return this.astNodeLocator.getAstNode(n.parseResult.value,e.path)}createLinkingError(e,n){const r=gt(e.container);r.state<q.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${r.uri}).`);const i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:n})}}function Dm(t){return typeof t.name=="string"}class WA{getName(e){if(Dm(e))return e.name}getNameNode(e){return fu(e.$cstNode,"name")}}class BA{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){const n=ST(e),r=e.astNode;if(n&&r){const i=r[n.feature];if(Wt(i))return i.ref;if(Array.isArray(i)){for(const s of i)if(Wt(s)&&s.$refNode&&s.$refNode.offset<=e.offset&&s.$refNode.end>=e.end)return s.ref}}if(r){const i=this.nameProvider.getNameNode(r);if(i&&(i===e||Lv(e,i)))return r}}}findDeclarationNode(e){const n=this.findDeclaration(e);if(n?.$cstNode){const r=this.nameProvider.getNameNode(n);return r??n.$cstNode}}findReferences(e,n){const r=[];if(n.includeDeclaration){const s=this.getReferenceToSelf(e);s&&r.push(s)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return n.documentUri&&(i=i.filter(s=>Rn.equals(s.sourceUri,n.documentUri))),r.push(...i),Se(r)}getReferenceToSelf(e){const n=this.nameProvider.getNameNode(e);if(n){const r=gt(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:r.uri,sourcePath:i,targetUri:r.uri,targetPath:i,segment:Qs(n),local:!0}}}}class va{constructor(e){if(this.map=new Map,e)for(const[n,r]of e)this.add(n,r)}get size(){return Zc.sum(Se(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,n){if(n===void 0)return this.map.delete(e);{const r=this.map.get(e);if(r){const i=r.indexOf(n);if(i>=0)return r.length===1?this.map.delete(e):r.splice(i,1),!0}return!1}}get(e){var n;return(n=this.map.get(e))!==null&&n!==void 0?n:[]}has(e,n){if(n===void 0)return this.map.has(e);{const r=this.map.get(e);return r?r.indexOf(n)>=0:!1}}add(e,n){return this.map.has(e)?this.map.get(e).push(n):this.map.set(e,[n]),this}addAll(e,n){return this.map.has(e)?this.map.get(e).push(...n):this.map.set(e,Array.from(n)),this}forEach(e){this.map.forEach((n,r)=>n.forEach(i=>e(i,r,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return Se(this.map.entries()).flatMap(([e,n])=>n.map(r=>[e,r]))}keys(){return Se(this.map.keys())}values(){return Se(this.map.values()).flat()}entriesGroupedByKey(){return Se(this.map.entries())}}class Om{get size(){return this.map.size}constructor(e){if(this.map=new Map,this.inverse=new Map,e)for(const[n,r]of e)this.set(n,r)}clear(){this.map.clear(),this.inverse.clear()}set(e,n){return this.map.set(e,n),this.inverse.set(n,e),this}get(e){return this.map.get(e)}getKey(e){return this.inverse.get(e)}delete(e){const n=this.map.get(e);return n!==void 0?(this.map.delete(e),this.inverse.delete(n),!0):!1}}class KA{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,n=Ce.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,n)}async computeExportsForNode(e,n,r=fo,i=Ce.None){const s=[];this.exportNode(e,s,n);for(const o of r(e))await At(i),this.exportNode(o,s,n);return s}exportNode(e,n,r){const i=this.nameProvider.getName(e);i&&n.push(this.descriptions.createDescription(e,i,r))}async computeLocalScopes(e,n=Ce.None){const r=e.parseResult.value,i=new va;for(const s of Zn(r))await At(n),this.processNode(s,e,i);return i}processNode(e,n,r){const i=e.$container;if(i){const s=this.nameProvider.getName(e);s&&r.add(i,this.descriptions.createDescription(e,s,n))}}}class xm{constructor(e,n,r){var i;this.elements=e,this.outerScope=n,this.caseInsensitive=(i=r?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){const n=this.caseInsensitive?this.elements.find(r=>r.name.toLowerCase()===e.toLowerCase()):this.elements.find(r=>r.name===e);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}}class dr{constructor(e,n,r){var i;this.elements=new Map,this.caseInsensitive=(i=r?.caseInsensitive)!==null&&i!==void 0?i:!1;for(const s of e){const o=this.caseInsensitive?s.name.toLowerCase():s.name;this.elements.set(o,s)}this.outerScope=n}getElement(e){const n=this.caseInsensitive?e.toLowerCase():e,r=this.elements.get(n);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=Se(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}}const zA={getElement(){},getAllElements(){return Ys}};class Lm{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}}class VA extends Lm{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,n){this.throwIfDisposed(),this.cache.set(e,n)}get(e,n){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(n){const r=n();return this.cache.set(e,r),r}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}}class XA extends Lm{constructor(e){super(),this.cache=new Map,this.converter=e??(n=>n)}has(e,n){return this.throwIfDisposed(),this.cacheForContext(e).has(n)}set(e,n,r){this.throwIfDisposed(),this.cacheForContext(e).set(n,r)}get(e,n,r){this.throwIfDisposed();const i=this.cacheForContext(e);if(i.has(n))return i.get(n);if(r){const s=r();return i.set(n,s),s}else return}delete(e,n){return this.throwIfDisposed(),this.cacheForContext(e).delete(n)}clear(e){if(this.throwIfDisposed(),e){const n=this.converter(e);this.cache.delete(n)}else this.cache.clear()}cacheForContext(e){const n=this.converter(e);let r=this.cache.get(n);return r||(r=new Map,this.cache.set(n,r)),r}}class YA extends VA{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}}class JA{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new YA(e.shared)}getScope(e){const n=[],r=this.reflection.getReferenceType(e),i=gt(e.container).precomputedScopes;if(i){let o=e.container;do{const a=i.get(o);a.length>0&&n.push(Se(a).filter(c=>this.reflection.isSubtype(c.type,r))),o=o.$container}while(o)}let s=this.getGlobalScope(r,e);for(let o=n.length-1;o>=0;o--)s=this.createScope(n[o],s);return s}createScope(e,n,r){return new xm(Se(e),n,r)}createScopeForNodes(e,n,r){const i=Se(e).map(s=>{const o=this.nameProvider.getName(s);if(o)return this.descriptions.createDescription(s,o)}).nonNullable();return new xm(i,n,r)}getGlobalScope(e,n){return this.globalScopeCache.get(e,()=>new dr(this.indexManager.allElements(e)))}}function QA(t){return typeof t.$comment=="string"}function Mm(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}class ZA{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.langiumDocuments=e.shared.workspace.LangiumDocuments,this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,n={}){const r=n?.replacer,i=(o,a)=>this.replacer(o,a,n),s=r?(o,a)=>r(o,a,i):i;try{return this.currentDocument=gt(e),JSON.stringify(e,s,n?.space)}finally{this.currentDocument=void 0}}deserialize(e,n={}){const r=JSON.parse(e);return this.linkNode(r,r,n),r}replacer(e,n,{refText:r,sourceText:i,textRegions:s,comments:o,uriConverter:a}){var c,u,l,d;if(!this.ignoreProperties.has(e))if(Wt(n)){const f=n.ref,h=r?n.$refText:void 0;if(f){const v=gt(f);let S="";this.currentDocument&&this.currentDocument!==v&&(a?S=a(v.uri,n):S=v.uri.toString());const w=this.astNodeLocator.getAstNodePath(f);return{$ref:`${S}#${w}`,$refText:h}}else return{$error:(u=(c=n.error)===null||c===void 0?void 0:c.message)!==null&&u!==void 0?u:"Could not resolve reference",$refText:h}}else if(Be(n)){let f;if(s&&(f=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},n)),(!e||n.$document)&&f?.$textRegion&&(f.$textRegion.documentURI=(l=this.currentDocument)===null||l===void 0?void 0:l.uri.toString())),i&&!e&&(f??(f=Object.assign({},n)),f.$sourceText=(d=n.$cstNode)===null||d===void 0?void 0:d.text),o){f??(f=Object.assign({},n));const h=this.commentProvider.getComment(n);h&&(f.$comment=h.replace(/\r/g,""))}return f??n}else return n}addAstNodeRegionWithAssignmentsTo(e){const n=r=>({offset:r.offset,end:r.end,length:r.length,range:r.range});if(e.$cstNode){const r=e.$textRegion=n(e.$cstNode),i=r.assignments={};return Object.keys(e).filter(s=>!s.startsWith("$")).forEach(s=>{const o=Of(e.$cstNode,s).map(n);o.length!==0&&(i[s]=o)}),e}}linkNode(e,n,r,i,s,o){for(const[c,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){const d=u[l];Mm(d)?u[l]=this.reviveReference(e,c,n,d,r):Be(d)&&this.linkNode(d,n,r,e,c,l)}else Mm(u)?e[c]=this.reviveReference(e,c,n,u,r):Be(u)&&this.linkNode(u,n,r,e,c);const a=e;a.$container=i,a.$containerProperty=s,a.$containerIndex=o}reviveReference(e,n,r,i,s){let o=i.$refText,a=i.$error;if(i.$ref){const c=this.getRefNode(r,i.$ref,s.uriConverter);if(Be(c))return o||(o=this.nameProvider.getName(c)),{$refText:o??"",ref:c};a=c}if(a){const c={$refText:o??""};return c.error={container:e,property:n,message:a,reference:c},c}else return}getRefNode(e,n,r){try{const i=n.indexOf("#");if(i===0){const c=this.astNodeLocator.getAstNode(e,n.substring(1));return c||"Could not resolve path: "+n}if(i<0){const c=r?r(n):Nt.parse(n),u=this.langiumDocuments.getDocument(c);return u?u.parseResult.value:"Could not find document for URI: "+n}const s=r?r(n.substring(0,i)):Nt.parse(n.substring(0,i)),o=this.langiumDocuments.getDocument(s);if(!o)return"Could not find document for URI: "+n;if(i===n.length-1)return o.parseResult.value;const a=this.astNodeLocator.getAstNode(o.parseResult.value,n.substring(i+1));return a||"Could not resolve URI: "+n}catch(i){return String(i)}}}class eN{get map(){return this.fileExtensionMap}constructor(e){this.languageIdMap=new Map,this.fileExtensionMap=new Map,this.textDocuments=e?.workspace.TextDocuments}register(e){const n=e.LanguageMetaData;for(const r of n.fileExtensions)this.fileExtensionMap.has(r)&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${n.languageId}'.`),this.fileExtensionMap.set(r,e);this.languageIdMap.set(n.languageId,e),this.languageIdMap.size===1?this.singleton=e:this.singleton=void 0}getServices(e){var n,r;if(this.singleton!==void 0)return this.singleton;if(this.languageIdMap.size===0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");const i=(r=(n=this.textDocuments)===null||n===void 0?void 0:n.get(e.toString()))===null||r===void 0?void 0:r.languageId;if(i!==void 0){const a=this.languageIdMap.get(i);if(a)return a}const s=Rn.extname(e),o=this.fileExtensionMap.get(s);if(!o)throw i?new Error(`The service registry contains no services for the extension '${s}' for language '${i}'.`):new Error(`The service registry contains no services for the extension '${s}'.`);return o}hasServices(e){try{return this.getServices(e),!0}catch{return!1}}get all(){return Array.from(this.languageIdMap.values())}}function Fm(t){return{code:t}}var Ta;(function(t){t.all=["fast","slow","built-in"]})(Ta||(Ta={}));class tN{constructor(e){this.entries=new va,this.reflection=e.shared.AstReflection}register(e,n=this,r="fast"){if(r==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(const[i,s]of Object.entries(e)){const o=s;if(Array.isArray(o))for(const a of o){const c={check:this.wrapValidationException(a,n),category:r};this.addEntry(i,c)}else if(typeof o=="function"){const a={check:this.wrapValidationException(o,n),category:r};this.addEntry(i,a)}}}wrapValidationException(e,n){return async(r,i,s)=>{try{await e.call(n,r,i,s)}catch(o){if(as(o))throw o;console.error("An error occurred during validation:",o);const a=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+a,{node:r})}}}addEntry(e,n){if(e==="AstNode"){this.entries.add("AstNode",n);return}for(const r of this.reflection.getAllSubTypes(e))this.entries.add(r,n)}getChecks(e,n){let r=Se(this.entries.get(e)).concat(this.entries.get("AstNode"));return n&&(r=r.filter(i=>n.includes(i.category))),r.map(i=>i.check)}}class nN{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,n={},r=Ce.None){const i=e.parseResult,s=[];if(await At(r),(!n.categories||n.categories.includes("built-in"))&&(this.processLexingErrors(i,s,n),n.stopAfterLexingErrors&&s.some(o=>{var a;return((a=o.data)===null||a===void 0?void 0:a.code)===jn.LexingError})||(this.processParsingErrors(i,s,n),n.stopAfterParsingErrors&&s.some(o=>{var a;return((a=o.data)===null||a===void 0?void 0:a.code)===jn.ParsingError}))||(this.processLinkingErrors(e,s,n),n.stopAfterLinkingErrors&&s.some(o=>{var a;return((a=o.data)===null||a===void 0?void 0:a.code)===jn.LinkingError}))))return s;try{s.push(...await this.validateAst(i.value,n,r))}catch(o){if(as(o))throw o;console.error("An error occurred during validation:",o)}return await At(r),s}processLexingErrors(e,n,r){for(const i of e.lexerErrors){const s={severity:wd("error"),range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fm(jn.LexingError),source:this.getSource()};n.push(s)}}processParsingErrors(e,n,r){for(const i of e.parserErrors){let s;if(isNaN(i.token.startOffset)){if("previousToken"in i){const o=i.previousToken;if(isNaN(o.startOffset)){const a={line:0,character:0};s={start:a,end:a}}else{const a={line:o.endLine-1,character:o.endColumn};s={start:a,end:a}}}}else s=eu(i.token);if(s){const o={severity:wd("error"),range:s,message:i.message,data:Fm(jn.ParsingError),source:this.getSource()};n.push(o)}}}processLinkingErrors(e,n,r){for(const i of e.references){const s=i.error;if(s){const o={node:s.container,property:s.property,index:s.index,data:{code:jn.LinkingError,containerType:s.container.$type,property:s.property,refText:s.reference.$refText}};n.push(this.toDiagnostic("error",s.message,o))}}}async validateAst(e,n,r=Ce.None){const i=[],s=(o,a,c)=>{i.push(this.toDiagnostic(o,a,c))};return await Promise.all(vr(e).map(async o=>{await At(r);const a=this.validationRegistry.getChecks(o.$type,n.categories);for(const c of a)await c(o,s,r)})),i}toDiagnostic(e,n,r){return{message:n,range:rN(r),severity:wd(e),code:r.code,codeDescription:r.codeDescription,tags:r.tags,relatedInformation:r.relatedInformation,data:r.data,source:this.getSource()}}getSource(){return this.metadata.languageId}}function rN(t){if(t.range)return t.range;let e;return typeof t.property=="string"?e=fu(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=xf(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function wd(t){switch(t){case"error":return 1;case"warning":return 2;case"info":return 3;case"hint":return 4;default:throw new Error("Invalid diagnostic severity: "+t)}}var jn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(jn||(jn={}));class iN{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,n,r=gt(e)){n??(n=this.nameProvider.getName(e));const i=this.astNodeLocator.getAstNodePath(e);if(!n)throw new Error(`Node at path ${i} has no name.`);let s;const o=()=>{var a;return s??(s=Qs((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:n,get nameSegment(){return o()},selectionSegment:Qs(e.$cstNode),type:e.$type,documentUri:r.uri,path:i}}}class sN{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,n=Ce.None){const r=[],i=e.parseResult.value;for(const s of vr(i))await At(n),Ef(s).filter(o=>!Vs(o)).forEach(o=>{const a=this.createDescription(o);a&&r.push(a)});return r}createDescription(e){const n=e.reference.$nodeDescription,r=e.reference.$refNode;if(!n||!r)return;const i=gt(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:n.documentUri,targetPath:n.path,segment:Qs(r),local:Rn.equals(n.documentUri,i)}}}class oN{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){const n=this.getAstNodePath(e.$container),r=this.getPathSegment(e);return n+this.segmentSeparator+r}return""}getPathSegment({$containerProperty:e,$containerIndex:n}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return n!==void 0?e+this.indexSeparator+n:e}getAstNode(e,n){return n.split(this.segmentSeparator).reduce((i,s)=>{if(!i||s.length===0)return i;const o=s.indexOf(this.indexSeparator);if(o>0){const a=s.substring(0,o),c=parseInt(s.substring(o+1)),u=i[a];return u?.[c]}return i[s]},e)}}class aN{constructor(e){this._ready=new _d,this.settings={},this.workspaceConfig=!1,this.onConfigurationSectionUpdateEmitter=new km,this.serviceRegistry=e.ServiceRegistry}get ready(){return this._ready.promise}initialize(e){var n,r;this.workspaceConfig=(r=(n=e.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&r!==void 0?r:!1}async initialized(e){if(this.workspaceConfig){if(e.register){const n=this.serviceRegistry.all;e.register({section:n.map(r=>this.toSectionName(r.LanguageMetaData.languageId))})}if(e.fetchConfiguration){const n=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),r=await e.fetchConfiguration(n);n.forEach((i,s)=>{this.updateSectionConfiguration(i.section,r[s])})}}this._ready.resolve()}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(n=>{const r=e.settings[n];this.updateSectionConfiguration(n,r),this.onConfigurationSectionUpdateEmitter.fire({section:n,configuration:r})})}updateSectionConfiguration(e,n){this.settings[e]=n}async getConfiguration(e,n){await this.ready;const r=this.toSectionName(e);if(this.settings[r])return this.settings[r][n]}toSectionName(e){return`${e}`}get onConfigurationSectionUpdate(){return this.onConfigurationSectionUpdateEmitter.event}}var ls;(function(t){function e(n){return{dispose:async()=>await n()}}t.create=e})(ls||(ls={}));class cN{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new va,this.documentPhaseListeners=new va,this.buildState=new Map,this.documentBuildWaiters=new Map,this.currentState=q.Changed,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.textDocuments=e.workspace.TextDocuments,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,n={},r=Ce.None){var i,s;for(const o of e){const a=o.uri.toString();if(o.state===q.Validated){if(typeof n.validation=="boolean"&&n.validation)o.state=q.IndexedReferences,o.diagnostics=void 0,this.buildState.delete(a);else if(typeof n.validation=="object"){const c=this.buildState.get(a),u=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(u){const d=((s=n.validation.categories)!==null&&s!==void 0?s:Ta.all).filter(f=>!u.includes(f));d.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},n.validation),{categories:d})},result:c.result}),o.state=q.IndexedReferences)}}}else this.buildState.delete(a)}this.currentState=q.Changed,await this.emitUpdate(e.map(o=>o.uri),[]),await this.buildDocuments(e,n,r)}async update(e,n,r=Ce.None){this.currentState=q.Changed;for(const o of n)this.langiumDocuments.deleteDocument(o),this.buildState.delete(o.toString()),this.indexManager.remove(o);for(const o of e){if(!this.langiumDocuments.invalidateDocument(o)){const c=this.langiumDocumentFactory.fromModel({$type:"INVALID"},o);c.state=q.Changed,this.langiumDocuments.addDocument(c)}this.buildState.delete(o.toString())}const i=Se(e).concat(n).map(o=>o.toString()).toSet();this.langiumDocuments.all.filter(o=>!i.has(o.uri.toString())&&this.shouldRelink(o,i)).forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,q.ComputedScopes),o.diagnostics=void 0}),await this.emitUpdate(e,n),await At(r);const s=this.sortDocuments(this.langiumDocuments.all.filter(o=>{var a;return o.state<q.Linked||!(!((a=this.buildState.get(o.uri.toString()))===null||a===void 0)&&a.completed)}).toArray());await this.buildDocuments(s,this.updateBuildOptions,r)}async emitUpdate(e,n){await Promise.all(this.updateListeners.map(r=>r(e,n)))}sortDocuments(e){var n;const r=new Map;for(const i of e)r.set(i,!!(!((n=this.textDocuments)===null||n===void 0)&&n.get(i.uri.toString())));return e.sort((i,s)=>{const o=r.get(i),a=r.get(s);return o&&!a?-1:!o&&a?1:0})}shouldRelink(e,n){return e.references.some(r=>r.error!==void 0)?!0:this.indexManager.isAffected(e,n)}onUpdate(e){return this.updateListeners.push(e),ls.create(()=>{const n=this.updateListeners.indexOf(e);n>=0&&this.updateListeners.splice(n,1)})}async buildDocuments(e,n,r){this.prepareBuild(e,n),await this.runCancelable(e,q.Parsed,r,s=>this.langiumDocumentFactory.update(s,r)),await this.runCancelable(e,q.IndexedContent,r,s=>this.indexManager.updateContent(s,r)),await this.runCancelable(e,q.ComputedScopes,r,async s=>{const o=this.serviceRegistry.getServices(s.uri).references.ScopeComputation;s.precomputedScopes=await o.computeLocalScopes(s,r)}),await this.runCancelable(e,q.Linked,r,s=>this.serviceRegistry.getServices(s.uri).references.Linker.link(s,r)),await this.runCancelable(e,q.IndexedReferences,r,s=>this.indexManager.updateReferences(s,r));const i=e.filter(s=>this.shouldValidate(s));await this.runCancelable(i,q.Validated,r,s=>this.validate(s,r));for(const s of e){const o=this.buildState.get(s.uri.toString());o&&(o.completed=!0)}}prepareBuild(e,n){for(const r of e){const i=r.uri.toString(),s=this.buildState.get(i);(!s||s.completed)&&this.buildState.set(i,{completed:!1,options:n,result:s?.result})}}async runCancelable(e,n,r,i){const s=e.filter(o=>o.state<n);for(const o of s)await At(r),await i(o),o.state=n,await this.notifyDocumentPhase(o,n,r);await this.notifyBuildPhase(s,n,r),this.currentState=n}onBuildPhase(e,n){return this.buildPhaseListeners.add(e,n),ls.create(()=>{this.buildPhaseListeners.delete(e,n)})}onDocumentPhase(e,n){return this.documentPhaseListeners.add(e,n),ls.create(()=>{this.documentPhaseListeners.delete(e,n)})}waitUntil(e,n,r){let i;if(n&&"path"in n?i=n:r=n,r??(r=Ce.None),i){const s=this.langiumDocuments.getDocument(i);if(s&&s.state>e)return Promise.resolve(i)}return this.currentState>=e?Promise.resolve(void 0):r.isCancellationRequested?Promise.reject(ga):new Promise((s,o)=>{const a=this.onBuildPhase(e,()=>{if(a.dispose(),c.dispose(),i){const u=this.langiumDocuments.getDocument(i);s(u?.uri)}else s(void 0)}),c=r.onCancellationRequested(()=>{a.dispose(),c.dispose(),o(ga)})})}async notifyDocumentPhase(e,n,r){const i=this.documentPhaseListeners.get(n);for(const s of i)try{await s(e,r)}catch(o){if(!as(o))throw o}}async notifyBuildPhase(e,n,r){if(e.length===0)return;const i=this.buildPhaseListeners.get(n);for(const s of i)await At(r),await s(e,r)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,n){var r,i;const s=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,o=this.getBuildOptions(e).validation,a=typeof o=="object"?o:void 0,c=await s.validateDocument(e,a,n);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;const u=this.buildState.get(e.uri.toString());if(u){(r=u.result)!==null&&r!==void 0||(u.result={});const l=(i=a?.categories)!==null&&i!==void 0?i:Ta.all;u.result.validationChecks?u.result.validationChecks.push(...l):u.result.validationChecks=[...l]}}getBuildOptions(e){var n,r;return(r=(n=this.buildState.get(e.uri.toString()))===null||n===void 0?void 0:n.options)!==null&&r!==void 0?r:{}}}class uN{constructor(e){this.symbolIndex=new Map,this.symbolByTypeIndex=new XA,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,n){const r=gt(e).uri,i=[];return this.referenceIndex.forEach(s=>{s.forEach(o=>{Rn.equals(o.targetUri,r)&&o.targetPath===n&&i.push(o)})}),Se(i)}allElements(e,n){let r=Se(this.symbolIndex.keys());return n&&(r=r.filter(i=>!n||n.has(i))),r.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,n){var r;return n?this.symbolByTypeIndex.get(e,n,()=>{var s;return((s=this.symbolIndex.get(e))!==null&&s!==void 0?s:[]).filter(a=>this.astReflection.isSubtype(a.type,n))}):(r=this.symbolIndex.get(e))!==null&&r!==void 0?r:[]}remove(e){const n=e.toString();this.symbolIndex.delete(n),this.symbolByTypeIndex.clear(n),this.referenceIndex.delete(n)}async updateContent(e,n=Ce.None){const i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,n),s=e.uri.toString();this.symbolIndex.set(s,i),this.symbolByTypeIndex.clear(s)}async updateReferences(e,n=Ce.None){const i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,n);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,n){const r=this.referenceIndex.get(e.uri.toString());return r?r.some(i=>!i.local&&n.has(i.targetUri.toString())):!1}}class lN{constructor(e){this.initialBuildOptions={},this._ready=new _d,this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.WorkspaceLock}get ready(){return this._ready.promise}initialize(e){var n;this.folders=(n=e.workspaceFolders)!==null&&n!==void 0?n:void 0}initialized(e){return this.mutex.write(n=>{var r;return this.initializeWorkspace((r=this.folders)!==null&&r!==void 0?r:[],n)})}async initializeWorkspace(e,n=Ce.None){const r=await this.performStartup(e);await At(n),await this.documentBuilder.build(r,this.initialBuildOptions,n)}async performStartup(e){const n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),r=[],i=s=>{r.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};return await this.loadAdditionalDocuments(e,i),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,i))),this._ready.resolve(),r}loadAdditionalDocuments(e,n){return Promise.resolve()}getRootFolder(e){return Nt.parse(e.uri)}async traverseFolder(e,n,r,i){const s=await this.fileSystemProvider.readDirectory(n);await Promise.all(s.map(async o=>{if(this.includeEntry(e,o,r)){if(o.isDirectory)await this.traverseFolder(e,o.uri,r,i);else if(o.isFile){const a=await this.langiumDocuments.getOrCreateDocument(o.uri);i(a)}}}))}includeEntry(e,n,r){const i=Rn.basename(n.uri);if(i.startsWith("."))return!1;if(n.isDirectory)return i!=="node_modules"&&i!=="out";if(n.isFile){const s=Rn.extname(n.uri);return r.includes(s)}return!1}}class dN{constructor(e){const n=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(n);const r=Ra(n)?Object.values(n):n;this.chevrotainLexer=new Ze(r,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var n;const r=this.chevrotainLexer.tokenize(e);return{tokens:r.tokens,errors:r.errors,hidden:(n=r.groups.hidden)!==null&&n!==void 0?n:[]}}toTokenTypeDictionary(e){if(Ra(e))return e;const n=kd(e)?Object.values(e.modes).flat():e,r={};return n.forEach(i=>r[i.name]=i),r}}function fN(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function kd(t){return t&&"modes"in t&&"defaultMode"in t}function Ra(t){return!fN(t)&&!kd(t)}function hN(t,e,n){let r,i;typeof t=="string"?(i=e,r=n):(i=t.range.start,r=e),i||(i=re.create(0,0));const s=jm(t),o=Ad(r),a=gN({lines:s,position:i,options:o});return SN({index:0,tokens:a,position:i})}function pN(t,e){const n=Ad(e),r=jm(t);if(r.length===0)return!1;const i=r[0],s=r[r.length-1],o=n.start,a=n.end;return!!o?.exec(i)&&!!a?.exec(s)}function jm(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(dT)}const qm=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,mN=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function gN(t){var e,n,r;const i=[];let s=t.position.line,o=t.position.character;for(let a=0;a<t.lines.length;a++){const c=a===0,u=a===t.lines.length-1;let l=t.lines[a],d=0;if(c&&t.options.start){const h=(e=t.options.start)===null||e===void 0?void 0:e.exec(l);h&&(d=h.index+h[0].length)}else{const h=(n=t.options.line)===null||n===void 0?void 0:n.exec(l);h&&(d=h.index+h[0].length)}if(u){const h=(r=t.options.end)===null||r===void 0?void 0:r.exec(l);h&&(l=l.substring(0,h.index))}if(l=l.substring(0,RN(l)),Cd(l,d)>=l.length){if(i.length>0){const h=re.create(s,o);i.push({type:"break",content:"",range:Z.create(h,h)})}}else{qm.lastIndex=d;const h=qm.exec(l);if(h){const v=h[0],S=h[1],w=re.create(s,o+d),R=re.create(s,o+d+v.length);i.push({type:"tag",content:S,range:Z.create(w,R)}),d+=v.length,d=Cd(l,d)}if(d<l.length){const v=l.substring(d),S=Array.from(v.matchAll(mN));i.push(...yN(S,v,s,o+d))}}s++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function yN(t,e,n,r){const i=[];if(t.length===0){const s=re.create(n,r),o=re.create(n,r+e.length);i.push({type:"text",content:e,range:Z.create(s,o)})}else{let s=0;for(const a of t){const c=a.index,u=e.substring(s,c);u.length>0&&i.push({type:"text",content:e.substring(s,c),range:Z.create(re.create(n,s+r),re.create(n,c+r))});let l=u.length+1;const d=a[1];if(i.push({type:"inline-tag",content:d,range:Z.create(re.create(n,s+l+r),re.create(n,s+l+d.length+r))}),l+=d.length,a.length===4){l+=a[2].length;const f=a[3];i.push({type:"text",content:f,range:Z.create(re.create(n,s+l+r),re.create(n,s+l+f.length+r))})}else i.push({type:"text",content:"",range:Z.create(re.create(n,s+l+r),re.create(n,s+l+r))});s=c+a[0].length}const o=e.substring(s);o.length>0&&i.push({type:"text",content:o,range:Z.create(re.create(n,s+r),re.create(n,s+r+o.length))})}return i}const vN=/\S/,TN=/\s*$/;function Cd(t,e){const n=t.substring(e).match(vN);return n?e+n.index:t.length}function RN(t){const e=t.match(TN);if(e&&typeof e.index=="number")return e.index}function SN(t){var e,n,r,i;const s=re.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Wm([],Z.create(s,s));const o=[];for(;t.index<t.tokens.length;){const u=bN(t,o[o.length-1]);u&&o.push(u)}const a=(n=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&n!==void 0?n:s,c=(i=(r=o[o.length-1])===null||r===void 0?void 0:r.range.end)!==null&&i!==void 0?i:s;return new Wm(o,Z.create(a,c))}function bN(t,e){const n=t.tokens[t.index];if(n.type==="tag")return Um(t,!1);if(n.type==="text"||n.type==="inline-tag")return Hm(t);_N(n,e),t.index++}function _N(t,e){if(e){const n=new Bm("",t.range);"inlines"in e?e.inlines.push(n):e.content.inlines.push(n)}}function Hm(t){let e=t.tokens[t.index];const n=e;let r=e;const i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(EN(t)),r=e,e=t.tokens[t.index];return new $d(i,Z.create(n.range.start,r.range.end))}function EN(t){return t.tokens[t.index].type==="inline-tag"?Um(t,!0):Gm(t)}function Um(t,e){const n=t.tokens[t.index++],r=n.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){const s=Gm(t);return new Pd(r,new $d([s],s.range),e,Z.create(n.range.start,s.range.end))}else{const s=Hm(t);return new Pd(r,s,e,Z.create(n.range.start,s.range.end))}else{const s=n.range;return new Pd(r,new $d([],s),e,s)}}function Gm(t){const e=t.tokens[t.index++];return new Bm(e.content,e.range)}function Ad(t){if(!t)return Ad({start:"/**",end:"*/",line:"*"});const{start:e,end:n,line:r}=t;return{start:Nd(e,!0),end:Nd(n,!1),line:Nd(r,!0)}}function Nd(t,e){if(typeof t=="string"||typeof t=="object"){const n=typeof t=="string"?yo(t):t.source;return e?new RegExp(`^\\s*${n}`):new RegExp(`\\s*${n}\\s*$`)}else return t}class Wm{constructor(e,n){this.elements=e,this.range=n}getTag(e){return this.getAllTags().find(n=>n.name===e)}getTags(e){return this.getAllTags().filter(n=>n.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(const n of this.elements)if(e.length===0)e=n.toString();else{const r=n.toString();e+=Km(e)+r}return e.trim()}toMarkdown(e){let n="";for(const r of this.elements)if(n.length===0)n=r.toMarkdown(e);else{const i=r.toMarkdown(e);n+=Km(n)+i}return n.trim()}}class Pd{constructor(e,n,r,i){this.name=e,this.content=n,this.inline=r,this.range=i}toString(){let e=`@${this.name}`;const n=this.content.toString();return this.content.inlines.length===1?e=`${e} ${n}`:this.content.inlines.length>1&&(e=`${e}
${n}`),this.inline?`{${e}}`:e}toMarkdown(e){var n,r;return(r=(n=e?.renderTag)===null||n===void 0?void 0:n.call(e,this))!==null&&r!==void 0?r:this.toMarkdownDefault(e)}toMarkdownDefault(e){const n=this.content.toMarkdown(e);if(this.inline){const s=wN(this.name,n,e??{});if(typeof s=="string")return s}let r="";e?.tag==="italic"||e?.tag===void 0?r="*":e?.tag==="bold"?r="**":e?.tag==="bold-italic"&&(r="***");let i=`${r}@${this.name}${r}`;return this.content.inlines.length===1?i=`${i} — ${n}`:this.content.inlines.length>1&&(i=`${i}
${n}`),this.inline?`{${i}}`:i}}function wN(t,e,n){var r,i;if(t==="linkplain"||t==="linkcode"||t==="link"){const s=e.indexOf(" ");let o=e;if(s>0){const c=Cd(e,s);o=e.substring(c),e=e.substring(0,s)}return(t==="linkcode"||t==="link"&&n.link==="code")&&(o=`\`${o}\``),(i=(r=n.renderLink)===null||r===void 0?void 0:r.call(n,e,o))!==null&&i!==void 0?i:kN(e,o)}}function kN(t,e){try{return Nt.parse(t,!0),`[${e}](${t})`}catch{return t}}class $d{constructor(e,n){this.inlines=e,this.range=n}toString(){let e="";for(let n=0;n<this.inlines.length;n++){const r=this.inlines[n],i=this.inlines[n+1];e+=r.toString(),i&&i.range.start.line>r.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let n="";for(let r=0;r<this.inlines.length;r++){const i=this.inlines[r],s=this.inlines[r+1];n+=i.toMarkdown(e),s&&s.range.start.line>i.range.start.line&&(n+=`
`)}return n}}class Bm{constructor(e,n){this.text=e,this.range=n}toString(){return this.text}toMarkdown(){return this.text}}function Km(t){return t.endsWith(`
`)?`
`:`

`}class CN{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){const n=this.commentProvider.getComment(e);if(n&&pN(n))return hN(n).toMarkdown({renderLink:(i,s)=>this.documentationLinkRenderer(e,i,s),renderTag:i=>this.documentationTagRenderer(e,i)})}documentationLinkRenderer(e,n,r){var i;const s=(i=this.findNameInPrecomputedScopes(e,n))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,n);if(s&&s.nameSegment){const o=s.nameSegment.range.start.line+1,a=s.nameSegment.range.start.character+1,c=s.documentUri.with({fragment:`L${o},${a}`});return`[${r}](${c.toString()})`}else return}documentationTagRenderer(e,n){}findNameInPrecomputedScopes(e,n){const i=gt(e).precomputedScopes;if(!i)return;let s=e;do{const a=i.get(s).find(c=>c.name===n);if(a)return a;s=s.$container}while(s)}findNameInGlobalScope(e,n){return this.indexManager.allElements().find(i=>i.name===n)}}class AN{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var n;return QA(e)?e.$comment:(n=jv(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||n===void 0?void 0:n.text}}class NN{constructor(e){this.syncParser=e.parser.LangiumParser}parse(e){return Promise.resolve(this.syncParser.parse(e))}}class PN{constructor(){this.previousTokenSource=new Sd,this.writeQueue=[],this.readQueue=[],this.done=!0}write(e){this.cancelWrite();const n=new Sd;return this.previousTokenSource=n,this.enqueue(this.writeQueue,e,n.token)}read(e){return this.enqueue(this.readQueue,e)}enqueue(e,n,r){const i=new _d,s={action:n,deferred:i,cancellationToken:r??Ce.None};return e.push(s),this.performNextOperation(),i.promise}async performNextOperation(){if(!this.done)return;const e=[];if(this.writeQueue.length>0)e.push(this.writeQueue.shift());else if(this.readQueue.length>0)e.push(...this.readQueue.splice(0,this.readQueue.length));else return;this.done=!1,await Promise.all(e.map(async({action:n,deferred:r,cancellationToken:i})=>{try{const s=await Promise.resolve().then(()=>n(i));r.resolve(s)}catch(s){as(s)?r.resolve(void 0):r.reject(s)}})),this.done=!0,this.performNextOperation()}cancelWrite(){this.previousTokenSource.cancel()}}class $N{constructor(e){this.grammarElementIdMap=new Om,this.tokenTypeIdMap=new Om,this.grammar=e.Grammar,this.lexer=e.parser.Lexer,this.linker=e.references.Linker}dehydrate(e){return{lexerErrors:e.lexerErrors.map(n=>Object.assign(Object.assign({},n),{message:n.message})),parserErrors:e.parserErrors.map(n=>Object.assign(Object.assign({},n),{message:n.message})),value:this.dehydrateAstNode(e.value,this.createDehyrationContext(e.value))}}createDehyrationContext(e){const n=new Map,r=new Map;for(const i of vr(e))n.set(i,{});if(e.$cstNode)for(const i of ei(e.$cstNode))r.set(i,{});return{astNodes:n,cstNodes:r}}dehydrateAstNode(e,n){const r=n.astNodes.get(e);r.$type=e.$type,r.$containerIndex=e.$containerIndex,r.$containerProperty=e.$containerProperty,e.$cstNode!==void 0&&(r.$cstNode=this.dehydrateCstNode(e.$cstNode,n));for(const[i,s]of Object.entries(e))if(!i.startsWith("$"))if(Array.isArray(s)){const o=[];r[i]=o;for(const a of s)Be(a)?o.push(this.dehydrateAstNode(a,n)):Wt(a)?o.push(this.dehydrateReference(a,n)):o.push(a)}else Be(s)?r[i]=this.dehydrateAstNode(s,n):Wt(s)?r[i]=this.dehydrateReference(s,n):s!==void 0&&(r[i]=s);return r}dehydrateReference(e,n){const r={};return r.$refText=e.$refText,e.$refNode&&(r.$refNode=n.cstNodes.get(e.$refNode)),r}dehydrateCstNode(e,n){const r=n.cstNodes.get(e);return lf(e)?r.fullText=e.fullText:r.grammarSource=this.getGrammarElementId(e.grammarSource),r.hidden=e.hidden,r.astNode=n.astNodes.get(e.astNode),on(e)?r.content=e.content.map(i=>this.dehydrateCstNode(i,n)):Yn(e)&&(r.tokenType=e.tokenType.name,r.offset=e.offset,r.length=e.length,r.startLine=e.range.start.line,r.startColumn=e.range.start.character,r.endLine=e.range.end.line,r.endColumn=e.range.end.character),r}hydrate(e){const n=e.value,r=this.createHydrationContext(n);return"$cstNode"in n&&this.hydrateCstNode(n.$cstNode,r),{lexerErrors:e.lexerErrors,parserErrors:e.parserErrors,value:this.hydrateAstNode(n,r)}}createHydrationContext(e){const n=new Map,r=new Map;for(const s of vr(e))n.set(s,{});let i;if(e.$cstNode)for(const s of ei(e.$cstNode)){let o;"fullText"in s?(o=new mm(s.fullText),i=o):"content"in s?o=new pd:"tokenType"in s&&(o=this.hydrateCstLeafNode(s)),o&&(r.set(s,o),o.root=i)}return{astNodes:n,cstNodes:r}}hydrateAstNode(e,n){const r=n.astNodes.get(e);r.$type=e.$type,r.$containerIndex=e.$containerIndex,r.$containerProperty=e.$containerProperty,e.$cstNode&&(r.$cstNode=n.cstNodes.get(e.$cstNode));for(const[i,s]of Object.entries(e))if(!i.startsWith("$"))if(Array.isArray(s)){const o=[];r[i]=o;for(const a of s)Be(a)?o.push(this.setParent(this.hydrateAstNode(a,n),r)):Wt(a)?o.push(this.hydrateReference(a,r,i,n)):o.push(a)}else Be(s)?r[i]=this.setParent(this.hydrateAstNode(s,n),r):Wt(s)?r[i]=this.hydrateReference(s,r,i,n):s!==void 0&&(r[i]=s);return r}setParent(e,n){return e.$container=n,e}hydrateReference(e,n,r,i){return this.linker.buildReference(n,r,i.cstNodes.get(e.$refNode),e.$refText)}hydrateCstNode(e,n,r=0){const i=n.cstNodes.get(e);if(typeof e.grammarSource=="number"&&(i.grammarSource=this.getGrammarElement(e.grammarSource)),i.astNode=n.astNodes.get(e.astNode),on(i))for(const s of e.content){const o=this.hydrateCstNode(s,n,r++);i.content.push(o)}return i}hydrateCstLeafNode(e){const n=this.getTokenType(e.tokenType),r=e.offset,i=e.length,s=e.startLine,o=e.startColumn,a=e.endLine,c=e.endColumn,u=e.hidden;return new hd(r,i,{start:{line:s,character:o},end:{line:a,character:c}},n,u)}getTokenType(e){return this.lexer.definition[e]}getGrammarElementId(e){return this.grammarElementIdMap.size===0&&this.createGrammarElementIdMap(),this.grammarElementIdMap.get(e)}getGrammarElement(e){this.grammarElementIdMap.size===0&&this.createGrammarElementIdMap();const n=this.grammarElementIdMap.getKey(e);if(n)return n;throw new Error("Invalid grammar element id: "+e)}createGrammarElementIdMap(){let e=0;for(const n of vr(this.grammar))vf(n)&&this.grammarElementIdMap.set(n,e++)}}function zm(t){return{documentation:{CommentProvider:e=>new AN(e),DocumentationProvider:e=>new CN(e)},parser:{AsyncParser:e=>new NN(e),GrammarConfig:e=>PT(e),LangiumParser:e=>bA(e),CompletionParser:e=>SA(e),ValueConverter:()=>new wA,TokenBuilder:()=>new EA,Lexer:e=>new dN(e),ParserErrorMessageProvider:()=>new Tm},workspace:{AstNodeLocator:()=>new oN,AstNodeDescriptionProvider:e=>new iN(e),ReferenceDescriptionProvider:e=>new sN(e)},references:{Linker:e=>new GA(e),NameProvider:()=>new WA,ScopeProvider:e=>new JA(e),ScopeComputation:e=>new KA(e),References:e=>new BA(e)},serializer:{Hydrator:e=>new $N(e),JsonSerializer:e=>new ZA(e)},validation:{DocumentValidator:e=>new nN(e),ValidationRegistry:e=>new tN(e)},shared:()=>t.shared}}function Vm(t){return{ServiceRegistry:e=>new eN(e),workspace:{LangiumDocuments:e=>new UA(e),LangiumDocumentFactory:e=>new HA(e),DocumentBuilder:e=>new cN(e),IndexManager:e=>new uN(e),WorkspaceManager:e=>new lN(e),FileSystemProvider:e=>t.fileSystemProvider(e),WorkspaceLock:()=>new PN,ConfigurationProvider:e=>new aN(e)}}}var Sa;(function(t){t.merge=(e,n)=>_a(_a({},e),n)})(Sa||(Sa={}));function ba(t,e,n,r,i,s,o,a,c){const u=[t,e,n,r,i,s,o,a,c].reduce(_a,{});return Xm(u)}const Id=Symbol("isProxy");function Dd(t){if(t&&t[Id])for(const e of Object.values(t))Dd(e);return t}function Xm(t,e){const n=new Proxy({},{deleteProperty:()=>!1,get:(r,i)=>Jm(r,i,t,e||n),getOwnPropertyDescriptor:(r,i)=>(Jm(r,i,t,e||n),Object.getOwnPropertyDescriptor(r,i)),has:(r,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Id]});return n[Id]=!0,n}const Ym=Symbol();function Jm(t,e,n,r){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===Ym)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in n){const i=n[e];t[e]=Ym;try{t[e]=typeof i=="function"?i(r):Xm(i,r)}catch(s){throw t[e]=s instanceof Error?s:void 0,s}return t[e]}else return}function _a(t,e){if(e){for(const[n,r]of Object.entries(e))if(r!==void 0){const i=t[n];i!==null&&r!==null&&typeof i=="object"&&typeof r=="object"?t[n]=_a(i,r):t[n]=r}}return t}class IN{readFile(){throw new Error("No file system is available.")}async readDirectory(){return[]}}const Qm={fileSystemProvider:()=>new IN},DN={Grammar:()=>{},LanguageMetaData:()=>({caseInsensitive:!1,fileExtensions:[".langium"],languageId:"langium"})},ON={AstReflection:()=>new bf};function xN(){const t=ba(Vm(Qm),ON),e=ba(zm({shared:t}),DN);return t.ServiceRegistry.register(e),e}function LN(t){var e;const n=xN(),r=n.serializer.JsonSerializer.deserialize(t);return n.shared.workspace.LangiumDocumentFactory.fromModel(r,Nt.parse(`memory://${(e=r.name)!==null&&e!==void 0?e:"grammar"}.langium`)),r}var G={},Od={},Sn={},oe={},fr={},xd={},Ld={},j={},Zm;function eg(){if(Zm)return j;Zm=1,Object.defineProperty(j,"__esModule",{value:!0}),j.Message=j.NotificationType9=j.NotificationType8=j.NotificationType7=j.NotificationType6=j.NotificationType5=j.NotificationType4=j.NotificationType3=j.NotificationType2=j.NotificationType1=j.NotificationType0=j.NotificationType=j.RequestType9=j.RequestType8=j.RequestType7=j.RequestType6=j.RequestType5=j.RequestType4=j.RequestType3=j.RequestType2=j.RequestType1=j.RequestType=j.RequestType0=j.AbstractMessageSignature=j.ParameterStructures=j.ResponseError=j.ErrorCodes=void 0;const t=Le;var e;(function(E){E.ParseError=-32700,E.InvalidRequest=-32600,E.MethodNotFound=-32601,E.InvalidParams=-32602,E.InternalError=-32603,E.jsonrpcReservedErrorRangeStart=-32099,E.serverErrorStart=-32099,E.MessageWriteError=-32099,E.MessageReadError=-32098,E.PendingResponseRejected=-32097,E.ConnectionInactive=-32096,E.ServerNotInitialized=-32002,E.UnknownErrorCode=-32001,E.jsonrpcReservedErrorRangeEnd=-32e3,E.serverErrorEnd=-32e3})(e||(j.ErrorCodes=e={}));class n extends Error{constructor(T,k,I){super(k),this.code=t.number(T)?T:e.UnknownErrorCode,this.data=I,Object.setPrototypeOf(this,n.prototype)}toJson(){const T={code:this.code,message:this.message};return this.data!==void 0&&(T.data=this.data),T}}j.ResponseError=n;class r{constructor(T){this.kind=T}static is(T){return T===r.auto||T===r.byName||T===r.byPosition}toString(){return this.kind}}j.ParameterStructures=r,r.auto=new r("auto"),r.byPosition=new r("byPosition"),r.byName=new r("byName");class i{constructor(T,k){this.method=T,this.numberOfParams=k}get parameterStructures(){return r.auto}}j.AbstractMessageSignature=i;class s extends i{constructor(T){super(T,0)}}j.RequestType0=s;class o extends i{constructor(T,k=r.auto){super(T,1),this._parameterStructures=k}get parameterStructures(){return this._parameterStructures}}j.RequestType=o;class a extends i{constructor(T,k=r.auto){super(T,1),this._parameterStructures=k}get parameterStructures(){return this._parameterStructures}}j.RequestType1=a;class c extends i{constructor(T){super(T,2)}}j.RequestType2=c;class u extends i{constructor(T){super(T,3)}}j.RequestType3=u;class l extends i{constructor(T){super(T,4)}}j.RequestType4=l;class d extends i{constructor(T){super(T,5)}}j.RequestType5=d;class f extends i{constructor(T){super(T,6)}}j.RequestType6=f;class h extends i{constructor(T){super(T,7)}}j.RequestType7=h;class v extends i{constructor(T){super(T,8)}}j.RequestType8=v;class S extends i{constructor(T){super(T,9)}}j.RequestType9=S;class w extends i{constructor(T,k=r.auto){super(T,1),this._parameterStructures=k}get parameterStructures(){return this._parameterStructures}}j.NotificationType=w;class R extends i{constructor(T){super(T,0)}}j.NotificationType0=R;class m extends i{constructor(T,k=r.auto){super(T,1),this._parameterStructures=k}get parameterStructures(){return this._parameterStructures}}j.NotificationType1=m;class y extends i{constructor(T){super(T,2)}}j.NotificationType2=y;class _ extends i{constructor(T){super(T,3)}}j.NotificationType3=_;class M extends i{constructor(T){super(T,4)}}j.NotificationType4=M;class K extends i{constructor(T){super(T,5)}}j.NotificationType5=K;class Q extends i{constructor(T){super(T,6)}}j.NotificationType6=Q;class pe extends i{constructor(T){super(T,7)}}j.NotificationType7=pe;class ve extends i{constructor(T){super(T,8)}}j.NotificationType8=ve;class Te extends i{constructor(T){super(T,9)}}j.NotificationType9=Te;var P;return function(E){function T(N){const $=N;return $&&t.string($.method)&&(t.string($.id)||t.number($.id))}E.isRequest=T;function k(N){const $=N;return $&&t.string($.method)&&N.id===void 0}E.isNotification=k;function I(N){const $=N;return $&&($.result!==void 0||!!$.error)&&(t.string($.id)||t.number($.id)||$.id===null)}E.isResponse=I}(P||(j.Message=P={})),j}var bn={},tg;function ng(){if(tg)return bn;tg=1;var t;Object.defineProperty(bn,"__esModule",{value:!0}),bn.LRUCache=bn.LinkedMap=bn.Touch=void 0;var e;(function(i){i.None=0,i.First=1,i.AsOld=i.First,i.Last=2,i.AsNew=i.Last})(e||(bn.Touch=e={}));class n{constructor(){this[t]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(s){return this._map.has(s)}get(s,o=e.None){const a=this._map.get(s);if(a)return o!==e.None&&this.touch(a,o),a.value}set(s,o,a=e.None){let c=this._map.get(s);if(c)c.value=o,a!==e.None&&this.touch(c,a);else{switch(c={key:s,value:o,next:void 0,previous:void 0},a){case e.None:this.addItemLast(c);break;case e.First:this.addItemFirst(c);break;case e.Last:this.addItemLast(c);break;default:this.addItemLast(c);break}this._map.set(s,c),this._size++}return this}delete(s){return!!this.remove(s)}remove(s){const o=this._map.get(s);if(o)return this._map.delete(s),this.removeItem(o),this._size--,o.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");const s=this._head;return this._map.delete(s.key),this.removeItem(s),this._size--,s.value}forEach(s,o){const a=this._state;let c=this._head;for(;c;){if(o?s.bind(o)(c.value,c.key,this):s(c.value,c.key,this),this._state!==a)throw new Error("LinkedMap got modified during iteration.");c=c.next}}keys(){const s=this._state;let o=this._head;const a={[Symbol.iterator]:()=>a,next:()=>{if(this._state!==s)throw new Error("LinkedMap got modified during iteration.");if(o){const c={value:o.key,done:!1};return o=o.next,c}else return{value:void 0,done:!0}}};return a}values(){const s=this._state;let o=this._head;const a={[Symbol.iterator]:()=>a,next:()=>{if(this._state!==s)throw new Error("LinkedMap got modified during iteration.");if(o){const c={value:o.value,done:!1};return o=o.next,c}else return{value:void 0,done:!0}}};return a}entries(){const s=this._state;let o=this._head;const a={[Symbol.iterator]:()=>a,next:()=>{if(this._state!==s)throw new Error("LinkedMap got modified during iteration.");if(o){const c={value:[o.key,o.value],done:!1};return o=o.next,c}else return{value:void 0,done:!0}}};return a}[(t=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(s){if(s>=this.size)return;if(s===0){this.clear();return}let o=this._head,a=this.size;for(;o&&a>s;)this._map.delete(o.key),o=o.next,a--;this._head=o,this._size=a,o&&(o.previous=void 0),this._state++}addItemFirst(s){if(!this._head&&!this._tail)this._tail=s;else if(this._head)s.next=this._head,this._head.previous=s;else throw new Error("Invalid list");this._head=s,this._state++}addItemLast(s){if(!this._head&&!this._tail)this._head=s;else if(this._tail)s.previous=this._tail,this._tail.next=s;else throw new Error("Invalid list");this._tail=s,this._state++}removeItem(s){if(s===this._head&&s===this._tail)this._head=void 0,this._tail=void 0;else if(s===this._head){if(!s.next)throw new Error("Invalid list");s.next.previous=void 0,this._head=s.next}else if(s===this._tail){if(!s.previous)throw new Error("Invalid list");s.previous.next=void 0,this._tail=s.previous}else{const o=s.next,a=s.previous;if(!o||!a)throw new Error("Invalid list");o.previous=a,a.next=o}s.next=void 0,s.previous=void 0,this._state++}touch(s,o){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(o!==e.First&&o!==e.Last)){if(o===e.First){if(s===this._head)return;const a=s.next,c=s.previous;s===this._tail?(c.next=void 0,this._tail=c):(a.previous=c,c.next=a),s.previous=void 0,s.next=this._head,this._head.previous=s,this._head=s,this._state++}else if(o===e.Last){if(s===this._tail)return;const a=s.next,c=s.previous;s===this._head?(a.previous=void 0,this._head=a):(a.previous=c,c.next=a),s.next=void 0,s.previous=this._tail,this._tail.next=s,this._tail=s,this._state++}}}toJSON(){const s=[];return this.forEach((o,a)=>{s.push([a,o])}),s}fromJSON(s){this.clear();for(const[o,a]of s)this.set(o,a)}}bn.LinkedMap=n;class r extends n{constructor(s,o=1){super(),this._limit=s,this._ratio=Math.min(Math.max(0,o),1)}get limit(){return this._limit}set limit(s){this._limit=s,this.checkTrim()}get ratio(){return this._ratio}set ratio(s){this._ratio=Math.min(Math.max(0,s),1),this.checkTrim()}get(s,o=e.AsNew){return super.get(s,o)}peek(s){return super.get(s,e.None)}set(s,o){return super.set(s,o,e.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}}return bn.LRUCache=r,bn}var ds={},rg;function MN(){if(rg)return ds;rg=1,Object.defineProperty(ds,"__esModule",{value:!0}),ds.Disposable=void 0;var t;return function(e){function n(r){return{dispose:r}}e.create=n}(t||(ds.Disposable=t={})),ds}var hr={},ig;function FN(){if(ig)return hr;ig=1,Object.defineProperty(hr,"__esModule",{value:!0}),hr.SharedArrayReceiverStrategy=hr.SharedArraySenderStrategy=void 0;const t=Fn;var e;(function(o){o.Continue=0,o.Cancelled=1})(e||(e={}));class n{constructor(){this.buffers=new Map}enableCancellation(a){if(a.id===null)return;const c=new SharedArrayBuffer(4),u=new Int32Array(c,0,1);u[0]=e.Continue,this.buffers.set(a.id,c),a.$cancellationData=c}async sendCancellation(a,c){const u=this.buffers.get(c);if(u===void 0)return;const l=new Int32Array(u,0,1);Atomics.store(l,0,e.Cancelled)}cleanup(a){this.buffers.delete(a)}dispose(){this.buffers.clear()}}hr.SharedArraySenderStrategy=n;class r{constructor(a){this.data=new Int32Array(a,0,1)}get isCancellationRequested(){return Atomics.load(this.data,0)===e.Cancelled}get onCancellationRequested(){throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events")}}class i{constructor(a){this.token=new r(a)}cancel(){}dispose(){}}class s{constructor(){this.kind="request"}createCancellationTokenSource(a){const c=a.$cancellationData;return c===void 0?new t.CancellationTokenSource:new i(c)}}return hr.SharedArrayReceiverStrategy=s,hr}var _n={},fs={},sg;function og(){if(sg)return fs;sg=1,Object.defineProperty(fs,"__esModule",{value:!0}),fs.Semaphore=void 0;const t=Tn;class e{constructor(r=1){if(r<=0)throw new Error("Capacity must be greater than 0");this._capacity=r,this._active=0,this._waiting=[]}lock(r){return new Promise((i,s)=>{this._waiting.push({thunk:r,resolve:i,reject:s}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,t.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;const r=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{const i=r.thunk();i instanceof Promise?i.then(s=>{this._active--,r.resolve(s),this.runNext()},s=>{this._active--,r.reject(s),this.runNext()}):(this._active--,r.resolve(i),this.runNext())}catch(i){this._active--,r.reject(i),this.runNext()}}}return fs.Semaphore=e,fs}var ag;function jN(){if(ag)return _n;ag=1,Object.defineProperty(_n,"__esModule",{value:!0}),_n.ReadableStreamMessageReader=_n.AbstractMessageReader=_n.MessageReader=void 0;const t=Tn,e=Le,n=Qt,r=og();var i;(function(c){function u(l){let d=l;return d&&e.func(d.listen)&&e.func(d.dispose)&&e.func(d.onError)&&e.func(d.onClose)&&e.func(d.onPartialMessage)}c.is=u})(i||(_n.MessageReader=i={}));class s{constructor(){this.errorEmitter=new n.Emitter,this.closeEmitter=new n.Emitter,this.partialMessageEmitter=new n.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(u){this.errorEmitter.fire(this.asError(u))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(u){this.partialMessageEmitter.fire(u)}asError(u){return u instanceof Error?u:new Error(`Reader received error. Reason: ${e.string(u.message)?u.message:"unknown"}`)}}_n.AbstractMessageReader=s;var o;(function(c){function u(l){let d,f;const h=new Map;let v;const S=new Map;if(l===void 0||typeof l=="string")d=l??"utf-8";else{if(d=l.charset??"utf-8",l.contentDecoder!==void 0&&(f=l.contentDecoder,h.set(f.name,f)),l.contentDecoders!==void 0)for(const w of l.contentDecoders)h.set(w.name,w);if(l.contentTypeDecoder!==void 0&&(v=l.contentTypeDecoder,S.set(v.name,v)),l.contentTypeDecoders!==void 0)for(const w of l.contentTypeDecoders)S.set(w.name,w)}return v===void 0&&(v=(0,t.default)().applicationJson.decoder,S.set(v.name,v)),{charset:d,contentDecoder:f,contentDecoders:h,contentTypeDecoder:v,contentTypeDecoders:S}}c.fromOptions=u})(o||(o={}));class a extends s{constructor(u,l){super(),this.readable=u,this.options=o.fromOptions(l),this.buffer=(0,t.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0,this.readSemaphore=new r.Semaphore(1)}set partialMessageTimeout(u){this._partialMessageTimeout=u}get partialMessageTimeout(){return this._partialMessageTimeout}listen(u){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=u;const l=this.readable.onData(d=>{this.onData(d)});return this.readable.onError(d=>this.fireError(d)),this.readable.onClose(()=>this.fireClose()),l}onData(u){try{for(this.buffer.append(u);;){if(this.nextMessageLength===-1){const d=this.buffer.tryReadHeaders(!0);if(!d)return;const f=d.get("content-length");if(!f){this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(d))}`));return}const h=parseInt(f);if(isNaN(h)){this.fireError(new Error(`Content-Length value must be a number. Got ${f}`));return}this.nextMessageLength=h}const l=this.buffer.tryReadBody(this.nextMessageLength);if(l===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1,this.readSemaphore.lock(async()=>{const d=this.options.contentDecoder!==void 0?await this.options.contentDecoder.decode(l):l,f=await this.options.contentTypeDecoder.decode(d,this.options);this.callback(f)}).catch(d=>{this.fireError(d)})}}catch(l){this.fireError(l)}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,t.default)().timer.setTimeout((u,l)=>{this.partialMessageTimer=void 0,u===this.messageToken&&(this.firePartialMessage({messageToken:u,waitingTime:l}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}}return _n.ReadableStreamMessageReader=a,_n}var En={},cg;function qN(){if(cg)return En;cg=1,Object.defineProperty(En,"__esModule",{value:!0}),En.WriteableStreamMessageWriter=En.AbstractMessageWriter=En.MessageWriter=void 0;const t=Tn,e=Le,n=og(),r=Qt,i="Content-Length: ",s=`\r
`;var o;(function(l){function d(f){let h=f;return h&&e.func(h.dispose)&&e.func(h.onClose)&&e.func(h.onError)&&e.func(h.write)}l.is=d})(o||(En.MessageWriter=o={}));class a{constructor(){this.errorEmitter=new r.Emitter,this.closeEmitter=new r.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(d,f,h){this.errorEmitter.fire([this.asError(d),f,h])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(d){return d instanceof Error?d:new Error(`Writer received error. Reason: ${e.string(d.message)?d.message:"unknown"}`)}}En.AbstractMessageWriter=a;var c;(function(l){function d(f){return f===void 0||typeof f=="string"?{charset:f??"utf-8",contentTypeEncoder:(0,t.default)().applicationJson.encoder}:{charset:f.charset??"utf-8",contentEncoder:f.contentEncoder,contentTypeEncoder:f.contentTypeEncoder??(0,t.default)().applicationJson.encoder}}l.fromOptions=d})(c||(c={}));class u extends a{constructor(d,f){super(),this.writable=d,this.options=c.fromOptions(f),this.errorCount=0,this.writeSemaphore=new n.Semaphore(1),this.writable.onError(h=>this.fireError(h)),this.writable.onClose(()=>this.fireClose())}async write(d){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(d,this.options).then(h=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(h):h).then(h=>{const v=[];return v.push(i,h.byteLength.toString(),s),v.push(s),this.doWrite(d,v,h)},h=>{throw this.fireError(h),h}))}async doWrite(d,f,h){try{return await this.writable.write(f.join(""),"ascii"),this.writable.write(h)}catch(v){return this.handleError(v,d),Promise.reject(v)}}handleError(d,f){this.errorCount++,this.fireError(d,f,this.errorCount)}end(){this.writable.end()}}return En.WriteableStreamMessageWriter=u,En}var hs={},ug;function HN(){if(ug)return hs;ug=1,Object.defineProperty(hs,"__esModule",{value:!0}),hs.AbstractMessageBuffer=void 0;const t=13,e=10,n=`\r
`;class r{constructor(s="utf-8"){this._encoding=s,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(s){const o=typeof s=="string"?this.fromString(s,this._encoding):s;this._chunks.push(o),this._totalLength+=o.byteLength}tryReadHeaders(s=!1){if(this._chunks.length===0)return;let o=0,a=0,c=0,u=0;e:for(;a<this._chunks.length;){const h=this._chunks[a];for(c=0;c<h.length;){switch(h[c]){case t:switch(o){case 0:o=1;break;case 2:o=3;break;default:o=0}break;case e:switch(o){case 1:o=2;break;case 3:o=4,c++;break e;default:o=0}break;default:o=0}c++}u+=h.byteLength,a++}if(o!==4)return;const l=this._read(u+c),d=new Map,f=this.toString(l,"ascii").split(n);if(f.length<2)return d;for(let h=0;h<f.length-2;h++){const v=f[h],S=v.indexOf(":");if(S===-1)throw new Error(`Message header must separate key and value using ':'
${v}`);const w=v.substr(0,S),R=v.substr(S+1).trim();d.set(s?w.toLowerCase():w,R)}return d}tryReadBody(s){if(!(this._totalLength<s))return this._read(s)}get numberOfBytes(){return this._totalLength}_read(s){if(s===0)return this.emptyBuffer();if(s>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===s){const u=this._chunks[0];return this._chunks.shift(),this._totalLength-=s,this.asNative(u)}if(this._chunks[0].byteLength>s){const u=this._chunks[0],l=this.asNative(u,s);return this._chunks[0]=u.slice(s),this._totalLength-=s,l}const o=this.allocNative(s);let a=0,c=0;for(;s>0;){const u=this._chunks[c];if(u.byteLength>s){const l=u.slice(0,s);o.set(l,a),a+=s,this._chunks[c]=u.slice(s),this._totalLength-=s,s-=s}else o.set(u,a),a+=u.byteLength,this._chunks.shift(),this._totalLength-=u.byteLength,s-=u.byteLength}return o}}return hs.AbstractMessageBuffer=r,hs}var Md={},lg;function UN(){return lg||(lg=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.createMessageConnection=t.ConnectionOptions=t.MessageStrategy=t.CancellationStrategy=t.CancellationSenderStrategy=t.CancellationReceiverStrategy=t.RequestCancellationReceiverStrategy=t.IdCancellationReceiverStrategy=t.ConnectionStrategy=t.ConnectionError=t.ConnectionErrors=t.LogTraceNotification=t.SetTraceNotification=t.TraceFormat=t.TraceValues=t.Trace=t.NullLogger=t.ProgressType=t.ProgressToken=void 0;const e=Tn,n=Le,r=eg(),i=ng(),s=Qt,o=Fn;var a;(function(T){T.type=new r.NotificationType("$/cancelRequest")})(a||(a={}));var c;(function(T){function k(I){return typeof I=="string"||typeof I=="number"}T.is=k})(c||(t.ProgressToken=c={}));var u;(function(T){T.type=new r.NotificationType("$/progress")})(u||(u={}));class l{constructor(){}}t.ProgressType=l;var d;(function(T){function k(I){return n.func(I)}T.is=k})(d||(d={})),t.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var f;(function(T){T[T.Off=0]="Off",T[T.Messages=1]="Messages",T[T.Compact=2]="Compact",T[T.Verbose=3]="Verbose"})(f||(t.Trace=f={}));var h;(function(T){T.Off="off",T.Messages="messages",T.Compact="compact",T.Verbose="verbose"})(h||(t.TraceValues=h={})),function(T){function k(N){if(!n.string(N))return T.Off;switch(N=N.toLowerCase(),N){case"off":return T.Off;case"messages":return T.Messages;case"compact":return T.Compact;case"verbose":return T.Verbose;default:return T.Off}}T.fromString=k;function I(N){switch(N){case T.Off:return"off";case T.Messages:return"messages";case T.Compact:return"compact";case T.Verbose:return"verbose";default:return"off"}}T.toString=I}(f||(t.Trace=f={}));var v;(function(T){T.Text="text",T.JSON="json"})(v||(t.TraceFormat=v={})),function(T){function k(I){return n.string(I)?(I=I.toLowerCase(),I==="json"?T.JSON:T.Text):T.Text}T.fromString=k}(v||(t.TraceFormat=v={}));var S;(function(T){T.type=new r.NotificationType("$/setTrace")})(S||(t.SetTraceNotification=S={}));var w;(function(T){T.type=new r.NotificationType("$/logTrace")})(w||(t.LogTraceNotification=w={}));var R;(function(T){T[T.Closed=1]="Closed",T[T.Disposed=2]="Disposed",T[T.AlreadyListening=3]="AlreadyListening"})(R||(t.ConnectionErrors=R={}));class m extends Error{constructor(k,I){super(I),this.code=k,Object.setPrototypeOf(this,m.prototype)}}t.ConnectionError=m;var y;(function(T){function k(I){const N=I;return N&&n.func(N.cancelUndispatched)}T.is=k})(y||(t.ConnectionStrategy=y={}));var _;(function(T){function k(I){const N=I;return N&&(N.kind===void 0||N.kind==="id")&&n.func(N.createCancellationTokenSource)&&(N.dispose===void 0||n.func(N.dispose))}T.is=k})(_||(t.IdCancellationReceiverStrategy=_={}));var M;(function(T){function k(I){const N=I;return N&&N.kind==="request"&&n.func(N.createCancellationTokenSource)&&(N.dispose===void 0||n.func(N.dispose))}T.is=k})(M||(t.RequestCancellationReceiverStrategy=M={}));var K;(function(T){T.Message=Object.freeze({createCancellationTokenSource(I){return new o.CancellationTokenSource}});function k(I){return _.is(I)||M.is(I)}T.is=k})(K||(t.CancellationReceiverStrategy=K={}));var Q;(function(T){T.Message=Object.freeze({sendCancellation(I,N){return I.sendNotification(a.type,{id:N})},cleanup(I){}});function k(I){const N=I;return N&&n.func(N.sendCancellation)&&n.func(N.cleanup)}T.is=k})(Q||(t.CancellationSenderStrategy=Q={}));var pe;(function(T){T.Message=Object.freeze({receiver:K.Message,sender:Q.Message});function k(I){const N=I;return N&&K.is(N.receiver)&&Q.is(N.sender)}T.is=k})(pe||(t.CancellationStrategy=pe={}));var ve;(function(T){function k(I){const N=I;return N&&n.func(N.handleMessage)}T.is=k})(ve||(t.MessageStrategy=ve={}));var Te;(function(T){function k(I){const N=I;return N&&(pe.is(N.cancellationStrategy)||y.is(N.connectionStrategy)||ve.is(N.messageStrategy))}T.is=k})(Te||(t.ConnectionOptions=Te={}));var P;(function(T){T[T.New=1]="New",T[T.Listening=2]="Listening",T[T.Closed=3]="Closed",T[T.Disposed=4]="Disposed"})(P||(P={}));function E(T,k,I,N){const $=I!==void 0?I:t.NullLogger;let L=0,A=0,V=0;const nt="2.0";let tn;const nn=new Map;let Me;const rn=new Map,me=new Map;let qe,Ye=new i.LinkedMap,ge=new Map,Je=new Set,Pe=new Map,Y=f.Off,We=v.Text,le,mt=P.New;const Qr=new s.Emitter,Ms=new s.Emitter,Fs=new s.Emitter,js=new s.Emitter,qs=new s.Emitter,Ut=N&&N.cancellationStrategy?N.cancellationStrategy:pe.Message;function Hs(g){if(g===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+g.toString()}function xc(g){return g===null?"res-unknown-"+(++V).toString():"res-"+g.toString()}function Lc(){return"not-"+(++A).toString()}function Mc(g,C){r.Message.isRequest(C)?g.set(Hs(C.id),C):r.Message.isResponse(C)?g.set(xc(C.id),C):g.set(Lc(),C)}function Fc(g){}function Us(){return mt===P.Listening}function Gs(){return mt===P.Closed}function An(){return mt===P.Disposed}function Ws(){(mt===P.New||mt===P.Listening)&&(mt=P.Closed,Ms.fire(void 0))}function jc(g){Qr.fire([g,void 0,void 0])}function qc(g){Qr.fire(g)}T.onClose(Ws),T.onError(jc),k.onClose(Ws),k.onError(qc);function Bs(){qe||Ye.size===0||(qe=(0,e.default)().timer.setImmediate(()=>{qe=void 0,Hc()}))}function Ks(g){r.Message.isRequest(g)?Gc(g):r.Message.isNotification(g)?Bc(g):r.Message.isResponse(g)?Wc(g):Kc(g)}function Hc(){if(Ye.size===0)return;const g=Ye.shift();try{const C=N?.messageStrategy;ve.is(C)?C.handleMessage(g,Ks):Ks(g)}finally{Bs()}}const Uc=g=>{try{if(r.Message.isNotification(g)&&g.method===a.type.method){const C=g.params.id,D=Hs(C),F=Ye.get(D);if(r.Message.isRequest(F)){const ce=N?.connectionStrategy,ke=ce&&ce.cancelUndispatched?ce.cancelUndispatched(F,Fc):void 0;if(ke&&(ke.error!==void 0||ke.result!==void 0)){Ye.delete(D),Pe.delete(C),ke.id=F.id,gr(ke,g.method,Date.now()),k.write(ke).catch(()=>$.error("Sending response for canceled message failed."));return}}const he=Pe.get(C);if(he!==void 0){he.cancel(),Zr(g);return}else Je.add(C)}Mc(Ye,g)}finally{Bs()}};function Gc(g){if(An())return;function C(te,Re,se){const He={jsonrpc:nt,id:g.id};te instanceof r.ResponseError?He.error=te.toJson():He.result=te===void 0?null:te,gr(He,Re,se),k.write(He).catch(()=>$.error("Sending response failed."))}function D(te,Re,se){const He={jsonrpc:nt,id:g.id,error:te.toJson()};gr(He,Re,se),k.write(He).catch(()=>$.error("Sending response failed."))}function F(te,Re,se){te===void 0&&(te=null);const He={jsonrpc:nt,id:g.id,result:te};gr(He,Re,se),k.write(He).catch(()=>$.error("Sending response failed."))}Xc(g);const he=nn.get(g.method);let ce,ke;he&&(ce=he.type,ke=he.handler);const De=Date.now();if(ke||tn){const te=g.id??String(Date.now()),Re=_.is(Ut.receiver)?Ut.receiver.createCancellationTokenSource(te):Ut.receiver.createCancellationTokenSource(g);g.id!==null&&Je.has(g.id)&&Re.cancel(),g.id!==null&&Pe.set(te,Re);try{let se;if(ke)if(g.params===void 0){if(ce!==void 0&&ce.numberOfParams!==0){D(new r.ResponseError(r.ErrorCodes.InvalidParams,`Request ${g.method} defines ${ce.numberOfParams} params but received none.`),g.method,De);return}se=ke(Re.token)}else if(Array.isArray(g.params)){if(ce!==void 0&&ce.parameterStructures===r.ParameterStructures.byName){D(new r.ResponseError(r.ErrorCodes.InvalidParams,`Request ${g.method} defines parameters by name but received parameters by position`),g.method,De);return}se=ke(...g.params,Re.token)}else{if(ce!==void 0&&ce.parameterStructures===r.ParameterStructures.byPosition){D(new r.ResponseError(r.ErrorCodes.InvalidParams,`Request ${g.method} defines parameters by position but received parameters by name`),g.method,De);return}se=ke(g.params,Re.token)}else tn&&(se=tn(g.method,g.params,Re.token));const He=se;se?He.then?He.then(ct=>{Pe.delete(te),C(ct,g.method,De)},ct=>{Pe.delete(te),ct instanceof r.ResponseError?D(ct,g.method,De):ct&&n.string(ct.message)?D(new r.ResponseError(r.ErrorCodes.InternalError,`Request ${g.method} failed with message: ${ct.message}`),g.method,De):D(new r.ResponseError(r.ErrorCodes.InternalError,`Request ${g.method} failed unexpectedly without providing any details.`),g.method,De)}):(Pe.delete(te),C(se,g.method,De)):(Pe.delete(te),F(se,g.method,De))}catch(se){Pe.delete(te),se instanceof r.ResponseError?C(se,g.method,De):se&&n.string(se.message)?D(new r.ResponseError(r.ErrorCodes.InternalError,`Request ${g.method} failed with message: ${se.message}`),g.method,De):D(new r.ResponseError(r.ErrorCodes.InternalError,`Request ${g.method} failed unexpectedly without providing any details.`),g.method,De)}}else D(new r.ResponseError(r.ErrorCodes.MethodNotFound,`Unhandled method ${g.method}`),g.method,De)}function Wc(g){if(!An())if(g.id===null)g.error?$.error(`Received response message without id: Error is: 
${JSON.stringify(g.error,void 0,4)}`):$.error("Received response message without id. No further error information provided.");else{const C=g.id,D=ge.get(C);if(Yc(g,D),D!==void 0){ge.delete(C);try{if(g.error){const F=g.error;D.reject(new r.ResponseError(F.code,F.message,F.data))}else if(g.result!==void 0)D.resolve(g.result);else throw new Error("Should never happen.")}catch(F){F.message?$.error(`Response handler '${D.method}' failed with message: ${F.message}`):$.error(`Response handler '${D.method}' failed unexpectedly.`)}}}}function Bc(g){if(An())return;let C,D;if(g.method===a.type.method){const F=g.params.id;Je.delete(F),Zr(g);return}else{const F=rn.get(g.method);F&&(D=F.handler,C=F.type)}if(D||Me)try{if(Zr(g),D)if(g.params===void 0)C!==void 0&&C.numberOfParams!==0&&C.parameterStructures!==r.ParameterStructures.byName&&$.error(`Notification ${g.method} defines ${C.numberOfParams} params but received none.`),D();else if(Array.isArray(g.params)){const F=g.params;g.method===u.type.method&&F.length===2&&c.is(F[0])?D({token:F[0],value:F[1]}):(C!==void 0&&(C.parameterStructures===r.ParameterStructures.byName&&$.error(`Notification ${g.method} defines parameters by name but received parameters by position`),C.numberOfParams!==g.params.length&&$.error(`Notification ${g.method} defines ${C.numberOfParams} params but received ${F.length} arguments`)),D(...F))}else C!==void 0&&C.parameterStructures===r.ParameterStructures.byPosition&&$.error(`Notification ${g.method} defines parameters by position but received parameters by name`),D(g.params);else Me&&Me(g.method,g.params)}catch(F){F.message?$.error(`Notification handler '${g.method}' failed with message: ${F.message}`):$.error(`Notification handler '${g.method}' failed unexpectedly.`)}else Fs.fire(g)}function Kc(g){if(!g){$.error("Received empty message.");return}$.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(g,null,4)}`);const C=g;if(n.string(C.id)||n.number(C.id)){const D=C.id,F=ge.get(D);F&&F.reject(new Error("The received response has neither a result nor an error property."))}}function Gt(g){if(g!=null)switch(Y){case f.Verbose:return JSON.stringify(g,null,4);case f.Compact:return JSON.stringify(g);default:return}}function zc(g){if(!(Y===f.Off||!le))if(We===v.Text){let C;(Y===f.Verbose||Y===f.Compact)&&g.params&&(C=`Params: ${Gt(g.params)}

`),le.log(`Sending request '${g.method} - (${g.id})'.`,C)}else Nn("send-request",g)}function Vc(g){if(!(Y===f.Off||!le))if(We===v.Text){let C;(Y===f.Verbose||Y===f.Compact)&&(g.params?C=`Params: ${Gt(g.params)}

`:C=`No parameters provided.

`),le.log(`Sending notification '${g.method}'.`,C)}else Nn("send-notification",g)}function gr(g,C,D){if(!(Y===f.Off||!le))if(We===v.Text){let F;(Y===f.Verbose||Y===f.Compact)&&(g.error&&g.error.data?F=`Error data: ${Gt(g.error.data)}

`:g.result?F=`Result: ${Gt(g.result)}

`:g.error===void 0&&(F=`No result returned.

`)),le.log(`Sending response '${C} - (${g.id})'. Processing request took ${Date.now()-D}ms`,F)}else Nn("send-response",g)}function Xc(g){if(!(Y===f.Off||!le))if(We===v.Text){let C;(Y===f.Verbose||Y===f.Compact)&&g.params&&(C=`Params: ${Gt(g.params)}

`),le.log(`Received request '${g.method} - (${g.id})'.`,C)}else Nn("receive-request",g)}function Zr(g){if(!(Y===f.Off||!le||g.method===w.type.method))if(We===v.Text){let C;(Y===f.Verbose||Y===f.Compact)&&(g.params?C=`Params: ${Gt(g.params)}

`:C=`No parameters provided.

`),le.log(`Received notification '${g.method}'.`,C)}else Nn("receive-notification",g)}function Yc(g,C){if(!(Y===f.Off||!le))if(We===v.Text){let D;if((Y===f.Verbose||Y===f.Compact)&&(g.error&&g.error.data?D=`Error data: ${Gt(g.error.data)}

`:g.result?D=`Result: ${Gt(g.result)}

`:g.error===void 0&&(D=`No result returned.

`)),C){const F=g.error?` Request failed: ${g.error.message} (${g.error.code}).`:"";le.log(`Received response '${C.method} - (${g.id})' in ${Date.now()-C.timerStart}ms.${F}`,D)}else le.log(`Received response ${g.id} without active response promise.`,D)}else Nn("receive-response",g)}function Nn(g,C){if(!le||Y===f.Off)return;const D={isLSPMessage:!0,type:g,message:C,timestamp:Date.now()};le.log(D)}function Vn(){if(Gs())throw new m(R.Closed,"Connection is closed.");if(An())throw new m(R.Disposed,"Connection is disposed.")}function Jc(){if(Us())throw new m(R.AlreadyListening,"Connection is already listening")}function Qc(){if(!Us())throw new Error("Call listen() first.")}function Xn(g){return g===void 0?null:g}function zs(g){if(g!==null)return g}function p(g){return g!=null&&!Array.isArray(g)&&typeof g=="object"}function $e(g,C){switch(g){case r.ParameterStructures.auto:return p(C)?zs(C):[Xn(C)];case r.ParameterStructures.byName:if(!p(C))throw new Error("Received parameters by name but param is not an object literal.");return zs(C);case r.ParameterStructures.byPosition:return[Xn(C)];default:throw new Error(`Unknown parameter structure ${g.toString()}`)}}function Ie(g,C){let D;const F=g.numberOfParams;switch(F){case 0:D=void 0;break;case 1:D=$e(g.parameterStructures,C[0]);break;default:D=[];for(let he=0;he<C.length&&he<F;he++)D.push(Xn(C[he]));if(C.length<F)for(let he=C.length;he<F;he++)D.push(null);break}return D}const B={sendNotification:(g,...C)=>{Vn();let D,F;if(n.string(g)){D=g;const ce=C[0];let ke=0,De=r.ParameterStructures.auto;r.ParameterStructures.is(ce)&&(ke=1,De=ce);let te=C.length;const Re=te-ke;switch(Re){case 0:F=void 0;break;case 1:F=$e(De,C[ke]);break;default:if(De===r.ParameterStructures.byName)throw new Error(`Received ${Re} parameters for 'by Name' notification parameter structure.`);F=C.slice(ke,te).map(se=>Xn(se));break}}else{const ce=C;D=g.method,F=Ie(g,ce)}const he={jsonrpc:nt,method:D,params:F};return Vc(he),k.write(he).catch(ce=>{throw $.error("Sending notification failed."),ce})},onNotification:(g,C)=>{Vn();let D;return n.func(g)?Me=g:C&&(n.string(g)?(D=g,rn.set(g,{type:void 0,handler:C})):(D=g.method,rn.set(g.method,{type:g,handler:C}))),{dispose:()=>{D!==void 0?rn.delete(D):Me=void 0}}},onProgress:(g,C,D)=>{if(me.has(C))throw new Error(`Progress handler for token ${C} already registered`);return me.set(C,D),{dispose:()=>{me.delete(C)}}},sendProgress:(g,C,D)=>B.sendNotification(u.type,{token:C,value:D}),onUnhandledProgress:js.event,sendRequest:(g,...C)=>{Vn(),Qc();let D,F,he;if(n.string(g)){D=g;const te=C[0],Re=C[C.length-1];let se=0,He=r.ParameterStructures.auto;r.ParameterStructures.is(te)&&(se=1,He=te);let ct=C.length;o.CancellationToken.is(Re)&&(ct=ct-1,he=Re);const sn=ct-se;switch(sn){case 0:F=void 0;break;case 1:F=$e(He,C[se]);break;default:if(He===r.ParameterStructures.byName)throw new Error(`Received ${sn} parameters for 'by Name' request parameter structure.`);F=C.slice(se,ct).map(qI=>Xn(qI));break}}else{const te=C;D=g.method,F=Ie(g,te);const Re=g.numberOfParams;he=o.CancellationToken.is(te[Re])?te[Re]:void 0}const ce=L++;let ke;he&&(ke=he.onCancellationRequested(()=>{const te=Ut.sender.sendCancellation(B,ce);return te===void 0?($.log(`Received no promise from cancellation strategy when cancelling id ${ce}`),Promise.resolve()):te.catch(()=>{$.log(`Sending cancellation messages for id ${ce} failed`)})}));const De={jsonrpc:nt,id:ce,method:D,params:F};return zc(De),typeof Ut.sender.enableCancellation=="function"&&Ut.sender.enableCancellation(De),new Promise(async(te,Re)=>{const se=sn=>{te(sn),Ut.sender.cleanup(ce),ke?.dispose()},He=sn=>{Re(sn),Ut.sender.cleanup(ce),ke?.dispose()},ct={method:D,timerStart:Date.now(),resolve:se,reject:He};try{await k.write(De),ge.set(ce,ct)}catch(sn){throw $.error("Sending request failed."),ct.reject(new r.ResponseError(r.ErrorCodes.MessageWriteError,sn.message?sn.message:"Unknown reason")),sn}})},onRequest:(g,C)=>{Vn();let D=null;return d.is(g)?(D=void 0,tn=g):n.string(g)?(D=null,C!==void 0&&(D=g,nn.set(g,{handler:C,type:void 0}))):C!==void 0&&(D=g.method,nn.set(g.method,{type:g,handler:C})),{dispose:()=>{D!==null&&(D!==void 0?nn.delete(D):tn=void 0)}}},hasPendingResponse:()=>ge.size>0,trace:async(g,C,D)=>{let F=!1,he=v.Text;D!==void 0&&(n.boolean(D)?F=D:(F=D.sendNotification||!1,he=D.traceFormat||v.Text)),Y=g,We=he,Y===f.Off?le=void 0:le=C,F&&!Gs()&&!An()&&await B.sendNotification(S.type,{value:f.toString(g)})},onError:Qr.event,onClose:Ms.event,onUnhandledNotification:Fs.event,onDispose:qs.event,end:()=>{k.end()},dispose:()=>{if(An())return;mt=P.Disposed,qs.fire(void 0);const g=new r.ResponseError(r.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(const C of ge.values())C.reject(g);ge=new Map,Pe=new Map,Je=new Set,Ye=new i.LinkedMap,n.func(k.dispose)&&k.dispose(),n.func(T.dispose)&&T.dispose()},listen:()=>{Vn(),Jc(),mt=P.Listening,T.listen(Uc)},inspect:()=>{(0,e.default)().console.log("inspect")}};return B.onNotification(w.type,g=>{if(Y===f.Off||!le)return;const C=Y===f.Verbose||Y===f.Compact;le.log(g.message,C?g.verbose:void 0)}),B.onNotification(u.type,g=>{const C=me.get(g.token);C?C(g.value):js.fire(g)}),B}t.createMessageConnection=E}(Md)),Md}var dg;function Fd(){return dg||(dg=1,function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.ProgressType=t.ProgressToken=t.createMessageConnection=t.NullLogger=t.ConnectionOptions=t.ConnectionStrategy=t.AbstractMessageBuffer=t.WriteableStreamMessageWriter=t.AbstractMessageWriter=t.MessageWriter=t.ReadableStreamMessageReader=t.AbstractMessageReader=t.MessageReader=t.SharedArrayReceiverStrategy=t.SharedArraySenderStrategy=t.CancellationToken=t.CancellationTokenSource=t.Emitter=t.Event=t.Disposable=t.LRUCache=t.Touch=t.LinkedMap=t.ParameterStructures=t.NotificationType9=t.NotificationType8=t.NotificationType7=t.NotificationType6=t.NotificationType5=t.NotificationType4=t.NotificationType3=t.NotificationType2=t.NotificationType1=t.NotificationType0=t.NotificationType=t.ErrorCodes=t.ResponseError=t.RequestType9=t.RequestType8=t.RequestType7=t.RequestType6=t.RequestType5=t.RequestType4=t.RequestType3=t.RequestType2=t.RequestType1=t.RequestType0=t.RequestType=t.Message=t.RAL=void 0,t.MessageStrategy=t.CancellationStrategy=t.CancellationSenderStrategy=t.CancellationReceiverStrategy=t.ConnectionError=t.ConnectionErrors=t.LogTraceNotification=t.SetTraceNotification=t.TraceFormat=t.TraceValues=t.Trace=void 0;const e=eg();Object.defineProperty(t,"Message",{enumerable:!0,get:function(){return e.Message}}),Object.defineProperty(t,"RequestType",{enumerable:!0,get:function(){return e.RequestType}}),Object.defineProperty(t,"RequestType0",{enumerable:!0,get:function(){return e.RequestType0}}),Object.defineProperty(t,"RequestType1",{enumerable:!0,get:function(){return e.RequestType1}}),Object.defineProperty(t,"RequestType2",{enumerable:!0,get:function(){return e.RequestType2}}),Object.defineProperty(t,"RequestType3",{enumerable:!0,get:function(){return e.RequestType3}}),Object.defineProperty(t,"RequestType4",{enumerable:!0,get:function(){return e.RequestType4}}),Object.defineProperty(t,"RequestType5",{enumerable:!0,get:function(){return e.RequestType5}}),Object.defineProperty(t,"RequestType6",{enumerable:!0,get:function(){return e.RequestType6}}),Object.defineProperty(t,"RequestType7",{enumerable:!0,get:function(){return e.RequestType7}}),Object.defineProperty(t,"RequestType8",{enumerable:!0,get:function(){return e.RequestType8}}),Object.defineProperty(t,"RequestType9",{enumerable:!0,get:function(){return e.RequestType9}}),Object.defineProperty(t,"ResponseError",{enumerable:!0,get:function(){return e.ResponseError}}),Object.defineProperty(t,"ErrorCodes",{enumerable:!0,get:function(){return e.ErrorCodes}}),Object.defineProperty(t,"NotificationType",{enumerable:!0,get:function(){return e.NotificationType}}),Object.defineProperty(t,"NotificationType0",{enumerable:!0,get:function(){return e.NotificationType0}}),Object.defineProperty(t,"NotificationType1",{enumerable:!0,get:function(){return e.NotificationType1}}),Object.defineProperty(t,"NotificationType2",{enumerable:!0,get:function(){return e.NotificationType2}}),Object.defineProperty(t,"NotificationType3",{enumerable:!0,get:function(){return e.NotificationType3}}),Object.defineProperty(t,"NotificationType4",{enumerable:!0,get:function(){return e.NotificationType4}}),Object.defineProperty(t,"NotificationType5",{enumerable:!0,get:function(){return e.NotificationType5}}),Object.defineProperty(t,"NotificationType6",{enumerable:!0,get:function(){return e.NotificationType6}}),Object.defineProperty(t,"NotificationType7",{enumerable:!0,get:function(){return e.NotificationType7}}),Object.defineProperty(t,"NotificationType8",{enumerable:!0,get:function(){return e.NotificationType8}}),Object.defineProperty(t,"NotificationType9",{enumerable:!0,get:function(){return e.NotificationType9}}),Object.defineProperty(t,"ParameterStructures",{enumerable:!0,get:function(){return e.ParameterStructures}});const n=ng();Object.defineProperty(t,"LinkedMap",{enumerable:!0,get:function(){return n.LinkedMap}}),Object.defineProperty(t,"LRUCache",{enumerable:!0,get:function(){return n.LRUCache}}),Object.defineProperty(t,"Touch",{enumerable:!0,get:function(){return n.Touch}});const r=MN();Object.defineProperty(t,"Disposable",{enumerable:!0,get:function(){return r.Disposable}});const i=Qt;Object.defineProperty(t,"Event",{enumerable:!0,get:function(){return i.Event}}),Object.defineProperty(t,"Emitter",{enumerable:!0,get:function(){return i.Emitter}});const s=Fn;Object.defineProperty(t,"CancellationTokenSource",{enumerable:!0,get:function(){return s.CancellationTokenSource}}),Object.defineProperty(t,"CancellationToken",{enumerable:!0,get:function(){return s.CancellationToken}});const o=FN();Object.defineProperty(t,"SharedArraySenderStrategy",{enumerable:!0,get:function(){return o.SharedArraySenderStrategy}}),Object.defineProperty(t,"SharedArrayReceiverStrategy",{enumerable:!0,get:function(){return o.SharedArrayReceiverStrategy}});const a=jN();Object.defineProperty(t,"MessageReader",{enumerable:!0,get:function(){return a.MessageReader}}),Object.defineProperty(t,"AbstractMessageReader",{enumerable:!0,get:function(){return a.AbstractMessageReader}}),Object.defineProperty(t,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return a.ReadableStreamMessageReader}});const c=qN();Object.defineProperty(t,"MessageWriter",{enumerable:!0,get:function(){return c.MessageWriter}}),Object.defineProperty(t,"AbstractMessageWriter",{enumerable:!0,get:function(){return c.AbstractMessageWriter}}),Object.defineProperty(t,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return c.WriteableStreamMessageWriter}});const u=HN();Object.defineProperty(t,"AbstractMessageBuffer",{enumerable:!0,get:function(){return u.AbstractMessageBuffer}});const l=UN();Object.defineProperty(t,"ConnectionStrategy",{enumerable:!0,get:function(){return l.ConnectionStrategy}}),Object.defineProperty(t,"ConnectionOptions",{enumerable:!0,get:function(){return l.ConnectionOptions}}),Object.defineProperty(t,"NullLogger",{enumerable:!0,get:function(){return l.NullLogger}}),Object.defineProperty(t,"createMessageConnection",{enumerable:!0,get:function(){return l.createMessageConnection}}),Object.defineProperty(t,"ProgressToken",{enumerable:!0,get:function(){return l.ProgressToken}}),Object.defineProperty(t,"ProgressType",{enumerable:!0,get:function(){return l.ProgressType}}),Object.defineProperty(t,"Trace",{enumerable:!0,get:function(){return l.Trace}}),Object.defineProperty(t,"TraceValues",{enumerable:!0,get:function(){return l.TraceValues}}),Object.defineProperty(t,"TraceFormat",{enumerable:!0,get:function(){return l.TraceFormat}}),Object.defineProperty(t,"SetTraceNotification",{enumerable:!0,get:function(){return l.SetTraceNotification}}),Object.defineProperty(t,"LogTraceNotification",{enumerable:!0,get:function(){return l.LogTraceNotification}}),Object.defineProperty(t,"ConnectionErrors",{enumerable:!0,get:function(){return l.ConnectionErrors}}),Object.defineProperty(t,"ConnectionError",{enumerable:!0,get:function(){return l.ConnectionError}}),Object.defineProperty(t,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return l.CancellationReceiverStrategy}}),Object.defineProperty(t,"CancellationSenderStrategy",{enumerable:!0,get:function(){return l.CancellationSenderStrategy}}),Object.defineProperty(t,"CancellationStrategy",{enumerable:!0,get:function(){return l.CancellationStrategy}}),Object.defineProperty(t,"MessageStrategy",{enumerable:!0,get:function(){return l.MessageStrategy}});const d=Tn;t.RAL=d.default}(Ld)),Ld}Object.defineProperty(xd,"__esModule",{value:!0});const Zt=Fd();class Ea extends Zt.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return Ea.emptyBuffer}fromString(e,n){return new TextEncoder().encode(e)}toString(e,n){return n==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(n).decode(e)}asNative(e,n){return n===void 0?e:e.slice(0,n)}allocNative(e){return new Uint8Array(e)}}Ea.emptyBuffer=new Uint8Array(0);class GN{constructor(e){this.socket=e,this._onData=new Zt.Emitter,this._messageListener=n=>{n.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Zt.RAL)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Zt.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Zt.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Zt.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}}class WN{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Zt.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Zt.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Zt.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,n){if(typeof e=="string"){if(n!==void 0&&n!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${n}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}}const BN=new TextEncoder,fg=Object.freeze({messageBuffer:Object.freeze({create:t=>new Ea(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(BN.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new GN(t),asWritableStream:t=>new WN(t)}),console,timer:Object.freeze({setTimeout(t,e,...n){const r=setTimeout(t,e,...n);return{dispose:()=>clearTimeout(r)}},setImmediate(t,...e){const n=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(n)}},setInterval(t,e,...n){const r=setInterval(t,e,...n);return{dispose:()=>clearInterval(r)}}})});function jd(){return fg}(function(t){function e(){Zt.RAL.install(fg)}t.install=e})(jd||(jd={})),xd.default=jd,function(t){var e=xe&&xe.__createBinding||(Object.create?function(c,u,l,d){d===void 0&&(d=l);var f=Object.getOwnPropertyDescriptor(u,l);(!f||("get"in f?!u.__esModule:f.writable||f.configurable))&&(f={enumerable:!0,get:function(){return u[l]}}),Object.defineProperty(c,d,f)}:function(c,u,l,d){d===void 0&&(d=l),c[d]=u[l]}),n=xe&&xe.__exportStar||function(c,u){for(var l in c)l!=="default"&&!Object.prototype.hasOwnProperty.call(u,l)&&e(u,c,l)};Object.defineProperty(t,"__esModule",{value:!0}),t.createMessageConnection=t.BrowserMessageWriter=t.BrowserMessageReader=void 0,xd.default.install();const i=Fd();n(Fd(),t);class s extends i.AbstractMessageReader{constructor(u){super(),this._onData=new i.Emitter,this._messageListener=l=>{this._onData.fire(l.data)},u.addEventListener("error",l=>this.fireError(l)),u.onmessage=this._messageListener}listen(u){return this._onData.event(u)}}t.BrowserMessageReader=s;class o extends i.AbstractMessageWriter{constructor(u){super(),this.port=u,this.errorCount=0,u.addEventListener("error",l=>this.fireError(l))}write(u){try{return this.port.postMessage(u),Promise.resolve()}catch(l){return this.handleError(l,u),Promise.reject(l)}}handleError(u,l){this.errorCount++,this.fireError(u,l,this.errorCount)}end(){}}t.BrowserMessageWriter=o;function a(c,u,l,d){return l===void 0&&(l=i.NullLogger),i.ConnectionStrategy.is(d)&&(d={connectionStrategy:d}),(0,i.createMessageConnection)(c,u,l,d)}t.createMessageConnection=a}(fr);var hg=fr,pg={},qd=kA(sA),J={};Object.defineProperty(J,"__esModule",{value:!0}),J.ProtocolNotificationType=J.ProtocolNotificationType0=J.ProtocolRequestType=J.ProtocolRequestType0=J.RegistrationType=J.MessageDirection=void 0;const xr=fr;var mg;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(mg||(J.MessageDirection=mg={}));class KN{constructor(e){this.method=e}}J.RegistrationType=KN;class zN extends xr.RequestType0{constructor(e){super(e)}}J.ProtocolRequestType0=zN;class VN extends xr.RequestType{constructor(e){super(e,xr.ParameterStructures.byName)}}J.ProtocolRequestType=VN;class XN extends xr.NotificationType0{constructor(e){super(e)}}J.ProtocolNotificationType0=XN;class YN extends xr.NotificationType{constructor(e){super(e,xr.ParameterStructures.byName)}}J.ProtocolNotificationType=YN;var gg={},Ee={};Object.defineProperty(Ee,"__esModule",{value:!0}),Ee.objectLiteral=Ee.typedArray=Ee.stringArray=Ee.array=Ee.func=Ee.error=Ee.number=Ee.string=Ee.boolean=void 0;function JN(t){return t===!0||t===!1}Ee.boolean=JN;function yg(t){return typeof t=="string"||t instanceof String}Ee.string=yg;function QN(t){return typeof t=="number"||t instanceof Number}Ee.number=QN;function ZN(t){return t instanceof Error}Ee.error=ZN;function eP(t){return typeof t=="function"}Ee.func=eP;function vg(t){return Array.isArray(t)}Ee.array=vg;function tP(t){return vg(t)&&t.every(e=>yg(e))}Ee.stringArray=tP;function nP(t,e){return Array.isArray(t)&&t.every(e)}Ee.typedArray=nP;function rP(t){return t!==null&&typeof t=="object"}Ee.objectLiteral=rP;var wa={};Object.defineProperty(wa,"__esModule",{value:!0}),wa.ImplementationRequest=void 0;const Tg=J;var Rg;(function(t){t.method="textDocument/implementation",t.messageDirection=Tg.MessageDirection.clientToServer,t.type=new Tg.ProtocolRequestType(t.method)})(Rg||(wa.ImplementationRequest=Rg={}));var ka={};Object.defineProperty(ka,"__esModule",{value:!0}),ka.TypeDefinitionRequest=void 0;const Sg=J;var bg;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=Sg.MessageDirection.clientToServer,t.type=new Sg.ProtocolRequestType(t.method)})(bg||(ka.TypeDefinitionRequest=bg={}));var Lr={};Object.defineProperty(Lr,"__esModule",{value:!0}),Lr.DidChangeWorkspaceFoldersNotification=Lr.WorkspaceFoldersRequest=void 0;const Ca=J;var _g;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Ca.MessageDirection.serverToClient,t.type=new Ca.ProtocolRequestType0(t.method)})(_g||(Lr.WorkspaceFoldersRequest=_g={}));var Eg;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Ca.MessageDirection.clientToServer,t.type=new Ca.ProtocolNotificationType(t.method)})(Eg||(Lr.DidChangeWorkspaceFoldersNotification=Eg={}));var Aa={};Object.defineProperty(Aa,"__esModule",{value:!0}),Aa.ConfigurationRequest=void 0;const wg=J;var kg;(function(t){t.method="workspace/configuration",t.messageDirection=wg.MessageDirection.serverToClient,t.type=new wg.ProtocolRequestType(t.method)})(kg||(Aa.ConfigurationRequest=kg={}));var Mr={};Object.defineProperty(Mr,"__esModule",{value:!0}),Mr.ColorPresentationRequest=Mr.DocumentColorRequest=void 0;const Na=J;var Cg;(function(t){t.method="textDocument/documentColor",t.messageDirection=Na.MessageDirection.clientToServer,t.type=new Na.ProtocolRequestType(t.method)})(Cg||(Mr.DocumentColorRequest=Cg={}));var Ag;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Na.MessageDirection.clientToServer,t.type=new Na.ProtocolRequestType(t.method)})(Ag||(Mr.ColorPresentationRequest=Ag={}));var Fr={};Object.defineProperty(Fr,"__esModule",{value:!0}),Fr.FoldingRangeRefreshRequest=Fr.FoldingRangeRequest=void 0;const Pa=J;var Ng;(function(t){t.method="textDocument/foldingRange",t.messageDirection=Pa.MessageDirection.clientToServer,t.type=new Pa.ProtocolRequestType(t.method)})(Ng||(Fr.FoldingRangeRequest=Ng={}));var Pg;(function(t){t.method="workspace/foldingRange/refresh",t.messageDirection=Pa.MessageDirection.serverToClient,t.type=new Pa.ProtocolRequestType0(t.method)})(Pg||(Fr.FoldingRangeRefreshRequest=Pg={}));var $a={};Object.defineProperty($a,"__esModule",{value:!0}),$a.DeclarationRequest=void 0;const $g=J;var Ig;(function(t){t.method="textDocument/declaration",t.messageDirection=$g.MessageDirection.clientToServer,t.type=new $g.ProtocolRequestType(t.method)})(Ig||($a.DeclarationRequest=Ig={}));var Ia={};Object.defineProperty(Ia,"__esModule",{value:!0}),Ia.SelectionRangeRequest=void 0;const Dg=J;var Og;(function(t){t.method="textDocument/selectionRange",t.messageDirection=Dg.MessageDirection.clientToServer,t.type=new Dg.ProtocolRequestType(t.method)})(Og||(Ia.SelectionRangeRequest=Og={}));var qn={};Object.defineProperty(qn,"__esModule",{value:!0}),qn.WorkDoneProgressCancelNotification=qn.WorkDoneProgressCreateRequest=qn.WorkDoneProgress=void 0;const iP=fr,Da=J;var xg;(function(t){t.type=new iP.ProgressType;function e(n){return n===t.type}t.is=e})(xg||(qn.WorkDoneProgress=xg={}));var Lg;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Da.MessageDirection.serverToClient,t.type=new Da.ProtocolRequestType(t.method)})(Lg||(qn.WorkDoneProgressCreateRequest=Lg={}));var Mg;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Da.MessageDirection.clientToServer,t.type=new Da.ProtocolNotificationType(t.method)})(Mg||(qn.WorkDoneProgressCancelNotification=Mg={}));var Hn={};Object.defineProperty(Hn,"__esModule",{value:!0}),Hn.CallHierarchyOutgoingCallsRequest=Hn.CallHierarchyIncomingCallsRequest=Hn.CallHierarchyPrepareRequest=void 0;const jr=J;var Fg;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(Fg||(Hn.CallHierarchyPrepareRequest=Fg={}));var jg;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(jg||(Hn.CallHierarchyIncomingCallsRequest=jg={}));var qg;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(qg||(Hn.CallHierarchyOutgoingCallsRequest=qg={}));var pt={};Object.defineProperty(pt,"__esModule",{value:!0}),pt.SemanticTokensRefreshRequest=pt.SemanticTokensRangeRequest=pt.SemanticTokensDeltaRequest=pt.SemanticTokensRequest=pt.SemanticTokensRegistrationType=pt.TokenFormat=void 0;const wn=J;var Hg;(function(t){t.Relative="relative"})(Hg||(pt.TokenFormat=Hg={}));var ps;(function(t){t.method="textDocument/semanticTokens",t.type=new wn.RegistrationType(t.method)})(ps||(pt.SemanticTokensRegistrationType=ps={}));var Ug;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolRequestType(t.method),t.registrationMethod=ps.method})(Ug||(pt.SemanticTokensRequest=Ug={}));var Gg;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolRequestType(t.method),t.registrationMethod=ps.method})(Gg||(pt.SemanticTokensDeltaRequest=Gg={}));var Wg;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolRequestType(t.method),t.registrationMethod=ps.method})(Wg||(pt.SemanticTokensRangeRequest=Wg={}));var Bg;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=wn.MessageDirection.serverToClient,t.type=new wn.ProtocolRequestType0(t.method)})(Bg||(pt.SemanticTokensRefreshRequest=Bg={}));var Oa={};Object.defineProperty(Oa,"__esModule",{value:!0}),Oa.ShowDocumentRequest=void 0;const Kg=J;var zg;(function(t){t.method="window/showDocument",t.messageDirection=Kg.MessageDirection.serverToClient,t.type=new Kg.ProtocolRequestType(t.method)})(zg||(Oa.ShowDocumentRequest=zg={}));var xa={};Object.defineProperty(xa,"__esModule",{value:!0}),xa.LinkedEditingRangeRequest=void 0;const Vg=J;var Xg;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Vg.MessageDirection.clientToServer,t.type=new Vg.ProtocolRequestType(t.method)})(Xg||(xa.LinkedEditingRangeRequest=Xg={}));var et={};Object.defineProperty(et,"__esModule",{value:!0}),et.WillDeleteFilesRequest=et.DidDeleteFilesNotification=et.DidRenameFilesNotification=et.WillRenameFilesRequest=et.DidCreateFilesNotification=et.WillCreateFilesRequest=et.FileOperationPatternKind=void 0;const Pt=J;var Yg;(function(t){t.file="file",t.folder="folder"})(Yg||(et.FileOperationPatternKind=Yg={}));var Jg;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolRequestType(t.method)})(Jg||(et.WillCreateFilesRequest=Jg={}));var Qg;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolNotificationType(t.method)})(Qg||(et.DidCreateFilesNotification=Qg={}));var Zg;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolRequestType(t.method)})(Zg||(et.WillRenameFilesRequest=Zg={}));var ey;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolNotificationType(t.method)})(ey||(et.DidRenameFilesNotification=ey={}));var ty;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolNotificationType(t.method)})(ty||(et.DidDeleteFilesNotification=ty={}));var ny;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Pt.MessageDirection.clientToServer,t.type=new Pt.ProtocolRequestType(t.method)})(ny||(et.WillDeleteFilesRequest=ny={}));var Un={};Object.defineProperty(Un,"__esModule",{value:!0}),Un.MonikerRequest=Un.MonikerKind=Un.UniquenessLevel=void 0;const ry=J;var iy;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(iy||(Un.UniquenessLevel=iy={}));var sy;(function(t){t.$import="import",t.$export="export",t.local="local"})(sy||(Un.MonikerKind=sy={}));var oy;(function(t){t.method="textDocument/moniker",t.messageDirection=ry.MessageDirection.clientToServer,t.type=new ry.ProtocolRequestType(t.method)})(oy||(Un.MonikerRequest=oy={}));var Gn={};Object.defineProperty(Gn,"__esModule",{value:!0}),Gn.TypeHierarchySubtypesRequest=Gn.TypeHierarchySupertypesRequest=Gn.TypeHierarchyPrepareRequest=void 0;const qr=J;var ay;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=qr.MessageDirection.clientToServer,t.type=new qr.ProtocolRequestType(t.method)})(ay||(Gn.TypeHierarchyPrepareRequest=ay={}));var cy;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=qr.MessageDirection.clientToServer,t.type=new qr.ProtocolRequestType(t.method)})(cy||(Gn.TypeHierarchySupertypesRequest=cy={}));var uy;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=qr.MessageDirection.clientToServer,t.type=new qr.ProtocolRequestType(t.method)})(uy||(Gn.TypeHierarchySubtypesRequest=uy={}));var Hr={};Object.defineProperty(Hr,"__esModule",{value:!0}),Hr.InlineValueRefreshRequest=Hr.InlineValueRequest=void 0;const La=J;var ly;(function(t){t.method="textDocument/inlineValue",t.messageDirection=La.MessageDirection.clientToServer,t.type=new La.ProtocolRequestType(t.method)})(ly||(Hr.InlineValueRequest=ly={}));var dy;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=La.MessageDirection.serverToClient,t.type=new La.ProtocolRequestType0(t.method)})(dy||(Hr.InlineValueRefreshRequest=dy={}));var Wn={};Object.defineProperty(Wn,"__esModule",{value:!0}),Wn.InlayHintRefreshRequest=Wn.InlayHintResolveRequest=Wn.InlayHintRequest=void 0;const Ur=J;var fy;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ur.MessageDirection.clientToServer,t.type=new Ur.ProtocolRequestType(t.method)})(fy||(Wn.InlayHintRequest=fy={}));var hy;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ur.MessageDirection.clientToServer,t.type=new Ur.ProtocolRequestType(t.method)})(hy||(Wn.InlayHintResolveRequest=hy={}));var py;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ur.MessageDirection.serverToClient,t.type=new Ur.ProtocolRequestType0(t.method)})(py||(Wn.InlayHintRefreshRequest=py={}));var $t={};Object.defineProperty($t,"__esModule",{value:!0}),$t.DiagnosticRefreshRequest=$t.WorkspaceDiagnosticRequest=$t.DocumentDiagnosticRequest=$t.DocumentDiagnosticReportKind=$t.DiagnosticServerCancellationData=void 0;const my=fr,sP=Ee,Gr=J;var gy;(function(t){function e(n){const r=n;return r&&sP.boolean(r.retriggerRequest)}t.is=e})(gy||($t.DiagnosticServerCancellationData=gy={}));var yy;(function(t){t.Full="full",t.Unchanged="unchanged"})(yy||($t.DocumentDiagnosticReportKind=yy={}));var vy;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolRequestType(t.method),t.partialResult=new my.ProgressType})(vy||($t.DocumentDiagnosticRequest=vy={}));var Ty;(function(t){t.method="workspace/diagnostic",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolRequestType(t.method),t.partialResult=new my.ProgressType})(Ty||($t.WorkspaceDiagnosticRequest=Ty={}));var Ry;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Gr.MessageDirection.serverToClient,t.type=new Gr.ProtocolRequestType0(t.method)})(Ry||($t.DiagnosticRefreshRequest=Ry={}));var we={};Object.defineProperty(we,"__esModule",{value:!0}),we.DidCloseNotebookDocumentNotification=we.DidSaveNotebookDocumentNotification=we.DidChangeNotebookDocumentNotification=we.NotebookCellArrayChange=we.DidOpenNotebookDocumentNotification=we.NotebookDocumentSyncRegistrationType=we.NotebookDocument=we.NotebookCell=we.ExecutionSummary=we.NotebookCellKind=void 0;const ms=qd,qt=Ee,en=J;var Hd;(function(t){t.Markup=1,t.Code=2;function e(n){return n===1||n===2}t.is=e})(Hd||(we.NotebookCellKind=Hd={}));var Ud;(function(t){function e(i,s){const o={executionOrder:i};return(s===!0||s===!1)&&(o.success=s),o}t.create=e;function n(i){const s=i;return qt.objectLiteral(s)&&ms.uinteger.is(s.executionOrder)&&(s.success===void 0||qt.boolean(s.success))}t.is=n;function r(i,s){return i===s?!0:i==null||s===null||s===void 0?!1:i.executionOrder===s.executionOrder&&i.success===s.success}t.equals=r})(Ud||(we.ExecutionSummary=Ud={}));var Ma;(function(t){function e(s,o){return{kind:s,document:o}}t.create=e;function n(s){const o=s;return qt.objectLiteral(o)&&Hd.is(o.kind)&&ms.DocumentUri.is(o.document)&&(o.metadata===void 0||qt.objectLiteral(o.metadata))}t.is=n;function r(s,o){const a=new Set;return s.document!==o.document&&a.add("document"),s.kind!==o.kind&&a.add("kind"),s.executionSummary!==o.executionSummary&&a.add("executionSummary"),(s.metadata!==void 0||o.metadata!==void 0)&&!i(s.metadata,o.metadata)&&a.add("metadata"),(s.executionSummary!==void 0||o.executionSummary!==void 0)&&!Ud.equals(s.executionSummary,o.executionSummary)&&a.add("executionSummary"),a}t.diff=r;function i(s,o){if(s===o)return!0;if(s==null||o===null||o===void 0||typeof s!=typeof o||typeof s!="object")return!1;const a=Array.isArray(s),c=Array.isArray(o);if(a!==c)return!1;if(a&&c){if(s.length!==o.length)return!1;for(let u=0;u<s.length;u++)if(!i(s[u],o[u]))return!1}if(qt.objectLiteral(s)&&qt.objectLiteral(o)){const u=Object.keys(s),l=Object.keys(o);if(u.length!==l.length||(u.sort(),l.sort(),!i(u,l)))return!1;for(let d=0;d<u.length;d++){const f=u[d];if(!i(s[f],o[f]))return!1}}return!0}})(Ma||(we.NotebookCell=Ma={}));var Sy;(function(t){function e(r,i,s,o){return{uri:r,notebookType:i,version:s,cells:o}}t.create=e;function n(r){const i=r;return qt.objectLiteral(i)&&qt.string(i.uri)&&ms.integer.is(i.version)&&qt.typedArray(i.cells,Ma.is)}t.is=n})(Sy||(we.NotebookDocument=Sy={}));var Wr;(function(t){t.method="notebookDocument/sync",t.messageDirection=en.MessageDirection.clientToServer,t.type=new en.RegistrationType(t.method)})(Wr||(we.NotebookDocumentSyncRegistrationType=Wr={}));var by;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=en.MessageDirection.clientToServer,t.type=new en.ProtocolNotificationType(t.method),t.registrationMethod=Wr.method})(by||(we.DidOpenNotebookDocumentNotification=by={}));var _y;(function(t){function e(r){const i=r;return qt.objectLiteral(i)&&ms.uinteger.is(i.start)&&ms.uinteger.is(i.deleteCount)&&(i.cells===void 0||qt.typedArray(i.cells,Ma.is))}t.is=e;function n(r,i,s){const o={start:r,deleteCount:i};return s!==void 0&&(o.cells=s),o}t.create=n})(_y||(we.NotebookCellArrayChange=_y={}));var Ey;(function(t){t.method="notebookDocument/didChange",t.messageDirection=en.MessageDirection.clientToServer,t.type=new en.ProtocolNotificationType(t.method),t.registrationMethod=Wr.method})(Ey||(we.DidChangeNotebookDocumentNotification=Ey={}));var wy;(function(t){t.method="notebookDocument/didSave",t.messageDirection=en.MessageDirection.clientToServer,t.type=new en.ProtocolNotificationType(t.method),t.registrationMethod=Wr.method})(wy||(we.DidSaveNotebookDocumentNotification=wy={}));var ky;(function(t){t.method="notebookDocument/didClose",t.messageDirection=en.MessageDirection.clientToServer,t.type=new en.ProtocolNotificationType(t.method),t.registrationMethod=Wr.method})(ky||(we.DidCloseNotebookDocumentNotification=ky={}));var Fa={};Object.defineProperty(Fa,"__esModule",{value:!0}),Fa.InlineCompletionRequest=void 0;const Cy=J;var Ay;(function(t){t.method="textDocument/inlineCompletion",t.messageDirection=Cy.MessageDirection.clientToServer,t.type=new Cy.ProtocolRequestType(t.method)})(Ay||(Fa.InlineCompletionRequest=Ay={})),function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.WorkspaceSymbolRequest=t.CodeActionResolveRequest=t.CodeActionRequest=t.DocumentSymbolRequest=t.DocumentHighlightRequest=t.ReferencesRequest=t.DefinitionRequest=t.SignatureHelpRequest=t.SignatureHelpTriggerKind=t.HoverRequest=t.CompletionResolveRequest=t.CompletionRequest=t.CompletionTriggerKind=t.PublishDiagnosticsNotification=t.WatchKind=t.RelativePattern=t.FileChangeType=t.DidChangeWatchedFilesNotification=t.WillSaveTextDocumentWaitUntilRequest=t.WillSaveTextDocumentNotification=t.TextDocumentSaveReason=t.DidSaveTextDocumentNotification=t.DidCloseTextDocumentNotification=t.DidChangeTextDocumentNotification=t.TextDocumentContentChangeEvent=t.DidOpenTextDocumentNotification=t.TextDocumentSyncKind=t.TelemetryEventNotification=t.LogMessageNotification=t.ShowMessageRequest=t.ShowMessageNotification=t.MessageType=t.DidChangeConfigurationNotification=t.ExitNotification=t.ShutdownRequest=t.InitializedNotification=t.InitializeErrorCodes=t.InitializeRequest=t.WorkDoneProgressOptions=t.TextDocumentRegistrationOptions=t.StaticRegistrationOptions=t.PositionEncodingKind=t.FailureHandlingKind=t.ResourceOperationKind=t.UnregistrationRequest=t.RegistrationRequest=t.DocumentSelector=t.NotebookCellTextDocumentFilter=t.NotebookDocumentFilter=t.TextDocumentFilter=void 0,t.MonikerRequest=t.MonikerKind=t.UniquenessLevel=t.WillDeleteFilesRequest=t.DidDeleteFilesNotification=t.WillRenameFilesRequest=t.DidRenameFilesNotification=t.WillCreateFilesRequest=t.DidCreateFilesNotification=t.FileOperationPatternKind=t.LinkedEditingRangeRequest=t.ShowDocumentRequest=t.SemanticTokensRegistrationType=t.SemanticTokensRefreshRequest=t.SemanticTokensRangeRequest=t.SemanticTokensDeltaRequest=t.SemanticTokensRequest=t.TokenFormat=t.CallHierarchyPrepareRequest=t.CallHierarchyOutgoingCallsRequest=t.CallHierarchyIncomingCallsRequest=t.WorkDoneProgressCancelNotification=t.WorkDoneProgressCreateRequest=t.WorkDoneProgress=t.SelectionRangeRequest=t.DeclarationRequest=t.FoldingRangeRefreshRequest=t.FoldingRangeRequest=t.ColorPresentationRequest=t.DocumentColorRequest=t.ConfigurationRequest=t.DidChangeWorkspaceFoldersNotification=t.WorkspaceFoldersRequest=t.TypeDefinitionRequest=t.ImplementationRequest=t.ApplyWorkspaceEditRequest=t.ExecuteCommandRequest=t.PrepareRenameRequest=t.RenameRequest=t.PrepareSupportDefaultBehavior=t.DocumentOnTypeFormattingRequest=t.DocumentRangesFormattingRequest=t.DocumentRangeFormattingRequest=t.DocumentFormattingRequest=t.DocumentLinkResolveRequest=t.DocumentLinkRequest=t.CodeLensRefreshRequest=t.CodeLensResolveRequest=t.CodeLensRequest=t.WorkspaceSymbolResolveRequest=void 0,t.InlineCompletionRequest=t.DidCloseNotebookDocumentNotification=t.DidSaveNotebookDocumentNotification=t.DidChangeNotebookDocumentNotification=t.NotebookCellArrayChange=t.DidOpenNotebookDocumentNotification=t.NotebookDocumentSyncRegistrationType=t.NotebookDocument=t.NotebookCell=t.ExecutionSummary=t.NotebookCellKind=t.DiagnosticRefreshRequest=t.WorkspaceDiagnosticRequest=t.DocumentDiagnosticRequest=t.DocumentDiagnosticReportKind=t.DiagnosticServerCancellationData=t.InlayHintRefreshRequest=t.InlayHintResolveRequest=t.InlayHintRequest=t.InlineValueRefreshRequest=t.InlineValueRequest=t.TypeHierarchySupertypesRequest=t.TypeHierarchySubtypesRequest=t.TypeHierarchyPrepareRequest=void 0;const e=J,n=qd,r=Ee,i=wa;Object.defineProperty(t,"ImplementationRequest",{enumerable:!0,get:function(){return i.ImplementationRequest}});const s=ka;Object.defineProperty(t,"TypeDefinitionRequest",{enumerable:!0,get:function(){return s.TypeDefinitionRequest}});const o=Lr;Object.defineProperty(t,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return o.WorkspaceFoldersRequest}}),Object.defineProperty(t,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return o.DidChangeWorkspaceFoldersNotification}});const a=Aa;Object.defineProperty(t,"ConfigurationRequest",{enumerable:!0,get:function(){return a.ConfigurationRequest}});const c=Mr;Object.defineProperty(t,"DocumentColorRequest",{enumerable:!0,get:function(){return c.DocumentColorRequest}}),Object.defineProperty(t,"ColorPresentationRequest",{enumerable:!0,get:function(){return c.ColorPresentationRequest}});const u=Fr;Object.defineProperty(t,"FoldingRangeRequest",{enumerable:!0,get:function(){return u.FoldingRangeRequest}}),Object.defineProperty(t,"FoldingRangeRefreshRequest",{enumerable:!0,get:function(){return u.FoldingRangeRefreshRequest}});const l=$a;Object.defineProperty(t,"DeclarationRequest",{enumerable:!0,get:function(){return l.DeclarationRequest}});const d=Ia;Object.defineProperty(t,"SelectionRangeRequest",{enumerable:!0,get:function(){return d.SelectionRangeRequest}});const f=qn;Object.defineProperty(t,"WorkDoneProgress",{enumerable:!0,get:function(){return f.WorkDoneProgress}}),Object.defineProperty(t,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return f.WorkDoneProgressCreateRequest}}),Object.defineProperty(t,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return f.WorkDoneProgressCancelNotification}});const h=Hn;Object.defineProperty(t,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return h.CallHierarchyIncomingCallsRequest}}),Object.defineProperty(t,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return h.CallHierarchyOutgoingCallsRequest}}),Object.defineProperty(t,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return h.CallHierarchyPrepareRequest}});const v=pt;Object.defineProperty(t,"TokenFormat",{enumerable:!0,get:function(){return v.TokenFormat}}),Object.defineProperty(t,"SemanticTokensRequest",{enumerable:!0,get:function(){return v.SemanticTokensRequest}}),Object.defineProperty(t,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return v.SemanticTokensDeltaRequest}}),Object.defineProperty(t,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return v.SemanticTokensRangeRequest}}),Object.defineProperty(t,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return v.SemanticTokensRefreshRequest}}),Object.defineProperty(t,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return v.SemanticTokensRegistrationType}});const S=Oa;Object.defineProperty(t,"ShowDocumentRequest",{enumerable:!0,get:function(){return S.ShowDocumentRequest}});const w=xa;Object.defineProperty(t,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return w.LinkedEditingRangeRequest}});const R=et;Object.defineProperty(t,"FileOperationPatternKind",{enumerable:!0,get:function(){return R.FileOperationPatternKind}}),Object.defineProperty(t,"DidCreateFilesNotification",{enumerable:!0,get:function(){return R.DidCreateFilesNotification}}),Object.defineProperty(t,"WillCreateFilesRequest",{enumerable:!0,get:function(){return R.WillCreateFilesRequest}}),Object.defineProperty(t,"DidRenameFilesNotification",{enumerable:!0,get:function(){return R.DidRenameFilesNotification}}),Object.defineProperty(t,"WillRenameFilesRequest",{enumerable:!0,get:function(){return R.WillRenameFilesRequest}}),Object.defineProperty(t,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return R.DidDeleteFilesNotification}}),Object.defineProperty(t,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return R.WillDeleteFilesRequest}});const m=Un;Object.defineProperty(t,"UniquenessLevel",{enumerable:!0,get:function(){return m.UniquenessLevel}}),Object.defineProperty(t,"MonikerKind",{enumerable:!0,get:function(){return m.MonikerKind}}),Object.defineProperty(t,"MonikerRequest",{enumerable:!0,get:function(){return m.MonikerRequest}});const y=Gn;Object.defineProperty(t,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return y.TypeHierarchyPrepareRequest}}),Object.defineProperty(t,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return y.TypeHierarchySubtypesRequest}}),Object.defineProperty(t,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return y.TypeHierarchySupertypesRequest}});const _=Hr;Object.defineProperty(t,"InlineValueRequest",{enumerable:!0,get:function(){return _.InlineValueRequest}}),Object.defineProperty(t,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return _.InlineValueRefreshRequest}});const M=Wn;Object.defineProperty(t,"InlayHintRequest",{enumerable:!0,get:function(){return M.InlayHintRequest}}),Object.defineProperty(t,"InlayHintResolveRequest",{enumerable:!0,get:function(){return M.InlayHintResolveRequest}}),Object.defineProperty(t,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return M.InlayHintRefreshRequest}});const K=$t;Object.defineProperty(t,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return K.DiagnosticServerCancellationData}}),Object.defineProperty(t,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return K.DocumentDiagnosticReportKind}}),Object.defineProperty(t,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return K.DocumentDiagnosticRequest}}),Object.defineProperty(t,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return K.WorkspaceDiagnosticRequest}}),Object.defineProperty(t,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return K.DiagnosticRefreshRequest}});const Q=we;Object.defineProperty(t,"NotebookCellKind",{enumerable:!0,get:function(){return Q.NotebookCellKind}}),Object.defineProperty(t,"ExecutionSummary",{enumerable:!0,get:function(){return Q.ExecutionSummary}}),Object.defineProperty(t,"NotebookCell",{enumerable:!0,get:function(){return Q.NotebookCell}}),Object.defineProperty(t,"NotebookDocument",{enumerable:!0,get:function(){return Q.NotebookDocument}}),Object.defineProperty(t,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Q.NotebookDocumentSyncRegistrationType}}),Object.defineProperty(t,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Q.DidOpenNotebookDocumentNotification}}),Object.defineProperty(t,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Q.NotebookCellArrayChange}}),Object.defineProperty(t,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Q.DidChangeNotebookDocumentNotification}}),Object.defineProperty(t,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Q.DidSaveNotebookDocumentNotification}}),Object.defineProperty(t,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Q.DidCloseNotebookDocumentNotification}});const pe=Fa;Object.defineProperty(t,"InlineCompletionRequest",{enumerable:!0,get:function(){return pe.InlineCompletionRequest}});var ve;(function(p){function $e(Ie){const B=Ie;return r.string(B)||r.string(B.language)||r.string(B.scheme)||r.string(B.pattern)}p.is=$e})(ve||(t.TextDocumentFilter=ve={}));var Te;(function(p){function $e(Ie){const B=Ie;return r.objectLiteral(B)&&(r.string(B.notebookType)||r.string(B.scheme)||r.string(B.pattern))}p.is=$e})(Te||(t.NotebookDocumentFilter=Te={}));var P;(function(p){function $e(Ie){const B=Ie;return r.objectLiteral(B)&&(r.string(B.notebook)||Te.is(B.notebook))&&(B.language===void 0||r.string(B.language))}p.is=$e})(P||(t.NotebookCellTextDocumentFilter=P={}));var E;(function(p){function $e(Ie){if(!Array.isArray(Ie))return!1;for(let B of Ie)if(!r.string(B)&&!ve.is(B)&&!P.is(B))return!1;return!0}p.is=$e})(E||(t.DocumentSelector=E={}));var T;(function(p){p.method="client/registerCapability",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolRequestType(p.method)})(T||(t.RegistrationRequest=T={}));var k;(function(p){p.method="client/unregisterCapability",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolRequestType(p.method)})(k||(t.UnregistrationRequest=k={}));var I;(function(p){p.Create="create",p.Rename="rename",p.Delete="delete"})(I||(t.ResourceOperationKind=I={}));var N;(function(p){p.Abort="abort",p.Transactional="transactional",p.TextOnlyTransactional="textOnlyTransactional",p.Undo="undo"})(N||(t.FailureHandlingKind=N={}));var $;(function(p){p.UTF8="utf-8",p.UTF16="utf-16",p.UTF32="utf-32"})($||(t.PositionEncodingKind=$={}));var L;(function(p){function $e(Ie){const B=Ie;return B&&r.string(B.id)&&B.id.length>0}p.hasId=$e})(L||(t.StaticRegistrationOptions=L={}));var A;(function(p){function $e(Ie){const B=Ie;return B&&(B.documentSelector===null||E.is(B.documentSelector))}p.is=$e})(A||(t.TextDocumentRegistrationOptions=A={}));var V;(function(p){function $e(B){const g=B;return r.objectLiteral(g)&&(g.workDoneProgress===void 0||r.boolean(g.workDoneProgress))}p.is=$e;function Ie(B){const g=B;return g&&r.boolean(g.workDoneProgress)}p.hasWorkDoneProgress=Ie})(V||(t.WorkDoneProgressOptions=V={}));var nt;(function(p){p.method="initialize",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(nt||(t.InitializeRequest=nt={}));var tn;(function(p){p.unknownProtocolVersion=1})(tn||(t.InitializeErrorCodes=tn={}));var nn;(function(p){p.method="initialized",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(nn||(t.InitializedNotification=nn={}));var Me;(function(p){p.method="shutdown",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType0(p.method)})(Me||(t.ShutdownRequest=Me={}));var rn;(function(p){p.method="exit",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType0(p.method)})(rn||(t.ExitNotification=rn={}));var me;(function(p){p.method="workspace/didChangeConfiguration",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(me||(t.DidChangeConfigurationNotification=me={}));var qe;(function(p){p.Error=1,p.Warning=2,p.Info=3,p.Log=4,p.Debug=5})(qe||(t.MessageType=qe={}));var Ye;(function(p){p.method="window/showMessage",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolNotificationType(p.method)})(Ye||(t.ShowMessageNotification=Ye={}));var ge;(function(p){p.method="window/showMessageRequest",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolRequestType(p.method)})(ge||(t.ShowMessageRequest=ge={}));var Je;(function(p){p.method="window/logMessage",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolNotificationType(p.method)})(Je||(t.LogMessageNotification=Je={}));var Pe;(function(p){p.method="telemetry/event",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolNotificationType(p.method)})(Pe||(t.TelemetryEventNotification=Pe={}));var Y;(function(p){p.None=0,p.Full=1,p.Incremental=2})(Y||(t.TextDocumentSyncKind=Y={}));var We;(function(p){p.method="textDocument/didOpen",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(We||(t.DidOpenTextDocumentNotification=We={}));var le;(function(p){function $e(B){let g=B;return g!=null&&typeof g.text=="string"&&g.range!==void 0&&(g.rangeLength===void 0||typeof g.rangeLength=="number")}p.isIncremental=$e;function Ie(B){let g=B;return g!=null&&typeof g.text=="string"&&g.range===void 0&&g.rangeLength===void 0}p.isFull=Ie})(le||(t.TextDocumentContentChangeEvent=le={}));var mt;(function(p){p.method="textDocument/didChange",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(mt||(t.DidChangeTextDocumentNotification=mt={}));var Qr;(function(p){p.method="textDocument/didClose",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(Qr||(t.DidCloseTextDocumentNotification=Qr={}));var Ms;(function(p){p.method="textDocument/didSave",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(Ms||(t.DidSaveTextDocumentNotification=Ms={}));var Fs;(function(p){p.Manual=1,p.AfterDelay=2,p.FocusOut=3})(Fs||(t.TextDocumentSaveReason=Fs={}));var js;(function(p){p.method="textDocument/willSave",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(js||(t.WillSaveTextDocumentNotification=js={}));var qs;(function(p){p.method="textDocument/willSaveWaitUntil",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(qs||(t.WillSaveTextDocumentWaitUntilRequest=qs={}));var Ut;(function(p){p.method="workspace/didChangeWatchedFiles",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolNotificationType(p.method)})(Ut||(t.DidChangeWatchedFilesNotification=Ut={}));var Hs;(function(p){p.Created=1,p.Changed=2,p.Deleted=3})(Hs||(t.FileChangeType=Hs={}));var xc;(function(p){function $e(Ie){const B=Ie;return r.objectLiteral(B)&&(n.URI.is(B.baseUri)||n.WorkspaceFolder.is(B.baseUri))&&r.string(B.pattern)}p.is=$e})(xc||(t.RelativePattern=xc={}));var Lc;(function(p){p.Create=1,p.Change=2,p.Delete=4})(Lc||(t.WatchKind=Lc={}));var Mc;(function(p){p.method="textDocument/publishDiagnostics",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolNotificationType(p.method)})(Mc||(t.PublishDiagnosticsNotification=Mc={}));var Fc;(function(p){p.Invoked=1,p.TriggerCharacter=2,p.TriggerForIncompleteCompletions=3})(Fc||(t.CompletionTriggerKind=Fc={}));var Us;(function(p){p.method="textDocument/completion",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Us||(t.CompletionRequest=Us={}));var Gs;(function(p){p.method="completionItem/resolve",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Gs||(t.CompletionResolveRequest=Gs={}));var An;(function(p){p.method="textDocument/hover",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(An||(t.HoverRequest=An={}));var Ws;(function(p){p.Invoked=1,p.TriggerCharacter=2,p.ContentChange=3})(Ws||(t.SignatureHelpTriggerKind=Ws={}));var jc;(function(p){p.method="textDocument/signatureHelp",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(jc||(t.SignatureHelpRequest=jc={}));var qc;(function(p){p.method="textDocument/definition",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(qc||(t.DefinitionRequest=qc={}));var Bs;(function(p){p.method="textDocument/references",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Bs||(t.ReferencesRequest=Bs={}));var Ks;(function(p){p.method="textDocument/documentHighlight",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Ks||(t.DocumentHighlightRequest=Ks={}));var Hc;(function(p){p.method="textDocument/documentSymbol",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Hc||(t.DocumentSymbolRequest=Hc={}));var Uc;(function(p){p.method="textDocument/codeAction",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Uc||(t.CodeActionRequest=Uc={}));var Gc;(function(p){p.method="codeAction/resolve",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Gc||(t.CodeActionResolveRequest=Gc={}));var Wc;(function(p){p.method="workspace/symbol",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Wc||(t.WorkspaceSymbolRequest=Wc={}));var Bc;(function(p){p.method="workspaceSymbol/resolve",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Bc||(t.WorkspaceSymbolResolveRequest=Bc={}));var Kc;(function(p){p.method="textDocument/codeLens",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Kc||(t.CodeLensRequest=Kc={}));var Gt;(function(p){p.method="codeLens/resolve",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Gt||(t.CodeLensResolveRequest=Gt={}));var zc;(function(p){p.method="workspace/codeLens/refresh",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolRequestType0(p.method)})(zc||(t.CodeLensRefreshRequest=zc={}));var Vc;(function(p){p.method="textDocument/documentLink",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Vc||(t.DocumentLinkRequest=Vc={}));var gr;(function(p){p.method="documentLink/resolve",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(gr||(t.DocumentLinkResolveRequest=gr={}));var Xc;(function(p){p.method="textDocument/formatting",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Xc||(t.DocumentFormattingRequest=Xc={}));var Zr;(function(p){p.method="textDocument/rangeFormatting",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Zr||(t.DocumentRangeFormattingRequest=Zr={}));var Yc;(function(p){p.method="textDocument/rangesFormatting",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Yc||(t.DocumentRangesFormattingRequest=Yc={}));var Nn;(function(p){p.method="textDocument/onTypeFormatting",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Nn||(t.DocumentOnTypeFormattingRequest=Nn={}));var Vn;(function(p){p.Identifier=1})(Vn||(t.PrepareSupportDefaultBehavior=Vn={}));var Jc;(function(p){p.method="textDocument/rename",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Jc||(t.RenameRequest=Jc={}));var Qc;(function(p){p.method="textDocument/prepareRename",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Qc||(t.PrepareRenameRequest=Qc={}));var Xn;(function(p){p.method="workspace/executeCommand",p.messageDirection=e.MessageDirection.clientToServer,p.type=new e.ProtocolRequestType(p.method)})(Xn||(t.ExecuteCommandRequest=Xn={}));var zs;(function(p){p.method="workspace/applyEdit",p.messageDirection=e.MessageDirection.serverToClient,p.type=new e.ProtocolRequestType("workspace/applyEdit")})(zs||(t.ApplyWorkspaceEditRequest=zs={}))}(gg);var ja={};Object.defineProperty(ja,"__esModule",{value:!0}),ja.createProtocolConnection=void 0;const Ny=fr;function oP(t,e,n,r){return Ny.ConnectionStrategy.is(r)&&(r={connectionStrategy:r}),(0,Ny.createMessageConnection)(t,e,n,r)}ja.createProtocolConnection=oP,function(t){var e=xe&&xe.__createBinding||(Object.create?function(s,o,a,c){c===void 0&&(c=a);var u=Object.getOwnPropertyDescriptor(o,a);(!u||("get"in u?!o.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return o[a]}}),Object.defineProperty(s,c,u)}:function(s,o,a,c){c===void 0&&(c=a),s[c]=o[a]}),n=xe&&xe.__exportStar||function(s,o){for(var a in s)a!=="default"&&!Object.prototype.hasOwnProperty.call(o,a)&&e(o,s,a)};Object.defineProperty(t,"__esModule",{value:!0}),t.LSPErrorCodes=t.createProtocolConnection=void 0,n(fr,t),n(qd,t),n(J,t),n(gg,t);var r=ja;Object.defineProperty(t,"createProtocolConnection",{enumerable:!0,get:function(){return r.createProtocolConnection}});var i;(function(s){s.lspReservedErrorRangeStart=-32899,s.RequestFailed=-32803,s.ServerCancelled=-32802,s.ContentModified=-32801,s.RequestCancelled=-32800,s.lspReservedErrorRangeEnd=-32800})(i||(t.LSPErrorCodes=i={}))}(pg),function(t){var e=xe&&xe.__createBinding||(Object.create?function(s,o,a,c){c===void 0&&(c=a);var u=Object.getOwnPropertyDescriptor(o,a);(!u||("get"in u?!o.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return o[a]}}),Object.defineProperty(s,c,u)}:function(s,o,a,c){c===void 0&&(c=a),s[c]=o[a]}),n=xe&&xe.__exportStar||function(s,o){for(var a in s)a!=="default"&&!Object.prototype.hasOwnProperty.call(o,a)&&e(o,s,a)};Object.defineProperty(t,"__esModule",{value:!0}),t.createProtocolConnection=void 0;const r=hg;n(hg,t),n(pg,t);function i(s,o,a,c){return(0,r.createMessageConnection)(s,o,a,c)}t.createProtocolConnection=i}(oe),Object.defineProperty(Sn,"__esModule",{value:!0}),Sn.SemanticTokensBuilder=Sn.SemanticTokensDiff=Sn.SemanticTokensFeature=void 0;const qa=oe,aP=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(qa.SemanticTokensRefreshRequest.type),on:e=>{const n=qa.SemanticTokensRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))},onDelta:e=>{const n=qa.SemanticTokensDeltaRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))},onRange:e=>{const n=qa.SemanticTokensRangeRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))}}}};Sn.SemanticTokensFeature=aP;class Py{constructor(e,n){this.originalSequence=e,this.modifiedSequence=n}computeDiff(){const e=this.originalSequence.length,n=this.modifiedSequence.length;let r=0;for(;r<n&&r<e&&this.originalSequence[r]===this.modifiedSequence[r];)r++;if(r<n&&r<e){let i=e-1,s=n-1;for(;i>=r&&s>=r&&this.originalSequence[i]===this.modifiedSequence[s];)i--,s--;(i<r||s<r)&&(i++,s++);const o=i-r+1,a=this.modifiedSequence.slice(r,s+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:r,deleteCount:o-1}]:[{start:r,deleteCount:o,data:a}]}else return r<n?[{start:r,deleteCount:0,data:this.modifiedSequence.slice(r)}]:r<e?[{start:r,deleteCount:e-r}]:[]}}Sn.SemanticTokensDiff=Py;class cP{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,n,r,i,s){let o=e,a=n;this._dataLen>0&&(o-=this._prevLine,o===0&&(a-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=a,this._data[this._dataLen++]=r,this._data[this._dataLen++]=i,this._data[this._dataLen++]=s,this._prevLine=e,this._prevChar=n}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Py(this._prevData,this._data).computeDiff()}:this.build()}}Sn.SemanticTokensBuilder=cP;var Ha={};Object.defineProperty(Ha,"__esModule",{value:!0}),Ha.InlineCompletionFeature=void 0;const uP=oe,lP=t=>class extends t{get inlineCompletion(){return{on:e=>this.connection.onRequest(uP.InlineCompletionRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n)))}}};Ha.InlineCompletionFeature=lP;var gs={};Object.defineProperty(gs,"__esModule",{value:!0}),gs.TextDocuments=void 0;const pr=oe;class dP{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new pr.Emitter,this._onDidOpen=new pr.Emitter,this._onDidClose=new pr.Emitter,this._onDidSave=new pr.Emitter,this._onWillSave=new pr.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=pr.TextDocumentSyncKind.Incremental;const n=[];return n.push(e.onDidOpenTextDocument(r=>{const i=r.textDocument,s=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,s);const o=Object.freeze({document:s});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),n.push(e.onDidChangeTextDocument(r=>{const i=r.textDocument,s=r.contentChanges;if(s.length===0)return;const{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,s,o),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),n.push(e.onDidCloseTextDocument(r=>{let i=this._syncedDocuments.get(r.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(r.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),n.push(e.onWillSaveTextDocument(r=>{let i=this._syncedDocuments.get(r.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:r.reason}))})),n.push(e.onWillSaveTextDocumentWaitUntil((r,i)=>{let s=this._syncedDocuments.get(r.textDocument.uri);return s!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:s,reason:r.reason}),i):[]})),n.push(e.onDidSaveTextDocument(r=>{let i=this._syncedDocuments.get(r.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),pr.Disposable.create(()=>{n.forEach(r=>r.dispose())})}}gs.TextDocuments=dP;var mr={};Object.defineProperty(mr,"__esModule",{value:!0}),mr.NotebookDocuments=mr.NotebookSyncFeature=void 0;const It=oe,$y=gs,fP=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(It.DidOpenNotebookDocumentNotification.type,n=>{e(n)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(It.DidChangeNotebookDocumentNotification.type,n=>{e(n)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(It.DidSaveNotebookDocumentNotification.type,n=>{e(n)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(It.DidCloseNotebookDocumentNotification.type,n=>{e(n)})}}};mr.NotebookSyncFeature=fP;class Br{onDidOpenTextDocument(e){return this.openHandler=e,It.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,It.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,It.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Br.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Br.NULL_DISPOSE}onDidSaveTextDocument(){return Br.NULL_DISPOSE}}Br.NULL_DISPOSE=Object.freeze({dispose:()=>{}});class hP{constructor(e){e instanceof $y.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new $y.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new It.Emitter,this._onDidChange=new It.Emitter,this._onDidSave=new It.Emitter,this._onDidClose=new It.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){const n=this.notebookCellMap.get(e);return n&&n[0]}findNotebookDocumentForCell(e){const n=typeof e=="string"?e:e.document,r=this.notebookCellMap.get(n);return r&&r[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){const n=new Br,r=[];return r.push(this.cellTextDocuments.listen(n)),r.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(const s of i.cellTextDocuments)n.openTextDocument({textDocument:s});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),r.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{const s=this.notebookDocuments.get(i.notebookDocument.uri);if(s===void 0)return;s.version=i.notebookDocument.version;const o=s.metadata;let a=!1;const c=i.change;c.metadata!==void 0&&(a=!0,s.metadata=c.metadata);const u=[],l=[],d=[],f=[];if(c.cells!==void 0){const R=c.cells;if(R.structure!==void 0){const m=R.structure.array;if(s.cells.splice(m.start,m.deleteCount,...m.cells!==void 0?m.cells:[]),R.structure.didOpen!==void 0)for(const y of R.structure.didOpen)n.openTextDocument({textDocument:y}),u.push(y.uri);if(R.structure.didClose)for(const y of R.structure.didClose)n.closeTextDocument({textDocument:y}),l.push(y.uri)}if(R.data!==void 0){const m=new Map(R.data.map(y=>[y.document,y]));for(let y=0;y<=s.cells.length;y++){const _=m.get(s.cells[y].document);if(_!==void 0){const M=s.cells.splice(y,1,_);if(d.push({old:M[0],new:_}),m.delete(_.document),m.size===0)break}}}if(R.textContent!==void 0)for(const m of R.textContent)n.changeTextDocument({textDocument:m.document,contentChanges:m.changes}),f.push(m.document.uri)}this.updateCellMap(s);const h={notebookDocument:s};a&&(h.metadata={old:o,new:s.metadata});const v=[];for(const R of u)v.push(this.getNotebookCell(R));const S=[];for(const R of l)S.push(this.getNotebookCell(R));const w=[];for(const R of f)w.push(this.getNotebookCell(R));(v.length>0||S.length>0||d.length>0||w.length>0)&&(h.cells={added:v,removed:S,changed:{data:d,textContent:w}}),(h.metadata!==void 0||h.cells!==void 0)&&this._onDidChange.fire(h)})),r.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{const s=this.notebookDocuments.get(i.notebookDocument.uri);s!==void 0&&this._onDidSave.fire(s)})),r.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{const s=this.notebookDocuments.get(i.notebookDocument.uri);if(s!==void 0){this._onDidClose.fire(s);for(const o of i.cellTextDocuments)n.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(const o of s.cells)this.notebookCellMap.delete(o.document)}})),It.Disposable.create(()=>{r.forEach(i=>i.dispose())})}updateCellMap(e){for(const n of e.cells)this.notebookCellMap.set(n.document,[n,e])}}mr.NotebookDocuments=hP;var ne={},Ae={};Object.defineProperty(Ae,"__esModule",{value:!0}),Ae.thenable=Ae.typedArray=Ae.stringArray=Ae.array=Ae.func=Ae.error=Ae.number=Ae.string=Ae.boolean=void 0;function pP(t){return t===!0||t===!1}Ae.boolean=pP;function Iy(t){return typeof t=="string"||t instanceof String}Ae.string=Iy;function mP(t){return typeof t=="number"||t instanceof Number}Ae.number=mP;function gP(t){return t instanceof Error}Ae.error=gP;function Dy(t){return typeof t=="function"}Ae.func=Dy;function Oy(t){return Array.isArray(t)}Ae.array=Oy;function yP(t){return Oy(t)&&t.every(e=>Iy(e))}Ae.stringArray=yP;function vP(t,e){return Array.isArray(t)&&t.every(e)}Ae.typedArray=vP;function TP(t){return t&&Dy(t.then)}Ae.thenable=TP;var bt={};Object.defineProperty(bt,"__esModule",{value:!0}),bt.generateUuid=bt.parse=bt.isUUID=bt.v4=bt.empty=void 0;class Gd{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}}class X extends Gd{static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return X._oneOf(X._chars)}constructor(){super([X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),"-",X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),"-","4",X._randomHex(),X._randomHex(),X._randomHex(),"-",X._oneOf(X._timeHighBits),X._randomHex(),X._randomHex(),X._randomHex(),"-",X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex(),X._randomHex()].join(""))}}X._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"],X._timeHighBits=["8","9","a","b"],bt.empty=new Gd("00000000-0000-0000-0000-000000000000");function xy(){return new X}bt.v4=xy;const RP=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Ly(t){return RP.test(t)}bt.isUUID=Ly;function SP(t){if(!Ly(t))throw new Error("invalid uuid");return new Gd(t)}bt.parse=SP;function bP(){return xy().asHex()}bt.generateUuid=bP;var Bn={};Object.defineProperty(Bn,"__esModule",{value:!0}),Bn.attachPartialResult=Bn.ProgressFeature=Bn.attachWorkDone=void 0;const Kn=oe,_P=bt;class zn{constructor(e,n){this._connection=e,this._token=n,zn.Instances.set(this._token,this)}begin(e,n,r,i){let s={kind:"begin",title:e,percentage:n,message:r,cancellable:i};this._connection.sendProgress(Kn.WorkDoneProgress.type,this._token,s)}report(e,n){let r={kind:"report"};typeof e=="number"?(r.percentage=e,n!==void 0&&(r.message=n)):r.message=e,this._connection.sendProgress(Kn.WorkDoneProgress.type,this._token,r)}done(){zn.Instances.delete(this._token),this._connection.sendProgress(Kn.WorkDoneProgress.type,this._token,{kind:"end"})}}zn.Instances=new Map;class My extends zn{constructor(e,n){super(e,n),this._source=new Kn.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}}class Wd{constructor(){}begin(){}report(){}done(){}}class Fy extends Wd{constructor(){super(),this._source=new Kn.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}}function EP(t,e){if(e===void 0||e.workDoneToken===void 0)return new Wd;const n=e.workDoneToken;return delete e.workDoneToken,new zn(t,n)}Bn.attachWorkDone=EP;const wP=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Kn.WorkDoneProgressCancelNotification.type,n=>{let r=zn.Instances.get(n.token);(r instanceof My||r instanceof Fy)&&r.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Wd:new zn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){const e=(0,_P.generateUuid)();return this.connection.sendRequest(Kn.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new My(this.connection,e))}else return Promise.resolve(new Fy)}};Bn.ProgressFeature=wP;var Bd;(function(t){t.type=new Kn.ProgressType})(Bd||(Bd={}));class kP{constructor(e,n){this._connection=e,this._token=n}report(e){this._connection.sendProgress(Bd.type,this._token,e)}}function CP(t,e){if(e===void 0||e.partialResultToken===void 0)return;const n=e.partialResultToken;return delete e.partialResultToken,new kP(t,n)}Bn.attachPartialResult=CP;var Ua={};Object.defineProperty(Ua,"__esModule",{value:!0}),Ua.ConfigurationFeature=void 0;const AP=oe,NP=Ae,PP=t=>class extends t{getConfiguration(e){return e?NP.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let n={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(AP.ConfigurationRequest.type,n).then(r=>Array.isArray(r)?Array.isArray(e)?r:r[0]:Array.isArray(e)?[]:null)}};Ua.ConfigurationFeature=PP;var Ga={};Object.defineProperty(Ga,"__esModule",{value:!0}),Ga.WorkspaceFoldersFeature=void 0;const Wa=oe,$P=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let n=e.workspace;n&&n.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Wa.Emitter,this.connection.onNotification(Wa.DidChangeWorkspaceFoldersNotification.type,r=>{this._onDidChangeWorkspaceFolders.fire(r.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);const n=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=n===!0||typeof n=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Wa.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Wa.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Ga.WorkspaceFoldersFeature=$P;var Ba={};Object.defineProperty(Ba,"__esModule",{value:!0}),Ba.CallHierarchyFeature=void 0;const Kd=oe,IP=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Kd.CallHierarchyPrepareRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n),void 0)),onIncomingCalls:e=>{const n=Kd.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))},onOutgoingCalls:e=>{const n=Kd.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))}}}};Ba.CallHierarchyFeature=IP;var Ka={};Object.defineProperty(Ka,"__esModule",{value:!0}),Ka.ShowDocumentFeature=void 0;const DP=oe,OP=t=>class extends t{showDocument(e){return this.connection.sendRequest(DP.ShowDocumentRequest.type,e)}};Ka.ShowDocumentFeature=OP;var za={};Object.defineProperty(za,"__esModule",{value:!0}),za.FileOperationsFeature=void 0;const Kr=oe,xP=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Kr.DidCreateFilesNotification.type,n=>{e(n)})}onDidRenameFiles(e){return this.connection.onNotification(Kr.DidRenameFilesNotification.type,n=>{e(n)})}onDidDeleteFiles(e){return this.connection.onNotification(Kr.DidDeleteFilesNotification.type,n=>{e(n)})}onWillCreateFiles(e){return this.connection.onRequest(Kr.WillCreateFilesRequest.type,(n,r)=>e(n,r))}onWillRenameFiles(e){return this.connection.onRequest(Kr.WillRenameFilesRequest.type,(n,r)=>e(n,r))}onWillDeleteFiles(e){return this.connection.onRequest(Kr.WillDeleteFilesRequest.type,(n,r)=>e(n,r))}};za.FileOperationsFeature=xP;var Va={};Object.defineProperty(Va,"__esModule",{value:!0}),Va.LinkedEditingRangeFeature=void 0;const LP=oe,MP=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(LP.LinkedEditingRangeRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n),void 0))}};Va.LinkedEditingRangeFeature=MP;var Xa={};Object.defineProperty(Xa,"__esModule",{value:!0}),Xa.TypeHierarchyFeature=void 0;const zd=oe,FP=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(zd.TypeHierarchyPrepareRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n),void 0)),onSupertypes:e=>{const n=zd.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))},onSubtypes:e=>{const n=zd.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))}}}};Xa.TypeHierarchyFeature=FP;var Ya={};Object.defineProperty(Ya,"__esModule",{value:!0}),Ya.InlineValueFeature=void 0;const jy=oe,jP=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(jy.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(jy.InlineValueRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n)))}}};Ya.InlineValueFeature=jP;var Ja={};Object.defineProperty(Ja,"__esModule",{value:!0}),Ja.FoldingRangeFeature=void 0;const qy=oe,qP=t=>class extends t{get foldingRange(){return{refresh:()=>this.connection.sendRequest(qy.FoldingRangeRefreshRequest.type),on:e=>{const n=qy.FoldingRangeRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))}}}};Ja.FoldingRangeFeature=qP;var Qa={};Object.defineProperty(Qa,"__esModule",{value:!0}),Qa.InlayHintFeature=void 0;const Vd=oe,HP=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Vd.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Vd.InlayHintRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n))),resolve:e=>this.connection.onRequest(Vd.InlayHintResolveRequest.type,(n,r)=>e(n,r))}}};Qa.InlayHintFeature=HP;var Za={};Object.defineProperty(Za,"__esModule",{value:!0}),Za.DiagnosticFeature=void 0;const ys=oe,UP=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(ys.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(ys.DocumentDiagnosticRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(ys.DocumentDiagnosticRequest.partialResult,n))),onWorkspace:e=>this.connection.onRequest(ys.WorkspaceDiagnosticRequest.type,(n,r)=>e(n,r,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(ys.WorkspaceDiagnosticRequest.partialResult,n)))}}};Za.DiagnosticFeature=UP;var ec={};Object.defineProperty(ec,"__esModule",{value:!0}),ec.MonikerFeature=void 0;const GP=oe,WP=t=>class extends t{get moniker(){return{on:e=>{const n=GP.MonikerRequest.type;return this.connection.onRequest(n,(r,i)=>e(r,i,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(n,r)))}}}};ec.MonikerFeature=WP,Object.defineProperty(ne,"__esModule",{value:!0}),ne.createConnection=ne.combineFeatures=ne.combineNotebooksFeatures=ne.combineLanguagesFeatures=ne.combineWorkspaceFeatures=ne.combineWindowFeatures=ne.combineClientFeatures=ne.combineTracerFeatures=ne.combineTelemetryFeatures=ne.combineConsoleFeatures=ne._NotebooksImpl=ne._LanguagesImpl=ne.BulkUnregistration=ne.BulkRegistration=ne.ErrorMessageTracker=void 0;const O=oe,Dt=Ae,Xd=bt,z=Bn,BP=Ua,KP=Ga,zP=Ba,VP=Sn,XP=Ka,YP=za,JP=Va,QP=Xa,ZP=Ya,e$=Ja,t$=Qa,n$=Za,r$=mr,i$=ec;function Yd(t){if(t!==null)return t}class s${constructor(){this._messages=Object.create(null)}add(e){let n=this._messages[e];n||(n=0),n++,this._messages[e]=n}sendErrors(e){Object.keys(this._messages).forEach(n=>{e.window.showErrorMessage(n)})}}ne.ErrorMessageTracker=s$;class Hy{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(O.MessageType.Error,e)}warn(e){this.send(O.MessageType.Warning,e)}info(e){this.send(O.MessageType.Info,e)}log(e){this.send(O.MessageType.Log,e)}debug(e){this.send(O.MessageType.Debug,e)}send(e,n){this._rawConnection&&this._rawConnection.sendNotification(O.LogMessageNotification.type,{type:e,message:n}).catch(()=>{(0,O.RAL)().console.error("Sending log message failed")})}}class o${constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...n){let r={type:O.MessageType.Error,message:e,actions:n};return this.connection.sendRequest(O.ShowMessageRequest.type,r).then(Yd)}showWarningMessage(e,...n){let r={type:O.MessageType.Warning,message:e,actions:n};return this.connection.sendRequest(O.ShowMessageRequest.type,r).then(Yd)}showInformationMessage(e,...n){let r={type:O.MessageType.Info,message:e,actions:n};return this.connection.sendRequest(O.ShowMessageRequest.type,r).then(Yd)}}const Uy=(0,XP.ShowDocumentFeature)((0,z.ProgressFeature)(o$));var Gy;(function(t){function e(){return new Wy}t.create=e})(Gy||(ne.BulkRegistration=Gy={}));class Wy{constructor(){this._registrations=[],this._registered=new Set}add(e,n){const r=Dt.string(e)?e:e.method;if(this._registered.has(r))throw new Error(`${r} is already added to this registration`);const i=Xd.generateUuid();this._registrations.push({id:i,method:r,registerOptions:n||{}}),this._registered.add(r)}asRegistrationParams(){return{registrations:this._registrations}}}var By;(function(t){function e(){return new Jd(void 0,[])}t.create=e})(By||(ne.BulkUnregistration=By={}));class Jd{constructor(e,n){this._connection=e,this._unregistrations=new Map,n.forEach(r=>{this._unregistrations.set(r.method,r)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let r of this._unregistrations.values())e.push(r);let n={unregisterations:e};this._connection.sendRequest(O.UnregistrationRequest.type,n).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){const n=Dt.string(e)?e:e.method,r=this._unregistrations.get(n);if(!r)return!1;let i={unregisterations:[r]};return this._connection.sendRequest(O.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(n)},s=>{this._connection.console.info(`Un-registering request handler for ${r.id} failed.`)}),!0}}class Ky{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,n,r){return e instanceof Wy?this.registerMany(e):e instanceof Jd?this.registerSingle1(e,n,r):this.registerSingle2(e,n)}registerSingle1(e,n,r){const i=Dt.string(n)?n:n.method,s=Xd.generateUuid();let o={registrations:[{id:s,method:i,registerOptions:r||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(O.RegistrationRequest.type,o).then(a=>(e.add({id:s,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,n){const r=Dt.string(e)?e:e.method,i=Xd.generateUuid();let s={registrations:[{id:i,method:r,registerOptions:n||{}}]};return this.connection.sendRequest(O.RegistrationRequest.type,s).then(o=>O.Disposable.create(()=>{this.unregisterSingle(i,r).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${r} failed.`),Promise.reject(o)))}unregisterSingle(e,n){let r={unregisterations:[{id:e,method:n}]};return this.connection.sendRequest(O.UnregistrationRequest.type,r).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let n=e.asRegistrationParams();return this.connection.sendRequest(O.RegistrationRequest.type,n).then(()=>new Jd(this._connection,n.registrations.map(r=>({id:r.id,method:r.method}))),r=>(this.connection.console.info("Bulk registration failed."),Promise.reject(r)))}}class a${constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function n(i){return i&&!!i.edit}let r=n(e)?e:{edit:e};return this.connection.sendRequest(O.ApplyWorkspaceEditRequest.type,r)}}const zy=(0,YP.FileOperationsFeature)((0,KP.WorkspaceFoldersFeature)((0,BP.ConfigurationFeature)(a$)));class Vy{constructor(){this._trace=O.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,n){this._trace!==O.Trace.Off&&this.connection.sendNotification(O.LogTraceNotification.type,{message:e,verbose:this._trace===O.Trace.Verbose?n:void 0}).catch(()=>{})}}class Xy{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(O.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}}class Yy{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,z.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,n){return(0,z.attachPartialResult)(this.connection,n)}}ne._LanguagesImpl=Yy;const Jy=(0,e$.FoldingRangeFeature)((0,i$.MonikerFeature)((0,n$.DiagnosticFeature)((0,t$.InlayHintFeature)((0,ZP.InlineValueFeature)((0,QP.TypeHierarchyFeature)((0,JP.LinkedEditingRangeFeature)((0,VP.SemanticTokensFeature)((0,zP.CallHierarchyFeature)(Yy)))))))));class Qy{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,z.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,n){return(0,z.attachPartialResult)(this.connection,n)}}ne._NotebooksImpl=Qy;const Zy=(0,r$.NotebookSyncFeature)(Qy);function ev(t,e){return function(n){return e(t(n))}}ne.combineConsoleFeatures=ev;function tv(t,e){return function(n){return e(t(n))}}ne.combineTelemetryFeatures=tv;function nv(t,e){return function(n){return e(t(n))}}ne.combineTracerFeatures=nv;function rv(t,e){return function(n){return e(t(n))}}ne.combineClientFeatures=rv;function iv(t,e){return function(n){return e(t(n))}}ne.combineWindowFeatures=iv;function sv(t,e){return function(n){return e(t(n))}}ne.combineWorkspaceFeatures=sv;function ov(t,e){return function(n){return e(t(n))}}ne.combineLanguagesFeatures=ov;function av(t,e){return function(n){return e(t(n))}}ne.combineNotebooksFeatures=av;function c$(t,e){function n(i,s,o){return i&&s?o(i,s):i||s}return{__brand:"features",console:n(t.console,e.console,ev),tracer:n(t.tracer,e.tracer,nv),telemetry:n(t.telemetry,e.telemetry,tv),client:n(t.client,e.client,rv),window:n(t.window,e.window,iv),workspace:n(t.workspace,e.workspace,sv),languages:n(t.languages,e.languages,ov),notebooks:n(t.notebooks,e.notebooks,av)}}ne.combineFeatures=c$;function u$(t,e,n){const r=n&&n.console?new(n.console(Hy)):new Hy,i=t(r);r.rawAttach(i);const s=n&&n.tracer?new(n.tracer(Vy)):new Vy,o=n&&n.telemetry?new(n.telemetry(Xy)):new Xy,a=n&&n.client?new(n.client(Ky)):new Ky,c=n&&n.window?new(n.window(Uy)):new Uy,u=n&&n.workspace?new(n.workspace(zy)):new zy,l=n&&n.languages?new(n.languages(Jy)):new Jy,d=n&&n.notebooks?new(n.notebooks(Zy)):new Zy,f=[r,s,o,a,c,u,l,d];function h(m){return m instanceof Promise?m:Dt.thenable(m)?new Promise((y,_)=>{m.then(M=>y(M),M=>_(M))}):Promise.resolve(m)}let v,S,w,R={listen:()=>i.listen(),sendRequest:(m,...y)=>i.sendRequest(Dt.string(m)?m:m.method,...y),onRequest:(m,y)=>i.onRequest(m,y),sendNotification:(m,y)=>{const _=Dt.string(m)?m:m.method;return i.sendNotification(_,y)},onNotification:(m,y)=>i.onNotification(m,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:m=>(S=m,{dispose:()=>{S=void 0}}),onInitialized:m=>i.onNotification(O.InitializedNotification.type,m),onShutdown:m=>(v=m,{dispose:()=>{v=void 0}}),onExit:m=>(w=m,{dispose:()=>{w=void 0}}),get console(){return r},get telemetry(){return o},get tracer(){return s},get client(){return a},get window(){return c},get workspace(){return u},get languages(){return l},get notebooks(){return d},onDidChangeConfiguration:m=>i.onNotification(O.DidChangeConfigurationNotification.type,m),onDidChangeWatchedFiles:m=>i.onNotification(O.DidChangeWatchedFilesNotification.type,m),__textDocumentSync:void 0,onDidOpenTextDocument:m=>i.onNotification(O.DidOpenTextDocumentNotification.type,m),onDidChangeTextDocument:m=>i.onNotification(O.DidChangeTextDocumentNotification.type,m),onDidCloseTextDocument:m=>i.onNotification(O.DidCloseTextDocumentNotification.type,m),onWillSaveTextDocument:m=>i.onNotification(O.WillSaveTextDocumentNotification.type,m),onWillSaveTextDocumentWaitUntil:m=>i.onRequest(O.WillSaveTextDocumentWaitUntilRequest.type,m),onDidSaveTextDocument:m=>i.onNotification(O.DidSaveTextDocumentNotification.type,m),sendDiagnostics:m=>i.sendNotification(O.PublishDiagnosticsNotification.type,m),onHover:m=>i.onRequest(O.HoverRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),onCompletion:m=>i.onRequest(O.CompletionRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onCompletionResolve:m=>i.onRequest(O.CompletionResolveRequest.type,m),onSignatureHelp:m=>i.onRequest(O.SignatureHelpRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),onDeclaration:m=>i.onRequest(O.DeclarationRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onDefinition:m=>i.onRequest(O.DefinitionRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onTypeDefinition:m=>i.onRequest(O.TypeDefinitionRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onImplementation:m=>i.onRequest(O.ImplementationRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onReferences:m=>i.onRequest(O.ReferencesRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onDocumentHighlight:m=>i.onRequest(O.DocumentHighlightRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onDocumentSymbol:m=>i.onRequest(O.DocumentSymbolRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onWorkspaceSymbol:m=>i.onRequest(O.WorkspaceSymbolRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:m=>i.onRequest(O.WorkspaceSymbolResolveRequest.type,m),onCodeAction:m=>i.onRequest(O.CodeActionRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onCodeActionResolve:m=>i.onRequest(O.CodeActionResolveRequest.type,(y,_)=>m(y,_)),onCodeLens:m=>i.onRequest(O.CodeLensRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onCodeLensResolve:m=>i.onRequest(O.CodeLensResolveRequest.type,(y,_)=>m(y,_)),onDocumentFormatting:m=>i.onRequest(O.DocumentFormattingRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:m=>i.onRequest(O.DocumentRangeFormattingRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:m=>i.onRequest(O.DocumentOnTypeFormattingRequest.type,(y,_)=>m(y,_)),onRenameRequest:m=>i.onRequest(O.RenameRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),onPrepareRename:m=>i.onRequest(O.PrepareRenameRequest.type,(y,_)=>m(y,_)),onDocumentLinks:m=>i.onRequest(O.DocumentLinkRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onDocumentLinkResolve:m=>i.onRequest(O.DocumentLinkResolveRequest.type,(y,_)=>m(y,_)),onDocumentColor:m=>i.onRequest(O.DocumentColorRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onColorPresentation:m=>i.onRequest(O.ColorPresentationRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onFoldingRanges:m=>i.onRequest(O.FoldingRangeRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onSelectionRanges:m=>i.onRequest(O.SelectionRangeRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),(0,z.attachPartialResult)(i,y))),onExecuteCommand:m=>i.onRequest(O.ExecuteCommandRequest.type,(y,_)=>m(y,_,(0,z.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let m of f)m.attach(R);return i.onRequest(O.InitializeRequest.type,m=>{e.initialize(m),Dt.string(m.trace)&&(s.trace=O.Trace.fromString(m.trace));for(let y of f)y.initialize(m.capabilities);if(S){let y=S(m,new O.CancellationTokenSource().token,(0,z.attachWorkDone)(i,m),void 0);return h(y).then(_=>{if(_ instanceof O.ResponseError)return _;let M=_;M||(M={capabilities:{}});let K=M.capabilities;K||(K={},M.capabilities=K),K.textDocumentSync===void 0||K.textDocumentSync===null?K.textDocumentSync=Dt.number(R.__textDocumentSync)?R.__textDocumentSync:O.TextDocumentSyncKind.None:!Dt.number(K.textDocumentSync)&&!Dt.number(K.textDocumentSync.change)&&(K.textDocumentSync.change=Dt.number(R.__textDocumentSync)?R.__textDocumentSync:O.TextDocumentSyncKind.None);for(let Q of f)Q.fillServerCapabilities(K);return M})}else{let y={capabilities:{textDocumentSync:O.TextDocumentSyncKind.None}};for(let _ of f)_.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(O.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,v)return v(new O.CancellationTokenSource().token)}),i.onNotification(O.ExitNotification.type,()=>{try{w&&w()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(O.SetTraceNotification.type,m=>{s.trace=O.Trace.fromString(m.value)}),R}ne.createConnection=u$,function(t){var e=xe&&xe.__createBinding||(Object.create?function(c,u,l,d){d===void 0&&(d=l);var f=Object.getOwnPropertyDescriptor(u,l);(!f||("get"in f?!u.__esModule:f.writable||f.configurable))&&(f={enumerable:!0,get:function(){return u[l]}}),Object.defineProperty(c,d,f)}:function(c,u,l,d){d===void 0&&(d=l),c[d]=u[l]}),n=xe&&xe.__exportStar||function(c,u){for(var l in c)l!=="default"&&!Object.prototype.hasOwnProperty.call(u,l)&&e(u,c,l)};Object.defineProperty(t,"__esModule",{value:!0}),t.ProposedFeatures=t.NotebookDocuments=t.TextDocuments=t.SemanticTokensBuilder=void 0;const r=Sn;Object.defineProperty(t,"SemanticTokensBuilder",{enumerable:!0,get:function(){return r.SemanticTokensBuilder}});const i=Ha;n(oe,t);const s=gs;Object.defineProperty(t,"TextDocuments",{enumerable:!0,get:function(){return s.TextDocuments}});const o=mr;Object.defineProperty(t,"NotebookDocuments",{enumerable:!0,get:function(){return o.NotebookDocuments}}),n(ne,t);var a;(function(c){c.all={__brand:"features",languages:i.InlineCompletionFeature}})(a||(t.ProposedFeatures=a={}))}(Od);var l$=oe;(function(t){var e=xe&&xe.__createBinding||(Object.create?function(a,c,u,l){l===void 0&&(l=u);var d=Object.getOwnPropertyDescriptor(c,u);(!d||("get"in d?!c.__esModule:d.writable||d.configurable))&&(d={enumerable:!0,get:function(){return c[u]}}),Object.defineProperty(a,l,d)}:function(a,c,u,l){l===void 0&&(l=u),a[l]=c[u]}),n=xe&&xe.__exportStar||function(a,c){for(var u in a)u!=="default"&&!Object.prototype.hasOwnProperty.call(c,u)&&e(c,a,u)};Object.defineProperty(t,"__esModule",{value:!0}),t.createConnection=void 0;const r=Od;n(l$,t),n(Od,t);let i=!1;const s={initialize:a=>{},get shutdownReceived(){return i},set shutdownReceived(a){i=a},exit:a=>{}};function o(a,c,u,l){let d,f,h,v;a!==void 0&&a.__brand==="features"&&(d=a,a=c,c=u,u=l),r.ConnectionStrategy.is(a)||r.ConnectionOptions.is(a)?v=a:(f=a,h=c,v=u);const S=w=>(0,r.createProtocolConnection)(f,h,w,v);return(0,r.createConnection)(S,s,d)}t.createConnection=o})(G);function cv(t,e){const n={stacks:t,tokens:e};return d$(n),n.stacks.flat().forEach(i=>{i.property=void 0}),lv(n.stacks).map(i=>i[i.length-1])}function Qd(t){const{next:e,cardinalities:n,visited:r,plus:i}=t,s=[],o=e.feature;if(r.has(o))return[];r.add(o);let a,c=o;for(;c.$container;)if(Qn(c.$container)){a=c.$container;break}else if(vf(c.$container))c=c.$container;else break;if(bT(c.cardinality)){const u=zr({next:{feature:c,type:e.type},cardinalities:n,visited:r,plus:i});for(const l of u)i.add(l.feature);s.push(...u)}if(a){const u=a.elements.indexOf(c);u!==void 0&&u<a.elements.length-1&&s.push(...uv({feature:a,type:e.type},u+1,n,r,i)),s.every(l=>Ii(l.feature.cardinality,l.feature)||Ii(n.get(l.feature))||i.has(l.feature))&&s.push(...Qd({next:{feature:a,type:e.type},cardinalities:n,visited:r,plus:i}))}return s}function Zd(t){return Be(t)&&(t={feature:t}),zr({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function zr(t){var e,n,r;const{next:i,cardinalities:s,visited:o,plus:a}=t;if(i===void 0)return[];const{feature:c,type:u}=i;if(Qn(c)){if(o.has(c))return[];o.add(c)}if(Qn(c))return uv(i,0,s,o,a).map(l=>tc(l,c.cardinality,s));if(au(c)||cu(c))return c.elements.flatMap(l=>zr({next:{feature:l,type:u,property:i.property},cardinalities:s,visited:o,plus:a})).map(l=>tc(l,c.cardinality,s));if(Bt(c)){const l={feature:c.terminal,type:u,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return zr({next:l,cardinalities:s,visited:o,plus:a}).map(d=>tc(d,c.cardinality,s))}else{if(hi(c))return Qd({next:{feature:c,type:vo(c),property:(n=i.property)!==null&&n!==void 0?n:c.feature},cardinalities:s,visited:o,plus:a});if(cn(c)&&Qe(c.rule.ref)){const l=c.rule.ref,d={feature:l.definition,type:l.fragment||l.dataType?void 0:(r=Di(l))!==null&&r!==void 0?r:l.name,property:i.property};return zr({next:d,cardinalities:s,visited:o,plus:a}).map(f=>tc(f,c.cardinality,s))}else return[i]}}function tc(t,e,n){return n.set(t.feature,e),t}function uv(t,e,n,r,i){var s;const o=[];let a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],type:t.type},o.push(...zr({next:a,cardinalities:n,visited:r,plus:i})),!!Ii((s=a.feature.cardinality)!==null&&s!==void 0?s:n.get(a.feature),a.feature)););return o}function d$(t){for(const e of t.tokens){const n=lv(t.stacks,e);t.stacks=n}}function lv(t,e){const n=[];for(const r of t)n.push(...f$(r,e));return n}function f$(t,e){const n=new Map,r=new Set(t.map(s=>s.feature).filter(h$)),i=[];for(;t.length>0;){const s=t.pop(),o=Qd({next:s,cardinalities:n,plus:r,visited:new Set}).filter(a=>e?ef(a.feature,e):!0);for(const a of o)i.push([...t,a]);if(!o.every(a=>Ii(a.feature.cardinality,a.feature)||Ii(n.get(a.feature))))break}return i}function h$(t){if(t.cardinality==="+")return!0;const e=rt(t,Bt);return!!(e&&e.cardinality==="+")}function ef(t,e){if(Kt(t))return t.value===e.image;if(cn(t))return p$(t.rule.ref,e);if(vi(t)){const n=Df(t);if(n)return ef(n,e)}return!1}function p$(t,e){return Qe(t)?Zd(t.definition).some(r=>ef(r.feature,e)):Pn(t)?To(t).test(e.image):!1}function m$(t){const e=Array.from(new Set(t.flatMap(r=>{var i;return(i=r?.triggerCharacters)!==null&&i!==void 0?i:[]}))),n=Array.from(new Set(t.flatMap(r=>{var i;return(i=r?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:n.length>0?n:void 0}}class g${constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig,this.astReflection=e.shared.AstReflection,this.documentationProvider=e.documentation.DocumentationProvider}async getCompletion(e,n){const r=[],i=this.buildContexts(e,n.position),s=(c,u)=>{const l=this.fillCompletionItem(c,u);l&&r.push(l)},o=c=>Kt(c.feature)?c.feature.value:c.feature,a=[];for(const c of i)if(await Promise.all(Se(c.features).distinct(o).exclude(a).map(u=>this.completionFor(c,u,s))),a.push(...c.features),!this.continueCompletion(r))break;return G.CompletionList.create(this.deduplicateItems(r),!0)}deduplicateItems(e){return Se(e).distinct(n=>`${n.kind}_${n.label}_${n.detail}`).toArray()}findFeaturesAt(e,n){const r=e.getText({start:G.Position.create(0,0),end:e.positionAt(n)}),i=this.completionParser.parse(r),s=i.tokens;if(i.tokenIndex===0){const c=du(this.grammar),u=Zd({feature:c.definition,type:Di(c)});return s.length>0?(s.shift(),cv(u.map(l=>[l]),s)):u}const o=[...s].splice(i.tokenIndex);return cv([i.elementStack.map(c=>({feature:c}))],o)}*buildContexts(e,n){var r,i;const s=e.parseResult.value.$cstNode;if(!s)return;const o=e.textDocument,a=o.getText(),c=o.offsetAt(n),u={document:e,textDocument:o,offset:c,position:n},l=this.findDataTypeRuleStart(s,c);if(l){const[m,y]=l,_=(r=tu(s,m))===null||r===void 0?void 0:r.astNode;yield Object.assign(Object.assign({},u),{node:_,tokenOffset:m,tokenEndOffset:y,features:this.findFeaturesAt(o,m)})}const{nextTokenStart:d,nextTokenEnd:f,previousTokenStart:h,previousTokenEnd:v}=this.backtrackToAnyToken(a,c);let S=d;c<=d&&h!==void 0&&(S=h);const w=(i=tu(s,S))===null||i===void 0?void 0:i.astNode;let R=!0;if(h!==void 0&&v!==void 0&&v===c&&(yield Object.assign(Object.assign({},u),{node:w,tokenOffset:h,tokenEndOffset:v,features:this.findFeaturesAt(o,h)}),R=this.performNextTokenCompletion(e,a.substring(h,v),h,v),R&&(yield Object.assign(Object.assign({},u),{node:w,tokenOffset:v,tokenEndOffset:v,features:this.findFeaturesAt(o,v)}))),w)R&&(yield Object.assign(Object.assign({},u),{node:w,tokenOffset:d,tokenEndOffset:f,features:this.findFeaturesAt(o,d)}));else{const m=du(this.grammar);if(!m)throw new Error("Missing entry parser rule");yield Object.assign(Object.assign({},u),{tokenOffset:d,tokenEndOffset:f,features:Zd(m.definition)})}}performNextTokenCompletion(e,n,r,i){return/\P{L}$/u.test(n)}findDataTypeRuleStart(e,n){var r,i;let s=Jn(e,n,this.grammarConfig.nameRegexp),o=!!(!((r=rt(s?.grammarSource,Qe))===null||r===void 0)&&r.dataType);if(o){for(;o;)s=s?.container,o=!!(!((i=rt(s?.grammarSource,Qe))===null||i===void 0)&&i.dataType);if(s)return[s.offset,s.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,n){const r=this.lexer.tokenize(e).tokens;if(r.length===0)return{nextTokenStart:n,nextTokenEnd:n};let i;for(const s of r){if(s.startOffset>=n)return{nextTokenStart:n,nextTokenEnd:n,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(s.endOffset>=n)return{nextTokenStart:s.startOffset,nextTokenEnd:s.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=s}return{nextTokenStart:n,nextTokenEnd:n,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}completionFor(e,n,r){if(Kt(n.feature))return this.completionForKeyword(e,n.feature,r);if(vi(n.feature)&&e.node)return this.completionForCrossReference(e,n,r)}completionForCrossReference(e,n,r){const i=rt(n.feature,Bt);let s=e.node;if(i&&s){n.type&&(s={$type:n.type,$container:s,$containerProperty:n.property},wf(this.astReflection,s));const o={reference:{$refText:""},container:s,property:i.feature};try{for(const a of this.getReferenceCandidates(o,e))r(e,this.createReferenceCompletionItem(a))}catch(a){console.error(a)}}}getReferenceCandidates(e,n){return this.scopeProvider.getScope(e).getAllElements()}createReferenceCompletionItem(e){const n=this.nodeKindProvider.getCompletionItemKind(e),r=this.getReferenceDocumentation(e);return{nodeDescription:e,kind:n,documentation:r,detail:e.type,sortText:"0"}}getReferenceDocumentation(e){if(!e.node)return;const n=this.documentationProvider.getDocumentation(e.node);if(n)return{kind:"markdown",value:n}}completionForKeyword(e,n,r){this.filterKeyword(e,n)&&r(e,{label:n.value,kind:this.getKeywordCompletionItemKind(n),detail:"Keyword",sortText:"1"})}getKeywordCompletionItemKind(e){return G.CompletionItemKind.Keyword}filterKeyword(e,n){return/\p{L}/u.test(n.value)}fillCompletionItem(e,n){var r,i;let s;if(typeof n.label=="string")s=n.label;else if("node"in n){const u=this.nameProvider.getName(n.node);if(!u)return;s=u}else if("nodeDescription"in n)s=n.nodeDescription.name;else return;let o;typeof((r=n.textEdit)===null||r===void 0?void 0:r.newText)=="string"?o=n.textEdit.newText:typeof n.insertText=="string"?o=n.insertText:o=s;const a=(i=n.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,s,o);return a?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:a,label:s}:void 0}buildCompletionTextEdit(e,n,r){const s=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(s,n)){const o=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:r,range:{start:o,end:a}}}else return}}class y${constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,n){const r=e.parseResult.value;if(r.$cstNode){const i=r.$cstNode,s=Jn(i,e.textDocument.offsetAt(n.position),this.grammarConfig.nameRegexp);if(s)return this.collectLocationLinks(s,n)}}collectLocationLinks(e,n){var r;const i=this.findLink(e);if(i)return[G.LocationLink.create(i.targetDocument.textDocument.uri,((r=i.target.astNode.$cstNode)!==null&&r!==void 0?r:i.target).range,i.target.range,i.source.range)]}findLink(e){const n=this.references.findDeclarationNode(e);if(n?.astNode){const r=gt(n.astNode);if(n&&r)return{source:e,target:n,targetDocument:r}}}}class v${constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,n){const r=e.parseResult.value.$cstNode;if(!r)return;const i=Jn(r,e.textDocument.offsetAt(n.position),this.grammarConfig.nameRegexp);if(!i)return;const s=this.references.findDeclaration(i);if(s){const o=Rn.equals(gt(s).uri,e.uri),a={documentUri:e.uri,includeDeclaration:o};return this.references.findReferences(s,a).map(u=>this.createDocumentHighlight(u)).toArray()}}createDocumentHighlight(e){return G.DocumentHighlight.create(e.segment.range)}}class T${constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,n){const r=n.$cstNode,i=this.nameProvider.getNameNode(n);if(i&&r){const s=this.nameProvider.getName(n);return[{kind:this.nodeKindProvider.getSymbolKind(n),name:s||i.text,range:r.range,selectionRange:i.range,children:this.getChildSymbols(e,n)}]}else return this.getChildSymbols(e,n)||[]}getChildSymbols(e,n){const r=[];for(const i of fo(n)){const s=this.getSymbol(e,i);r.push(...s)}if(r.length>0)return r}}class R${constructor(e){this.workspaceManager=e.workspace.WorkspaceManager,this.documentBuilder=e.workspace.DocumentBuilder,this.workspaceLock=e.workspace.WorkspaceLock,this.serviceRegistry=e.ServiceRegistry;let n=!1;e.lsp.LanguageServer.onInitialize(r=>{var i,s;n=!!(!((s=(i=r.capabilities.workspace)===null||i===void 0?void 0:i.didChangeWatchedFiles)===null||s===void 0)&&s.dynamicRegistration)}),e.lsp.LanguageServer.onInitialized(r=>{n&&this.registerFileWatcher(e)})}registerFileWatcher(e){const n=Se(e.ServiceRegistry.all).flatMap(r=>r.LanguageMetaData.fileExtensions).map(r=>r.startsWith(".")?r.substring(1):r).distinct().toArray();if(n.length>0){const r=e.lsp.Connection,i={watchers:[{globPattern:n.length===1?`**/*.${n[0]}`:`**/*.{${n.join(",")}}`}]};r?.client.register(G.DidChangeWatchedFilesNotification.type,i)}}fireDocumentUpdate(e,n){e=e.filter(r=>this.serviceRegistry.hasServices(r)),this.workspaceManager.ready.then(()=>{this.workspaceLock.write(r=>this.documentBuilder.update(e,n,r))}).catch(r=>{console.error("Workspace initialization failed. Could not perform document update.",r)})}didChangeContent(e){this.fireDocumentUpdate([Nt.parse(e.document.uri)],[])}didChangeWatchedFiles(e){const n=Se(e.changes).filter(i=>i.type!==G.FileChangeType.Deleted).distinct(i=>i.uri).map(i=>Nt.parse(i.uri)).toArray(),r=Se(e.changes).filter(i=>i.type===G.FileChangeType.Deleted).distinct(i=>i.uri).map(i=>Nt.parse(i.uri)).toArray();this.fireDocumentUpdate(n,r)}}class S${constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){const n=[],r=i=>n.push(i);return this.collectFolding(e,r),n}collectFolding(e,n){var r;const i=(r=e.parseResult)===null||r===void 0?void 0:r.value;if(i){if(this.shouldProcessContent(i)){const s=Zn(i).iterator();let o;do if(o=s.next(),!o.done){const a=o.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,n),this.shouldProcessContent(a)||s.prune()}while(!o.done)}this.collectCommentFolding(e,i,n)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,n,r){const i=n.$cstNode;if(i){const s=this.toFoldingRange(e,i);s&&r(s)}}collectCommentFolding(e,n,r){const i=n.$cstNode;if(i){for(const s of xv(i))if(this.commentNames.includes(s.tokenType.name)){const o=this.toFoldingRange(e,s,G.FoldingRangeKind.Comment);o&&r(o)}}}toFoldingRange(e,n,r){const i=n.range,s=i.start;let o=i.end;if(!(o.line-s.line<2))return this.includeLastFoldingLine(n,r)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),G.FoldingRange.create(s.line,o.line,s.character,o.character,r)}includeLastFoldingLine(e,n){if(n===G.FoldingRangeKind.Comment)return!1;const r=e.text,i=r.charAt(r.length-1);return!(i==="}"||i===")"||i==="]")}}class b${match(e,n){if(e.length===0)return!0;let r=!1,i,s=0;const o=n.length;for(let a=0;a<o;a++){const c=n.charCodeAt(a),u=e.charCodeAt(s);if((c===u||this.toUpperCharCode(c)===this.toUpperCharCode(u))&&(r||(r=i===void 0||this.isWordTransition(i,c)),r&&s++,s===e.length))return!0;i=c}return!1}isWordTransition(e,n){return dv<=e&&e<=fv&&_$<=n&&n<=E$||e===hv&&n!==hv}toUpperCharCode(e){return dv<=e&&e<=fv?e-32:e}}const dv=97,fv=122,_$=65,E$=90,hv=95;class w${constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,n){var r,i;const s=(i=(r=e.parseResult)===null||r===void 0?void 0:r.value)===null||i===void 0?void 0:i.$cstNode;if(s){const o=e.textDocument.offsetAt(n.position),a=Jn(s,o,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>o){const c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}}class k$ extends w${constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){const n=this.documentationProvider.getDocumentation(e);if(n)return{contents:{kind:"markdown",value:n}}}}const pv={[G.SemanticTokenTypes.class]:0,[G.SemanticTokenTypes.comment]:1,[G.SemanticTokenTypes.enum]:2,[G.SemanticTokenTypes.enumMember]:3,[G.SemanticTokenTypes.event]:4,[G.SemanticTokenTypes.function]:5,[G.SemanticTokenTypes.interface]:6,[G.SemanticTokenTypes.keyword]:7,[G.SemanticTokenTypes.macro]:8,[G.SemanticTokenTypes.method]:9,[G.SemanticTokenTypes.modifier]:10,[G.SemanticTokenTypes.namespace]:11,[G.SemanticTokenTypes.number]:12,[G.SemanticTokenTypes.operator]:13,[G.SemanticTokenTypes.parameter]:14,[G.SemanticTokenTypes.property]:15,[G.SemanticTokenTypes.regexp]:16,[G.SemanticTokenTypes.string]:17,[G.SemanticTokenTypes.struct]:18,[G.SemanticTokenTypes.type]:19,[G.SemanticTokenTypes.typeParameter]:20,[G.SemanticTokenTypes.variable]:21,[G.SemanticTokenTypes.decorator]:22},C$={[G.SemanticTokenModifiers.abstract]:1,[G.SemanticTokenModifiers.async]:2,[G.SemanticTokenModifiers.declaration]:4,[G.SemanticTokenModifiers.defaultLibrary]:8,[G.SemanticTokenModifiers.definition]:16,[G.SemanticTokenModifiers.deprecated]:32,[G.SemanticTokenModifiers.documentation]:64,[G.SemanticTokenModifiers.modification]:128,[G.SemanticTokenModifiers.readonly]:256,[G.SemanticTokenModifiers.static]:512},A$={legend:{tokenTypes:Object.keys(pv),tokenModifiers:Object.keys(C$)},full:{delta:!0},range:!0};var mv;(function(t){function e(r,i){const s=new Map;Object.entries(pv).forEach(([c,u])=>s.set(u,c));let o=0,a=0;return n(r.data,5).map(c=>{o+=c[0],c[0]!==0&&(a=0),a+=c[1];const u=c[2];return{offset:i.textDocument.offsetAt({line:o,character:a}),tokenType:s.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:o,character:a},end:{line:o,character:a+u}})}})}t.decode=e;function n(r,i){const s=[];for(let o=0;o<r.length;o+=i){const a=r.slice(o,o+i);s.push(a)}return s}})(mv||(mv={}));function N$(t){const e=[],n=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&n.push(...i.retriggerCharacters)});const r={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:n.length>0?Array.from(new Set(n)).sort():void 0};return r.triggerCharacters?r:void 0}class P${constructor(e){this.onInitializeEmitter=new oe.Emitter,this.onInitializedEmitter=new oe.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.fireInitializeOnDefaultServices(e),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Dd(this.services),this.services.ServiceRegistry.all.forEach(e=>Dd(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var n,r,i,s;const o=this.services.lsp.DocumentUpdateHandler,a=(n=this.services.lsp.FileOperationHandler)===null||n===void 0?void 0:n.fileOperationOptions,c=this.services.ServiceRegistry.all,u=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.Formatter}),l=c.map(L=>{var A,V;return(V=(A=L.lsp)===null||A===void 0?void 0:A.Formatter)===null||V===void 0?void 0:V.formatOnTypeOptions}).find(L=>!!L),d=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.CodeActionProvider}),f=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.SemanticTokenProvider}),h=(i=(r=this.services.lsp)===null||r===void 0?void 0:r.ExecuteCommandHandler)===null||i===void 0?void 0:i.commands,v=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.DocumentLinkProvider}),S=N$(c.map(L=>{var A,V;return(V=(A=L.lsp)===null||A===void 0?void 0:A.SignatureHelp)===null||V===void 0?void 0:V.signatureHelpOptions})),w=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.TypeProvider}),R=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.ImplementationProvider}),m=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.CompletionProvider}),y=m$(c.map(L=>{var A,V;return(V=(A=L.lsp)===null||A===void 0?void 0:A.CompletionProvider)===null||V===void 0?void 0:V.completionOptions})),_=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.ReferencesProvider}),M=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.DocumentSymbolProvider}),K=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.DefinitionProvider}),Q=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.DocumentHighlightProvider}),pe=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.FoldingRangeProvider}),ve=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.HoverProvider}),Te=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.RenameProvider}),P=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.CallHierarchyProvider}),E=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.TypeHierarchyProvider}),T=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.CodeLensProvider}),k=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.DeclarationProvider}),I=this.hasService(L=>{var A;return(A=L.lsp)===null||A===void 0?void 0:A.InlayHintProvider}),N=(s=this.services.lsp)===null||s===void 0?void 0:s.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0},fileOperations:a},executeCommandProvider:h&&{commands:h},textDocumentSync:{change:oe.TextDocumentSyncKind.Incremental,openClose:!0,save:!!o.didSaveDocument,willSave:!!o.willSaveDocument,willSaveWaitUntil:!!o.willSaveDocumentWaitUntil},completionProvider:m?y:void 0,referencesProvider:_,documentSymbolProvider:M,definitionProvider:K,typeDefinitionProvider:w,documentHighlightProvider:Q,codeActionProvider:d,documentFormattingProvider:u,documentRangeFormattingProvider:u,documentOnTypeFormattingProvider:l,foldingRangeProvider:pe,hoverProvider:ve,renameProvider:Te?{prepareProvider:!0}:void 0,semanticTokensProvider:f?A$:void 0,signatureHelpProvider:S,implementationProvider:R,callHierarchyProvider:P?{}:void 0,typeHierarchyProvider:E?{}:void 0,documentLinkProvider:v?{resolveProvider:!1}:void 0,codeLensProvider:T?{resolveProvider:!1}:void 0,declarationProvider:k,inlayHintProvider:I?{resolveProvider:!1}:void 0,workspaceSymbolProvider:N?{resolveProvider:!!N.resolveSymbol}:void 0}}}initialized(e){this.fireInitializedOnDefaultServices(e),this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}fireInitializeOnDefaultServices(e){this.services.workspace.ConfigurationProvider.initialize(e),this.services.workspace.WorkspaceManager.initialize(e)}fireInitializedOnDefaultServices(e){const n=this.services.lsp.Connection,r=n?Object.assign(Object.assign({},e),{register:i=>n.client.register(oe.DidChangeConfigurationNotification.type,i),fetchConfiguration:i=>n.workspace.getConfiguration(i)}):e;this.services.workspace.ConfigurationProvider.initialized(r).catch(i=>console.error("Error in ConfigurationProvider initialization:",i)),this.services.workspace.WorkspaceManager.initialized(e).catch(i=>console.error("Error in WorkspaceManager initialization:",i))}}function $$(t){const e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");I$(e,t),D$(e,t),O$(e,t),x$(e,t),L$(e,t),F$(e,t),j$(e,t),q$(e,t),H$(e,t),G$(e,t),B$(e,t),K$(e,t),M$(e,t),z$(e,t),W$(e,t),V$(e,t),X$(e,t),J$(e,t),Z$(e,t),nI(e,t),rI(e,t),eI(e,t),Q$(e,t),Y$(e,t),U$(e,t),tI(e,t),e.onInitialize(r=>t.lsp.LanguageServer.initialize(r)),e.onInitialized(r=>{t.lsp.LanguageServer.initialized(r)}),t.workspace.TextDocuments.listen(e),e.listen()}function I$(t,e){const n=e.lsp.DocumentUpdateHandler,r=e.workspace.TextDocuments;n.didOpenDocument&&r.onDidOpen(i=>n.didOpenDocument(i)),n.didChangeContent&&r.onDidChangeContent(i=>n.didChangeContent(i)),n.didCloseDocument&&r.onDidClose(i=>n.didCloseDocument(i)),n.didSaveDocument&&r.onDidSave(i=>n.didSaveDocument(i)),n.willSaveDocument&&r.onWillSave(i=>n.willSaveDocument(i)),n.willSaveDocumentWaitUntil&&r.onWillSaveWaitUntil(i=>n.willSaveDocumentWaitUntil(i)),n.didChangeWatchedFiles&&t.onDidChangeWatchedFiles(i=>n.didChangeWatchedFiles(i))}function D$(t,e){const n=e.lsp.FileOperationHandler;n&&(n.didCreateFiles&&t.workspace.onDidCreateFiles(r=>n.didCreateFiles(r)),n.didRenameFiles&&t.workspace.onDidRenameFiles(r=>n.didRenameFiles(r)),n.didDeleteFiles&&t.workspace.onDidDeleteFiles(r=>n.didDeleteFiles(r)),n.willCreateFiles&&t.workspace.onWillCreateFiles(r=>n.willCreateFiles(r)),n.willRenameFiles&&t.workspace.onWillRenameFiles(r=>n.willRenameFiles(r)),n.willDeleteFiles&&t.workspace.onWillDeleteFiles(r=>n.willDeleteFiles(r)))}function O$(t,e){const n=e.workspace.DocumentBuilder;n.onUpdate(async(r,i)=>{for(const s of i)t.sendDiagnostics({uri:s.toString(),diagnostics:[]})}),n.onDocumentPhase(q.Validated,async r=>{r.diagnostics&&t.sendDiagnostics({uri:r.uri.toString(),diagnostics:r.diagnostics})})}function x$(t,e){t.onCompletion(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.CompletionProvider)===null||a===void 0?void 0:a.getCompletion(r,i,s)},e,q.IndexedReferences))}function L$(t,e){t.onReferences(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.ReferencesProvider)===null||a===void 0?void 0:a.findReferences(r,i,s)},e,q.IndexedReferences))}function M$(t,e){t.onCodeAction(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.CodeActionProvider)===null||a===void 0?void 0:a.getCodeActions(r,i,s)},e,q.Validated))}function F$(t,e){t.onDocumentSymbol(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.DocumentSymbolProvider)===null||a===void 0?void 0:a.getSymbols(r,i,s)},e,q.Parsed))}function j$(t,e){t.onDefinition(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.DefinitionProvider)===null||a===void 0?void 0:a.getDefinition(r,i,s)},e,q.IndexedReferences))}function q$(t,e){t.onTypeDefinition(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.TypeProvider)===null||a===void 0?void 0:a.getTypeDefinition(r,i,s)},e,q.IndexedReferences))}function H$(t,e){t.onImplementation(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.ImplementationProvider)===null||a===void 0?void 0:a.getImplementation(r,i,s)},e,q.IndexedReferences))}function U$(t,e){t.onDeclaration(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.DeclarationProvider)===null||a===void 0?void 0:a.getDeclaration(r,i,s)},e,q.IndexedReferences))}function G$(t,e){t.onDocumentHighlight(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.DocumentHighlightProvider)===null||a===void 0?void 0:a.getDocumentHighlight(r,i,s)},e,q.IndexedReferences))}function W$(t,e){t.onHover(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.HoverProvider)===null||a===void 0?void 0:a.getHoverContent(r,i,s)},e,q.IndexedReferences))}function B$(t,e){t.onFoldingRanges(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.FoldingRangeProvider)===null||a===void 0?void 0:a.getFoldingRanges(r,i,s)},e,q.Parsed))}function K$(t,e){t.onDocumentFormatting(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.Formatter)===null||a===void 0?void 0:a.formatDocument(r,i,s)},e,q.Parsed)),t.onDocumentRangeFormatting(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.Formatter)===null||a===void 0?void 0:a.formatDocumentRange(r,i,s)},e,q.Parsed)),t.onDocumentOnTypeFormatting(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.Formatter)===null||a===void 0?void 0:a.formatDocumentOnType(r,i,s)},e,q.Parsed))}function z$(t,e){t.onRenameRequest(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.RenameProvider)===null||a===void 0?void 0:a.rename(r,i,s)},e,q.IndexedReferences)),t.onPrepareRename(tt((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.RenameProvider)===null||a===void 0?void 0:a.prepareRename(r,i,s)},e,q.IndexedReferences))}function V$(t,e){t.languages.inlayHint.on(kn((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.InlayHintProvider)===null||a===void 0?void 0:a.getInlayHints(r,i,s)},e,q.IndexedReferences))}function X$(t,e){const n={data:[]};t.languages.semanticTokens.on(kn((r,i,s,o)=>{var a;return!((a=r.lsp)===null||a===void 0)&&a.SemanticTokenProvider?r.lsp.SemanticTokenProvider.semanticHighlight(i,s,o):n},e,q.IndexedReferences)),t.languages.semanticTokens.onDelta(kn((r,i,s,o)=>{var a;return!((a=r.lsp)===null||a===void 0)&&a.SemanticTokenProvider?r.lsp.SemanticTokenProvider.semanticHighlightDelta(i,s,o):n},e,q.IndexedReferences)),t.languages.semanticTokens.onRange(kn((r,i,s,o)=>{var a;return!((a=r.lsp)===null||a===void 0)&&a.SemanticTokenProvider?r.lsp.SemanticTokenProvider.semanticHighlightRange(i,s,o):n},e,q.IndexedReferences))}function Y$(t,e){t.onDidChangeConfiguration(n=>{n.settings&&e.workspace.ConfigurationProvider.updateConfiguration(n)})}function J$(t,e){const n=e.lsp.ExecuteCommandHandler;n&&t.onExecuteCommand(async(r,i)=>{var s;try{return await n.executeCommand(r.command,(s=r.arguments)!==null&&s!==void 0?s:[],i)}catch(o){return Cn(o)}})}function Q$(t,e){t.onDocumentLinks(kn((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.DocumentLinkProvider)===null||a===void 0?void 0:a.getDocumentLinks(r,i,s)},e,q.Parsed))}function Z$(t,e){t.onSignatureHelp(kn((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.SignatureHelp)===null||a===void 0?void 0:a.provideSignatureHelp(r,i,s)},e,q.IndexedReferences))}function eI(t,e){t.onCodeLens(kn((n,r,i,s)=>{var o,a;return(a=(o=n.lsp)===null||o===void 0?void 0:o.CodeLensProvider)===null||a===void 0?void 0:a.provideCodeLens(r,i,s)},e,q.IndexedReferences))}function tI(t,e){var n;const r=e.lsp.WorkspaceSymbolProvider;if(r){const i=e.workspace.DocumentBuilder;t.onWorkspaceSymbol(async(o,a)=>{try{return await i.waitUntil(q.IndexedContent,a),await r.getSymbols(o,a)}catch(c){return Cn(c)}});const s=(n=r.resolveSymbol)===null||n===void 0?void 0:n.bind(r);s&&t.onWorkspaceSymbolResolve(async(o,a)=>{try{return await i.waitUntil(q.IndexedContent,a),await s(o,a)}catch(c){return Cn(c)}})}}function nI(t,e){t.languages.callHierarchy.onPrepare(kn(async(n,r,i,s)=>{var o;if(!((o=n.lsp)===null||o===void 0)&&o.CallHierarchyProvider){const a=await n.lsp.CallHierarchyProvider.prepareCallHierarchy(r,i,s);return a??null}return null},e,q.IndexedReferences)),t.languages.callHierarchy.onIncomingCalls(nc(async(n,r,i)=>{var s;if(!((s=n.lsp)===null||s===void 0)&&s.CallHierarchyProvider){const o=await n.lsp.CallHierarchyProvider.incomingCalls(r,i);return o??null}return null},e)),t.languages.callHierarchy.onOutgoingCalls(nc(async(n,r,i)=>{var s;if(!((s=n.lsp)===null||s===void 0)&&s.CallHierarchyProvider){const o=await n.lsp.CallHierarchyProvider.outgoingCalls(r,i);return o??null}return null},e))}function rI(t,e){e.ServiceRegistry.all.some(n=>{var r;return(r=n.lsp)===null||r===void 0?void 0:r.TypeHierarchyProvider})&&(t.languages.typeHierarchy.onPrepare(kn(async(n,r,i,s)=>{var o,a;const c=await((a=(o=n.lsp)===null||o===void 0?void 0:o.TypeHierarchyProvider)===null||a===void 0?void 0:a.prepareTypeHierarchy(r,i,s));return c??null},e,q.IndexedReferences)),t.languages.typeHierarchy.onSupertypes(nc(async(n,r,i)=>{var s,o;const a=await((o=(s=n.lsp)===null||s===void 0?void 0:s.TypeHierarchyProvider)===null||o===void 0?void 0:o.supertypes(r,i));return a??null},e)),t.languages.typeHierarchy.onSubtypes(nc(async(n,r,i)=>{var s,o;const a=await((o=(s=n.lsp)===null||s===void 0?void 0:s.TypeHierarchyProvider)===null||o===void 0?void 0:o.subtypes(r,i));return a??null},e)))}function nc(t,e){const n=e.ServiceRegistry;return async(r,i)=>{const s=Nt.parse(r.item.uri),o=await tf(e,i,s,q.IndexedReferences);if(o)return o;if(!n.hasServices(s)){const c=`Could not find service instance for uri: '${s}'`;return console.debug(c),Cn(new Error(c))}const a=n.getServices(s);try{return await t(a,r,i)}catch(c){return Cn(c)}}}function kn(t,e,n){const r=e.workspace.LangiumDocuments,i=e.ServiceRegistry;return async(s,o)=>{const a=Nt.parse(s.textDocument.uri),c=await tf(e,o,a,n);if(c)return c;if(!i.hasServices(a)){const l=`Could not find service instance for uri: '${a}'`;return console.debug(l),Cn(new Error(l))}const u=i.getServices(a);try{const l=await r.getOrCreateDocument(a);return await t(u,l,s,o)}catch(l){return Cn(l)}}}function tt(t,e,n){const r=e.workspace.LangiumDocuments,i=e.ServiceRegistry;return async(s,o)=>{const a=Nt.parse(s.textDocument.uri),c=await tf(e,o,a,n);if(c)return c;if(!i.hasServices(a))return console.debug(`Could not find service instance for uri: '${a.toString()}'`),null;const u=i.getServices(a);try{const l=await r.getOrCreateDocument(a);return await t(u,l,s,o)}catch(l){return Cn(l)}}}async function tf(t,e,n,r){if(r!==void 0){const i=t.workspace.DocumentBuilder;try{await i.waitUntil(r,n,e)}catch(s){return Cn(s)}}}function Cn(t){if(as(t))return new oe.ResponseError(oe.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof oe.ResponseError)return t;throw t}class iI{getSymbolKind(){return G.SymbolKind.Field}getCompletionItemKind(){return G.CompletionItemKind.Reference}}class sI{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,n){const r=e.parseResult.value.$cstNode;if(!r)return[];const i=Jn(r,e.textDocument.offsetAt(n.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,n,e):[]}getReferences(e,n,r){const i=[],s=this.references.findDeclaration(e);if(s){const o={includeDeclaration:n.context.includeDeclaration};this.references.findReferences(s,o).forEach(a=>{i.push(G.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}}class oI{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,n){const r={},i=e.parseResult.value.$cstNode;if(!i)return;const s=e.textDocument.offsetAt(n.position),o=Jn(i,s,this.grammarConfig.nameRegexp);if(!o)return;const a=this.references.findDeclaration(o);if(!a)return;const c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(l=>{const d=jt.replace(l.segment.range,n.newName),f=l.sourceUri.toString();r[f]?r[f].push(d):r[f]=[d]}),{changes:r}}prepareRename(e,n){return this.renameNodeRange(e,n.position)}renameNodeRange(e,n){const r=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(n);if(r&&i){const s=Jn(r,i,this.grammarConfig.nameRegexp);if(!s)return;if(this.references.findDeclaration(s)||this.isNameNode(s))return s.range}}isNameNode(e){return e?.astNode&&Dm(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}}class aI{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,n=Ce.None){const r=[],i=e.query.toLowerCase();for(const s of this.indexManager.allElements())if(await At(n),this.fuzzyMatcher.match(i,s.name)){const o=this.getWorkspaceSymbol(s);o&&r.push(o)}return r}getWorkspaceSymbol(e){const n=e.nameSegment;if(n)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:n.range,uri:e.documentUri.toString()}}}}function cI(t){return Sa.merge(zm(t),uI(t))}function uI(t){return{lsp:{CompletionProvider:e=>new g$(e),DocumentSymbolProvider:e=>new T$(e),HoverProvider:e=>new k$(e),FoldingRangeProvider:e=>new S$(e),ReferencesProvider:e=>new sI(e),DefinitionProvider:e=>new y$(e),DocumentHighlightProvider:e=>new v$(e),RenameProvider:e=>new oI(e)},shared:()=>t.shared}}function lI(t){return Sa.merge(Vm(t),dI(t))}function dI(t){return{lsp:{Connection:()=>t.connection,LanguageServer:e=>new P$(e),DocumentUpdateHandler:e=>new R$(e),WorkspaceSymbolProvider:e=>new aI(e),NodeKindProvider:()=>new iI,FuzzyMatcher:()=>new b$},workspace:{TextDocuments:()=>new G.TextDocuments(ya)}}}class fI{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new hI(e,this.collector)}formatDocument(e,n){const r=e.parseResult;return r.lexerErrors.length===0&&r.parserErrors.length===0?this.doDocumentFormat(e,n.options):[]}isFormatRangeErrorFree(e,n){const r=e.parseResult;return r.lexerErrors.length||r.parserErrors.length?Math.min(...r.lexerErrors.map(s=>{var o;return(o=s.line)!==null&&o!==void 0?o:Number.MAX_VALUE}),...r.parserErrors.map(s=>{var o;return(o=s.token.startLine)!==null&&o!==void 0?o:Number.MAX_VALUE}))>n.end.line:!0}formatDocumentRange(e,n){return this.isFormatRangeErrorFree(e,n.range)?this.doDocumentFormat(e,n.options,n.range):[]}formatDocumentOnType(e,n){const r={start:{character:0,line:n.position.line},end:n.position};return this.isFormatRangeErrorFree(e,r)?this.doDocumentFormat(e,n.options,r):[]}get formatOnTypeOptions(){}doDocumentFormat(e,n,r){const i=new Map,s=(a,c,u)=>{var l,d;const f=this.nodeModeToKey(a,c),h=i.get(f),v=(l=u.options.priority)!==null&&l!==void 0?l:0,S=(d=h?.options.priority)!==null&&d!==void 0?d:0;(!h||S<=v)&&i.set(f,u)};this.collector=s,this.iterateAstFormatting(e,r);const o=this.iterateCstFormatting(e,i,n,r);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,n){const r=[];for(const i of n){const s=r[r.length-1];if(s){const o=e.offsetAt(i.range.start),a=e.offsetAt(s.range.end);o<a&&r.pop()}r.push(i)}return r}iterateAstFormatting(e,n){const r=e.parseResult.value;this.format(r);const i=Zn(r).iterator();let s;do if(s=i.next(),!s.done){const o=s.value;this.insideRange(o.$cstNode.range,n)?this.format(o):i.prune()}while(!s.done)}nodeModeToKey(e,n){return`${e.offset}:${e.end}:${n}`}insideRange(e,n){return!n||e.start.line<=n.start.line&&e.end.line>=n.end.line||e.start.line>=n.start.line&&e.end.line<=n.end.line||e.start.line<=n.end.line&&e.end.line>=n.end.line}isNecessary(e,n){return!0}iterateCstFormatting(e,n,r,i){const s={indentation:0,options:r,document:e.textDocument},o=[],c=this.iterateCstTree(e,s).iterator();let u,l;do if(l=c.next(),!l.done){const d=l.value,f=Yn(d),h=this.nodeModeToKey(d,"prepend"),v=n.get(h);if(n.delete(h),v){const R=this.createTextEdit(u,d,v,s);for(const m of R)m&&this.insideRange(m.range,i)&&o.push(m)}const S=this.nodeModeToKey(d,"append"),w=n.get(S);if(n.delete(S),w){const R=Hv(d);if(R){const m=this.createTextEdit(d,R,w,s);for(const y of m)y&&this.insideRange(y.range,i)&&o.push(y)}}if(!v&&d.hidden){const R=this.createHiddenTextEdits(u,d,void 0,s);for(const m of R)m&&this.insideRange(m.range,i)&&o.push(m)}f&&(u=d)}while(!l.done);return o}createHiddenTextEdits(e,n,r,i){var s;const o=n.range.start.line;if(e&&e.range.end.line===o)return[];const a=[],c={start:{character:0,line:o},end:n.range.start},u=i.document.getText(c),l=this.findFittingMove(c,(s=r?.moves)!==null&&s!==void 0?s:[],i),d=this.getExistingIndentationCharacterCount(u,i),h=this.getIndentationCharacterCount(i,l)-d;if(h===0)return[];let v="";h>0&&(v=(i.options.insertSpaces?" ":"	").repeat(h));const S=n.text.split(`
`);S[0]=u+S[0];for(let w=0;w<S.length;w++){const R=o+w,m={character:0,line:R};if(h>0)a.push({newText:v,range:{start:m,end:m}});else{const y=S[w];let _=0;for(;_<y.length;_++){const M=y.charAt(_);if(M!==" "&&M!=="	")break}a.push({newText:"",range:{start:m,end:{line:R,character:Math.min(_,Math.abs(h))}}})}}return a}getExistingIndentationCharacterCount(e,n){const r=" ".repeat(n.options.tabSize);return(n.options.insertSpaces?e.replaceAll("	",r):e.replaceAll(r,"	")).length}getIndentationCharacterCount(e,n){let r=e.indentation;return n&&n.tabs&&(r+=n.tabs),(e.options.insertSpaces?e.options.tabSize:1)*r}createTextEdit(e,n,r,i){var s;if(n.hidden)return this.createHiddenTextEdits(e,n,r,i);const o={start:(s=e?.range.end)!==null&&s!==void 0?s:{character:0,line:0},end:n.range.start},a=this.findFittingMove(o,r.moves,i);if(!a)return[];const c=a.characters,u=a.lines,l=a.tabs,d=i.indentation;i.indentation+=l??0;const f=[];return c!==void 0?f.push(this.createSpaceTextEdit(o,c,r.options)):u!==void 0?f.push(this.createLineTextEdit(o,u,i,r.options)):l!==void 0&&f.push(this.createTabTextEdit(o,!!e,i)),Yn(n)&&(i.indentation=d),f}createSpaceTextEdit(e,n,r){if(e.start.line===e.end.line){const s=e.end.character-e.start.character;n=this.fitIntoOptions(n,s,r)}return{newText:" ".repeat(n),range:e}}createLineTextEdit(e,n,r,i){const s=e.end.line-e.start.line;n=this.fitIntoOptions(n,s,i);const a=(r.options.insertSpaces?" ".repeat(r.options.tabSize):"	").repeat(r.indentation);return{newText:`${`
`.repeat(n)}${a}`,range:e}}createTabTextEdit(e,n,r){const s=(r.options.insertSpaces?" ".repeat(r.options.tabSize):"	").repeat(r.indentation),o=n?1:0,a=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(a)}${s}`,range:e}}fitIntoOptions(e,n,r){return r.allowMore?e=Math.max(n,e):r.allowLess&&(e=Math.min(n,e)),e}findFittingMove(e,n,r){if(n.length===0)return;if(n.length===1)return n[0];const i=e.end.line-e.start.line;for(const s of n){if(s.lines!==void 0&&i<=s.lines)return s;if(s.lines===void 0&&i===0)return s}return n[n.length-1]}iterateCstTree(e,n){const i=e.parseResult.value.$cstNode;return i?new Js(i,s=>this.iterateCst(s,n)):Ys}iterateCst(e,n){if(!on(e))return Ys;const r=n.indentation;return new Ue(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(n.indentation=r,ut))}}class hI{constructor(e,n){this.astNode=e,this.collector=n}node(e){return new Ht(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){const n=[];for(const r of e)r.$cstNode&&n.push(r.$cstNode);return new Ht(n,this.collector)}property(e,n){const r=fu(this.astNode.$cstNode,e,n);return new Ht(r?[r]:[],this.collector)}properties(...e){const n=[];for(const r of e){const i=Of(this.astNode.$cstNode,r);n.push(...i)}return new Ht(n,this.collector)}keyword(e,n){const r=xf(this.astNode.$cstNode,e,n);return new Ht(r?[r]:[],this.collector)}keywords(...e){const n=[];for(const r of e){const i=RT(this.astNode.$cstNode,r);n.push(...i)}return new Ht(n,this.collector)}cst(e){return new Ht([...e],this.collector)}interior(e,n){const r=e.nodes,i=n.nodes;if(r.length!==1||i.length!==1)return new Ht([],this.collector);let s=r[0],o=i[0];if(s.offset>o.offset){const a=s;s=o,o=a}return new Ht(Uv(s,o),this.collector)}}class Ht{constructor(e,n){this.nodes=e,this.collector=n}prepend(e){for(const n of this.nodes)this.collector(n,"prepend",e);return this}append(e){for(const n of this.nodes)this.collector(n,"append",e);return this}surround(e){for(const n of this.nodes)this.collector(n,"prepend",e),this.collector(n,"append",e);return this}slice(e,n){return new Ht(this.nodes.slice(e,n),this.collector)}}var Vr;(function(t){function e(...l){return{options:{},moves:l.flatMap(d=>d.moves).sort(u)}}t.fit=e;function n(l){return i(0,l)}t.noSpace=n;function r(l){return i(1,l)}t.oneSpace=r;function i(l,d){return{options:d??{},moves:[{characters:l}]}}t.spaces=i;function s(l){return o(1,l)}t.newLine=s;function o(l,d){return{options:d??{},moves:[{lines:l}]}}t.newLines=o;function a(l){return{options:l??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(l){return{options:l??{},moves:[{tabs:0}]}}t.noIndent=c;function u(l,d){var f,h,v,S,w,R;const m=(f=l.lines)!==null&&f!==void 0?f:0,y=(h=d.lines)!==null&&h!==void 0?h:0,_=(v=l.tabs)!==null&&v!==void 0?v:0,M=(S=d.tabs)!==null&&S!==void 0?S:0,K=(w=l.characters)!==null&&w!==void 0?w:0,Q=(R=d.characters)!==null&&R!==void 0?R:0;return m<y?-1:m>y?1:_<M?-1:_>M?1:K<Q?-1:K>Q?1:0}})(Vr||(Vr={}));var nf=G;const rf="AllVarRef",rc="Cmd";function pI(t){return Ne.isInstance(t,rc)}const sf="Expr",ic="PrimExpr",of="SExpr",sc="SPrimExpr",gv="Stmt",af="StringFunction",yv="Var",oc="VarRef";function mI(t){return Ne.isInstance(t,oc)}const ac="Asc",cc="BinExpr",uc="Chrs",lc="Data",Xr="DefFn";function vv(t){return Ne.isInstance(t,Xr)}const dc="Dim",Tv="End",fc="FloatNumber",vs="FloatVar",hc="FloatVarRef",Ts="FnCall";function gI(t){return Ne.isInstance(t,Ts)}const Rs="For";function yI(t){return Ne.isInstance(t,Rs)}const Ss="Get";function vI(t){return Ne.isInstance(t,Ss)}const bs="GoSub";function Rv(t){return Ne.isInstance(t,bs)}const _s="GoTo";function Sv(t){return Ne.isInstance(t,_s)}const pc="GroupExpr",Es="If";function cf(t){return Ne.isInstance(t,Es)}const ws="Input";function TI(t){return Ne.isInstance(t,ws)}const mc="IntNumber",ks="IntVar",gc="IntVarRef",Yr="Label";function bv(t){return Ne.isInstance(t,Yr)}const yc="Len",Cs="LetNum";function RI(t){return Ne.isInstance(t,Cs)}const As="LetStr";function SI(t){return Ne.isInstance(t,As)}const Ns="Line";function bI(t){return Ne.isInstance(t,Ns)}const vc="Model";function Jr(t){return Ne.isInstance(t,vc)}const Tc="NegExpr",Rc="Next",Sc="NotExpr",bc="NumFunc",Ps="OnGoSub";function _v(t){return Ne.isInstance(t,Ps)}const $s="OnGoto";function Ev(t){return Ne.isInstance(t,$s)}const wv="PiConst",_c="Poke",Ec="Print",Is="Read";function _I(t){return Ne.isInstance(t,Is)}const kv="Restore",Cv="Return",Ds="Run";function Av(t){return Ne.isInstance(t,Ds)}const wc="SBinExpr",kc="SExprt",Cc="Str",Ac="StrComparision",Nc="StringFunction1",Pc="StringFunction2",$c="StringFunction3",Ic="StringLiteral",Os="StringVar",xs="StringVarRef";function EI(t){return Ne.isInstance(t,xs)}const Ls="StrLabel";function Nv(t){return Ne.isInstance(t,Ls)}const Pv="TiVarRef",Dc="Val",Oc="Wait";class $v extends uf{getAllTypes(){return[rf,ac,cc,uc,rc,lc,Xr,dc,Tv,sf,fc,vs,hc,Ts,Rs,Ss,bs,_s,pc,Es,ws,mc,ks,gc,Yr,yc,Cs,As,Ns,vc,Tc,Rc,Sc,bc,Ps,$s,wv,_c,ic,Ec,Is,kv,Cv,Ds,wc,of,kc,sc,gv,Cc,Ac,Ls,af,Nc,Pc,$c,Ic,Os,xs,Pv,Dc,yv,oc,Oc]}computeIsSubtype(e,n){switch(e){case ac:case fc:case Ts:case pc:case mc:case yc:case Tc:case Sc:case bc:case wv:case Ac:case Dc:return this.isSubtype(ic,n);case cc:case ic:return this.isSubtype(sf,n);case uc:case Cc:case Nc:case Pc:case $c:return this.isSubtype(af,n);case rc:case Ls:return this.isSubtype(gv,n);case lc:case Xr:case dc:case Tv:case Rs:case Ss:case bs:case _s:case Es:case ws:case Yr:case Cs:case As:case Rc:case Ps:case $s:case _c:case Ec:case Is:case kv:case Cv:case Ds:case Oc:return this.isSubtype(rc,n);case sf:case of:return this.isSubtype(kc,n);case vs:case ks:case Os:return this.isSubtype(yv,n);case hc:case gc:case Pv:return this.isSubtype(oc,n);case wc:case sc:return this.isSubtype(of,n);case af:case Ic:return this.isSubtype(sc,n);case xs:return this.isSubtype(rf,n)||this.isSubtype(sc,n);case oc:return this.isSubtype(rf,n)||this.isSubtype(ic,n);default:return!1}}getReferenceType(e){const n=`${e.container.$type}:${e.property}`;switch(n){case"FloatVarRef:var":return vs;case"FnCall:fnname":return Xr;case"GoSub:label":case"GoTo:label":case"If:label":case"OnGoSub:labels":case"OnGoto:labels":case"Run:label":return Yr;case"GoSub:lineNumber":case"GoTo:lineNumber":case"If:lineNumber":case"OnGoSub:lineNumbers":case"OnGoto:lineNumbers":case"Run:lineNumber":return Ns;case"IntVarRef:var":return ks;case"StringVarRef:var":return Os;default:throw new Error(`${n} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case ac:return{name:ac,properties:[{name:"param"}]};case cc:return{name:cc,properties:[{name:"e1"},{name:"e2"},{name:"op"}]};case uc:return{name:uc,properties:[{name:"param"}]};case lc:return{name:lc,properties:[{name:"values",defaultValue:[]}]};case Xr:return{name:Xr,properties:[{name:"expr"},{name:"name"},{name:"param"}]};case dc:return{name:dc,properties:[{name:"vars",defaultValue:[]}]};case fc:return{name:fc,properties:[{name:"val"}]};case vs:return{name:vs,properties:[{name:"indexes",defaultValue:[]},{name:"name"}]};case hc:return{name:hc,properties:[{name:"indexes",defaultValue:[]},{name:"var"}]};case Ts:return{name:Ts,properties:[{name:"fnname"},{name:"param"}]};case Rs:return{name:Rs,properties:[{name:"end"},{name:"name"},{name:"start"},{name:"step"}]};case Ss:return{name:Ss,properties:[{name:"var"}]};case bs:return{name:bs,properties:[{name:"label"},{name:"lineNumber"}]};case _s:return{name:_s,properties:[{name:"label"},{name:"lineNumber"}]};case pc:return{name:pc,properties:[{name:"ge"}]};case Es:return{name:Es,properties:[{name:"cond"},{name:"label"},{name:"lineNumber"},{name:"stmts",defaultValue:[]}]};case ws:return{name:ws,properties:[{name:"msg"},{name:"vars",defaultValue:[]}]};case mc:return{name:mc,properties:[{name:"val"}]};case ks:return{name:ks,properties:[{name:"indexes",defaultValue:[]},{name:"name"}]};case gc:return{name:gc,properties:[{name:"indexes",defaultValue:[]},{name:"var"}]};case Yr:return{name:Yr,properties:[{name:"name"}]};case yc:return{name:yc,properties:[{name:"param"}]};case Cs:return{name:Cs,properties:[{name:"expr"},{name:"name"}]};case As:return{name:As,properties:[{name:"expr"},{name:"name"}]};case Ns:return{name:Ns,properties:[{name:"linenum"},{name:"stmts",defaultValue:[]}]};case vc:return{name:vc,properties:[{name:"lines",defaultValue:[]}]};case Tc:return{name:Tc,properties:[{name:"expr"}]};case Rc:return{name:Rc,properties:[{name:"vars",defaultValue:[]}]};case Sc:return{name:Sc,properties:[{name:"expr"}]};case bc:return{name:bc,properties:[{name:"func"},{name:"param"}]};case Ps:return{name:Ps,properties:[{name:"expr"},{name:"labels",defaultValue:[]},{name:"lineNumbers",defaultValue:[]}]};case $s:return{name:$s,properties:[{name:"expr"},{name:"labels",defaultValue:[]},{name:"lineNumbers",defaultValue:[]}]};case _c:return{name:_c,properties:[{name:"addr"},{name:"value"}]};case Ec:return{name:Ec,properties:[{name:"exprs",defaultValue:[]}]};case Is:return{name:Is,properties:[{name:"vars",defaultValue:[]}]};case Ds:return{name:Ds,properties:[{name:"label"},{name:"lineNumber"}]};case wc:return{name:wc,properties:[{name:"e1"},{name:"e2"},{name:"op"}]};case kc:return{name:kc,properties:[{name:"sep"}]};case Cc:return{name:Cc,properties:[{name:"param"}]};case Ac:return{name:Ac,properties:[{name:"e1"},{name:"e2"},{name:"operator"}]};case Nc:return{name:Nc,properties:[{name:"func"},{name:"param"}]};case Pc:return{name:Pc,properties:[{name:"func"},{name:"param"},{name:"str"}]};case $c:return{name:$c,properties:[{name:"func"},{name:"len"},{name:"param"},{name:"str"}]};case Ic:return{name:Ic,properties:[{name:"val"}]};case Os:return{name:Os,properties:[{name:"indexes",defaultValue:[]},{name:"name"}]};case xs:return{name:xs,properties:[{name:"indexes",defaultValue:[]},{name:"var"}]};case Ls:return{name:Ls,properties:[{name:"name"}]};case Dc:return{name:Dc,properties:[{name:"param"}]};case Oc:return{name:Oc,properties:[{name:"addr"},{name:"invers"},{name:"mask"}]};default:return{name:e,properties:[]}}}}const Ne=new $v;let Iv;const wI=()=>Iv??(Iv=LN(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "C64Basic",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Model",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "lines",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@77"
                    },
                    "arguments": []
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@76"
                    },
                    "arguments": []
                  }
                ]
              }
            ],
            "cardinality": "+"
          },
          {
            "$type": "Assignment",
            "feature": "lines",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Line",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "linenum",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@73"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              },
              {
                "$type": "Assignment",
                "feature": "stmts",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@2"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@75"
                    },
                    "arguments": []
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stmts",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@2"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": [],
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "linenum",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@73"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Stmt",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@3"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Cmd",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@4"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@5"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Print",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "PRINT"
          },
          {
            "$type": "Assignment",
            "feature": "exprs",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@33"
              },
              "arguments": []
            },
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LetStr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LET",
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LetNum",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LET",
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Label",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LABEL"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@71"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StrLabel",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@69"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GoTo",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "GOTO"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "label",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@71"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "lineNumber",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@1"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@73"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GoSub",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "GOSUB"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "label",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@71"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "lineNumber",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@1"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@73"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "If",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "IF"
          },
          {
            "$type": "Assignment",
            "feature": "cond",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "THEN"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "stmts",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@2"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@75"
                        },
                        "arguments": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "stmts",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@2"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "label",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@71"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "lineNumber",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@1"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@73"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "For",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "FOR"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@28"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "start",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "TO"
          },
          {
            "$type": "Assignment",
            "feature": "end",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "STEP"
              },
              {
                "$type": "Assignment",
                "feature": "step",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Next",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "NEXT"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "vars",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "vars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "End",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "End"
            }
          },
          {
            "$type": "Keyword",
            "value": "END"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Input",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "INPUT"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "msg",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@63"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "vars",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@28"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "vars",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Get",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "GET"
          },
          {
            "$type": "Assignment",
            "feature": "var",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Read",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "READ"
          },
          {
            "$type": "Assignment",
            "feature": "vars",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@28"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "vars",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Data",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "DATA"
          },
          {
            "$type": "Assignment",
            "feature": "values",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@78"
              },
              "arguments": []
            },
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Poke",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "POKE"
          },
          {
            "$type": "Assignment",
            "feature": "addr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ","
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Restore",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Restore"
            }
          },
          {
            "$type": "Keyword",
            "value": "RESTORE"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Return",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Return"
            }
          },
          {
            "$type": "Keyword",
            "value": "RETURN"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Run",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "RUN"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "label",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@71"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "lineNumber",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@1"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@73"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Dim",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "DIM"
          },
          {
            "$type": "Assignment",
            "feature": "vars",
            "operator": "+=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "vars",
                "operator": "+=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@31"
                      },
                      "arguments": []
                    },
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@32"
                      },
                      "arguments": []
                    },
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@30"
                      },
                      "arguments": []
                    }
                  ]
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OnGoto",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ON"
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "GOTO"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "labels",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@7"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@71"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "labels",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@7"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@71"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "lineNumbers",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@1"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@73"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "lineNumbers",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@1"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@73"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OnGoSub",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ON"
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "GOSUB"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "labels",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@7"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@71"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "labels",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@7"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@71"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "lineNumbers",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@1"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@73"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "lineNumbers",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@1"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@73"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DefFn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "DEF"
          },
          {
            "$type": "Keyword",
            "value": "FN"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@71"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wait",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "WAIT"
          },
          {
            "$type": "Assignment",
            "feature": "addr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ","
          },
          {
            "$type": "Assignment",
            "feature": "mask",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "invers",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Var",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NumFunc",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "func",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "RND"
                },
                {
                  "$type": "Keyword",
                  "value": "ABS"
                },
                {
                  "$type": "Keyword",
                  "value": "SGN"
                },
                {
                  "$type": "Keyword",
                  "value": "INT"
                },
                {
                  "$type": "Keyword",
                  "value": "SQR"
                },
                {
                  "$type": "Keyword",
                  "value": "LOG"
                },
                {
                  "$type": "Keyword",
                  "value": "EXP"
                },
                {
                  "$type": "Keyword",
                  "value": "COS"
                },
                {
                  "$type": "Keyword",
                  "value": "SIN"
                },
                {
                  "$type": "Keyword",
                  "value": "TAN"
                },
                {
                  "$type": "Keyword",
                  "value": "ATN"
                },
                {
                  "$type": "Keyword",
                  "value": "PEEK"
                },
                {
                  "$type": "Keyword",
                  "value": "POS"
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringVar",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@70"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IntVar",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@68"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FloatVar",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@71"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SExprt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@46"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@34"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "sep",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": ";"
                },
                {
                  "$type": "Keyword",
                  "value": ","
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SExpr",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@35"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SAdd",
      "inferredType": {
        "$type": "InferredType",
        "name": "SExpr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SBinExpr"
                },
                "feature": "e1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "+"
                }
              },
              {
                "$type": "Assignment",
                "feature": "e2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@36"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SPrimExpr",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@63"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@60"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringFunction",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringFunction1",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "func",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "SPC"
                },
                {
                  "$type": "Keyword",
                  "value": "TAB"
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringFunction2",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "func",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "LEFT$"
                },
                {
                  "$type": "Keyword",
                  "value": "RIGHT$"
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "str",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ","
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringFunction3",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "func",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "MID$"
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "str",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ","
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "len",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Chrs",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "CHR$"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Str",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "STR$"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Asc",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ASC"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Len",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "LEN"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Val",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "VAL"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expr",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@47"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Logical",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinExpr"
                },
                "feature": "e1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "AND"
                    },
                    {
                      "$type": "Keyword",
                      "value": "OR"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "e2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@48"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Comparison",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinExpr"
                },
                "feature": "e1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "<"
                    },
                    {
                      "$type": "Keyword",
                      "value": "<="
                    },
                    {
                      "$type": "Keyword",
                      "value": ">"
                    },
                    {
                      "$type": "Keyword",
                      "value": ">="
                    },
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "<>"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "e2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Add",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinExpr"
                },
                "feature": "e1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "e2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@50"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Mult",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinExpr"
                },
                "feature": "e1",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "e2",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@51"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimExpr",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@64"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@65"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@66"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FnCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "FN"
          },
          {
            "$type": "Assignment",
            "feature": "fnname",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@26"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@71"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "param",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GroupExpr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "ge",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NotExpr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "NOT"
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegExpr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "-"
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StrComparision",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "e1",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "<"
                },
                {
                  "$type": "Keyword",
                  "value": "<="
                },
                {
                  "$type": "Keyword",
                  "value": ">"
                },
                {
                  "$type": "Keyword",
                  "value": ">="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "<>"
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "e2",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VarRef",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@61"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@62"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TiVarRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TiVarRef"
            }
          },
          {
            "$type": "Keyword",
            "value": "TI"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AllVarRef",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@60"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringVarRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "var",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@30"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@70"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IntVarRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "var",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@68"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FloatVarRef",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "var",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@32"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@71"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Assignment",
                "feature": "indexes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "indexes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@46"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "val",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@74"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IntNumber",
      "definition": {
        "$type": "Assignment",
        "feature": "val",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@73"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FloatNumber",
      "definition": {
        "$type": "Assignment",
        "feature": "val",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@72"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PiConst",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "PiConst"
            }
          },
          {
            "$type": "Keyword",
            "value": "π"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[ \\\\t]+/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT_VARNAME",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/(?!PRINT|LET|REM|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Z][A-Z0-9]*%/i"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "LABEL_NAME",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/(?<=[\\\\n\\\\r])([A-Za-z][A-Za-z0-9]+):/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING_VARNAME",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/(?!PRINT|REM|LET|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Z][A-Z0-9]*\\\\$/i"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "FLOAT_VARNAME",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/(?!PRINT|REM|LET|IF|THEN|ELSE|FOR|TO|STEP|NEXT|END|GOTO|GOSUB|RETURN|DIM|ON|GOSUB|DEF|FN|INPUT|GET|READ|DATA|RESTORE|POKE|ASC|CHR|LEFT|RIGHT|MID|STR|LEN|VAL|RND|ABS|SGN|INT|SQR|LOG|EXP|COS|SIN|TAN|ATN|PEEK|AND|OR|NOT)[A-Za-z][A-Za-z0-9]*/i"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "FLOAT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/[0-9]*\\\\.[0-9]+(E-?[0-9]+)?/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT_NUMBER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/[0-9]+/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "COLON",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ":"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "NEWLINE",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[\\\\n\\\\r]+/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "NEWLINE_DI",
      "definition": {
        "$type": "RegexToken",
        "regex": "/##_placeholder2_##/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DATA_ITEM",
      "definition": {
        "$type": "RegexToken",
        "regex": "/##_placeholder_##/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/REM[^\\\\n\\\\r]*/i"
      },
      "fragment": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`));class kI{constructor(e){this.astNodeDescriptionProvider=e.workspace.AstNodeDescriptionProvider}getScope(e){if((mI(e.container)||EI(e.container))&&e.property==="var"){const n=rt(e.container,Jr),r=[],i=o=>{if(RI(o)||SI(o)){const a=o;r.push(this.astNodeDescriptionProvider.createDescription(a,a.name.name))}else if(vI(o)){const a=o;r.push(this.astNodeDescriptionProvider.createDescription(a,a.var.name))}else if(TI(o)){const a=o;for(const c of a.vars)r.push(this.astNodeDescriptionProvider.createDescription(a,c.name))}else if(_I(o)){const a=o;for(const c of a.vars)r.push(this.astNodeDescriptionProvider.createDescription(a,c.name))}else if(yI(o)){const a=o;r.push(this.astNodeDescriptionProvider.createDescription(a,a.name.name))}else if(cf(o)){const a=o;if(a.stmts)for(const c of a.stmts)i(c)}};n.lines.forEach(o=>{o.stmts.forEach(a=>{i(a)})}),r.push(this.astNodeDescriptionProvider.createDescription(n,"TI$"));const s=rt(e.container,vv);if(s){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.param.name))}return new dr(r)}else if((Sv(e.container)||cf(e.container)||Rv(e.container)||Av(e.container))&&e.property==="label"){const n=rt(e.container,Jr),r=[];return n.lines.forEach(i=>{i.stmts.forEach(s=>{if(bv(s)){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.name))}else if(Nv(s)){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.name.substring(0,o.name.length-1)))}})}),new dr(r)}else if((Sv(e.container)||Rv(e.container)||cf(e.container)||Av(e.container))&&e.property==="lineNumber"){const n=rt(e.container,Jr),r=[];return n.lines.forEach(i=>{i.linenum&&r.push(this.astNodeDescriptionProvider.createDescription(i,i.linenum))}),new dr(r)}else if((_v(e.container)||Ev(e.container))&&e.property==="labels"){const n=rt(e.container,Jr),r=[];return n.lines.forEach(i=>{i.stmts.forEach(s=>{if(bv(s)){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.name))}else if(Nv(s)){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.name.substring(0,o.name.length-1)))}})}),new dr(r)}else if((_v(e.container)||Ev(e.container))&&e.property==="lineNumbers"){const n=rt(e.container,Jr),r=[];return n.lines.forEach(i=>{i.linenum&&r.push(this.astNodeDescriptionProvider.createDescription(i,i.linenum))}),new dr(r)}else if(gI(e.container)&&e.property==="fnname"){const n=rt(e.container,Jr),r=[];return n.lines.forEach(i=>{i.stmts.forEach(s=>{if(vv(s)){const o=s;r.push(this.astNodeDescriptionProvider.createDescription(o,o.name))}})}),new dr(r)}return zA}}class CI extends fI{format(e){if(pI(e)){const n=this.getNodeFormatter(e);n.keywords("PRINT","LET","IF","THEN","ELSE","FOR","TO","STEP","NEXT","END","GOTO","GOSUB","RETURN","DIM","ON","GOSUB","DEF","FN","INPUT","GET","READ","DATA","RESTORE","POKE").append(Vr.oneSpace()),n.keywords("TO","THEN","STEP").prepend(Vr.oneSpace())}else if(bI(e)){const n=ei(e.$cstNode).iterator();let r;const i=[];do if(r=n.next(),!r.done){const s=r.value;s.text===":"&&i.push(s)}while(!r.done);if(i.length>0){const o=this.getNodeFormatter(e).cst(i);o.append(Vr.oneSpace()),o.prepend(Vr.noSpace())}}}}class AI{constructor(e){const n=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(n);const r=Ku({name:"SkipComma",pattern:/,\s*/,group:Ze.SKIPPED}),i=Ra(n)?Object.values(n):n;for(const u of i)u.name==="DATA"&&(u.PUSH_MODE="data_mode",u.PATTERN=/[dD][aA][tT][aA]\s*/);const s=i.find(u=>u.name==="DATA_ITEM"),o=i.find(u=>u.name==="NEWLINE_DI");if(s)s.PATTERN=/"[^\r\n"]+"|[^,\r\n]+/;else throw new Error("DATA_ITEM token not found");if(o)o.PATTERN=/[\n\r]+/,o.POP_MODE=!0;else throw new Error("NEWLINE_DI token not found");const c={modes:{default:i.filter(u=>u.name!=="DATA_ITEM"&&u.name!=="NEWLINE_DI"),data_mode:[s,r,o]},defaultMode:"default"};this.chevrotainLexer=new Ze(c,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){const n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:n.groups.hidden??[]}}toTokenTypeDictionary(e){if(Ra(e))return e;const n=kd(e)?Object.values(e.modes).flat():e,r={};return n.forEach(i=>r[i.name]=i),r}}const NI={languageId:"c-64-basic",fileExtensions:[".c64b",".bas",".txt"],caseInsensitive:!0},PI={AstReflection:()=>new $v},$I={Grammar:()=>wI(),LanguageMetaData:()=>NI,parser:{Lexer:t=>new AI(t)},references:{ScopeProvider:t=>new kI(t)},lsp:{Formatter:()=>new CI}};function II(t){const e=t.validation.ValidationRegistry,n=t.validation.C64BasicValidator,r={};e.register(r,n)}class DI{}const OI={validation:{C64BasicValidator:()=>new DI}};function xI(t){const e=ba(lI(t),PI),n=ba(cI({shared:e}),$I,OI);return e.ServiceRegistry.register(n),II(n),t.connection||e.workspace.ConfigurationProvider.initialized({}),{shared:e,C64Basic:n}}const LI=new nf.BrowserMessageReader(self),MI=new nf.BrowserMessageWriter(self),FI=nf.createConnection(LI,MI),{shared:jI}=xI({connection:FI,...Qm});$$(jI)})();
