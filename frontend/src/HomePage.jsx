import HeroImage from "./images/heroimage.jpg"

export default function HomePage(){
    return (
        <div className="homepage--container">
            <div className="hero">
                <ul>
                    <li className="tag1"> #1 Free Workout Program App</li>
                    <li className="hero--tag">The Ony <span style={{color:'#5255F3'}}>Lifting App</span> You'll Ever Need</li>
                    <li> <button> Get Started</button></li>
                    <li className="tag2">Follow proven programs, track workouts, and 
                        and build custom routines.
                    </li>
                </ul>
            </div>
        </div>
    )
}