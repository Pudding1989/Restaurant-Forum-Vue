(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c47bfba"],{"00b4":function(e,t,a){"use strict";a("ac1f");var r=a("23e7"),s=a("da84"),n=a("c65b"),o=a("e330"),i=a("1626"),c=a("861d"),l=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),u=s.Error,m=o(/./.test);r({target:"RegExp",proto:!0,forced:!l},{test:function(e){var t=this.exec;if(!i(t))return m(this,e);var a=n(t,this,e);if(null!==a&&!c(a))throw new u("RegExp exec method returned something other than an Object or null");return!!a}})},"5c9c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container py-5"},[a("form",{staticClass:"w-100",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.handleSubmit.apply(null,arguments)}}},[e._m(0),a("div",{staticClass:"form-label-group mb-2"},[a("label",{attrs:{for:"name"}},[e._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text",placeholder:"name",autocomplete:"username",required:"",autofocus:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),a("div",{staticClass:"form-label-group mb-2"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email",placeholder:"email",autocomplete:"email",required:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),a("div",{staticClass:"form-label-group mb-3"},[a("label",{attrs:{for:"password"}},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{id:"password",name:"password",type:"password",placeholder:"Password",autocomplete:"new-password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),a("div",{staticClass:"form-label-group mb-3"},[a("label",{attrs:{for:"password-check"}},[e._v("Password Check")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordCheck,expression:"passwordCheck"}],staticClass:"form-control",attrs:{id:"password-check",name:"passwordCheck",type:"password",placeholder:"Password",autocomplete:"new-password",required:""},domProps:{value:e.passwordCheck},on:{input:function(t){t.target.composing||(e.passwordCheck=t.target.value)}}})]),a("button",{staticClass:"btn btn-lg btn-primary btn-block mb-3",attrs:{type:"submit"}},[e._v(" Submit ")]),a("div",{staticClass:"text-center mb-3"},[a("p",[a("router-link",{attrs:{to:"/signin"}},[e._v(" Sign In ")])],1)]),a("p",{staticClass:"mt-5 mb-3 text-muted text-center"},[e._v("© 2017-2018")])])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center mb-4"},[a("h1",{staticClass:"h3 mb-3 font-weight-normal"},[e._v("Sign Up")])])}],n=a("1da1"),o=(a("96cf"),a("b0c0"),a("ac1f"),a("00b4"),a("d9e2"),a("7696")),i=a("2fa3"),c={data:function(){return{name:"",email:"",password:"",passwordCheck:""}},watch:{passwordCheck:function(){this.password&&this.passwordCheck&&this.password===this.passwordCheck&&i["a"].fire({icon:"success",title:"再次確認密碼成功"})}},methods:{handleSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.name){t.next=4;break}return i["a"].fire({icon:"warning",title:"請填入姓名"}),t.abrupt("return");case 4:if(e.email){t.next=9;break}return i["a"].fire({icon:"warning",title:"請填入Email"}),t.abrupt("return");case 9:if(/[^@\s]+@[^@\s]+\.[^@\s]+/.test(e.email)){t.next=12;break}return i["a"].fire({icon:"warning",title:"Email格式錯誤"}),t.abrupt("return");case 12:if(e.password){t.next=15;break}return i["a"].fire({icon:"warning",title:"請填入密碼"}),t.abrupt("return");case 15:if(e.password===e.passwordCheck){t.next=18;break}return i["a"].fire({icon:"warning",title:"兩次輸入密碼不同"}),t.abrupt("return");case 18:return t.next=20,o["a"].signUP({name:e.name,email:e.email,password:e.password,passwordCheck:e.passwordCheck});case 20:if(a=t.sent,r=a.data,"error"!==r.status){t.next=24;break}throw new Error(r.message);case 24:i["a"].fire({icon:"success",title:"成功建立帳號"}),e.$router.push({name:"root"}),t.next=32;break;case 28:t.prev=28,t.t0=t["catch"](0),console.log(t.t0),i["a"].fire({icon:"warning",title:"無法註冊，<br>".concat(t.t0.message)});case 32:case"end":return t.stop()}}),t,null,[[0,28]])})))()}}},l=c,u=a("2877"),m=Object(u["a"])(l,r,s,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-1c47bfba.e940b3c9.js.map