import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";

import { ImStatsBars } from "react-icons/im";

function Nav() {
	const { user, loading, logout } = useContext(authContext);

	return (
		<header className="container max-w-2xl px-6 py-6 mx-auto">
			<div className="flex items-center justify-between">
				{/* User Information */}
				{/* If user is not null and loading is false return something... */}
				{user && !loading && (
					<div className="flex items-center gap-2">
						{/* img */}
						<div className="h-[40px] w-[40px] rounded-full overflow-hidden">
							<img
								className="h-full w-full object-cover"
								src={user.photoURL}
								alt={user.displayName}
								referrerPolicy="no-referrer"
							/>
						</div>

						{/* name */}
						<small>Hi, {user.displayName}!</small>
					</div>
				)}

				{/* Right side of navigation */}
				{/* If user is not null and loading is false return something... */}
				{user && !loading && (
					<nav className="flex items-center gap-4">
						<div>
							<ImStatsBars className="text-2xl" />
						</div>
						<div>
							<button onClick={logout} className="btn btn-danger">
								Sign Out
							</button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}

export default Nav;
