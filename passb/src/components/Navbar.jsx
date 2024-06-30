import React from 'react'

const Navbar = () => {
  return (
    <nav className=' text-gray-700'>
      <div className="mycontainer flex justify-between items-center px-4 py-10 h-14">
        <div className=' logo font-bold text-gray-700 text-3xl px-8'>
          <span className="text-blue-500">&lt;</span>
          <span>Pass</span>
          <span className="text-blue-500">Master/&gt;</span>
        </div>

        <button className='text-gray-700 hover:font-bold hover:bg-purple-300 transition-all my-5 mx-2 rounded-full flex justify-between items-center px-3 border border-slate-800'>Login</button>

      </div>
    </nav>
  )
}
export default Navbar



// import React from 'react'

// const Navbar = () => {
//     return (
//         <nav className='bg-slate-800 text-white '>
//             <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

//             <div className=' logo font-bold text-gray-700 text-4xl px-8'>
//             <span className="text-blue-500">&lt;</span>
//             <span>Pass</span>
//             <span className="text-blue-500">Master/&gt;</span>
//         </div>
//                 {/* <ul>
//                     <li className='flex gap-4 '>
//                         <a className='hover:font-bold' href='/'>Home</a>
//                         <a className='hover:font-bold' href='#'>About</a>
//                         <a className='hover:font-bold' href='#'>Contact</a>
//                     </li>
//                 </ul> */}
//             </div>
//         </nav>
//     )
// }

// export default Navbar