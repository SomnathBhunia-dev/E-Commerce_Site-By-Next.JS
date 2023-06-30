import { useGlobalState } from "@/components/context"


const FilterBar = () => {
  const { FilterTag: { category, price, minPrice, maxPrice, brand }, uncheckedPrice } = useGlobalState()
  return (
    <>
      <div className="flex justify-start max-md:overflow-x-scroll">
        <BarOption value={category} topic={'category'} />
        <BarOption value={brand} topic={'brand'} />
        {maxPrice > price && <div className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm py-2 ps-5 pr-2 flex text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 shadow-md shadow-purple-500 m-2">{minPrice} - {price}
          <span className="ml-2" >
            <label htmlFor="filter-category-0"><input name='category' onChange={uncheckedPrice} value={price} type="checkbox" className="opacity-0 absolute cursor-pointer w-4 h-4 -ml-2.5" /><svg aria-hidden="true" className="w-3.5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </label>
          </span>
        </div>}
      </div>
    </>
  )
}

export default FilterBar;


export const BarOption = ({ topic, value }) => {
  const { FilterTag, filterTag } = useGlobalState()

  return (
    <>
      {value && Object.keys(value).map((i) => (
        <div className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm py-2 ps-5 pr-2 flex text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 shadow-md shadow-purple-500 m-2" key={i}>{value[i]}
          <span className="ml-2" >
            <label><input type='checkbox' name={topic} value={value[i]} onChange={filterTag} className="opacity-0 absolute cursor-pointer w-4 h-4 -ml-2.5" checked={FilterTag[topic]?.includes(value[i])} />
              <svg aria-hidden="true" className="w-3.5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></label>
          </span></div>
      ))}
    </>
  )
}