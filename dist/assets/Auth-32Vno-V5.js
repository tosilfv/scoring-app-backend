import{r as p,A as h,R as e,a as w}from"./index-BAekq9sh.js";import{C as T}from"./Card-CDmk43Eg.js";import{u as g,I as l,V as y,b as L,a as S}from"./form-hook-DWVvnCV1.js";import{u as O,E as A,B as m}from"./http-hook-BRc6Pwks.js";const b=()=>{const i=p.useContext(h),[s,d]=p.useState(!0),{isLoading:c,error:E,sendRequest:o,clearError:I}=O(),[a,n,u]=g({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),f=()=>{s?u({...a.inputs,name:{value:"",isValid:!1}},!1):u({...a.inputs,name:void 0},a.inputs.email.isValid&&a.inputs.password.isValid),d(r=>!r)},v=async r=>{if(r.preventDefault(),s)try{const t=await o("http://localhost:5000/api/users/login","POST",JSON.stringify({email:a.inputs.email.value,password:a.inputs.password.value}),{"Content-Type":"application/json"});i.login(t.userId,t.token)}catch{}else try{const t=await o("http://localhost:5000/api/users/signup","POST",JSON.stringify({email:a.inputs.email.value,password:a.inputs.password.value,name:a.inputs.name.value}),{"Content-Type":"application/json"});i.login(t.userId,t.token)}catch{}};return e.createElement(e.Fragment,null,e.createElement(A,{error:E,onClear:I}),e.createElement(T,{className:"authentication"},c&&e.createElement(w,{asOverlay:!0}),e.createElement("h2",null,"Login Required"),e.createElement("hr",null),e.createElement("form",{onSubmit:v},!s&&e.createElement(l,{element:"input",id:"name",type:"text",label:"Your Name",validators:[y()],errorText:"Please enter a name.",onInput:n}),e.createElement(l,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[L()],errorText:"Please enter a valid email address.",onInput:n}),e.createElement(l,{element:"input",id:"password",type:"password",label:"Password",validators:[S(5)],errorText:"Please enter a valid password, at least 5 characters.",onInput:n}),e.createElement(m,{type:"submit",disabled:!a.isValid},s?"LOGIN":"SIGNUP")),e.createElement(m,{inverse:!0,onClick:f},"SWITCH TO ",s?"SIGNUP":"LOGIN")))};export{b as default};
