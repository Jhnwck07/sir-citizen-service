import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

type Progress = { stage: string; data: Record<string, unknown>; updatedAt: string }
const sessions = new Map<string, Progress>()
const resident = { name: 'Ananya Rao', relativeName: 'Meera Rao', age: 31, relation: 'Daughter', state: 'Karnataka', district: 'Bengaluru Urban', assembly: 'Shivajinagar', part: '148', serial: '562', address: '17, 3rd Cross, Indiranagar, Bengaluru – 560038' }

app.get('/api/health', (_req, res) => res.json({ ok: true, mode: 'synthetic-demo' }))
app.post('/api/auth/request-otp', (_req, res) => res.json({ message: 'OTP sent (demo)', demoOtp: '123456' }))
app.post('/api/auth/verify-otp', (req, res) => {
  if (req.body.otp !== '123456') return res.status(400).json({ message: 'Incorrect OTP. Use 123456 in this demo.' })
  const token = 'demo-session-ananya'
  if (!sessions.has(token)) sessions.set(token, { stage: 'preparation', data: {}, updatedAt: new Date().toISOString() })
  res.json({ token, citizen: { name: 'Ananya Rao', mobile: req.body.mobile } })
})
app.get('/api/sir/lookup', (_req, res) => res.json({ record: resident, disclaimer: 'Synthetic previous-SIR-style record for hackathon demonstration only.' }))
app.get('/api/progress/:token', (req, res) => res.json(sessions.get(req.params.token) ?? { stage: 'preparation', data: {}, updatedAt: null }))
app.put('/api/progress/:token', (req, res) => {
  const progress: Progress = { stage: req.body.stage, data: req.body.data ?? {}, updatedAt: new Date().toISOString() }
  sessions.set(req.params.token, progress)
  res.json(progress)
})
app.post('/api/esign', (_req, res) => res.json({ status: 'signed', reference: 'ESIGN-DEMO-2026-00821' }))
app.post('/api/submit', (req, res) => res.json({ acknowledgement: 'SIR-DEMO-2026-00821', submittedAt: new Date().toISOString(), declaration: req.body.declaration }))
app.get('/api/acknowledgement.pdf', (_req, res) => {
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 184 >>
stream
BT
/F1 20 Tf
72 720 Td
(SIR 2026 Prototype Acknowledgement) Tj
/F1 12 Tf
0 -42 Td
(Acknowledgement No: SIR-DEMO-2026-00821) Tj
0 -24 Td
(Status: Submitted - simulated) Tj
0 -24 Td
(This document contains synthetic demonstration data only.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000241 00000 n 
0000000311 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
546
%%EOF`
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="SIR-DEMO-2026-00821.pdf"')
  res.send(Buffer.from(pdf, 'utf8'))
})

const PORT = Number(process.env.PORT) || 3001

app.listen(PORT, () => console.log(`Synthetic SIR API listening on port ${PORT}`))
