type KdfResult={type:"done";results:Array<{round:number;hashWasmMs:number;libsodiumMs:number;keysMatch:boolean}>;key:ArrayBuffer;wrongPasswordKey:ArrayBuffer;salt:ArrayBuffer;sodiumVersion:string;params:{memoryKiB:number;iterations:number;parallelism:number;keyBytes:number}};
const runButton=document.querySelector<HTMLButtonElement>("#run")!,downloadButton=document.querySelector<HTMLButtonElement>("#download")!,statusEl=document.querySelector<HTMLDivElement>("#status")!,resultsEl=document.querySelector<HTMLDivElement>("#results")!,deviceInfo=document.querySelector<HTMLDListElement>("#device-info")!;
let report:Record<string,unknown>|null=null;
function addInfo(label:string,value:string){const dt=document.createElement("dt"),dd=document.createElement("dd");dt.textContent=label;dd.textContent=value;deviceInfo.append(dt,dd);}
function heapSnapshot(){const m=(performance as Performance&{memory?:{usedJSHeapSize:number;totalJSHeapSize:number;jsHeapSizeLimit:number}}).memory;return m?{usedJSHeapSize:m.usedJSHeapSize,totalJSHeapSize:m.totalJSHeapSize,jsHeapSizeLimit:m.jsHeapSizeLimit}:null;}
function bytesEqual(a:Uint8Array,b:Uint8Array){if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0;}
function concat(parts:Uint8Array[]){const out=new Uint8Array(parts.reduce((n,p)=>n+p.length,0));let pos=0;for(const p of parts){out.set(p,pos);pos+=p.length;}return out;}
function u32be(n:number){const out=new Uint8Array(4);new DataView(out.buffer).setUint32(0,n,false);return out;}
function base64(bytes:Uint8Array){let s="";for(let i=0;i<bytes.length;i+=32768)s+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(s);}
function fromBase64(s:string){const b=atob(s),out=new Uint8Array(b.length);for(let i=0;i<b.length;i++)out[i]=b.charCodeAt(i);return out;}
function makeAad(header:Uint8Array){return concat([new TextEncoder().encode("PRSM"),u32be(header.length),header]);}

async function createLabEnvelope(payload:Uint8Array,keyBytes:Uint8Array,salt:Uint8Array){
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const header={version:1,payloadFormat:"prisma-lab-json-v1",kdf:"Argon2id13",memoryKiB:19456,iterations:2,parallelism:1,salt:base64(salt),cipher:"AES-256-GCM",iv:base64(iv),tagLength:128,label:"prisma-lab-v1"};
 const headerBytes=new TextEncoder().encode(JSON.stringify(header)),aad=makeAad(headerBytes);
 const key=await crypto.subtle.importKey("raw",keyBytes,{name:"AES-GCM"},false,["encrypt","decrypt"]);
 const t=performance.now(),ciphertext=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv,additionalData:aad,tagLength:128},key,payload)),encryptMs=performance.now()-t;
 return{envelope:concat([aad,ciphertext]),header,aad,iv,key,ciphertext,encryptMs};
}
function parseLabEnvelope(file:Uint8Array){
 if(file.length<24)throw new Error("Archivo truncado o demasiado corto.");
 if(new TextDecoder().decode(file.subarray(0,4))!=="PRSM")throw new Error("Identificador de archivo no reconocido.");
 const headerLength=new DataView(file.buffer,file.byteOffset,file.byteLength).getUint32(4,false);
 if(headerLength<2||headerLength>4096||file.length<8+headerLength+16)throw new Error("Longitud de cabecera o archivo no válida.");
 const headerBytes=file.slice(8,8+headerLength);let header:any;
 try{header=JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(headerBytes));}catch{throw new Error("Cabecera dañada.");}
 if(header.version!==1)throw new Error("Versión de archivo no compatible.");
 if(header.payloadFormat!=="prisma-lab-json-v1"||header.kdf!=="Argon2id13"||header.cipher!=="AES-256-GCM")throw new Error("Algoritmo o formato no permitido.");
 if(header.memoryKiB!==19456||header.iterations!==2||header.parallelism!==1||header.tagLength!==128||header.label!=="prisma-lab-v1")throw new Error("Parámetros KDF/cifrado fuera de la lista permitida.");
 const salt=fromBase64(header.salt),iv=fromBase64(header.iv);
 if(salt.length!==16||iv.length!==12)throw new Error("Salt o nonce de longitud incorrecta.");
 return{header,aad:file.slice(0,8+headerLength),iv,ciphertext:file.slice(8+headerLength)};
}
async function decryptLabEnvelope(file:Uint8Array,keyBytes:Uint8Array){
 const parsed=parseLabEnvelope(file),key=await crypto.subtle.importKey("raw",keyBytes,{name:"AES-GCM"},false,["decrypt"]);
 const plain=await crypto.subtle.decrypt({name:"AES-GCM",iv:parsed.iv,additionalData:parsed.aad,tagLength:128},key,parsed.ciphertext);
 return new Uint8Array(plain);
}
function randomBytes(length:number){const out=new Uint8Array(length);for(let i=0;i<length;i+=65536)crypto.getRandomValues(out.subarray(i,Math.min(i+65536,length)));return out;}
async function measureLargeAes(keyBytes:Uint8Array){
 const key=await crypto.subtle.importKey("raw",keyBytes,{name:"AES-GCM"},false,["encrypt","decrypt"]),iv=crypto.getRandomValues(new Uint8Array(12)),aad=new TextEncoder().encode("PRISMA-LAB-LARGE-PAYLOAD-HEADER-V1"),payload=randomBytes(4*1024*1024);
 const a=performance.now(),cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv,additionalData:aad,tagLength:128},key,payload)),encryptMs=performance.now()-a;
 const b=performance.now(),plain=new Uint8Array(await crypto.subtle.decrypt({name:"AES-GCM",iv,additionalData:aad,tagLength:128},key,cipher)),decryptMs=performance.now()-b;
 return{payloadBytes:payload.length,cipherBytes:cipher.length,encryptMs:Number(encryptMs.toFixed(2)),decryptMs:Number(decryptMs.toFixed(2)),roundTrip:bytesEqual(payload,plain)};
}
async function testEnvelope(keyBytes:Uint8Array,wrongKey:Uint8Array,salt:Uint8Array){
 const model={format:"prisma-lab-json-v1",films:Array.from({length:240},(_,i)=>({id:"synthetic-"+(i+1),title:"Película sintética "+(i+1),year:1950+(i%77),viewings:[{id:"view-"+(i+1)+"-1",rating:(i%10)+1}]}))};
 const plaintext=new TextEncoder().encode(JSON.stringify(model)),created=await createLabEnvelope(plaintext,keyBytes,salt),tests:Record<string,boolean>={};
 const t=performance.now(),valid=await decryptLabEnvelope(created.envelope,keyBytes),decryptMs=performance.now()-t;tests.validRoundTrip=bytesEqual(valid,plaintext);
 try{await decryptLabEnvelope(created.envelope,wrongKey);tests.wrongPasswordRejected=false;}catch{tests.wrongPasswordRejected=true;}
 const badCipher=created.envelope.slice();badCipher[badCipher.length-1]^=1;
 try{await decryptLabEnvelope(badCipher,keyBytes);tests.tamperedCipherRejected=false;}catch{tests.tamperedCipherRejected=true;}
 const parsed=parseLabEnvelope(created.envelope),alteredHeader={...parsed.header,label:"prisma-lab-v0"},alteredHeaderBytes=new TextEncoder().encode(JSON.stringify(alteredHeader)),alteredAad=makeAad(alteredHeaderBytes),aesKey=await crypto.subtle.importKey("raw",keyBytes,{name:"AES-GCM"},false,["decrypt"]);
 try{await crypto.subtle.decrypt({name:"AES-GCM",iv:parsed.iv,additionalData:alteredAad,tagLength:128},aesKey,created.ciphertext);tests.alteredHeaderAadRejected=false;}catch{tests.alteredHeaderAadRejected=true;}
 try{await decryptLabEnvelope(created.envelope.slice(0,created.envelope.length-8),keyBytes);tests.truncatedFileRejected=false;}catch{tests.truncatedFileRejected=true;}
 const badVersion={...parsed.header,version:999},badHeaderBytes=new TextEncoder().encode(JSON.stringify(badVersion)),badVersionFile=concat([new TextEncoder().encode("PRSM"),u32be(badHeaderBytes.length),badHeaderBytes,created.ciphertext]);
 try{parseLabEnvelope(badVersionFile);tests.incompatibleVersionRejected=false;}catch{tests.incompatibleVersionRejected=true;}
 const originalState="CURRENT-DIARY-SNAPSHOT-DO-NOT-REPLACE";let liveState=originalState;
 try{const bytes=await decryptLabEnvelope(created.envelope,keyBytes),decoded=JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(bytes));if(decoded.format!=="prisma-lab-json-v1"||!Array.isArray(decoded.films)||decoded.films.length!==240)throw new Error("Estructura inválida.");liveState="RESTORED-SYNTHETIC-DATA";}catch{}
 tests.validRestoreReplacesAfterValidation=liveState==="RESTORED-SYNTHETIC-DATA";
 const previous=liveState;try{const bytes=await decryptLabEnvelope(badCipher,keyBytes);JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(bytes));liveState="SHOULD-NOT-HAPPEN";}catch{}
 tests.failedRestoreLeavesCurrentStateUnchanged=liveState===previous;
 const beforeWrong=liveState;try{const bytes=await decryptLabEnvelope(created.envelope,wrongKey);JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(bytes));liveState="SHOULD-NOT-HAPPEN";}catch{}
 tests.wrongPasswordRestoreLeavesCurrentStateUnchanged=liveState===beforeWrong;
 return{encryptMs:Number(created.encryptMs.toFixed(2)),decryptMs:Number(decryptMs.toFixed(2)),plaintextBytes:plaintext.length,envelopeBytes:created.envelope.length,tests,allPassed:Object.values(tests).every(Boolean)};
}
function render(data:any){
 resultsEl.replaceChildren();
 const block=(title:string,detail:string,ok?:boolean)=>{const div=document.createElement("div");div.className="metric";const strong=document.createElement("strong"),p=document.createElement("p");strong.textContent=title;p.textContent=detail;if(ok!==undefined){p.className=ok?"ok":"bad";p.textContent=(ok?"CORRECTO · ":"FALLÓ · ")+detail;}div.append(strong,p);resultsEl.append(div);};
 block("Argon2id · hash-wasm",data.kdf.results.map((r:any)=>r.hashWasmMs+" ms").join(" · "));
 block("Argon2id · libsodium",data.kdf.results.map((r:any)=>r.libsodiumMs+" ms").join(" · "));
 block("Coincidencia de claves","Misma contraseña y sal derivan la misma clave.",data.kdf.results.every((r:any)=>r.keysMatch));
 for(const [name,value]of Object.entries(data.envelope.tests))block(name,String(value),Boolean(value));
 block("Todas las pruebas del archivo","Validez, alteración, truncamiento y restauración simulada.",data.envelope.allPassed);
 block("AES-GCM · archivo sintético",data.envelope.plaintextBytes+" bytes · cifrado "+data.envelope.encryptMs+" ms · descifrado "+data.envelope.decryptMs+" ms");
 block("AES-GCM · bloque de 4 MiB","Cifrado "+data.largeAes.encryptMs+" ms · descifrado "+data.largeAes.decryptMs+" ms.",data.largeAes.roundTrip);
}
function runWorker(password:Uint8Array):Promise<KdfResult>{
 return new Promise((resolve,reject)=>{
  const worker=new Worker(new URL("./kdf-worker.ts",import.meta.url),{type:"module"}),timeout=window.setTimeout(()=>{worker.terminate();reject(new Error("El Worker dejó de responder."));},180000);
  worker.onmessage=(event:MessageEvent<any>)=>{const d=event.data;if(d.type==="error"){clearTimeout(timeout);worker.terminate();reject(new Error(d.message));}if(d.type==="done"){clearTimeout(timeout);worker.terminate();resolve(d as KdfResult);}};
  worker.onerror=e=>{clearTimeout(timeout);worker.terminate();reject(new Error(e.message||"Error del Worker."));};
  worker.postMessage({type:"run",password,rounds:3});
 });
}
runButton.addEventListener("click",async()=>{
 runButton.disabled=true;downloadButton.disabled=true;resultsEl.replaceChildren();statusEl.textContent="Preparando prueba con datos sintéticos…";
 const started=performance.now(),heapBefore=heapSnapshot();let key:Uint8Array|null=null,wrongKey:Uint8Array|null=null;
 try{
  if(!window.isSecureContext||!crypto.subtle)throw new Error("Se necesita contexto seguro y Web Crypto. Usa localhost o HTTPS.");
  const password=new TextEncoder().encode("PRISMA-LAB-ONLY-NOT-A-REAL-PASSWORD-2026");
  statusEl.textContent="Derivando tres claves por biblioteca en un Worker…";
  const kdf=await runWorker(password);key=new Uint8Array(kdf.key);wrongKey=new Uint8Array(kdf.wrongPasswordKey);const salt=new Uint8Array(kdf.salt);
  statusEl.textContent="Midiendo AES-GCM y validando el archivo sintético…";
  const envelope=await testEnvelope(key,wrongKey,salt),largeAes=await measureLargeAes(key),heapAfter=heapSnapshot();
  report={reportType:"prisma-backup-security-lab-v1",timestamp:new Date().toISOString(),userAgent:navigator.userAgent,isSecureContext:window.isSecureContext,cryptoSubtleAvailable:Boolean(crypto.subtle),deviceMemoryReportedGiB:(navigator as Navigator&{deviceMemory?:number}).deviceMemory??null,heapBefore,heapAfter,elapsedMs:Number((performance.now()-started).toFixed(2)),kdf:{libraryVersions:{hashWasm:"4.13.0",libsodiumWrappersSumo:"0.8.4",libsodium:kdf.sodiumVersion},params:kdf.params,results:kdf.results,allKeysMatch:kdf.results.every(r=>r.keysMatch)},envelope,largeAes,notes:["Solo se usaron contraseña, sal y datos sintéticos.","performance.memory solo aproxima heap JavaScript; no mide toda la memoria WASM ni la RAM libre.","La restauración es una simulación en memoria; no prueba SQLite/OPFS, cuota real ni interrupción del proceso.","El formato PRSM es experimental y no está aprobado ni es compatible con Prisma."]};
  render(report);statusEl.textContent="Pruebas terminadas. Guarda el JSON; no contiene contraseña ni claves.";downloadButton.disabled=false;
 }catch(error){statusEl.textContent="La prueba no terminó: "+(error instanceof Error?error.message:String(error))+". No se declara aprobado ningún resultado.";}
 finally{key?.fill(0);wrongKey?.fill(0);runButton.disabled=false;}
});
downloadButton.addEventListener("click",()=>{if(!report)return;const blob=new Blob([JSON.stringify(report,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="prisma-backup-security-lab-"+new Date().toISOString().replaceAll(":","-")+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
addInfo("Origen",location.origin);addInfo("Contexto seguro",String(window.isSecureContext));addInfo("Web Crypto",String(Boolean(crypto.subtle)));addInfo("User-Agent",navigator.userAgent+" (no deducir Android de este texto)");addInfo("Memoria reportada",(navigator as Navigator&{deviceMemory?:number}).deviceMemory?((navigator as Navigator&{deviceMemory?:number}).deviceMemory+" GiB aprox."):"No disponible");addInfo("Heap JavaScript",heapSnapshot()?"Disponible; no mide toda la memoria":"No expuesto por Brave");
