# Family Tree Component - React Flow

## Tổng quan

Component Family Tree đã được tái cấu trúc hoàn toàn sử dụng **React Flow** thay thế cho `@balkangraph/familytree.js`. Giải pháp mới mang lại:

- ✅ Kiểm soát hoàn toàn UI/UX với React components
- ✅ Kéo thả nodes mượt mà, tự nhiên
- ✅ Custom styling dễ dàng với Tailwind CSS
- ✅ Performance tốt hơn với virtual rendering
- ✅ TypeScript support đầy đủ
- ✅ Code dễ maintain và mở rộng

## Cấu trúc files

```
components/ui/tree/
├── FamilyNode.tsx       # Custom node component (thay thế SVG templates)
├── TreeControls.tsx     # Panel điều khiển (search, filter, zoom)
├── layoutUtils.ts       # Layout algorithms với dagre
└── README.md           # File này
```

## Tính năng

### 1. Custom Node Component
- Node được render bằng React component thuần, không còn SVG string phức tạp
- Dễ dàng thay đổi style, thêm tính năng mới
- Responsive và accessible

### 2. Kéo thả tự nhiên
- Kéo thả nodes tự do trên canvas
- Không cần config phức tạp như Balkan FamilyTree
- Smooth animation

### 3. Layout tự động
- Sử dụng dagre algorithm cho hierarchical layout
- Hỗ trợ 4 hướng: Top-Bottom, Bottom-Top, Left-Right, Right-Left
- Tự động tính toán vị trí tối ưu

### 4. Controls đầy đủ
- Search thành viên (highlight kết quả)
- Filter theo thế hệ (đời)
- Zoom in/out, fit view
- Relayout button
- MiniMap overview

### 5. Quan hệ gia đình
- **Edges cha-mẹ → con**: Đường liền, có mũi tên
- **Edges vợ-chồng**: Đường đứt nét màu vàng
- Tự động tránh duplicate edges

## Cách sử dụng

### Import component

```tsx
import { MyFamilyTree } from "@/components/ui/tree";
import { ITreeNode } from "@/types/tree";

const data: ITreeNode[] = [...]; // Data từ API

<MyFamilyTree data={data} />
```

### Data format

```typescript
interface ITreeNode {
  id: number;
  thanhVienId?: number;
  hoTen: string;
  gioiTinh: number; // 1 = Nam, 2 = Nữ
  ngayMat?: string | null;
  ngheNghiep?: string;
  anhChanDung?: string | null;
  doiThuoc?: number; // Thế hệ
  fid?: number; // ID cha
  mid?: number; // ID mẹ
  pids?: number[]; // IDs vợ/chồng
}
```

## So sánh với Balkan FamilyTree

| Tính năng | Balkan (cũ) | React Flow (mới) |
|-----------|-------------|------------------|
| Custom node | SVG string phức tạp | React component |
| Kéo thả | Config rườm rà | Native, mượt mà |
| Styling | CSS override khó | Tailwind CSS dễ |
| TypeScript | Yếu | Đầy đủ |
| Bundle size | ~200KB | ~150KB |
| Learning curve | Cao | Trung bình |
| Maintainability | Khó | Dễ |

## Customization

### Thay đổi màu sắc node

Edit `FamilyNode.tsx`:

```tsx
const bgColor = isDead 
  ? "bg-gray-100" 
  : isMale 
    ? "bg-blue-50"  // Đổi màu nam
    : "bg-pink-50"; // Đổi màu nữ
```

### Thay đổi layout spacing

Edit `layoutUtils.ts`:

```tsx
const options = {
  rankSep: 100,  // Khoảng cách giữa các thế hệ
  nodeSep: 50,   // Khoảng cách giữa các nodes cùng cấp
};
```

### Thêm thông tin vào node

Edit `FamilyNode.tsx` và thêm field mới:

```tsx
<p className="text-xs">{data.customField}</p>
```

## Troubleshooting

### Nodes bị chồng lên nhau
- Tăng `rankSep` và `nodeSep` trong `layoutUtils.ts`
- Click button "Sắp xếp lại" để relayout

### Ảnh không hiển thị
- Kiểm tra `API_BASE_URL` trong `.env`
- Verify đường dẫn ảnh trong database

### Performance chậm với nhiều nodes
- Giảm `maxGen` để hiển thị ít thế hệ hơn
- React Flow tự động optimize với virtual rendering

## Migration từ Balkan

Đã hoàn tất:
- ✅ Uninstall `@balkangraph/familytree.js`
- ✅ Install `reactflow` và `dagre`
- ✅ Xóa `ControlPanel.tsx` và `ToolbarPanel.tsx` cũ
- ✅ Tạo `FamilyNode.tsx`, `TreeControls.tsx`, `layoutUtils.ts`
- ✅ Refactor `tree.tsx` hoàn toàn

## Dependencies

```json
{
  "reactflow": "^11.x",
  "dagre": "^0.8.x",
  "@types/dagre": "^0.7.x"
}
```

## License

MIT
