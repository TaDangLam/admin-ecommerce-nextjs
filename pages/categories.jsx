import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

import Layout from "@/components/Layout";

export const CategoryPage = ({ swal }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  // useEffect(() => {
  //   editCategory ? setProperties([...editCategory.properties]) : setProperties([]);
  // },[editCategory])

  const saveCategory = async (ev) => {
    ev.preventDefault();
    const data = { 
      name, 
      parentCategory, 
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      }))
    };
    data._id = editCategory?._id;
    if(editCategory) {
      await axios.put("/api/categories", data);
      setEditCategory(null);
    }else{
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategory();
  };

  const fetchCategory = async () => {
    await axios.get("/api/categories").then((result) => {
      setCategory(result.data);
    });
  };

  const EditCategory = (cate) => {
    setEditCategory(cate);
    setName(cate.name);
    // if(!parentCategory) {
    //   setParentCategory("No Parent Category");
    // }
    setParentCategory(cate.parent?._id);
    setProperties(cate.properties.map(({name, values}) => (
      {
        name,
        values: values.join(',')
      }
    )));
  }

  const cancelEditCategory = () => {
    setEditCategory(null);
    setName('');
    setParentCategory('');
    setProperties([])
  }

  const addNewProperty = () => {
    // thêm 1 đối tượng vào cuối của mảng property và mỗi đối tượng có 2 thuộc tính là name và values
    setProperties(prev => [...prev, {name:'', values:''}])
  }

  const handlePropertyNameChange = (index, newName) => {
    setProperties(prev => {
      const property = [...prev];
      property[index].name = newName;
      return property;
    })
  }

  const handlePropertyValuesChange = (index, newValues) => {
    setProperties(prev => {
      const property = [...prev];
      property[index].values = newValues;
      return property;
    })
  }

  const removeProperty = (indexToRemove) => {
    setProperties(prev => {
      // Hàm filter . true nhận false loại
      return [...prev].filter((p, pIndex) => pIndex !== indexToRemove);
    })
  }

  const deleteCategory = (cate) => {
    swal.fire({
      title: 'Are You Sure?',
      text: `Do you want to delete ${cate.name}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
  }).then(result => {
    if(result.isConfirmed) {
      const { _id } = cate; axios.delete("/api/categories?_id="+_id);
      fetchCategory();
    }
  });
  }

  return (
    <Layout>
      <h1 className="text-blue-900 text-3xl mb-5">Categories</h1>
      <label>{editCategory ? `Edit Category ${editCategory.name}` : 'New Category Name'}</label>

      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input 
          type="text"
          className=""
          placeholder="Category Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <select
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">No Parent Category</option>
          {category.map((cate) => (
            <option value={cate._id}>{cate.name}</option>
          ))}
        </select>
        </div>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button 
            type="button" 
            className="btn-primary text-sm my-1" 
            onClick={addNewProperty}
          >
            Add New Property
          </button>
          {properties.length > 0 && properties.map((pro, index) => (
            <div className="flex gap-2 mt-2">
              <input 
                type="text" 
                placeholder="property name (example: Color)"
                value={pro.name}
                onChange={ev => handlePropertyNameChange(index, ev.target.value)}
              />
              <input 
                type="text" 
                placeholder="Values, coma separated"
                value={pro.values}
                onChange={ev => handlePropertyValuesChange(index, ev.target.value)}
              />
              <button className="btn-primary" type="button" onClick={() => removeProperty(index)}>Remove</button>
            </div>
          ))}
        </div>
        {editCategory && (
          <button className="btn-primary mr-2 btn-default" onClick={cancelEditCategory}>
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="text-white bg-blue-900 px-4 py-1 rounded-md"
        >
          Save
        </button>
      </form>
      {/* edit = null mà null thì coi như false thì không hiển thị . !editCategory khác null thì mới hiển thị */}
      {!editCategory && (
        <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {category.map((cate) => (
            <tr>
              <td>{cate.name}</td>
              <td>{cate.parent?.name}</td>
              <td className="flex gap-1">
                <button onClick={() => EditCategory(cate)} className="btn-primary flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <div>Edit</div>
                </button>
                <button 
                  className="btn-primary flex gap-1"
                  onClick={() => deleteCategory(cate)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <div>Delete</div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      
    </Layout>
  );
};



export default withSwal(({swal}, ref) => (
  <CategoryPage swal={swal} />
));
