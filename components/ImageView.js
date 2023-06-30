/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useEffect, useState } from "react"


const ImageView = ({ image, images='' }) => {
    const imageValues = Object.values(images);
    const [view, setview] = useState(imageValues[imageValues.length - 1])

    useEffect(()=>{
        setview(imageValues[imageValues.length - 1])
    },[images])
    return (
        <>
            <div className="flex justify-between flex-col-reverse lg:flex-row lg:w-1/2 w-full h-96">
                <div className="list lg:w-2/6 flex md:max-lg:justify-evenly lg:flex-col w-full items-center p-2 lg:overflow-scroll no-scrollbar">
                    {imageValues.map((i, index) => (
                        <div className="w-4/6 md:max-lg:w-1/12 m-2 object-contain object-center hover:border-2 hover:border-blue-600 cursor-pointer" key={index}>
                            <Image src={i} alt={i} width={500} height={500} onMouseEnter={()=>setview(imageValues[index])} />
                        </div>
                    ))}
                </div>
                <div className="view lg:w-4/6 w-full h-full flex items-center justify-around">
                    <div className="p-4 h-full">
                        <Image src={view || image} width={500} height={500} className="h-full w-full object-contain object-center" alt='' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageView