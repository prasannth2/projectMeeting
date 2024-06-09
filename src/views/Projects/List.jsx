import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, updateProject } from "../../redux/slices/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddEdit from "./AddEdit";

import { Link } from "react-router-dom";
import moment from "moment";
import { Edit } from "lucide-react";

function List() {
  const dispatch = useDispatch();
  const { projectList,projectUpdateStatus } = useSelector((state) => state.project);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (id) => {
    setIsEditing(false);
    dispatch(
      updateProject({
        id,
        title,
      })
    );
    // Here you can add logic to save the updated title if needed
  };

  const handleChange = (e) => {
    setTitle(e.target.innerText);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {}, [projectList]);

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsOpen(true);
  };

  useEffect(() => {
    if (projectUpdateStatus) {
      dispatch(fetchProjects());
    }
  },[projectUpdateStatus])

  return (
    <>
      {projectList &&
        projectList?.map((data, index) => (
          <Card key={index} className="rounded-md h-40">
            <CardHeader className="p-4">
             
              <CardTitle
                className="text-xl px-2"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onClick={handleClick}
                onBlur={() => handleBlur(data?._id)}
                onInput={handleChange}
                style={{
                  outline: "none", // Remove the default focus outline
                  cursor: "text", // Show text cursor on hover
                }}
              >
                {data?.name}
              </CardTitle>
              <Link to={`/notes/${data?._id}`}>
                <CardDescription className="px-2">
                  {data?.description}
                </CardDescription>
              </Link>
            </CardHeader>
           <div className="flex justify-between items-baseline">
           <CardContent>
              {moment(data?.createdAt).format("YYYY-MMM-DD")}
            </CardContent>
            <Edit
                className="h-3 w-3 mr-4 cursor-pointer"
                onClick={() => handleEditProject(data)}
              />
           </div>
          </Card>
        ))}

      <AddEdit
        isOpen={isOpen}
        isEdit={true}
        currentProject={currentProject}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default List;
