import { useEffect, useState } from "react";
import { PiPencilLineBold } from "react-icons/pi";
import { Assets } from "../component/assets";
import { BiUser } from "react-icons/bi";
import ApiURL from "./Api";
import toast from "react-hot-toast";
import { UserAuthInfo } from "../App";
export type Avater = {
  setimageData: any;
  className?: string;
  setImg?: string | any;
};
const Avater = ({ setimageData, className, setImg }: Avater) => {
  const { user }: any = UserAuthInfo();

  const [imgUrl, setImgUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);

  const HandleImages = async (e: any) => {
    setloading(true);
    const file = e.target.files;
    const image = URL.createObjectURL(file[0]);

    const formData = new FormData();
    formData.append("image", file[0]);
    try {
      const res = await ApiURL.post("/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;

      if (data.success) {
        setimageData(data.data);
        console.log("Upload successful:", res.data);
        setImg(data.data.url);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }

    setimageUrl(file);
    setimage(image);
    setTimeout(() => {
      setloading(false);
      setimageData(imageUrl ? imageUrl : file);
    }, 1000);
  };

  useEffect(() => {
    if (user) {
      setImgUrl(user && user.imageUrl);
    }
  }, []);

  return (
    <div
      className={`pb-5 relative w-full max-sm:flex max-sm:justify-center ${className}`}
    >
      <div className="relative w-fit">
        <div
          className={`size-40 relative  rounded-full overflow-hidden ${
            loading ? "ring-neutral-400 ring-2 " : "ring-yellow-800 ring-4 "
          }`}
        >
          {loading ? (
            <>
              <div className="p-4 w-full justify-center items-center bg-yellow-800 flex size-40 text-7xl">
                <BiUser className="animate-bounce p-4 bg-primary shadow-lg shadow-slate-50 drop-shadow rounded-full text-secondary" />
              </div>
            </>
          ) : (
            <img
              src={
                imageUrl.length
                  ? image
                  : imgUrl
                  ? imgUrl
                  : user?.imageUrl || Assets.Avater
              }
              loading="lazy"
              className="object-cover size-full rounded-full"
              alt={user ? user.firstName + "photo" : "Avater photo"}
            />
          )}
        </div>
        <label className="absolute bottom-2 right-2" htmlFor="image">
          <div className="text-lg size-8 p-2 rounded-full ring text-white ring-primary1 cursor-pointer bg-yellow-800">
            <PiPencilLineBold className="bg-transparent" />
          </div>
        </label>
      </div>

      <input
        type="file"
        onChange={HandleImages}
        accept="image*"
        className="hidden"
        id="image"
      />
    </div>
  );
};

export default Avater;
