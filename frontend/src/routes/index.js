import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import StatusRoutes from "./status.routes";

const Routes = {
  dev: [...AuthRoutes, ...UserRoutes.dev],
  production: [...AuthRoutes, ...UserRoutes.production, ...StatusRoutes],
};

export default Routes;
