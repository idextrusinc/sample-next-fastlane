import FastlaneCardComponent from "@/components/fastlaneCardComponent";
import BraintreeContextProvider from "@/context/braintree";

export default function Checkout() {
  
  return (
    <div
      className="w-full h-full flex flex-col gap-10 justify-center items-center"
    >
      Checkout Page
      <BraintreeContextProvider>
        <FastlaneCardComponent />
      </BraintreeContextProvider>
    </div>
  );
}
