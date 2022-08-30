import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    const handleEdit = (p: Project) => {
        setProjectBeingEdited(p);
    };
    const cancelEditing = () => {
        setProjectBeingEdited({});
    }

    const items = projects.map(p => (
        <div key={p.id} className="cols-sm">
            {
                p === projectBeingEdited 
                    ? <ProjectForm project={p} onCancel={cancelEditing} />
                    : <ProjectCard project={p} onEdit={handleEdit} /> 
            }
        </div>
    ));

    return <div className="row">{items}</div>;
}

export default ProjectList;