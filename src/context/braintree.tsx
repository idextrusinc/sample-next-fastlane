import {
  useBraintreeDeviceDataInstanceQuery,
  useBraintreeQuery,
  useBraintreeToken,
  useFastlaneInstanceQuery,
} from "@/hooks/payment";
import { createContext, useContext } from "react";

export function useBraintreeContext() {
  return useContext(BraintreeContext);
}

interface IBraintreeProviderPropsTypes {
  children: React.ReactNode;
}

export const BraintreeContext = createContext<{
  authorization: string | null;
  braintree: unknown | null;
  fastlane: any | null;
  deviceData: any | null;
  isLoading: boolean;
}>({
  authorization: null,
  braintree: null,
  fastlane: null,
  deviceData: null,
  isLoading: true,
});

export default function BraintreeContextProvider({
  children,
}: IBraintreeProviderPropsTypes) {
  // Get the token based on the current user or guest.
  const { data: tokenData } = useBraintreeToken();
  const authorization = tokenData?.data?.data?.clientToken ?? null;

  const { data: braintree, isLoading: braintreeIsLoading } = useBraintreeQuery({
    authorization,
  });
  const {
    data: braintreeDeviceDataInstance,
    isLoading: braintreeDeviceDataInstanceIsLoading,
  } = useBraintreeDeviceDataInstanceQuery({
    braintreeClientInstance: braintree,
  });

  const { data: fastlane } = useFastlaneInstanceQuery({
    authorization,
    braintreeClient: braintree,
    deviceData: braintreeDeviceDataInstance?.deviceData,
  });

  return (
    <BraintreeContext.Provider
      value={{
        authorization,
        braintree,
        fastlane,
        deviceData: braintreeDeviceDataInstance?.deviceData,
        isLoading: braintreeIsLoading || braintreeDeviceDataInstanceIsLoading,
      }}
    >
      {children}
    </BraintreeContext.Provider>
  );
}
