import Members from "@/views/Standup/Members";
import Editor from "@/views/Standup/Editor";
import CalendarDate from "@/views/Standup/CalendarDate";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

function Standup() {
  let { projectID } = useParams();
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [memberId, setMemberId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [questionId, setQuestionId] = useState("66615355c0d964257c2a3be1");

  useEffect(() => {
    
    if (projectID) {
      setProjectId(projectID);
    }
  }, [projectID]);

  return (
    <div className="hidden items-start justify-center gap-6 p-8 md:grid lg:grid-cols-12">
      <div className="col-span-3">
        <Members
          memberId={memberId}
          setMemberId={setMemberId}
          projectId={projectId}
        />
        <CalendarDate date={date} setDate={setDate} day={day} setDay={setDay} />
      </div>
      <div className="col-span-9">
        <Editor
          memberId={memberId}
          projectId={projectId}
          questionId={questionId}
          setProjectId={setProjectId}
          setQuestionId={setQuestionId}
          date={date}
          day={day}
        />
      </div>
    </div>
  );
}

export default Standup;
