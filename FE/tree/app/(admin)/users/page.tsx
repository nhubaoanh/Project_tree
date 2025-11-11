// import { useState } from "react";
import { UserTable } from "./components/userTable";
import User from "@/src/types/user";
import { Button } from "antd";

// app/(admin)/page.tsx
export default function userPage() {

  // const [data, setData] = useState<User[]>([])

  return (
    <div className="scrollbar">
      <div className="flex justify-between item-center mb-4">
        <h1 className="text-xl font-bold">Quan ly nguoi dung</h1>
        <Button type="primary" className="rounded-xs text-red-200">
          Them nguoi dung
        </Button>
      </div>

      {/* <UserTable data={data} onEdit={handleEdit} onDelete={handleEdit} /> */}
    </div>
  );
}
