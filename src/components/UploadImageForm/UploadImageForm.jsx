import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  Upload,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UploadImageForm = () => {
  return (
    <div>
      <div
        style={{
          marginBottom: 50,
          marginTop: 10,
        }}
      >
        <Title level={3}>Upload Image</Title>
      </div>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Select Category">
          <Select>
            <Select.Option value="demo">Category 1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadImageForm;
