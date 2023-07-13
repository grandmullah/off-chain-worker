const { Keyring, } = require('@polkadot/keyring');
const  { mnemonicGenerate, cryptoIsReady, cryptoWaitReady,naclDecrypt,naclEncrypt,na } = require('@polkadot/util-crypto');
const { stringToU8a, u8aToHex} = require ('@polkadot/util')
const nacl = require('tweetnacl');
// cryptoIsReady()
// const keyring = new Keyring();
// const senderPair = keyring.createFromUri(mnemonicGenerate(), { name: 'first pair' }, 'sr25519');
// const receiverPair = keyring.createFromUri(mnemonicGenerate(), { name: 'second pair' }, 'sr25519');

// const message = stringToU8a('This is a test.');
// const encryptedMessage = senderPair.encryptMessage(message, receiverPair.publicKey);
// const decryptedMessage = receiverPair.decryptMessage(encryptedMessage, senderPair.publicKey);

// const isMatch = u8aToString(message) === u8aToString(decryptedMessage);

// // Verify that the decrypted message matches the original message
// console.log(`Does the decrypted message match the original message? ${isMatch}`);


const jj  = async ()=>{
        await cryptoWaitReady()
        const keyring = new Keyring();
        const senderPair =keyring.createFromUri('erase lucky memory ivory shiver position bleak will scrub unlock quantum direct') 
        const receiverPair = keyring.createFromUri(mnemonicGenerate(), { name: 'second pair' }, 'sr25519');
        senderPair
        const message = 'Hello, World!';
        const nonce = nacl.randomBytes(24);

        const encrypted = nacl.box(Buffer.from(message), nonce, receiverPair.publicKey, senderPair.encodePkcs8().slice(64, 96));
       
        const decrypted = nacl.box.open(encrypted, nonce, senderPair.publicKey, receiverPair.encodePkcs8().slice(64, 96));
        console.log(`Decrypted message: ${(decrypted)}`);



}

jj()