from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
base=Path('/mnt/data/ECE578_Learning_Lab')
def inline(p):
 s=BeautifulSoup(p.read_text(),'html.parser')
 for t in s.select('link[rel="stylesheet"]'):t.replace_with(s.new_tag('style',string=(p.parent/t['href']).read_text()))
 for t in s.select('script[src]'):t.replace_with(s.new_tag('script',string=(p.parent/t['src']).read_text()))
 return str(s)
results=[]
def check(title,condition,detail=''):
 results.append((title,bool(condition),str(detail)))
 print('PASS' if condition else 'FAIL',title,detail)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for n in (5,6,7,8):
  pg=b.new_page();pg.set_content(inline(base/f'module_{n:02}/index.html'))
  # exactly ten questions with correct path, and all quiz controls
  pg.locator('[data-id=knowledge]').click()
  for j in range(10):
   answer=pg.evaluate('(j)=>window.LAB_CONFIG.quiz[j][2]',j)
   pg.locator('.quizopt').nth(answer).click();pg.locator('#nextQ').click()
  check(f'Module {n} quiz correct-answer path','10 / 10' in pg.locator('#quizBox').inner_text())
  if n==5:
   hi=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='cyclic').render({n:'16',cp:6,delay:4,echo:0.5,seed:3}).metrics[2][1]")
   lo=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='cyclic').render({n:'16',cp:1,delay:4,echo:0.5,seed:3}).metrics[2][1]")
   check('M5 CP sufficient implies near-zero equalized EVM',float(hi.strip('%'))<.001,hi)
   check('M5 inadequate CP produces nonzero EVM',float(lo.strip('%'))>.01,lo)
   p0=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='orthogonality').render({df:1,width:4}).metrics[1][1]")
   check('M5 integer tone spacing orthogonality',float(p0)<1e-9,p0)
  if n==6:
   a=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='zc').render({root:'25',shift:7,other:'29'}).metrics[3][1]")
   check('M6 full ZC nonzero-shift autocorrelation',float(a)<1e-6,a)
   z=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='detect').render({id:'0',snr:22,cfo:0,delay:4,seed:7}).metrics")
   check('M6 PSS ID/timing acquisition in high SNR',z[1][1]=='0' and z[2][1]=='4 samples',z)
  if n==7:
   low=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='estimators').render({snr:0,spacing:'4',delay:5,seed:4}).metrics[2][1]")
   high=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='estimators').render({snr:30,spacing:'4',delay:5,seed:4}).metrics[2][1]")
   check('M7 higher pilot SNR improves linear NMSE (fixed realization)',float(high)<float(low),(low,high))
  if n==8:
   a=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='pdcch').render({agg:'2',bw:'25',cfi:'2',candidates:5}).metrics[2][1]")
   check('M8 CCE has 72 coded bits',int(a)==72,a)
   a=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='pdsch').render({bw:'25',cfi:'1',sf:'1',port:'1'}).metrics[1][1]")
   c=pg.evaluate("()=>window.LAB_CONFIG.tabs.find(t=>t.id==='pdsch').render({bw:'25',cfi:'3',sf:'1',port:'2'}).metrics[1][1]")
   check('M8 more PDCCH symbols and CRS ports reduce sample data share',float(c.strip('%'))<float(a.strip('%')),(a,c))
  pg.close()
 b.close()
assert all(x[1] for x in results),'Numerical QA failed'
print('TOTAL',sum(x[1] for x in results),'/',len(results))