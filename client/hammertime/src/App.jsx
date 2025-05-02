import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext"; // Add this import
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateAuction from "./pages/CreateAuction";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AuctionList from "./pages/AuctionList";
import BidPage from "./pages/BidPage";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        {" "}
        {/* Add SocketProvider here */}
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auctions" element={<AuctionList />} />
            <Route path="/auctions/:id" element={<BidPage />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Protected Buyer Routes */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth roles={["buyer"]}>
                  <Cart />
                </RequireAuth>
              }
            />

            {/* Protected Seller Routes */}
            <Route
              path="/create-auction"
              element={
                <RequireAuth roles={["seller"]}>
                  <CreateAuction />
                </RequireAuth>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
