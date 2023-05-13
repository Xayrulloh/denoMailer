import express from "https://esm.sh/express@4.18.2"
import cors from "https://esm.sh/cors@2.8.5"

import { mensshirtClient, nemomensshirtClient } from "./config/config.js"
import { IsExist } from "./helper/input-check.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors())

const PORT = Deno.env.get("PORT") || 5000

app.post("/mensshirt/sendEmail", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { username, phone, message } = req.body

  await mensshirtClient.send({
    to: Deno.env.get("MENSSHIRT_USERNAME"),
    from: Deno.env.get("MENSSHIRT_USERNAME"),
    subject: "Mens Shirt",
    content: `Ismi: ${username}\nTelefon raqami: ${phone}\nSms: ${message}\n`,
  })

  res.json({ status: 200, message: "OK" })
})

app.post("/nemomensshirt/sendEmail", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { username, phone, message } = req.body

  await nemomensshirtClient.send({
    to: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    from: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    subject: "Nemomens Shirt",
    content: `Ismi: ${username}\nTelefon raqami: ${phone}\nSms: ${message}\n`,
  })

  res.json({ status: 200, message: "OK" })
})

app.post("/mensshirt/sendPhone", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { username, phone } = req.body

  await mensshirtClient.send({
    to: Deno.env.get("MENSSHIRT_USERNAME"),
    from: Deno.env.get("MENSSHIRT_USERNAME"),
    subject: "Mens Shirt",
    content: `Ismi: ${username}\nTelefon raqami: ${phone}`,
  })

  res.json({ status: 200, message: "OK" })
})

app.post("/nemomensshirt/sendPhone", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { username, phone } = req.body

  await nemomensshirtClient.send({
    to: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    from: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    subject: "Nemomens Shirt",
    content: `Ismi: ${username}\nTelefon raqami: ${phone}`,
  })

  res.json({ status: 200, message: "OK" })
})

app.post("/mensshirt/sendMessage", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { message, phone } = req.body

  await mensshirtClient.send({
    to: Deno.env.get("MENSSHIRT_USERNAME"),
    from: Deno.env.get("MENSSHIRT_USERNAME"),
    subject: "Mens Shirt",
    content: `Message: ${message}\nTelefon raqami: ${phone}`,
  })

  res.json({ status: 200, message: "OK" })
})

app.post("/nemomensshirt/sendMessage", async (req, res) => {
  const checkBody = IsExist(req.body)

  if (!checkBody) {
    res.json({ status: 200, message: "OK" })
    return
  }

  const { message, phone } = req.body

  await nemomensshirtClient.send({
    to: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    from: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
    subject: "Nemomens Shirt",
    content: `Message: ${message}\nTelefon raqami: ${phone}`,
  })

  res.json({ status: 200, message: "OK" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
