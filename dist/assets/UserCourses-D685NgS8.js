import{r,a as E,A as g,R as s,L as h}from"./index-B97Ykex6.js";import{u as L,E as x}from"./ErrorModal-B7DTkNAq.js";import{C as A}from"./CourseList-61cPok5x.js";import"./Card-3z9CmctK.js";const S=()=>{const[a,n]=r.useState(),[m,d]=r.useState(""),{isLoading:c,error:i,sendRequest:u,clearError:C}=L(),t=E().userId,p=r.useContext(g);r.useEffect(()=>{(async()=>{let e;try{e=await u(`https://scoring-app-backend.onrender.com/api/courses/user/${t}`)}catch(o){console.log("err UserCourses: ",o)}e&&n(e.courses),e&&d(e.user.name)})()},[u,t]);const f=l=>{n(e=>e.filter(o=>o.id!==l))};return s.createElement(s.Fragment,null,s.createElement(x,{error:i,onClear:C}),c&&s.createElement("div",{className:"center"},s.createElement(h,null)),!c&&a&&p.isLoggedIn&&s.createElement(A,{showAllCourses:!1,items:a,onDeleteCourse:f,userId:t,userName:m}))};export{S as default};