import axios from 'axios';

export const getBlogs = async (perPage: number) => {

    try {
        let response = await axios.get(
            `https://panel.safaraneh.com//wp-json/wp/v2/posts?per_page=${perPage}`
        )
        return response
    } catch (error) {
        return error
    }

}
