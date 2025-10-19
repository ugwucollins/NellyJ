import { Assets } from "../component/assets";

type AvaterProps = {
  className?: string;
  size?: string;
};

const AvaterImage = ({ className, size }: AvaterProps) => {
  return (
    <div className={`size-${size ? size : "12"} rounded`}>
      <img
        src={Assets.Avater}
        className={` rounded-full ${className}`}
        alt="avater photo"
      />
    </div>
  );
};

export default AvaterImage;
