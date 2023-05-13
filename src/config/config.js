import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts"
import "https://deno.land/x/dotenv/load.ts"

export const mensshirtClient = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com",
    port: 465,
    tls: true,
    auth: {
      username: Deno.env.get("MENSSHIRT_USERNAME"),
      password: Deno.env.get("MENSSHIRT_PASSWORD"),
    },
  },
})

export const nemomensshirtClient = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com",
    port: 465,
    tls: true,
    auth: {
      username: Deno.env.get("NEMOMENSSHIRT_USERNAME"),
      password: Deno.env.get("NEMOMENSSHIRT_PASSWORD"),
    },
  },
})
