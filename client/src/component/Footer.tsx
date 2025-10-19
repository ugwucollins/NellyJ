import { NavLink } from "react-router-dom";
import { Assets, FooterLink, SocialMediaIcons } from "./assets";
import { DarkModeClass } from "./HomeContent/HomeExportComponent";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div
      className={`min-h-[40vh] w-full relative py-6 bg-yellow-800 text-primary px-20 max-md:px-16 max-sm:px-5 max-[170px]:px-1 ${DarkModeClass} dark:shadow-md shadow-inner h-auto`}
    >
      <FooterContent />
      <div className="flex gap-20 absolute bottom-0 left-0 w-[90%] justify-between z-0 p-10 mx-10 px-20">
        {[1, 2, 3].map((n: number) => (
          <motion.div
            initial={{
              y: -300,
              transition: {
                duration: 0.1,
              },
            }}
            whileInView={{
              y: 50,
              opacity: [0.01, 0.8, 1, 0.5, 0.01],
              scale: [0.3, 0.6, 0.8, 1, 1.1],
              transition: {
                duration: 2.5 * n,
                delay: 0.2 * n,
                repeat: 9999,
                ease: "easeInOut",
              },
            }}
            key={n}
            className="size-[min(20vw,60px)] shadow-lg drop-shadow-lg bg-primary rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;

export const FooterContent = () => {
  return (
    <div className="flex relative z-[1] max-[900px]:flex-wrap gap-y-8 gap-5 items-center w-full">
      <div className="w-full max-w-md max-[900px]:max-w-full px-3">
        <div className="flex gap-2 py-4 items-center">
          <img
            src={Assets.Logo2}
            className="size-[min(10vw,50px)] rounded-full"
            alt="logo"
          />
          <span className="text-[min(3vw,18px)] font-bold">Nelly-J</span>
        </div>
        <p className="font-semibold opacity-80">
          I loved the food and the service was amazing and the price was very
          affordable and I would recommend this place to anyone looking for a
          good quality food and service.
        </p>

        <div className="flex gap-2 flex-wrap py-4 text-xl">
          {SocialMediaIcons.map((icon: any, index: number) => (
            <NavLink key={index} to={icon.path}>
              <div className="p-3 rounded-full bg-primary/15">{icon.icon}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-4 pb-12 max-sm:pb-0 lg:gap-6 flex-wrap items-center px-5 justify-between text-left">
        {FooterLink.map((link) => (
          <div key={link.title}>
            <p className="font-bold py-3 whitespace-nowrap max-[180px]:whitespace-normal">
              {link.title}
            </p>
            <div className="flex w-full flex-col gap-2 justify-center items-start text-left text-balance">
              {link.link.map((path: any) => (
                <NavLink to={path.path} key={path.text} className="opacity-80">
                  {path.text}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
