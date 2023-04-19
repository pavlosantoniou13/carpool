import dynamic from "next/dynamic"
const SearchFields = dynamic(() => import("./components/searchFields"),{
  ssr: false
})

function Search() {
  return (
    <SearchFields />
  );
}




/**
 * <SavedPlaces className='flex items-center bg-white px-4 py-2 '>
           <StarIcon className='mr-2 rounded-full bg-gray-400 w-10 h-10 p-2' src={StarImg.src} /> 
           Saved Places
       </SavedPlaces>
 */
export default Search