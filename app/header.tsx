import Link from 'next/link';
// import React from "react"

type HeaderProps = {
	children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
	return (
		<header className="p-5 text-white bg-blue-500">
			<Link
				href="/"
				className="px-2 py-1 text-blue-500 bg-white rounded-lg"
			>
				Home
			</Link>
			<Link
				href="/todos"
				className="px-2 py-1 text-blue-500 bg-white rounded-lg"
			>
				Todos
			</Link>
		</header>
	);
};

export default Header;
