
import "./Landing.css";

import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'


export default function Landing(){

    const TypingEffect = ({text, speed=100, cursorSpeed=500, pauseDuration=10000}) => {
        
        const [display, setDisplay] = useState("")
        const [isTyping, setIsTyping] = useState(true)
        const [cursor, setCursor] = useState(true)

        useEffect(() => {
            
            let index = 0
            let typingInterval
            
            const type = () => {

                setIsTyping(true)
                index = 0
                setDisplay("")

                const typingInterval = setInterval ( () => {

                    if(index < text.length){
                        setDisplay((prev)=> prev + text[index])
                        index ++
                    } else {

                        clearInterval(typingInterval)
                        setIsTyping(false)

                        setTimeout(()=>{
                            type()
                        }, pauseDuration)
                    }
                }, speed)
            }

            type()

            return () => clearInterval(typingInterval)
        }, [text, speed, pauseDuration])


        useEffect(() => {
            const cursorInterval = setInterval( () => {
                setCursor((prev)=> !prev)
            }, cursorSpeed)

            return () => clearInterval(cursorInterval)
        }, cursorSpeed)

        return (
            <div style={{fontFamily:"monospace", fontSize: "1.2rem"}}>
                {display}
                {cursor && (isTyping || display !== text) && <span>|</span>}
            </div>
        )
    }

    return (
        <>

            <div class="image-container">

                <div class="overlay"></div>

                <h1>
                    <TypingEffect text="Malak Kourani, MBA, BS" speed={100} pauseDuration={1000}/>
                </h1>

                <div className="gridLinks">
                    <a className="linkedDecoration" href="/">Home</a>
                    <a className="linkedDecoration" href="https://www.linkedin.com/in/malakkourani/">LinkedIn</a>
                    <a className="linkedDecoration" href="https://github.com/Kourani">GitHub</a>
                    <a className="linkedDecoration" href="/about">About Me</a>
                    <a className="linkedDecoration" href="/more">More</a>
                </div>

            </div>



            <div className="top">
                <h2 className="gridTitle"> Experience </h2>

                <div className="gridOffers">

                    <div className="item">

                        <div>
                            <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Software Engineer</h3>

                        {/* <div>
                            <ul>
                                <li>
                                Proficiency in programming languages (e.g., Python, Java, C++, JavaScript) and frameworks (e.g., React, Spring).
                                Knowledge of algorithms, data structures, and software architecture principles.
                                </li>

                                <li>
                                Strong ability to break down complex problems and develop efficient, innovative solutions.
                                Experience troubleshooting and debugging issues across various software environments.
                                </li>

                                <li>
                                Skills in managing software development projects, including version control (e.g., Git) and agile methodologies.
                                Collaboration with cross-disciplinary teams to align technical implementation with business goals.
                                </li>

                                <li>
                                Ability to articulate technical concepts to non-technical stakeholders.
                                Clear documentation of code, processes, and system architecture for future reference.
                                </li>

                                <li>
                                Experience working in dynamic environments, adapting to new technologies and shifting project requirements.
                                Commitment to ongoing learning through tools, courses, and industry research.
                                </li>

                                <li>
                                Knowledge of testing methodologies, including unit, integration, and system testing.
                                Experience using tools for automated testing and performance monitoring.
                                </li>

                                <li>
                                Understanding of best practices for secure coding and data protection.
                                Skills in designing software solutions that scale to meet growing user demands.
                                </li>
                            </ul>
                        </div> */}

                    </div>

                    <div className="item">

                        <div>
                            <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Performance Parts Design & Release Engineer</h3>

                        <div>
                            <ul>

                                <li>
                                    Enhanced skill set in CAD software for component designs.
                                    Strong analytical skills for evaluating system performance and troubleshooting issues.
                                </li>

                                <li>
                                    Experience in addressing complex engineering challenges and delivering creative solutions.
                                    Experience applying innovative methods to optimize performance and quality.
                                </li>

                                <li>
                                    Experience in managing timelines, budgets, and cross-functional collaboration to deliver projects on time.
                                    Proficiency in balancing competing priorities while maintaining attention to detail.
                                </li>

                                <li>
                                    Experience working with diverse teams, including suppliers, testing groups, and manufacturing partners.
                                    Ensured that all stakeholders remain aligned on project progress in order to meet timelines and deliver.
                                </li>

                                <li>
                                    Knowledge of performance testing methods and tools to ensure components meet rigorous standards.
                                    Gained familiarity with production processes, including material selection and quality control.
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="item">
                        <div>
                            <img className='gridImages' src='../../../images/three.png' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Diagnositc Service Planning Engineer</h3>

                        <div>
                            <ul>
                                <li>
                                    Gained a working knowledge of system diagnostics, failure analysis, software tools and technologies for diagnostics and data analysis.
                                </li>

                                <li>
                                    Collected and analyzed system data to identify underlying issues.
                                    Experience in designing efficient diagnostic strategies and solutions.
                                </li>

                                <li>
                                    Balanced multiple projects while meeting deadlines and quality standards.
                                </li>

                                <li>
                                    Reported diagnostic findings and repetitive issues in a clear and concise manner.
                                    Strong presentation skills for conveying technical concepts to non-technical audiences.
                                </li>

                                <li>
                                    Collaborated with engineering, operations, and maintenance teams.
                                    Ability to work within multidisciplinary teams to align diagnostic goals with broader objectives.
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Graduate Student Mentor</h3>
                        <div>
                            <ul>
                                <li>
                                    Development of mentoring and coaching techniques to guide and inspire others.
                                    Motivated and empowered individuals to achieve their goals.
                                </li>

                                <li>
                                    Conveyed complex concepts clearly and effectively.
                                    Strengthened interpersonal skills through one-on-one and group mentoring interactions.
                                </li>

                                <li>
                                    Experience addressing academic, professional, and personal challenges faced by mentees.
                                    Development of conflict resolution strategies to manage and mediate issues effectively.
                                </li>

                                <li>
                                    Balanced mentoring responsibilities with academic or professional commitments.
                                    Created structured plans and timelines to help mentees stay on track.
                                </li>

                                <li>
                                    Built a supportive and inclusive environment through active listening and understanding.
                                    Recognized and adapted to the diverse needs of mentees.
                                </li>

                                <li>
                                    Provided opportunities to expand professional networks by facilitating connections for mentees.
                                    Learned about new resources and tools while guiding mentees through them.
                                </li>

                                <li>
                                    Experience explaining academic concepts and career strategies effectively.
                                    Strengthened ability to present ideas in a clear and engaging manner.
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="item">
                        <div>
                            <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        
                        <h3 className="gridTitles">
                            <a className='linkedGrid' href="https://www.instagram.com/aawbc/p/CviIDjNsXqk/">Business Intern</a>
                        </h3>

                        <div>
                            <ul>
                                <li>
                                    Analyzed data, identified trends, and created actionable insights.
                                    Gained the ability to evaluate business problems and propose practical solutions.
                                </li>

                                <li>
                                    Experience in crafting clear, persuasive presentations and reports.
                                    Enhanced verbal communication from collaborating with team members and presenting ideas.
                                </li>

                                <li>
                                    Task prioritization and met deadlines in a fast-paced environment.
                                    Strengthened multitasking skills by juggling multiple projects simultaneously.
                                </li>

                                <li>
                                    Amplified skills with business tools such as Excel, PowerPoint, and project management software.
                                </li>

                                <li>
                                    Ability to learn quickly and adapt to changing priorities and new challenges.
                                    Strengthened decision-making skills under tight timelines.
                                </li>
                            </ul>

                        </div>
                    </div>

                    {/* <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Tax Preparer</h3>
                        <div>
                            <ul>
                                <li>
                                    Gained exposure to tax laws, regulations, and compliance requirements for various entities.
                                    Experience in identifying tax-saving opportunities and ensuring accurate filings.
                                </li>

                                <li>
                                    Capable of working with complex financial data while maintaining high levels of accuracy.
                                    Strong attention to detail when preparing and reviewing tax returns and supporting documents.
                                </li>

                                <li>
                                    Experience in analyzing financial information and identifying potential discrepancies or opportunities.
                                    Experience in resolving tax-related issues and applying solutions that benefit clients.
                                </li>

                                <li>
                                    Experience managing multiple client files and meeting deadlines during peak tax season.
                                    Efficient handling of client inquiries, document collection, and tax preparation tasks within a given timeframe.
                                </li>

                                <li>
                                    Handling sensitive financial information with discretion and adhering to strict confidentiality standards.
                                    Ensuring that all tax preparations comply with ethical and legal requirements.
                                </li>

                                <li>
                                    Familiarity with tax preparation software and tools for efficient and accurate filing.
                                    Experience working with spreadsheets and databases to organize financial data and ensure accuracy.
                                </li>
                            </ul>
                        </div>
                    </div> */}

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Service Engineering & Operations Intern</h3>
                        <div>
                            <ul>
                                <li>
                                    Development of critical thinking skills for analyzing systems and implementing improvements.
                                </li>

                                <li>
                                    Interpreted operational data to identify trends and inefficiencies.
                                    Applied insights from data analysis to inform decisions and improve processes.  
                                </li>

                                <li>
                                    Exposure to managing projects, from identifying requirements to implementing solutions.
                                    Experience in balancing multiple tasks and meeting deadlines within a collaborative environment.
                                </li>

                                <li>
                                    Adapted to dynamic environments and rapidly shifting priorities.
                                    Developed innovative approaches to streamline service and engineering operations.
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mightGrid">
                
                <div className="supported">

                    <div>
                        <img className='imageTwo' src='../../../images/two.png' alt='image'/>
                    </div>

                    <h2>Malak Kourani, MBA, BS</h2>
                    
                    <p className="texted">
                    {/* Women in the engineering field have often had to challenge the stereotype that femininity and technical expertise cannot coexist. The notion that being "pretty" or fashionable undermines one's ability to excel in a male-dominated profession is outdated. On the contrary, the creativity, attention to detail, and innovative problem-solving that women engineers bring to their projects are unparalleled. I can wear a stylish outfit or have my nails done and still lead complex engineering projects because beauty and brains are not mutually exclusive—they can coexist and even complement one another. */}
                    
                    I'm a woman filled with desire and passion wandering the earth letting curiosity guide her. 
                    I graduated from high school without a plan, I didn't really know what to expect, what to major in, 
                    or even if I should entertain the idea of college. The only thing I really knew was that I thrived in 
                    two core subjects: mathematics and science. So, four years later I graduated from the University of 
                    Michigan Dearborn with a bachelor's degree in Mechanical Engineering and a bachelor's 
                    degree in Biomedical Engineering. 
                    </p>

                    <p className="texted">
                    Today I'm a second year graduate student working towards a master's degree in business administration. 
                    The master’s degree will enhance my skill set and pave way for stronger leadership and critical thinking skills. 
                    It will strengthen my ability to make tough calls at the right time and manage demanding situations. Overall, 
                    obtaining an MBA degree will provide a new perspective to business, teams and collaboration. It will certainly 
                    complement my bachelor’s degree and allow for further amplification of skills that may last a lifetime.
                    </p>

                </div>
                

                <form id='contact' method="post" action="https://formspree.io/f/xwkdjggp">
                    
                    <h2 className="gridTitle">Feel Free to Reach Out.</h2>
                    
                    <input className="innerF" name="name" type="text" name="name" placeholder="Name" />
                    
                    <input className='innerF' name="email" type="email" name="email" placeholder="Email" required />
                    
                    <textarea className="innerA" name="message" placeholder="Message" rows="6" required></textarea>
                    
                    <input className='innerB' name='send' type="submit" value="Send Message" />

                </form> 
            </div>
            
            
            <div className="top">
                <h2 className="gridTitle"> Background </h2>

                <div className="gridOffers">

                    <div className="item">
                        <div>
                            <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles"> Business Administration </h3>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Bioengineering</h3>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/white.jpg' alt='image'/>
                        </div>
                        <h3 className="gridTitles"> Mechanical Engineering </h3>
                    </div>
                </div>
            </div>


            {/* <form className="subscription" onSubmit={handleSubmit}>
            
                <div className="gridTitle">
                    Subscribe to our Newsletter
                </div>

                <input 
                    className='innerF'
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                />

                <button className="subscribeButton">Subscribe</button>
            </form> */}

        </>
    )
}
