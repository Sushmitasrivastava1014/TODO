import React from 'react';



const Navbar=() =>{
    return(
        <>
            <nav className="flex justify-between bg-violet-950 text-white py-4">
                <div className='logo font-mono text-pretty '>
                    <span className='font-bold text-xl mx-8 italic'>iTask</span>
                </div>
                <ul className="flex gap-8 mx-9 ">
                    <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                    <li className='cursor-pointer hover:font-bold'> Your Tasks</li>
                    
                </ul>
            </nav>
        </>



    )
}
export default Navbar
