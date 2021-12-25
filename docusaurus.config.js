// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");
/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Alicess web",
	tagline: "使用 Dinosaurs 开发",
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
					// Please change this to your repo.
					editUrl:
						"https://github.com/facebook/docusaurus/edit/main/website/",
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				blog: {
					showReadingTime: true,
					remarkPlugins: [math],
					rehypePlugins: [katex],
					// Please change this to your repo.
					editUrl:
						"https://github.com/facebook/docusaurus/edit/main/website/blog/",
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
						label: "记录",
					},
					{ to: "/blog", label: "文章", position: "left" },
					{
						href: "https://bitbucket.org/timel/docusaurus-blog/src/master/",
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
			},
		}),
};

module.exports = config;
