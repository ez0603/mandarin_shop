import AuthProvider from "./components/AuthProvider/AuthProvider";
import HomeRoute from "./routes/HomeRoute";

function App() {
  return (
    <AuthProvider>
      <HomeRoute />
    </AuthProvider>
  );
}
export default App;
