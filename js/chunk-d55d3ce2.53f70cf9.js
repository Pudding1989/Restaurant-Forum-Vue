(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d55d3ce2"],{"22ab":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container py-5"},[r("NavTabs"),e.isLoading?r("Spinner"):[r("h1",{staticClass:"mt-5"},[e._v("美食達人")]),r("hr"),r("div",{staticClass:"row text-center"},e._l(e.users,(function(e){return r("userTopCard",{key:e.id,attrs:{"top-user-prop":e}})})),1)]],2)},s=[],a=r("1da1"),o=(r("96cf"),r("d81d"),r("b0c0"),r("8bb1")),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-3"},[r("router-link",{attrs:{to:{name:"user",params:{id:e.user.id}}}},[r("img",{attrs:{src:e._f("nullAvatar")(e.user.image),width:"140px",height:"140px"}})]),r("h2",[e._v(e._s(e.user.name))]),r("span",{staticClass:"badge badge-secondary"},[e._v("追蹤人數："+e._s(e.user.followerCount))]),r("p",{staticClass:"mt-3"},[e.user.isFollowed?r("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(t){return e.deleteFollowing(e.user.id)}}},[e._v(" 取消追蹤 ")]):r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){return e.addFollowing(e.user.id)}}},[e._v(" 追蹤 ")])])],1)},c=[],u=r("5530"),l=(r("d9e2"),r("2708")),d=r("4cce"),p=r("2fa3"),f={props:{topUserProp:{type:Object}},mixins:[l["c"]],data:function(){return{user:this.topUserProp}},methods:{addFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d["a"].addFollowing({userId:e});case 3:if(n=r.sent,s=n.data,"success"===s.status){r.next=7;break}throw new Error(s.message);case 7:t.user=Object(u["a"])(Object(u["a"])({},t.user),{},{isFollowed:!0,followerCount:t.user.followerCount+1}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),p["a"].fire({icon:"error",title:"無法加入追蹤，<br>請稍後再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},deleteFollowing:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d["a"].deleteFollowing({userId:e});case 3:if(n=r.sent,s=n.data,"success"===s.status){r.next=7;break}throw new Error(s.message);case 7:t.user=Object(u["a"])(Object(u["a"])({},t.user),{},{isFollowed:!1,followerCount:t.user.followerCount-1}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),p["a"].fire({icon:"error",title:"無法取消追蹤，<br>請稍後再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}},w=f,b=r("2877"),m=Object(b["a"])(w,i,c,!1,null,null,null),g=m.exports,h=r("2375"),v={components:{NavTabs:o["a"],UserTopCard:g,Spinner:h["a"]},data:function(){return{users:[],isLoading:!0}},methods:{fetchUsers:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.prev=1,t.next=4,d["a"].getTopUsers();case 4:r=t.sent,n=r.data,console.log(n),e.users=n.users.map((function(e){return{id:e.id,name:e.name,image:e.image,followerCount:e.FollowerCount,isFollowed:e.isFollowed}})),e.isLoading=!1,t.next=16;break;case 11:t.prev=11,t.t0=t["catch"](1),e.isLoading=!1,console.log(t.t0),p["a"].fire({icon:"error",title:"無法取得美食達人，<br>請稍後再試"});case 16:case"end":return t.stop()}}),t,null,[[1,11]])})))()}},created:function(){this.fetchUsers()}},x=v,C=Object(b["a"])(x,n,s,!1,null,null,null);t["default"]=C.exports},d81d:function(e,t,r){"use strict";var n=r("23e7"),s=r("b727").map,a=r("1dde"),o=a("map");n({target:"Array",proto:!0,forced:!o},{map:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-d55d3ce2.53f70cf9.js.map