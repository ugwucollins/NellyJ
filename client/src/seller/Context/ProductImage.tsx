import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { Assets } from "../../component/assets";
import { PiPencilLineBold } from "react-icons/pi";

const ProductImage = ({ setimageData }: any) => {
  const [imageUrl, setimageUrl] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);

  const HandleImages = (e: any) => {
    setloading(true);
    const file = e.target.files;
    const image = URL.createObjectURL(file[0]);
    setimageUrl(file);
    setimage(image);
    setTimeout(() => {
      setloading(false);
      setimageData(imageUrl ? imageUrl : file);
    }, 1000);
  };

  return (
    <div className="pb-5 relative w-full max-sm:flex max-sm:justify-center">
      <div className="relative w-fit">
        <div
          className={`size-40 relative  rounded-xl overflow-hidden ${
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
              src={imageUrl.length ? image : Assets.Friedfrice2}
              className="object-cover size-full rounded"
              alt=""
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
        name="image"
        accept="image*"
        className="hidden"
        id="image"
      />
    </div>
  );
};

export default ProductImage;
