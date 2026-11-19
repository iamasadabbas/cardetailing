const puppeteer=require('C:/Users/khana/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/puppeteer-core');
const assert=require('node:assert/strict');
const fs=require('fs');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage(); const runtime=[]; const results=[];
 page.on('pageerror',e=>runtime.push(e.message));
 page.on('console',m=>{if(m.type()==='error')runtime.push(m.text());});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.setViewport({width:1440,height:1000});
 assert.equal((await page.goto('http://localhost:3000',{waitUntil:'networkidle0'})).status(),200);
 await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
 async function click(selector){await page.$eval(selector,e=>e.scrollIntoView({block:'center',behavior:'instant'}));await wait(150);await page.click(selector);await wait(180);}
 const serviceValues=['paint-correction','ceramic-coating','exterior-detailing','interior-deep-cleaning'];
 for(let i=0;i<4;i++){await click('.service-story-'+i+' .service-copy a');assert.equal(await page.$eval('#f-service',el=>el.value),serviceValues[i]);}
 results.push('All four service links preselect the correct inquiry service.');
 for(const [i,value] of ['essential-package','signature-package','complete-care'].entries()){await click('.package-story:nth-child('+(i+1)+') a');assert.equal(await page.$eval('#f-service',el=>el.value),value);}
 results.push('All three package links preselect the correct inquiry package.');
 await click('#gallery .gallery-tile:first-child button');
 assert(await page.$('[role="dialog"][aria-label="Image viewer"]'));
 assert.equal(await page.evaluate(()=>document.documentElement.style.overflow),'hidden');
 await page.keyboard.press('ArrowRight');await wait(700);
 assert.match(await page.$eval('[role="dialog"] figcaption',e=>e.textContent),/Ferrari/);
 await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');await wait(700);
 assert.match(await page.$eval('[role="dialog"] figcaption',e=>e.textContent),/profile/);
 await click('button[aria-label="Next image"]');
 await click('button[aria-label="Previous image"]');
 await page.keyboard.press('Escape');await wait(700);
 assert.equal(await page.$('[role="dialog"][aria-label="Image viewer"]'),null);
 assert.equal(await page.evaluate(()=>document.activeElement.closest('.gallery-tile')!==null),true);
 results.push('Gallery opens, cycles with buttons and keyboard, wraps, locks scrolling, closes with Escape, and restores focus.');
 await click('#faq li:nth-child(2) button');
 assert.equal(await page.$eval('#faq li:nth-child(2) button',e=>e.getAttribute('aria-expanded')),'true');
 assert.equal(await page.$eval('#faq li:first-child button',e=>e.getAttribute('aria-expanded')),'false');
 results.push('FAQ accordion updates its visible panel and accessible expanded state.');
 await click('#contact button[type="submit"]');
 assert.equal(await page.$eval('[name="fullName"]',e=>e.getAttribute('aria-invalid')),'true');
 assert.equal(await page.evaluate(()=>document.activeElement.name),'fullName');
 for(const [name,value] of Object.entries({fullName:'Design QA',email:'qa@example.com',vehicleMake:'Porsche',vehicleModel:'911 Carrera'})){await page.type('[name="'+name+'"]',value);}
 await page.select('#f-service','paint-correction');await click('#contact button[type="submit"]');
 await page.waitForSelector('[role="status"]');
 assert.match(await page.$eval('[role="status"]',e=>e.textContent),/Demo Form Completed/);
 assert.match(await page.$eval('[role="status"]',e=>e.textContent),/No message has been sent/);
 await click('[role="status"] button');
 await page.waitForSelector('[name="fullName"]');
 assert.equal(await page.$eval('[name="fullName"]',e=>e.value),'');
 results.push('Form rejects missing fields, focuses the first error, completes a valid demo inquiry, and resets.');
 await page.setViewport({width:390,height:844});
 await click('button[aria-label="Open menu"]');
 assert.equal(await page.$eval('button[aria-label="Close menu"]',e=>e.getAttribute('aria-expanded')),'true');
 assert.equal(await page.evaluate(()=>document.documentElement.style.overflow),'hidden');
 await page.keyboard.press('Escape');await wait(700);
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Open menu');
 await click('button[aria-label="Open menu"]');await click('#mobile-menu a[href="#services"]');
 await page.waitForSelector('#mobile-menu',{hidden:true});
 assert.equal(await page.$('#mobile-menu'),null);
 assert.equal(await page.evaluate(()=>document.documentElement.style.overflow),'');
 results.push('Mobile menu opens, locks scrolling, closes with Escape and restores focus, and closes after navigation.');
 const widths=[360,390,768,1024,1440,1920];
 for(const width of widths){await page.setViewport({width,height:900});await wait(700);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,'Overflow at '+width);}
 results.push('No horizontal overflow at '+widths.join(', ')+'px.');
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href'))),[]);
 results.push('Every internal navigation and CTA anchor points to an existing target.');
 await page.setJavaScriptEnabled(false);await page.reload({waitUntil:'networkidle0'});
 assert.equal(await page.$eval('#services-title',e=>getComputedStyle(e).opacity),'1');
 results.push('Core page content stays visible with JavaScript disabled.');
 assert.deepEqual(runtime,[]);results.push('No browser runtime errors.');
 fs.writeFileSync('.design/functional-results.json',JSON.stringify({date:'2026-11-19',browser:'Chrome',results},null,2));
 console.log(results.join('\n'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});


