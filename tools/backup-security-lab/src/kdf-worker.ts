import { argon2id } from "hash-wasm";
import sodium from "libsodium-wrappers-sumo";

const MEMORY_KIB=19_456, ITERATIONS=2, PARALLELISM=1, KEY_BYTES=32;
type RunMessage={type:"run";password:Uint8Array;rounds:number};

function equalBytes(a:Uint8Array,b:Uint8Array){if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0;}
async function derive(password:Uint8Array,salt:Uint8Array){return await argon2id({password,salt,parallelism:PARALLELISM,iterations:ITERATIONS,memorySize:MEMORY_KIB,hashLength:KEY_BYTES,outputType:"binary"}) as Uint8Array;}

self.addEventListener("message",async(event:MessageEvent<RunMessage>)=>{
 if(event.data?.type!=="run")return;
 try{
  await sodium.ready;
  const results:Array<Record<string,number|boolean>>=[];
  let finalKey:Uint8Array|null=null,finalSalt:Uint8Array|null=null;
  for(let i=0;i<event.data.rounds;i++){
   const salt=crypto.getRandomValues(new Uint8Array(16));
   let wasmKey!:Uint8Array,sodiumKey!:Uint8Array,wasmMs=0,sodiumMs=0;
   const runWasm=async()=>{const t=performance.now();wasmKey=await derive(event.data.password,salt);wasmMs=performance.now()-t;};
   const runSodium=async()=>{const t=performance.now();sodiumKey=sodium.crypto_pwhash(KEY_BYTES,event.data.password,salt,ITERATIONS,MEMORY_KIB*1024,sodium.crypto_pwhash_ALG_ARGON2ID13);sodiumMs=performance.now()-t;};
   if(i%2===0){await runWasm();await runSodium();}else{await runSodium();await runWasm();}
   const matched=equalBytes(wasmKey,sodiumKey);
   results.push({round:i+1,hashWasmMs:Number(wasmMs.toFixed(2)),libsodiumMs:Number(sodiumMs.toFixed(2)),keysMatch:matched});
   if(!matched)throw new Error("Las dos bibliotecas no derivaron la misma clave para la misma entrada.");
   finalKey=new Uint8Array(wasmKey);finalSalt=new Uint8Array(salt);
   sodium.memzero(wasmKey);sodium.memzero(sodiumKey);
  }
  if(!finalKey||!finalSalt)throw new Error("No se generó una clave de prueba.");
  const wrongPassword=new TextEncoder().encode("PRISMA-LAB-WRONG-PASSWORD-NOT-A-REAL-SECRET");
  const wrongPasswordKey=new Uint8Array(await derive(wrongPassword,finalSalt));wrongPassword.fill(0);
  const keyCopy=new Uint8Array(finalKey),wrongCopy=new Uint8Array(wrongPasswordKey),saltCopy=new Uint8Array(finalSalt);
  (self as unknown as Worker).postMessage({type:"done",results,key:keyCopy.buffer,wrongPasswordKey:wrongCopy.buffer,salt:saltCopy.buffer,sodiumVersion:sodium.SODIUM_VERSION_STRING,params:{memoryKiB:MEMORY_KIB,iterations:ITERATIONS,parallelism:PARALLELISM,keyBytes:KEY_BYTES}},[keyCopy.buffer,wrongCopy.buffer,saltCopy.buffer]);
  finalKey.fill(0);finalSalt.fill(0);wrongPasswordKey.fill(0);
 }catch(error){(self as unknown as Worker).postMessage({type:"error",message:error instanceof Error?error.message:String(error)});}
});