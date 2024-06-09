/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

import FormProvider, {
  CSTextFiled,
  CSMultipleSelect,
} from "@/components/custom-forms";

import { toast } from "@/components/ui/use-toast";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchMembers,
  updateProjectBulk,
  fetchProjects,
  createProject,
} from "../../redux/slices/project";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  manager: z.any(),
  members: z.any(),
});

export function InputForm({
  currentProject,
  isOpen,
  setIsOpen,
  isEdit = false,
}) {
  const dispatch = useDispatch();
  const { userList, projectBulkUpdateStatus, projectCreateStatus } =
    useSelector((state) => state.project);

  console.log(currentProject);

  const defaultValues = useMemo(
    () => ({
      name: currentProject?.name || "",
      description: currentProject?.description || "",
      manager: [currentProject?.manager] || [],
      members: currentProject?.members || [],
    }),
    [currentProject]
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data) => {
    const id = currentProject?._id;
    const filterCompleted = false;
    const bulkData = {};
    const bulkMember = [];
    // console.log(data,"data");
    bulkData.name = data?.name;
    bulkData.description = data?.description;
    data?.manager?.map((dataName) => {
      bulkData.manager = dataName?._id;
    });
    data?.members?.map((dataName) => {
      bulkMember.push(dataName?._id);
    });
    bulkData.members = bulkMember;

    console.log(bulkData, "bulkData");
    if (isEdit && bulkData) {
      dispatch(updateProjectBulk({ id, bulkData }));
    } else {
      dispatch(createProject(bulkData));
    }
  };

  useEffect(() => {
    if (projectBulkUpdateStatus) {
      setIsOpen(false);
      dispatch(fetchProjects());
      toast({
        title: "Project updated successfully bulk",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //   </pre>
        // ),
      });
    }

    if (projectCreateStatus) {
      setIsOpen(false);
      dispatch(fetchProjects());
      toast({
        title: "Project created successfully",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //   </pre>
        // ),
      });
    }
  }, [projectBulkUpdateStatus, projectCreateStatus]);

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  useEffect(() => {
    if (currentProject && isEdit) {
      reset({
        name: currentProject.name,
        description: currentProject.description,
        manager: [currentProject.manager],
        members: currentProject.members,
      });
    } else {
      reset({
        name: "",
        description: "",
        manager: [],
        members: [],
      });
    }
  }, [currentProject, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create your project</DialogTitle>
          <DialogDescription>
            <FormProvider methods={form} onSubmit={handleSubmit(onSubmit)}>
              <CSTextFiled name="name" label="Project Title *" />
              <CSTextFiled name="description" label="Description *" />
              <CSMultipleSelect
                disablePortal
                multiple
                name="manager"
                label="Choose Manager"
                options={userList}
              />
              <CSMultipleSelect
                disablePortal
                multiple
                name="members"
                label="Choose Member"
                options={userList}
              />
              <Button type="submit">Submit</Button>
            </FormProvider>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InputForm;
