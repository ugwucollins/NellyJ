import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ApiURL from "../../context/Api";
import { UserAuthInfo } from "../../App";
import { motion } from "framer-motion";
import { buttonClassName } from "../Animation";
import { BiCheckCircle, BiWifiOff, BiXCircle } from "react-icons/bi";
import { UserProduct } from "../../context/ProductContext";
import { production, UserAuth } from "../../context/UserContext";
import Modal from "../../context/Modal";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { user, isOnline }: any = UserAuthInfo();
  const { options }: any = UserAuth();
  const { GetUsersOrders }: any = UserProduct();

  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const reference = searchParams.get("reference");
  const router = useNavigate();
  const localOrder: any = localStorage.getItem("orderT");

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, [user]);

  useEffect(() => {
    if (!reference) {
      setPaymentStatus("Loading");
      return;
    }
    const verifyPayment = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const res = await ApiURL.post(
          "v1/orders/verify-payment?reference=" + reference,
          {
            reference: reference,
            token: JSON.parse(localOrder),
          },
          options
        );
        const data = res.data;
        setPaymentStatus(data?.status);

        if (data.success) {
          setPaymentStatus(data.status);
          setTimeout(() => {
            GetUsersOrders();
            router("/orders", { replace: true });
          }, 2000);
          localStorage.removeItem("payment");
          localStorage.removeItem("res");
          localStorage.removeItem("orderT");
        } else {
          setPaymentStatus(data.status);
          setTimeout(() => {
            router("/cart", { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    verifyPayment();
  }, [reference]);

  function handleP() {
    localStorage.removeItem("payment");
    localStorage.removeItem("res");
    localStorage.removeItem("orderT");
  }

  // create a verifyPayment function with animation
  return (
    <>
      {!isOnline && production && (
        <div>
          <Modal
            Title="No Internet Connection, Please Check Your Internet Connection"
            Icon={<BiWifiOff />}
            CancelBtn="No"
            Progress={handleP}
            OkayBtn="Try Again"
            Cancel={() => alert("Please Check Your Connection")}
          />
        </div>
      )}
      <div className="w-full h-screen bg-white flex text-center justify-center items-center align-middle">
        <div className="w-full max-w-xl rounded-2xl max-sm:max-w-xs bg-slate-100 h-[50vh] max-sm:h-[40vh] hover:scale-105 transition-all shadow-md drop-shadow-md hover:cursor-pointer">
          <div className="flex h-full justify-center items-center text-center flex-col relative">
            {loading ? (
              <div className="flex gap-3 px-4 py-3.5 animate-bounce duration-300 transition-transform">
                {[2, 3, 4].map((item: any, index) => (
                  <motion.div
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transitionBehavior: "normal",
                      scrollBehavior: "smooth",
                    }}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      repeat: 999,
                      opacity: 1,
                      delay: 0.5,
                      duration: 0.5 * index,
                      ease: "easeIn",
                    }}
                    key={item}
                    className="size-6 rounded-full bg-white shadow-md drop-shadow-sm py-0.5 my-1"
                  />
                ))}
              </div>
            ) : (
              <>
                {paymentStatus === "success" ? (
                  <div className="text-[min(70px,30vw)] font-bold text-green-900">
                    <BiCheckCircle />
                  </div>
                ) : (
                  <div className="text-[min(70px,30vw)] font-bold text-red-900">
                    <BiXCircle />
                  </div>
                )}
              </>
            )}

            <h1 className="font-semibold text-lg capitalize">
              {loading
                ? "Payment Verification"
                : paymentStatus === "success"
                ? "Payment Successfully"
                : "Payment Failed"}
            </h1>
            <p className=" font-medium animate-pulse py-1">{paymentStatus}</p>
          </div>

          {!loading && (
            <Link to={paymentStatus === "success" ? "/orders" : "/cart"}>
              <button
                onClick={handleP}
                className={` ${buttonClassName} w-52 mt-4 max-sm:w-full`}
              >
                <p>Done</p>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
