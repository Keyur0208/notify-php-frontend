import { Metadata, Viewport } from "next";
import "../style/globals.css";
import { siteConfig } from "../config/site";
import { fontRobot } from "../config/fonts";
import clsx from "clsx";
import { Nextui_Providers } from "../componets/providers/nextui_providers";
import Redux_Provider from "../componets/providers/redux_providers";
import { ProgressBar } from "../componets/progressbar/progress";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s || ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/notify.svg",
	},
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={clsx(fontRobot.className)} >
				<ProgressBar>
					<Redux_Provider>
						<Nextui_Providers themeProps={{ attribute: "class", defaultTheme: "dark", children }}  >
							{children}
						</Nextui_Providers>
					</Redux_Provider>
				</ProgressBar>
			</body>
		</html>
	);
}
