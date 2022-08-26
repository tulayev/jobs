import { Outlet } from 'react-router-dom'
import { BigSidebar, SmallSidebar, Navbar } from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'

export default function DashboardLayout() {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}