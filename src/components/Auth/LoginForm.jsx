import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { usePostLoginCredentialsMutation } from "../../redux/features/authSlice/authApiSlice";
import { Notify } from "../../utilities/toast/toast";
const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const [postLoginCredentials] = usePostLoginCredentialsMutation();

  const onFinish = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await postLoginCredentials(data);

    if (response.data) {
      Cookies.set("authToken", response.data.access, { expires: 7 });

      Notify({ message: "Logged in successfully!" });
      navigate("/");
    }
    if (response.error) {
      Notify({ icon: "error", message: response.error?.data?.detail });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 600,
          //   width: "20%",
        }}
        onFinish={onFinish}
      >
        <Title
          level={3}
          style={{
            marginBottom: 50,
          }}
        >
          {/* Login into your account */}
          ALREADY MEMBERS
        </Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="">Forgot password</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          or <Link to="/register">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
