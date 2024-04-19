import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from "../components/theme-provider"
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
<link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet"/>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <Main />
        <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  )
}
