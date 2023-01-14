var scrollBtn=document.querySelector(".btn"),btnVisibility=function(){window.scrollY>400?scrollBtn.style.visibility="visible":scrollBtn.style.visibility="hidden"};document.addEventListener("scroll",(function(){btnVisibility()})),scrollBtn.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=index.62d69d40.js.map
