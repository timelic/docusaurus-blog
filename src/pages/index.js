import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

const Svg = require("../../static/img/undraw_docusaurus_mountain.svg").default;

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<div className="main-container">
			<header className={clsx("hero homepage-header", styles.heroBanner)}>
				<div className="container homepage-container">
					<h1 className="homepage-title">{siteConfig.title}</h1>
					<p className="homepage-subtitle">{siteConfig.tagline}</p>
					<div className={clsx("homepage-button", styles.buttons)}>
						<Link
							className="button button--secondary"
							to="/docs/intro"
						>
							前往日常记录
						</Link>
					</div>
				</div>
			</header>
			<Svg className={clsx("homepage-image", styles.featureSvg)} />
		</div>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<HomepageHeader />
			{/* <main>
				<HomepageFeatures />
			</main> */}
		</Layout>
	);
}
