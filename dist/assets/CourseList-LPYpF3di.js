import{r as u,A as y,u as T,R as e,L as v,s as r}from"./index-2bMJbr3r.js";import{u as A,E as O,M as L,B as s}from"./ErrorModal-CcmeLWGh.js";import{C as h}from"./Card-DiVCC_vI.js";const C=t=>{const[c,n]=u.useState(!1),{isLoading:b,error:g,sendRequest:i,clearError:f}=A(),l=u.useContext(y),d=T(),I=()=>{n(!0)},E=()=>{n(!1)},D=async()=>{n(!1);try{await i(`https://scoring-app-backend.onrender.com/api/courses/${t.id}`,"DELETE",null,{Authorization:"Bearer "+l.token}),t.onDelete(t.id)}catch(a){console.log("err: ",a)}},N=async(a,o,m)=>{a.preventDefault();let w;try{w=await i("https://scoring-app-backend.onrender.com/api/labs","POST",JSON.stringify({courseid:o,labid:m,labpassword:a.target.labInput.value}),{Authorization:"Bearer "+l.token,"Content-Type":"application/json"}),d("/profile")}catch(S){console.log("err labSubmitHandler: ",S)}},p=async a=>{a.preventDefault();let o;try{o=await i("https://scoring-app-backend.onrender.com/api/courses/join","POST",JSON.stringify({courseid:t.id}),{Authorization:"Bearer "+l.token,"Content-Type":"application/json"}),d("/profile")}catch(m){console.log("err joinCourseHandler: ",m)}},k=a=>{a.preventDefault()};return e.createElement(e.Fragment,null,e.createElement(O,{error:g,onClear:f}),e.createElement(L,{show:c,onCancel:E,header:"Are you sure?",footerClass:"course-item__modal-actions",footer:e.createElement(e.Fragment,null,e.createElement(s,{inverse:!0,onClick:E},"CANCEL"),e.createElement(s,{danger:!0,onClick:D},"OK"))},e.createElement("p",null,"Do you want to delete this course? This action cannot be undone.")),e.createElement("li",{className:"course-item"},e.createElement(h,{className:"course-item__content"},b&&e.createElement(v,{asOverlay:!0}),e.createElement("div",{className:"course-item__info"},e.createElement("h2",{style:r.main},"COURSE"),t.title,e.createElement("div",{style:r.yourcourses},e.createElement("h3",{style:r.main},"DESCRIPTION"),t.description),t.labs&&t.labs.map(a=>e.createElement("div",{key:a._id},e.createElement("form",{onSubmit:o=>N(o,t.id,a._id)},a.isCompleted.includes(t.userId)?e.createElement(e.Fragment,null,e.createElement("span",{style:r.labcompleted},"LAB"),e.createElement("span",{style:r.labcompleted},a.name),e.createElement("span",{style:r.labcompleted},"< COMPLETED >")):e.createElement(e.Fragment,null,e.createElement("span",{style:r.labsubmit},"LAB"),e.createElement("span",{style:r.labsubmit},a.name),l.isAdmin?e.createElement("span",{style:r.labnotcompleted},"< NOT COMPLETED >"):e.createElement(e.Fragment,null,e.createElement("input",{style:r.labsubmit,onChange:k,placeholder:"enter lab password",type:"text",name:"labInput"}),e.createElement(s,{type:"submit"},"SUBMIT"))))))),e.createElement("div",{className:"course-item__actions"},l.userId===t.creatorId&&e.createElement(s,{to:`/courses/${t.id}`},"EDIT"),l.userId===t.creatorId&&e.createElement(s,{danger:!0,onClick:I},"DELETE"),l.userId!==t.creatorId&&!t.users.includes(l.userId)&&e.createElement(s,{onClick:p},"JOIN")))))},M=t=>{const c=u.useContext(y);return t.items.length===0?e.createElement("div",{className:"course-list center"},e.createElement(h,null,e.createElement("h2",null,"No courses found."),c.isAdmin&&e.createElement(s,{to:"/courses/new"},"New Course"))):e.createElement("ul",{className:"course-list"},t.showAllCourses?e.createElement(e.Fragment,null,t.items.map(n=>e.createElement(C,{key:n.id,id:n.id,title:n.title,description:n.description,creatorId:n.creator,onDelete:t.onDeleteCourse,users:n.users,userId:t.userId}))):e.createElement(e.Fragment,null,e.createElement("h3",{style:r.mycourses},"User '",t.userName,"' Courses"),t.items.map(n=>e.createElement(C,{key:n.id,id:n.id,title:n.title,description:n.description,labs:n.labs,creatorId:n.creator,onDelete:t.onDeleteCourse,users:n.users,userId:t.userId}))))};export{M as C};