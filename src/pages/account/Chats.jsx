import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

export default function Chats() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-2xl font-bold text-gray-800">Chat Support</h1>
                    {/* Main content will go here */}
                </main>
                <Footer />         
            </div>
        </div>
    )
}
