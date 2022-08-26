import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Error, Home, ProtectedRoute, Register } from './pages'
import { AddJob, AllJobs, DashboardLayout, Profile, Stats } from './pages/dashboard'

function App() {
	return (
		<BrowserRouter>
		<ToastContainer position="top-center" />
			<Routes>
				<Route 
					path="/" 
					element={ 
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute> 
					}
				>
					<Route index element={ <Stats /> } />
					<Route path="all-jobs" element={ <AllJobs /> } />
					<Route path="add-job" element={ <AddJob /> } />
					<Route path="profile" element={ <Profile /> } />
				</Route>
				<Route path="/home" element={ <Home /> } />
				<Route path="/register" element={ <Register /> } />
				<Route path="*" element={ <Error /> } />
			</Routes>
		</BrowserRouter>
	)
}

export default App