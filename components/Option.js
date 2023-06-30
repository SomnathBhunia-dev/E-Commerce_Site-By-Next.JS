import { useRef, useState } from "react";
import { useGlobalState } from "./context";


const Option = ({ topic }) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const { toggleCart, capitalize, filterTag, ProductList, FilterTag } = useGlobalState()

    const toggleCategory = () => {
        setCategoryOpen((prevState) => !prevState);
    };
    const CatBtn = useRef()

    const checkDetails = (data, property) => {
        let newVal = data.map((i) => {
            return i[property]
        })
        return (newVal = [...new Set(newVal)]);
    }

    const Topic = checkDetails(ProductList, `${topic}`)

    return (
        <>
            <div className="border-b border-gray-200 py-6 outline-none">
                <h3 className="-my-3 flow-root">
                    {/* <!-- Expand/collapse section button --> */}
                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false" onClick={() => { toggleCart(CatBtn); toggleCategory() }}>
                        <span className="font-medium text-gray-900">{capitalize(topic)}</span>
                        <span className="ml-6 flex items-center">
                            {/* <!-- Expand icon, show/hide based on section open state. --> */}
                            {!categoryOpen ?
                                (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>)
                                :
                                // {/* <!-- Collapse icon, show/hide based on section open state. --> */ }
                                (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                </svg>)}
                        </span>
                    </button>
                </h3>
                {/* <!-- Filter section, show/hide based on section state. --> */}
                <div className="pt-6 hidden" id="filter-section-1" ref={CatBtn}>
                    <div className="space-y-4">
                        {Topic.map((i) => {
                            return <div className="flex items-center" key={i}>
                                <input name={topic} value={i} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={filterTag} checked={FilterTag[topic].includes(i)}/>
                                <label htmlFor="filter-category-0" className="ml-3 text-sm text-gray-600">{i}</label>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Option;