import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function NewProducts() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // const [goBack, setGoBack] = useState(false);
    const router = useRouter();

    const createProduct = async (e) => {
        e.preventDefault();
        const data = {title, description, price}
        await axios.post('/api/products' , data)
        // setGoBack(true);
        router.push('/products');
    }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1 className="text-blue-900 text-3xl mb-5">New Product</h1>
        <label>Product Name</label>
        <input
          className="mb-2"
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}

export default NewProducts;
