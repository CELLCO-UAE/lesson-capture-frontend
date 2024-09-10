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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetCategoriesNamesQuery } from "../../redux/features/categorySlice/categoryApiSlice";
import { usePostImageGalleryDataMutation } from "../../redux/features/imageGallerySlice/imageGalleryApiSlice";
import { Notify } from "../../utilities/toast/toast";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;

const UploadImageForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const [postImageGalleryData] = usePostImageGalleryDataMutation();
  const [getCategoriesNames, { data: categoryNameList }] =
    useLazyGetCategoriesNamesQuery();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    setFile(e?.fileList[0]);
    return e?.fileList;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);

    if (file) {
      formData.append("image", values.image[0].originFileObj);
    }

    const response = await postImageGalleryData(formData);

    if (response.data) {
      Notify({ message: "Data uploaded successfully!" });
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
        <Title level={3}>Upload Image</Title>
      </div>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Select Category"
          name="category"
          onClick={() => {
            getCategoriesNames();
          }}
          rules={[
            {
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Select>
            {categoryNameList?.map((category) => {
              return (
                <Select.Option key={category?.id} value={category?.id}>
                  {category?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          name="image"
          rules={[
            {
              required: true,
              message: "Please attach an image!",
            },
          ]}
        >
          <Upload
            // action="/upload.do"
            listType="picture-card"
            maxCount={1}
            multiple
          >
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
