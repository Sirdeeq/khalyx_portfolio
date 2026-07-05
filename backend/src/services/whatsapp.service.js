let client
let ready = false

async function getClient() {
  if (client && ready) return client
  let Client, LocalAuth
  try {
    const mod = require('whatsapp-web.js')
    Client = mod.Client
    LocalAuth = mod.LocalAuth
  } catch {
    console.warn('whatsapp-web.js not installed — WhatsApp notifications disabled')
    return null
  }
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
    if (!c) return
    const chatId = `${to.replace(/[^+\d]/g, '')}@c.us`
    await c.sendMessage(chatId, body)
  } catch (err) {
    console.warn('WhatsApp send failed:', err.message)
  }
}
