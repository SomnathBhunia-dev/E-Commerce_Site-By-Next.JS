/* eslint-disable @next/next/no-img-element */
import { useGlobalState } from "@/components/context"
import Link from "next/link"
import { useRef } from "react"
import { NavCart } from "./cart"

const Navbar = () => {

  const { toggleCart, Cart } = useGlobalState()
  const cartBtn = useRef()
  const dropBtn = useRef()

  return (
    <>
      <header className="text-white body-font bg-purple-500 sticky top-0 z-10">
        <div className="container mx-auto flex p-5 items-center justify-between">
          <div className="border-white border-2 rounded cursor-pointer md:hidden" onClick={() => toggleCart(dropBtn)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <div ref={dropBtn} className="absolute w-full left-0 top-20 bg-purple-500 hidden z-10">
              <div className="flex flex-col content-start text-base justify-center">
                <Link href='/' className="pl-4 border-b hover:text-gray-900">Home</Link>
                <Link href='/menu' className="pl-4 border-b hover:text-gray-900">Product</Link>
                <Link href='/about' className="pl-4 border-b hover:text-gray-900">About</Link>
                <Link href='/contact' className="pl-4 border-b hover:text-gray-900">Contact</Link>
                <div className="inline-flex items-center pl-4 p border-b focus:outline-none hover:text-gray-800 rounded text-base group cursor-pointer">
                  <div className="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                    <span> Profile</span>
                    <div className="absolute top-[7.5rem] z-[1000] hidden float-left m-0 p-4 min-w-max overflow-hidden rounded-lg border-none bg-white shadow-lg dark:bg-neutral-700 group-hover:block hover:bg-purple-400 hover:text-white" >
                      <Link href={'/myOrders'} >
                        Your Orders
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href='/' className="flex title-font font-medium items-center text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">HUasHas</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto hidden md:block">
            <div className=" flex flex-wrap items-center text-base justify-center">
              <Link href='/' className="mr-5 hover:text-gray-900">Home</Link>
              <Link href='/menu' className="mr-5 hover:text-gray-900">Product</Link>
              <Link href='/about' className="mr-5 hover:text-gray-900">About</Link>
              <Link href='/contact' className="mr-5 hover:text-gray-900">Contact</Link>
            </div>
          </nav>
          <div className="md:w-28 w-fit flex justify-around items-start mt-4">
            <div>
              <a onClick={() => toggleCart(cartBtn)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-teal-300 cursor-pointer">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </a>
              {Cart.length !== 0 && <div className="relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full
              left-4 bottom-10 dark:border-gray-900">{Cart.length}</div>}
            </div>
            <div className="md:inline-flex items-center focus:outline-none hover:text-gray-800 rounded text-base group cursor-pointer  hidden">
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-[3.8rem] right-8 z-[1000] hidden float-left m-0 p-4 min-w-max overflow-hidden rounded-lg border-none bg-white shadow-lg dark:bg-neutral-700 group-hover:block hover:bg-purple-400 hover:text-white" >
                  <Link href={'/myOrders'} >
                    Your Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div ref={cartBtn} className="sideCart absolute right-0 top-20 min-w-[18rem] min-h-[20rem] md:min-h-[25rem] md:min-w-[22rem] md:right-4 bg-purple-300 border pt-10 md:p-10 z-10 rounded-lg mx-4 transition duration-1000 ease-in-out transform hidden shadow-lg">
            <div className="absolute top-4 right-2 md:right-6 text-pink-400 cursor-pointer " onClick={() => toggleCart(cartBtn)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <NavCart toggle={(isOpen) => toggleCart(cartBtn, isOpen)} />
          </div>
        </div>

      </header>
    </>
  )
}
export default Navbar;