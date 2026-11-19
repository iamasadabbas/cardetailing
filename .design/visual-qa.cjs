const puppeteer=require('C:/Users/khana/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/puppeteer-core');
const sharp=require('sharp');
(async()=>{
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage();
 const errors=[];page.on('pageerror', e=>errors.push(e.message));
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
  await page.setViewport({width,height,deviceScaleFactor:1});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle0'});
  await page.evaluate(()=>document.fonts.ready);
  await new Promise(r=>setTimeout(r,2000));
  await page.screenshot({path:'.design/'+name+'-hero.png'});
  await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
  const total=await page.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<total;y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await new Promise(r=>setTimeout(r,150));}
  await new Promise(r=>setTimeout(r,1600));
  await page.evaluate(()=>window.scrollTo(0,0));
  await new Promise(r=>setTimeout(r,800));
  await page.screenshot({path:'.design/'+name+'-full.png',fullPage:true});
  await sharp('.design/'+name+'-full.png').resize({width:name==='desktop'?900:390}).png().toFile('.design/'+name+'-overview.png');
  console.log(name,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,images:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)})));
 }
 console.log('Runtime errors:',errors);await browser.close();
})();
