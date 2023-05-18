import DishForm from "./components/DishForm/DishForm";
import styles from "./App.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
	return (
		<div className={styles.container}>
			<QueryClientProvider client={queryClient}>
				<DishForm />
				<Toaster position="bottom-right" reverseOrder={false} />
			</QueryClientProvider>
		</div>
	);
}

export default App;
