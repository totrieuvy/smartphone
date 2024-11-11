import { useForm } from "antd/es/form/Form";
import "./index.scss";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [form] = useForm();
  const [oldPassword, setOldPassword] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const account = localStorage?.getItem("account");
    const json = JSON.parse(account);
    const oldPassword = json?.user?.password;
    setOldPassword(oldPassword);
    setId(json?.user?.id);
  }, []);

  const handleFinish = async (values) => {
    try {
      if (values.newPassword !== values.confirmNewPassword) {
        toast.error("Confirm password incorrect!");
      } else if (values.oldPassword !== oldPassword) {
        toast.error("Old password incorrect!");
      } else {
        await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          password: values.newPassword,
        });
        form.resetFields();
        localStorage.removeItem("account");

        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ChangePasswordStaff">
      <div className="ChangePasswordStaff__title">
        <h2>Change password</h2>
      </div>
      <div className="ChangePasswordStaff__content">
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="oldPassword"
            label="Old password"
            rules={[
              {
                required: true,
                message: "Old password cannot be null!",
              },
            ]}
          >
            <Input.Password placeholder="Enter old password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New password"
            rules={[
              {
                required: true,
                message: "New password cannot be null!",
              },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Confirm password"
            rules={[
              {
                required: true,
                message: "Confirm password cannot be null!",
              },
            ]}
          >
            <Input.Password placeholder="Enter confirm password" />
          </Form.Item>
          <Form.Item>
            <div className="ChangePasswordStaff__buttonWrapper">
              <Button type="primary" className="ChangePasswordStaff__buttonWrapper" htmlType="submit">
                Change
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
