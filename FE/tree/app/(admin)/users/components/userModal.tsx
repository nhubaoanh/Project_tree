// "use client";

// import { Button, Col, Form, Input, message, Row, Select, Typography } from "antd";
// import { useEffect, useState } from "react";
// import User from "@/src/types/user";
// // import Role from "@/app/types/role";
// // import userService from "@/app/services/user.service";

// interface UserModalProps {
//     isOpen: boolean;
//     onClose : () => void;
//     user? : User | null;
//     onSave : (values : User) => void;
//     loading?: boolean;
// }

// export const UserModal = ({
//     isOpen,
//     onClose,
//     user,
//     onSave,
//     loading = false
// }: UserModalProps) =>{
//   const [form] = Form.useForm<User>();
//   const [roles, setRoles] = useState<Role[]>([]); // 👈 danh sách vai trò

//   const handleSubmit = (values: User) => {
//     if (!values) {
//       message.error("Không có dữ liệu người dùng!");
//       return;
//     }
//     onSave(values);
//   };
//   useEffect(() => {
//     if (user) {
//       form.setFieldsValue({
//         ...user,
//         manv: user.manv,
//         hoten: user.hoten,
//         mavt: user.mavt,
//         sdt: user.sdt,
//         email: user.email,
//         lichlv: user.lichlv,
//         matkhau: user.matkhau,
//       } as any);
//     } else {
//       form.resetFields();
//     }
//     const fetchRoles = async () => {
//       try {
//         const res = await userService.getVaiTro();
//         setRoles(res.data || []);
//       } catch (err) {
//         console.error("Lỗi khi lấy vai trò:", err);
//       }
//     };
//     fetchRoles();
//   }, [user, form, isOpen]);

//   return (
//     <div
//       className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div className="bg-white p-6 rounded-lg w-2/3">
//         <Typography.Title level={4} className="mb-4">
//           {user ? "Cập nhật nhan vien" : "Thêm nhan vien"}
//         </Typography.Title>

//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           {/* cái này nhớ phải nhét thêm mã vào không thì khoogn update được */}
//           <Row gutter={16}>
//             <Col>
//               <Form.Item
//                 name="manv"
//                 // rules={[{ required: true }]}
//                 style={{ display: "none" }}
//               >
//                 <Input type="hidden" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="hoten"
//                 label="Họ tên"
//                 rules={[{ required: true }]}
//               >
//                 <Input placeholder="Nhập tên Nhân viên" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="sdt" label="Số điện thoại">
//                 <Input placeholder="Nhập số điện thoại" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="email" label="Email">
//                 <Input type="email" placeholder="Nhập email" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="lichlv" label="lịch nhân viên">
//                 <Input placeholder="Nhập lịch nhân viên" />
//               </Form.Item>
//             </Col>

//             <Col span={12}>
//               <Form.Item
//                 name="mavt"
//                 label="Vị trí / Vai trò"
//                 rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
//               >
//                 <Select placeholder="Chọn vai trò">
//                   {roles.map((r) => (
//                     <Select.Option key={r.mavt} value={r.mavt}>
//                       {r.tenvt}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item name="matkhau" label="mật khẩu">
//                 <Input placeholder="Nhập mật khẩu" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <div className="flex justify-end gap-2 mt-4">
//             <Button onClick={onClose}>Hủy</Button>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Lưu
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }