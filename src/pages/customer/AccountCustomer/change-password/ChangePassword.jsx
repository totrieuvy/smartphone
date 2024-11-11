import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Typography, Card } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function ChangePasswordCustomer() {
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
        toast.error("Passwords do not match!");
      } else if (values.oldPassword !== oldPassword) {
        toast.error("Old password is incorrect!");
      } else {
        await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
          password: values.newPassword,
        });
        form.resetFields();
        localStorage.removeItem("account");
        setTimeout(() => navigate("/login"), 1000);
        toast.success("Password changed successfully. Please log in again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="change-password">
      <Card className="change-password__card">
        <Title level={3} className="change-password__title">Change Password</Title>
        <Text type="secondary" className="change-password__subtitle">
          Please enter your current password and a new one to update.
        </Text>
        <Form form={form} layout="vertical" onFinish={handleFinish} className="change-password__form">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Please enter your old password" }]}
          >
            <Input.Password placeholder="Enter old password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Confirm New Password"
            rules={[{ required: true, message: "Please confirm your new password" }]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="change-password__button">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ChangePasswordCustomer;
