"use client";
import { Tooltip } from "@heroui/tooltip";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Settings,
  FileText,
  BookOpen,
  Menu,
  ChevronsLeft,
  ListCheck,
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.marginLeft = !isOpen ? "250px" : "90px";
    }
  };
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: FileText, label: "Projects", href: "/projects" },
    { icon: BookOpen, label: "Resources", href: "/resources" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: ListCheck, label: "Tasks", href: "/tasks" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 210 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 flex h-screen flex-col bg-bg border-r border-secondary group"
    >
      <button
        onClick={toggleSidebar}
        className="flex h-16 hover:cursor-pointer items-center justify-center text-text/60 transition-all group-hover:text-accent hover:bg-secondary/20 border-b border-secondary"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <ChevronsLeft size={32} className="text-primary" />
        ) : (
          <Menu size={32} className="text-primary hover:text-accent" />
        )}
      </button>

      <nav
        aria-label="navigation"
        className="flex flex-1 flex-col gap-8 justify-start py-6 px-3"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex h-12 focus-visible:ring-2 w-full hover:scale-110 hover:translate-y-[-2px] items-center gap-6 rounded-lg px-3 transition-all ${
                item.href === "/"
                  ? currentPath === item.href
                    ? "bg-primary/20 text-primary border-l-2 border-primary shadow-2xl"
                    : "text-white hover:bg-secondary/10 hover:text-accent"
                  : currentPath.includes(item.href)
                    ? "bg-primary/20 text-primary border-l-2 border-primary shadow-2xl"
                    : "text-white hover:bg-secondary/10 hover:text-accent"
              }`}
            >
              {isOpen ? (
                <Icon size={24} className="flex-shrink-0 " />
              ) : (
                <Tooltip
                  content={item.label}
                  placement="right"
                  delay={100}
                  closeDelay={0}
                  classNames={{
                    base: "py-12 px-3 text-white shadow-xl",
                    content: "text-[1rem] ml-[0.4rem]",
                  }}
                  showArrow={true}
                >
                  <Icon size={24} className="flex-shrink-0" />
                </Tooltip>
              )}

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden tracking-widest whitespace-nowrap text-[1rem] font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-secondary p-4">
        <button className="flex w-full items-center justify-center gap-3 rounded-lg px-2 py-2 transition-all hover:bg-secondary/20">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-text font-semibold">
            N
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="text-sm font-medium text-text whitespace-nowrap">
                  Your Name
                </div>
                <div className="text-xs text-text/50 whitespace-nowrap">
                  view profile
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

export default SideBar;
