import firebase from "firebase/app";
import { User } from "../models/User";
import { atom, useRecoilState } from "recoil";

const userState = atom<User>({
	key: "user",
	default: null,
});

function useAuthentication() {
	const [user, setUser] = useRecoilState(userState);

	firebase
		.auth()
		.signInAnonymously()
		.catch(function (error) {
			// Handle Errors here.
			console.error(error);
		});

	firebase.auth().onAuthStateChanged(function (firebaseUser) {
		if (firebaseUser) {
			setUser({
				uid: firebaseUser.uid,
				isAnonymous: firebaseUser.isAnonymous,
			});
		} else {
			// User is signed out.
			setUser(null);
		}
	});

	return { user };
}
