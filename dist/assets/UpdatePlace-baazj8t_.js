import{r as n,A as h,b as I,u as P,R as e,a as g}from"./index-BCgOLtny.js";import{u as A,I as m,V as C,a as b}from"./form-hook-BiT_Tk6A.js";import{u as T,E as x,B as y}from"./http-hook-d4EMoGzl.js";import{C as D}from"./Card-8CA250M_.js";/* empty css                  */const U=()=>{const s=n.useContext(h),{isLoading:o,error:c,sendRequest:r,clearError:E}=T(),[a,f]=n.useState(),l=I().placeId,v=P(),[i,p,u]=A({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1);n.useEffect(()=>{(async()=>{try{const t=await r(`https://scoring-app-backend.onrender.com/api/places/${l}`);f(t.place),u({title:{value:t.place.title,isValid:!0},description:{value:t.place.description,isValid:!0}},!0)}catch(t){console.log("err: ",t)}})()},[r,l,u]);const V=async d=>{d.preventDefault();try{await r(`https://scoring-app-backend.onrender.com/api/places/${l}`,"PATCH",JSON.stringify({title:i.inputs.title.value,description:i.inputs.description.value}),{"Content-Type":"application/json",Authorization:"Bearer "+s.token}),v("/"+s.userId+"/places")}catch(t){console.log("err: ",t)}};return o?e.createElement("div",{className:"center"},e.createElement(g,null)):!a&&!c?e.createElement("div",{className:"center"},e.createElement(D,null,e.createElement("h2",null,"Could not find place!"))):e.createElement(e.Fragment,null,e.createElement(x,{error:c,onClear:E}),!o&&a&&e.createElement("form",{className:"place-form",onSubmit:V},e.createElement(m,{id:"title",element:"input",type:"text",label:"Title",validators:[C()],errorText:"Please enter a valid title.",onInput:p,initialValue:a.title,initialValid:!0}),e.createElement(m,{id:"description",element:"textarea",label:"Description",validators:[b(5)],errorText:"Please enter a valid description (min. 5 characters).",onInput:p,initialValue:a.description,initialValid:!0}),e.createElement(y,{type:"submit",disabled:!i.isValid},"UPDATE PLACE")))};export{U as default};