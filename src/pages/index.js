import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

// const Svg = require("../../static/img/undraw_docusaurus_mountain.svg").default;
const Svg = require("../../static/img/image2vector (1).svg").default;

function getAllDocs() {
	const ctx = require.context("../../docs", true);
	const allPosts = (ctx) => {
		const blogpostNames = ctx.keys();
		return blogpostNames.reduce((blogposts, blogpostName, i) => {
			const module = ctx(blogpostName);
			if (!module.metadata) return blogposts;
			const { title, sidebarPosition, permalink } = module.metadata;
			return [
				...blogposts,
				{
					title,
					sidebarPosition,
					permalink,
				},
			];
		}, []);
	};
	console.log(allPosts(ctx));
	return allPosts(ctx);
}

// 转到solutions
let clickedTime = 0;
function toSolutionsPage() {
	clickedTime += 1;
	if (clickedTime >= 5) {
		window.location.href = "solutions/两数之和";
	}
}

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<div className="main-container">
			<header className={clsx("hero homepage-header", styles.heroBanner)}>
				<div className="container homepage-container">
					<h1 className="homepage-title">{siteConfig.title}</h1>
					<p className="homepage-subtitle">{siteConfig.tagline}</p>
					<div className={clsx("homepage-button", styles.buttons)}>
						<Link className="button button--secondary" to="/blog">
							前往最近文章
						</Link>
					</div>
					{/* <ul>
						{getAllDocs().map((doc) => {
							return (
								<li>
									<a href={doc.permalink}>{doc.title}</a>
								</li>
							);
						})}
					</ul> */}
				</div>
			</header>
			{/* <Svg
				className={clsx("homepage-image", styles.featureSvg)}
				onClick={toSolutionsPage}
			/> */}
			<img
				className="homepage-header-image"
				src="https://s4.ax1x.com/2022/01/16/7tdnrF.jpg"
				onClick={toSolutionsPage}
			/>
		</div>
	);
}

export default function Home() {
	const { siteConfig, siteMetadata, globalData } = useDocusaurusContext();

	return (
		<Layout title={null} description="Some notes...">
			<HomepageHeader />
			{/* <main>
				<HomepageFeatures />
			</main> */}
		</Layout>
		// `${siteConfig.title}` 这玩意本来可以是title
	);
}
