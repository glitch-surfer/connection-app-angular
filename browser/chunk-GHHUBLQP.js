import{a as Z}from"./chunk-Y2J5WFSK.js";import"./chunk-5JDCOLZI.js";import"./chunk-QKVZ2CT4.js";import"./chunk-GSZV43AH.js";import{a as N,b as A,c as q,d as v,f as z,j as R,l as j,o as H}from"./chunk-2SKVBX5T.js";import{F as D,H as F}from"./chunk-S5VQBE6T.js";import{Aa as s,Ca as r,Da as a,Ea as h,Fa as O,Ga as S,Ia as b,Ma as _,Oa as p,Q as M,Ra as P,Sa as l,Ta as k,U as u,Ua as C,V as x,Va as I,Xa as w,Za as f,_a as g,eb as T,la as i,ma as E,mb as V,qb as $,rb as B,sb as L,va as c}from"./chunk-5IAL5MBJ.js";function G(e,n){e&1&&h(0,"mat-spinner",3)}function J(e,n){if(e&1){let t=b();r(0,"button",10),_("click",function(){u(t),p();let m=P(4),d=p(3);return x(d.onEdit(m.textContent))}),l(1," Edit "),a()}}function K(e,n){if(e&1&&(r(0,"p"),s(1,J,2,0,"button",8),l(2," name: "),r(3,"span",null,9),l(5),a()()),e&2){let t=p().ngIf,o=p(2);i(1),c("ngIf",!o.isEditable),i(4),k(t.name)}}function Q(e,n){e&1&&(r(0,"p",14),l(1,"Please enter name"),a())}function U(e,n){if(e&1&&(r(0,"p",14),l(1),a()),e&2){let t=p(4);i(1),I(" Maximum length is ",t.name.errors==null||t.name.errors.maxlength==null?null:t.name.errors.maxlength.requiredLength,", you entered ",t.name.errors==null||t.name.errors.maxlength==null?null:t.name.errors.maxlength.actualLength," ")}}function W(e,n){e&1&&(r(0,"p",14),l(1,"Only letters are allowed"),a())}function X(e,n){if(e&1&&(O(0),r(1,"label",11),l(2,"name: "),a(),h(3,"input",12),s(4,Q,2,0,"p",13)(5,U,2,2,"p",13)(6,W,2,0,"p",13),S()),e&2){let t=p(3);i(3),c("formControl",t.name),i(1),c("ngIf",t.hasError("required")),i(1),c("ngIf",t.hasError("maxlength")),i(1),c("ngIf",t.hasError("pattern"))}}function Y(e,n){if(e&1&&(r(0,"div")(1,"p"),l(2),a(),r(3,"p"),l(4),a(),s(5,K,6,2,"p",4)(6,X,7,4,"ng-container",4),r(7,"p"),l(8),f(9,"date"),a()()),e&2){let t=n.ngIf,o=p(2);i(2),C("id: ",t.uid,""),i(2),C("email: ",t.email,""),i(1),c("ngIf",!o.isEditable),i(1),c("ngIf",o.isEditable),i(2),C("created: ",g(9,5,t.createdAt),"")}}function ee(e,n){if(e&1){let t=b();r(0,"button",15),_("click",function(){u(t);let m=p(2);return x(m.isEditable=!1)}),l(1,"Cancel"),a()}}function te(e,n){if(e&1){let t=b();r(0,"button",16),_("click",function(){u(t);let m=p(2);return x(m.onSave())}),l(1,"Save"),a()}}function ne(e,n){if(e&1&&(s(0,Y,10,7,"div",4),f(1,"async"),r(2,"div",5),s(3,ee,2,0,"button",6)(4,te,2,0,"button",7),a()),e&2){let t=p();c("ngIf",g(1,3,t.profile$)),i(3),c("ngIf",t.isEditable),i(1),c("ngIf",t.isEditable)}}var _e=(()=>{let n=class n{constructor(o){this.profileService=o,this.name=new R("",{validators:[v.required,v.maxLength(40),v.pattern(/^[a-zA-Zа-яА-Я ]+$/)]}),this.profile$=this.profileService.profile$,this.loading$=this.profileService.loading$,this.isEditable=!1}ngOnInit(){this.profileService.getProfile()}onEdit(o){o&&(this.isEditable=!0,this.name.setValue(o))}onSave(){this.name.invalid||!this.name.value||(this.isEditable=!1,this.profileService.updateProfileName(this.name.value))}hasError(o){return this.name?.touched&&this.name?.errors?.[o]}onLogout(){this.profileService.logout()}};n.\u0275fac=function(m){return new(m||n)(E(Z))},n.\u0275cmp=M({type:n,selectors:[["app-profile"]],standalone:!0,features:[w],decls:9,vars:7,consts:[["mat-flat-button","","color","secondary",1,"logout-btn",3,"disabled","click"],["class","spinner",4,"ngIf","ngIfElse"],["content",""],[1,"spinner"],[4,"ngIf"],[1,"btn-container"],["mat-flat-button","","color","secondary",3,"click",4,"ngIf"],["mat-flat-button","","color","primary",3,"click",4,"ngIf"],["mat-flat-button","","color","secondary","class","edit-btn",3,"click",4,"ngIf"],["profileName",""],["mat-flat-button","","color","secondary",1,"edit-btn",3,"click"],["for","name"],["type","text","id","name","placeholder","name",1,"input",3,"formControl"],["class","error",4,"ngIf"],[1,"error"],["mat-flat-button","","color","secondary",3,"click"],["mat-flat-button","","color","primary",3,"click"]],template:function(m,d){if(m&1&&(r(0,"h2"),l(1,"Profile"),a(),r(2,"button",0),_("click",function(){return d.onLogout()}),f(3,"async"),l(4,"Logout"),a(),s(5,G,1,0,"mat-spinner",1),f(6,"async"),s(7,ne,5,5,"ng-template",null,2,T)),m&2){let y=P(8);i(2),c("disabled",g(3,3,d.loading$)),i(3),c("ngIf",g(6,5,d.loading$))("ngIfElse",y)}},dependencies:[L,V,$,B,H,q,z,j,F,D,A,N],styles:["*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#e3f2fd;font-family:Roboto,Helvetica Neue,sans-serif}body.dark-theme[_ngcontent-%COMP%]{background-color:#283593;color:#e3f2fd}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited{color:#3f51b5}a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited:hover{opacity:.8}a[_ngcontent-%COMP%]:active, a[_ngcontent-%COMP%]:visited:active{opacity:.6}.dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.error-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #ff0000}.success-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #00ff00}button[_ngcontent-%COMP%]:disabled{color:#757575}.btn[_ngcontent-%COMP%]{height:36px;padding:0 1rem;align-self:flex-start;color:#fafafa;background-color:#424242;border-radius:4px;border:none;cursor:pointer}.btn[_ngcontent-%COMP%]:hover{opacity:.9}.btn[_ngcontent-%COMP%]:disabled{background-color:#b8b1b1;opacity:1;cursor:not-allowed}.input[_ngcontent-%COMP%]{width:100%;padding:0 .5rem;background-color:transparent;border:1px solid #3f51b5;border-radius:4px}.messages[_ngcontent-%COMP%]{max-height:50vh;display:flex;flex-direction:column;gap:.25rem;padding:.5rem;border:1px solid #283593;border-radius:4px;list-style:none;overflow:auto}.messages__item[_ngcontent-%COMP%]{padding:.5rem;width:fit-content;display:flex;flex-direction:column;gap:.25rem;border:1px solid #3f51b5;border-radius:4px;background-color:#9cd1f8}.user-messages[_ngcontent-%COMP%]{align-self:flex-end}.spinner[_ngcontent-%COMP%]{margin-top:1rem;align-self:center}[_nghost-%COMP%]{position:relative;display:flex;flex-direction:column;gap:20px;align-items:center}.error[_ngcontent-%COMP%]{font-size:10px;font-weight:400;line-height:12px;text-align:left;color:red}.edit-btn[_ngcontent-%COMP%]{position:absolute;top:2rem;left:15%}.btn-container[_ngcontent-%COMP%]{display:flex;gap:2rem}.logout-btn[_ngcontent-%COMP%]{position:absolute;top:2rem;right:15%}"]});let e=n;return e})();export{_e as ProfileComponent};