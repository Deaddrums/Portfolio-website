import './ExperienceSection.css'
import image from './../../images/Jim/IMG_0535.jpeg'
import ImageAndTextOverlay from "../../components/ImageAndTextOverlay/ImageAndTextOverlay.jsx";

import icon from '../../images/icons/ExperienceSection/briefcase.png'

import folder from '../../images/icons/ExperienceSection/folder.png'
import schedule from './../../images/icons/ExperienceSection/schedule.png'
import target from './../../images/icons/ExperienceSection/target.png'

import coms from '../../images/icons/ExperienceSection/communicate.png'
import align from './../../images/icons/ExperienceSection/aligning.png'
import succes from './../../images/icons/ExperienceSection/road-to-succes.png'

import audio from '../../images/icons/ExperienceSection/audio.png'
import video from './../../images/icons/ExperienceSection/video.png'
import stack from './../../images/icons/ExperienceSection/full-stack.png'
import MetricsMover from "../../helpers/MetricsMover/MetricsMover.jsx";

function ExperienceSection() {


    return <>

        <div
            className="experienceOuterWrapper"
        >

            <div
                className="experienceInnerWrapper"
            >

                <div
                    className="experienceMainContainer"
                >
                    <div
                        className="experienceContainerTitle"
                    >

                        <img
                            id="experience Icon"
                            key="experience Icon"
                            src={icon}
                            alt="experience icon"
                        />



                        {/*<h2>*/}
                        {/*    <u>*/}
                        {/*        Experience*/}
                        {/*    </u>*/}
                        {/*</h2>*/}

                        <h3>
                            <em>
                                Making production look easy, even when it isn't
                            </em>
                        </h3>

                    </div>



<p>
    Experienced Producer and Audio engineer with a proven track record managing AAA projects across global teams.

    Led over 50 projects with a 97% client satisfaction rate,

    increasing efficiency by 75%. Skilled in localization workflows, cross-functional collaboration, and audiovisual content.

    Proven track record in project management, risk mitigation, and process optimization. Fluent in Dutch, English, and currently learning Spanish, with expertise in Gridly, LAMS, and game engines.

</p>


                </div>

                <div
                    className="imageAndSquareDivider"
                >


                    <ImageAndTextOverlay
                        id="working-Jim"
                        key="Working Jim"
                        image={image}
                        h4="Technology"
                        p="Setting up an on-the-road ambisonic recording for a 360 video shoot"
                    />

                    <div
                        className="experienceCubeContainer"
                    >

                        <div
                        className="CubeFlex"
                        >


                        <div
                            className="experienceCube"
                        >
                            <h3>
                                <u>
                                    Producer
                                </u>
                            </h3>

                            <div
                                className="experienceCubeList"
                            >
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={folder}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Keeping a tight organization
                                    </p>

                                </div>
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={schedule}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Develop clear and concise schedules
                                    </p>

                                </div>

                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={target}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Find and eliminate bottlenecks
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="experienceCube"
                        >
                            <h3>
                                <u>
                                    Engineer
                                </u>
                            </h3>

                            <div
                                className="experienceCubeList"
                            >
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={audio}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Vast experience on all audio specialities
                                    </p>

                                </div>
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={video}
                                        alt="folder icon"
                                    />

                                    <p>
                                        From live webinars and film to content
                                    </p>

                                </div>

                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={stack}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Degree in full-stack development
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="experienceCube"
                        >
                            <h3>
                                <u>
                                    Manager
                                </u>
                            </h3>

                            <div
                                className="experienceCubeList"
                            >
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={coms}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Providing clear and fun communication
                                    </p>

                                </div>
                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={align}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Aligning people and teams globally
                                    </p>

                                </div>

                                <div
                                    className="experienceCubeItem"
                                >

                                    <img
                                        id="folder icon"
                                        src={succes}
                                        alt="folder icon"
                                    />

                                    <p>
                                        Always creating a road to success
                                    </p>

                                </div>

                            </div>

                        </div>

                        </div>
                        <MetricsMover/>
                    </div>



                </div>

            </div>

        </div>

    </>

}

export default ExperienceSection