import{r as p,A as h,u as L,R as e,L as S}from"./index-B97Ykex6.js";import{u as w,I as i,V as T,a as b,b as y}from"./Input-CvZ48vQ4.js";import{u as A,E as N,B as m}from"./ErrorModal-B7DTkNAq.js";import{C as O}from"./Card-3z9CmctK.js";const x=()=>{const o=p.useContext(h),[s,d]=p.useState(!0),{isLoading:c,error:g,sendRequest:l,clearError:E}=A(),v=L(),[t,n,u]=w({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),I=()=>{s?u({...t.inputs,name:{value:"",isValid:!1}},!1):u({...t.inputs,name:void 0},t.inputs.email.isValid&&t.inputs.password.isValid),d(r=>!r)},f=async r=>{if(r.preventDefault(),s)try{const a=await l("https://scoring-app-backend.onrender.com/api/users/login","POST",JSON.stringify({email:t.inputs.email.value,password:t.inputs.password.value}),{"Content-Type":"application/json"});o.login(a.userId,a.token,a.isAdmin,a.userName),v("/profile")}catch(a){console.log("err authSubmitHandler isLoginMode: ",a)}else try{const a=await l("https://scoring-app-backend.onrender.com/api/users/signup","POST",JSON.stringify({email:t.inputs.email.value,password:t.inputs.password.value,name:t.inputs.name.value}),{"Content-Type":"application/json"});o.login(a.userId,a.token,a.isAdmin)}catch(a){console.log("err authSubmitHandler !isLoginMode: ",a)}};return e.createElement(e.Fragment,null,e.createElement(N,{error:g,onClear:E}),e.createElement(O,{className:"authentication"},c&&e.createElement(S,{asOverlay:!0}),e.createElement("h2",null,"Login Required"),e.createElement("hr",null),e.createElement("form",{onSubmit:f},!s&&e.createElement(i,{element:"input",id:"name",type:"text",label:"Your Name",validators:[T()],errorText:"Please enter a name.",onInput:n}),e.createElement(i,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[b()],errorText:"Please enter a valid email.",onInput:n}),e.createElement(i,{element:"input",id:"password",type:"password",label:"Password",validators:[y(5)],errorText:"Please enter a valid password, at least 5 characters.",onInput:n}),e.createElement(m,{type:"submit",name:"login",disabled:!t.isValid},s?"LOGIN":"SIGNUP")),e.createElement(m,{inverse:!0,name:"signup",onClick:I},"SWITCH TO ",s?"SIGNUP":"LOGIN")))};export{x as default};