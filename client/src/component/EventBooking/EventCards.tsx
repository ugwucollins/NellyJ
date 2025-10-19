import type { EventCardsProp } from "../../context/Types";
import { Assets } from "../assets";

const EventCards = ({ imageUrl, Title, comment }: EventCardsProp) => {
  return (
    <div>
      <div className="flex outline outline-1 outline-yellow-700 gap-y-2 hover:shadow-md py-4 w-[300px] flex-col justify-center items-center bg-yellow-600/75 dark:outline-white/50 dark:bg-slate-100/30 rounded-lg">
        <div className="size-20 relative rounded-full">
          <img
            src={imageUrl ? imageUrl : Assets.Jellofrice1}
            className="object-cover absolute w-full h-full rounded-full"
            alt="photo"
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="capitalize font-bold text-base">{Title}</h1>
          <p className="text-sm opacity-90">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCards;

export const EventCardInfo: EventCardsProp[] = [
  {
    imageUrl: Assets.Jellofrice3,
    Title: "Fresh bite co.",
    comment: "fresh flavours, fast, always satisfying",
  },
  {
    imageUrl: Assets.Jellofrice2,
    Title: "Tasty Table co.",
    comment: "fresh flavours, for every craving",
  },
  {
    imageUrl: Assets.EgusiSoup2,
    Title: "flavor feast co.",
    comment: "Savor bold flavors, crafted with care.",
  },
  {
    imageUrl: Assets.OkoroSoup1,
    Title: "Ready feast co.",
    comment: "Savor bold flavors, crafted with care.",
  },
];
