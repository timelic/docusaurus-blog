// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");
// /** @type {import('@docusaurus/types').Config} */

// ANCHOR 翻转 sidebar 里面的所有项（按时间先后顺序
// Reverse the sidebar items ordering (including nested category items)
function reverseSidebarItems(items) {
	// Reverse items in categories
	const result = items.map((item) => {
		if (item.type === "category") {
			return { ...item, items: reverseSidebarItems(item.items) };
		}
		return item;
	});
	// Reverse items at current level
	result.reverse();
	return result;
}

//将汉字与英文、数字、下划线之间添加一个空格
function insert_spacing(str) {
	const p1 = /([A-Za-z_])([\u4e00-\u9fa5]+)/gi;
	const p2 = /([\u4e00-\u9fa5]+)([A-Za-z_])/gi;
	return str.replace(p1, "$1 $2").replace(p2, "$1 $2");
}

const config = {
	title: "Alicess",
	tagline: "使用 Docusaurus 开发",
	url: "https://your-docusaurus-test-site.com",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "facebook", // Usually your GitHub org/user name.
	projectName: "docusaurus", // Usually your repo name.
	stylesheets: [
		{
			href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
			type: "text/css",
			integrity:
				"sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
			crossorigin: "anonymous",
		},
	],
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					remarkPlugins: [math],
					rehypePlugins: [katex],
					async sidebarItemsGenerator({ docs }) {
						return docs
							.sort(
								(a, b) => b.sidebarPosition - a.sidebarPosition
							)
							.map((item) => {
								if (!item.frontMatter.title)
									item["label"] = insert_spacing(item.id);
								item["type"] = "doc";
								return item;
							});
					},
				},
				blog: {
					showReadingTime: true,
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "",
				logo: {
					alt: "Alicess Logo",
					src: "img/logo.svg",
				},
				items: [
					{
						type: "doc",
						docId: "intro",
						position: "left",
						label: "Archive",
					},
					{ to: "/blog", label: "Posts", position: "left" },
					// {
					// 	to: "/solutions/两数之和",
					// 	label: "Solutions",
					// 	position: "left",
					// },
					{
						href: "https://github.com/timelic/docusaurus-blog",
						label: "Repo",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Docs",
						items: [
							{
								label: "Tutorial",
								to: "/docs/intro",
							},
						],
					},
					{
						title: "Community",
						items: [
							{
								label: "Stack Overflow",
								href: "https://stackoverflow.com/questions/tagged/docusaurus",
							},
							{
								label: "Discord",
								href: "https://discordapp.com/invite/docusaurus",
							},
							{
								label: "Twitter",
								href: "https://twitter.com/docusaurus",
							},
						],
					},
					{
						title: "More",
						items: [
							{
								label: "Blog",
								to: "/blog",
							},
							{
								label: "GitHub",
								href: "https://github.com/facebook/docusaurus",
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				// additionalLanguages: ["vue"],
			},
		}),
	plugins: [
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "solutions",
				path: "solutions",
				routeBasePath: "solutions",
				remarkPlugins: [math],
				rehypePlugins: [katex],
				sidebarPath: require.resolve("./sidebars.js"),
				async sidebarItemsGenerator({ docs }) {
					return docs.map((doc) => {
						return {
							type: "doc",
							id: doc.id,
							label: `${doc.sidebarPosition} - ${doc.id}`,
						};
					});
				},
			},
		],
	],
};

module.exports = config;
