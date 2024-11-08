# Quick Setup

Install dependencies: `npm i`

Start the app: `npm run dev`

Two pages.

    * cart: /
    * checkout: /checkout

## To Replicate Issue

- You may want to change the client token in `src/hooks/payment.ts:62`
- Start the app. The home page is an assumed cart page
- Click on the `Go to Checkout Page` link. _The fastlane card component should load_
- Go back to the cart by clicking on the `Go to Cart` link.
- Go back to the checkout page. _The error should occur_
