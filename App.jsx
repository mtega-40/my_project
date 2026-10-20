import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/routeGuards';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import Dashboard from './pages/dashboard/Dashboard';
import Farms from './pages/farms/Farms';
import FarmDetail from './pages/farms/FarmDetail';
import FarmForm from './pages/farms/FarmForm';
import Fields from './pages/fields/Fields';
import FieldForm from './pages/fields/FieldForm';
import Livestock from './pages/livestock/Livestock';
import LivestockForm from './pages/livestock/LivestockForm';
import Inventory from './pages/inventory/Inventory';
import InventoryForm from './pages/inventory/InventoryForm';
import Workers from './pages/workers/Workers';
import WorkerForm from './pages/workers/WorkerForm';
import Finance from './pages/finance/Finance';
import { ExpenseForm, IncomeForm } from './pages/finance/TransactionForm';
import Tasks from './pages/tasks/Tasks';
import TaskForm from './pages/tasks/TaskForm';
import Diary from './pages/diary/Diary';
import DiaryForm from './pages/diary/DiaryForm';
import ActivityLog from './pages/activity/ActivityLog';
import Users from './pages/admin/Users';
import Settings from './pages/settings/Settings';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="card text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
      <a href="/" className="btn-primary">Back to Dashboard</a>
      {!isAuthenticated && <span className="ml-3 text-sm text-gray-500">You may need to sign in.</span>}
    </div>
  );
};

const guarded = (element, permission) => (
  <ProtectedRoute permission={permission}>{element}</ProtectedRoute>
);

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />

          <Route path="farms" element={guarded(<Farms />, 'farm:read')} />
          <Route path="farms/new" element={guarded(<FarmForm />, 'farm:create')} />
          <Route path="farms/:id" element={guarded(<FarmDetail />, 'farm:read')} />
          <Route path="farms/:id/edit" element={guarded(<FarmForm />, 'farm:update')} />

          <Route path="fields" element={guarded(<Fields />, 'field:read')} />
          <Route path="farms/:farmId/fields" element={guarded(<Fields />, 'field:read')} />
          <Route path="farms/:farmId/fields/new" element={guarded(<FieldForm />, 'field:create')} />
          <Route path="farms/:farmId/fields/:id/edit" element={guarded(<FieldForm />, 'field:update')} />

          <Route path="livestock" element={guarded(<Livestock />, 'livestock:read')} />
          <Route path="farms/:farmId/livestock" element={guarded(<Livestock />, 'livestock:read')} />
          <Route path="farms/:farmId/livestock/new" element={guarded(<LivestockForm />, 'livestock:create')} />
          <Route path="farms/:farmId/livestock/:id/edit" element={guarded(<LivestockForm />, 'livestock:update')} />

          <Route path="inventory" element={guarded(<Inventory />, 'inventory:read')} />
          <Route path="farms/:farmId/inventory" element={guarded(<Inventory />, 'inventory:read')} />
          <Route path="farms/:farmId/inventory/new" element={guarded(<InventoryForm />, 'inventory:create')} />
          <Route path="farms/:farmId/inventory/:id/edit" element={guarded(<InventoryForm />, 'inventory:update')} />

          <Route path="workers" element={guarded(<Workers />, 'worker:read')} />
          <Route path="farms/:farmId/workers" element={guarded(<Workers />, 'worker:read')} />
          <Route path="farms/:farmId/workers/new" element={guarded(<WorkerForm />, 'worker:create')} />
          <Route path="farms/:farmId/workers/:id/edit" element={guarded(<WorkerForm />, 'worker:update')} />

          <Route path="finance" element={guarded(<Finance />, 'finance:read')} />
          <Route path="farms/:farmId/finance" element={guarded(<Finance />, 'finance:read')} />
          <Route path="farms/:farmId/finance/expense/new" element={guarded(<ExpenseForm />, 'finance:create')} />
          <Route path="farms/:farmId/finance/income/new" element={guarded(<IncomeForm />, 'finance:create')} />

          <Route path="tasks" element={guarded(<Tasks />, 'task:read')} />
          <Route path="farms/:farmId/tasks" element={guarded(<Tasks />, 'task:read')} />
          <Route path="farms/:farmId/tasks/new" element={guarded(<TaskForm />, 'task:create')} />
          <Route path="farms/:farmId/tasks/:id/edit" element={guarded(<TaskForm />, 'task:update')} />

          <Route path="diary" element={guarded(<Diary />, 'diary:read')} />
          <Route path="farms/:farmId/diary" element={guarded(<Diary />, 'diary:read')} />
          <Route path="farms/:farmId/diary/new" element={guarded(<DiaryForm />, 'diary:create')} />
          <Route path="farms/:farmId/diary/:id/edit" element={guarded(<DiaryForm />, 'diary:update')} />

          <Route path="activity-log" element={guarded(<ActivityLog />, 'activityLog:read')} />
          <Route path="farms/:farmId/activity-log" element={guarded(<ActivityLog />, 'activityLog:read')} />

          <Route path="admin/users" element={guarded(<Users />, 'user:read')} />

          <Route path="settings" element={<Settings />} />

          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
