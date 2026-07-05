const { Client, LocalAuth } = require('whatsapp-web.js');

let client
let ready = false

async function getClient() {
  if (client && ready) return client
  client = new Client({ authStrategy: new LocalAuth() })
  client.on('qr', (qr) => console.log('WhatsApp QR (scan with mobile app):\n', qr))
  client.on('ready', () => { ready = true; console.log('WhatsApp client ready') })
  client.on('auth_failure', (m) => console.error('WhatsApp auth failure:', m))
  client.on('disconnected', () => { ready = false })
  await client.initialize()
  return new Promise((resolve) => {
    const check = () => (ready ? resolve(client) : setTimeout(check, 500))
    check()
  })
}

exports.sendWhatsApp = async ({ to, body }) => {
  try {
    const c = await getClient()
    const chatId = `${to.replace(/[^+\d]/g, '')}@c.us`
    await c.sendMessage(chatId, body)
  } catch (err) {
    console.warn('WhatsApp send failed:', err.message)
  }
}
