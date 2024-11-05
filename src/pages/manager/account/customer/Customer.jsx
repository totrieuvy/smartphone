/* eslint-disable no-unused-vars */
import { Button, Form, Input, Modal, Popconfirm, Table, Tag } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

function Customer() {
  const [dataSource, setDataSource] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [formDelete] = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
      const filterUser = response.data.filter((user) => user.role === "user");
      setDataSource(filterUser);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CREATE DATE",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "REASON BANNED",
      dataIndex: "reason_banned",
      key: "reason_banned",
      render: (reason_banned) => {
        if (!reason_banned) {
          return <Tag color="green">NO BANNED</Tag>;
        } else {
          return reason_banned;
        }
      },
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
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
      render: (id, record) => {
        if (record.status) {
          return (
            <>
              <Button
                onClick={() => {
                  setOpenModal(true);
                  form.setFieldsValue(record);
                  setId(id);
                }}
              >
                Update
              </Button>
              <Button danger onClick={() => handleOpenDeleteModal(id, record.name, record.email)}>
                Delete
              </Button>
            </>
          );
        } else {
          return <span>No action</span>;
        }
      },
    },
  ];

  const handleOpenDeleteModal = (id, name, email) => {
    setOpenModalDelete(true);
    setName(name);
    setEmail(email);
    setId(id);
    formDelete.setFieldsValue({ name });
    formDelete.setFieldsValue({ email });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setName("");
    setId("");
    setOpenModalDelete(false);
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`https://6678e6e40bd452505620352b.mockapi.io/Accounts/${id}`, {
        name: values.name,
        phone: values.phone,
        email: values.email,
      });
      toast.success("Update customer successfully");
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleDelete = async (id, values) => {
    try {
      await axios.put(`https://6678e6e40bd452505620352b.mockapi.io/Accounts/${id}`, {
        reason_banned: values.reason_banned,
        status: false,
      });

      const templateParams = {
        to_email: email,
        reason_banned: values.reason_banned,
      };

      await emailjs.send("service_k2p1g8d", "template_hjnvc0e", templateParams, "bcPGKA4QICBzO0bg7").then(
        (response) => {
          console.log("Email sent successfully: ", response.status, response.text);
        },
        (error) => {
          console.error("Failed to send email: ", error);
        }
      );
      toast.success("Delete customer successfully");
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
      setName("");
      setId("");
      setLoading(false);
      handleCloseModal();
    }
  };

  return (
    <div className="Customer">
      <h2 className="Customer__title">LIST OF CUSTOMER</h2>
      <div className="Customer__button">
        <Button type="primary" className="Customer__button">
          Export to PDF
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        className="Customer__table"
        loading={fetching}
        scroll={{ x: 600 }}
      />

      <Modal
        open={openModal}
        title="Update user"
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()} loading={loading}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Customer name"
            rules={[
              {
                required: true,
                message: "Name cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Customer phone"
            rules={[
              {
                required: true,
                message: "Phone cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter customer phone" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Customer email"
            rules={[
              {
                required: true,
                message: "Email cannot be null!!!",
              },
              {
                type: "email",
                message: "Invalid email!!!",
              },
            ]}
          >
            <Input placeholder="Enter customer email" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={openModalDelete}
        title="Delete customer"
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Return
          </Button>,
          <Popconfirm
            key={id}
            title="Delete customer"
            description="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(id, formDelete.getFieldsValue())}
            okText="Delete"
            cancelText="No"
          >
            <Button danger loading={loading} type="primary">
              Delete
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form form={formDelete} labelCol={{ span: 24 }}>
          <Form.Item name="name" label="Customer name">
            <Input placeholder="Enter customer name" disabled />
          </Form.Item>
          <Form.Item
            name="reason_banned"
            label="Reason to ban this customer"
            rules={[
              {
                required: true,
                message: "Reason cannot be null!!!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter reason" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Customer;
