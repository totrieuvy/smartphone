import { Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Switch, Table, Tag } from "antd";
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
  const [detailOpen, setDetailOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://669475034bd61d8314c77f1a.mockapi.io/khanh");
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
      render: (img) => <img src={img} alt="product" width={100} className="image" />,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? <Tag color="green">Active</Tag> : <Tag color="red">Not Active</Tag>),
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
            okText="Delete"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: "pointer" }} />
          </Popconfirm>

          <UnorderedListOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedProduct(record);
              setDetailOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.put(`https://669475034bd61d8314c77f1a.mockapi.io/khanh/${id}`, {
        status: false,
      });
      toast.success("delete product success");
    } catch (error) {
      console.log(error);
    } finally {
      fetchProducts();
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const finalValues = Object.keys(values).reduce((acc, key) => {
        if (key === "status" && !id) {
          acc[key] = values[key] !== undefined ? values[key] : true;
        } else if (typeof values[key] === "boolean") {
          acc[key] = values[key] !== undefined ? values[key] : false;
        } else {
          acc[key] = values[key] !== undefined && values[key] !== "" ? values[key] : null;
        }
        return acc;
      }, {});
      if (id && isUpdated) {
        await axios.put(`https://669475034bd61d8314c77f1a.mockapi.io/khanh/${id}`, values);
        toast.success("Update product success");
      } else {
        await axios.post("https://669475034bd61d8314c77f1a.mockapi.io/khanh", finalValues);
        console.log(finalValues);
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

  const renderProductDetails = () => {
    const product = selectedProduct;

    if (!product) return null;

    return (
      <div>
        {product.name && (
          <p>
            <strong>Name:</strong> {product.name}
          </p>
        )}
        {product.category && product.category !== "null" && (
          <p>
            <strong>Category:</strong> {categoryMap[product.category]}
          </p>
        )}
        {product.brand && (
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
        )}
        {product.price && product.price !== 0 && (
          <p>
            <strong>Price:</strong> {product.price}
          </p>
        )}
        {product.stock !== undefined && product.stock !== null && product.stock >= 0 && (
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
        )}
        {product.img && (
          <p>
            <strong>Image:</strong> <img src={product.img} alt="product" width={100} />
          </p>
        )}
        {product.screen_size && (
          <p>
            <strong>Screen Size:</strong> {product.screen_size}
          </p>
        )}
        {product.battery && (
          <p>
            <strong>Battery:</strong> {product.battery}
          </p>
        )}
        {product.camera && (
          <p>
            <strong>Camera:</strong> {product.camera}
          </p>
        )}
        {product.processor && (
          <p>
            <strong>Processor:</strong> {product.processor}
          </p>
        )}
        {product.ram && (
          <p>
            <strong>RAM:</strong> {product.ram}
          </p>
        )}
        {product.storage && (
          <p>
            <strong>Storage:</strong> {product.storage}
          </p>
        )}
        {product.operating_system && (
          <p>
            <strong>Operating System:</strong> {product.operating_system}
          </p>
        )}
        {product.resolution && (
          <p>
            <strong>Resolution:</strong> {product.resolution}
          </p>
        )}
        {product.smart_tv && (
          <p>
            <strong>Smart TV:</strong> Yes
          </p>
        )}
        {product.refresh_rate && (
          <p>
            <strong>Refresh Rate:</strong> {product.refresh_rate}
          </p>
        )}
        {product.hdmi_ports && product.hdmi_ports > 0 && (
          <p>
            <strong>HDMI Ports:</strong> {product.hdmi_ports}
          </p>
        )}
        {product.water_resistant && (
          <p>
            <strong>Water Resistant:</strong> Yes
          </p>
        )}
        {product.heart_rate_monitor && (
          <p>
            <strong>Heart Rate Monitor:</strong> Yes
          </p>
        )}
        {product.gps && (
          <p>
            <strong>GPS:</strong> Yes
          </p>
        )}
      </div>
    );
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
        visible={open}
        title={isUpdated ? "Edit Product" : "Add Product"}
        okText="Save"
        cancelText="Cancel"
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Basic Information */}
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Category cannot null" }]}>
            <Select
              placeholder="Category"
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Form.Item>

          <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please input the brand!" }]}>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the price!" }]}>
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please input stock!" }]}>
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="img" label="Image URL" rules={[{ required: true, message: "Please input image URL!" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="screen_size"
                label="Screen Size"
                rules={[{ required: true, message: "Please input screen size!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="battery" label="Battery">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="camera" label="Camera">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="processor" label="Processor">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ram" label="RAM">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="storage" label="Storage">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="operating_system" label="Operating System">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="resolution" label="Resolution">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="smart_tv" label="Smart TV" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="refresh_rate" label="Refresh Rate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hdmi_ports" label="HDMI Ports">
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="water_resistant" label="Water Resistant" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="heart_rate_monitor" label="Heart Rate Monitor" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="gps" label="GPS" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="status" label="Product Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal visible={detailOpen} title="Product Details" onCancel={() => setDetailOpen(false)} footer={null}>
        {renderProductDetails()}
      </Modal>
    </div>
  );
}

export default Product;
