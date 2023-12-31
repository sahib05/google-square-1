import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ClerkProvider } from "@clerk/nextjs";
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return (
    // <SessionProvider session={session}>
    <ClerkProvider {...pageProps}>
      { getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
    // </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
