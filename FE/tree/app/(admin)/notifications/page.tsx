// import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { UserTable } from "./components/userTable";
import User from "@/types/user";

// app/(admin)/page.tsx
export default function notificationPage() {
  // const [data, setData] = useState<User[]>([])

  return (
    <div className="scrollbar">
      <div className="flex justify-between item-center mb-4">
        <h1 className="text-xl font-bold">Quản lý thông báo</h1>
        <Button variant="destructive" className="rounded-xs text-red-200">
          Them Thông báo
        </Button>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ad vel
        magnam quod temporibus non cupiditate asperiores maiores. Ducimus non
        pariatur veniam soluta earum animi enim odio veritatis consequatur
        consequuntur!
      </div>

      {/* <UserTable data={data} onEdit={handleEdit} onDelete={handleEdit} /> */}
    </div>
  );
}
