export default function Navbar() {
    return (
        <nav className="fixed w-full">
            <div className="bg-sky-500 flex justify-center py-3">
                <ul className="flex flex-row items-center gap-5 max-w-5xl w-full text-white px-5">
                    <li >
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}