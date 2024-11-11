import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Avatar, Typography, Card, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import './AccountCustomer.css';
const { Title, Text } = Typography;

const AccountCustomer = () => {
  const [form] = useForm();
  const [id, setId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      const accountJSON = JSON.parse(account);
      const userId = accountJSON.user.id;
      setId(userId);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`);
          const userData = response.data;
          form.setFieldsValue({
            username: userData.username,
            email: userData.email,
          });
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, [form]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${id}`, {
        username: values.username,
        email: values.email,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  return (
    <div className="manager-profile">
      <Card className="manager-profile__card">
        <div className="manager-profile__header">
          <Avatar size={80} icon={<UserOutlined />} />
          <Title level={3} className="manager-profile__title">
            {editMode ? "Update Profile" : "User Profile"}
          </Title>
          <Text type="secondary">Manage your account information</Text>
        </div>
        <Divider />
        <Form form={form} layout="vertical" onFinish={handleFinish} className="manager-profile__form">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input disabled={!editMode} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input disabled={!editMode} />
          </Form.Item>
          <div className="manager-profile__actions">
            {editMode ? (
              <>
                <Button type="default" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AccountCustomer;
