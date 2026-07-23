import Sidebar from "../../components/layout/Sidebar"


export default function Places() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800">Places</h1>
        {/* Main place content will go here */}
      </main>
    </div>
  )
}     