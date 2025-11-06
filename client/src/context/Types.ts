import type { ReactElement } from "react";

export type Features = {
  id: number;
  title: string;
  text: string;
  icon: ReactElement;
}[];

export type SocialMedia = {
  icon: ReactElement;
  path: string;
}[];
export type Chiefs = {
  image: string;
  name: string;
  experience: string;
  handle: {
    icon: ReactElement;
    path: string;
  }[];
}[];

export type Footer = {
  title: string;
  link: {
    text: string;
    path: string;
  }[];
}[];

export type ProductProps = {
  _id: number | string;
  deliveryFee: number | string;
  name: string;
  price: number;
  icon: ReactElement;
  offerprice: number;
  category: string;
  image: string;
  description: {}[];
  createdAt: number | string | any;
  updatedAt: number | string | any;
  instock: boolean;
  month?: string;
  year?: string;
}[];

export type Testimonial = {
  image: string;
  name: string;
  icon: ReactElement;
  rating: Number;
  comment: string;
}[];

export type AboutArraysProps = {
  number: string;
  text: string;
}[];

export type FAQsQuestionsProps = {
  question: string;
  answer: string;
};

export type AccountProp = {
  title: string;
  type: string;
};
export type EmptyItemProp = {
  title: string;
  LinkPath: string;
  Text: string;
  icon: ReactElement;
};
export type OrderStatusProp = {
  title: string;
  LinkPath: string;
  icon: ReactElement;
};
export type AddressProp = {
  _id: string | number;
  title: string;
  firstName: string;
  lastName: string;
  country: "Nigeria";
  city: string;
  state: string;
  address: string;
  phone: number | string;
  email: string;
};

export interface InputProp {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  name: string;
  className?: string;
  onChange: (e: any) => void;
}
export interface ZodInputProp {
  type: string;
  label: string;
  placeholder: string;
  value: string | any;
  className?: string;
  error: string | undefined;
}
export interface ZodInputPropNumber {
  label: string;
  placeholder: string;
  value: any;
  className?: string;
  error: string | undefined;
}
export interface OrdersProp {
  _id: string;
  userId: string;
  item: [
    {
      _id: string;
      product: [];
      quantity: number;
    }
  ];
  amount: number;
  payment: string;
  paymentMethod: string;
  status: string;
  address: object | {};
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface TextareaProp {
  row?: number;
  col?: number;
  label: string;
  placeholder: string;
  value: string;
  name: string;
  className?: string;
  onChange: (e: any) => void;
}
export interface zodTextareaProp {
  row?: number;
  col?: number;
  label: string;
  placeholder: string;
  value: string | any;
  error: string | undefined;
  className?: string;
}

export type OPTIONPROP = {
  title: string;
  value: string | number;
};

export interface SelectFieldProp {
  options: OPTIONPROP[];

  label: string;
  value: string;
  name: string;
  className?: string;
  onChange: (e: any) => void;
}
export interface ZodSelectFieldProp {
  options: OPTIONPROP[];
  label: string;
  value: string | object | any;
  error: string | object | any;
  className?: string;
}

export type EventCardsProp = {
  imageUrl: string;
  Title: string;
  comment: string;
};
