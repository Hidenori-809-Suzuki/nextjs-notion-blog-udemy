import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { getAllPosts } from '../../lib/notionAPI';
import SinglePost from '../../components/Post/SinglePost';

// const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts: allPosts, // allPosts, という記述だけでもよい(allPostsが同じだから)
    },
    revalidate: 60, // ISR 60秒ごとに更新する ex:1日ごと　60 * 60 * 24
  };
};

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full my-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        {allPosts.map((post) => (
          <div key={post} className="mx-4">
            <SinglePost
              title ={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  )
}
