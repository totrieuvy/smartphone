/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function TableManager({ columns, api, title, type, formItems }) {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(api);
      console.log("Response Data:", response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setReload(!reload);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, reload);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setIsUpdate(false);
    form.resetFields();
  };

  const currentDate = new Date().toISOString().slice(0, 10);

  const handleFinish = async (values) => {
    setLoadingSubmit(true);
    console.log("Value: ", values);
    if (values.id) {
      const response = await axios.put(`${api}/${id}`, values);
      console.log(response.data);
      fetchData();
      setLoadingSubmit(false);
      setReload(!reload);
      form.resetFields();
      toast.success(`Update ${type} successfully`);
      handleCancel();
    } else {
      const response = await axios.post(`${api}`, values);
      console.log(response.data);
      fetchData();
      setLoadingSubmit(false);
      setReload(!reload);
      form.resetFields();
      toast.success(`Add ${type} successfully`);
      handleCancel();
    }
  };

  return (
    <div className="TableManager">
      {title && title.length > 0 && <h2 className="TableManager__title">{title}</h2>}
      <div className="TableManager__button">
        <Button type="primary" className="button" onClick={handleOpenModal}>
          Add new {type}
        </Button>
        <Button type="primary" className="button">
          Export {type} to pdf
        </Button>
      </div>
      <Table
        className="table"
        columns={[
          ...columns,
          {
            title: "ACTION",
            dataIndex: "id",
            key: "id",
            width: 150,
            render: (id, record) => (
              <>
                <Button
                  onClick={() => {
                    setIsUpdate(true);
                    setId(id);
                    form.setFieldsValue(record);
                    setOpenModal(true);
                  }}
                >
                  Update
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        dataSource={data}
        size="small"
        loading={loading}
        style={{ maxWidth: "1050px", margin: "0 auto" }}
      />
      <Modal
        title={`${isUpdate ? `Update ${type}` : `Add ${type}`}`}
        open={openModal}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={loadingSubmit}
            disabled={loadingSubmit}
          >
            Create
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default TableManager;
