"use strict";(self["webpackChunknfd_admin_vue3"]=self["webpackChunknfd_admin_vue3"]||[]).push([[85],{4085:function(e,a,n){n.r(a),n.d(a,{default:function(){return Ae}});var i=n(6252);const t={class:"panel-wrp"},o={class:"panel-sidebar"},r={class:"panel-content"},c={class:"section-content"};function s(e,a,n,s,l,p){const d=(0,i.up)("the-sidebar"),u=(0,i.up)("the-header"),v=(0,i.up)("router-view"),A=(0,i.up)("the-footer");return(0,i.wg)(),(0,i.iD)("div",t,[(0,i._)("div",o,[(0,i.Wm)(d)]),(0,i._)("div",r,[(0,i.Wm)(u),(0,i._)("div",c,[(0,i.Wm)(v)]),(0,i.Wm)(A)])])}var l=n(3577),p=n(2821);const d={class:"sidebar"},u=(0,i._)("div",{class:"logo-wrp logo_sidebar"},[(0,i._)("img",{class:"logo-pic_sidebar",src:p,alt:"logo"}),(0,i._)("p",{class:"logo-text logo-text_sidebar"},"Need for Drive")],-1),v={class:"sidebar__list"},A=["onClick"];function m(e,a,n,t,o,r){const c=(0,i.up)("v-icon"),s=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("nav",d,[u,(0,i._)("ul",v,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.menuList,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e.id,class:(0,l.C_)([{sidebar__item_active:t.isActiveTab===e.id},"sidebar__item"]),onClick:a=>t.closeMobileSideBar(e)},[(0,i.Wm)(s,{to:e.path,class:"item__link"},{default:(0,i.w5)((()=>[(0,i._)("div",null,[(0,i.Wm)(c,{"icon-id":e.id,width:"15",height:"15"},null,8,["icon-id"]),(0,i._)("span",{class:(0,l.C_)([{item__title_active:t.isActiveTab===e.id},"item__title"])},(0,l.zw)(e.name),3)])])),_:2},1032,["to"])],10,A)))),128))])])}var f=n(2262),h=n(5462),w={name:"TheSidebar",components:{VIcon:h.Z},setup(e,a){const n=[{id:"icon-autocard",name:"Карточка автомобиля",path:"/admin-panel/card-car"},{id:"icon-autolist",name:"Список авто",path:"/admin-panel/cars"},{id:"icon-orderslist",name:"Заказы",path:"/admin-panel/orders"}],i=(0,f.iH)(null),t=e=>{i.value=e.id,a.emit("close-mobile-sidebar")};return{menuList:n,isActiveTab:i,closeMobileSideBar:t}}},V=n(3744);const E=(0,V.Z)(w,[["render",m]]);var b=E;const S={class:"header-wrp"};function K(e,a,n,t,o,r){const c=(0,i.up)("v-mobile-menu"),s=(0,i.up)("v-search"),l=(0,i.up)("v-notification"),p=(0,i.up)("v-user-details");return(0,i.wg)(),(0,i.iD)("header",S,[(0,i.Wm)(c),(0,i.Wm)(s,{name:"search",placeholder:"Поиск ...",class:"header__search"}),(0,i.Wm)(l),(0,i.Wm)(p)])}const N={class:"search-wrp"},q=["for"],x=["name","placeholder"];function Q(e,a,n,t,o,r){const c=(0,i.up)("v-icon");return(0,i.wg)(),(0,i.iD)("div",N,[(0,i._)("label",{for:n.name},null,8,q),(0,i._)("input",{name:n.name,placeholder:n.placeholder,type:"text",autocomplete:"off",class:"search__input"},null,8,x),(0,i.Wm)(c,{"icon-id":"icon-search",width:"15",height:"15",class:"search__icon"})])}var U={name:"VSearch",components:{VIcon:h.Z},props:{name:{type:String,required:!0},placeholder:{type:String,required:!0}}};const D=(0,V.Z)(U,[["render",Q]]);var B=D;const X={class:"notification-wrp"},j={class:"notification__circle"};function P(e,a,n,t,o,r){const c=(0,i.up)("v-icon");return(0,i.wg)(),(0,i.iD)("div",X,[(0,i.Wm)(c,{"icon-id":"icon-bell",width:"17",height:"21",class:"notification__bell"}),(0,i._)("div",j,(0,l.zw)(t.notificationCounter),1)])}var W={name:"VNotification",components:{VIcon:h.Z},setup(){const e=2;return{notificationCounter:e}}};const C=(0,V.Z)(W,[["render",P]]);var F=C;const G={class:"user-details-wrp"},O={class:"user-container"},Z=["src"],T={class:"user__role"},H=(0,i._)("div",{class:"dropdown-icon"},null,-1);function g(e,a,n,t,o,r){return(0,i.wg)(),(0,i.iD)("div",G,[(0,i._)("div",O,[(0,i._)("img",{src:t.user.avatar,alt:"avatar",class:"user__avatar"},null,8,Z),(0,i._)("p",T,(0,l.zw)(t.user.role),1)]),H])}var k={name:"VUserDetails",setup(){const e={id:1,name:"Имя",role:"Admin",avatar:`${n(1414)}`};return{user:e}}};const R=(0,V.Z)(k,[["render",g]]);var y=R,J=n(9963);const z={class:"navigation-wrp"},L={class:"dropdown-nav"},I={class:"x-button"},_={class:"menu-wrp"};function M(e,a,n,t,o,r){const c=(0,i.up)("v-icon"),s=(0,i.up)("the-sidebar");return(0,i.wg)(),(0,i.iD)("div",z,[(0,i._)("div",{class:"burger-button",onClick:a[0]||(a[0]=(...e)=>t.toggleNav&&t.toggleNav(...e))},[(0,i.Wm)(c,{"icon-id":"icon-bars",width:"32",height:"32"})]),(0,i.Wm)(J.uT,{name:"nav"},{default:(0,i.w5)((()=>[(0,i.wy)((0,i._)("div",L,[(0,i._)("div",I,[(0,i.Wm)(c,{"icon-id":"icon-x",width:"32",height:"32",onClick:t.toggleNav},null,8,["onClick"])]),(0,i._)("div",_,[(0,i.Wm)(s,{onCloseMobileSidebar:t.toggleNav},null,8,["onCloseMobileSidebar"])])],512),[[J.F8,t.dropdownNav]])])),_:1})])}var Y={name:"VMobileMenu",components:{VIcon:h.Z,TheSidebar:b},setup(){const e=(0,f.iH)(!1),a=()=>e.value=!e.value;return{dropdownNav:e,toggleNav:a}}};const $=(0,V.Z)(Y,[["render",M]]);var ee=$,ae={name:"TheHeader",components:{VSearch:B,VNotification:F,VUserDetails:y,VMobileMenu:ee}};const ne=(0,V.Z)(ae,[["render",K]]);var ie=ne;const te={class:"footer-wrp"},oe=(0,i.Uk)("Главная страница"),re=(0,i.Uk)("Ссылка"),ce=(0,i._)("p",{class:"footer__copyright"},"Copyright © 2020 Simbirsoft",-1);function se(e,a,n,t,o,r){const c=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",te,[(0,i._)("div",null,[(0,i.Wm)(c,{to:"/",class:"footer__link"},{default:(0,i.w5)((()=>[oe])),_:1}),(0,i.Wm)(c,{to:"/",class:"footer__link"},{default:(0,i.w5)((()=>[re])),_:1})]),ce])}var le={name:"TheFooter"};const pe=(0,V.Z)(le,[["render",se]]);var de=pe,ue={name:"AdminPanel",components:{TheSidebar:b,TheHeader:ie,TheFooter:de}};const ve=(0,V.Z)(ue,[["render",s]]);var Ae=ve},1414:function(e){e.exports="data:image/jpeg;base64,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"}}]);
//# sourceMappingURL=85.9c4585da.js.map