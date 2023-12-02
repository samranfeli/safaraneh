import axios from 'axios';

export const getBlogs = async (perPage: number) => {

    try {
        const response = await axios({
            method: "get",
            url: `https://panel.safaraneh.com//wp-json/wp/v2/posts?per_page=${perPage}`
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
