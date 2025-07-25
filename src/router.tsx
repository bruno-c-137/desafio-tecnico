import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import ProvideLayout, { useLayout } from "@/context/UseLayout";
import { lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ErrorElement from "@/components/ErrorBoundary/ErrorElement";
const LoginPage = lazy(() => import("@/pages/(sign-in)/Login/Login"));
const HomePage = lazy(() => import("@/pages/(signed)/Home/Home"));
const LayoutSignIn = lazy(() => import("@/pages/(sign-in)/LayoutSegnIn/LayoutSegnIn"));
const LayoutSigned = lazy(() => import("@/pages/(signed)/LayoutSigned/LayoutSigned"));
const AboutPage = lazy(() => import("@/pages/(signed)/About/About"));
const LoadingComponent = lazy(() => import("@/components/Loading/Loading"));

function ProtectedLoader() {
    const { token } = useLayout();

    if (!!token) {
        return <Outlet />
    } else {
        let params = new URLSearchParams();
        const path = new URL(window?.location?.href).pathname;
        if (path != '/') {
            params.set("redirect", new URL(window?.location?.href).pathname);
        }
        return <Navigate to={`/login?${params.toString()}`} replace={true} />
    }
}

function PublicLoader() {
    const { token } = useLayout();
    if (!!token) {
        return <Navigate to="/" replace={true} />
    } else {
        return <Outlet />
    }
}




const RouterConfig = createBrowserRouter([
    {
        path: "/",
        Component: ProvideLayout,
        errorElement: <ErrorElement />,
        children: [
            /* 
            * Páginas logadas
            */
            {
                path: '/',
                Component: ProtectedLoader,
                errorElement: <ErrorElement />,
                children: [
                    {
                        path: '/',
                        Component: LayoutSigned,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                path: '/',
                                Component: HomePage,
                                errorElement: <ErrorElement />,
                            },
                            {
                                path: '/sobre',
                                Component: AboutPage,
                                errorElement: <ErrorElement />,
                            }
                        ]
                    }
                ]
            },
            /* 
            * Páginas que não estão logadas
            */
            {
                path: '/',
                Component: PublicLoader,
                children: [
                    {
                        path: '/',
                        Component: LayoutSignIn,
                        errorElement: <ErrorElement />,
                        children: [
                            {
                                path: '/login',
                                Component: LoginPage,
                                errorElement: <ErrorElement />,
                            },
                        ]
                    }
                ]
            },
        ]
    },
]);

export default function Router() {
    return (
        <ErrorBoundary>
            <RouterProvider router={RouterConfig} fallbackElement={<LoadingComponent />} />
        </ErrorBoundary>
    )
}