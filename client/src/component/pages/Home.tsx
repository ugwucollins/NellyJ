import { lazy } from "react";
// import { UserRoleAuth } from "../../RolesControlle/RoleContext";
// import { PersonalRoles } from "../../RolesControlle/RolesValue";
// import { adminPath, sellerPath } from "../../context/UserContext";
const HomeBanner = lazy(() => import("../HomeContent/HomeBanner"));

const Home = () => {
  // const { roles }: any = UserRoleAuth();
  // const AllowedSeller = roles?.find(
  //   (role: any) =>
  //     PersonalRoles.SELLERS.includes(role) ||
  //     PersonalRoles.SELLERS.match(role) ||
  //     PersonalRoles.SELLERS === role
  // );
  // const AllowedAdmin = roles?.find(
  //   (role: any) =>
  //     PersonalRoles.ADMIN.includes(role) ||
  //     PersonalRoles.ADMIN.match(role) ||
  //     PersonalRoles.ADMIN === role
  // );

  // useEffect(() => {
  //   if (AllowedSeller) {
  //     window.location.replace(sellerPath);
  //   }
  //   if (AllowedAdmin) {
  //     window.location.replace(adminPath);
  //   }
  // }, []);

  return (
    <div className="relative w-full">
      <HomeBanner />
    </div>
  );
};

export default Home;
