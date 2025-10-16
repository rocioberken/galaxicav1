import { Link } from "react-router-dom";
import { Toggle } from "../toggle/toggle";
import styles from "./header.module.scss";


export const Header = () => {

	return (
		<header className={styles.header}>
			<div className={styles.left}>
					<Link to="/" className={styles.logo}>
						<img src="logo.png" alt="Galaxica home" />
					</Link>
				</div>
				<nav className={styles.navbar}>
				<ul className={styles.menu}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/AboutUs">About Us</Link>
					</li>
					<li>
						<Link to="/admin">Admin</Link>
					</li>
					<li>
						<Toggle />

					</li>
					<li>
						<Link to="/profile" className={styles.user}>
 						<img src="user.png" alt="user" />
						{/* <span>Hi, {user}!</span>*/}</Link> 
				 
					</li>
				

				</ul>

				{/* <div className={styles.right}>
					<Toggle />
					<div className={styles.user}>
						<img src="user.png" alt="user" />
						<span>Hi, {user}!</span>
					</div>
				</div> */}
			</nav>
		</header>
	);
};

// export const Header = () => {
// 	const user = "Robert";

// 	return (
// 		<header className={styles.header}>
// 			<nav
// 				style={{
// 					display: "flex",
// 					justifyContent: "center",
// 					padding: "12px 16px",
// 					background: "#222",
// 					color: "#fff",
// 				}}
// 			>
// 				<ul
// 					style={{
// 						display: "flex",
// 						gap: 20,
// 						listStyle: "none",
// 						margin: 0,
// 						padding: 0,
// 					}}
// 				>
// 					<li>
// 						{" "}
// 						<Link to={`/`} className={styles.logo}>
// 							<img src="logo.png" alt="Home" />
// 						</Link>{" "}
// 					</li>

// 					<li>
// 						{" "}
// 						<div className={styles.toggle}>
// 							<Toggle />
// 							<div className={styles.user}>
// 								<img src="user.png" alt="user" />
// 								<p>Hi, {user}!</p>
// 							</div>{" "}
// 						</div>
// 					</li>

// 					<li>
// 						<Link to={`/admin`}>Admin</Link>
// 					</li>

// 					<li>
// 						<Link to={`/AboutUs`}> About Us</Link>
// 					</li>
// 					<li>
// 						<Link to={`user`} className={styles.logo}>
// 							My User
// 						</Link>
// 					</li>
// 				</ul>
// 			</nav>
// 		</header>
		
// 	);
// };
