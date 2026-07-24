import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    {/* Main content will go here */}
                </main>
                <Footer />         
            </div>
        </div>
    )
}    