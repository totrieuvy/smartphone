import { Button, Form, Input, Modal, Popconfirm, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function Category() {
  const [dateSource, setDataSource] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CREATE DATE",
      dataIndex: "create_date",
      key: "create_date",
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
      render: (id, record) => (
        <>
          <Button
            onClick={() => {
              setOpen(true);
              form.setFieldsValue(record);
              setId(id);
              setIsUpdate(true);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete category"
            description="Are you sure to delete this category?"
            onConfirm={() => handleDelete(id)}
            okText="Delete"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/category/${id}`, {
      status: false,
    });
    toast.success("Delete category successfully");
    fetchData();
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/category");
      const sortedData = response.data.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
      setDataSource(sortedData);
      setFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
    setIsUpdate(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      if (isUpdate && id) {
        await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/category/${id}`, {
          name: values.name,
        });
        toast.success("Update category successfully");
      } else {
        await axios.post("https://6692a166346eeafcf46da14d.mockapi.io/category", {
          name: values.name,
          status: true,
          create_date: currentDate,
        });
        toast.success("Add category successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      form.resetFields();
      fetchData();
      handleCloseModal();
    }
  };

  return (
    <div className="Category">
      <div className="Category__content">
        <h2>LIST OF CATEGORY</h2>
        <div className="Category__button">
          <Button type="primary" className="button" onClick={handleOpenModal}>
            Add new category
          </Button>
          <Button type="primary" className="button" onClick={handleOpenModal}>
            Export to pdf
          </Button>
        </div>
        <Table
          dataSource={dateSource}
          columns={columns}
          loading={fetching}
          className="Category__table"
          scroll={{ x: 600 }}
        />
      </div>
      <Modal
        open={open}
        title={isUpdate ? "Update category" : "Add new category"}
        onSubmit
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
            label="Category name"
            rules={[
              {
                required: true,
                message: "Category name cannot be null!!!",
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

export default Category;
