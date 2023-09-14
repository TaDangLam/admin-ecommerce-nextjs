import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Spinner from "@/components/Spinner";

const ProductForm = ({
    _id,
    images:existingImages,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    categories: exisCategories,
}) => {
    const [title, setTitle] = useState(existingTitle || "");
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState(exisCategories || '');
    const [description, setDescription] = useState(existingDescription || "");
    const [images, setImages] = useState(existingImages || []);
    const [price, setPrice] = useState(existingPrice || "");
    const [upload, setUpload] = useState(false);
    const router = useRouter();

    console.log(_id);

    useEffect(() => {
      axios.get("/api/categories").then(result => {
        setCategory(result.data);
      })
    }, [])

    const saveProduct = async (ev) => {
      ev.preventDefault();
      const data = { title, description, price, images, categories };
      if (_id) {
        // Update
          await axios.put("/api/products", {...data,_id});
      } else {
        // Create
          await axios.post("/api/products", data);
      }
      router.push('/products');
    };

    const uploadFile = async(ev) => {
      const files = ev.target?.files;
      // console.log(files);
      if (files.length > 0) {
        setUpload(true);
        const data = new FormData();
        for (const file of files) {
          data.append('file', file);
        }
        const res = await axios.post('/api/upload', data);
        const newImages = res.data.links
        setImages(oldImages => {
          return [...oldImages, ...newImages];
        });
        setUpload(false);
        console.log(res.data);
      }
      
    }
    
  return (
    <form onSubmit={saveProduct}>
      {/* <h1 className="text-blue-900 text-3xl mb-5">New Product</h1> */}
      <label>Product Name</label>
      <input
        className="mb-2"
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={categories} onChange={ev => setCategories(ev.target.value)}>
      <option value="">Uncategorized</option>
        {category.map(cate => (
          <option value={cate._id}>{cate.name}</option>
        ))}
      </select>
      <div className="mt-2"><label>Photos</label></div>
      <div className="mb-2 flex flex-wrap gap-2">
        {/* map() cần return */}
        {!!images?.length && images.map(link => (
           <div key={link} className="h-24">
            <img src={link} alt="HinhAnh" className="rounded-lg"/>
          </div>
        ))}
        {upload && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label onChange={uploadFile} className="border w-24 h-24 text-center flex items-center justify-center rounded-lg bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" multiple/>
        </label>
      </div>
      <label>Description</label>
      <textarea
        className=""
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price (In USD)</label>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary mt-2">
        Save
      </button>
    </form>
  );
}

export default ProductForm;