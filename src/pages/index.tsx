import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { getAllPosts, getPostsForTopPage } from '../../lib/notionAPI';
import SinglePost from '../../components/Post/SinglePost';
import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const fourPosts = await getPostsForTopPage();

  return {
    props: {
      fourPosts,
      // allPosts: allPosts, // allPosts, という記述だけでもよい(allPostsが同じだから)
    },
    revalidate: 60, // ISR 60秒ごとに更新する ex:1日ごと　60 * 60 * 24
  };
};

export default function Home({ fourPosts }) {
  // console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <main className="container w-full my-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        {fourPosts.map((post) => (
          <div key={post} className="mx-4">
            <SinglePost
              title ={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
            />
          </div>
        ))}
        <Link href="/posts/page/1" className="mb-6 lg:w-1/2 mx-auto block text-right">
          ...もっと見る
        </Link>
      </main>
    </div>
  )
}
