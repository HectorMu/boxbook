import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import StatusRoutes from "./status.routes";
import BookRoutes from "./book.routes";

const Routes = {
  dev: [...AuthRoutes, ...UserRoutes.dev],
  production: [
    ...AuthRoutes,
    ...UserRoutes.production,
    ...StatusRoutes,
    ...BookRoutes.production,
  ],
};

export default Routes;
