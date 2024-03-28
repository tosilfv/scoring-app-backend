import{r,R as s}from"./index-DZe3TCGe.js";const o="REQUIRE",A="MINLENGTH",V="MAXLENGTH",f="MIN",m="MAX",E="EMAIL",_=()=>({type:o}),y=e=>({type:A,val:e}),L=()=>({type:E}),p=(e,t)=>{let l=!0;for(const i of t)i.type===o&&(l=l&&e.trim().length>0),i.type===A&&(l=l&&e.trim().length>=i.val),i.type===V&&(l=l&&e.trim().length<=i.val),i.type===f&&(l=l&&+e>=i.val),i.type===m&&(l=l&&+e<=i.val),i.type===E&&(l=l&&/^\S+@\S+\.\S+$/.test(e));return l},R=(e,t)=>{switch(t.type){case"CHANGE":return{...e,value:t.val,isValid:p(t.val,t.validators)};case"TOUCH":return{...e,isTouched:!0};default:return e}},N=e=>{const[t,l]=r.useReducer(R,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),{id:i,onInput:u}=e,{value:d,isValid:a}=t;r.useEffect(()=>{u(i,d,a)},[i,d,a,u]);const n=I=>{l({type:"CHANGE",val:I.target.value,validators:e.validators})},c=()=>{l({type:"TOUCH"})},T=e.element==="input"?s.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:n,onBlur:c,value:t.value}):s.createElement("textarea",{id:e.id,placeholder:e.placeholder,rows:e.rows||3,onChange:n,onBlur:c,value:t.value});return s.createElement("div",{className:`form-control ${!t.isValid&&t.isTouched&&"form-control--invalid"}`},s.createElement("label",{htmlFor:e.id},e.label),T,!t.isValid&&t.isTouched&&s.createElement("p",null,e.errorText))},h=(e,t)=>{switch(t.type){case"INPUT_CHANGE":let l=!0;for(const i in e.inputs)e.inputs[i]&&(i===t.inputId?l=l&&t.isValid:l=l&&e.inputs[i].isValid);return{...e,inputs:{...e.inputs,[t.inputId]:{value:t.value,isValid:t.isValid}},isValid:l};case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},H=(e,t)=>{const[l,i]=r.useReducer(h,{inputs:e,isValid:t}),u=r.useCallback((a,n,c)=>{i({type:"INPUT_CHANGE",value:n,isValid:c,inputId:a})},[]),d=r.useCallback((a,n)=>{i({type:"SET_DATA",inputs:a,formIsValid:n})},[]);return[l,u,d]};export{N as I,_ as V,y as a,L as b,H as u};