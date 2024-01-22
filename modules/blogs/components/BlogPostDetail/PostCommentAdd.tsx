import { NextPage } from "next";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";

import { ServerAddress   } from "@/enum/url";
import axios from "axios";



const SendCommentValidation = Yup.object({
    name:  Yup.string().required('لطفا نام را وارد کنید'),
    email: Yup.string().email('لطفا ایمیل را صحیح وارد کنید'),
    text:  Yup.string().required('متن نظر را کامل کنید')
})

const PostComment: NextPage<any> = ({ postId }) => {
    
    const [newCommentSubmitMessage, setnewCommentSubmitMessage] = useState<string>()

    type FormValues = {
        name: string,
        email: string,
        text: string
    }
    const initialdata: FormValues = {
        name: '',
        email: '',
        text: ''
    }

    const submitHandle = async (values: FormValues, actions: any) => {
        let CommentUser = {
            author_name: values.name,
            author_email: values.email,
            content: values.text,
            post: postId
        }
        setnewCommentSubmitMessage('...در حال ارسال')
        axios.post(`${ServerAddress.Type}${ServerAddress.Blog}/wp-json/wp/v2/comments`, CommentUser)
            .then(res =>
            (res.status == 200 || res.status == 201 && setnewCommentSubmitMessage('نظر شما با موفقیت ثبت شد'),
            actions.resetForm()))
    }
    
    return (
        <div>
            <h2 className="mt-20 text-3xl mb-10">ثبت نظر</h2>

            <div className="w-full border-gray-200 border-2 p-8 rounded">
            <Formik
                    initialValues={initialdata}
                    validationSchema={SendCommentValidation}
                    onSubmit={submitHandle}
                >
                    {({ errors }) => (
                    <Form className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div>        
                        <label htmlFor="name"><span className="text-red-600">*</span>نام شما</label>
                        <Field name="name" className="border-gray-400 border-2 p-2 w-full rounded outline-none focus:ring-1" />
                        {errors.name && <small className="text-red-600 translation-all duration-200">{errors.name}</small>}
                        <br/>        
                        <label htmlFor="email">ایمیل</label>
                        <Field name="email" className="border-gray-400 border-2 p-2 w-full rounded outline-none focus:ring-1"/>
                        {errors.email && <small className="text-red-600">{errors.email}</small>}
                    </div>
                    <div>        
                        <label htmlFor="text">متن</label>
                        <Field name="text" as='textarea' className="border-gray-400 border-2 p-2 w-full h-32 rounded outline-none focus:ring-1"/>
                        {errors.text && <small className="text-red-600">{errors.text}</small>}
                    </div>
                            <button
                                type="submit"
                                className="bg-blue-300 p-2 text-white rounded w-fit"
                            >ارسال نظر</button>
                            <p className="text-xl font-bold">{newCommentSubmitMessage}</p>
                </Form> 
                    )}
            </Formik>
            </div>    
        </div>
    )
}

export default PostComment;