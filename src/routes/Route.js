import { path } from "framer-motion/client";
import { Fragment, lazy } from "react";

const PreorderCampaignCreate = lazy(() => import("../pages/Admin/Pre-orderCampaign/PreorderCampaignCreate"));
const OrderDetailView = lazy(() => import("../pages/Staff/OrderManagement/OrderDetailView"));
const AdminLayout = lazy(() => import("../components/layouts/AdminLayout"));
const DefaultLayout = lazy(() => import("../components/layouts/DefaultLayout"));
const Home = lazy(() => import("../pages/Home/Home"));
const LoginPage = lazy(() => import("../pages/Account/Login"));
const RegisterPage = lazy(() => import("../pages/Account/Register"));
const StaffView = lazy(() => import("../pages/Staff/StaffView"));
const ProductsView = lazy(() => import("../pages/Staff/ProductManagement/ProductsView"));
const OrdersView = lazy(() => import("../pages/Staff/OrderManagement/OrdersView"));
const NotificationsView = lazy(() => import("../pages/Staff/NotificationManagement/NotificationsView"));
const NotificationDetailView = lazy(() => import("../pages/Staff/NotificationManagement/NotificationDetailView"));
const ProductCreatePage = lazy(() => import("../pages/Staff/ProductManagement/ProductCreate"));
const ProductEditPage = lazy(() => import("../pages/Staff/ProductManagement/ProductEdit"));
const AdminView = lazy(() => import("../pages/Admin/AdminView"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const StaffManagement = lazy(() => import("../pages/Admin/StaffManagement/StaffManagement"));
const StaffManagementDetails = lazy(() => import("../pages/Admin/StaffManagement/StaffManagementDetails"));
const Pre_orderCampaign = lazy(() => import("../pages/Admin/Pre-orderCampaign/PreorderCampaign"));
const Pre_orderCampaignDetails = lazy(() => import("../pages/Admin/Pre-orderCampaign/Pre_orderCampaignDetails"));
const VoucherManagement = lazy(() => import("../pages/Admin/VoucherCampaign/Voucher"));
const VoucherDetails = lazy(() => import("../pages/Admin/VoucherCampaign/VoucherDetails"));
const VoucherCreate = lazy(() => import("../pages/Admin/VoucherCampaign/VoucherCreate"));
const VoucherUpdate = lazy(() => import("../pages/Admin/VoucherCampaign/VoucherEdit"));
const HistoryTransactions = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactions"));
const BannerManagement = lazy(() => import("../pages/Admin/BannerManagement/BannerView"));
const BannerViewDetails = lazy(() => import("../pages/Admin/BannerManagement/BannerViewDetails"));
const ConfirmEmailAccount = lazy(() => import("../pages/ConfirmEmailAccount/ConfirmEmailAccount"));
const Cart = lazy(() => import("../pages/Customer/Cart"));
const ProductList = lazy(() => import('../pages/Home/ProductList/ProductList'));
const ProductDetail = lazy(() => import('../pages/Products/ProductDetail/ProductDetail'));
const DepositPage = lazy(() => import("../pages/Wallet/Deposit"));
const Wallet = lazy(() => import("../pages/Wallet/Wallet"));
const Withdraw = lazy(() => import("../pages/Wallet/Withdraw"));
const WalletRechargeResponse = lazy(() => import("../pages/Wallet/WalletRechargeResponse"));
const SearchResultPage = lazy(() => import("../pages/SearchResultPage/SearchResultPage"));
const ForgotPassword = lazy(() => import("../pages/Account/ForgotPassword"));
const SendEmailForgotPassword = lazy(() => import("../pages/Account/SendEmailForgotPassword"));
const AddNewPassword = lazy(() => import("../pages/Account/AddNewPassword"));
const MyVoucher = lazy(() => import("../pages/Customer/MyVoucher"));
const Notifications = lazy(() => import("../pages/Customer/Notifications"));
const NotificationDetail = lazy(() => import("../pages/Customer/NotificationDetail"));

const PreorderCampaignEdit = lazy(() => import("../pages/Admin/Pre-orderCampaign/PreorderCampaignEdit"));
const ConfirmBuy = lazy(() => import("../pages/ConfirmBuy/ConfirmBuy"));
const BulkOrder = lazy(() => import("../pages/Home/BulkOrder/BulkOrder"));

const ApprovalCampaign = lazy(() => import("../pages/Admin/ApprovalCampaign/ApprovalCampaign"));
const ApprovalCampaignDetail = lazy(() => import("../pages/Admin/ApprovalCampaign/ApprovalCampaignDetail"));
const MyOrders = lazy(() => import("../pages/Customer/Orders/MyOrders"));

const ViewPendingOrderDetail = lazy(() => import("../pages/Customer/Orders/ViewPendingOrderDetail"));
const ViewDetailOrder = lazy(() => import("../pages/Customer/Orders/ViewDetailOrder"));
const Profile = lazy(() => import("../pages/Customer/Profile"));
const IntroductionPage = lazy(() => import("../pages/IntroductionPage/IntroductionPage"));
const WithdrawTransactionDetail = lazy(() => import("../pages/Admin/WithdrawTransaction/WithdrawTransactionDetail"));
const WithdrawTransaction = lazy(() => import("../pages/Admin/WithdrawTransaction/WithdrawTransaction"));
const UpdatePassword = lazy(() => import("../pages/Account/UpdatePassword"));
const DepositHistory = lazy(() => import("../pages/Wallet/DepositHistory"));
const DepositHistoryDetails = lazy(() => import("../pages/Wallet/DepositHistoryDetails"));

const HistoryTransactionsAll = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactionsAll"));
const HistoryTransactionsRecharge = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactionsRecharge"));
const HistoryTransactionsPurchase = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactionsPurchase"));
const HistoryTransactionsWithdraw = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactionsWithdraw"));
const HistoryTransactionsRefund = lazy(() => import("../pages/Admin/HistoryTransactions/HistoryTransactionsRefund"));
const AllCampaignPage = lazy(() => import("../pages/AllCampaignPage/AllCampaignPage"));

const publicRoutes = [
  {
    index: true,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: LoginPage,
    layout: DefaultLayout,
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: DefaultLayout,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword
  },
  {
    path: '/user-forget-password/verify-email',
    component: SendEmailForgotPassword
  },
  {
    path: '/user-forget-password',
    component: AddNewPassword
  },
  {
    path: '/confirmemail',
    component: ConfirmEmailAccount
  },
  {
    path: '/preordercampaign/:slug',
    component: ProductDetail,
    layout: DefaultLayout
  },
  {
    path: '/campaign/search',
    component: SearchResultPage,
    layout: DefaultLayout
  },
  {
    path: '/test',
    component: BulkOrder
  },
  {
    path: '/gioi-thieu',
    layout: DefaultLayout,
    component: IntroductionPage
  },
  {
    path: '/san-pham',
    layout: DefaultLayout,
    component: AllCampaignPage
  }
];

const privateRoutes = [
  {
    path: '/wallet',
    component: Wallet,
    layout: DefaultLayout,
    children: [
      { index: true, component: DepositPage, layout: null },
      { path: 'deposit', component: Withdraw, layout: null },
      { path: 'deposit-history', component: DepositHistory, layout: null },
      { path: 'deposit-history/details/:id', component: DepositHistoryDetails, layout: null },
    ],
    role: ['Customer']
  },
  {
    path: '/wallet/paymentResponse',
    component: WalletRechargeResponse,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: '/confirm-order',
    component: ConfirmBuy,
    role: ['Customer']
  },
  {
    path: '/profile',
    component: Profile,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: "/my-order",
    layout: DefaultLayout,
    children: [
      {
        index: true,
        component: MyOrders,
        layout: DefaultLayout,
      },
      {
        path: "pending-orders/detail/:id",
        component: ViewPendingOrderDetail,
        layout: DefaultLayout,
      },
      {
        path: "detail/:id",
        component: ViewDetailOrder,
        layout: DefaultLayout,
      },
    ],
    role: ["Customer"],
  },

  {
    path: "/admin",
    component: AdminView,
    children: [

      { index: true, component: StaffManagement },
      { path: "staffmanagement", component: StaffManagement },
      { path: "staffmanagement-details/:id", component: StaffManagementDetails },
      { path: "preordercampaign", component: Pre_orderCampaign },
      { path: "preordercampaign/details/:slug", component: Pre_orderCampaignDetails },
      { path: "preordercampaign/create", component: PreorderCampaignCreate },
      { path: "preordercampaign/edit/:slug", component: PreorderCampaignEdit },


      { path: "banner-management", component: BannerManagement },
      { path: "banner-management-details/:id", component: BannerViewDetails },
      { path: "notifications", component: NotificationsView },
      { path: "dashboard", component: Dashboard },
      { path: "voucher", component: VoucherManagement },
      { path: "voucher/add", component: VoucherCreate },
      { path: "voucher-details/:id", component: VoucherDetails },
      { path: "voucher/update/:id", component: VoucherUpdate },
      { path: "preordercampaignApproval", component: ApprovalCampaign },
      { path: "preordercampaignApproval/confirm/:slug", component: ApprovalCampaignDetail },
      { path: "withdraw-request", component: WithdrawTransaction },
      { path: "withdraw-request/:id", component: WithdrawTransactionDetail },
    ],
    role: ['Admin']
  },
  {
    path: "/admin/history-transactions",
    component: HistoryTransactions,
    layout: AdminLayout,

    children: [
      { path: "all", component: HistoryTransactionsAll }, // Mặc định là All
      { path: "recharge", component: HistoryTransactionsRecharge },
      { path: "purchase", component: HistoryTransactionsPurchase },
      { path: "withdraw", component: HistoryTransactionsWithdraw },
      { path: "refund", component: HistoryTransactionsRefund },
    ],
    role: ["Admin"],
  },
  {
    path: "/staff",
    component: StaffView,
    children: [
      { index: true, component: ProductsView },
      { path: "products", component: ProductsView },
      { path: "orders", component: OrdersView, },
      { path: "orders/:id", component: OrderDetailView },
      { path: "notifications", component: NotificationsView },
      { path: "notifications/:id", component: NotificationDetailView },
      { path: "product/create", component: ProductCreatePage },
      { path: "product/edit/:id", component: ProductEditPage },
    ],
    role: ['Staff']
  },
  {
    path: '/notifications',
    component: Notifications,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: '/notifications/:id',
    component: NotificationDetail,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: '/cart',
    component: Cart,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: '/myvoucher',
    component: MyVoucher,
    layout: DefaultLayout,
    role: ['Customer']
  },
  {
    path: '/change-password',
    component: UpdatePassword,
    layout: DefaultLayout,
    role: ['Customer']
  }

];
export { publicRoutes, privateRoutes };