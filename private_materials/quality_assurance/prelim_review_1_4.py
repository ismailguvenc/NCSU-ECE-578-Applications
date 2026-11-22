from pathlib import Path
from playwright.sync_api import sync_playwright
from test_lab import inline
base=Path('/mnt/data/ECE578_Learning_Lab')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for n in [1,2,3,4]:
  path=base/f'module_{n:02}'/'index.html'
  pg=b.new_page(viewport={'width':1450,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  try:pg.set_content(inline(path),wait_until='load',timeout=20000);pg.wait_for_timeout(80)
  except Exception as e:errs.append('LOAD: '+str(e))
  tabs=pg.locator('.tab[data-tab]').all_text_contents();print('Module',n,'tabs',len(tabs),'initial-errors:',errs[:2])
  for i in range(len(tabs)):
   try:
    pg.locator('.tab[data-tab]').nth(i).click();pg.wait_for_timeout(30)
    idv=pg.locator('.tab[data-tab]').nth(i).get_attribute('data-tab')
    vis=pg.locator('#'+idv).evaluate('(e)=>getComputedStyle(e).display');assert vis!='none'
    inputs=pg.locator('#'+idv+' input[type=range]')
    if inputs.count():
     z=inputs.first;minimum=z.get_attribute('min');maximum=z.get_attribute('max');
     val=str((float(minimum)+float(maximum))/2)
     z.evaluate('(el)=> {el.value=el.min;el.dispatchEvent(new Event("input",{bubbles:true}));}')
    selects=pg.locator('#'+idv+' select')
    if selects.count() and selects.first.locator('option').count()>1:selects.first.select_option(index=1)
    pg.wait_for_timeout(30)
   except Exception as e:errs.append('tab '+str(i)+': '+str(e)[:180])
  print('  Tabs exercised, error count:',len(errs),'first errors:',errs[:3])
  pg.close()
 b.close()