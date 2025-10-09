import { NavLink, useNavigate } from "react-router-dom";
import { Brain, Upload, Search, Mic, MessageSquare, FileText, BookOpen, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/2ndbrain-logo.png";

const mainItems = [
  { title: "Upload", url: "/workspace/upload", icon: Upload },
  { title: "Search", url: "/workspace/search", icon: Search },
  { title: "Speech", url: "/workspace/speech", icon: Mic },
];

const aiItems = [
  { title: "Chatbot", url: "/workspace/chatbot", icon: MessageSquare },
  { title: "Summarizer", url: "/workspace/summarizer", icon: FileText },
  { title: "Quiz Generator", url: "/workspace/quiz", icon: BookOpen },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="2ndBrain" className="w-8 h-8" />
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-xl font-bold">2ndBrain</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-accent/20 text-accent font-medium" : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-accent/20 text-accent font-medium" : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
