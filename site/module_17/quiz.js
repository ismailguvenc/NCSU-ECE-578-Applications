'use strict';
const BANK=window.ECE578_BANK||[];
const MODULES={1:'Introduction & spectrum',2:'Network architecture',3:'RRC & mobility',4:'User-plane protocols',5:'OFDM / OFDMA',6:'Downlink synchronization',7:'Channel estimation',8:'Downlink channels',9:'CQI & HARQ',10:'MIMO & beamforming',11:'Scheduling & ICIC',12:'Uplink reference signals',13:'PRACH & timing advance',14:'Deployment & positioning',15:'LTE-Advanced',16:'5G New Radio'};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let session=null,showKeys=false,showNum=20,tabNow='setup';
const findQ=id=>BANK.find(q=>q.id===id);
function gotoTab(id){
 tabNow=id;
 for(const b of document.querySelectorAll('.tabs .tab'))b.classList.toggle('current',b.dataset.tab===id);
 for(const v of document.querySelectorAll('.view'))v.classList.toggle('current',v.id===id);
 window.scrollTo({top:0,behavior:'instant'});
}
function createOptions(){
 for(const [id] of [['moduleFilter'],['bankModule']]){
  const el=$(id);
  for(const [m,name] of Object.entries(MODULES))el.add(new Option(`Module ${m}: ${name}`,String(m)));
 }
 $('statTotal').textContent=BANK.length;
 $('statOriginal').textContent=BANK.filter(q=>q.origin!=='New practice').length;
 $('statNew').textContent=BANK.filter(q=>q.origin==='New practice').length;
 $('quickStart').innerHTML=[1,3,5,6,10,13,16].map(m=>`<button class="btn" data-mod="${m}">Module ${m}: ${esc(MODULES[m])}</button>`).join('');
 for(const b of $('quickStart').querySelectorAll('button'))b.addEventListener('click',()=>{ $('moduleFilter').value=b.dataset.mod;updateAvailable();gotoTab('setup');});
}
function matching(moduleValue,sourceValue){
 return BANK.filter(q=>(moduleValue==='all'||q.module===Number(moduleValue)) && (sourceValue==='all'||(sourceValue==='original' ? q.origin!=='New practice':q.origin==='New practice')));
}
function updateAvailable(){
 const list=matching($('moduleFilter').value,$('sourceFilter').value);
 let n=$('countFilter').value==='all'?list.length:Math.min(Number($('countFilter').value),list.length);
 $('availability').innerHTML=`<b>${list.length}</b> matching questions, including <b>${list.filter(x=>x.origin!=='New practice').length}</b> reviewed source items and <b>${list.filter(x=>x.origin==='New practice').length}</b> new items. This setup will ask <b>${n}</b> questions.`;
 $('startBtn').disabled=!list.length;
}
function shuffle(arr){let a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function startQuiz(qids){
 let choices;
 if(qids){choices=qids.map(findQ).filter(Boolean);}else{
  choices=matching($('moduleFilter').value,$('sourceFilter').value);
  if($('sortFilter').value==='random')choices=shuffle(choices);
  else choices.sort((a,b)=>a.module-b.module||a.id.localeCompare(b.id));
  const n=$('countFilter').value==='all'?choices.length:Number($('countFilter').value);
  choices=choices.slice(0,n);
 }
 if(!choices.length)return;
 session={questions:choices,mode:$('modeFilter').value,answers:Array(choices.length).fill(null),idx:0,done:false,created:new Date().toISOString()};
 gotoTab('practice');drawQuestion();
}
function drawQuestion(){
 if(!session){$('questionHost').innerHTML='<p class="muted">No active quiz.</p>';return;}
 const s=session,idx=s.idx,q=s.questions[idx],ans=s.answers[idx],answered=ans!==null;
 $('quizType').textContent=s.mode==='practice'?'Learning mode · immediate feedback':'Test mode · delayed feedback';
 $('quizTitle').textContent=`Module ${q.module} · ${MODULES[q.module]}`;
 $('quizCounter').textContent=`${idx+1} / ${s.questions.length}`;
 $('quizMeter').style.width=`${(idx+(answered?1:0))*100/s.questions.length}%`;
 const hasReveal=answered&&s.mode==='practice';
 $('questionHost').innerHTML=`<div class="questionmeta"><span>${esc(q.id)}</span><span>${q.origin==='New practice'?'New question':'Respondus revised'}</span><span>${esc(q.reference)}</span></div><div class="stem">${esc(q.stem)}</div><div id="choicesBlock">${q.options.map((o,i)=>`<button class="quizchoice ${answered?(hasReveal&&i===q.correct?'correct':hasReveal&&i===ans?'wrong':i===ans?'selected':''):''}" data-answer="${i}" ${answered?'disabled':''}><span class="letter">${letters[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>${hasReveal?`<div class="answerfeedback ${ans===q.correct?'':'bad'}" role="status"><strong>${ans===q.correct?'Correct interpretation':'Review this concept'} · Answer ${letters[q.correct]}</strong><p class="why">${esc(q.explanation)}</p><p class="fine">${esc(q.reference)} · ${esc(q.source)}</p></div>`:s.mode==='exam'?'<p class="fine">Test mode hides the answer until the session ends.</p>':'<p class="fine">Select an answer to reveal the correct choice and explanation.</p>'}`;
 for(const b of $('questionHost').querySelectorAll('[data-answer]'))b.addEventListener('click',()=>chooseAnswer(Number(b.dataset.answer)));
 $('nextQuestionBtn').disabled=!answered;
 $('nextQuestionBtn').textContent=idx===s.questions.length-1?'Finish & review →':'Next question →';
 const answeredItems=s.answers.map((a,i)=>a===null?null:[a,s.questions[i].correct]).filter(Boolean);
 const correct=answeredItems.filter(([a,b])=>a===b).length;
 $('answeredN').textContent=answeredItems.length;
 $('correctN').textContent=s.mode==='practice'?correct:'Hidden';
 $('percentN').textContent=s.mode==='practice'&&answeredItems.length?Math.round(100*correct/answeredItems.length)+'%':'—';
 $('modeHelp').textContent=s.mode==='practice'?'After each answer, study the technical explanation before continuing.':'The interface records each answer without revealing its correctness until the end.';
}
function chooseAnswer(i){if(!session||session.answers[session.idx]!==null)return;session.answers[session.idx]=i;drawQuestion();}
function advance(){if(!session)return;if(session.answers[session.idx]===null)return;if(session.idx===session.questions.length-1){finishSession();return;}session.idx++;drawQuestion();}
function finishSession(){if(!session)return;session.done=true;renderResults();gotoTab('results');}
function renderResults(){
 const host=$('resultsHost');if(!session){host.innerHTML='<div class="panel">No session has started yet.</div>';return;}
 const s=session,completed=s.questions.filter((q,i)=>s.answers[i]!==null).length,score=s.questions.filter((q,i)=>s.answers[i]===q.correct).length;
 const pct=completed?100*score/completed:0,unanswered=s.questions.length-completed;
 const byMod={};s.questions.forEach((q,i)=>{if(!byMod[q.module])byMod[q.module]={got:0,total:0};if(s.answers[i]!==null){byMod[q.module].total++;if(s.answers[i]===q.correct)byMod[q.module].got++;}});
 host.innerHTML=`<div class="panel"><div class="eyebrow">Session summary · ${s.mode==='practice'?'Learning mode':'Test mode'}</div><h2>${s.done?'Your score and concept review':'Interim learning summary'}</h2><div class="resultbig">${completed?Math.round(pct):0}%</div><p class="muted">${score} correct out of ${completed} answered${unanswered?`; ${unanswered} unanswered`:''}. ${s.done?'The detailed key appears below.':''}</p><div class="resultcards"><div class="resultcard"><small>Correct</small><strong>${score}</strong></div><div class="resultcard"><small>Attempted</small><strong>${completed}</strong></div><div class="resultcard"><small>Missed</small><strong>${completed-score}</strong></div></div><div class="result-btns"><button class="btn primary" id="retryMistakes">Retake missed questions</button><button class="btn" id="restartQuiz">Create another quiz</button><button class="btn" id="downloadReview">Export my results</button></div><div class="separator"></div><h2>Performance by module</h2>${Object.entries(byMod).map(([m,t])=>`<div class="barrow"><span>Module ${m} · ${esc(MODULES[m])}</span><div class="bar"><b style="width:${t.total?(100*t.got/t.total):0}%"></b></div><span>${t.got}/${t.total}</span></div>`).join('')}</div><div class="panel" style="margin-top:13px"><h2>Answer review</h2><p class="fine">Each explanation identifies the underlying technical reasoning. Return to the linked module’s application for interactive reinforcement.</p>${s.questions.map((q,i)=>{const a=s.answers[i],ok=a===q.correct;return `<div class="reviewquestion"><div class="questionmeta"><span>${esc(q.id)}</span><span>Module ${q.module}</span><span>${q.origin==='New practice'?'New':'Revised original'}</span></div><strong>${esc(q.stem)}</strong><p class="${ok?'correctanswer':'youranswer'}">${a===null?'Not answered':`Your answer: ${letters[a]} · ${esc(q.options[a])}`}</p><p class="correctanswer">Answer: ${letters[q.correct]} · ${esc(q.options[q.correct])}</p><p>${esc(q.explanation)}</p><a href="../module_${String(q.module).padStart(2,'0')}/index.html">Open Module ${q.module} lab</a></div>`;}).join('')}</div>`;
 $('retryMistakes').disabled=!s.questions.some((q,i)=>s.answers[i]!==q.correct);
 $('retryMistakes').addEventListener('click',()=>startQuiz(s.questions.filter((q,i)=>s.answers[i]!==q.correct).map(q=>q.id)));
 $('restartQuiz').addEventListener('click',()=>gotoTab('setup'));
 $('downloadReview').addEventListener('click',downloadMyResults);
}
function downloadMyResults(){if(!session)return;const s=session;const out=['ECE 578 Module 17 personal self-study review',`Generated: ${new Date().toISOString()}`,''];s.questions.forEach((q,i)=>{out.push(`[${q.id}] Module ${q.module}: ${q.stem}`,`Selected: ${s.answers[i]===null?'(none)':letters[s.answers[i]]+' '+q.options[s.answers[i]]}`,`Correct: ${letters[q.correct]} ${q.options[q.correct]}`,`Explanation: ${q.explanation}`,'');});const data=new Blob([out.join('\n')],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(data);const a=document.createElement('a');a.href=u;a.download='ECE578_Quiz_Review.txt';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);}
function updateLibrary(){showNum=20;drawLibrary();}
function drawLibrary(){
 const needle=$('bankSearch').value.toLowerCase().trim();let items=matching($('bankModule').value,$('bankSource').value).filter(q=>!needle||[q.stem,...q.options,q.id,q.reference,q.explanation].some(s=>s.toLowerCase().includes(needle)));
 $('bankCount').textContent=`Showing ${Math.min(showNum,items.length)} of ${items.length} matching questions.`;
 $('bankHost').innerHTML=items.slice(0,showNum).map(q=>`<div class="bankitem"><div class="row"><span class="pill">${esc(q.id)}</span><span class="pill ${q.origin==='New practice'?'new':'original'}">${q.origin==='New practice'?'New question':'Revised original'}</span><span class="fine">Module ${q.module}</span></div><h3>${esc(q.stem)}</h3><div class="bankoptions">${q.options.map((o,i)=>`<div class="bankoption ${showKeys&&i===q.correct?'key':''}">${showKeys&&i===q.correct?'★ ':''}${letters[i]}. ${esc(o)}</div>`).join('')}</div>${showKeys?`<div class="bankextra"><b>Answer ${letters[q.correct]}.</b> ${esc(q.explanation)}<br><small>${esc(q.source)}</small></div>`:''}</div>`).join('');
 $('bankMoreBtn').hidden=items.length<=showNum;
}
function fillCoverage(){
 $('coverageGrid').innerHTML='<div class="coverage-row"><b>Module</b><b>Original</b><b>New</b><b>Relative mix</b></div>'+Object.entries(MODULES).map(([key,label])=>{let m=Number(key),o=BANK.filter(q=>q.module===m&&q.origin!=='New practice').length,n=BANK.filter(q=>q.module===m&&q.origin==='New practice').length;return `<div class="coverage-row"><span><b>Module ${m}</b> · ${esc(label)}</span><span>${o}</span><span>${n}</span><div class="track"><i style="width:${100*o/(o+n)}%"></i><i class="new" style="width:${100*n/(o+n)}%"></i></div></div>`;}).join('')+'<p class="fine"><span style="color:#ef545f">■</span> Original Respondus (revised) &nbsp; <span style="color:#65aaf0">■</span> Newly developed questions</p>';
}
function modalInfo(type){
 const defs={background:['Background','<p>This application summarizes the LTE/5G course through formative questions. It consolidates the supplied Respondus question bank and adds calculation and design scenarios covering the modules and planned labs.</p><p>Practice the concepts as needed, revisit a module for interactive demonstrations, and repeat weak topics.</p>'],description:['Description','<p>Use Create Quiz to filter by module, source and question count. Learning mode reveals correct answers after each selection. Test mode delays the key until you complete the session. Results show your score, mistakes and technical explanations.</p><p>Question Bank permits searching all items. Instructor Resources provides an answer-keyed Respondus-style export and technical review notes.</p>'],glossary:['Glossary','<p><b>SNR</b>: signal-to-noise ratio; <b>SINR</b>: signal-to-interference-plus-noise ratio; <b>UE</b>: user equipment; <b>eNB</b>: LTE base station; <b>gNB</b>: NR base station; <b>RB/RE</b>: resource block/element; <b>CP</b>: cyclic prefix; <b>HARQ</b>: hybrid ARQ; <b>CQI</b>: channel quality indicator; <b>TAU</b>: tracking area update; <b>DM-RS/SRS</b>: demodulation/sounding reference signal; <b>SSB</b>: synchronization signal block; <b>BWP</b>: bandwidth part.</p>']};
 $('dialogTitle').textContent=defs[type][0];$('dialogText').innerHTML=defs[type][1];$('learningDialog').showModal();
}
function bootstrap(){
 if(BANK.length<372){$('availability').textContent='Could not load the complete question bank.';return;}
 createOptions();
 for(const b of document.querySelectorAll('.tabs [data-tab]'))b.addEventListener('click',()=>gotoTab(b.dataset.tab));
 for(const id of ['moduleFilter','sourceFilter','countFilter'])$(id).addEventListener('change',updateAvailable);
 $('startBtn').addEventListener('click',()=>startQuiz());
 $('nextQuestionBtn').addEventListener('click',advance);
 $('stopQuizBtn').addEventListener('click',()=>{if(session){finishSession();}});
 for(const id of ['bankSearch','bankModule','bankSource'])$(id).addEventListener(id==='bankSearch'?'input':'change',updateLibrary);
 $('bankMoreBtn').addEventListener('click',()=>{showNum+=20;drawLibrary();});
 $('toggleAnswersBtn').addEventListener('click',()=>{showKeys=!showKeys;$('toggleAnswersBtn').textContent=showKeys?'Hide answer key':'Show answers & explanations';drawLibrary();});
 for(const type of ['background','description','glossary'])$(type+'Btn').addEventListener('click',()=>modalInfo(type));
 $('dialogClose').addEventListener('click',()=>$('learningDialog').close());
 updateAvailable();drawLibrary();fillCoverage();
}
bootstrap();