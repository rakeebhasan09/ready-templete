import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Google Login
	const googleProvider = new GoogleAuthProvider();
	const googleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// Logout User
	const loggedOut = () => {
		return signOut(auth);
	};

	// Observer
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const authInfo = { googleLogin, user, setUser, loading, loggedOut };

	return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
