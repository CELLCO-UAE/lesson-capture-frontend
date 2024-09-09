import { Pagination, Space, Table, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { RiFolderAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCategoryDataMutation,
  useGetCategoryDataQuery,
} from "../../../redux/features/categorySlice/categoryApiSlice";
import { ConfirmationNotify, Notify } from "../../../utilities/toast/toast";
const { Title } = Typography;

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const CategoryList = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);

  const { data: categoryListData } = useGetCategoryDataQuery(
    {
      offset: current,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // -----------delete api---------------
  const [deleteCategoryData, { isSuccess, isError }] =
    useDeleteCategoryDataMutation();

  const handleCategoryDelete = async (id) => {
    const response = await ConfirmationNotify({
      title: "Are your sure?",
      text: "Please confirm if you want to delete this category.",
    });
    if (response.isConfirmed) {
      await deleteCategoryData(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Notify({ message: "Category is deleted successfully!" });
    }
    if (isError) {
      Notify({
        icon: "error",
        message: "Failed!",
      });
    }
  }, [isSuccess, isError]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <a onClick={() => handleCategoryDelete(record?.id)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const data = categoryListData?.results?.map((category) => {
    return {
      name: category?.name,
      description: category?.description,
      id: category?.id,
    };
  });

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
        }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "2rem",
          }}
        >
          Category List
        </Title>
        <Tooltip title="Add Category">
          <RiFolderAddLine
            style={{
              fontSize: "2rem",
              color: "#10BCE4",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/create_category", {
                state: { from_create_category: true },
              })
            }
          />
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["none"],
        }}
      />
      <Pagination
        current={current}
        onChange={onChange}
        total={categoryListData?.count}
        align="end"
        responsive
        style={{
          margin: "1.5rem 0",
        }}
      />
    </div>
  );
};

export default CategoryList;
