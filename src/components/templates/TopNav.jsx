import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TopNav = () => {
   const [query, setquery] = useState("");
   
   console.log(query);

  return (
    <div className='w-full h-[10vh] relative flex justify-start items-center ml-[15%]'>
        <i class="text-3xl text-zinc-400 ri-search-line"></i>
        <input
         onChange={(e) => setquery(e.target.value)}
         value={query}
         className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent "type="text" placeholder='Search anything' />
         {query.length > 0 && (<i onClick={() => setquery("")} class="text-zinc-400 text-3xl ri-close-fill"></i>)}
        

        <div className='w-[50%] max-h-[50vh] absolute top-[90%] bg-zinc-200 overflow-auto '>
            {/* <Link className='font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300   '>
                <img src="" alt="" />
                <span>Hello everyone</span>
            </Link>
             */}
         
        </div>
    </div>
  )
}

export default TopNav