import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const RecentBlogSidebar: NextPage<any> = ({data}) => {
    return (
        <div className="mt-3 p-1">
            <Link href={`/blog/${data?.slug}`} className="flex justify-between">
                <p className="text-xs ml-2 hover:text-blue-800">{data?.title.rendered}</p>
                <Image src={data?.images.medium}
                width={100} height={40} alt='pic' className="rounded-md object-cover w-18 h-18"/>
            </Link>
        </div>
    )
}

export default RecentBlogSidebar