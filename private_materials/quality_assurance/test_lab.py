from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import json,traceback
root=Path('/mnt/data/ECE578_Learning_Lab')
def inline(path):
    p=Path(path)
    soup=BeautifulSoup(p.read_text(),'html.parser')
    for a in soup.select('link[rel="stylesheet"]'):
        src=(p.parent/a['href']).resolve()
        a.replace_with(soup.new_tag('style',string=src.read_text()))
    for a in soup.select('script[src]'):
        src=(p.parent/a['src']).resolve()
        a.replace_with(soup.new_tag('script',string=src.read_text()))
    return str(soup)

with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-gpu'])
 for n in [5,6,7,8]:
  page=b.new_page(viewport={'width':1440,'height':950})
  errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
  path=root/f'module_{n:02}'/'index.html'
  page.set_content(inline(path),wait_until='load')
  page.wait_for_timeout(80)
  print('\nMODULE',n,'title:',page.title(),'tabs:',page.locator('#tabNav button').count(),'errors:',errs[:2])
  tabs=page.locator('#tabNav button').all_text_contents()
  for j,label in enumerate(tabs):
   try:
    page.locator('#tabNav button').nth(j).click()
    page.wait_for_timeout(60)
    title=page.locator('#work h2').first.inner_text() if label!='Knowledge Check' else 'QUIZ'
    detail=''
    if label!='Knowledge Check':
     c=page.locator('[data-ctl]').first
     if c.count():
      tag=c.evaluate('(el)=>el.tagName')
      if tag=='SELECT':
       if c.locator('option').count()>1:c.select_option(index=1)
      elif tag=='INPUT':
       minv=float(c.get_attribute('min'));maxv=float(c.get_attribute('max'));step=float(c.get_attribute('step') or '1');
       target=minv+step if minv+step<=maxv else maxv
       c.fill(str(int(target)) if step.is_integer() else str(target));c.dispatch_event('input')
      page.wait_for_timeout(30)
    else:
     for k in range(10):
      page.locator('.quizopt').first.click()
      page.locator('#nextQ').click()
     detail=page.locator('#quizBox').inner_text()[:100]
    print(' ',j,label[:30],'=>',title[:40],detail)
   except Exception as e:
    errs.append(f'{label}: {e}')
    print(' ERROR',label,str(e)[:180])
  if n==5:
   page.locator('#tabNav button').first.click()
  page.screenshot(path=str(root/f'module_{n:02}'/'preview.png'),full_page=True)
  print(' ERROR COUNT',len(errs),'\n',errs[:15]);page.close()
 b.close()