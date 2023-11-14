function Navbar() {
    return (
        <nav class="bg-white-800">
            <div class="relative flex h-16 items-center justify-between">
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a href="/" class="text-black rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                            <a href="/" class="text-black-300 rounded-md px-3 py-2 text-sm font-medium">Get started</a>
                            <a href="/" class="text-black-300 rounded-md px-3 py-2 text-sm font-medium">For educators</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
