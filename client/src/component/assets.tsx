import { lazy } from "react";
import { BsTwitter } from "react-icons/bs";
const BsBoxSeam = lazy(() => import("./BoxIcon"));
import { CiWallet } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import type {
  AboutArraysProps,
  AccountProp,
  AddressProp,
  Chiefs,
  FAQsQuestionsProps,
  Features,
  Footer,
  OPTIONPROP,
  ProductProps,
  SocialMedia,
  Testimonial,
} from "../context/Types";
const FaStar = lazy(() => import("../context/stars/FullSartIcon"));

const Jellofrice1 = "/food_images/jr1.jpeg";
const Jellofrice2 = "/food_images/jr2.jpeg";
const Jellofrice3 = "/food_images/jr3.jpeg";
const Jellofrice4 = "/food_images/jr4.jpeg";
const Jellofrice5 = "/food_images/jr5.jpeg";
const Jellofrice6 = "/food_images/jr6.jpeg";
const Friedfrice1 = "/food_images/fr1.jpeg";
const Friedfrice2 = "/food_images/fr2.jpg";
const Friedfrice3 = "/food_images/fr3.jpeg";
const Friedfrice4 = "/food_images/fr4.jpeg";
const Mixedfood1 = "/food_images/m1.jpeg";
const Mixedfood2 = "/food_images/m2.jpeg";
const Mixedfood3 = "/food_images/m7.jpg";
const Mixedfood4 = "/food_images/m4.jpg";
const Mixedfood5 = "/food_images/m5.jpg";
const Mixedfood6 = "/food_images/m6.jpg";
const Client1 = "/food_images/cl1.avif";
const Client2 = "/food_images/cl2.avif";
const Client3 = "/food_images/cl3.avif";
const Client5 = "/food_images/cu3.avif";
const Client4 = "/food_images/cl4.avif";
const EgusiSoup = "/food_images/se.jpeg";
const EgusiSoup1 = "/food_images/se1.jpg";
const discount1 = "/food_image/sd1.png";
const discount2 = "/food_image/sd2.png";
const EgusiSoup2 = "/food_images/se2.jpeg";
const EgusiSoup3 = "/food_images/se3.jpeg";
const EgusiSoup4 = "/food_images/se4.jpeg";
const OkoroSoup1 = "/food_images/so1.jpeg";
const WhiteRice = "/food_images/wr.jpeg";
const order = "/food_images/order.jpeg";
const WhiteRice2 = "/food_images/wr2.jpeg";
const WhiteRice3 = "/food_images/wr3.jpeg";
const WhiteRice4 = "/food_images/wr4.jpg";
const WhiteRice5 = "/food_images/wr5.jpeg";
const WhiteRice1 = "/food_images/wr1.jpeg";
const background = "/food_images/b1.jpg";
const background2 = "/food_images/b2.jpg";
const Noddles1 = "/food_images/n1.jpg";
const Noddles2 = "/food_images/n2.jpg";
const Logo1 = "/food_images/logo2.jpg";
const Logo2 = "/food_images/logo.jpg";
const Avater = "/food_images/avater.jpeg";
const venu1 = "/food_images/v1.jpg";
const chiefs_f1 = "/food_images/cf1.jpg";
const chiefs_f2 = "/food_images/cf2.jpg";
const chiefs_f3 = "/food_images/cf3.jpg";
const chiefs_f4 = "/food_images/cf4.jpg";
const chiefs_m = "/food_images/cm.jpg";
const chiefs_m1 = "/food_images/cm1.jpg";
const chiefs_m2 = "/food_images/cm2.jpg";
const chiefs_m3 = "/food_images/cm3.jpg";
const chiefs_m4 = "/food_images/cm4.jpg";
const chiefs_m5 = "/food_images/cm5.jpg";
const chiefs_m6 = "/food_images/cm6.jpg";
const chiefs_m7 = "/food_images/cm7.jpg";
const chiefs_m8 = "/food_images/cm8.jpg";
const background_Home1 = "/food_images/bg-a.jpg";
const background_Home2 = "/food_images/bg-a1.jpg";
const venu2 = "/food_images/v2.jpg";
const video = "/food_images/video.mp4";
const eventVideo = "/food_images/eventV.mp4";
const CustomerPhotos = "/food_images/cu.avif";
const CustomerPhotos1 = "/food_images/cu1.avif";
const CustomerPhotos2 = "/food_images/cu2.avif";
const CustomerPhotos3 = "/food_images/cu3.avif";
const comma = "/food_images/comma.png";

export const Assets = {
  comma,
  Avater,
  eventVideo,
  order,
  // clients
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  // felmale Chief
  chiefs_f1,
  chiefs_f2,
  chiefs_f3,
  chiefs_f4,
  // male Chief
  chiefs_m,
  chiefs_m1,
  chiefs_m2,
  chiefs_m3,
  chiefs_m4,
  chiefs_m5,
  chiefs_m6,
  chiefs_m7,
  chiefs_m8,

  background_Home1,
  background_Home2,

  video,
  venu1,
  venu2,
  background,
  discount1,
  discount2,
  background2,

  Jellofrice1,
  Jellofrice2,
  Jellofrice3,
  Jellofrice4,
  Jellofrice5,
  Jellofrice6,

  Friedfrice1,
  Friedfrice2,
  Friedfrice3,
  Friedfrice4,

  Mixedfood1,
  Mixedfood2,
  Mixedfood3,
  Mixedfood4,
  Mixedfood5,
  Mixedfood6,

  EgusiSoup,
  EgusiSoup1,
  EgusiSoup2,
  EgusiSoup3,
  EgusiSoup4,

  OkoroSoup1,

  WhiteRice,
  WhiteRice1,
  WhiteRice2,
  WhiteRice3,
  WhiteRice4,
  WhiteRice5,

  Noddles1,
  Noddles2,

  Logo1,
  Logo2,

  CustomerPhotos,
  CustomerPhotos1,
  CustomerPhotos2,
  CustomerPhotos3,
};

export const Products: ProductProps = [
  {
    _id: "1",
    name: "Jellof Rice",
    price: 200,
    deliveryFee: 700,
    offerprice: 150,
    category: "rice",

    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    image: Assets.Jellofrice1,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
    month: "march",
    year: "2023",
  },
  {
    _id: "2",
    name: "Jellof Rice",
    price: 200,
    offerprice: 150,
    deliveryFee: 1000,
    month: "June",
    year: "2024",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    category: "soup",
    image: Assets.Jellofrice2,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
  },
  {
    _id: "3",
    name: "Jellof Rice",
    price: 2000,
    offerprice: 150,
    month: "may",
    year: "2025",
    deliveryFee: 700,

    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    category: "noddle",
    image: Assets.Jellofrice3,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
  },
  {
    _id: "4",
    name: "Jellof Rice",
    price: 200,
    offerprice: 150,
    month: "july",
    year: "2023",
    deliveryFee: 1500,

    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    category: "soup",
    image: Assets.Jellofrice4,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
  },
  {
    _id: "5",
    name: "Jellof Rice",
    price: 5000,
    offerprice: 150,
    deliveryFee: 700,
    month: "may",
    year: "2024",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    category: "local_food",
    image: Assets.Jellofrice1,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
  },
  {
    _id: "6",
    name: "Jellof Rice",
    price: 200,
    offerprice: 150,
    deliveryFee: 1000,
    month: "june",
    year: "2023",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    category: "noddle",
    image: Assets.Jellofrice5,
    description: [
      "Fresh and Organic",
      "Rich in Carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    instock: true,
  },
];

export const Category = [
  { _id: 5, title: "All", path: "" },
  { _id: 1, title: "Rice", path: "rice" },
  { _id: 2, title: "Soup", path: "soup" },
  { _id: 3, title: "Noddles", path: "noddle" },
  { _id: 4, title: "Local-Food", path: "local_food" },
];

export const DummyAddress: AddressProp[] = [
  {
    _id: 5,
    title: "Main Address",
    firstName: "Collins",
    lastName: "Ugwu",
    country: "Nigeria",
    city: "Owerri",
    state: "Imo State",
    address: "No 6,Dr sorebe Street",
    phone: "08101245121",
    email: "ugwucollins07@gmail.com",
  },
  {
    _id: 1,
    title: "Shop Addresss",
    firstName: "Collins",
    lastName: "Ugwu",
    country: "Nigeria",
    city: "Owerri",
    state: "Imo State",
    address: "No 6,Dr sorebe Street",
    phone: "08101245121",
    email: "ugwucollins07@gmail.com",
  },
];

export const DummyOrder = [
  {
    _id: "gvdgs58346",
    userId: "2",
    item: [
      {
        _id: "1",
        product: Products[0],
        quantity: 2,
      },
    ],
    amount: 200,
    payment: "card",
    paymentMethod: "Online",
    status: "order placed",
    address: DummyAddress[0],
    isPaid: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "1gvdgs58346ddjlw",
    userId: "2",
    item: [
      {
        _id: "1",
        product: Products[2],
        quantity: 4,
      },
      {
        _id: "1",
        product: Products[5],
        quantity: 1,
      },
    ],
    amount: 3000,
    payment: "card",
    address: DummyAddress[0],

    paymentMethod: "Online",
    isPaid: true,
    status: "on the way",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "gvdgs58346;wd",
    userId: "2",
    item: [
      {
        _id: "1",
        product: Products[0],
        quantity: 2,
      },
      {
        _id: "1",
        product: Products[1],
        quantity: 2,
      },
      {
        _id: "1",
        product: Products[5],
        quantity: 4,
      },
    ],
    amount: 12000,
    address: DummyAddress[0],

    payment: "card",
    paymentMethod: "COD",
    isPaid: false,
    status: "Delivered",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: "gvdgs58346;wdhh",
    userId: "2",
    item: [
      {
        _id: "1",
        product: Products[1],
        quantity: 2,
      },
      {
        _id: "1",
        product: Products[5],
        quantity: 4,
      },
    ],
    amount: 12000,
    payment: "card",
    paymentMethod: "COD",
    isPaid: false,
    address: DummyAddress[1],
    status: "accepted",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const Account: AccountProp[] = [
  { title: "Personal Information", type: "account" },
  { title: "Manage Address", type: "address" },
  { title: "Payment Method", type: "payment" },
  { title: "My Orders", type: "orders" },
  { title: "Password Manager", type: "password" },
  { title: "Logout", type: "logout" },
];
export const AccountType = {
  Personal_Account: "account",
  Manage_Address: "address",
  Payment_Method: "payment",
  Password_Manager: "password",
  My_Orders: "orders",
  Logout: "logout",
};
export const Menus = [
  { title: "Home", path: "/" },
  { title: "Menu", path: "/product" },
  { title: "About Us", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Event", path: "/event" },
];

export const FeatureArray: Features = [
  {
    id: 1,
    title: "Free shipping",
    text: `Free shipping for order above ₦ 10,000`,
    icon: <BsBoxSeam />,
  },
  {
    id: 2,
    title: "Flexible payment",
    text: `Multiple secure payment options`,
    icon: <CiWallet />,
  },
  {
    id: 3,
    title: "24x7 support",
    text: `We support online all days 24/7`,
    icon: <BiSupport />,
  },
  {
    id: 4,
    title: "Flexible payment",
    text: `Multiple secure payment options`,
    icon: <CiWallet />,
  },
];
export const KeyFeatures = [
  "fresh ingredients",
  "Light and Healthy",
  "Aromatic Herbs and Speices ingredients",
  "Street Food Culture",
  "Always Testhy",
];

export const FooterLink: Footer = [
  {
    title: "Company",
    link: [
      { text: "Home", path: "/" },
      { text: "Menu", path: "/product" },
      { text: "About Us", path: "/about" },
      { text: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Customer Services",
    link: [
      { text: "My Account", path: "/profile" },
      { text: "Track Your Orders", path: "/orders" },
      { text: "Return", path: "/" },
      { text: "FAQs", path: "/faqs" },
    ],
  },
  {
    title: "Our Information",
    link: [
      { text: "Privacy", path: "/" },
      { text: "User Terms & Condition", path: "" },
      { text: "Return Privacy", path: "/" },
      { text: "WishList & Saved", path: "/wishlist" },
    ],
  },
  {
    title: "Contact Info",
    link: [
      { text: "+2348107289948", path: "+tel=+234107289948" },
      { text: "Eamil", path: "/contact" },
      { text: "NO 20 enugu east", path: "" },
      { text: "FAQs", path: "/faqs" },
    ],
  },
];

export const SocialMediaIcons: SocialMedia = [
  {
    icon: <FaFacebook />,
    path: "",
  },
  {
    icon: <BsTwitter />,
    path: "/",
  },
  {
    icon: <ImInstagram />,
    path: "",
  },
  {
    icon: <FaWhatsapp />,
    path: "",
  },
];

export const Testimonials: Testimonial = [
  {
    image: Assets.Client1,
    name: "Leslie Alexander",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    rating: 5.5,
    comment:
      "I loved the food and the service was amazing and the price was very affordable and I would recommend this place to anyone looking for a good quality food and service",
  },
  {
    image: Assets.Client2,
    name: "jenny willson",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    rating: 5.0,
    comment:
      "Excellent food and service, the prices are very affordable and the food is delicious and I would recommend this place to anyone looking for a good quality food and service",
  },
  {
    image: Assets.Client5,
    name: "williams willson",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    rating: 5.0,
    comment:
      "Nelly is the best product I have ever used. It is very easy to use and has a great design. I highly recommend it to anyone looking for a reliable and efficient product",
  },
  {
    image: Assets.Client4,
    name: "Johnson lee",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    rating: 5.0,
    comment:
      "Great product, Nelly is the best product I have ever used. It is very easy to use and has a great design. I highly recommend it to anyone looking for a reliable and efficient product",
  },
  {
    image: Assets.Client3,
    name: "Jenifer anderson",
    icon: (
      <>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </>
    ),
    rating: 5.0,
    comment:
      "Nice product, Nelly is the best product I have ever used. It is very easy to use and has a great design. I highly recommend it to anyone looking for a reliable and efficient product",
  },
];

export const chiefsArrays: Chiefs = [
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_m,
    experience: "12 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_f1,
    experience: "12 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_m1,
    experience: "7 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_f2,
    experience: "5 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_m2,
    experience: "10 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_f3,
    experience: "9 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_m3,
    experience: "12 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_f4,
    experience: "9 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Rasalina de willAmson",
    image: Assets.chiefs_m4,
    experience: "3 years experience",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
];

export const AboutArrays: AboutArraysProps = [
  {
    number: "3+",
    text: "Years",
  },
  {
    number: "100+",
    text: "stores",
  },
  {
    number: "1000+",
    text: "customers",
  },
  {
    number: "35+",
    text: "awards",
  },
  {
    number: "98%",
    text: "satisfied",
  },
];

export const Qualitys = [
  {
    icon: Assets.Jellofrice6,
    title: "Best Quality Food",
    word: "Best food and the service  I would recommend this place to anyone looking for a good quality food and service.",
  },
  {
    icon: Assets.Jellofrice2,
    title: "Comfort Driven Design",
    word: "Best food and the service  I would recommend this place to anyone looking for a good quality food and service.",
  },
];

export const TeamsArrays = [
  {
    name: "Ugwu Juliet",
    image: Assets.chiefs_f1,
    role: "[CEO, Resurtant]",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Tony Collins",
    image: Assets.chiefs_m1,
    role: "[Carater]",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },

  {
    name: "Rasalina willAmson",
    image: Assets.chiefs_f2,
    role: "[Carater]",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
  {
    name: "Tony Collins",
    image: Assets.chiefs_m2,
    role: "[Carater]",
    handle: [
      { icon: <FaFacebook />, path: "" },
      { icon: <ImInstagram />, path: "" },
      { icon: <BsTwitter />, path: "" },
      { icon: <FaWhatsapp />, path: "" },
    ],
  },
];

export const FAQsQuestionsArray: FAQsQuestionsProps[] = [
  {
    question: "How can I place an order?",
    // answer: How can I place an order? for these website
    answer:
      "You can place an order by clicking on the 'Order Now' button on the product page. You will be asked to select the quantity of the product you want to order and the delivery address. Once you have made your selection, click on the 'Place Order' button to complete your order. You will receive an email confirmation with your order details and estimated delivery date. If you have any questions or concerns about your order, you can contact our customer support team for assistance.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we offer customer support through email and phone. You can contact us through the contact page on our website. We are always happy to assist you with any questions or concerns you may have.",
  },
  {
    question: "Can I track my orders after it's been placed?",
    answer:
      " Yes, you can track your orders by logging into your account and navigating to the 'Order History' section. Here, you will be able to view all of your previous orders, including the date, time, and status of each order. You can also edit or cancel your orders if needed. If you have any questions or concerns about your order, you can contact our customer support team for assistance.",
  },
  {
    question: "What is your return policy",
    answer:
      " We offer free returns within 30 days of delivery. If you are not satisfied with your purchase, please contact our customer support team for assistance. We will process your return within 30 days of receiving your returned items. If you have any questions or concerns about your return, please contact our customer support team for assistance.",
  },
  {
    question: "How to Create an Account",
    answer:
      " To create an account, simply visit our website and click on the 'Sign Up' button. Fill out the required information, including your name, email address, and password. Once you have completed the registration process, you will be able to log in to your account and start placing orders. If you have any questions or concerns about creating an account, please contact our customer support team for assistance.",
  },
  {
    question: "How to Update User Details",
    answer:
      " To update your user details, log in to your account and navigate to the 'Account Settings' section. From here, you can update your name, email address, and password. If you have any questions or concerns about updating your user details, please contact our customer support team for assistance.",
  },
];

export const NumberOfPeople: OPTIONPROP[] = [
  {
    title: "Select No of People",
    value: "",
  },
  {
    title: "100",
    value: 100,
  },
  {
    title: "200",
    value: 200,
  },
  {
    title: "300",
    value: 300,
  },
  {
    title: "400",
    value: 400,
  },
  {
    title: "500",
    value: 500,
  },
  {
    title: "1000",
    value: 1000,
  },
  {
    title: "1500",
    value: 1500,
  },
  {
    title: "2000",
    value: 2000,
  },
  {
    title: "5,000",
    value: 5000,
  },
  {
    title: "10,000",
    value: 10000,
  },
  {
    title: "15,000",
    value: 15000,
  },
  {
    title: "20,000",
    value: 20000,
  },
  {
    title: "25,000",
    value: 25000,
  },
  {
    title: "30,000",
    value: 30000,
  },
  {
    title: "Others,Specify",
    value: +"others",
  },
];
1;

export const States: OPTIONPROP[] = [
  {
    title: "Select States",
    value: "",
  },
  {
    title: "Abia",
    value: "Abia",
  },
  {
    title: "Adamawa",
    value: "Adamawa",
  },
  {
    title: "Akwa Ibom",
    value: "Akwa Ibom",
  },
  {
    title: "Anambra",
    value: "Anambra",
  },
  {
    title: "Bauchi",
    value: "Bauchi",
  },
  {
    title: "Bayelsa",
    value: "Bayelsa",
  },
  {
    title: "Benue",
    value: "Benue",
  },
  {
    title: "Borno",
    value: "Borno",
  },
  {
    title: "Cross River",
    value: "Cross River",
  },
  {
    title: "Delta",
    value: "Delta",
  },
  {
    title: "Ebonyi",
    value: "Ebonyi",
  },
  {
    title: "Edo",
    value: "Edo",
  },
  {
    title: "Ekiti",
    value: "Ekiti",
  },
  {
    title: "Enugu",
    value: "Enugu",
  },
  {
    title: "Federal Capital Territory",
    value: "Federal Capital Territory",
  },
  {
    title: "Gombe",
    value: "Gombe",
  },
  {
    title: "Imo",
    value: "Imo",
  },
  {
    title: "Jigawa",
    value: "Jigawa",
  },
  {
    title: "Kaduna",
    value: "Kaduna",
  },
  {
    title: "Kano",
    value: "Kano",
  },
  {
    title: "Katsina",
    value: "Katsina",
  },
  {
    title: "Kebbi",
    value: "Kebbi",
  },
  {
    title: "Kogi",
    value: "Kogi",
  },
  {
    title: "Kwara",
    value: "Kwara",
  },
  {
    title: "Lagos",
    value: "Lagos",
  },
  {
    title: "Nasarawa",
    value: "Nasarawa",
  },
  {
    title: "Niger",
    value: "Niger",
  },
  {
    title: "Ogun",
    value: "Ogun",
  },
  {
    title: "Ondo",
    value: "Ondo",
  },
  {
    title: "Osun",
    value: "Osun",
  },
  {
    title: "Oyo",
    value: "Oyo",
  },
  {
    title: "Plateau",
    value: "Plateau",
  },
  {
    title: "Rivers",
    value: "Rivers",
  },
  {
    title: "Sokoto",
    value: "Sokoto",
  },
  {
    title: "Taraba",
    value: "Taraba",
  },
  {
    title: "Yobe",
    value: "Yobe",
  },
  {
    title: "Zamfara",
    value: "Zamfara",
  },
];

export const FoodOptions: OPTIONPROP[] = [
  {
    title: "Jollof Rice",
    value: "Jollof Rice",
  },

  {
    title: "Egusi Soup",
    value: "Egusi Soup",
  },
  {
    title: " Salad",
    value: " Salad",
  },
  {
    title: "white Rice and Stew",
    value: "white Rice and Stew",
  },
  {
    title: " Noodle",
    value: " Noodle",
  },
  {
    title: " Fried Rice",
    value: " Fried Rice",
  },
  {
    title: " okoro soup",
    value: "okoro soup",
  },
  {
    title: "  Bitter Leaf Soup",
    value: "  Bitter Leaf Soup",
  },
  {
    title: "Ora soup",
    value: "Ora soup",
  },
  {
    title: "Abacha",
    value: "Abacha",
  },
];
export const Countries: OPTIONPROP[] = [
  {
    title: "Select Country",
    value: "",
  },
  {
    title: "Nigeria",
    value: "Nigeria",
  },
  {
    title: "Ghana",
    value: "Ghana",
  },
  {
    title: "United States",
    value: "United States",
  },
  {
    title: "United Kingdom",
    value: "United Kingdom",
  },
  {
    title: "Canada",
    value: "Canada",
  },
  {
    title: "Australia",
    value: "Australia",
  },
  {
    title: "Germany",
    value: "Germany",
  },
  {
    title: "France",
    value: "France",
  },
  {
    title: "United Arab Emirates",
    value: "United Arab Emirates",
  },
  {
    title: "Japan",
    value: "Japan",
  },
  {
    title: "South Korea",
    value: "South Korea",
  },
  {
    title: "China",
    value: "China",
  },
  {
    title: "India",
    value: "India",
  },
  {
    title: "Russia",
    value: "Russia",
  },
];
export const Events: OPTIONPROP[] = [
  { title: "Select Event", value: "" },
  { title: "Birthday", value: "Birthday Party" },
  { title: "Burial", value: "Burial ceremony" },
  { title: "Anniversary", value: "Anniversary Party" },
  { title: "Meeting", value: "Meeting" },
  { title: "Wedding", value: "Wedding ceremony" },
  { title: "Graduation", value: "Graduation ceremony" },
  { title: "Baby Shower", value: "Baby Shower" },
  { title: "Get-Together", value: "Get-Together" },
  { title: "others", value: "others" },
];

export const Days: OPTIONPROP[] = [
  { title: "day", value: "" },
  { title: "01", value: "01" },
  { title: "02", value: "02" },
  { title: "03", value: "03" },
  { title: "04", value: "04" },
  { title: "05", value: "05" },
  { title: "06", value: "06" },
  { title: "07", value: "07" },
  { title: "08", value: "08" },
  { title: "09", value: "09" },
  { title: "10", value: "10" },
  { title: "11", value: "11" },
  { title: "12", value: "12" },
  { title: "13", value: "13" },
  { title: "14", value: "14" },
  { title: "15", value: "15" },
  { title: "16", value: "16" },
  { title: "17", value: "17" },
  { title: "18", value: "18" },
  { title: "19", value: "19" },
  { title: "20", value: "20" },
  { title: "21", value: "21" },
  { title: "22", value: "22" },
  { title: "23", value: "23" },
  { title: "24", value: "24" },
  { title: "25", value: "25" },
  { title: "26", value: "26" },
  { title: "27", value: "27" },
  { title: "28", value: "28" },
  { title: "29", value: "29" },
  { title: "30", value: "30" },
  { title: "31", value: "31" },
];
export const Months: OPTIONPROP[] = [
  { title: "Month", value: "" },
  { title: "January", value: "January" },
  { title: "February", value: "February" },
  { title: "March", value: "March" },
  { title: "April", value: "April" },
  { title: "May", value: "May" },
  { title: "June", value: "June" },
  { title: "July", value: "July" },
  { title: "August", value: "August" },
  { title: "September", value: "September" },
  { title: "October", value: "October" },
  { title: "November", value: "November" },
  { title: "December", value: "December" },
];
export const Years: OPTIONPROP[] = [
  { title: "Year", value: "" },
  { title: "2025", value: "2025" },
  { title: "2026", value: "2026" },
  { title: "2027", value: "2027" },
  { title: "2028", value: "2028" },
  { title: "2029", value: "2029" },
  { title: "2030", value: "2030" },
  { title: "2031", value: "2031" },
  { title: "2032", value: "2032" },
  { title: "2033", value: "2033" },
  { title: "2034", value: "2034" },
  { title: "2035", value: "2035" },
  { title: "2036", value: "2036" },
  { title: "2037", value: "2037" },
  { title: "2038", value: "2038" },
  { title: "2039", value: "2039" },
  { title: "2040", value: "2040" },
];

export const EventsCheck = {
  Birthday: "Birthday Party",
  Burial: "Burial ceremony",
  Anniversary: "Anniversary Party",
  Meeting: "Meeting",
  Wedding: "Wedding ceremony",
  Graduation: "Graduation ceremony",
  Baby_Shower: "Baby Shower",
  Get_Together: "Get-Together",
  others: "others",
};
