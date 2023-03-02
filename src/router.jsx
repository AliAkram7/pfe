// import { Children } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import BlogTask from "./components/teamSection/blogTask/blogTask";
import DisserForm from "./components/dissertationsForm/disserForm";
import PageNotFound from "./components/errorpages/404error/pageNotFound";
import Faq from "./components/FAQ/faq";
import HomeFooter from "./components/footers/homeFooter/homeFooter";
import InvitePartner from "./components/invitePartner/invitePartner";
import Login from "./components/loginForm/login";
import HomeNav from "./components/navbars/homeNav/homeNav";
import ProfileNavbar from "./components/navbars/profileNav/profileNavbar";
import ProfilePage from "./components/profilePage/profilePage";
import Ranking from "./components/ranking/ranking";
import HeroSection from "./components/studentHome/heroSection";
import TeamSection from "./components/teamSection/teamSection";
import DefaultLayout from "./views/defaultLayout";
import GeustLayout from "./views/geustLayout";
import BlogDiscussion from "./components/teamSection/blogTask/blogDiscussion";
import HomeHeroSection from "./components/homePage/Home/heroSection";
import HomeHeader from "./components/navbars/homeNav/homeNav.example";
import StuentLayout from "./views/stuentLayout";
import TeacherLayout from "./views/teacherLayout";
import TeacherHeroSection from "./components/teacherHome/heroSection";
// import TeacherNavbar from "./components/navbars/teacherNavbar/teacherNavBar";
import TeacherProfilePage from "./components/TeacherprofilePage/TeacherprofilePage";
import TeaherProfileNavbar from "./components/navbars/teacherProfileNav/profileNavbar";
import TeamsSection from "./components/TeacherTeamsSection/teamSection";
import TeacherBlogTask from "./components/TeacherTeamsSection/blogTask/blogTask";
import TeacherBlogDiscussion from "./components/TeacherTeamsSection/blogTask/blogDiscussion";
import { StudentsCrud } from "./components/bddStudents/studentsCrud";
import StudentsManagement from "./components/bddStudents/StudentsManagement";



const router = createBrowserRouter([
    {
        path: "/",
        element: <GeustLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            }, {
                index: true,
                path: "/",
                element: [<HomeHeader key='Homenavbar' />, , <HomeHeroSection key='HomeHeroSection ' />, <HomeFooter key='HomeFooter' />],
            },
        ]
    },
    {
        path: "/student",
        element: <StuentLayout />,
        children: [
            {
                path: "/student",
                element: <ProfileNavbar />,
                children: [
                    {
                        index: true,
                        element: <HeroSection />
                    },
                    {
                        path: 'ranking',
                        element: <Ranking />
                    },
                    {
                        path: 'join-Team',
                        element: <InvitePartner />
                    }, {
                        path: 'profile',
                        element: <ProfilePage />
                    }, {
                        path: 'faq',
                        element: <Faq />
                    },
                    
                    {
                        path: 'team-section',
                        element: <TeamSection />,
                        errorElement:<PageNotFound/> , 
                        children: [
                            {
                                path: 'select_theme',
                                element: <DisserForm />, 
                                errorElement:<PageNotFound/> , 
                            },
                            {
                                index: true,
                                element: <BlogTask />,
                                errorElement:<PageNotFound/> 
                            },
                            {
                                path: 'room',
                                
                                element: <BlogDiscussion />,
                                errorElement:<PageNotFound/> 
                            }
                        ]
                    }
                ]
            },
            {
                path: "student",
                element: <Navigate to="/student" />
            },
        ]

    },


    {
        path: '/teacher',
        element: <TeacherLayout />,
        children: [

            {
                path: '/teacher',
                element: <TeaherProfileNavbar />,
                children: [
                    {
                        index: true,
                        element: <TeacherHeroSection />
                    },
                    {
                        path: 'profile',
                        element: <TeacherProfilePage />
                    }, 
                    {
                        path:'students_management', 
                        element:<StudentsManagement  />, 
                        children:[{
                            index:true  , 
                        element : <StudentsCrud/>
                        }]
                    },
                    {
                        path: 'teams-section',
                        element: <TeamsSection />, 
                        children:[
                            {
                                index: true,
                                element: <TeacherBlogTask />,
                            },
                            {
                                path: 'room',
                                element: <TeacherBlogDiscussion />,
                            }
                        ]

                    }

                ]
            }

        ]
    }


    ,

    {
        path: "*",
        element: <PageNotFound />,

    },
])


export default router
