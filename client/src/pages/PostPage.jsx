import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner} from 'flowbite-react';
import CallToAction from "../components/CallToAction";

const PostPage = () => {

    const {postSlug} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(false);
    const [post, setpost] = useState(null);

    useEffect(() => {
        const fetchPost = async() => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    seterror(true);
                    setLoading(false);
                    return;
                }
                setpost(data.posts[0]);
                seterror(false);
                setLoading(false);
            } catch (error) {
                seterror(true);
                setLoading(false);
            }
        };
        fetchPost();
    },[postSlug]);

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size='xl' />
            </div>
        );
    }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post?.title}</h1>
        <Link to={`/search?category=${post?.category}`} className="self-center mt-5">
            <Button color="gray" pill size='xs'>
                {post?.category}
            </Button>
        </Link>
        <img src={post?.image} alt={post?.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
        <div className="flex justify-between w-full p-3 border-b border-slate-500 mx-auto max-w-2xl text-xs">
            <span className="">{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">{post && (
                post.content.length/1000
            ).toFixed(0)} mins read</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: post?.content}} className="p-3 max-w-2xl mx-auto w-full post-content">

        </div>
        <div className="max-w-4xl mx-auto w-full">
            <CallToAction/>
        </div>
    </main>
  )
}

export default PostPage