
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import BlogTask from "./components/teamSection/blogTask/blogTask";
import DisserForm from "./components/dissertationsForm/disserForm";
import PageNotFound from "./components/errorpages/404error/pageNotFound";
import Faq from "./components/FAQ/faq";
// import HomeFooter from "./components/footers/homeFooter/homeFooter";
import InvitePartner from "./components/invitePartner/invitePartner";
import Login from "./components/loginForm/login";
// import HomeNav from "./components/navbars/homeNav/homeNav";

import ProfileNavbar from "./components/navbars/profileNav/profileNavbar";
import ProfilePage from "./components/profilePage/profilePage";

import Ranking from "./components/ranking/ranking";
import HeroSection from "./components/studentHome/heroSection";
import TeamSection from "./components/teamSection/teamSection";
// import DefaultLayout from "./views/defaultLayout";
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
// const TeaherProfileNavbar = lazy(() => { 
//     import("./components/navbars/teacherProfileNav/profileNavbar")
// })

import TeamsSection from "./components/TeacherTeamsSection/teamSection";

// const TeamsSection = lazy(()=>{
//     import("./components/TeacherTeamsSection/teamSection")
// })





import TeacherBlogTask from "./components/TeacherTeamsSection/blogTask/blogTask";
import TeacherBlogDiscussion from "./components/TeacherTeamsSection/blogTask/blogDiscussion";
import { StudentsCrud } from "./components/bddStudents/studentsCrud";
import StudentsManagement from "./components/bddStudents/StudentsManagement";

import { SuggestionTheme } from "./components/SuggestionTheme/SuggestionForm";
import ThemeManagement from "./components/BddThemes/themesManagement";

import { ThemeCrud } from "./components/BddThemes/ThemesCrud";
import RankManagement from "./components/bddStudentRank/rankManagement";
import { RankCrud } from "./components/bddStudentRank/rankCrud";
import TeamsManagement from "./components/bddTeams/teamsManagement";
import FramerManagement from "./components/bddFramers/framerManagement";
import { nanoid } from "nanoid";

import AdminLayout from "./views/adminLayout";
import AdminNavbar from "./components/navbars/adminNav/adminNavBar";
import TeacherManagement from "./components/bddTeachers/TeacherManagement";
import { TeacherCrud } from "./components/bddTeachers/crud";
import { SuggestionThemeLicense } from "./components/SuggestionTheme/SuggestionFormLicence";

// const TeacherBlogTask = lazy(() =>
//   import("./components/TeacherTeamsSection/blogTask/blogTask")
// );
// const TeacherBlogDiscussion = lazy(() =>
//   import("./components/TeacherTeamsSection/blogTask/blogDiscussion")
// );
// const StudentsCrud = lazy(() =>
//   import("./components/bddStudents/studentsCrud")
// );
// const StudentsManagement = lazy(() =>
//   import("./components/bddStudents/StudentsManagement")
// );
// const SuggestionTheme = lazy(() =>
//   import("./components/SuggestionTheme/SuggestionForm")
// );
// const ThemeManagement = lazy(() =>
//   import("./components/BddThemes/themesManagement")
// );
// const ThemeCrud = lazy(() =>
//   import("./components/BddThemes/ThemesCrud")
// );
// const RankManagement = lazy(() =>
//   import("./components/bddStudentRank/rankManagement")
// );
// const RankCrud = lazy(() =>
//   import("./components/bddStudentRank/rankCrud")
// );
// const TeamsManagement = lazy(() =>
//   import("./components/bddTeams/teamsManagement")
// );
// const FramerManagement = lazy(() =>
//   import("./components/bddFramers/framerManagement")
// );
// const AdminLayout = lazy(() => import("./views/adminLayout"));
// const AdminNavbar = lazy(() =>
//   import("./components/navbars/adminNav/adminNavBar")
// );
// const TeacherManagement = lazy(() =>
//   import("./components/bddTeachers/TeacherManagement")
// );
// const TeacherCrud = lazy(() =>
//   import("./components/bddTeachers/crud")
// );
// const SuggestionThemeLicense = lazy(() =>
//   import("./components/SuggestionTheme/SuggestionFormLicence")
// );


import { CalendarPresentation } from "./components/Calender/calender";
import { LoadingOverlay, Overlay } from "@mantine/core";


// const ProfileNavbar = lazy(() => import('./components/navbars/profileNav/profileNavbar'));
// const ProfilePage = lazy(() => import('./components/profilePage/profilePage'));



const router = createBrowserRouter([
    {

        path: "/",
        element: <GeustLayout />,
        children: [
            {
                path: "/login",
                element: <Login key={nanoid()} />
            }, {
                index: true,
                path: "/",
                element: [<HomeHeader key={nanoid()} />, <HomeHeroSection key={nanoid()} />],
            },
        ]
    },

    {
        path: "/student",
        element: <StuentLayout key={nanoid()} />,
        children: [
            {

                path: "/student",
                element: <>  <Suspense fallback={<LoadingOverlay visible />}><ProfileNavbar key={nanoid()} /></Suspense></>,
                children: [
                    {
                        index: true,
                        element: <HeroSection key={nanoid()} />
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
                        element: <><Suspense fallback={<LoadingOverlay visible />}><ProfilePage key={nanoid()} /></Suspense>  </>
                        // element:<ProfilePage key={nanoid()} />
                    },
                    {
                        path: 'faq',
                        element: <Faq key={nanoid()} />
                    },
                    {
                        path: 'calender',
                        element: <CalendarPresentation key={nanoid()} />
                    },

                    {
                        path: 'team-section',
                        element: <TeamSection key={nanoid()} />,
                        // errorElement:<PageNotFound/> , 
                        children: [
                            {
                                index: true,
                                // path:'team-section' , 
                                element: <DisserForm key={nanoid()} />,
                                // errorElement:<PageNotFound/> , 
                            },
                            {
                                path: 'blog',
                                element: <BlogTask key={nanoid()} />,
                                // errorElement:<PageNotFound/> 
                            },
                            {
                                path: 'room',

                                element: <BlogDiscussion key={nanoid()} />,
                                // errorElement:<PageNotFound/> 
                            }
                        ]
                    }
                ],


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
                // element: <TeaherProfileNavbar />, 
                element : <><Suspense fallback={<LoadingOverlay visible />}><TeaherProfileNavbar  key={nanoid()} /></Suspense></> 
                ,
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
                        path: 'students_management',
                        element: <StudentsManagement />,
                        children: [{
                            index: true,
                            element: <StudentsCrud />
                        }]
                    },
                    {
                        path: 'suggestion_theme',
                        element: < SuggestionTheme />
                    },
                    {
                        path: 'themes_management',
                        element: <ThemeManagement />,
                        children: [{
                            index: true,
                            element: <ThemeCrud />
                        }]
                    },
                    {
                        path: 'rank_management',
                        // element: <RankManagement />,
                        element:<><Suspense fallback={<LoadingOverlay visible />}><RankManagement key={nanoid()} /></Suspense></> ,
                        children: [{
                            index: true,
                            element: <RankCrud />
                            // element:<><Suspense fallback={<LoadingOverlay visible />}><RankCrud key={nanoid()} /></Suspense></>
                        }]
                    },
                    {

                        path: 'teams_management',
                        element: <TeamsManagement />,
                    },
                    {
                        path: 'framer_management',
                        element: <FramerManagement />,
                    },
                    {
                        path: 'calender',
                        element: <CalendarPresentation key={nanoid()} />
                    },
                    {
                        path: 'teams-section',
                        element: <TeamsSection />,
                        children: [
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


                    }, {
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
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [

            {
                path: '/admin',
                element: <AdminNavbar />,
                children: [
                    {
                        path: 'students_management',
                        element: <StudentsManagement />,
                        children: [{
                            index: true,
                            element: <StudentsCrud />
                        }]
                    },
                    {
                        path: 'teacher_management',
                        element: <TeacherManagement />,
                        children: [{
                            index: true,
                            element: <TeacherCrud />
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
