import Image from "next/image";
import  loading  from "./loading.gif";

export const Loading = () => {
    return (
        <>
           <Image src={loading} alt='loading'  width={100} className='m-auto' />
        </>
    )
}