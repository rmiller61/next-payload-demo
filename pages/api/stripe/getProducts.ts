import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from "stripe"

const stripeFunction = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('Stripe secret key is not defined.');
        }
        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY,
            {
              apiVersion: "2022-11-15",
              typescript: true,
            }
          )    
        const { data: products } = await stripe.products.list()
        return res.status(200).json({ products })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error fetching Stripe products.');
    }

}

export default stripeFunction;
