# TODO: Implement Array-Based Role-Based Authentication

## Tasks

- [x] Update `src/middleware/role.middleware.js`: Fix async/await handling, properly check if any user role is in allowedRoles array, and add role constants (e.g., USER, ADMIN).
- [x] Update `src/model/UserModel.js`: Change default roles from ["2013"] to ["user"] for better semantics.
- [x] Update `src/controller/authFun.js`: Modify Register function to assign roles based on logic (e.g., first registered user gets "admin", subsequent users get "user").
- [x] Test the updated middleware with protected routes to ensure role checking works correctly.
- [x] Ensure MongoDB connection and JWT authentication are functioning properly.

## Notes

- Roles are stored as an array in the UserModel to allow multiple roles per user.
- Middleware now checks if the user's roles array intersects with the allowedRoles array.
- Role constants defined in middleware for consistency.
- Server started successfully with `npm run dev`.
