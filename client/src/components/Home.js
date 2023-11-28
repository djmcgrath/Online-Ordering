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
                        <btn className="btn btn-wide btn-lg" onClick={goToMenu}>View Menu</btn>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                        <p className='text-6xl text-black font-extrabold'>CHICKEN AND WAFFLES</p>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-index-649de79db2265.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg">View Menu</btn>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                        <p className='text-6xl text-black font-extrabold'>CHICKEN AND WAFFLES</p>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://www.spam.com/wp-content/uploads/2020/09/HORMEL_SPAM_carbonara_02.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg">View Menu</btn>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                        <p className='text-6xl text-black font-extrabold'>CHICKEN AND WAFFLES</p>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pwvjxysa/5add9384-9299-4060-84b7-5cb88d2dd40a" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <btn className="btn btn-wide btn-lg">View Menu</btn>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                    <div className="absolute flex justify-center justify-self-start transform -translate-y-1/2 left-5 right-5 top-1/4">
                        <p className='text-6xl text-black font-extrabold'>CHICKEN AND WAFFLES</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;