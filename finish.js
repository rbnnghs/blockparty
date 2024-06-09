
const xrpl = require('xrpl')
const { Client, Wallet } = xrpl

async function main () {
	const client = new Client('wss://s.altnet.rippletest.net:51233')
	await client.connect()

	const wallet = Wallet.fromSecret("sEd7QY4P5x4oHyXMX8eYvPp49fMERAX")

	// from the result of completing the task
	const info = {
	  fulfillment: 'A022802037902991EBEF272A9BE1E600452AE4D1F8F480A722D32F507D99843EDCA15411',
	  sequence: 1354084
	}

	// The person who submitted the job
	const rec = {
	  wallet_address: 'rD1pL1Kkg35WLCyWFwN9xhdBizn3Mk16vC',
	  condition: 'A0258020F7736861FADD4DB1B43493C2AD4AC21693E93F9C5BDB87C4A17AAECE38093564810120',
	}

	const prepared = await client.autofill({
		"TransactionType": "EscrowFinish",
		"Account": wallet.address,
		"Owner": rec.wallet_address,
		"OfferSequence": info.sequence,
		"Condition": rec.condition,
		"Fulfillment": info.fulfillment
	})

	console.log("bi")

	const signed = wallet.sign(prepared)
	const tx = await client.submitAndWait(signed.tx_blob)

	console.log(tx, tx.result)


	await client.disconnect()
}

main()
