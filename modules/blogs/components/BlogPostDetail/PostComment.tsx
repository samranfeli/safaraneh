import { NextPage } from "next";
import { useState } from "react";

const PostComment: NextPage = () => {

    const [name, setname] = useState<any>()
    const [email, setemail] = useState<any>()
    const [text, settext] = useState<string>()

    const [inputs, setinput] = useState({
        name: false,
        email: false,
        text: false
    })

    const [btn, setbtn] = useState(false)
    

    const nameChange = (e: any) => {
        setname(e.target.value)
        setinput({...inputs, name : true})
    }
    const emailChange = (e: any) => {
        setemail(e.target.value)
        setinput({...inputs, email : true})
    }
    const textChange = (e: any) => {
        settext(e.target.value)
        setinput({...inputs, text : true})
    }

    const btnClick = async(e: any) => {
        e.preventDefault();
        setbtn(true)
    }

    return (
        <div>
            <h2 className="text-3xl mt-20 mb-10">ثبت نظر</h2>
            <div className="border-2 border-gray-200 rounded-md">
                <form className="p-10 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div>
                        <label>
                            <span className="text-red-400">*</span>
                            نام شما:
                        </label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 w-full p-2 focus:outline-none focus:ring-1 translation-all duration-300 rounded"
                            value={name}
                            onChange={nameChange}
                        />
                        {!name && inputs.name && !btn && <p className="text-xs text-red-500">لطفا نام خود را وارد کنید</p>}
                        {btn && !name && <p className="text-xs text-red-500">لطفا نام خود را وارد کنید</p>}
                        <label>ایمیل:</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 w-full p-2 focus:outline-none focus:ring-1 translation-all duration-300 rounded"
                            value={email}
                            onChange={emailChange}
                        />
                        {inputs.email && !email.includes(`@gmail.com`) && <p className="text-xs text-red-500">ایمیل خود را صحیح وارد کنید</p>}
                    </div>
                    <div>
                        <p><span className="text-red-400">*</span>متن:</p>
                        <textarea
                            className="border-2 border-gray-300 p-2 h-32 w-full focus:outline-none focus:ring-1 translation-all duration-300 rounded"
                            value={text}
                            onChange={textChange}
                        />
                        {!text && inputs.text && !btn && <p className="text-xs text-red-500">متن نظر را وارد کنید</p>}
                        {!text && btn && <p className="text-xs text-red-500">متن نظر را وارد کنید</p>}
                    </div>
                    <button
                        type="submit"
                        onClick={btnClick} className="bg-blue-300 p-2 rounded w-fit text-white text-sm">ارسال نظر</button>
                </form>
            </div>
        </div>
    )
}

export default PostComment;