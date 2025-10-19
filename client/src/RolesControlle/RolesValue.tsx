const { VITE_SELLERS_ROLE, VITE_USERS_ROLE, VITE_ADMIN_ROLE } = import.meta.env;
export const PersonalRoles = {
  USERS: VITE_USERS_ROLE,
  SELLERS: VITE_SELLERS_ROLE,
  ADMIN: VITE_ADMIN_ROLE.toString(),
};
