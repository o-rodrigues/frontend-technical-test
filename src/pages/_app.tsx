import { FC, ReactElement } from 'react'
import type { AppProps } from 'next/app'
import { getLoggedUserId } from 'utils/getLoggedUserId'
import 'styles/globals.css'

// Default way to get a logged user
export const loggedUserId: number = getLoggedUserId()

const MyApp: FC<AppProps> = ({ Component, pageProps }): ReactElement => (
  <Component {...pageProps} />
);

export default MyApp
