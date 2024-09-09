import { Button, DatePicker, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { usePostCategoryDataMutation } from "../../../redux/features/categorySlice/categoryApiSlice";
import { Notify } from "../../../utilities/toast/toast";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateCategory = () => {
  const navigate = useNavigate();

  const [postCategoryData] = usePostCategoryDataMutation();

  const onFinish = async (values) => {
    const data = {
      name: values.categoryName,
      description: values.description,
    };
    const response = await postCategoryData(data);

    if (response.data) {
      Notify({ message: "Category created successfully!" });
      navigate("/");
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 50,
          marginTop: 10,
        }}
      >
        <Title level={3}>Create Category</Title>
      </div>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
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

export default CreateCategory;
