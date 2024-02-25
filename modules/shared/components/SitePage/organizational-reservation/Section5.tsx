import { NextPage } from "next";
import SendCommentPic from '../../../../../public/images/organizational-reservation/SendCommentPic.jpg';
import SendCommentpng from '../../../../../public/images/organizational-reservation/send-symbol-or.png';
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ServerAddress } from "@/enum/url";
import axios from "axios";
import { validateEmailNotReqired, validateRequied } from "../../../helpers/validation";

const Section5: NextPage = () => {


        
    const [newCommentSubmitMessage, setnewCommentSubmitMessage] = useState<string>()

    type FormValues = {
        name: string,
        email: string,
        title: string,
        text: string
    }
    const initialdata: FormValues = {
        name: '',
        email: '',
        title:'',
        text: ''
    }

    const submitHandle = async (values: FormValues, actions: any) => {
        let CommentUser = {
            name: values.name,
            email: values.email,
            subject: values.title || null,
            message: values.text,
        }
        const post = await axios.post(`https://api.emailjs.com/api/v1.0/email/send-form`, CommentUser)
        console.log(post);
        
    }

    return (
        <div className="mt-32 mb-20 grid grid-cols-2 max-lg:grid-cols-1 shadow-2xl">
            <Image src={SendCommentPic} alt="SendCommentpic" width={200} height={100} className="w-full h-full max-lg:h-96 max-sm:h-72 object-cover"
                onContextMenu={e => e.preventDefault()} priority={true} />
            <div>
            <div className="p-12 max-md:p-4">
                    <h2 className="text-2xl font-semibold pb-5">ارسال درخواست</h2>
                    <p className="text-sm pb-5 text-gray-500 max-sm:text-xs">
                    در صورتی که تمایل دارید تیم فروش سازمانی سفرانه با شما تماس بگیرد، لطفاً از طریق پر کردن فرم ذیل اطلاعات خود را برای ما ارسال نمایید.
                    </p>
<Formik
        initialValues={initialdata}
        onSubmit={submitHandle}
    >
        {({ errors , touched }) => (
        <Form>
        <div className="space-y-5">
            <Field name="name" placeholder='نام'
            className={`${errors.name&&touched.name ? 'border-red-600' : 'border-gray-300' } border-2 p-2 w-full rounded outline-none duration-300`}
            validate={(value: string) => validateRequied(value, 'لطفا نام خود را وارد کنید')}/>
            {errors.name && touched.name && <small className="text-red-600 duration-200">{errors.name}</small>}
            <br/>  
            <Field name="email" placeholder="ایمیل"
            className={`${errors.email&&touched.email ? 'border-red-600' : 'border-gray-300' } border-2 p-2 w-full rounded outline-none  duration-300`}
            validate={(value: string) => validateEmailNotReqired({value,invalidMessage: 'ایمیل معتبر نیست'}) || validateRequied(value,'ایمیل را وارد کنید')}
            />
            {errors.email && touched.email && <small className="text-red-600">{errors.email}</small>}
            <Field name="name" placeholder="عنوان"
            className={`${errors.title&&touched.title ? 'border-red-600' : 'border-gray-300' } border-2 p-2 w-full rounded outline-none duration-300`}
            />
            <br/>        
            <Field name="text" as='textarea' placeholder="متن"
                className={`${errors.text&&touched.text ? 'border-red-600' : 'border-gray-300' } border-2 p-2 h-32 w-full rounded outline-none duration-300`}
                validate={(value: any) => validateRequied(value, 'متن درخواست را وارد کنید')}/>
            {errors.text && touched.text && <small className="text-red-600">{errors.text}</small>}
                <button
                    type="submit"
                    className="bg-blue-800 p-3 text-white rounded w-full"
                    >
                 ارسال
                </button>
                <Image src={SendCommentpng} alt="ارسال نظر" width={300} height={100} className="w-24 max-sm:w-14 absolute bottom-20 left-4 "/>                    
                <p className="text-xl font-bold">{newCommentSubmitMessage}</p>
                </div>      
    </Form>
        )}
</Formik>
</div> 
            </div>
        </div>
    )
}

export default Section5;