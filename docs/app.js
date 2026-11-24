"use strict";
const $ = id => document.getElementById(id);
const input = $("password");
function estimate(p){
 const ids=["onlineSlow","onlineFast","offlineSlow","offlineFast"];
 const keys=["online_throttling_100_per_hour","online_no_throttling_10_per_second","offline_slow_hashing_1e4_per_second","offline_fast_hashing_1e10_per_second"];
 ids.forEach(id=>$(id).textContent="--"); $("predictability").textContent="--";
 if(!p || typeof window.zxcvbn!=="function" || p.length>100){
 $("estimateNote").textContent=!p?"Awaiting test password.":p.length>100?"Estimate limited to 100 characters.":"Estimator unavailable. Connect to the internet and reload.";return;
 }
 const r=window.zxcvbn(p);
 ids.forEach((id,i)=>$(id).textContent=r.crack_times_display[keys[i]]);
 $("predictability").textContent=["Very weak","Weak","Moderate","Strong","Very strong"][r.score]+" / "+r.score+" of 4";
 $("estimateNote").textContent="Assumptions: 100/hour, 10/sec, 10,000/sec and 10 billion/sec respectively. Estimates are not guarantees. "+(r.feedback.warning||"");
}
function update(){
  const p=input.value;
  estimate(p);
  const rules=[["12+ characters",p.length>=12],["Uppercase",/[A-Z]/.test(p)],["Lowercase",/[a-z]/.test(p)],["Number",/[0-9]/.test(p)],["Symbol",/[^A-Za-z0-9\s]/.test(p)]];
  const count=rules.filter(r=>r[1]).length;
  $("rules").replaceChildren(...rules.map(([name,pass])=>{
    const li=document.createElement("li"), a=document.createElement("span"), b=document.createElement("span");
    a.textContent=name;b.textContent=pass?"[PASS]":"[FAIL]";b.className=pass?"pass":"fail";li.append(a,b);return li;
  }));
  $("meter").value=count;$("score").textContent=`${count} / 5 rules`;
  $("assessment").textContent=!p?"AWAITING INPUT":count===5?"ALL RULES MET":"RULES MISSING";
  $("advice").textContent=!p?"Use a long, unique password.":/password|qwerty|123456|hello123/i.test(p)?"Common pattern detected. Avoid predictable words and sequences.":"Composition alone cannot measure predictability. Use a unique password and MFA.";
}
input.addEventListener("input",update);
$("toggle").onclick=()=>{input.type=input.type==="password"?"text":"password";$("toggle").textContent=input.type==="password"?"SHOW":"HIDE";};
$("length").oninput=()=>{$("lengthValue").value=$("length").value;};
function randomIndex(n){const a=new Uint32Array(1), limit=4294967296-(4294967296%n);do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%n;}
$("generate").onclick=()=>{
 const sets=["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789","!@#$%^&*_-+="], all=sets.join("");
 const chars=sets.map(s=>s[randomIndex(s.length)]);
 while(chars.length<Number($("length").value))chars.push(all[randomIndex(all.length)]);
 for(let i=chars.length-1;i>0;i--){const j=randomIndex(i+1);[chars[i],chars[j]]=[chars[j],chars[i]];}
 input.value=chars.join("");input.type="password";$("toggle").textContent="SHOW";update();
};
$("clear").onclick=()=>{input.value="";input.type="password";$("toggle").textContent="SHOW";update();};
update();
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const canvas=$("matrix"),ctx=canvas.getContext("2d");let drops=[];
 function resize(){canvas.width=innerWidth;canvas.height=innerHeight;drops=Array(Math.ceil(canvas.width/18)).fill(0);}
 resize();addEventListener("resize",resize);
 setInterval(()=>{ctx.fillStyle="rgba(5,10,7,.12)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#39ff88";ctx.font="15px monospace";drops.forEach((y,i)=>{ctx.fillText("01ABCDEF"[Math.floor(Math.random()*8)],i*18,y*18);drops[i]=y*18>canvas.height&&Math.random()>.97?0:y+1;});},90);
}
