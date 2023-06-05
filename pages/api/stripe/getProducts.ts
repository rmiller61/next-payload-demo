import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from "stripe"



const stripeFunction = async (req: NextApiRequest, res: NextApiResponse) => {
    const stripe = new Stripe(
        "sk_test_51MnnufBIScIc7Y7Pkh0DMlaNSJGlvknL03f0xCT21eNnTnekt9sfKu1GSoEYa1oCs0pmYaE9C5OtbDOGLZ9WtrRL00SAyHqERq",
        {
          apiVersion: "2022-11-15",
          typescript: true,
        }
      )
    try {
        const { data: products } = await stripe.products.list()
        return res.status(200).json({ products })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error fetching Stripe products.');
    }

}

export default stripeFunction;
