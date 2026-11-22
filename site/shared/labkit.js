/* Offline-first teaching laboratory rendering utilities; no external dependencies. */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg';
window.L = {
  clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),
  f:(v,n=2)=>!Number.isFinite(v)?'—':Number(v).toLocaleString('en-US',{maximumFractionDigits:n}),
  lin:(a,b,n)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1)),
  seeded(seed=1){let a=(Math.floor(seed)||1)>>>0;return ()=>{a=(1664525*a+1013904223)>>>0;return a/4294967296}},
  gauss(r){return Math.sqrt(-2*Math.log(Math.max(1e-12,r())))*Math.cos(2*Math.PI*r())},
  plot(series,opt={}){
    const W=opt.w||800,H=opt.h||292,mar={l:56,r:23,t:20,b:39},ww=W-mar.l-mar.r,hh=H-mar.t-mar.b;
    const valid=series.flatMap(s=>s.points||[]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
    let xmin=opt.xmin??Math.min(...valid.map(p=>p[0]),0),xmax=opt.xmax??Math.max(...valid.map(p=>p[0]),1),ymin=opt.ymin??Math.min(...valid.map(p=>p[1]),0),ymax=opt.ymax??Math.max(...valid.map(p=>p[1]),1);
    if(xmax===xmin)xmax=xmin+1;if(ymax===ymin)ymax=ymin+1;
    const X=x=>mar.l+ww*(x-xmin)/(xmax-xmin),Y=y=>mar.t+hh*(1-(y-ymin)/(ymax-ymin));
    let s=`<svg class="labplot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${L.esc(opt.label||'Interactive technical plot')}">`;
    for(let i=0;i<=5;i++){let y=mar.t+i*hh/5,val=ymax-i*(ymax-ymin)/5;s+=`<line x1="${mar.l}" x2="${W-mar.r}" y1="${y}" y2="${y}" stroke="#2f4252" stroke-width=".8"/><text x="${mar.l-8}" y="${y+4}" text-anchor="end" fill="#a8bed0" font-size="11">${L.f(val,opt.ydigits??1)}</text>`}
    for(let i=0;i<=6;i++){let x=mar.l+i*ww/6,val=xmin+i*(xmax-xmin)/6;s+=`<line x1="${x}" x2="${x}" y1="${mar.t}" y2="${mar.t+hh}" stroke="#253646" stroke-width=".7"/><text x="${x}" y="${mar.t+hh+16}" text-anchor="middle" fill="#a8bed0" font-size="11">${L.f(val,opt.xdigits??1)}</text>`}
    s+=`<text x="${mar.l+ww/2}" y="${H-5}" text-anchor="middle" fill="#b8c9d7" font-size="12">${L.esc(opt.xlab||'')}</text><text x="16" y="${mar.t+hh/2}" text-anchor="middle" transform="rotate(-90 16 ${mar.t+hh/2})" fill="#b8c9d7" font-size="12">${L.esc(opt.ylab||'')}</text>`;
    series.forEach((line,i)=>{let pts=(line.points||[]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));let path=pts.map((p,j)=>(j?'L':'M')+X(p[0]).toFixed(2)+','+Y(p[1]).toFixed(2)).join(' ');let color=line.color||['#f44950','#51b0ed','#57ce9c','#ae91fa','#f1bd55'][i%5];s+=`<path d="${path}" stroke="${color}" fill="none" stroke-width="${line.width||2.6}" ${line.dash?'stroke-dasharray="5 5"':''}/>`;
      if(line.dots)pts.forEach(p=>{s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="3.2" fill="${color}"/>`});});
    s+='</svg>';s+='<div class="lab-legend">'+series.map((p,i)=>`<span><i style="background:${p.color||['#f44950','#51b0ed','#57ce9c','#ae91fa','#f1bd55'][i%5]}"></i>${L.esc(p.name||'Series '+(i+1))}</span>`).join('')+'</div>';return s;
  },
  esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))},
  table(headers,rows){return `<div style="overflow-x:auto"><table class="lab-table"><thead><tr>${headers.map(h=>`<th>${L.esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`},
  grid(mat,opt={}){let n=opt.columns||mat[0]?.length||12;let out=`<div class="heatgrid" style="grid-template-columns:repeat(${n},minmax(0,1fr))" role="img" aria-label="${L.esc(opt.label||'Time frequency resource grid')}">`;mat.flat().forEach((v,i)=>{let c=typeof v==='string'?v:v.c,label=typeof v==='string'?'':(v.label||'');let title=typeof v==='string'?v:v.title||'';out+=`<div class="heatcell" style="background:${c||'#192631'};${opt.height?'min-height:'+opt.height+'px;':''}" title="${L.esc(title||label)}">${L.esc(label)}</div>`});return out+'</div>'},
  cmul:(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],cadd:(a,b)=>[a[0]+b[0],a[1]+b[1]],cabs:a=>Math.hypot(a[0],a[1]),
  dft(a,inverse=false){let N=a.length,sgn=inverse?1:-1;return Array.from({length:N},(_,k)=>{let re=0,im=0;for(let n=0;n<N;n++){let th=sgn*2*Math.PI*k*n/N;re+=a[n][0]*Math.cos(th)-a[n][1]*Math.sin(th);im+=a[n][0]*Math.sin(th)+a[n][1]*Math.cos(th)}return [re/(inverse?N:1),im/(inverse?N:1)]})},
  qam(bits=2,r=()=>0.5){let M=2**bits,side=Math.ceil(Math.sqrt(M));if(bits===2)return [(r()>.5?1:-1)/Math.SQRT2,(r()>.5?1:-1)/Math.SQRT2];let i=2*Math.floor(r()*side)-(side-1),q=2*Math.floor(r()*side)-(side-1);return [i/Math.sqrt(2*(M-1)/3),q/Math.sqrt(2*(M-1)/3)]},
  controlDefault(c){return c.default??(c.type==='select'?c.options[0][0]:c.min??0)},
  active:null,
  init(cfg){
    window.LAB_CONFIG=cfg;const nav=document.getElementById('tabNav');const host=document.getElementById('tabHost');
    nav.innerHTML=cfg.tabs.map((t,i)=>`<button type="button" class="tab ${i===0?'current':''}" data-id="${t.id}" aria-selected="${i===0}">${L.esc(t.name)}</button>`).join('')+`<button class="tab" data-id="knowledge">Knowledge Check</button>`;
    let current=null,values={};const T=()=>cfg.tabs.find(t=>t.id===current);
    function valueControl(c){let v=values[c.id];if(c.type==='select')return `<select id="ctl-${c.id}" data-ctl="${c.id}">${c.options.map(o=>`<option value="${L.esc(o[0])}" ${String(v)===String(o[0])?'selected':''}>${L.esc(o[1])}</option>`).join('')}</select>`;
      if(c.type==='number')return `<input id="ctl-${c.id}" data-ctl="${c.id}" type="number" min="${c.min??''}" max="${c.max??''}" step="${c.step??'any'}" value="${v}">`;
      return `<input id="ctl-${c.id}" data-ctl="${c.id}" type="range" min="${c.min}" max="${c.max}" step="${c.step??1}" value="${v}">`}
    function getValue(c){let v=values[c.id];return c.type==='select'?v:Number(v)}
    function update(){const tab=T();if(!tab)return;let obj={};tab.controls.forEach(c=>obj[c.id]=getValue(c));let result;try{result=tab.render(obj)||{}}catch(e){document.getElementById('work').innerHTML=`<p class="err">Simulation error: ${L.esc(e.message)}</p>`;console.error(e);return}
      const cards=(result.metrics||[]).map((x,i)=>`<div class="stat"><small>${L.esc(x[0])}</small><b>${L.esc(x[1])}</b></div>`).join('');
      document.getElementById('work').innerHTML=`${cards?'<div class="statlist">'+cards+'</div>':''}<div class="panel vizpanel">${result.html||''}${result.insight?`<div class="lab-insight"><h3>Why this matters</h3>${result.insight}</div>`:''}${result.footer?`<div class="lab-notes">${result.footer}</div>`:''}</div>`;
      tab.controls.forEach(c=>{let n=document.getElementById('label-'+c.id);if(n)n.textContent=(c.display?c.display(obj[c.id]):String(obj[c.id])+(c.unit?' '+c.unit:''))});
      if(tab.after)tab.after(obj,result);}
    function activate(id){current=id;nav.querySelectorAll('button').forEach(b=>{let on=b.dataset.id===id;b.classList.toggle('current',on);b.setAttribute('aria-selected',on)});if(id==='knowledge'){host.innerHTML=`<div class="panel answerwrap"><div class="panhead">Knowledge Check · 10 multiple-choice questions</div><div class="progress"><i id="quizMeter"></i></div><div id="quizBox" class="quiz"></div></div>`;initQuiz(cfg.quiz);return}
      const t=T();values={};t.controls.forEach(c=>values[c.id]=L.controlDefault(c));host.innerHTML=`<div class="lab-shell"><aside class="panel labsider"><div class="panhead">${L.esc(t.name)} · Controls</div>${t.controls.map(c=>`<div class="cfgitem"><label for="ctl-${c.id}"><span>${L.esc(c.label)}</span><strong id="label-${c.id}"></strong></label>${valueControl(c)}</div>`).join('')}<button id="resetControls" class="lab-simbtn" style="width:100%">Reset scenario</button><div class="lab-meta"><span class="tag star">Slides ${L.esc(t.slides)}</span><span class="tag">${L.esc(t.kind||'Educational model')}</span></div><p class="fine">${t.intro||''}</p></aside><div id="work" class="lab-output" aria-live="polite"></div></div>`;
      host.querySelectorAll('[data-ctl]').forEach(el=>{el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{let c=t.controls.find(c=>c.id===el.dataset.ctl);values[c.id]=c.type==='select'?el.value:Number(el.value);update()})});document.getElementById('resetControls').onclick=()=>activate(id);update();}
    nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{activate(b.dataset.id);history.replaceState(null,'','#'+b.dataset.id)}));
    document.querySelectorAll('[data-info]').forEach(b=>b.addEventListener('click',()=>{let type=b.dataset.info,d=document.getElementById('modal'),txt=type==='background'?cfg.background:type==='description'?'Adjust the scenario controls, compare the plots, and use the highlighted slide references to return to the corresponding lecture. Models label their simplifications.':cfg.glossary;document.getElementById('modalBody').textContent=txt;d.showModal()}));
    let initial=location.hash.slice(1);activate(cfg.tabs.some(x=>x.id===initial)||initial==='knowledge'?initial:cfg.tabs[0].id);
  }
};
})();