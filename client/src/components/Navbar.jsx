

export default function Navbar() {
    return (
        <nav className="flex items-center gap-x-7 border w-screen p-3">
            <h1 className="text-4xl">Medicare</h1>
            <input type="text" placeholder="Search" className="rounded border-gray-300 w-full" />
            <div className="whitespace-nowrap">
                <p>John Doe</p>
                <p>General Practitioner</p>
            </div>
            <input type="date" className="rounded border-gray-300 w-full" />
        </nav>
    )
}