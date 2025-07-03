'use client';

export default function Header() {
	return (
		<>
			<div id="header" className="h-auto py-6 bg-white">

				{/* Left (logo) */}
				<div id="logo" className="w-auto">
				</div>

				<nav id="navbar" className="w-auto">
					<ul className="flex flex-row justify-center items-center text-black gap-x-4">
						<li>Home</li>
						<li>About us</li>
					</ul>
				</nav>

			</div>
		</>
	);
}
