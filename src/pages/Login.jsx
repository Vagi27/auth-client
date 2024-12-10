import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Access the values from the refs
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log(username, password);

        try {
            // Send login request to the backend
            const response = await fetch("http://127.0.0.1:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                // If the response is not ok, throw an error
                throw new Error("Login failed. Please check your credentials.");
            }
            console.log(response);

            // Parse the response JSON
            const data = await response.json();
            console.log(data);

            // Check if authentication is successful
            if (data.success) {
                // Assuming data.user contains the logged-in user details
                const userDetails = { userInfo: data.payload, loggedIn: true };
                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(userDetails)
                );
                navigate("/home");
            } else {
                throw new Error(data?.message || "Authentication failed");
            }
        } catch (error) {
            // Handle error (show error message)
            alert(error.message);
        }
    };

    useEffect(() => {
        usernameRef.current?.focus(); // Focus the username field on mount
    }, []);

    return (
        <>
            <div className="relative pt-32 w-80 rounded-md bg-[#293858] ">
                <div className="absolute -top-5 left-16 bg-[#00f5e1] p-2 rounded-md w-3/5 ">
                    <p className="text-center text-black"> SIGN IN</p>
                </div>
                <form
                    onSubmit={handleLogin}
                    className="flex bg-[#213443] flex-col p-5"
                >
                    <input
                        name="username"
                        ref={usernameRef}
                        placeholder="Username"
                        required
                        className="bg-slate-700/50 border-slate-600"
                    />
                    <input
                        name="password"
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                        required
                        className="bg-slate-700/50 border-slate-600"
                    />
                    <div className="flex justify-stretch ">
                        <span>
                            <input
                                className="inline-block leading-none h-auto"
                                id="remember"
                                type="checkbox"
                            />
                            <label
                                htmlFor="remember"
                                className="text-xs leading-none text-slate-300"
                            >
                                Remember me
                            </label>
                        </span>
                        <a className="text-xs h-auto inline-block">
                            Forget your password?
                        </a>
                    </div>
                    <button
                        className="p-2 text-black rounded-md bg-[#00f5e1]"
                        type="submit"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
