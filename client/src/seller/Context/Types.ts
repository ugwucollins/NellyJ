import type { ReactElement } from "react";

export type SidebarProp = {
  icon: ReactElement;
  path: string;
  Title: string;
};

export type CardProp = {
  Title: string;
  value: string | number;
  icon: ReactElement;
  pen?: string;
  color: string;
  path?: string;
  index?: number;
};
export type AddCardProp = {
  Title: string;
  text: string;
  btnText: string;
  icon: ReactElement;
  color: string;
  path?: string;
  className?: string;
  index?: number;
};
