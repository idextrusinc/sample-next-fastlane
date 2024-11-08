import { useQuery } from "@tanstack/react-query";
import BraintreeDataCollector from "braintree-web/data-collector";
import BraintreeClient from "braintree-web/client";
import BraintreeFastlane from "braintree-web/fastlane";

export function useBraintreeDeviceDataInstanceQuery({
  braintreeClientInstance,
}: {
  braintreeClientInstance: any;
}) {
  return useQuery(
    ["BRAINTREE-DEVICE-DATA-INSTANCE"],
    async () => {
      const res = await BraintreeDataCollector.create({
        client: braintreeClientInstance,
      });

      return res;
    },
    {
      cacheTime: 0,
      enabled: !!braintreeClientInstance,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}

export function useBraintreeQuery({ authorization }: any) {
  return useQuery(
    ["BRAINTREE-CLIENT-INSTANCE", authorization],
    async () => {
      const res = await BraintreeClient.create({
        authorization,
      });

      return res;
    },
    {
      enabled: !!authorization,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      onError: (error) => {
        console.log(error);
      },
    }
  );
}

export function useBraintreeToken(email?: string | undefined) {
  return useQuery(
    ["CLIENT-TOKEN", email],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate backend fetch

      return {
        data: {
          data: {
            clientToken: "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTXpFeE1UQTRNRGNzSW1wMGFTSTZJakUyTWpVNE1XSm1MVFJqWm1ZdE5HUmxaUzA1TkRaa0xUVTJOVFZoTkdRMllUaG1aU0lzSW5OMVlpSTZJbWh0WW5wNk9IbHpNbVJ3Y0dzMWVYWWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYUcxaWVubzRlWE15WkhCd2F6VjVkaUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENJc0lrSnlZV2x1ZEhKbFpUcEJXRThpWFN3aWIzQjBhVzl1Y3lJNmUzMTkub1pMTFNHS2hCZUFWNXVoUWN1YXBtTzJhcGFJMFh1NVY1NnRwd1FOMHU2RXRUejJxSkJtZV9pcVJtQnZpaUJIelFWMUlYSldyZWxKaFJJX25feDRzYkEiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvaG1ieno4eXMyZHBwazV5di9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9obWJ6ejh5czJkcHBrNXl2L2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoiaG1ieno4eXMyZHBwazV5diIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diIsInBvc3RhbF9jb2RlIl0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2htYnp6OHlzMmRwcGs1eXYifSwiYXBwbGVQYXkiOnsiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS50aWVuZGEuc2FuZGJveGFwcCIsInN0YXR1cyI6Im1vY2siLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiLCJkaXNjb3ZlciJdfSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOmZhbHNlLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYWxsb3dIdHRwIjp0cnVlLCJkaXNwbGF5TmFtZSI6IkxhIFRpZW5kYSBJbmMiLCJjbGllbnRJZCI6IkFXc3JRQUd6MGtYbUVRYkRBY00yTFNQcjdQajB2QzIyaGVfUmJVcFJNU2taZV9CWjE1cGhCOU12UkF3cDY1SVZ5RURzdXRZeEd2VU1OQTlOIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiJsYXRpZW5kYWluYyIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ==",
          }
        }
      };
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 0,
    }
  );
}

export function useFastlaneInstanceQuery({
  authorization,
  braintreeClient,
  deviceData,
}: any) {
  return useQuery(
    ["FASTLANE-INSTANCE", authorization, deviceData],
    async () => {
      console.log("called");
      const fastlane = await BraintreeFastlane.create({
        authorization,
        client: braintreeClient,
        deviceData,
        styles: {
          root: {
            backgroundColorPrimary: "white",
          },
        },
      });

      return fastlane;
    },
    {
      enabled: !!braintreeClient && !!deviceData,
      refetchOnMount: false,
      cacheTime: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
}
