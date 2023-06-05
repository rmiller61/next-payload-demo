import Stripe from "stripe"
import { Response } from "express"
import { PayloadRequest } from "payload/types"
import { Forbidden } from "payload/errors"

const stripe = new Stripe(
  "sk_test_51MnnufBIScIc7Y7Pkh0DMlaNSJGlvknL03f0xCT21eNnTnekt9sfKu1GSoEYa1oCs0pmYaE9C5OtbDOGLZ9WtrRL00SAyHqERq",
  {
    apiVersion: "2022-11-15",
    typescript: true,
  }
)

export const stripeREST = async (args: { req: PayloadRequest; res: Response; next: any }) => {
  const { req, res, next } = args
  const { payload, user } = req

  try {
    if (!user) {
      //throw new Forbidden()
    }

    const { data: products } = await stripe.products.list()

    res.status(200).json({ products })
  } catch (error) {
    const message = `An error has occurred in the Stripe plugin REST handler: '${error}'`
    payload.logger.error(message)
    return res.status(500).json({
      message,
    })
  }
}
