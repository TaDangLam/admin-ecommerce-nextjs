import Category from "@/model/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'POST') {
        const {name, parentCategory, properties} = req.body;
        const CategoryDoc = await Category.create({
            name, 
            parent: parentCategory || undefined, 
            properties});
        res.json(CategoryDoc);
    }

    if(method === 'PUT') {
        const {name, parentCategory, properties, _id} = req.body;
        const CategoryDoc = await Category.updateOne({_id},{
            name, 
            parent: parentCategory || undefined, 
            properties});
        res.json(CategoryDoc);
    }

    if(method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }
    
    if(method === "DELETE") {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json('ok');
    }
}
