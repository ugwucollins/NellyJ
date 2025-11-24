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
    permissions: [
      "view_products",
      "view_events",
      "manage_events",
      "view_contacts",
      "order",
      "view_profile",
      "view_wishlist",
    ],
    allowedRoutes: [
      "/",
      "/product",
      "/product/:id",
      "/cart",
      "/cart/address",
      "/profile",
      "/orders",
      "/wishlist",
      "/event",
      "/event",
      "/event/history",
      "/contact",
      "/Track-orders",
      "/track-order/*",
      "/track-order/:id",
    ],
    defaultRedirect: "/product",
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
