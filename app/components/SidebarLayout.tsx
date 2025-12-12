import Sidebar from "./Sidebar"

const SidebarLayout = ({children}: any) => {
  return(
    <div className="flex h-screen bg-gray-100">
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg overflow-y-auto">
        <Sidebar/>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout