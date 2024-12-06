import { useState } from "react"
import '../assets/styles/Register.css'

const Register = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [intrest,setIntrest]=useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const userData = {
        userName, userEmail, userPassword
    }

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = ()=>{
        setCurrentStep((prevStep) => prevStep - 1);
    }

    const handleSubmit = () => {
        console.log(userData)
    }

    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="container bg-gray-100 bg-opacity-80 p-5">
                            {
                                (() => {
                                    switch (currentStep) {
                                        case 0:
                                            return (
                                                <div className="flex flex-wrap -m-2">
                                                    <div className="p-2 w-full">
                                                        <div className="relative">
                                                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                onChange={(e) => setUserName(e.target.value)}
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="p-2 w-full">
                                                        <div className="relative">
                                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                onChange={(e) => setUserEmail(e.target.value)}
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="p-2 w-full">
                                                        <div className="relative">
                                                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                onChange={(e) => setUserPassword(e.target.value)}
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        case 1:
                                            return (
                                                <div className="flex flex-wrap -m-2">
                                                    <div className="p-2 w-full">
                                                        <div className="relative">
                                                            {['Music', 'Travel', 'Sports', 'Movies', 'Books', 'Nature'].map((intrest) => (
                                                                <label key={intrest} className="block mb-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="mr-2"
                                                                        onChange={() =>setIntrest(intrest)}
                                                                    />
                                                                    {intrest}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        default:
                                            return null;
                                    }
                                })()
                            }
                             <div className="p-2 w-1/2">
                                <button
                                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                    onClick={handlePrevious}>
                                    Previous
                                </button>
                            
                            {
                              
                                currentStep !== 3 ? (
                                    
                                        <button
                                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    
                                ) : (
                                        <button
                                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            onClick={handleSubmit}>
                                            Submit
                                        </button>
                                   )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Register