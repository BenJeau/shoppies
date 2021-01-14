# The Shoppies

[![Netlify Status](https://api.netlify.com/api/v1/badges/562646eb-37c7-4712-a5ca-45baf25be0d3/deploy-status)](https://app.netlify.com/sites/boring-ride-aafaa4/deploys)

Shopify 2021 Summer Internship Challenge - Available at [https://shoppies.jeaurond.dev/](https://shoppies.jeaurond.dev/)

## Development

1. Clone the repository
2. Get an API key for OMBd [here](https://www.omdbapi.com/apikey.aspx)
3. Copy the content of `.env.example` to a `.env` file with the API key
4. Install dependencies with `yarn`
5. Run the application with `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies

- [`@shopify/polaris`](https://polaris.shopify.com/) - for UI components
- [`swr`](https://swr.vercel.app/) - for API calls with hooks
- [`use-persisted-state`](https://github.com/donavon/use-persisted-state) - for persisted state
