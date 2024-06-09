
const cc = require('five-bells-condition')
import crypto from "crypto"

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


export function getConditionAndFulfillment() {
  const preimageData = crypto.randomBytes(32)
  const fulfillment = new cc.PreimageSha256()
  fulfillment.setPreimage(preimageData)

  const condition = fulfillment.getConditionBinary().toString('hex').toUpperCase()
  console.log('Condition:', condition)
 
  const fulfillment_hex = fulfillment.serializeBinary().toString('hex').toUpperCase()
  console.log('Fulfillment:', fulfillment_hex)

  return [condition, fulfillment_hex]
}