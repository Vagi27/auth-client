import { Outlet, Navigate } from "react-router-dom";

const App = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700">
            <Outlet />
        </div>
    );
};

export default App;
