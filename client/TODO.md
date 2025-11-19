# TODO: Implement Role-Based Authentication and Router

## Step 1: Update Roles Array ✅

- Edit `src/RolesControlle/RolesValue.tsx` to define a roles array with role name, permissions, allowed routes, and default redirect page for each role: admin, manager, teacher, student, guest.

## Step 2: Create ProtectedRoute Component ✅

- Create `src/RolesControlle/ProtectedRoute.tsx` that checks user role against allowed roles, redirects to login or "Not Authorized" if unauthorized.

## Step 3: Create RoleRouter Component ✅

- Create `src/RolesControlle/RoleRouter.tsx` that checks the current user's role and navigates to the default redirect page for that role.

## Step 4: Integrate RoleRouter in App.tsx ✅

- Update `src/App.tsx` to use RoleRouter for automatic redirection after authentication.

## Step 5: Update Route Files ✅

- Ensure Admin.tsx, Customer.tsx, Seller.tsx use the new ProtectedRoute and roles array.

## Step 6: Test and Verify

- Test role-based navigation, unauthorized access blocking, and redirections.
