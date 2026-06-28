import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';

import DashboardLayout from '../../components/layouts/DashboardLayout';

const Dashboard = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return <DashboardLayout activeMenu='Dashboard'>Dashboard</DashboardLayout>;
};

export default Dashboard;
