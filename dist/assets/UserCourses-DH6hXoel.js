import{r as u,A as y,R as e,a as C,b as I}from"./index-foS3uHt8.js";import{C as h}from"./Card-Bn5AJJ51.js";import{u as f,E as g,M as N,B as o}from"./http-hook-qlqJwGvS.js";const w=t=>{const{isLoading:r,error:l,sendRequest:d,clearError:c}=f(),n=u.useContext(y),[i,s]=u.useState(!1),m=()=>{s(!0)},a=()=>{s(!1)},E=async()=>{s(!1);try{await d(`https://scoring-app-backend.onrender.com/api/courses/${t.id}`,"DELETE",null,{Authorization:"Bearer "+n.token}),t.onDelete(t.id)}catch(D){console.log("err: ",D)}};return e.createElement(e.Fragment,null,e.createElement(g,{error:l,onClear:c}),e.createElement(N,{show:i,onCancel:a,header:"Are you sure?",footerClass:"course-item__modal-actions",footer:e.createElement(e.Fragment,null,e.createElement(o,{inverse:!0,onClick:a},"CANCEL"),e.createElement(o,{danger:!0,onClick:E},"OK"))},e.createElement("p",null,"Do you want to proceed and delete this course? Please note that it can`t be undone thereafter.")),e.createElement("li",{className:"course-item"},e.createElement(h,{className:"course-item__content"},r&&e.createElement(C,{asOverlay:!0}),e.createElement("div",{className:"course-item__info"},e.createElement("h2",null,t.title),e.createElement("h3",null,t.address),e.createElement("p",null,t.description)),e.createElement("div",{className:"course-item__actions"},n.userId===t.creatorId&&e.createElement(o,{to:`/courses/${t.id}`},"EDIT"),n.userId===t.creatorId&&e.createElement(o,{danger:!0,onClick:m},"DELETE")))))},L=t=>t.items.length===0?e.createElement("div",{className:"course-list center"},e.createElement(h,null,e.createElement("h2",null,"No courses found. Maybe create one?"),e.createElement(o,{to:"/courses/new"},"Share Course"))):e.createElement("ul",{className:"course-list"},t.items.map(r=>e.createElement(w,{key:r.id,id:r.id,image:r.image,title:r.title,description:r.description,address:r.address,creatorId:r.creator,coordinates:r.location,onDelete:t.onDeleteCourse}))),M=()=>{const[t,r]=u.useState(),{isLoading:l,error:d,sendRequest:c,clearError:n}=f(),i=I().userId;u.useEffect(()=>{(async()=>{try{const a=await c(`https://scoring-app-backend.onrender.com/api/courses/user/${i}`);r(a.courses)}catch(a){console.log("err: ",a)}})()},[c,i]);const s=m=>{r(a=>a.filter(E=>E.id!==m))};return e.createElement(e.Fragment,null,e.createElement(g,{error:d,onClear:n}),l&&e.createElement("div",{className:"center"},e.createElement(C,null)),!l&&t&&e.createElement(L,{items:t,onDeleteCourse:s}))};export{M as default};
