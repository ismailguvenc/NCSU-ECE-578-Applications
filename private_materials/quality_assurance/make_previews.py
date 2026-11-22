from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
root=Path('/mnt/data/ECE578_Learning_Lab')
def inline(path):
 s=BeautifulSoup(path.read_text(),'html.parser')
 for t in s.select('link[rel="stylesheet"]'):t.replace_with(s.new_tag('style',string=(path.parent/t['href']).read_text()))
 for t in s.select('script[src]'):t.replace_with(s.new_tag('script',string=(path.parent/t['src']).read_text()))
 return str(s)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 for n,tab in [(5,'cyclic'),(6,'detect'),(7,'estimators'),(8,'pdcch')]:
  pg=b.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
  pg.set_content(inline(root/f'module_{n:02}/index.html'));pg.locator(f'[data-id="{tab}"]').click();pg.wait_for_timeout(65)
  pg.screenshot(path=str(root/f'module_{n:02}/preview.png'),full_page=True)
  print(n,tab,'image:',(root/f'module_{n:02}/preview.png').stat().st_size)
  pg.close()
 b.close()