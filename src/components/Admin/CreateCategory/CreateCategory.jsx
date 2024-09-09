import { Button, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  usePostCategoryDataMutation,
  useUpdateCategoryDataMutation,
} from "../../../redux/features/categorySlice/categoryApiSlice";
import { useAppSelector } from "../../../redux/hooks";
import { Notify } from "../../../utilities/toast/toast";

const { TextArea } = Input;
const { Title } = Typography;

const CreateCategory = ({ fromEdit = false, open, setOpen }) => {
  const [form] = Form.useForm(); // Initialize the form
  const navigate = useNavigate();

  const [postCategoryData] = usePostCategoryDataMutation();
  const [updateCategoryData] = useUpdateCategoryDataMutation();

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const { selectedCategoryData } = useAppSelector(
    (state) => state.categoryReducer
  );

  useEffect(() => {
    if (fromEdit) {
      form.setFieldsValue({
        name: selectedCategoryData?.name,
        description: selectedCategoryData?.description,
      });
    }
  }, [
    form,
    fromEdit,
    selectedCategoryData?.name,
    selectedCategoryData?.description,
  ]);

  const onFinish = async (values) => {
    const data = {
      name: values.name,
      description: values.description,
    };

    if (fromEdit) {
      const response = await updateCategoryData({
        id: selectedCategoryData?.id,
        data: {
          name: values.name,
          description: values.description,
        },
      });
      if (response?.data) {
        setOpen(!open);
        Notify({ message: "Category Updated successfully!" });
        navigate("/category_list");
      }
    } else {
      const response = await postCategoryData(data);
      if (response?.data) {
        Notify({ message: "Category created successfully!" });
        navigate("/category_list");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: fromEdit ? 40 : 50,
          marginTop: fromEdit ? 0 : 10,
        }}
      >
        <Title level={4}>
          {fromEdit ? "Edit Category" : "Create Category"}
        </Title>
      </div>
      <Form
        form={form} // Associate form instance
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={{
          name: categoryData?.name,
          description: categoryData?.description,
        }}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your category name!",
            },
          ]}
        >
          <Input
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                name: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea
            rows={4}
            placeholder="Max length is 50 characters"
            maxLength={50}
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                description: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 0, span: -1 }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
