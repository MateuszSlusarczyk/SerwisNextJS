import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Role } from '../nextauth';
import DashboardPracownicy from "../components/DashboardPracownicy";
import DashboardKlienci from "../components/DashboardKlienci";
import DashboardAdministrator from './DashboardAdministrator';
export default function Dashboard() {
  const [userRole, setUserRole] = useState<Role | undefined>(undefined); // Specify the type explicitly
  const { data: session, status } = useSession();

  
  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
    if (session && status === 'authenticated') {
      // Assign user role directly from session data
      const userRole = session.user?.role;
      setUserRole(userRole);
      console.log(userRole)
    }
  }, [session, status]);

  if (!session || status !== 'authenticated') {
    // Render a message or redirect if the user is not authenticated
    return <p>User not authenticated</p>;
  }
  if(userRole === 'Klient') {
  return (
      <DashboardKlienci/>
  );}
  if(userRole === 'Pracownik') {
    return (
      <DashboardPracownicy/>
    );}
  if(userRole === 'Administrator') {
    return (
      <DashboardAdministrator/>
    );}
}
