import {Search,Cloud} from "lucide-react"

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {

  return (
    <div className="w-full h-[3rem] flex items-center justify-between p-10">
      <a href="#" className="font-bold max-sm:text-2xl text-gray-700 text-3xl flex items-center gap-1 ">
<Cloud />
        SkyCast</a>

      <form onSubmit={(e) => {   
 e.preventDefault() 
  handleSearch()}} className="w-max h-[2.5rem] border border-gray-100 pl-2 pr-2 rounded-md">
        <input type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Location" className="flex-1 h-full p-1 outline-none" />
        <button className="h-full" onClick={handleSearch}><Search className="w-[14px] h-[14px]"/></button>
      </form>
    </div>
  )
}

export default Header