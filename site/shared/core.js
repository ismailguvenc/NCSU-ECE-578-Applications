const $=id=>document.getElementById(id);
const fmt=(x,d=1)=>Number(x).toLocaleString(undefined,{maximumFractionDigits:d});
function buildTabs(){document.querySelectorAll('.tab[data-tab]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));const hash=decodeURIComponent(location.hash.substring(1));if(hash&&$(hash))switchTab(hash)}
function switchTab(id){document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('current',x.dataset.tab===id));document.querySelectorAll('.view').forEach(x=>x.classList.toggle('current',x.id===id));history.replaceState(null,'','#'+encodeURIComponent(id));window.scrollTo({top:0,behavior:'smooth'})}
function panelInfo(kind){const txt={background:'These teaching models use LTE Release 8 conventions unless noted. The simulation is pedagogical, not a fully 3GPP-compliant protocol implementation.',description:'Change the controls, observe the diagram and numerical metrics, then compare against the course slides. Reset or revisit presets to repeat an experiment.',glossary:'UE: user equipment; eNB: evolved Node B; EPC: Evolved Packet Core; RRC: Radio Resource Control; AS: Access Stratum; NAS: Non-Access Stratum; MME: Mobility Management Entity; TA: tracking area; TAU: tracking area update; QCI: QoS Class Identifier.'}[kind];$('modalBody').textContent=txt;$('modal').showModal()}
function initQuiz(qs){
 const box=$('quizBox'); if(!box)return;
 let idx=0,score=0,answered=false;
 function paint(){
  answered=false;
  $('quizMeter').style.width=(100*idx/qs.length)+'%';
  if(idx===qs.length){
   box.innerHTML=`<h2>Knowledge check complete</h2><div class="metric" style="font-size:62px">${score} / ${qs.length}</div><p>${score>=8?'Strong result.':score>=6?'Good progress.':'Revisit the simulations and try again.'} No grade is recorded.</p><button class="btn primary" id="again">Try again</button>`;
   $('again').onclick=()=>{idx=0;score=0;paint()};return;
  }
  const [q,opts,correct,why]=qs[idx];
  // Rotate answer order deterministically across questions. Source keys are indexed
  // into the original options, not the displayed letter. No 'always A' answer cue.
  const off=(3*idx+1)%opts.length;
  const order=opts.map((_,j)=>(j+off)%opts.length);
  box.innerHTML=`<span class="eyebrow">Question ${idx+1} of ${qs.length}</span><h2 style="margin-top:9px">${q}</h2><div id="choices"></div><div id="feedback"></div>`;
  $('choices').innerHTML=order.map((orig,j)=>`<button class="quizopt" type="button" data-v="${j}">${String.fromCharCode(65+j)}. ${opts[orig]}</button>`).join('');
  $('choices').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
   if(answered)return;answered=true;
   const display=Number(b.dataset.v),chosenOriginal=order[display],hit=chosenOriginal===correct;
   if(hit)score++;
   $('choices').querySelectorAll('button').forEach((it,j)=>{it.disabled=true;it.classList.toggle('ok',order[j]===correct);it.classList.toggle('no',j===display&&!hit)});
   $('feedback').innerHTML=`<div class="note"><b>${hit?'Correct.':'Review this point.'}</b> ${why}<p>Correct answer: <b>${opts[correct]}</b></p></div><button class="btn primary" id="nextQ">${idx+1===qs.length?'See score':'Next question'} →</button>`;
   $('nextQ').onclick=()=>{idx++;paint()};
  }));
 }
 paint();
}
function linePlot(svg,series,xmin,xmax,ymin,ymax,xtitle,ytitle){const W=770,H=350,L=62,R=22,T=16,B=50, sx=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),sy=y=>H-B-(y-ymin)/(ymax-ymin)*(H-T-B);let s=`<rect width="${W}" height="${H}" fill="#101820"/>`;for(let t=0;t<=5;t++){let y=T+t*(H-T-B)/5,v=ymax-t*(ymax-ymin)/5;s+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#2b3947"/><text x="${L-8}" y="${y+4}" text-anchor="end" fill="#94aabf" font-size="11">${fmt(v,1)}</text>`}for(let t=0;t<=5;t++){let x=L+t*(W-L-R)/5,v=xmin+t*(xmax-xmin)/5;s+=`<line x1="${x}" y1="${T}" x2="${x}" y2="${H-B}" stroke="#273644"/><text x="${x}" y="${H-B+19}" text-anchor="middle" fill="#94aabf" font-size="11">${fmt(v,0)}</text>`}s+=`<text x="${W/2}" y="${H-10}" fill="#c1d0df" text-anchor="middle">${xtitle}</text><text x="14" y="${H/2}" fill="#c1d0df" text-anchor="middle" transform="rotate(-90,14,${H/2})">${ytitle}</text>`;series.forEach((a,i)=>{const d=a.points.map(([x,y],j)=>(j?'L':'M')+sx(x).toFixed(1)+' '+sy(y).toFixed(1)).join(' ');s+=`<path d="${d}" fill="none" stroke="${a.color}" stroke-width="3"/><text x="${L+12}" y="${T+18+i*21}" fill="${a.color}" font-size="12">${a.name}</text>`});svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML=s}
window.addEventListener('DOMContentLoaded',buildTabs);