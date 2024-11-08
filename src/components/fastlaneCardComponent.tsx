import BraintreeContextProvider, { useBraintreeContext } from "@/context/braintree";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FastlaneCardComponent() {
  const { fastlane } = useBraintreeContext();

  const [fastlaneCardComponent, setFastlaneCardComponent] = useState<any>(null);

  const renderPaymentComponent = async () => {
    if (!fastlane) return;

    if (fastlane?.FastlaneCardComponent) {
      const component = await fastlane?.FastlaneCardComponent({
        fields: {
          enabled: true,
        },
        styles: {
          root: {
            padding: "0px",
            errorColor: "#E23122",
          },
          input: {
            borderRadius: "0px",
          },
        },
      });

      try {
        component.render("#payment-container");
      } catch (error) {
        console.log({ ...error });
      }

      setFastlaneCardComponent(component);
    }
  };

  useEffect(() => {
    renderPaymentComponent();
  }, [fastlane]);

  return (
    <div>
      <div id="payment-container" />
      <Link href="/">Go to Cart</Link>
    </div>
  );
}
