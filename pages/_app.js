import { memo } from 'react'
import '@/styles/globals.css'
import Navbar from './navbar'
import Footer from './footer'
import Context from '@/components/context'
import Alert from "@/components/Alert"

function App({ Component, pageProps }) {
  return <>
  <div>

 
    <Context>
      <Navbar />
      <div className="min-h-[80vh]" >
        <Alert />
        <Component {...pageProps} />
      </div>
      <Footer />
    </Context>
    </div>
  </>
}
export default memo(App)