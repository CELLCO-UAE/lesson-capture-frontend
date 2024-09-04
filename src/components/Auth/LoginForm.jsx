import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
