import Image from 'next/image';
// import { Inter } from 'next/font/google'
import { getAllPosts, getPostsByPage, getPostsForTopPage } from '../../../../lib/notionAPI';
import SinglePost from '../../../../components/Post/SinglePost';

// const inter = Inter({ subsets: ['latin'] })
export const getStaticPaths = async () => {
	return {
		paths: [{ params: { page: '1' } }, { params: { page: '2' } }],
		fallback: 'blocking',
	};
};

export const getStaticProps = async (context) => {
	// const fourPosts = await getPostsForTopPage();
	const currentPage = context.params?.page;
	const postsByPage = await getPostsByPage(
		parseInt(currentPage.toString(), 10)
	);

	return {
		props: {
			postsByPage,
			// allPosts: allPosts, // allPosts, という記述だけでもよい(allPostsが同じだから)
		},
		revalidate: 60, // ISR 60秒ごとに更新する ex:1日ごと　60 * 60 * 24
	};
};

const BlogPageList = ({ postsByPage }) => {
	return (
		<div className="container h-full w-full mx-auto">
			<main className="container w-full my-16">
				<h1 className="text-5xl font-medium text-center mb-16">
					Notion Blog🚀
				</h1>
				<section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
					{postsByPage.map((post) => (
						<div key={post}>
							<SinglePost
								title={post.title}
								description={post.description}
								date={post.date}
								tags={post.tags}
								slug={post.slug}
								isPagenationPage={true}
							/>
						</div>
					))}
				</section>
			</main>
		</div>
	);
};

export default BlogPageList;
