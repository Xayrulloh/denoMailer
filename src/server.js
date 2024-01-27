import { mensshirtClient, nemomensshirtClient } from './config/config.js'

Deno.serve(async (request) => {
  if (request.method == 'POST') {
    const url = request.url.split('/').slice(-2)
    const body = await request.text()
    const { phone, message, username } = JSON.parse(body)

    if (!phone) return new Response(JSON.stringify({ status: 200, message: 'OK' }))

    let content = ''

    switch (url[1]) {
      case 'sendPhone':
        content = `Ismi: ${username}\nTelefon raqami: ${phone}`

        break

      case 'sendEmail':
        content = `Ismi: ${username}\nTelefon raqami: ${phone}\nSms: ${message}\n`

        break

      case 'sendMessage':
        content = `Message: ${message}\nTelefon raqami: ${phone}`

        break

      default:
        break
    }

    switch (url[0]) {
      case 'nemomensshirt':
        await nemomensshirtClient.send({
          to: Deno.env.get('NEMOMENSSHIRT_USERNAME'),
          from: Deno.env.get('NEMOMENSSHIRT_USERNAME'),
          subject: 'Nemomens Shirt',
          content,
        })

        break

      case 'mensshirt':
        await mensshirtClient.send({
          to: Deno.env.get('MENSSHIRT_USERNAME'),
          from: Deno.env.get('MENSSHIRT_USERNAME'),
          subject: 'Mens Shirt',
          content: `Ismi: ${username}\nTelefon raqami: ${phone}`,
        })

        break

      default:
        break
    }
  }

  return new Response(JSON.stringify({ status: 200, message: 'OK' }))
})
