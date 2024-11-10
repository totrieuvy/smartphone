import { Button, Form, Input, Modal, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [idFeedback, setIdFeedback] = useState("");

  useEffect(() => {
    const account = localStorage.getItem("account");
    const accountJSON = JSON.parse(account);
    const id = accountJSON?.user?.id;
    setId(id);
  }, [id]);

  const getCustomerName = (from_id) => {
    const customer = accounts.find((cus) => cus.id === from_id);
    if (customer) {
      return customer.username;
    } else {
      return "Unknown";
    }
  };

  const getCustomerEmail = (from_id) => {
    const customer = accounts.find((cus) => cus.id === from_id);
    if (customer) {
      return customer.email;
    } else {
      return "Unknown";
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
        <>
          <Button
            type="primary"
            onClick={() => {
              setIdFeedback(id);
              handleOpen(record);
            }}
          >
            Reply
          </Button>
        </>
      ),
    },
  ];

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
  }, []);

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
            rules={[
              {
                required: true,
                message: "Please enter response",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Feedback;
