
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

function NewProducts() {
    return (
      <Layout>
        <h1 className="text-blue-900 text-3xl mb-5">New Product</h1>
        <ProductForm />
      </Layout>
    )
}

export default NewProducts;
