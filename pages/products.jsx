import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";

const Products = () => {
    const [dataProduct, setDataProduct] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setDataProduct(response.data);
            console.log(dataProduct)
        });
    }, [])
    return ( 
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={"/products/new"}>Add new product</Link>
        </Layout>
     );
}

export default Products;