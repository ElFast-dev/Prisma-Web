export const OPERATIONS = ["write","transaction","ownerTransfer","export","restore"];
export function createUpdateGate(clientIds,ownerId){
 const clients=new Map(clientIds.map(id=>[id,{busy:Object.fromEntries(OPERATIONS.map(op=>[op,0])),acknowledged:false}]));
 if(!clients.has(ownerId))throw new Error("El propietario debe ser un cliente registrado.");
 let state="waiting",intakePaused=false,ownerClosed=false,schemaCompatible=false,healthy=false;
 const hasWork=c=>Object.values(c.busy).some(n=>n>0);
 function beginOperation(clientId,op){
  const c=clients.get(clientId);if(!c)throw new Error("Cliente desconocido.");
  if(!OPERATIONS.includes(op))throw new Error("Tipo de operación desconocido.");
  if(intakePaused)return{accepted:false,retry:true};
  c.busy[op]++;return{accepted:true,finish:()=>endOperation(clientId,op)};
 }
 function endOperation(clientId,op){const c=clients.get(clientId);if(!c||!OPERATIONS.includes(op)||c.busy[op]<1)throw new Error("Finalización de operación no válida.");c.busy[op]--;}
 function requestUpdate(){if(state!=="waiting")throw new Error("La actualización ya se prepara.");state="quiescing";intakePaused=true;ownerClosed=false;healthy=false;for(const c of clients.values())c.acknowledged=false;}
 function acknowledge(id){const c=clients.get(id);if(!c)throw new Error("Cliente desconocido.");if(state!=="quiescing"||hasWork(c))return false;c.acknowledged=true;return true;}
 function setSchemaCompatibility(canRead){if(state!=="quiescing")throw new Error("La compatibilidad se declara durante la preparación.");schemaCompatible=Boolean(canRead);}
 function closeOwner(){const owner=clients.get(ownerId);if(state!=="quiescing"||!owner.acknowledged||hasWork(owner))return false;ownerClosed=true;return true;}
 function readyToActivate(){return state==="quiescing"&&schemaCompatible&&ownerClosed&&[...clients.values()].every(c=>c.acknowledged&&!hasWork(c));}
 function activate(){if(!readyToActivate())throw new Error("No se puede activar: hay clientes, operaciones o compatibilidad pendientes.");state="activated";return true;}
 function markHealthy(){if(state!=="activated")throw new Error("La versión nueva aún no está activa.");healthy=true;}
 function mayDeletePreviousCaches(){return state==="activated"&&healthy;}
 function abort(){if(state!=="quiescing")throw new Error("Solo se puede cancelar antes de activar.");state="waiting";intakePaused=false;ownerClosed=false;schemaCompatible=false;for(const c of clients.values())c.acknowledged=false;}
 return{beginOperation,requestUpdate,acknowledge,setSchemaCompatibility,closeOwner,readyToActivate,activate,markHealthy,mayDeletePreviousCaches,abort,snapshot:()=>({state,intakePaused,ownerClosed,schemaCompatible,healthy,clients:Object.fromEntries([...clients.entries()].map(([id,c])=>[id,{busy:{...c.busy},acknowledged:c.acknowledged}]))})};
}
