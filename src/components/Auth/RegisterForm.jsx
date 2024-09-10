import {
  Button,
  Checkbox,
  Form,
  Grid,
  Image,
  Input,
  Select,
  Typography,
} from "antd";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/scanmate.svg";
import {
  usePostLoginCredentialsMutation,
  usePostUserCredentialsMutation,
} from "../../redux/features/authSlice/authApiSlice";
import { Notify } from "../../utilities/toast/toast";

const { useBreakpoint } = Grid;

const { Title } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [postUserCredentials] = usePostUserCredentialsMutation();
  const [postLoginCredentials] = usePostLoginCredentialsMutation();

  const onFinish = async (values) => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.email,
      password: values.password,
      phone: values.phone,
    };
    const response = await postUserCredentials(data);

    if (response.data) {
      const loginResponse = await postLoginCredentials({
        username: response.data?.username,
        password: values.password,
      });
      if (loginResponse.data) {
        Cookies.set("authToken", loginResponse.data.access, {
          expires: 7,
        });
        Notify({ message: "Account is created successfully!" });
        navigate("/");
      }
      if (response.error) {
        Notify({
          icon: "error",
          message: "Failed to create an account!",
        });
      }
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="971">+971</Option>
      </Select>
    </Form.Item>
  );

  const handleRegisterData = (e) => {
    console.log(e.target.value);
  };

  return (
    <div
      style={{
        position: screens.xs ? "static" : "relative",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: 20,
          cursor: "pointer",
          padding: 0,
          position: screens.xs ? "static" : "absolute",
          top: screens.sm ? "2rem" : "0",
          left: screens.sm ? "2.5rem" : "0",
          margin: screens.xs ? "1rem 1rem 0 1rem" : "0",
        }}
        onClick={() => navigate("/")}
      >
        <Image src={logo1} preview={false} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "0 1rem",
          marginTop: screens.xs ? "1rem" : "0",
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "971",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Title
            level={3}
            style={{
              marginBottom: 50,
            }}
          >
            CREATE AN ACCOUNT
          </Title>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
            onChange={(e) => handleRegisterData(e)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
            onChange={(e) => handleRegisterData(e)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            onChange={(e) => handleRegisterData(e)}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
            onChange={(e) => handleRegisterData(e)}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            onChange={(e) => handleRegisterData(e)}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            or <Link to="/login">Log in now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegisterForm;
