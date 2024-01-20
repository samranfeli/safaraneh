import { NextPage } from "next";

const PostComment: NextPage = () => {
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
                        <input type="text" className="border-2 border-gray-300 w-full p-2 focus:outline-none focus:ring-1 translation-all duration-300 rounded" />
                        <label>ایمیل:</label>
                        <input type="text" className="border-2 border-gray-300 w-full p-2 focus:outline-none focus:ring-1 translation-all duration-300 rounded" />
                    </div>
                    <div>
                        <p><span className="text-red-400">*</span>متن:</p>
                        <textarea className="border-2 border-gray-300 p-2 h-32 w-full focus:outline-none focus:ring-1 translation-all duration-300 rounded" />
                    </div>
                    <button className="bg-blue-300 p-2 rounded w-fit text-white relative right-1/2">ارسال نظر</button>
                </form>
            </div>
        </div>
    )
}

export default PostComment;