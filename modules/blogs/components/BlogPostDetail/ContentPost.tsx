import { NextPage } from "next";
import parse from 'html-react-parser';
import Link from "next/link";


const ContentPost: NextPage<any> = ({content}) => {
    return (
        <div>
            {parse(content?.content.rendered)}

            <div className="flex mt-10">
                <p>تگ ها:</p>
                {
                    content.tags_names.map((tag: any, index: any) => <Link href={`/blog/tag/${content.tags[index]}`}
                    className="mr-8 hover:text-blue-800" key={tag}>#{tag}</Link>)
                }
            </div>
        </div>
    )
}

export default ContentPost;