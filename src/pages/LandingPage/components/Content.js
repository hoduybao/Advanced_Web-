import { Link } from "react-router-dom";

function Content() {
    return (
        <main className="container mx-auto mt-8">
            <section className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-800">Welcome to BTH Classroom</h2>
                <p className="text-gray-600 mt-4">
                    BTH Classroom helps educators create engaging learning experiences they can personalize, manage, and measure.
                </p>
                <Link to="/auth/login">
                    <button className="bg-blue-500 text-white px-6 py-3 mt-8 rounded-full">Get Started</button>
                </Link>
            </section>
            <section className="grid grid-cols-3 gap-8 mb-16">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy to Use</h3>
                    <p className="text-gray-600">
                        Our platform is designed with simplicity in mind. Easy navigation and user-friendly interface make learning enjoyable.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Collaborative</h3>
                    <p className="text-gray-600">
                        Foster collaboration among students and educators. Share resources, assignments, and feedback seamlessly.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Efficient</h3>
                    <p className="text-gray-600">
                        Streamline your educational workflow. Save time and increase productivity with our efficient classroom tools.
                    </p>
                </div>
            </section>
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                <div className="flex justify-center space-x-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Sessions</h3>
                        <p className="text-gray-600">
                            Engage in real-time with live video sessions. Connect with your classmates and instructors effortlessly.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Assignments</h3>
                        <p className="text-gray-600">
                            Participate in interactive assignments. Receive immediate feedback to enhance your learning experience.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Discussion Forums</h3>
                        <p className="text-gray-600">
                            Join discussion forums to collaborate with peers, share insights, and seek help from instructors.
                        </p>
                    </div>
                </div>
            </section>
        </main>
        // ...

    );
}

export default Content;
