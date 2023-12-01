import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/Menu'); // Replace '/menu' with the actual path to your menu page
    };

    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://menufyproduction.imgix.net/637858903994187272+758383.png?max-h=300&max-w=1000&fit=crop" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg hover:border-2  hover:border-red-600 transition duration-500" onClick={goToMenu}>View Menu</btn>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-index-649de79db2265.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg hover:border-2  hover:border-red-600 transition duration-500" onClick={goToMenu}>View Menu</btn>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://www.spam.com/wp-content/uploads/2020/09/HORMEL_SPAM_carbonara_02.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg hover:border-2  hover:border-red-600 transition duration-500" onClick={goToMenu}>View Menu</btn>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pwvjxysa/5add9384-9299-4060-84b7-5cb88d2dd40a" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg hover:border-2  hover:border-red-600 transition duration-500" onClick={goToMenu}>View Menu</btn>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                    </div>
                </div>
            </div>
            <div className='flex-row mx-20'>
                <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200 mx-2 my-3">
                    <div className="collapse-title text-2xl font-medium">
                        <div>
                            <h2>Locations</h2>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div>
                            <h3>Your Mom's House</h3>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200 mx-2 my-3">
                    <div className="collapse-title text-2xl font-medium">
                        <div>
                            <h2>Hours</h2>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div>
                            <h3>Sunday: Closed</h3>
                            <h3>Monday: Closed</h3>
                            <h3>Tuesday: Closed</h3>
                            <h3>Wednesday: 10am - 12pm</h3>
                            <h3>Thursday: Closed</h3>
                            <h3>Friday: Closed</h3>
                            <h3>Saturday: Closed for the Boys</h3>
                        </div>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200 mx-2 my-3">
                    <div className="collapse-title text-2xl font-medium">
                        <div>
                            <h2>Contact Us</h2>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;