import{r,R as t,b as C,B as g,C as $,c as v}from"./index-fCR7aONY.js";const R=()=>{const[e,n]=r.useState(),[c,o]=r.useState(!1),l=r.useRef([]),i=r.useCallback(async(s,f="GET",E=null,b={})=>{o(!0);const u=new AbortController;l.current.push(u);try{const a=await fetch(s,{body:E,headers:b,method:f,signal:u.signal}),m=await a.json();if(l.current=l.current.filter(h=>h!==u),!a.ok)throw new Error(m.message);return o(!1),m}catch(a){if(a.name!=="AbortError")throw n(a.message),a}finally{o(!1)}},[]),d=()=>{n(null)};return r.useEffect(()=>()=>{l.current.forEach(s=>s.abort())},[]),{isLoading:c,error:e,sendRequest:i,clearError:d}},k=e=>e.href?t.createElement("a",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,href:e.href},e.children):e.to?t.createElement(C,{to:e.to,exact:e.exact,className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`},e.children):t.createElement("button",{className:`button button--${e.size||"default"} ${e.inverse&&"button--inverse"} ${e.danger&&"button--danger"}`,type:e.type,name:e.name,onClick:e.onClick,disabled:e.disabled},e.children),y=e=>{const n=t.createElement("div",{className:`modal ${e.className}`,style:e.style},t.createElement("header",{className:`modal__header ${e.headerClass}`},t.createElement("h2",null,e.header)),t.createElement("form",{onSubmit:e.onSubmit?e.onSubmit:c=>c.preventDefault()},t.createElement("div",{className:`modal__content ${e.contentClass}`},e.children),t.createElement("footer",{className:`modal__footer ${e.footerClass}`},e.footer)));return v.createPortal(n,document.getElementById("modal-hook"))},w=e=>{const n=r.useRef(null);return t.createElement(t.Fragment,null,e.show&&t.createElement(g,{onClick:e.onCancel}),t.createElement($,{in:e.show,mountOnEnter:!0,nodeRef:n,unmountOnExit:!0,timeout:200,classNames:"modal"},t.createElement(y,{...e})))},S=e=>t.createElement(w,{footer:t.createElement(k,{onClick:e.onClear},"Okay"),header:"An Error Occurred!",onCancel:e.onClear,show:!!e.error},t.createElement("p",null,e.error));export{k as B,S as E,w as M,R as u};