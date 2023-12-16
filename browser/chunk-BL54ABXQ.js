import{c as V}from"./chunk-6TJ5WKSG.js";import"./chunk-QMW4F7ZL.js";import"./chunk-Y2J5WFSK.js";import"./chunk-5JDCOLZI.js";import{f as j}from"./chunk-FU4DWJD5.js";import"./chunk-UB4EZDCW.js";import"./chunk-QKVZ2CT4.js";import"./chunk-GSZV43AH.js";import{a as G,b as B}from"./chunk-2SKVBX5T.js";import{F as T,H as E}from"./chunk-S5VQBE6T.js";import{Aa as g,Ca as a,Da as r,Db as R,Ea as C,Fb as I,Ia as y,Ma as f,Oa as _,Q as b,Ra as k,Sa as m,Ta as D,U as h,Ua as x,V as O,Xa as M,Ya as N,Za as c,_a as l,eb as L,la as i,lb as S,ma as v,mb as w,qb as $,sb as P,va as d,xa as F}from"./chunk-5IAL5MBJ.js";function K(e,t){if(e&1&&(a(0,"span"),m(1),c(2,"async"),r()),e&2){let n=_();i(1),x(" (timeout: ",l(2,1,n.timer$),")")}}function Q(e,t){e&1&&C(0,"mat-spinner",7)}function W(e,t){if(e&1){let n=y();a(0,"button",13),f("click",function(){h(n);let s=_().$implicit,p=_(2);return O(p.deleteGroup(s.id))}),m(1," Delete "),r()}}var X=e=>["group",e];function Y(e,t){if(e&1&&(a(0,"li",10)(1,"a",11),m(2),r(),g(3,W,2,0,"button",12),c(4,"async"),r()),e&2){let n=t.$implicit,o=_(2);i(1),d("routerLink",N(5,X,n.id)),i(1),D(n.name),i(1),d("ngIf",n.createdBy===l(4,3,o.userId$))}}function Z(e,t){if(e&1&&(a(0,"ul",8),g(1,Y,5,7,"li",9),c(2,"async"),r()),e&2){let n=_();i(1),d("ngForOf",l(2,1,n.groups$))}}var A=(()=>{let t=class t{constructor(o){this.groupsListService=o,this.groups$=this.groupsListService.groups$,this.userId$=this.groupsListService.userId$,this.timer$=this.groupsListService.timer$,this.loading$=this.groupsListService.loading$}ngOnInit(){this.groupsListService.initGroupsList()}updateGroups(){this.groupsListService.getGroupsList(),this.groupsListService.setTimer()}openDialog(){this.groupsListService.openCreateGroupDialog()}deleteGroup(o){this.groupsListService.deleteGroup(o)}};t.\u0275fac=function(s){return new(s||t)(v(V))},t.\u0275cmp=b({type:t,selectors:[["app-groups-list"]],standalone:!0,features:[M],decls:15,vars:10,consts:[[1,"container"],[1,"btns-wrapper"],[1,"btn",3,"disabled","click"],[4,"ngIf"],["mat-flat-button","","color","primary",3,"click"],["class","spinner",4,"ngIf","ngIfElse"],["content",""],[1,"spinner"],[1,"groups"],["class","groups__item",4,"ngFor","ngForOf"],[1,"groups__item"],[3,"routerLink"],["mat-flat-button","","color","secondary","class","groups__delete-btn",3,"click",4,"ngIf"],["mat-flat-button","","color","secondary",1,"groups__delete-btn",3,"click"]],template:function(s,p){if(s&1&&(a(0,"section",0)(1,"h2"),m(2,"Groups"),r(),a(3,"div",1)(4,"button",2),f("click",function(){return p.updateGroups()}),c(5,"async"),m(6," Update"),g(7,K,3,3,"span",3),c(8,"async"),r(),a(9,"button",4),f("click",function(){return p.openDialog()}),m(10,"New Group"),r()(),g(11,Q,1,0,"mat-spinner",5),c(12,"async"),g(13,Z,3,3,"ng-template",null,6,L),r()),s&2){let u=k(14);i(4),d("disabled",l(5,4,p.timer$)),i(3),d("ngIf",l(8,6,p.timer$)),i(4),d("ngIf",l(12,8,p.loading$))("ngIfElse",u)}},dependencies:[P,S,w,$,I,R,E,T,B,G],styles:["*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#e3f2fd;font-family:Roboto,Helvetica Neue,sans-serif}body.dark-theme[_ngcontent-%COMP%]{background-color:#283593;color:#e3f2fd}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited{color:#3f51b5}a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited:hover{opacity:.8}a[_ngcontent-%COMP%]:active, a[_ngcontent-%COMP%]:visited:active{opacity:.6}.dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.error-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #ff0000}.success-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #00ff00}button[_ngcontent-%COMP%]:disabled{color:#757575}.btn[_ngcontent-%COMP%]{height:36px;padding:0 1rem;align-self:flex-start;color:#fafafa;background-color:#424242;border-radius:4px;border:none;cursor:pointer}.btn[_ngcontent-%COMP%]:hover{opacity:.9}.btn[_ngcontent-%COMP%]:disabled{background-color:#b8b1b1;opacity:1;cursor:not-allowed}.input[_ngcontent-%COMP%]{width:100%;padding:0 .5rem;background-color:transparent;border:1px solid #3f51b5;border-radius:4px}.messages[_ngcontent-%COMP%]{max-height:50vh;display:flex;flex-direction:column;gap:.25rem;padding:.5rem;border:1px solid #283593;border-radius:4px;list-style:none;overflow:auto}.messages__item[_ngcontent-%COMP%]{padding:.5rem;width:fit-content;display:flex;flex-direction:column;gap:.25rem;border:1px solid #3f51b5;border-radius:4px;background-color:#9cd1f8}.user-messages[_ngcontent-%COMP%]{align-self:flex-end}.spinner[_ngcontent-%COMP%]{margin-top:1rem;align-self:center}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.btns-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.groups[_ngcontent-%COMP%]{max-height:70vh;padding:.5rem 1rem;border:1px solid #283593;border-radius:4px;overflow:auto}.groups__item[_ngcontent-%COMP%]{position:relative;padding:.5rem 0;border-bottom:1px solid #3f51b5}.groups__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block}.groups__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#f2c082}.groups__delete-btn[_ngcontent-%COMP%]{position:absolute;top:0;right:0}.dark-theme[_nghost-%COMP%]   a[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_nghost-%COMP%]   a[_ngcontent-%COMP%]:visited, .dark-theme   [_nghost-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.dark-theme[_nghost-%COMP%]   .groups[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   .groups[_ngcontent-%COMP%]{border:1px solid #e89126}"]});let e=t;return e})();function ee(e,t){if(e&1&&(a(0,"span"),m(1),c(2,"async"),r()),e&2){let n=_();i(1),x(" (timeout: ",l(2,1,n.timer$),")")}}function te(e,t){e&1&&C(0,"mat-spinner",5)}function ne(e,t){if(e&1){let n=y();a(0,"li")(1,"button",8),f("click",function(){let p=h(n).$implicit,u=_(2);return O(u.goToConversation(p))}),m(2),r()()}if(e&2){let n=t.$implicit;i(1),F("existing-conversation",n.conversationId),i(1),x(" ",n.name," ")}}function oe(e,t){if(e&1&&(a(0,"ul",6),g(1,ne,3,3,"li",7),c(2,"async"),r()),e&2){let n=_();i(1),d("ngForOf",l(2,1,n.peoples$))}}var H=(()=>{let t=class t{constructor(o){this.peopleListService=o,this.peoples$=this.peopleListService.peoples$,this.timer$=this.peopleListService.timer$,this.loading$=this.peopleListService.loading$}ngOnInit(){this.peopleListService.initPeoplesList()}updatePeoples(){this.peopleListService.getPeoplesList(),this.peopleListService.setTimer()}goToConversation(o){this.peopleListService.goToConversation(o)}};t.\u0275fac=function(s){return new(s||t)(v(j))},t.\u0275cmp=b({type:t,selectors:[["app-people-list"]],standalone:!0,features:[M],decls:12,vars:10,consts:[[1,"container"],[1,"btn",3,"disabled","click"],[4,"ngIf"],["class","spinner",4,"ngIf","ngIfElse"],["content",""],[1,"spinner"],[1,"peoples"],[4,"ngFor","ngForOf"],["mat-flat-button","",1,"peoples__item",3,"click"]],template:function(s,p){if(s&1&&(a(0,"section",0)(1,"h2"),m(2,"Peoples"),r(),a(3,"button",1),f("click",function(){return p.updatePeoples()}),c(4,"async"),m(5," Update"),g(6,ee,3,3,"span",2),c(7,"async"),r(),g(8,te,1,0,"mat-spinner",3),c(9,"async"),g(10,oe,3,3,"ng-template",null,4,L),r()),s&2){let u=k(11);i(3),d("disabled",l(4,4,p.timer$)),i(3),d("ngIf",l(7,6,p.timer$)),i(2),d("ngIf",l(9,8,p.loading$))("ngIfElse",u)}},dependencies:[P,S,w,$,I,E,T,B,G],styles:["*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#e3f2fd;font-family:Roboto,Helvetica Neue,sans-serif}body.dark-theme[_ngcontent-%COMP%]{background-color:#283593;color:#e3f2fd}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited{color:#3f51b5}a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited:hover{opacity:.8}a[_ngcontent-%COMP%]:active, a[_ngcontent-%COMP%]:visited:active{opacity:.6}.dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.error-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #ff0000}.success-snackbar[_ngcontent-%COMP%]{width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #00ff00}button[_ngcontent-%COMP%]:disabled{color:#757575}.btn[_ngcontent-%COMP%]{height:36px;padding:0 1rem;align-self:flex-start;color:#fafafa;background-color:#424242;border-radius:4px;border:none;cursor:pointer}.btn[_ngcontent-%COMP%]:hover{opacity:.9}.btn[_ngcontent-%COMP%]:disabled{background-color:#b8b1b1;opacity:1;cursor:not-allowed}.input[_ngcontent-%COMP%]{width:100%;padding:0 .5rem;background-color:transparent;border:1px solid #3f51b5;border-radius:4px}.messages[_ngcontent-%COMP%]{max-height:50vh;display:flex;flex-direction:column;gap:.25rem;padding:.5rem;border:1px solid #283593;border-radius:4px;list-style:none;overflow:auto}.messages__item[_ngcontent-%COMP%]{padding:.5rem;width:fit-content;display:flex;flex-direction:column;gap:.25rem;border:1px solid #3f51b5;border-radius:4px;background-color:#9cd1f8}.user-messages[_ngcontent-%COMP%]{align-self:flex-end}.spinner[_ngcontent-%COMP%]{margin-top:1rem;align-self:center}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.peoples[_ngcontent-%COMP%]{max-height:70vh;padding:.5rem 1rem;border:1px solid #283593;border-radius:4px;overflow:auto}.peoples__item[_ngcontent-%COMP%]{width:100%;margin-bottom:.25rem}.peoples__item[_ngcontent-%COMP%]:not(.existing-conversation){background-color:#9cd1f8}.peoples__item.existing-conversation[_ngcontent-%COMP%]{background-color:#3f51b5}.dark-theme[_nghost-%COMP%]   .peoples[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   .peoples[_ngcontent-%COMP%]{border:1px solid #e89126}.dark-theme[_nghost-%COMP%]   .peoples__item[_ngcontent-%COMP%]:not(.existing-conversation), .dark-theme   [_nghost-%COMP%]   .peoples__item[_ngcontent-%COMP%]:not(.existing-conversation){background-color:#3d4eca}.dark-theme[_nghost-%COMP%]   .peoples__item.existing-conversation[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   .peoples__item.existing-conversation[_ngcontent-%COMP%]{background-color:#c67715}"]});let e=t;return e})();var Pe=(()=>{let t=class t{};t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=b({type:t,selectors:[["app-groups"]],standalone:!0,features:[M],decls:2,vars:0,template:function(s,p){s&1&&C(0,"app-groups-list")(1,"app-people-list")},dependencies:[P,A,H],styles:["[_nghost-%COMP%]{max-width:800px;padding:1rem;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}"]});let e=t;return e})();export{Pe as GroupsComponent};