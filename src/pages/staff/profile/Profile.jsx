import { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "./index.scss";

function StaffProfile() {
  const [form] = useForm();
  const [id, setId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user ID from local storage
    const account = localStorage.getItem("account");
    if (account) {
      const accountJSON = JSON.parse(account);
      const userId = accountJSON.user.id;
      setId(userId);

      // Fetch user data from the API based on the ID
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`);
          const userData = response.data;
          // Set form fields with the fetched data
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
    <div className="StaffProfile">
      <div className="StaffProfile__title">
        <h2>{editMode ? "UPDATE PROFILE" : "PROFILE"}</h2>
      </div>
      <div className="StaffProfile__content">
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            name="username"
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
          <div className="total__button">
            {editMode ? (
              <>
                <Form.Item>
                  <Button type="default" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
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

export default StaffProfile;
