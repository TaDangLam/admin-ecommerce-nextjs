import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";

const DeleteProduct = () => {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const GoBacPageProduct = () => {
    router.push("/products");
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
  });
  }, [id]);

  const DeleteProduct = async(ev) => {
    ev.preventDefault();
    await axios.delete("/api/products?id="+id).then(() => {
      router.push('/products');
    })
  }

  return (
    <Layout>
      <h1 className="text-blue-900 text-3xl mb-5 text-center">
        Are You Sure Delete Product "<b>{productInfo?.title}</b>"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-400"
          onClick={DeleteProduct}
        >
          Yes
        </button>
        <button
          className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-400"
          onClick={GoBacPageProduct}
        >
          NO
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProduct;
