"use strict";(self.webpackChunkconnection=self.webpackChunkconnection||[]).push([[533],{9533:(L,p,r)=>{r.r(p),r.d(p,{SignInComponent:()=>z});var c=r(6814),l=r(2072),s=r(6223),m=r(2296),f=r(5940),P=r(8645),w=r(6306),O=r(6232),v=r(4716),u=r(9392),h=r(192),n=r(9212),M=r(8833);let d=(()=>{class t{static#n=this.incorrectCredentials=[];constructor(e,o,i){this.http=e,this.router=o,this.notificationService=i,this.loading$$=new P.x,this.loading$=this.loading$$.asObservable()}onSubmit(e){const o=e.value;this.loading$$.next(!0),this.http.signIn(o).pipe((0,w.K)(i=>(this.notificationService.error(i.error.message||h.T.UNKNOWN_ERROR),"NotFoundException"===i.error.type&&(e.setErrors({incorrectCreds:i.error.message}),t.incorrectCredentials.push(o)),O.E)),(0,v.x)(()=>this.loading$$.next(!1))).subscribe(i=>{const{email:g}=e.value,{token:$,uid:J}=i;u.e.setCredentials({email:g,token:$,uid:J}),this.router.navigate(["/"]),this.notificationService.success(h.T.SUCCESS_SIGNIN)})}static#t=this.\u0275fac=function(o){return new(o||t)(n.LFG(u.e),n.LFG(l.F0),n.LFG(M.g))};static#e=this.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function y(t,a){1&t&&n._UZ(0,"mat-spinner",2)}function Z(t,a){1&t&&(n.TgZ(0,"p",15),n._uU(1,"Please enter email"),n.qZA())}function k(t,a){1&t&&(n.TgZ(0,"p",15),n._uU(1,"The email is invalid"),n.qZA())}function T(t,a){1&t&&(n.TgZ(0,"p",15),n._uU(1," Please enter a password "),n.qZA())}function F(t,a){if(1&t&&(n.TgZ(0,"p",15),n._uU(1),n.qZA()),2&t){const e=n.oxw(3);n.xp6(1),n.hij(" Your password isn't strong enough: ",null==e.password||null==e.password.errors?null:e.password.errors.weakPassword," ")}}function E(t,a){if(1&t&&n.YNc(0,F,2,1,"p",7),2&t){const e=n.oxw(2);n.Q6J("ngIf",e.hasError("password","weakPassword"))}}function N(t,a){if(1&t&&(n.TgZ(0,"p",15),n._uU(1),n.qZA()),2&t){const e=n.oxw(2);n.xp6(1),n.hij(" ",null==e.form.errors?null:e.form.errors.incorrectCreds," ")}}function A(t,a){if(1&t){const e=n.EpF();n.TgZ(0,"form",3),n.NdJ("ngSubmit",function(){n.CHM(e);const i=n.oxw();return n.KtG(i.onSubmit())}),n.TgZ(1,"h2"),n._uU(2,"Sign in"),n.qZA(),n.TgZ(3,"div",4),n._UZ(4,"label",5)(5,"input",6),n.YNc(6,Z,2,0,"p",7)(7,k,2,0,"p",7),n._UZ(8,"label",8)(9,"input",9),n.YNc(10,T,2,0,"p",10)(11,E,1,1,"ng-template",null,11,n.W1O)(13,N,2,1,"p",7),n.qZA(),n.TgZ(14,"div",12)(15,"a",13),n._uU(16,"SignUp"),n.qZA(),n.TgZ(17,"button",14),n.ALo(18,"async"),n._uU(19," SignIn "),n.qZA()()()}if(2&t){const e=n.MAs(12),o=n.oxw();n.Q6J("formGroup",o.form),n.xp6(6),n.Q6J("ngIf",o.hasError("email","required")),n.xp6(1),n.Q6J("ngIf",o.hasError("email","email")),n.xp6(3),n.Q6J("ngIf",o.hasError("password","required"))("ngIfElse",e),n.xp6(3),n.Q6J("ngIf",o.form.hasError("incorrectCreds")),n.xp6(2),n.Q6J("routerLink","/signup"),n.xp6(2),n.Q6J("disabled",!o.form.valid||n.lcZ(18,8,o.loading$))}}let U=(()=>{class t{constructor(e){this.signInService=e,this.loading$=this.signInService.loading$,this.form=new s.cw({email:new s.NI("",{validators:[s.kI.required,s.kI.email]}),password:new s.NI("",{validators:[s.kI.required,t=>t.value?.length<8?{weakPassword:"Password must be at least 8 characters long"}:(t=>/[a-z]/.test(t)&&/[A-Z]/.test(t))(t.value)?(t=>/[0-9]/.test(t)&&/[a-zA-Z]/.test(t))(t.value)?(t=>/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(t))(t.value)?null:{weakPassword:"Password must contain at least one symbol"}:{weakPassword:"Password must contain at least one number and one letter"}:{weakPassword:"Password must contain at least one uppercase and one lowercase letter"}]})},{validators:[t=>d.incorrectCredentials.length&&(t=>d.incorrectCredentials.some(a=>a.email===t.email&&a.password===t.password))(t.value)?{incorrectCreds:"Email or password is incorrect"}:null]})}onSubmit(){this.signInService.onSubmit(this.form)}hasError(e,o){const i=this.form.get(e);return i?.touched&&i?.errors?.[o]}get password(){return this.form.get("password")}get email(){return this.form.get("email")}static#n=this.\u0275fac=function(o){return new(o||t)(n.Y36(d))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["app-sign-in-form"]],standalone:!0,features:[n.jDz],decls:4,vars:4,consts:[["class","spinner",4,"ngIf","ngIfElse"],["content",""],[1,"spinner"],[1,"signup-form",3,"formGroup","ngSubmit"],[1,"container"],["for","email",1,"label"],["type","text","formControlName","email","id","email","placeholder","email@mail.com",1,"input"],["class","error",4,"ngIf"],["for","password",1,"label"],["type","password","formControlName","password","id","password","placeholder","Password",1,"input"],["class","error",4,"ngIf","ngIfElse"],["weakPassword",""],[1,"btn-container"],[3,"routerLink"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],[1,"error"]],template:function(o,i){if(1&o&&(n.YNc(0,y,1,0,"mat-spinner",0),n.ALo(1,"async"),n.YNc(2,A,20,10,"ng-template",null,1,n.W1O)),2&o){const g=n.MAs(3);n.Q6J("ngIf",n.lcZ(1,2,i.loading$))("ngIfElse",g)}},dependencies:[c.ez,c.O5,c.Ov,s.UX,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,l.Bz,l.rH,m.ot,m.lW,f.Cq,f.Ou],styles:["*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#e3f2fd;font-family:Roboto,Helvetica Neue,sans-serif}body.dark-theme[_ngcontent-%COMP%]{background-color:#283593;color:#e3f2fd}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited{color:#3f51b5}a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:visited:hover{opacity:.8}a[_ngcontent-%COMP%]:active, a[_ngcontent-%COMP%]:visited:active{opacity:.6}.dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.error-snackbar[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #ff0000}.success-snackbar[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;color:#3f51b5;background-color:#e3f2fd;border-bottom:3px solid #00ff00}button[_ngcontent-%COMP%]:disabled{color:#757575}.btn[_ngcontent-%COMP%]{height:36px;padding:0 1rem;align-self:flex-start;color:#fafafa;background-color:#424242;border-radius:4px;border:none;cursor:pointer}.btn[_ngcontent-%COMP%]:hover{opacity:.9}.btn[_ngcontent-%COMP%]:disabled{background-color:#b8b1b1;opacity:1;cursor:not-allowed}.input[_ngcontent-%COMP%]{width:100%;padding:0 .5rem;background-color:transparent;border:1px solid #3f51b5;border-radius:4px}.messages[_ngcontent-%COMP%]{max-height:50vh;display:flex;flex-direction:column;gap:.25rem;padding:.5rem;border:1px solid #283593;border-radius:4px;list-style:none;overflow:auto}.messages__item[_ngcontent-%COMP%]{margin-right:2rem;padding:.5rem;width:-moz-fit-content;width:fit-content;display:flex;flex-direction:column;gap:.25rem;border:1px solid #3f51b5;border-radius:4px;background-color:#9cd1f8}.user-messages[_ngcontent-%COMP%]{margin-right:0;margin-left:2rem;align-self:flex-end}.spinner[_ngcontent-%COMP%]{margin-top:1rem;align-self:center}[_nghost-%COMP%]{margin-top:45px;display:flex;flex-direction:column;gap:20px;align-items:center}.signup-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;padding:20px;width:350px;border-radius:4px}.btn-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}.label[_ngcontent-%COMP%]{font-size:10px;font-weight:400;line-height:12px;text-align:left}.input[_ngcontent-%COMP%]{width:100%;padding:13px 8px;background-color:transparent;border:1px solid #3f51b5;border-radius:4px}.error[_ngcontent-%COMP%]{font-size:10px;font-weight:400;line-height:12px;text-align:left;color:red}.dark-theme[_nghost-%COMP%]   a[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   a[_ngcontent-%COMP%], .dark-theme[_nghost-%COMP%]   a[_ngcontent-%COMP%]:visited, .dark-theme   [_nghost-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#e89126}.dark-theme[_nghost-%COMP%]   .input[_ngcontent-%COMP%], .dark-theme   [_nghost-%COMP%]   .input[_ngcontent-%COMP%]{color:#e3f2fd;border-color:#e89126}"]})}return t})(),z=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["app-sign-in"]],standalone:!0,features:[n.jDz],decls:1,vars:0,template:function(o,i){1&o&&n._UZ(0,"app-sign-in-form")},dependencies:[c.ez,U]})}return t})()}}]);