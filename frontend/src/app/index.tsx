import user from "$/stores/user";
import { Redirect } from "expo-router";

export default function App() {
  const isLoggedIn = user.use.isLoggedIn()
  
  return isLoggedIn ? <Redirect href="/(tabs)/createTab" /> : <Redirect href="/landing" />
}

