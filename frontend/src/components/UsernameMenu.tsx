import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts2/AppContext";
import { useNavigate } from "react-router-dom"; // Added navigation

const UsernameMenu = () => {
  const { user, setUser, showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Added navigation hook

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      // Force immediate state cleanup
      setUser(null);
      
      // Invalidate any cached queries related to auth
      await queryClient.invalidateQueries("validateToken");
      
      // Clear all query data for a fresh state
      await queryClient.removeQueries();
      
      // Show success feedback
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      
      // Redirect to home page
      navigate("/"); // Added navigation
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-white">
        <CircleUserRound className="text-white" />
        {user ? (
          <span className="ml-2">{user?.email || "Admin"}</span>
        ) : (
          <span className="ml-2">Gest</span> // Better fallback
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white content-center">
        <DropdownMenuItem>
          <Button
            onClick={handleSignOut}

            className="flex flex-1 font-semibold hover:bg-[#fc9948] rounded-1xl"
            variant="ghost" // Better button semantics
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;








/* before dp import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts2/AppContext";
//import { Link } from "react-router-dom";

const UsernameMenu = () => {
  const { user, setUser, showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      setUser(null); // Clear user data on logout
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-white">
        <CircleUserRound className="text-white" />
        <span className="ml-2">{user?.email || "Admin"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white content-center">
       
     
        <DropdownMenuItem>
          <Button
            onClick={handleSignOut}
            className="flex flex-1 font-semibold hover:bg-[#fc9948] rounded-1xl"
          >
           sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;*/




/*

 <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="flex flex-1 font-semibold hover:bg-[#fc9948] rounded-1xl"
          >
            User Profile
          </Link>
        </DropdownMenuItem> 
        */