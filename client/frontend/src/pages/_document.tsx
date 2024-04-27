import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from "../components/theme-provider"
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
<link href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Kanit&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:wght@600&family=Righteous&display=swap" rel="stylesheet"/>

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
