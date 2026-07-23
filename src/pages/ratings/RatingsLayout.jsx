import Sidebar from '../../components/layout/Sidebar'

export default function Ratings() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-800">Ratings</h1>
                {/* Main content will go here */}
            </main>
        </div>
    )
}
