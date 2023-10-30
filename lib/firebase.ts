import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6EM0SDg24nGVyUVbr52XOcsTPCpnQMjA",
  authDomain: "grief-8ecef.firebaseapp.com",
  projectId: "grief-8ecef",
  storageBucket: "grief-8ecef.appspot.com",
  messagingSenderId: "427584965044",
  appId: "1:427584965044:web:c156e55735e7ff5a410ae1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
