import { lazy } from 'react';
import config from '../config';
import HeaderOnly from '../layouts/components/HeaderOnly/HeaderOnly';

// const LayoutProducts = lazy(() => import('../layouts/components/LayoutProducts/LayoutProducts'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'));
const SignIn = lazy(() => import('../pages/SignIn/signIn'));
const SignUp = lazy(() => import('../pages/SignUp/signUp'));
const Home = lazy(()=>import('../pages/Home/home'));
const Products = lazy(()=>import('../pages/Products/products'));
const Profile = lazy(()=> import('../pages/Profile/Profile'));
const Payment = lazy(()=> import('../pages/Payment/Payment'));
const StaffLayout = lazy(()=>import( '../layouts/StaffLayout/StaffLayout'));
const Manager = lazy(()=>import('../pages/Manager/Manager'));
const Order = lazy(()=> import('../pages/Order/Order'));
const Seller = lazy(()=>import( '../pages/Seller/Seller'));
const Ceo = lazy(()=>import('../pages/Ceo/Ceo'))
const LoginAdmin = lazy(()=>import( '../pages/LoginASMC/LoginAdmin'));
const LoginManager = lazy(()=>import( '../pages/LoginASMC/LoginManager'));
const LoginSeller = lazy(()=>import( '../pages/LoginASMC/LoginSeller'));
const LoginCEO = lazy(()=>import( '../pages/LoginASMC/LoginCEO'));


const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        // layout:null
    },
    {
        path: config.routes.products,
        component: Products,
        // layout: LayoutProducts
    },
    {
        path: config.routes.ProductDetails,
        component: ProductDetails,
    },
    {
        path: config.routes.notFound,
        component: NotFoundPage,
    },
    {
        path: config.routes.admin,
        component: Admin,
        // layout:null
        layout: StaffLayout
    },
    {
        path: config.routes.manager,
        component: Manager,
        layout: StaffLayout
    },
    {
        path: config.routes.managerAdjustCreate,
        component: Manager,
        layout: StaffLayout
    },
    {
        path: config.routes.managerAdjustUpdate,
        component: Manager,
        layout: StaffLayout
    },
    {
        path: config.routes.seller,
        component: Seller,
        layout: StaffLayout
    },
    {
        path: config.routes.sellerAdjustCreate,
        component: Seller,
        layout: StaffLayout
    },
    {
        path: config.routes.sellerAdjustUpdate,
        component: Seller,
        layout: StaffLayout
    },
    {
        path: config.routes.ceo,
        component: Ceo,
        layout: StaffLayout
    },
    {
        path: config.routes.ceoAdjustCreate,
        component: Ceo,
        layout: StaffLayout
    },
    {
        path: config.routes.ceoAdjustUpdate,
        component: Ceo,
        layout: StaffLayout
    },
    {
        path: config.routes.ceoAnalyst,
        component: Ceo,
        layout: StaffLayout
    },
    {
        path: config.routes.signIn,
        component: SignIn,
        layout: null
    }
    ,
    {
        path: config.routes.signUp,
        component: SignUp,
        layout: null
    },
    {
        path:config.routes.profileUser,
        component: Profile,
        layout: HeaderOnly
    },
    {
        path:config.routes.order,
        component: Order,
        layout: HeaderOnly
    },
    {
        path:config.routes.Payment,
        component: Payment,
        layout: HeaderOnly
    },
    {
        path: config.routes.seller,
        component: Seller,
        layout: StaffLayout
    },
    {
        path: config.routes.loginAdmin,
        component: LoginAdmin,
        layout: null
    }
    ,
    {
        path: config.routes.loginManager,
        component: LoginManager,
        layout: null
    }
    ,
    {
        path: config.routes.loginCEO,
        component: LoginCEO,
        layout: null
    }
    ,
    {
        path: config.routes.loginSeller,
        component: LoginSeller,
        layout: null
    }
]

const privateRoutes = [
    
];
// Đảm bảo export lại sau khi thay đổi 
export { publicRoutes, privateRoutes }