// middleware/role.middleware.js
import UserModel from "../model/UserModel.js";
import "dotenv/config";
const { USERS_ROLE, ADMIN_ROLE, SELLERS_ROLE } = process.env;

// Define role constants

export const ROLES = {
  USER: USERS_ROLE,
  ADMIN: ADMIN_ROLE,
  SELLER: SELLERS_ROLE,
};

const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "UserId Does not exist || Not authenticated",
        success: false,
      });
    }

    try {
      const user = await UserModel.findById({ _id: userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      // Check if user has any of the allowed roles

      // const hasRole = user.roles.some(
      //   (role) => role.includes(allowedRoles) || role.match(allowedRoles)
      // );
      const hasRole = user.roles.some((role) => allowedRoles.includes(role));

      if (!hasRole) {
        return res
          .status(403)
          .json({ message: "Access denied", success: false });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
        success: false,
      });
    }
  };
};

export default authorizeRole;
