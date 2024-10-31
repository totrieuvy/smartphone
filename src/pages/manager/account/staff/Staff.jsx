/* eslint-disable react/jsx-key */
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Tag } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

function Staff() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();
  const [deleteForm] = useForm();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [disable, setDisable] = useState(false);
  const [modelDelete, setModalDelete] = useState(false);
  const [nameDelete, setNameDelete] = useState("");
  const [email, setEmail] = useState("");

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
      title: "SALARY",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "REASON BANNED",
      dataIndex: "reason_banned",
      key: "reason_banned",
      render: (reason_banned) => {
        if (!reason_banned) {
          return <Tag color="green">NO BANNED</Tag>;
        }
        return reason_banned;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? <Tag color="green">Active</Tag> : <Tag color="red">Not active</Tag>),
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
                  form.setFieldsValue(record);
                  setOpenModal(true);
                  setIsUpdate(true);
                  setId(id);
                  setDisable(true);
                }}
              >
                Update
              </Button>
              <Button danger type="primary" onClick={() => handleOpenDeleteModal(id, record.name, record.email)}>
                Delete
              </Button>
            </>
          );
        }
        return <span>No action</span>;
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");
      const staffData = response.data.filter((dataStaff) => dataStaff.role === "staff");
      setData(staffData);
      setFetching(false);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setDisable(false);
    setModalDelete(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    form.resetFields();
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      if (isUpdate && id) {
        await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          name: values.name,
          phone: values.phone,
          email: values.email,
          salary: values.salary,
        });
        toast.success("Update staff successfully");
      } else {
        await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/account", {
          name: values.name,
          phone: values.phone,
          password: values.password,
          email: values.email,
          role: "staff",
          status: true,
          create_date: currentDate,
          salary: values.salary,
          reason_banned: "",
        });
        toast.success("Add staff successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
      setLoading(false);
      form.resetFields();
      handleCloseModal();
    }
  };

  const handleDelete = async (id, values) => {
    console.log("Email: ", values.email);
    console.log("Deleting staff with values: ", values);
    try {
      // Update staff to mark as banned
      await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
        status: false,
        reason_banned: values.reason_banned,
      });

      // Prepare email parameters
      const templateParams = {
        to_email: email, // Ensure this field is correctly populated
        reason_banned: values.reason_banned,
      };

      // Send email notification
      await emailjs.send("service_k2p1g8d", "template_hjnvc0e", templateParams, "bcPGKA4QICBzO0bg7").then(
        (response) => {
          console.log("Email sent successfully: ", response.status, response.text);
        },
        (error) => {
          console.error("Failed to send email: ", error);
        }
      );

      // Notify success
      toast.success("Staff banned successfully");
    } catch (error) {
      console.error("Error during API call:", error.response?.data || error.message);
      toast.error("Failed to process the delete request. Check console for more details.");
    } finally {
      // Reload data
      setEmail("");
      fetchData();
      setModalDelete(false);
      form.resetFields();
      handleCloseModal();
    }
  };

  const handleOpenDeleteModal = (id, name, email) => {
    setModalDelete(true);
    setNameDelete(name);
    setEmail(email);
    setId(id);
    deleteForm.setFieldsValue({ name });
    deleteForm.setFieldsValue({ email });
  };

  return (
    <div className="staff">
      <div className="staff__content">
        <h2 className="staff__content__title">LIST OF STAFF</h2>
        <div className="staff__content__button">
          <Button type="primary" onClick={handleOpenModal}>
            Add New Staff
          </Button>
          <Button type="primary">Export to PDF</Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="staff__content__table"
          loading={fetching}
          scroll={{ x: 600 }}
        />
      </div>
      <Modal
        open={openModal}
        title={isUpdate ? "Update staff" : "Add new staff"}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
            {isUpdate ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Staff name"
            rules={[
              {
                required: true,
                message: "Staff name cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter staff name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Staff Phone"
            rules={[
              {
                required: true,
                message: "Staff phone cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Staff email"
            rules={[
              {
                required: true,
                message: "Staff email cannot be null!!!",
              },
              {
                type: "email",
                message: "Invalid email!!!",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          {disable ? (
            ""
          ) : (
            <Form.Item
              name="password"
              label="Staff password"
              rules={[
                {
                  required: true,
                  message: "Staff password cannot be null!!!",
                },
              ]}
            >
              <Input.Password placeholder="Enter password" disabled={disable} />
            </Form.Item>
          )}
          <Form.Item
            name="salary"
            label="Staff salary"
            rules={[
              {
                required: true,
                message: "Staff salary cannot be null!!!",
              },
              {
                validator: (_, value) => {
                  if (value === undefined) {
                    return Promise.reject(new Error("Staff salary cannot be null!!!"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber min={0} placeholder="Enter salary" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Delete Staff: ${nameDelete}`}
        open={modelDelete}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Popconfirm
            title="Are you sure to delete this staff?"
            onConfirm={() => handleDelete(id, deleteForm.getFieldsValue())}
            okText="Yes"
            cancelText="No"
          >
            <Button key="submit" type="primary" danger>
              Delete
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form form={deleteForm} labelCol={{ span: 24 }}>
          <Form.Item name="name" label="Staff name" style={{ margin: 0 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="reason_banned"
            label="Reason banned"
            rules={[
              {
                required: true,
                message: "Reason cannot be null!!!",
              },
            ]}
          >
            <Input placeholder="Enter reason" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Staff;
