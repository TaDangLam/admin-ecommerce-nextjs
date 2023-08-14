import { mongooseConnect } from "@/lib/mongoose";
import  Product  from "@/model/Product";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    // console.log(req);

    if(method === 'GET'){
      res.json(await Product.find())
    }

    if(method === 'POST'){
      const {title, description, price} = req.body;
      const productDoc = await Product.create({
        title, description, price
      })
      res.json(productDoc);
    }
  }