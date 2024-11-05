import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Table } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";

function Product() {
  const [fetching, setFetching] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://664f6ea2ec9b4a4a602ec579.mockapi.io/product");
      const sortedProducts = response.data.sort((a, b) => b.id - a.id);
      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const inputProducts = products.filter((product) => product.name.toLowerCase().includes(input.toLowerCase()));

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (categoryId) => categoryMap[categoryId] || "Unknown",
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "STOCK",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "IMAGE",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} alt="product" width={100} />,
    },
    {
      title: "ACTION",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div style={{ fontSize: "21px", display: "flex", gap: "15px" }}>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(true);
              setId(id);
              form.setFieldsValue(record);
              setIsUpdated(true);
            }}
          />
          <Popconfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <DeleteOutlined style={{ cursor: "pointer" }} />
          <UnorderedListOutlined style={{ cursor: "pointer" }} />
        </div>
      ),
    },
  ];

  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      if (id && isUpdated) {
        await axios.put(`https://669475034bd61d8314c77f1a.mockapi.io/khanh/${id}`, {
          name: values.name,
          category: values.category,
          brand: values.brand,
          price: values.price,
          stock: values.stock,
          img: values.img,
          screen_size: values.screen_size,
          battery: values.battery,
          camera: values.camera,
          processor: values.processor,
          ram: values.ram,
          storage: values.storage,
        });
        toast.success("Update product success");
      } else {
        await axios.post("https://669475034bd61d8314c77f1a.mockapi.io/khanh", {
          name: values.name,
          category: values.category,
          brand: values.brand,
          price: values.price,
          stock: values.stock,
          img: values.img,
          screen_size: values.screen_size,
          battery: values.battery,
          camera: values.camera,
          processor: values.processor,
          ram: values.ram,
          storage: values.storage,
        });
        toast.success("Add product success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchProducts();
      handleCloseModal();
    }
  };

  return (
    <div className="Product">
      <div className="Product__title">
        <h2 className="Product__title__h2">List of Products</h2>
      </div>
      <div className="Product__nav">
        <div className="Product__nav__search">
          <input placeholder="Enter name" className="input" onChange={(e) => setInput(e.target.value)} />
          <button className="button">Search</button>
        </div>
        <div className="Product__nav__add">
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add new product
          </Button>
        </div>
      </div>
      <div className="Product__table">
        <Table
          dataSource={inputProducts}
          columns={columns}
          pagination={{ pageSize: 3 }}
          scroll={{ x: 600 }}
          loading={fetching}
        />
      </div>
      <Modal
        open={open}
        title={isUpdated ? "Update product" : "Add new product"}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} loading={loading}>
            {isUpdated ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Product name"
            rules={[
              {
                required: true,
                message: "Name cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}>
            <Select
              placeholder="Category"
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[
              {
                required: true,
                message: "Brand cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter brand" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "price cannot be null!!!",
              },
            ]}
          >
            <InputNumber placeholder="Enter price" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "quantity cannot be null!!!",
              },
            ]}
          >
            <InputNumber placeholder="Enter quantity" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Image"
            rules={[
              {
                required: true,
                message: "Image cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter Image" />
          </Form.Item>
          <Form.Item
            name="screen_size"
            label="Screen size"
            rules={[
              {
                required: true,
                message: "Screen size cannot be null!!!",
              },
            ]}
          >
            <InputNumber placeholder="Enter Screen size" />
          </Form.Item>
          <Form.Item
            name="battery"
            label="Battery"
            rules={[
              {
                required: true,
                message: "battery cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter battery" />
          </Form.Item>
          <Form.Item
            name="camera"
            label="Camera"
            rules={[
              {
                required: true,
                message: "camera cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter camera" />
          </Form.Item>
          <Form.Item
            name="processor"
            label="Processor"
            rules={[
              {
                required: true,
                message: "processor cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter processor" />
          </Form.Item>
          <Form.Item
            name="ram"
            label="Ram"
            rules={[
              {
                required: true,
                message: "ram cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter ram" />
          </Form.Item>
          <Form.Item
            name="storage"
            label="Storage"
            rules={[
              {
                required: true,
                message: "storage cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter storage" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Product;
