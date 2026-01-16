import { useEffect, useState } from "react";
import HeaderProp from "../../context/HeaderProp";
import { adminPath, UserAuth } from "../../context/UserContext";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";
import { Social } from "./AdminChiefsCard";
import { buttonClassName } from "../../component/Animation";
import Modal from "../../context/Modal";
import { GiCook } from "react-icons/gi";
import { ModelForm } from "../sellers/CreateSeller";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterChiefSchema } from "../../Zod/Schema/RegisterSchema";
import { useNavigate, useParams } from "react-router-dom";
import { UserAdminAuth } from "../context/AdminContext";
import type { RegisterChiefsField } from "../../Zod/typesField";
import ApiURL from "../../context/Api";
import SelectField, { ZodSelectField } from "../../context/SelectField";
import { roleValue, socialClass, statusValue } from "./ChiefsForm";
import InputField, { ZodInputField } from "../../context/InputField";
import { BiLoaderCircle } from "react-icons/bi";
import { LogoIcon } from "../../component/Navbar";

const TeamsDetails = () => {
  const { id } = useParams();
  const { options }: any = UserAuth();
  const [userInfo, setUserInfo] = useState({});
  async function getTeamInfo() {
    try {
      const res = await ApiURL.get("/v1/teams/get/" + id, options);
      const data = res.data;

      if (data.success) {
        setUserInfo(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getTeamInfo();
  }, []);

  return (
    <div>
      <>
        <Navbar />
        <div className="w-full flex mt-[68px] max-sm:mt-0">
          <Sidebar />
          <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
            <div className="w-full sticky top-0 z-[1]">
              <HeaderProp
                LinkText1="Home"
                LinkText2="Teams/Members Details"
                AnText="All Teams/Members"
                LinkPath={adminPath + "/teams"}
              />
            </div>
            <TeamsInfo id={id} userInfo={userInfo} />
          </div>
        </div>
      </>
    </div>
  );
};

export default TeamsDetails;

export const TeamsInfo = ({ id, userInfo }: any) => {
  const [indexIcon, setIndexIcon] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { options }: any = UserAuth();
  const { GetAllTeams }: any = UserAdminAuth();
  const router = useNavigate();
  function handleClose() {
    setOpen(!open);
  }
  function handleCloseEdit() {
    setOpenEdit(!openEdit);
  }
  async function handleP() {
    setOpen(!open);
    const res = await ApiURL.put(
      `/v1/teams/update/${id}`,
      { status: usersStatus.no },
      options
    );

    const data = res.data;

    if (data.success) {
      setTimeout(() => {
        toast.success(data.message, { id: "signUp" });
      }, 100);
      router(adminPath + "/teams", { replace: true });
      GetAllTeams();
      setOpen(false);
    } else {
      toast.error(data.message);
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center py-5 text-center">
        <div>
          <h1 className=" py-1 font-semibold">Our Team</h1>
          <div className="relative bg-white/95 backdrop-blur-md border border-gray-200 shadow-md drop-shadow-md rounded-lg">
            <div
              className={`size-4 rounded-full ${
                userInfo?.status === usersStatus.yes
                  ? "bg-green-800"
                  : "bg-yellow-800"
              } shadow drop-shadow absolute max-sm:block hidden top-1 right-1.5 backdrop-blur`}
            />
            <div className="flex flex-row  gap-4 max-md:flex-col max-md:p-5 p-4 ">
              <div>
                <img
                  src={userInfo?.imageUrl}
                  alt={userInfo?.name}
                  loading="lazy"
                  className="h-[400px] w-[250px] max-md:size-[220px] object-cover rounded-md max-md:rounded-full ring-2 ring-yellow-800"
                />
              </div>
              <div className="relative p-4 max-lg:min-w-[350px] max-sm:w-auto max-md:min-w-max">
                <div />
                <div
                  className={`w-auto px-3 py-1.5 rounded-full ${
                    userInfo?.status === usersStatus.yes
                      ? "bg-green-800"
                      : "bg-yellow-800"
                  } shadow drop-shadow absolute top-0 right-0 backdrop-blur lowercase text-white font-semibold text-sm max-md:hidden`}
                >
                  {userInfo?.status}
                </div>
                <div>
                  <div>
                    <div className="pt-6 text-left max-md:text-center">
                      <h1 className="font-bold uppercase">{userInfo?.name}</h1>
                      <div className="max-md:text-center text-left">
                        <p className="opacity-80">{userInfo?.name}</p>
                        <span className="opacity-80 font-semibold">
                          {userInfo?.experience === 1
                            ? userInfo?.experience + " Year experience"
                            : userInfo?.experience + " Years experience"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute max-md:relative bottom-1 left-0 w-full">
                    <div className="flex w-full max-sm:flex-wrap items-center gap-2 py-4 justify-center pt-7">
                      {Social.map((list, index: number) => (
                        <div
                          key={index}
                          onClick={() => setIndexIcon(index)}
                          className={`text-xl font-bold  rounded-lg ${
                            indexIcon === index
                              ? "bg-yellow-800 p-3 dark:text-primary1  text-primary1 dark:bg-yellow-800"
                              : "bg-primary1 p-2 dark:bg-primary1/20 dark:text-primary "
                          }`}
                        >
                          {list}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <button
                        onClick={handleCloseEdit}
                        className={`${buttonClassName} disabled:line-through w-full`}
                      >
                        <p>Update</p>
                      </button>
                      <button
                        disabled={userInfo.status === usersStatus.no}
                        onClick={handleClose}
                        className={`${buttonClassName} hover:outline hover:outline-yellow-800 w-full disabled:line-through bg-yellow-800 hover:cursor-pointer hover:text-yellow-800 hover:bg-red-800`}
                      >
                        <p>Delete</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={` rounded h-1 w-full absolute bottom-0 left-0 ${
                userInfo === usersStatus.yes ? "bg-green-800" : "bg-yellow-800"
              }`}
            />
          </div>
        </div>
      </div>

      {open && (
        <div>
          <Modal
            Title={`Are you sure you want to delete ${
              userInfo.name.toString().toLocaleUpperCase().split(" ")[1]
            }  from your Team`}
            Icon={<GiCook />}
            CancelBtn="No"
            Progress={handleP}
            OkayBtn="Yes"
            Cancel={handleClose}
          />
        </div>
      )}

      {openEdit && (
        <ModelForm onClose={handleClose}>
          <TeamsEdit id={id} userInfo={userInfo} />
        </ModelForm>
      )}
    </div>
  );
};

export const TeamsEdit = ({ id, userInfo }: any) => {
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterChiefSchema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      role: userInfo?.role,
      facebook: userInfo?.handle[0],
      instagram: userInfo?.handle[1],
      twitter: userInfo?.handle[2],
      whatsapp: userInfo?.handle[3],
    },
  });
  const { GetAllTeams, setOpen }: any = UserAdminAuth();
  const { options }: any = UserAuth();

  const [status, setStatus] = useState(userInfo?.status || "");
  const [err, setErr] = useState("");
  const [experienceNo, setExperienceNo] = useState<number>(
    userInfo?.experience || 1
  );

  const OnSubmit: SubmitHandler<RegisterChiefsField> = async (info) => {
    const { instagram, name, email, facebook, whatsapp, twitter, role } = info;
    let handleArray;
    handleArray = facebook + "," + instagram + "," + twitter + "," + whatsapp;
    const arr = handleArray.split(",") || handleArray.split("\n");

    const UserData = {
      email: email,
      name: name,
      status: status,
      facebook: facebook,
      instagram: instagram,
      whatsapp: whatsapp,
      twitter: twitter,
      handle: arr,
      experience: experienceNo,
      role: role,
    };
    try {
      if (experienceNo === 0 && status === "") {
        setErr("please enter fill all the inputs");
      } else {
        const res = await ApiURL.put(
          `/v1/teams/update/${id}`,
          UserData,
          options
        );

        const data = res.data;

        if (data.success) {
          setTimeout(() => {
            toast.success(data.message, { id: "signUp" });
            setValue("name", "");
            setValue("email", "");
            setValue("whatsapp", "");
            setValue("facebook", "");
            setValue("instagram", "");
            setValue("twitter", "");
          }, 100);
          router(adminPath + "/teams", { replace: true });
          GetAllTeams();
          setOpen(false);
        } else {
          toast.error(data.message);
          setError("root", {
            message: data.message,
          });
        }
      }
    } catch (error: any) {
      console.log(error);

      const message =
        error.response.data.message || error.message || "Internal Server Error";
      toast.error(message, { id: "signUpError" });
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center z-[1] bg-transparent max-sm:py-4 text-black dark:text-black  p-4 pt-8">
      <div>
        <div className="w-full justify-center pb-2 flex items-center">
          <LogoIcon />
        </div>

        <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
          Edit a Worker
        </h1>
        <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
          Please fill your details to access your account
        </p>

        <div className="w-full pt-4 ">
          <form
            onSubmit={handleSubmit(OnSubmit)}
            className=" max-sm:w-full text-black dark:text-white"
          >
            <div className="flex w-full flex-col gap-y-4 py-4 text-black dark:text-black">
              <ZodInputField
                label="FullName*"
                type="text"
                placeholder="Ex. John"
                value={register("name")}
                error={errors.name?.message}
              />
              <ZodInputField
                label="email*"
                type="email"
                placeholder="Enter email Address"
                value={register("email")}
                error={errors.email?.message}
              />

              <ZodSelectField
                options={roleValue}
                label="Role"
                value={register("role")}
                error={errors.role?.message}
              />
              <SelectField
                label="status"
                options={statusValue}
                name="status"
                value={status.toString()}
                onChange={(e) => setStatus(e.target.value)}
              />

              <InputField
                label="Years of experience*"
                type="number"
                name="experience"
                placeholder="Enter No of experience"
                value={experienceNo.toString()}
                onChange={(e) => setExperienceNo(e.target.value)}
              />

              {err && (
                <p className="text-red-600 text-sm font-semibold pl-2">{err}</p>
              )}
            </div>

            <h1 className="font-bold underline pb-3 capitalize text-left">
              socialMedia handles*
            </h1>

            <div className="w-full text-black dark:text-black flex flex-row gap-4 pb-2 max-[370px]:flex-col">
              <ZodInputField
                label="Instagram*"
                type="text"
                placeholder="https://Instagram.dev/link/"
                value={register("instagram")}
                className={socialClass}
                error={errors.instagram?.message}
              />
              <ZodInputField
                label="Facebook*"
                className={socialClass}
                type="text"
                placeholder="https://facebook.dev/link/"
                value={register("facebook")}
                error={errors.facebook?.message}
              />
            </div>

            <div className="w-full  text-black dark:text-black flex flex-row gap-4 max-[370px]:flex-col">
              <ZodInputField
                label="Twitter*"
                type="text"
                placeholder="https://twitter.dev/link/"
                value={register("twitter")}
                className={socialClass}
                error={errors.twitter?.message}
              />
              <ZodInputField
                label="WhatsApp*"
                type="text"
                placeholder="08101245121"
                value={register("whatsapp")}
                className={socialClass}
                error={errors.whatsapp?.message}
              />
            </div>

            <div className="w-full my-1 text-left">
              {errors.root && (
                <span className="text-base text-left py-2 text-red-500 font-semibold">
                  {errors.root.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-black max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black    dark:hover:text-black text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
            >
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Create/Save</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const usersStatus = {
  yes: import.meta.env.VITE_STATUS_YES,
  no: import.meta.env.VITE_STATUS_NO,
};
