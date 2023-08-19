import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";

const DeleteProduct = () => {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const GoBackPageProduct = () => {
    router.push("/products");
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    // Lấy thông tin sản phẩm
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
      // console.log(response)
  });
  }, [id]);

  const DeleteProducts = async(ev) => {
    ev.preventDefault();
    // Xóa Từ MongoDB
    await axios.delete("/api/products?id="+id).then(() => {
      router.push('/products');
    });
  }

  return (
    <Layout>
      <h1 className="text-blue-900 text-3xl mb-5 text-center">
        Are You Sure Delete Product "<b>{productInfo?.title}</b>"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-400"
          onClick={DeleteProducts}
        >
          Yes
        </button>
        <button
          className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-400"
          onClick={GoBackPageProduct}
        >
          NO
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProduct;
