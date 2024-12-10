import { Navigate } from "react-router-dom";

const Home = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || !loggedInUser?.loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1 className="">Home Page</h1>
            <p>Welcome, {loggedInUser?.username}!</p>
        </div>
    );
};

export default Home;
