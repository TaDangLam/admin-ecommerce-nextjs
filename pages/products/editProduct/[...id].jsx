import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

function editProduct() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    // console.log(router.query.id);
    const {id} = router.query;
    // const _id = id ? id[0] : 0;
    // console.log(_id);
    useEffect(() => {
        if (id) {
          axios.get("/api/products?id=" + id).then((response) => {
            // console.log(response)
            setProductInfo(response.data);
          });
        }
    }, [id])
    return (
      <Layout>
        <h1 className="text-blue-900 text-3xl mb-5">Edit Product</h1>
          {productInfo && (
            <ProductForm {...productInfo}/>

          )}
      </Layout>
    );
}

export default editProduct;