import { container } from "tsyringe";
import { roleController } from "../controllers/roleController";
import { Router } from "express";
import { authenticate, adminOnly } from "../middlewares/authMiddleware";

const roleRouter = Router();
const controller = container.resolve(roleController);

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

// Lấy tất cả role (cho dropdown)
roleRouter.get("/getAllRole", controller.getAllRole.bind(controller));

// ============================================================================
// PROTECTED ROUTES - Cần đăng nhập
// ============================================================================

// Lấy menu của user đang đăng nhập
roleRouter.get("/my-menu", authenticate, controller.getMyMenu.bind(controller));

// ============================================================================
// ADMIN ONLY ROUTES
// ============================================================================

// CRUD Role
roleRouter.post(
  "/create",
  authenticate,
  adminOnly,
  controller.createRole.bind(controller)
);

roleRouter.put(
  "/:roleId",
  authenticate,
  adminOnly,
  controller.updateRole.bind(controller)
);

roleRouter.delete(
  "/:roleId",
  authenticate,
  adminOnly,
  controller.deleteRole.bind(controller)
);

// Lấy menu theo roleId
roleRouter.get(
  "/menu/:roleId",
  authenticate,
  adminOnly,
  controller.getMenuByRole.bind(controller)
);

// Lấy tất cả chức năng
roleRouter.get(
  "/chucnang",
  authenticate,
  adminOnly,
  controller.getAllChucNang.bind(controller)
);

// Lấy tất cả thao tác
roleRouter.get(
  "/thaotac",
  authenticate,
  adminOnly,
  controller.getAllThaoTac.bind(controller)
);

// Lấy quyền của role
roleRouter.get(
  "/permissions/:roleId",
  authenticate,
  adminOnly,
  controller.getRolePermissions.bind(controller)
);

// Cập nhật quyền cho role
roleRouter.put(
  "/permissions/:roleId",
  authenticate,
  adminOnly,
  controller.updateRolePermissions.bind(controller)
);

export default roleRouter;
