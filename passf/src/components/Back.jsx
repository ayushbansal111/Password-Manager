import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Back = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordarray(passwords)
    }

    useEffect(() => {
        getpasswords()

    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("src/assets/eyecross.png")) {
            ref.current.src = "src/assets/eye.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "src/assets/eyecross.png"
            passwordref.current.type = "text"
        }
    }
    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type": "application/json"},body: JSON.stringify({id:form.id})})
            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type": "application/json"},body: JSON.stringify({...form,id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }
    }
    const deletepassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordarray(passwordarray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type": "application/json"},body: JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = async(id) => {
        setform({...passwordarray.filter(i => i.id === id)[0],id: id})
        setpasswordarray(passwordarray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full "></div>
            <div className="p-3 lg:mycontainer text-grey-700 min-h-[88.2vh]">
                <h1 className='text-3xl font-bold text-center'><span className="text-blue-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-blue-400">Master/&gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className="text-gray-600 flex flex-col p-4 gap-4 items-center">
                    <input value={form.site} onChange={handlechange} className='rounded-full border border-slate-600 w-full p-4 py-2' type="text" name='site' id='site' placeholder='Enter Website URL' />
                    <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
                        <input value={form.username} onChange={handlechange} className="rounded-full border border-slate-600 w-full lg:w-[70%] p-4 py-2" type="text" name='username' id='username' placeholder='Enter Username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} className="rounded-full border border-slate-600 w-full  p-4 py-2" type="password" name='password' id='password' placeholder=' Enter Password' />
                            <span className="absolute right-[12px] top-[6px] cursor-pointer" onClick={showpassword}>
                                <img ref={ref} className="p-1" width={30} src="src/assets/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className=' flex justify-center items-center gap-1 border border-slate-600 hover:bg-purple-300 rounded-full  font-bold px-3 py-1 w-fit transition-all duration-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordarray.length === 0 && <div> No passwords to show</div>}
                    {passwordarray.length != 0 && <table className="table-auto w-full rounded-2xl overflow-hidden mb-10">
                        <thead className='bg-slate-400 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-100 '>
                            {passwordarray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center px-1'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center px-1'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center'>
                                        <div className='flex items-center justify-center px-1'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-black text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Back
