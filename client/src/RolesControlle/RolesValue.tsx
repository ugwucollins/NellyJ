import { adminPath, sellerPath } from "../context/UserContext";

const { VITE_SELLERS_ROLE, VITE_USERS_ROLE, VITE_ADMIN_ROLE } = import.meta.env;
export const PersonalRoles = {
  USERS: VITE_USERS_ROLE,
  SELLERS: VITE_SELLERS_ROLE,
  ADMIN: VITE_ADMIN_ROLE,
};

export interface RoleAuth {
  role: string;
  permissions: string[];
  allowedRoutes: string[];
  defaultRedirect: string;
}

export const RolesArray: RoleAuth[] = [
  {
    role: PersonalRoles.ADMIN,
    permissions: [
      "all",
      "manage_users",
      "manage_products",
      "manage_orders",
      "manage_events",
      "manage_contacts",
    ],
    allowedRoutes: [`${adminPath}/*`],
    defaultRedirect: adminPath,
  },
  {
    role: PersonalRoles.SELLERS,
    permissions: [
      "manage_products",
      "manage_orders",
      "manage_contacts",
      "view_dashboard",
    ],
    allowedRoutes: [`${sellerPath}/*`],
    defaultRedirect: sellerPath,
  },
  {
    role: PersonalRoles.USERS,
    permissions: ["view_events", "manage_events", "view_contacts"],
    allowedRoutes: ["/event", "/event/history", "/contact"],
    defaultRedirect: "/event",
  },
  {
    role: PersonalRoles.USERS,
    permissions: ["view_products", "order", "view_profile", "view_wishlist"],
    allowedRoutes: [
      "/",
      "/product",
      "/product/:id",
      "/cart",
      "/profile",
      "/orders",
      "/wishlist",
    ],
    defaultRedirect: "/",
  },
  {
    role: "guest",
    permissions: ["view"],
    allowedRoutes: [
      "/",
      "/product",
      "/product/:id",
      "/about",
      "/contact",
      "/faqs",
      "/auth/*",
    ],
    defaultRedirect: "/",
  },
];
