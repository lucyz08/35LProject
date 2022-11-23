export default function Logout() {
    const handleLogout = () => {
        localStorage.removeItem("token");
    }
    return (
      handleLogout
    )
  }