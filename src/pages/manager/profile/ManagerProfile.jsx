import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function ManagerProfile() {
  const [form] = useForm();
  const [id, setId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      const accountJSON = JSON.parse(account);
      console.log(accountJSON);
      setId(accountJSON.id);
      form.setFieldsValue({
        name: accountJSON.name,
        email: accountJSON.email,
        phone: accountJSON.phone,
      });
    }
  }, [form]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`https://6678e6e40bd452505620352b.mockapi.io/Accounts/${id}`, {
        name: values.name,
        phone: values.phone,
        email: values.email,
      });
      toast.success("Update profile successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  return (
    <div className="ManagerProfile">
      <div className="ManagerProfile__title">
        <h2>{editMode ? "UPDATE PROFILE" : "PROFILE"}</h2>
      </div>
      <div className="ManagerProfile__content">
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            className="input"
            rules={[
              {
                required: true,
                message: "Name cannot be null!!!",
              },
            ]}
          >
            <Input disabled={!editMode} />
          </Form.Item>
          <Form.Item
            className="input"
            name="email"
            label="Email"
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
            <Input disabled={!editMode} />
          </Form.Item>
          <Form.Item
            className="input"
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Phone cannot be null!!!",
              },
            ]}
          >
            <Input disabled={!editMode} />
          </Form.Item>
          <div className="total__button">
            {editMode ? (
              <>
                <Form.Item>
                  <Button type="default" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </>
            ) : (
              <Form.Item>
                <Button type="primary" onClick={() => setEditMode(true)}>
                  Update
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ManagerProfile;
