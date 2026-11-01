var list=document.getElementById("list"),empty=document.getElementById("empty"),input=document.getElementById("site"),msg=document.getElementById("msg");
function norm(s){s=(s||"").trim().toLowerCase().replace(/^[a-z][a-z0-9+.-]*:\/\//,"").replace(/^\*\./,"").split(/[\/?#:]/)[0].replace(/^www\./,"").replace(/\.$/,"");return s}
function load(cb){chrome.storage.local.get(["skipSites"],function(d){cb((d.skipSites||[]).map(norm).filter(Boolean))})}
function save(l){chrome.storage.local.set({skipSites:l},render)}
function render(){load(function(l){list.innerHTML="";empty.style.display=l.length?"none":"block";l.forEach(function(s){var li=document.createElement("li"),sp=document.createElement("span"),b=document.createElement("button");sp.textContent=s;b.textContent="Remove";b.className="del";b.onclick=function(){load(function(x){save(x.filter(function(y){return y!=s}))})};li.appendChild(sp);li.appendChild(b);list.appendChild(li)})})}
function add(){var s=norm(input.value);msg.textContent="";if(!s||!/^[a-z0-9.-]+\.[a-z0-9-]+$|^localhost$/.test(s)){msg.textContent="Enter a valid site, e.g. example.com";return}load(function(l){if(l.indexOf(s)<0)l.push(s);input.value="";save(l)})}
document.getElementById("add").onclick=add;
input.addEventListener("keydown",function(e){if(e.key=="Enter")add()});
render();
