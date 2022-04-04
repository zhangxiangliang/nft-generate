// Next
import { AppProps } from "next/app";

// Styles
import "styles/globals.css";

// Auth
import Provider from "provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
