import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <header className="flex flex-row items-center justify-between container mx-auto pt-6 mb-2">
                <Link
                    className="flex flex-row items-center gap-2 hover:bg-slate-700 transition-all duration-300 ml-2 sm:ml-0"
                    to="/"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6489/6489949.png"
                        className="w-10 sm:w-12"
                    />
                    <h1 className="text-2xl sm:text-4xl text-white">
                        SteamBack
                    </h1>
                </Link>
                <div className="flex flex-row gap-2 text-sm lg:text-lg">
                    <p className="hidden md:block px-3 py-2 bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-xl text-[#2efb1c]">
                        easily view your steam backlog
                    </p>
                    <button
                        className="hidden md:block px-3 py-2 bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-xl text-[#ff0000] font-bold"
                        onClick={() => {
                            document.getElementById("app").style.fontFamily =
                                "Helvetica, sans-serif";
                        }}
                    >
                        i hate this font
                    </button>
                </div>
            </header>
            <hr className="bg-white h-1" />
        </>
    );
}
