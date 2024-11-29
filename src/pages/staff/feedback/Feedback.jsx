import { Button, Form, Input, Modal, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [form] = useForm();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [idFeedback, setIdFeedback] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const account = localStorage.getItem("account");
    const accountJSON = JSON.parse(account);
    const id = accountJSON?.user?.id;
    setId(id);
  }, [id]);

  const getCustomerName = (from_id) => {
    const customer = accounts.find((cus) => cus.id === from_id);
    return customer ? customer.username : "Unknown";
  };

  const getCustomerEmail = (from_id) => {
    const customer = accounts.find((cus) => cus.id === from_id);
    return customer ? customer.email : "Unknown";
  };

  const getProductName = (product_id) => {
    const product = products.find((pro) => pro.id === product_id || product_id == parseInt(pro.id));
    if (product) {
      return (
        <Button type="link" onClick={() => handleProductClick(product)}>
          {product.name}
        </Button>
      );
    } else {
      return "No Product";
    }
  };

  const columns = [
    {
      title: "CUSTOMER NAME",
      dataIndex: "from_id",
      key: "from_id",
      render: (from_id) => getCustomerName(from_id),
    },
    {
      title: "CUSTOMER EMAIL",
      dataIndex: "from_id",
      key: "from_id",
      render: (from_id) => getCustomerEmail(from_id),
    },
    {
      title: "CONTENT",
      dataIndex: "from_content",
      key: "from_content",
    },
    {
      title: "PRODUCT",
      dataIndex: "product_id",
      key: "product_id",
      render: (product_id) => getProductName(product_id),
    },
    {
      title: "CREATE DATE",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "REPLY",
      dataIndex: "reply_content",
      key: "reply_content",
      render: (create_date) => {
        if (create_date) {
          return create_date;
        } else {
          return <Tag color="gold">WAIT</Tag>;
        }
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? <Tag color="green">REPLIED</Tag> : <Tag color="red">NO REPLY</Tag>),
    },
    {
      title: "ACTION",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <Button
          type="primary"
          onClick={() => {
            setIdFeedback(id);
            handleOpen(record);
          }}
        >
          Reply
        </Button>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://669475034bd61d8314c77f1a.mockapi.io/khanh");
      setProducts(response.data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setFetching(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("https://664f6ea2ec9b4a4a602ec579.mockapi.io/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setFetching(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
      setAccounts(response.data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchAccounts();
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    if (product && product.name && product.price && product.stock && product.img && product.screen_size) {
      setSelectedProduct(product);
      setProductModalOpen(true);
    }
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpen = (record) => {
    setOpen(true);
    form.setFieldsValue({
      from_content: record.from_content,
    });
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`https://664f6ea2ec9b4a4a602ec579.mockapi.io/feedback/${idFeedback}`, {
        reply_id: id,
        reply_content: values.reply_content,
        status: true,
      });
      toast.success("Reply successfully");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setFetching(false);
      fetchFeedbacks();
      form.resetFields();
      handleCloseModal();
    }
  };

  return (
    <div className="Feedback">
      <h2>list of feedbacks</h2>
      <Table
        className="Feedback__table"
        dataSource={feedbacks}
        columns={columns}
        scroll={{ x: 600 }}
        loading={fetching}
      />

      <Modal
        open={productModalOpen}
        title="Product Details"
        onCancel={handleCloseProductModal}
        footer={[
          <Button key="back" onClick={handleCloseProductModal}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: "100%", height: "auto" }} />
            {selectedProduct.price && selectedProduct.price !== 0 && (
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
            )}
            {selectedProduct.stock && selectedProduct.stock !== 0 && (
              <p>
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>
            )}
            {selectedProduct.screen_size && selectedProduct.screen_size !== 0 && (
              <p>
                <strong>Screen Size:</strong> {selectedProduct.screen_size}
              </p>
            )}
            {selectedProduct.battery && selectedProduct.battery !== 0 && (
              <p>
                <strong>Battery:</strong> {selectedProduct.battery}
              </p>
            )}
            {selectedProduct.camera && selectedProduct.camera !== 0 && (
              <p>
                <strong>Camera:</strong> {selectedProduct.camera}
              </p>
            )}
            {selectedProduct.processor && selectedProduct.processor !== 0 && (
              <p>
                <strong>Processor:</strong> {selectedProduct.processor}
              </p>
            )}
            {selectedProduct.ram && selectedProduct.ram !== 0 && (
              <p>
                <strong>RAM:</strong> {selectedProduct.ram}
              </p>
            )}
            {selectedProduct.storage && selectedProduct.storage !== 0 && (
              <p>
                <strong>Storage:</strong> {selectedProduct.storage}
              </p>
            )}
            {selectedProduct.operating_system &&
              selectedProduct.operating_system !== 0 &&
              selectedProduct.operating_system !== "" && (
                <p>
                  <strong>Operating System:</strong> {selectedProduct.operating_system}
                </p>
              )}
            {selectedProduct.resolution && selectedProduct.resolution !== 0 && selectedProduct.resolution !== "" && (
              <p>
                <strong>Resolution:</strong> {selectedProduct.resolution}
              </p>
            )}
            {selectedProduct.smart_tv && selectedProduct.smart_tv !== 0 && (
              <p>
                <strong>Smart TV:</strong> {selectedProduct.smart_tv ? "Yes" : "No"}
              </p>
            )}
            {selectedProduct.refresh_rate && selectedProduct.refresh_rate !== 0 && (
              <p>
                <strong>Refresh Rate:</strong> {selectedProduct.refresh_rate}
              </p>
            )}
            {selectedProduct.hdmi_ports && selectedProduct.hdmi_ports !== 0 && (
              <p>
                <strong>HDMI Ports:</strong> {selectedProduct.hdmi_ports}
              </p>
            )}
            {selectedProduct.water_resistant && selectedProduct.water_resistant !== 0 && (
              <p>
                <strong>Water Resistant:</strong> {selectedProduct.water_resistant ? "Yes" : "No"}
              </p>
            )}
            {selectedProduct.heart_rate_monitor && selectedProduct.heart_rate_monitor !== 0 && (
              <p>
                <strong>Heart Rate Monitor:</strong> {selectedProduct.heart_rate_monitor ? "Yes" : "No"}
              </p>
            )}
            {selectedProduct.gps && selectedProduct.gps !== 0 && (
              <p>
                <strong>GPS:</strong> {selectedProduct.gps ? "Yes" : "No"}
              </p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={open}
        title="Reply feedback"
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
            Send
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item name="from_content" label="Customer feedback">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="reply_content"
            label="Reply feedback"
            rules={[{ required: true, message: "Please enter response" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Feedback;
