import "../styles/globals.css";
import type { AppProps } from "next/app";
import { fetchJson } from "~/utils";
import { SWRConfig } from "swr";
import { SupabaseContextProvider } from "use-supabase";
import { supabase } from "~/config/supabase.client";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SupabaseContextProvider client={supabase}>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SupabaseContextProvider>
  );
}

export default CustomApp;
