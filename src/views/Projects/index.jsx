import { PlusCircle } from "lucide-react";
import ListProject from "./List";
import AddEdit from "./AddEdit";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Project() {
  const [isOpen, setIsOpen] = useState(false);

  const handleEditProject = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="p-5 flex items-center">
        <Button onClick={handleEditProject}>
          Add Project
          <PlusCircle className="w-4 h-4 ml-3" />
        </Button>
      </div>
      <div className="hidden items-start justify-center gap-6 p-8 md:grid lg:grid-cols-4">
        <AddEdit isOpen={isOpen} currentProject={{}} setIsOpen={setIsOpen}/>
        <ListProject />
      </div>
    </>
  );
}

export default Project;
