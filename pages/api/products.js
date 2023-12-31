import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/model/Product";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  // console.log(req);
  // console.log("-------------------------------------------------------------")
  // console.log(req.query);
  // console.log("-------------------------------------------------------------")
  // console.log(req.query.id);

  // 2 cái Get ( Get theo ID và 1 cái Get All)
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, images, categories} = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      categories
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, _id, categories } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images, categories });
    res.json("Product Updated successfully");
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json("Product deleted successfully");
    }
  }
}
