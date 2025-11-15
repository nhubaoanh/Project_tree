// "use client";
// // import { Table, Tag, Button, Space } from "antd";
// // import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import User from "@/src/types/user";

// interface userTableProps {
//     data: User[];
//     loading? :boolean;
//     onEdit: (user : User) => void;
//     onDelete: (user : User) => void;
//     onRowClick? : (user: User) => void;
// }

// export const UserTable = ({
//     data,
//     loading,
//     onEdit,
//     onDelete,
//     onRowClick
// }: userTableProps) => {
//     const columns = [
//         {title : "Mã dòng họ", dataIndex: "nguoiDungId", key: "nguoiDungId"},
//         {title : "Tên đăng nhập", dataIndex: "tenDangNhap", key: "tenDangNhap"},
//         {title : "Mật khẩu", dataIndex: "matKhau", key: "matKhau"},
//         {title: "Họ tên", dataIndex: "hoTen", key: "hoTen"},
//         {title: "Email", dataIndex: "email", key: "email"},
//         {title: "Sđt", dataIndex: "soDienThoai", key: "soDienThoai"},
//         {title: "Vai trò", dataIndex: "vaiTro", key: "vaiTro"},
//         {title: "Anh đại diện", dataIndex: "anhDaiDien", key: "anhDaiDien"},
//         {title: "Ngày tạo", dataIndex: "ngayTao", key: "ngayTao"},
//         {title: "Người tạo", dataIndex: "nguoiTaoId", key: "nguoiTaoId"},
//         {title: "Action", key: "action",
//             render: (_: any, record: User) => (
//                 <Space>
//                     <Button
//                         type="text"
//                         icon={<EditOutlined />}
//                         onClick={() => onEdit(record)}
//                     />

//                     <Button
//                         type="text"
//                         icon={<DeleteOutlined />}
//                         onClick={() => onDelete(record)}
//                         disabled={record.active_flag === 0}
//                     />
//                 </Space>
//             )
//         }
//     ];

//     return (
//         <Table
//             columns={columns}
//             dataSource={data}
//             loading={loading}
//             rowKey="nguoiDungId"
//             scroll={{y: 420}}
//             onRow={(rerord) => ({
//                 onClick: () => onRowClick?.(rerord)
//             })}
//         />
//     )
// }