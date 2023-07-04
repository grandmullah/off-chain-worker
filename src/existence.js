
const {ApiPromise, WsProvider} = require('@polkadot/api')
// Import
const { Keyring } = require('@polkadot/keyring');


const exist =async(req,res) =>{
    const{id}=req.query
 try {
    const wsProvider = new WsProvider('ws://35.232.24.147:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const key = new Keyring({ type: 'sr25519' })
    const j = key.createFromUri('erase lucky memory ivory shiver position bleak will scrub unlock quantum direct')
    console.log( j.address)
    const bal = await api.query.system.account(j.address)
    console.log((bal.data.free).toString())
  
    const unsub = await api.tx.balances
    .transfer(id, 1234500000)
    .signAndSend(j, (result) => {
      console.log(`Current status is ${result.status}`);
  
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isFinalized) {
        console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
        unsub();
      }
    });
    res.sendStatus(200)
 } catch (error) {
    console.log(error)
    res.sendStatus(400)
 }
}

module.exports ={
    exist
} 