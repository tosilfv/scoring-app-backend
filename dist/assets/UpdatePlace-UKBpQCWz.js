import{r as n,A as V,b as I,u as P,R as e,a as A}from"./index-BAekq9sh.js";import{u as C,I as m,V as T,a as x}from"./form-hook-DWVvnCV1.js";import{u as y,E as b,B as D}from"./http-hook-BRc6Pwks.js";import{C as L}from"./Card-CDmk43Eg.js";/* empty css                  */const U=()=>{const s=n.useContext(V),{isLoading:c,error:o,sendRequest:l,clearError:E}=y(),[a,f]=n.useState(),r=I().placeId,v=P(),[i,p,u]=C({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1);n.useEffect(()=>{(async()=>{try{const t=await l(`http://localhost:5000/api/places/${r}`);f(t.place),u({title:{value:t.place.title,isValid:!0},description:{value:t.place.description,isValid:!0}},!0)}catch{}})()},[l,r,u]);const h=async d=>{d.preventDefault();try{await l(`http://localhost:5000/api/places/${r}`,"PATCH",JSON.stringify({title:i.inputs.title.value,description:i.inputs.description.value}),{"Content-Type":"application/json",Authorization:"Bearer "+s.token}),v("/"+s.userId+"/places")}catch{}};return c?e.createElement("div",{className:"center"},e.createElement(A,null)):!a&&!o?e.createElement("div",{className:"center"},e.createElement(L,null,e.createElement("h2",null,"Could not find place!"))):e.createElement(e.Fragment,null,e.createElement(b,{error:o,onClear:E}),!c&&a&&e.createElement("form",{className:"place-form",onSubmit:h},e.createElement(m,{id:"title",element:"input",type:"text",label:"Title",validators:[T()],errorText:"Please enter a valid title.",onInput:p,initialValue:a.title,initialValid:!0}),e.createElement(m,{id:"description",element:"textarea",label:"Description",validators:[x(5)],errorText:"Please enter a valid description (min. 5 characters).",onInput:p,initialValue:a.description,initialValid:!0}),e.createElement(D,{type:"submit",disabled:!i.isValid},"UPDATE PLACE")))};export{U as default};