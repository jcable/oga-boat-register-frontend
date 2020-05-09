(this.webpackJsonpboats=this.webpackJsonpboats||[]).push([[0],{269:function(e,a,n){e.exports=n(478)},274:function(e,a,n){},284:function(e,a,n){},478:function(e,a,n){"use strict";n.r(a);var t=n(0),r=n.n(t),o=n(18),l=n.n(o),i=(n(274),n(58)),c=n(30),s=n(259),u=n(258),m=n(248);n(284);var g=function(){return r.a.createElement("div",null,"Main")},d=n(38),b=n(527),p=n(528),h=n(123),f=n(260),_=n(55),E=n.n(_),y=n(47),v=n(519),w=n(529),C=n(520),O=n(532),j=n(518),B=n(530);for(var S=function(e){var a=e.options,n=e.id,o=e.label,l=e.onChange,i=e.defaultValue,c=Object(t.useState)({name:i}),s=Object(d.a)(c,2),u=s[0],m=s[1];return r.a.createElement(B.a,{defaultValue:u,inputValue:i,id:n,options:a,getOptionSelected:function(e,a){return e.name===a.name},getOptionLabel:function(e){return e.name},onInputChange:function(e,a){m(a),l(n,a)},renderInput:function(e){return r.a.createElement(w.a,Object.assign({},e,{label:o,variant:"outlined"}))}})},k=[{name:"Boat Name"},{name:"OGA No."},{name:"Year Built"},{name:"Last Updated"},{name:"Price"}],T=[],L=1;L<=8;L++)T.push({name:"".concat(6*L)});var N=Object(j.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:200}}}}));var P=function(e){var a=e.onFilterChange,n=e.onPageSizeChange,o=e.onSortFieldChange,l=e.onSortDirectionChange,i=e.after,c=void 0===i?1800:i,s=e.until,u=void 0===s?(new Date).getFullYear()+1:s,m=N(),g=Object(t.useState)({}),b=Object(d.a)(g,2),p=b[0],_=b[1],j=Object(t.useState)(),B=Object(d.a)(j,2),L=B[0],P=B[1],x=Object(t.useState)({firstYear:c,lastYear:u}),D=Object(d.a)(x,2),R=D[0],F=D[1];function M(){var e=Object(f.a)({},p,{ogaNo:L,year:R});console.log("updateFilters",e),a&&a(e)}Object(t.useEffect)(M,[p,L,R]);var q=Object(y.a)(E()("{\n        boat{name previous_names}\n        designer(order_by: {name: asc}){name}\n        builder(order_by: {name: asc}){name}\n        rig_type(order_by: {name: asc}){name}\n        sail_type(order_by: {name: asc}){name}\n        design_class(order_by: {name: asc}){name}\n        generic_type(order_by: {name: asc}){name}\n        construction_material(order_by: {name: asc}){name}\n    }")),H=q.loading,Y=q.error,I=q.data;if(H)return r.a.createElement("p",null,"Loading...");if(Y)return r.a.createElement("p",null,"Error :(SearchAndFilterBoats)");var V=I.boat,$=I.designer,W=I.builder,A=I.rig_type,G=I.sail_type,z=I.design_class,J=I.generic_type,U=I.construction_material,K=V.map((function(e){return e.name})),Q=V.map((function(e){return e.previous_names})).flat(),X=new Set([].concat(Object(h.a)(K),Object(h.a)(Q))),Z=Object(h.a)(X);Z.sort((function(e,a){return e.toLowerCase().localeCompare(a.toLowerCase())})),""===Z[0]&&Z.shift();var ee=Z.map((function(e){return{name:e,__typename:"boat"}}));function ae(e,a){if(e.target.id){var n=p;n[e.target.id]=a,_(n),M()}}function ne(e,a){var n=p;a?n[e]=a:delete n[e],_(n),M()}function te(e){console.log("sy",e);var a=e.target,n=a.id,t=a.value;if(4===t.length){var r=R;r[n]=t,F(r),M()}}return r.a.createElement("form",{className:m.root},r.a.createElement(v.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(S,{onChange:ne,id:"boat-name",options:ee,label:"Boat Name"}),r.a.createElement(w.a,{onChange:function(e){P(e.target.value),M()},id:"oga-no",label:"OGA Boat No.",variant:"outlined"}),r.a.createElement(S,{onChange:ne,id:"designer-name",options:$,label:"Designer"}),r.a.createElement(S,{onChange:ne,id:"builder-name",options:W,label:"Builder"}),r.a.createElement(w.a,{onChange:te,id:"firstYear",label:"Built After",min:c,max:"",defaultValue:c,variant:"outlined"}),r.a.createElement(w.a,{onChange:te,id:"lastYear",label:"Built Before",min:c,max:u,defaultValue:u,variant:"outlined"}),r.a.createElement(S,{onChange:ne,id:"rig-type",options:A,label:"Rig Type"}),r.a.createElement(S,{onChange:ne,id:"mainsail-type",options:G,label:"Mainsail Type"}),r.a.createElement(S,{onChange:ne,id:"generic-type",options:J,label:"Generic Type"}),r.a.createElement(S,{onChange:ne,id:"design-class",options:z,label:"Design Class"}),r.a.createElement(S,{onChange:ne,id:"construction-material",options:U,label:"Construction Material"}),r.a.createElement(C.a,{control:r.a.createElement(O.a,{id:"nopics",onChange:ae}),label:"include boats without pictures"}),r.a.createElement(C.a,{control:r.a.createElement(O.a,{id:"sale",onChange:ae}),label:"only boats for sale"}),r.a.createElement(S,{defaultValue:"name",id:"sort-field",onChange:o,options:k,label:"Sort By"}),r.a.createElement(C.a,{id:"sort-direction",onChange:l,control:r.a.createElement(O.a,null),label:"reversed"}),r.a.createElement(S,{defaultValue:"6",id:"page-size",onChange:n,options:T,label:"Boats Per Page"})))},x=n(80),D=n(531),R=n(521),F=n(522),M=n(523),q=n(524),H=n(481),Y=n(525),I=n(526);function V(e){var a=e.fields,n=e.data,t=[];return Object.keys(a).forEach((function(e){var r=a[e].access(n[e]);r&&t.push({key:e,label:a[e].label,text:r})})),r.a.createElement("div",null,t.map((function(e){return r.a.createElement(H.a,{key:e.key},"".concat(e.label,": ").concat(e.text))})))}function $(){var e=Object(x.a)(["query{thumb(id:",")}"]);return $=function(){return e},e}var W=Object(j.a)({noimage:{width:300,minHeight:200},root:{width:300,minHeight:640},title:{fontSize:14},text:{minHeight:250},textnoimage:{minHeight:150},pos:{marginBottom:6},media:{height:300}}),A={year:{label:"Year Built",access:function(e){return e}},place_built:{label:"Place Built",access:function(e){return e}},home_port:{label:"Home Port",access:function(e){return e}},rigType:{label:"Rig Type",access:function(e){return e}},designerByDesigner:{label:"Designer",access:function(e){return e?e.name:void 0}},builderByBuilder:{label:"Builder",access:function(e){return e?e.name:void 0}},previous_names:{label:"Was",access:function(e){return e.length>0?e.join(", "):void 0}}};function G(e){var a=e.boat,n=Object(y.a)(E()($(),a.oga_no),{skip:!a.image_key}),t=n.loading,o=n.error,l=n.data,i=W();if(o)return r.a.createElement("p",null,"Error: (BoatCards)");if(t){if(!l)return r.a.createElement("p",null,"Loading...");console.log("Loading set but data here")}var c=l&&l.thumb;return r.a.createElement(R.a,{className:c?i.root:i.noimage},r.a.createElement(F.a,null,c?r.a.createElement(M.a,{className:i.media,image:c,title:a.name}):"",r.a.createElement(q.a,{className:c?i.text:i.textnoimage},r.a.createElement(H.a,{variant:"h5",component:"h2"},a.name," (",a.oga_no,")"),r.a.createElement(H.a,{variant:"body2",dangerouslySetInnerHTML:{__html:function(e){if(e&&e.short_description){var a=e.short_description.trim();return a.startsWith("<p>")?a:"<p>".concat(a,"</p>")}return""}(a)}}),r.a.createElement(V,{fields:A,data:a}))),r.a.createElement(Y.a,null,r.a.createElement(I.a,{size:"small",href:"/boats/"+a.oga_no},"Learn More")))}function z(){var e=Object(x.a)(["\nquery boats($where: boat_bool_exp!, $limit: Int!, $offset: Int!) {\n    boat_aggregate(where: $where) { aggregate { totalCount: count } }\n    boat(limit: $limit, offset: $offset, order_by: ",", where: $where) {\n      id name\n      oga_no\n      place_built\n      previous_names\n      home_port\n      short_description\n      year\n      builderByBuilder{name}\n      designerByDesigner{name}\n      design_class\n      image_key\n    }\n  }"]);return z=function(){return e},e}var J=function(e){var a,n=e.boatsPerPage,o=void 0===n?12:n,l=e.sortField,i=void 0===l?"name":l,c=e.sortDirection,s=void 0===c?"asc":c,u=e.where,m=void 0===u?{_and:[{year:{_gte:"1800"}},{year:{_lte:(new Date).getFullYear()}},{image_key:{_is_null:!1}}]}:u,g=e.onLoad,b=void 0===g?function(e){console.log("boat cards loaded total is",e)}:g,p=Object(t.useState)(1),h=Object(d.a)(p,2),f=h[0],_=h[1],w=Object(y.a)((a="{".concat(i,": ").concat(s,"}"),E()(z(),a)),{variables:{limit:o,offset:o*(f-1),where:m}}),C=w.loading,O=w.error,j=w.data;if(O)return r.a.createElement("p",null,"Error: (BoatCards)");if(C){if(!j)return r.a.createElement("p",null,"Loading...");console.log("Loading set but data here")}var B=j?j.boat_aggregate.aggregate.totalCount:0;b&&b(B);var S=Math.ceil(B/o);function k(e,a){_(a)}return B>0?r.a.createElement("div",null,r.a.createElement(D.a,{count:S,variant:"outlined",shape:"rounded",onChange:k}),r.a.createElement(v.a,{container:!0,direction:"row",justify:"center",alignItems:"center",spacing:12},j.boat.map((function(e){return r.a.createElement(G,{key:e.oga_no,boat:e})})),";"),r.a.createElement(D.a,{count:S,variant:"outlined",shape:"rounded",onChange:k})):r.a.createElement("p",null,"There are no boats which match the filter criteria you have set. Try broadening the criteria.")},U=n(122),K=n(77),Q=n.n(K);var X=function(){var e=Object(t.useState)(12),a=Object(d.a)(e,2),n=a[0],o=a[1],l=Object(t.useState)("name"),i=Object(d.a)(l,2),c=i[0],s=i[1],u=Object(t.useState)("asc"),m=Object(d.a)(u,2),g=m[0],h=m[1],f=Object(t.useState)(void 0),_=Object(d.a)(f,2),E=_[0],y=_[1];return r.a.createElement(Q.a,null,r.a.createElement(b.a,null,r.a.createElement("h3",null,"Welcome to the OGA Boat Register"),r.a.createElement("h4",null,"We have hundreds of boats with pictures and many more waiting for pictures and more information."),r.a.createElement("p",null,"Filter the list using the options below and then click on 'Learn More' for all the pictures and information we have for that boat."),r.a.createElement("p",null,"Have a boat and can't find it here. Fill in our ",r.a.createElement("a",{href:"https://form.jotform.com/jfbcable/new-boat"},"form")," and we will add it."),r.a.createElement("p",null,"You can also use the form to suggest a boat whether you own it or not."),r.a.createElement("p",null,"You'll can submit pictures, additions and corrections to boats or contact the owner from the boat's detail page."),r.a.createElement("p",null,"Members can use the register to advertise their boat for sale. The first step is to make sure the boat is on the register."),r.a.createElement(P,{onPageSizeChange:function(e,a){return a&&o(parseInt(a.name))},onSortFieldChange:function(e,a){return a&&s(a.name)},onSortDirectionChange:function(e){return h(e.target.checked?"desc":"asc")},onFilterChange:function(e){console.log(e);var a=[{year:{_gte:e.year.first}},{year:{_lte:e.year.last}}];e.ogaNo&&a.push({oga_no:{_eq:e.ogaNo}}),e["boat-name"]&&a.push({_or:[{name:{_ilike:"".concat(e["boat-name"],"%")}},{previous_names:{_contains:e["boat-name"]}}]}),e["designer-name"]&&a.push({designerByDesigner:{name:{_eq:e["designer-name"]}}}),e["builder-name"]&&a.push({buildersByBuilder:{name:{_eq:e["builder-name"]}}}),e["rig-type"]&&a.push({rigTypeByRigType:{name:{_eq:e["rig-type"]}}}),e["mainsail-type"]&&a.push({sail_type:{name:{_eq:e["mainsail-type"]}}}),e["generic-type"]&&a.push({genericTypeByGenericType:{name:{_eq:e["generic-type"]}}}),e["design-class"]&&a.push({designClassByDesignClass:{name:{_eq:e["design-class"]}}}),e["construction-material"]&&a.push({constructionMaterialByConstructionMaterial:{name:{_eq:e["construction-material"]}}}),e.nopics||a.push({image_key:{_is_null:!1}}),e.sale&&a.push({for_sale_state:{text:{_eq:"for_sale"}}}),console.log("filters",a),y({_and:a})}}),r.a.createElement(p.a,null),r.a.createElement(J,{boatsPerPage:n,sortField:c,sortDirection:g,where:E}),r.a.createElement(p.a,null),r.a.createElement("p",null,"Other great places to look for boats are:"),r.a.createElement(U.a,null,r.a.createElement(U.b,null,r.a.createElement("a",{href:"https://www.nationalhistoricships.org.uk"},"National Historic Ships")),r.a.createElement(U.b,null,r.a.createElement("a",{href:"https://nmmc.co.uk/explore/databases/"},"NMM Cornwall")," maintain a number of interesting databases including small boats, yacht designs"))))};function Z(){return""}function ee(){var e=Object(x.a)(["{\n    boat(id:",") {\n        name prev_name\n        year approximate_year_of_build\n        place_built home_country home_port\n        sail_no ssr_no nhsr_no fishing_no call_sign\n        other_registries nsbr_no off_reg_no port_reg\n        short_desc full_desc\n        for_sale sale_text price\n        images{\n            uri\n            copyright\n            height width title alt\n        }\n        class{\n            name\n            rigType\n            mainsailType\n            hullType\n            genericType\n        }\n        builder{name}\n        construction_material\n        construction_method\n        beam\n        draft\n        length_on_waterline\n        length_overall\n        propulsion{\n            propellor_type\n            propellor_position\n            propellor_blades\n            engine_fuel\n            engine_position\n            engine_date\n            engine_make\n            engine_power\n            hp\n            previous_engine\n        }\n    }\n  }"]);return ee=function(){return e},e}var ae={prev_name:{label:"Previous name/s"},place_built:{label:"Place built"},year:{label:"Year of Build"},approximate_year_of_build:{label:"Approximate Year of Build"},sail_no:{label:"Sail No."},home_country:{label:"Home Country"},ssr_no:{label:"Small Ships Registry no. (SSR)"},nhsr_no:{label:"National Register of Historic Vessels no. (NRHV)"},fishing_no:{label:"Fishing No."},call_sign:{label:"Call Sign"},other_registries:{label:"Other Registrations"},nsbr_no:{label:"National Small Boat Register"},off_reg_no:{label:"Official Registration"},port_reg:{label:"Port of Registry"}},ne={construction_method:{label:"Construction method"},construction_material:{label:"Construction material"},class:{hullType:{label:"Hull Type"},genericType:{label:"Generic Type "}},builder:{name:{label:"Builder"}}},te={length_overall:{label:"Length on deck (LOD):",unit:"ft"},length_on_waterline:{label:"Length on waterline (LWL):",unit:"ft"},beam:{label:"Beam",unit:"ft"},draft:{label:"Draft",unit:"ft"}},re={engine_make:{label:"Engine make:"},engine_power:{label:"Engine power:"},engine_date:{label:"Engine date:"},engine_fuel:{label:"Engine fuel:"},previous_engine:{label:"Previous engine(s):"},propellor_blades:{label:"Propeller blades:"},propellor_type:{label:"Propeller type:"},propellor_position:{label:"Propeller position:"}};function oe(e){var a=e.id,n=Object(y.a)(function(e){return E()(ee(),e)}(a)),o=n.loading,l=n.error,i=n.data;Object(t.useEffect)((function(){i&&(document.title=i.boat.name)}));if(console.log(ae,ne,te,re,""),o)return r.a.createElement("p",null,"Loading...");if(l)return r.a.createElement("p",null,"Error: (Boat)");var c=i.boat;return r.a.createElement(Q.a,null,r.a.createElement(v.a,{columns:2,divided:!0},r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Column,{width:10},r.a.createElement(H.a,{variant:"h1"},c.name)),r.a.createElement(v.a.Column,{width:1},r.a.createElement(H.a,{variant:"h1"},c.year))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Column,{width:13},r.a.createElement(Z,{images:c.images})),r.a.createElement(v.a.Column,{width:3},r.a.createElement(H.a,{variant:"h2"},"Details"))),r.a.createElement(v.a.Row,{width:16})))}var le=new i.c({link:Object(s.a)({uri:"https://api-oga.herokuapp.com/v1/graphql"}),cache:new u.a}),ie={"/":function(){return r.a.createElement(c.a,{client:le},r.a.createElement(X,null))},"/boats/:id":function(e){var a=e.id;return r.a.createElement(c.a,{client:le},r.a.createElement(oe,{id:a}))},"/iframe":function(){return r.a.createElement(g,null)}};var ce=function(){return Object(m.useRoutes)(ie)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[269,1,2]]]);
//# sourceMappingURL=main.1eb3ee04.chunk.js.map