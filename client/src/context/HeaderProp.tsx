import { Link } from "react-router-dom";
import TextAnimation from "../component/Animation";
type Header = {
  className?: string;
  AnText: string;
  LinkPath: string;
  LinkText1: string;
  LinkText2: string;
};

const HeaderProp = ({
  AnText,
  className,
  LinkPath,
  LinkText1,
  LinkText2,
}: Header) => {
  return (
    <div className={className}>
      <div className="w-full bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-slate-800 pb-10 flex-col  flex  min-h-[30vh] justify-center items-center text-center">
        <h1>
          {TextAnimation(
            `${AnText}`,
            -22,
            0.2,
            "flex  gap-0.5 flex-wrap",
            "text-[min(10vw,30px)] font-bold"
          )}
        </h1>
        <div className="flex gap-1 flex-wrap">
          <Link to={"/"}>
            <p className=" cursor-pointer font-bold capitalize">{LinkText1}/</p>
          </Link>
          <Link to={`${LinkPath}`}>
            <p className=" cursor-pointer font-bold capitalize text-blue-900">
              {LinkText2}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderProp;
