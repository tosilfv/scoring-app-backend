import{r as p,A as g,R as e,a as h}from"./index-JZdi9Rnb.js";import{C as w}from"./Card-0Z-Vace0.js";import{u as T,I as i,V as y,b as L,a as S}from"./form-hook-CWK0Kl06.js";import{u as O,E as b,B as m}from"./http-hook-DeVzMSQf.js";const R=()=>{const l=p.useContext(g),[s,d]=p.useState(!0),{isLoading:c,error:E,sendRequest:o,clearError:I}=O(),[a,n,u]=T({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),f=()=>{s?u({...a.inputs,name:{value:"",isValid:!1}},!1):u({...a.inputs,name:void 0},a.inputs.email.isValid&&a.inputs.password.isValid),d(r=>!r)},v=async r=>{if(r.preventDefault(),s)try{const t=await o("https://scoring-app-backend.onrender.com/api/users/login","POST",JSON.stringify({email:a.inputs.email.value,password:a.inputs.password.value}),{"Content-Type":"application/json"});l.login(t.userId,t.token)}catch{}else try{const t=await o("https://scoring-app-backend.onrender.com/api/users/signup","POST",JSON.stringify({email:a.inputs.email.value,password:a.inputs.password.value,name:a.inputs.name.value}),{"Content-Type":"application/json"});l.login(t.userId,t.token)}catch{}};return e.createElement(e.Fragment,null,e.createElement(b,{error:E,onClear:I}),e.createElement(w,{className:"authentication"},c&&e.createElement(h,{asOverlay:!0}),e.createElement("h2",null,"Login Required"),e.createElement("hr",null),e.createElement("form",{onSubmit:v},!s&&e.createElement(i,{element:"input",id:"name",type:"text",label:"Your Name",validators:[y()],errorText:"Please enter a name.",onInput:n}),e.createElement(i,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[L()],errorText:"Please enter a valid email address.",onInput:n}),e.createElement(i,{element:"input",id:"password",type:"password",label:"Password",validators:[S(5)],errorText:"Please enter a valid password, at least 5 characters.",onInput:n}),e.createElement(m,{type:"submit",disabled:!a.isValid},s?"LOGIN":"SIGNUP")),e.createElement(m,{inverse:!0,onClick:f},"SWITCH TO ",s?"SIGNUP":"LOGIN")))};export{R as default};
