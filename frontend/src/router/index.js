import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Login.vue';
import RegisterPage from '../components/Register.vue';
import DashboardPage from '../views/Dashboard.vue';
import EmployeePortal from '../views/EmployeePortal.vue';
import PatientPortal from '../views/PatientPortal.vue';
import AddPatientPage from '../views/AddPatientPage.vue';
import EditPatientPage from '../views/EditPatientPage.vue';
import AddEmployee from '../views/AddEmployee.vue';
import EditEmployee from '../views/EditEmployee.vue';


const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/employee-portal', component: EmployeePortal, meta: { requiresAuth: true } },
  { path: '/patient-portal', component: PatientPortal, meta: { requiresAuth: true } },
  { path: '/patient-portal/add', component: AddPatientPage },
  { path: '/patient-portal/edit/:id', component: EditPatientPage },
    { path: '/employee-portal/add', component: AddEmployee },
  { path: '/employee-portal/edit/:id', component: EditEmployee },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;