(this["webpackJsonppolemic-app"]=this["webpackJsonppolemic-app"]||[]).push([[0],{139:function(e,t,a){},245:function(e,t,a){},246:function(e,t,a){},247:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a(0),c=a.n(n),i=a(12),r=a.n(i),o=(a(139),a(11)),l=(a(140),a(141),a(119)),d=a(319),j=a(118),b=a.n(j),h=a(318),m=a(8),O=a(297),x=a(299),u=a(300),p=a(301),g=a(89),f=a(296),v=a(123),N=a(298),y=a.p+"static/media/happiness.4e02f678.svg",w=a.p+"static/media/fear.2470cbbc.svg",k=a.p+"static/media/anger.8528d165.svg",C=a.p+"static/media/neutral.5623396f.svg",S=a.p+"static/media/sad.2f887896.svg",z=a.p+"static/media/disgusted.0f4f8fc2.svg",T=a.p+"static/media/admiration.1c8ea55d.svg",P=a.p+"static/media/expectancy.7f622444.svg",R=a.p+"static/media/surprise-face.f36133bf.svg",_={neutralny:C,oczekiwanie:P,podziw:T,radosc:y,smutek:S,strach:w,wstret:z,zaskoczenie:R,zlosc:k},I="annotated",E="skipped",A="user_id",M=a(39),F=a.p+"static/media/logo.a02c08aa.png",L=a.p+"static/media/chromewebstore.d3512f0d.png";function B(e){var t=e.setShowId;return Object(s.jsxs)(v.a,{variant:"body2",color:"textSecondary",align:"center",children:["Built with React and Material UI for ",Object(s.jsx)(f.a,{color:"inherit",href:"https://pwr.edu.pl/en/",children:Object(s.jsx)("b",{children:"WUST"})})," ",Object(s.jsx)("span",{onClick:function(){return t(!0)},children:":)"}),".",Object(s.jsx)("br",{}),Object(s.jsxs)("span",{style:{fontSize:10},children:["Icons made by ",Object(s.jsx)(f.a,{href:"https://www.flaticon.com/authors/freepik",color:"inherit",title:"Freepik",children:"Freepik"})," from ",Object(s.jsx)(f.a,{href:"https://www.flaticon.com/",color:"inherit",title:"Flaticon",children:"www.flaticon.com"})]})]})}var D=Object(O.a)((function(e){return{appBar:{position:"relative"},layout:Object(m.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:"90%",marginLeft:"auto",marginRight:"auto"}),logo:{width:50,marginRight:e.spacing(2)},paper:Object(m.a)({marginTop:e.spacing(1),marginBottom:e.spacing(1)},e.breakpoints.up(600+2*e.spacing(3)),{marginBottom:e.spacing(1)})}}));function W(e){var t=e.children,a=D(),i=Object(n.useState)(!1),r=Object(o.a)(i,2),l=(r[0],r[1]),d=Object(N.a)([I,A,E]),j=Object(o.a)(d,2),b=j[0],h=j[1],m=Object(M.a)(I,[]),O=Object(o.a)(m,2),f=O[0],y=O[1],w=Object(M.a)(E,[]),k=Object(o.a)(w,2),C=k[0],S=k[1],z=b.annotated||[],T=b.skipped||[];return Object(n.useEffect)((function(){(null==f||Array.isArray(f)&&0===f.length||""===f)&&(y(z),h(I,[])),(null==C||Array.isArray(C)&&0===C.length||""===C)&&(S(T),h(E,[]))}),[]),Object(s.jsxs)(c.a.Fragment,{children:[Object(s.jsx)(x.a,{}),Object(s.jsx)(u.a,{position:"absolute",className:a.appBar,children:Object(s.jsxs)(p.a,{children:[Object(s.jsx)("img",{className:a.logo,src:F}),Object(s.jsx)(v.a,{variant:"h6",color:"inherit",noWrap:!0,children:"POLEMIC - POLish EMotIon Classifier"}),Object(s.jsx)("span",{style:{flex:1}}),Object(s.jsx)(v.a,{style:{paddingRight:"10px"},variant:"subtitle1",color:"inherit",noWrap:!0,children:"Use Chrome Extension "}),Object(s.jsx)("a",{target:"_blank","aria-label":"extension link",href:"https://chrome.google.com/webstore/detail/polemic/amohljmlgkapaaplajmicnbegfheolae",children:Object(s.jsx)("img",{alt:"POLEMIC - chrome extension",className:a.logo,src:L})})]})}),Object(s.jsxs)("main",{className:a.layout,children:[Object(s.jsx)(g.a,{className:a.paper,children:Object(s.jsx)(c.a.Fragment,{children:t})}),Object(s.jsx)(B,{setShowId:l})]})]})}var q=a(17),U=(a(86),a(115),a(14)),H=(a(88),a(307),a(308)),J=(a(122),a(304)),Y=a(305),Z=a(306),G=a(302),V=a(303),K=a(121),Q=(a(245),Object(O.a)((function(e){return{card:{backgroundColor:"rgba(29, 161, 242, 0.1)",width:"400px",margin:0,padding:0,minHeight:"100px",position:"relative"},tweet:{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},error:{backgroundColor:"#f44336",color:"#fff",fontWeight:500},errorMessage:{textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},info:{backgroundColor:"#2196f336",color:"#000",fontWeight:500},progress:{position:"absolute",left:"45%",top:"25px"}}})));function X(e){e.tweetContent;var t=e.tweetId,a=Q(),i=Object(n.useState)(!0),r=Object(o.a)(i,2),l=r[0],d=r[1],j=Object(n.useState)(!1),b=Object(o.a)(j,2),h=b[0];b[1];return!0===h?Object(s.jsx)(G.a,{className:a.error,message:Object(s.jsx)(c.a.Fragment,{children:Object(s.jsxs)("span",{className:a.errorMessage,children:[Object(s.jsx)(V.a,{style:{marginRight:"10px"},children:"error_outline"}),"Ups... There is a problem with this tweet. Please check if you have Adblock Disabled and if you have then just skip this tweet."]})})}):t&&Object(s.jsx)(c.a.Fragment,{children:Object(s.jsxs)(J.a,{className:a.card,children:[Object(s.jsx)(Y.a,{className:"tweet-content",children:Object(s.jsx)(K.a,{onLoad:function(){d(!1)},tweetId:t,options:{maxWidth:800,cards:"hidden"}})}),l&&Object(s.jsx)(Z.a,{color:"secondary",className:a.progress})]})})}Object(O.a)((function(e){return{buttons:{display:"flex",justifyContent:"flex-end"},buttonContainer:{margin:"auto"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1),fontSize:"1rem"},labelIcon:{height:e.spacing(6),marginRight:e.spacing(2)}}}));var $=a(120),ee=(a(246),Object(O.a)((function(e){return{animationContainer:{position:"absolute",top:0},innerContainer:{position:"absolute"}}}))),te=["cats","car","bear","bb8","link","ghost"];function ae(){var e=ee(),t=Object(n.useState)(te[Math.floor(Math.random()*te.length)]),a=Object(o.a)(t,2),c=a[0],i=a[1];return Object(n.useEffect)((function(){var e=setInterval((function(){i((function(e){var t=te.indexOf(e)<te.length-1?te.indexOf(e)+1:0;return te[t]}))}),1e4);return function(){return clearInterval(e)}}),[]),Object(s.jsxs)("div",{className:e.animationContainer,children:[c===te[0]&&Object(s.jsxs)("div",{className:"cat-container "+e.innerContainer,children:[Object(s.jsxs)(v.a,{className:"cat-info",variant:"h5",color:"primary",children:["Our highly trained cats are working on your request",Object(s.jsx)("span",{className:"dots",children:"..."})]}),Object(s.jsxs)("div",{className:"main",children:[Object(s.jsx)("span",{className:"stand"}),Object(s.jsxs)("div",{className:"cat",children:[Object(s.jsx)("div",{className:"body"}),Object(s.jsxs)("div",{className:"head",children:[Object(s.jsx)("div",{className:"ear"}),Object(s.jsx)("div",{className:"ear"})]}),Object(s.jsxs)("div",{className:"face",children:[Object(s.jsx)("div",{className:"nose"}),Object(s.jsxs)("div",{className:"whisker-container",children:[Object(s.jsx)("div",{className:"whisker"}),Object(s.jsx)("div",{className:"whisker"})]}),Object(s.jsxs)("div",{className:"whisker-container",children:[Object(s.jsx)("div",{className:"whisker"}),Object(s.jsx)("div",{className:"whisker"})]})]}),Object(s.jsx)("div",{className:"tail-container",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail",children:Object(s.jsx)("div",{className:"tail"})})})})})})})})]})]})]}),c===te[1]&&Object(s.jsxs)("div",{className:"car-container "+e.innerContainer,children:[Object(s.jsxs)("div",{className:"car",children:[Object(s.jsx)("div",{className:"strike"}),Object(s.jsx)("div",{className:"strike strike2"}),Object(s.jsx)("div",{className:"strike strike3"}),Object(s.jsx)("div",{className:"strike strike4"}),Object(s.jsx)("div",{className:"strike strike5"}),Object(s.jsx)("div",{className:"car-detail spoiler"}),Object(s.jsx)("div",{className:"car-detail back"}),Object(s.jsx)("div",{className:"car-detail center"}),Object(s.jsx)("div",{className:"car-detail center1"}),Object(s.jsx)("div",{className:"car-detail front"}),Object(s.jsx)("div",{className:"car-detail wheel"}),Object(s.jsx)("div",{className:"car-detail wheel wheel2"})]}),Object(s.jsxs)("div",{className:"text",children:[Object(s.jsx)(v.a,{component:"span",variant:"h5",color:"primary",children:"We're pushing really hard to get your request on time"}),Object(s.jsx)("span",{className:"dots",children:"..."})]})]}),c===te[2]&&Object(s.jsxs)("div",{className:"bear-container "+e.innerContainer,children:[Object(s.jsx)("div",{className:"text-prev",children:Object(s.jsx)(v.a,{component:"span",variant:"h4",color:"primary",children:"Don't worry, it's just our russian agent"})}),Object(s.jsxs)("div",{className:"bear",children:[Object(s.jsxs)("div",{className:"bear__ears",children:[Object(s.jsx)("div",{className:"bear__ears__left ear"}),Object(s.jsx)("div",{className:"bear__ears__right ear"})]}),Object(s.jsxs)("div",{className:"bear__body",children:[Object(s.jsxs)("div",{className:"bear__eyes",children:[Object(s.jsx)("div",{className:"bear__eyes--left eye"}),Object(s.jsx)("div",{className:"bear__eyes--right eye"})]}),Object(s.jsx)("div",{className:"bear__nose",children:Object(s.jsx)("div",{className:"bear__nose--inner"})})]})]}),Object(s.jsxs)("div",{className:"text-after",children:[Object(s.jsx)(v.a,{component:"span",variant:"h4",color:"primary",children:"He says that your request is on the server"}),Object(s.jsx)("span",{className:"dots",children:"..."})]})]}),c===te[3]&&Object(s.jsxs)("div",{className:"bb8-container "+e.innerContainer,children:[Object(s.jsxs)("div",{className:"text-prev",children:[Object(s.jsx)(v.a,{component:"span",variant:"h4",color:"primary",children:"Your request is in a galaxy far, far away"}),Object(s.jsx)("span",{className:"dots",children:"..."})]}),Object(s.jsx)("div",{className:"bb8"}),Object(s.jsx)("div",{className:"text-after",children:Object(s.jsx)(v.a,{component:"span",variant:"h4",color:"primary",children:"But don't worry, BB8 is on its way :)"})})]}),c===te[4]&&Object(s.jsxs)("div",{className:"link-animation-container "+e.innerContainer,children:[Object(s.jsxs)("div",{className:"text-prev",children:[Object(s.jsx)(v.a,{component:"span",variant:"h3",color:"primary",children:"Link is fighting his magic sword off to get that response for you"}),Object(s.jsx)("br",{}),Object(s.jsx)("span",{className:"dots",style:{transform:"scale(2.5)"},children:"..."})]}),Object(s.jsx)("div",{className:"link-animation"})]}),c===te[5]&&Object(s.jsxs)("div",{className:"ghost-animation-container "+e.innerContainer,children:[Object(s.jsxs)("div",{className:"text-prev",children:[Object(s.jsx)(v.a,{component:"span",variant:"h3",color:"primary",children:"I'm not a ghost, I'm just dead inside"}),Object(s.jsx)("br",{}),Object(s.jsx)("span",{className:"dots",style:{transform:"scale(2.5)"},children:"..."})]}),Object(s.jsxs)("div",{className:"ghost",children:[Object(s.jsx)("div",{className:"hat",children:Object(s.jsx)("div",{className:"hat1",children:Object(s.jsx)("div",{className:"s1"})})}),Object(s.jsxs)("div",{className:"face",children:[Object(s.jsxs)("div",{className:"eye-l",children:[Object(s.jsx)("div",{className:"dot1"}),Object(s.jsx)("div",{className:"dot2"})]}),Object(s.jsxs)("div",{className:"eye-r",children:[Object(s.jsx)("div",{className:"dot1"}),Object(s.jsx)("div",{className:"dot2"})]}),Object(s.jsx)("div",{className:"blsh-l"}),Object(s.jsx)("div",{className:"blsh-r"}),Object(s.jsx)("div",{className:"mouth"})]}),Object(s.jsx)("div",{className:"hand-l"}),Object(s.jsx)("div",{className:"hand-r"}),Object(s.jsxs)("div",{className:"pumpkin",children:[Object(s.jsx)("div",{className:"handle"}),Object(s.jsx)("div",{className:"p1"}),Object(s.jsx)("div",{className:"p2"}),Object(s.jsx)("div",{className:"p3"}),Object(s.jsx)("div",{className:"p4"}),Object(s.jsx)("div",{className:"e-l"}),Object(s.jsx)("div",{className:"e-r"}),Object(s.jsx)("div",{className:"nose"}),Object(s.jsxs)("div",{className:"m",children:[Object(s.jsx)("div",{className:"t1"}),Object(s.jsx)("div",{className:"t2"}),Object(s.jsx)("div",{className:"t3"}),Object(s.jsx)("div",{className:"t4"})]})]})]})]})]})}var se=Object(O.a)((function(e){return{zone:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",fontSize:"1.2rem",borderWidth:2,borderRadius:2,borderColor:"#eeeeee",borderStyle:"dashed",backgroundColor:"#fafafa",color:"#bdbdbd",outline:"none",transition:"border .24s ease-in-out",position:"relative",minHeight:"110px"},activeStyle:{borderColor:"#2196f3"},acceptStyle:{borderColor:"#00e676"},rejectStyle:{borderColor:"#ff1744",color:"#ff1744"}}}));function ne(e){var t=e.onFileChange,a=void 0===t?function(){}:t,c=e.isLoading,i=void 0!==c&&c,r=se(),o=Object(n.useCallback)((function(e){var t=new FileReader;t.onabort=function(){return console.log("file reading was aborted")},t.onerror=function(){return console.log("file reading failed")},t.onload=function(){var e=JSON.parse(t.result);Array.isArray(e)&&null!=e[0].id&&a(e.filter((function(t,a){return e.findIndex((function(e){return e.id===t.id}))===a})))},e.forEach((function(e){return t.readAsText(e)}))}),[]),l=Object($.a)({accept:"application/json",onDrop:o}),d=l.getRootProps,j=l.getInputProps,b=l.isDragActive,h=l.isDragAccept,m=l.isDragReject,O="".concat(r.zone," ").concat(b?r.activeStyle:""," ").concat(h?r.acceptStyle:""," ").concat(m?r.rejectStyle:"");return Object(s.jsxs)("div",Object(q.a)(Object(q.a)({className:O},d()),{},{children:[Object(s.jsx)("input",Object(q.a)({},j())),i?"":b?h?Object(s.jsx)("p",{children:"Drop the files here ..."}):Object(s.jsxs)("p",{children:["You cannot drop this type of file, we only accept"," ",Object(s.jsx)("strong",{children:".json"})," files"]}):Object(s.jsx)("p",{children:"Drag 'n' drop some data files here, or click to select files"}),i&&Object(s.jsx)(ae,{})]}))}var ce=a(320),ie=a(312),re=a(313),oe=a(314),le=a(315),de=a(316),je=a(317),be=a(68),he={neutralny:"Neutralny",oczekiwanie:"Oczekiwanie",podziw:"Podziw",radosc:"Rado\u015b\u0107",smutek:"Smutek",strach:"Strach",wstret:"Wstr\u0119t",zaskoczenie:"Zaskoczenie",zlosc:"Z\u0142o\u015b\u0107"},me={neutralny:"#dfdfdf",oczekiwanie:"#fda752",podziw:"#52fe52",radosc:"#ffff53",smutek:"#5050fe",strach:"#009400",wstret:"#fe52fe",zaskoczenie:"#58bbfe",zlosc:"#fe0000"},Oe=Object(O.a)((function(e){return{icon:{maxWidth:"60px"},container:{display:"flex",flexDirection:"row",justifyContent:"center"},iconContainer:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},moreButton:{cursor:"pointer"}}}));function xe(e){var t=e.data,a=e.id,n=e.onClickMore,c=void 0===n?function(){}:n,i=Oe();if(null==t)return"There was an error processing your request :(";var r=Object.entries(t).sort((function(e,t){return t[1]-e[1]})),o=r.slice(0,3).map((function(e){return[he[e[0]],Number(Number(100*e[1]).toFixed(1)),me[e[0]],null]})),l=_[r[0][0]];return Object(s.jsxs)("div",{className:i.container,children:[Object(s.jsx)(be.a,{width:"200px",height:"300px",chartType:"BarChart",loader:Object(s.jsx)("div",{children:"Loading Chart"}),data:[["Emotion","Certainty [%]",{role:"style"},{sourceColumn:0,role:"annotation",type:"string",calc:"stringify"}]].concat(Object(U.a)(o)),options:{titleTextStyle:{fontSize:15},title:"Top 3 emotions",bar:{groupWidth:"95%"},legend:{position:"none"}},rootProps:{"data-testid":"1"}}),Object(s.jsxs)("div",{className:i.iconContainer,children:[Object(s.jsx)("img",{className:i.icon,src:l,"aria-label":o[0][0]}),Object(s.jsx)(v.a,{className:i.moreButton,onClick:function(){c(a)},variant:"h6",color:"secondary",align:"center",children:"More"})]})]})}var ue=a(310),pe=a(309),ge=a(322),fe=a(311),ve=["zlosc","wstret","strach","smutek","neutralny","zaskoczenie","oczekiwanie","podziw","radosc"],Ne=["Original","S\u0142owosie\u0107","Brand24"],ye=Object(O.a)((function(e){return{charts:{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:e.spacing(1)},dialogContent:{display:"flex",flexDirection:"column"},title:{textAlign:"center"},sentiment:{paddingTop:e.spacing(2),textAlign:"center"}}}));function we(e){var t=e.onClose,a=e.open,n=e.tweet,c=ye();if(null==n)return null;var i,r=ve.map((function(e){return[he[e],Number(Number(100*n.model1[e]).toFixed(1)),me[e],null]})),o=ve.map((function(e){return[he[e],Number(Number(100*n.model2[e]).toFixed(1)),me[e],null]})),l=ve.map((function(e){return[he[e],Number(Number(100*n.model3[e]).toFixed(1)),me[e],null]})),d=function(){t()},j=[n.model1,n.model2,n.model3].reduce((function(e,t){for(var a in t)e[a]=t[a]+(e[a]||0);return e}),{});return Object(s.jsxs)(ge.a,{onClose:d,"aria-labelledby":"result-dialog",open:a,maxWidth:!1,fullWidth:!0,children:[Object(s.jsx)(pe.a,{id:"result-dialog",className:c.title,children:"Tweet results"}),Object(s.jsxs)(ue.a,{className:c.dialogContent,children:[Object(s.jsxs)("div",{className:c.info,children:[Object(s.jsx)(v.a,{variant:"subtitle2",children:"Tweet's content"}),Object(s.jsx)(G.a,{message:n.content}),Object(s.jsxs)(v.a,{className:c.sentiment,variant:"h6",children:["Avg. Sentiment: ",Object(s.jsx)("span",{children:(i=Object.entries(j).sort((function(e,t){return t[1]-e[1]}))[0][0],ve.slice(0,4).includes(i)?Object(s.jsx)("span",{style:{color:"red"},children:"Negatywny"}):ve.slice(6).includes(i)?Object(s.jsx)("span",{style:{color:"lightGreen"},children:"Pozytywny"}):"Neutralny")})]})]}),Object(s.jsx)("div",{className:c.charts,children:[r,o,l].map((function(e,t){return Object(s.jsx)(be.a,{width:"500px",height:"400px",chartType:"BarChart",loader:Object(s.jsx)("div",{children:"Loading Chart"}),data:[["Emotion","Certainty [%]",{role:"style"},{sourceColumn:0,role:"annotation",type:"string",calc:"stringify"}]].concat(Object(U.a)(e)),options:{title:"Emotions - ".concat(Ne[t]),titleTextStyle:{fontSize:18},bar:{groupWidth:"90%"},legend:{position:"none"},hAxis:{title:"Certainty [%]",titleTextStyle:{fontSize:16}}},rootProps:{"data-testid":t}})}))})]}),Object(s.jsx)(fe.a,{children:Object(s.jsx)(H.a,{onClick:d,color:"primary",children:"Close"})})]})}var ke=Object(O.a)((function(e){return{buttons:{display:"flex",justifyContent:"flex-end"},buttonContainer:{margin:"auto"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1),fontSize:"1rem"},labelIcon:{height:e.spacing(6),marginRight:e.spacing(2)},title:{paddingLeft:e.spacing(1),paddingTop:e.spacing(1),textAlign:"center"},table:{maxHeight:"70vh"},body:{height:"100%",overflowY:"auto"},tweetClass:{padding:0,width:400},cellResult:{borderRight:"1px solid black",textAlign:"center"}}}));function Ce(e){var t=e.tweets,a=void 0===t?[]:t,i=e.isLoading,r=void 0!==i&&i,l=ke(),d=Object(n.useState)(0),j=Object(o.a)(d,2),b=j[0],h=j[1],m=Object(n.useState)(10),O=Object(o.a)(m,2),x=O[0],u=O[1],p=Object(n.useState)(null),g=Object(o.a)(p,2),f=g[0],N=g[1],y=function(e){var t=a.find((function(t){return t.id===e}));N(t)};return Object(s.jsxs)(c.a.Fragment,{children:[Object(s.jsx)(ie.a,{className:l.table,children:Object(s.jsxs)(re.a,{size:"small",children:[Object(s.jsx)(oe.a,{children:Object(s.jsxs)(le.a,{children:[Object(s.jsx)(de.a,{children:"Tweet"}),Object(s.jsx)(de.a,{align:"center",children:"Model - Original"}),Object(s.jsx)(de.a,{align:"center",children:"Model - S\u0142owosie\u0107"}),Object(s.jsx)(de.a,{align:"center",children:"Model - Brand24"})]})}),Object(s.jsx)(je.a,{children:a.slice(b*x,b*x+x).map((function(e){return Object(s.jsxs)(le.a,{children:[Object(s.jsx)(de.a,{padding:"none",size:"small",className:l.tweetClass,children:Object(s.jsx)(X,{tweetContent:e.content,tweetId:""+e.id.split("/")[3]})}),Object(s.jsxs)(de.a,{align:"right",className:l.cellResult,style:{color:"On Time"===e.status?"green":"red"},children:[r&&Object(s.jsxs)("div",{children:["Model's API is working",Object(s.jsx)("br",{}),Object(s.jsx)(Z.a,{color:"secondary"})]}),!r&&Object(s.jsx)(xe,{data:e.model1,id:e.id,onClickMore:y})]}),Object(s.jsxs)(de.a,{align:"right",className:l.cellResult,style:{color:"On Time"===e.status?"green":"red"},children:[r&&Object(s.jsxs)("div",{children:["Model's API not available",Object(s.jsx)("br",{}),Object(s.jsx)(Z.a,{color:"secondary"})]}),!r&&Object(s.jsx)(xe,{data:e.model2,id:e.id,onClickMore:y})]}),Object(s.jsxs)(de.a,{align:"right",className:l.cellResult,style:{color:"On Time"===e.status?"green":"red"},children:[r&&Object(s.jsxs)("div",{children:["Model's API not available",Object(s.jsx)("br",{}),Object(s.jsx)(Z.a,{color:"secondary"})]}),!r&&Object(s.jsx)(xe,{data:e.model3,id:e.id,onClickMore:y})]})]},e.id)}))})]})}),0!==a.length&&Object(s.jsx)(ce.a,{rowsPerPageOptions:[10,25,100],component:"div",count:a.length,rowsPerPage:x,page:b,onChangePage:function(e,t){h(t)},onChangeRowsPerPage:function(e){u(+e.target.value),h(0)}}),0===a.length&&Object(s.jsx)(v.a,{component:"h2",variant:"h6",color:"textSecondary",gutterBottom:!0,className:l.title,children:"Please upload file with tweets"}),Object(s.jsx)(we,{onClose:function(){N(null)},open:null!=f,tweet:f})]})}var Se={tweets:[],isRequestPending:!1},ze="SET_TWEETS",Te="UPDATE_TWEETS",Pe="REMOVE_TWEETS",Re=ze,_e=Te;function Ie(e,t){switch(t.type){case ze:return Object(q.a)(Object(q.a)({},e),{},{isRequestPending:!0,tweets:t.data});case Te:return Object(q.a)(Object(q.a)({},e),{},{isRequestPending:!1,tweets:e.tweets.map((function(e){return function(e,t){var a=t.find((function(t){return t.id===e.id}));return null!=a?Object(q.a)(Object(q.a)({},a),e):e}(e,t.data)}))});case Pe:return Object(q.a)(Object(q.a)({},e),{},{tweets:[]});default:throw new Error}}var Ee=Object(l.a)({palette:{primary:{main:"#852508"},secondary:b.a}});var Ae=function(){var e=Object(n.useReducer)(Ie,Se),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){var e;a.isRequestPending&&(e=a.tweets,fetch("".concat("http://127.0.0.1:8002/","predictions/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tweets:e.map((function(e){return{id:e.id,text:e.content}}))})}).then((function(e){return e.json()}))).then((function(e){c({type:_e,data:e.data})}))}),[a.isRequestPending]),Object(s.jsx)(h.a,{children:Object(s.jsx)(d.a,{theme:Ee,children:Object(s.jsxs)(W,{children:[Object(s.jsx)(ne,{onFileChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];c({type:Re,data:e})},isLoading:a.isRequestPending}),Object(s.jsx)(Ce,{tweets:a.tweets,isLoading:a.isRequestPending})]})})})},Me=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,324)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),s(e),n(e),c(e),i(e)}))};r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(Ae,{})}),document.getElementById("root")),Me()}},[[247,1,2]]]);
//# sourceMappingURL=main.72451736.chunk.js.map