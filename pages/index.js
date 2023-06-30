import Featured from "@/components/Featured";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpeuiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ecommerce by Next.Js</title>
      </Head>
      <div>
        {/* <h1 className='text-white text-center bg-purple-800 '>Welcome {somnath} & {somnathb} To Ecommerce Site..</h1> */}
        <Image src={'https://rukminim1.flixcart.com/flap/1688/280/image/75a15c3e19c3f7de.jpg?q=50'} width={1000} height={1000} alt="banner" className="bg-cover my-4 mx-auto" />
      </div>
      <Featured />
    </>
  )
}
