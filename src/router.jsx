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
import { HeaderStudent } from "./components/navbars/profileNav/header";
import { SuggestionTheme } from "./components/SuggestionTheme/SuggestionForm";
import ThemeManagement from "./components/BddThemes/themesManagement";
import { Children } from "react";
import { ThemeCrud } from "./components/BddThemes/ThemesCrud";
import RankManagement from "./components/bddStudentRank/rankManagement";
import { RankCrud } from "./components/bddStudentRank/rankCrud";
import TeamsManagement from "./components/bddTeams/teamsManagement";
import FramerManagement from "./components/bddFramers/framerManagement";
import { nanoid } from "nanoid";
import ResultAffectation from "./components/resultAffectation/resultAffectation";
import AdminLayout from "./views/adminLayout";
import AdminNavbar from "./components/navbars/adminNav/adminNavBar";
import TeacherManagement from "./components/bddTeachers/TeacherManagement";
import { TeacherCrud } from "./components/bddTeachers/crud";
import { SuggestionThemeLicense } from "./components/SuggestionTheme/SuggestionFormLicence";
import TeamsFollowUp from "./components/bddTeamFollowUp/followUp";



const router = createBrowserRouter([
    {
        path: "/",
        element: <GeustLayout />,
        children: [
            {
                path: "/login",
                element: <Login  key={nanoid()} />
            }, {
                index: true,
                path: "/",
                element: [<HomeHeader   key={nanoid()} />,  <HomeHeroSection  key={nanoid()} />],
            },
        ]
    },

    {
        path: "/student",
        element: <StuentLayout key={nanoid()} />,
        children: [
            {
                path: "/student",
                element: <ProfileNavbar key={nanoid()} />,
                children: [
                    {
                        index: true,
                        element: <HeroSection  key={nanoid()}  />
                    }, 
                    {
                        path: 'ranking',
                        element: <Ranking key={nanoid()} />
                    },
                    {
                        path: 'join-Team',
                        element: <InvitePartner key={nanoid()} />
                    }, {
                        path: 'profile',
                        element: <ProfilePage key={nanoid()} />
                    },
                     {
                        path: 'faq',
                        element: <Faq key={nanoid()} />
                    },
                    
                    {
                        path: 'team-section',
                        element: <TeamSection  key={nanoid()} />,
                        // errorElement:<PageNotFound/> , 
                        children: [
                            {   
                                index:true  , 
                                // path:'team-section' , 
                                element: <DisserForm key={nanoid()} />, 
                                // errorElement:<PageNotFound/> , 
                            },
                            {
                                path:'blog', 
                                element: <BlogTask key={nanoid()} />,
                                // errorElement:<PageNotFound/> 
                            },
                            {
                                path: 'room',
                                
                                element: <BlogDiscussion key={nanoid()}  />,
                                // errorElement:<PageNotFound/> 
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
                        path: 'suggestion_theme',
                        element: < SuggestionTheme/>
                    }, 
                    {
                        path: 'themes_management',
                        element: <ThemeManagement/>, 
                        children:[{
                            index:true , 
                            element: <ThemeCrud/>
                        }]
                    },
                    {
                        path: 'rank_management',
                        element: <RankManagement/>, 
                        children:[{
                            index:true , 
                            element: <RankCrud />
                        }]
                    }, 
                    {

                        path: 'teams_management',
                        element: <TeamsManagement/>, 
                    }, 
                    {
                        path: 'framer_management',
                        element: <FramerManagement/>, 
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
                            },
                         
                            // SuggestionThemeLicense
                        ]


                    },     {
                        path: 'framing_sheet_License',
                        element: <SuggestionThemeLicense />,
                    },
                    {
                        path: 'faq',
                        element: <Faq key={nanoid()} />
                    },

                ]
            }

        ]
    } , 
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [

            {
                path: '/admin',
                element: <AdminNavbar />,
                children: [
                    {
                        path:'students_management', 
                        element:<StudentsManagement  />, 
                        children:[{
                            index:true  , 
                        element : <StudentsCrud/>
                        }]
                    },
                    {
                        path:'teacher_management', 
                        element:<TeacherManagement  />, 
                        children:[{
                            index:true  , 
                        element : <TeacherCrud/>
                        }]
                    },

                  {
                        path: 'faq',
                        element: <Faq key={nanoid()} />
                    },

                ]
            }

        ]
    },
    {
        path: "*",
        element: <PageNotFound />,

    },
])


export default router
