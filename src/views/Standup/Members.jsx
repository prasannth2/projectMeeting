/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { fetchMembers } from "../../redux/slices/projectMeeting";

import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function Members({ setMemberId, projectId }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.standup);
  const [activeMemberId, setActiveMemberId] = useState(null);

  const handleClick = (id) => {
    setMemberId(id);
    setActiveMemberId(id);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(fetchMembers({ projectId }));
    }
  }, [projectId]);

  if (data?.length === 0)
    return <Loader className="mx-auto mt-4 h-6 w-6 animate-spin" />;

  return (
    <Card className={cn("rounded mb-2")}>
      <CardContent className="py-4">
        {data.map((member, index) => (
          <Card
            key={index}
            className={cn(
              "rounded bg-black text-white cursor-pointer my-1 p-2 transition-transform transform hover:scale-105",
              activeMemberId === member._id && "bg-blue-500"
            )}
            onClick={() => handleClick(member._id)}
          >
            <div>{member?.name}</div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default Members;
