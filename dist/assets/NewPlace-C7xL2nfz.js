import{r as m,A as v,u as E,R as e,a as f}from"./index-BAekq9sh.js";import{u as A,I as r,V as s,a as x}from"./form-hook-DWVvnCV1.js";import{u as I,E as T,B as b}from"./http-hook-BRc6Pwks.js";/* empty css                  */const C=()=>{const l=m.useContext(v),n=E(),{isLoading:i,error:o,sendRequest:d,clearError:u}=I(),[t,a]=A({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1}},!1),c=async p=>{p.preventDefault();try{await d("http://localhost:5000/api/places","POST",JSON.stringify({title:t.inputs.title.value,description:t.inputs.description.value,address:t.inputs.address.value}),{Authorization:"Bearer "+l.token,"Content-Type":"application/json"}),n("/")}catch{}};return e.createElement(e.Fragment,null,e.createElement(T,{error:o,onClear:u}),e.createElement("form",{className:"place-form",onSubmit:c},i&&e.createElement(f,{asOverlay:!0}),e.createElement(r,{id:"title",element:"input",type:"text",label:"Title",validators:[s()],errorText:"Please enter a valid title.",onInput:a}),e.createElement(r,{id:"description",element:"textarea",label:"Description",validators:[x(5)],errorText:"Please enter a valid description (at least 5 characters).",onInput:a}),e.createElement(r,{id:"address",element:"input",label:"Address",validators:[s()],errorText:"Please enter a valid address.",onInput:a}),e.createElement(b,{type:"submit",disabled:!t.isValid},"ADD PLACE")))};export{C as default};
