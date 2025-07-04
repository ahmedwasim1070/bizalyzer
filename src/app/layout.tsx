// Imports
import type { Metadata } from "next";
import "./globals.css";

// Header
export const metadata: Metadata = {
	title: "BizElevn",
	description: "later .....",
};
// 
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	);
}
