const Visit = require('../models/Visit');

exports.track = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown'
    const today = new Date().toISOString().slice(0, 10)
    let record = await Visit.findOne({ date: today })
    if (!record) {
      record = await Visit.create({ date: today, count: 1, ips: [ip] })
    } else if (!record.ips.includes(ip)) {
      record.ips.push(ip)
      record.count += 1
      await record.save()
    }
    res.json({ success: true })
  } catch {
    res.json({ success: true })
  }
}

exports.stats = async (req, res) => {
  try {
    const all = await Visit.find().sort({ date: -1 }).lean()
    const totalVisits = all.reduce((s, d) => s + d.count, 0)
    const today = new Date().toISOString().slice(0, 10)
    const todayVisits = all.find(d => d.date === today)?.count || 0
    const last7 = all.slice(0, 7)
    const weekVisits = last7.reduce((s, d) => s + d.count, 0)
    res.json({ success: true, data: { totalVisits, todayVisits, weekVisits, daily: all.slice(0, 30) } })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to load stats' })
  }
}
