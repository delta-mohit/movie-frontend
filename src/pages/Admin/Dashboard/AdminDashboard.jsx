import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen mt-10">
      <Sidebar />
      <Main />
    </div>
  );
};

export default AdminDashboard;
