/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestionResponse,
  createStandupData,
  updateStandupData,
  resetResponses,
} from "../../redux/slices/projectMeeting";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { Loader2, Loader, User } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const toolbarOptions = [
  [{ font: [] }, { size: [] }], // Add font and size dropdown
  ["bold", "italic", "underline", "strike"], // Add formatting buttons
  [{ color: [] }, { background: [] }], // Add color and background color dropdown
  [{ script: "sub" }, { script: "super" }], // Add superscript and subscript
  [{ header: "1" }, { header: "2" }, "blockquote", "code-block"], // Add headers, blockquote, code-block
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // Add list and indent buttons
  [{ direction: "rtl" }], // Add text direction
  [{ align: [] }], // Add text alignment dropdown
  ["link", "image", "video"], // Add link, image, video
  ["clean"], // Add clean formatting button
];

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
];

function Editor({ setQuestionId, memberId, projectId, date, questionId, day }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { qsResponses, updateStandupResonse, createStandupResonse, loading } =
    useSelector((state) => state.standup);

  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClickEditor = () => {
    setIsEdit(true);
  };

  const handleEdiorCancel = () => {
    setIsEdit(false);
  };

  const handleEditorSave = () => {
    setButtonLoading(true);
    const id = qsResponses && qsResponses[0]?._id;
    if (id) {
      dispatch(updateStandupData({ id, value }));
    } else {
      dispatch(
        createStandupData({
          questionId,
          member: memberId,
          day: day, // One of: "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
          response: value,
          week: date, // Format: YYYY-WW (Year-Week number)
          project: projectId, // Replace with a valid Project ID
        })
      );
    }
  };

  useEffect(() => {
    if (memberId) {
      dispatch(
        fetchQuestionResponse({ projectId, date, questionId, memberId })
      );
    }
  }, [date, memberId, projectId, questionId, dispatch]);

  useEffect(() => {
    console.log(qsResponses);
    if (qsResponses) {
      if (qsResponses?.length > 0) {
        console.log(qsResponses);
        setValue(qsResponses[0]?.response);
      } else {
        setValue("<p>Enter Description</p>");
      }
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    if (createStandupResonse) {
      toast({
        title: "Created Successfully.",
      });
      if (memberId) {
        dispatch(
          fetchQuestionResponse({ projectId, date, questionId, memberId })
        );
      }
      dispatch(resetResponses());
      setIsEdit(false);
      setButtonLoading(false);
    }
    if (updateStandupResonse) {
      setIsEdit(false);
      setButtonLoading(false);
    }
  }, [qsResponses, updateStandupResonse, createStandupResonse]);

  if (!memberId)
    return (
      <Card className={cn("rounded")}>
        <CardContent className="py-4 flex">
          <User className="mr-3" />
          Please select any user
        </CardContent>
      </Card>
    );

  return (
    <Card className={cn("rounded")}>
      <CardContent className="py-4">
        <Tabs
          defaultValue="66615355c0d964257c2a3be1"
          onValueChange={(e) => setQuestionId(e)}
        >
          <TabsList className="w-full justify-between">
            <TabsTrigger value="66615355c0d964257c2a3be1">
              What did you do yesterday?
            </TabsTrigger>
            <TabsTrigger value="6662069b627b773c2c13bf1f">
              What will you do today?
            </TabsTrigger>
            <TabsTrigger value="666206a6627b773c2c13bf22">
              What (if anything) is blocking your progress?
            </TabsTrigger>
          </TabsList>

          {loading && !buttonLoading ? (
            <Loader className="mx-auto mt-4 h-6 w-6 animate-spin" />
          ) : (
            <>
              <TabsContent value="66615355c0d964257c2a3be1">
                <div className="custom-quill-editor">
                  {!isEdit ? (
                    <div onClick={handleClickEditor}>
                      <ReactQuill
                        theme="snow" // You can use different themes like 'snow' or 'bubble'
                        value={value}
                        readOnly
                      
                        modules={{
                          toolbar: false, // Disable toolbar
                        }}
                      />
                    </div>
                  ) : (
                    <ReactQuill
                      theme="snow"
                      value={value}
                       modules={{ toolbar: toolbarOptions }}
                      onChange={setValue}
                    />
                  )}

                  <style jsx>{`
                    .custom-quill-editor .ql-editor {
                      background-color: rgba(
                        145,
                        158,
                        171,
                        0.08
                      ); /* Customize editor background color */
                      height: 300px; /* Customize editor height */
                      font-family: Arial, sans-serif; /* Customize font */
                      font-size: 14px; /* Customize font size */
                      color: #212b36; /* Customize text color */
                      padding: 18px; /* Add padding */
                      overflow-y: auto; /* Enable vertical scrollbar if needed */
                    }
                    .ql-toolbar.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 4px 4px 0px 0px;
                    }
                    .ql-container.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 0px 0px 4px 4px;
                    }
                  `}</style>
                </div>
                {isEdit && (
                  <div className="flex flex-row mt-4">
                    <Button
                      className="h-8 rounded-sm bg-blue-600 mr-2"
                      onClick={handleEditorSave}
                    >
                      {buttonLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save
                    </Button>

                    <Button
                      variant="ghost"
                      className="h-8 w-16 rounded-sm"
                      onClick={handleEdiorCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="6662069b627b773c2c13bf1f">
                <div className="custom-quill-editor">
                  {!isEdit ? (
                    <div onClick={handleClickEditor}>
                      <ReactQuill
                        theme="snow" // You can use different themes like 'snow' or 'bubble'
                        value={value}
                        readOnly
                        
                        modules={{
                          toolbar: false, // Disable toolbar
                        }}
                      />
                    </div>
                  ) : (
                    <ReactQuill
                      theme="snow"
                      value={value}
                      modules={{ toolbar: toolbarOptions }}
                      onChange={setValue}
                    />
                  )}

                  <style jsx>{`
                    .custom-quill-editor .ql-editor {
                      background-color: rgba(
                        145,
                        158,
                        171,
                        0.08
                      ); /* Customize editor background color */
                      height: 300px; /* Customize editor height */
                      font-family: Arial, sans-serif; /* Customize font */
                      font-size: 14px; /* Customize font size */
                      color: #212b36; /* Customize text color */
                      padding: 18px; /* Add padding */
                      overflow-y: auto; /* Enable vertical scrollbar if needed */
                    }
                    .ql-toolbar.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 4px 4px 0px 0px;
                    }
                    .ql-container.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 0px 0px 4px 4px;
                    }
                  `}</style>
                </div>
                {isEdit && (
                  <div className="flex flex-row mt-4">
                    <Button
                      className="h-8 w-16 rounded-sm bg-blue-600 mr-2"
                      onClick={handleEditorSave}
                    >
                      {buttonLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 w-16 rounded-sm"
                      onClick={handleEdiorCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="666206a6627b773c2c13bf22">
                <div className="custom-quill-editor">
                  {!isEdit ? (
                    <div onClick={handleClickEditor}>
                      <ReactQuill
                        theme="snow" // You can use different themes like 'snow' or 'bubble'
                        value={value}
                        readOnly
                        
                        modules={{
                          toolbar: false, // Disable toolbar
                        }}
                      />
                    </div>
                  ) : (
                    <ReactQuill
                      theme="snow"
                      value={value}
                      modules={{ toolbar: toolbarOptions }}
                      onChange={setValue}
                    />
                  )}

                  <style jsx>{`
                    .custom-quill-editor .ql-editor {
                      background-color: rgba(
                        145,
                        158,
                        171,
                        0.08
                      ); /* Customize editor background color */
                      height: 300px; /* Customize editor height */
                      font-family: Arial, sans-serif; /* Customize font */
                      font-size: 14px; /* Customize font size */
                      color: #212b36; /* Customize text color */
                      padding: 18px; /* Add padding */
                      overflow-y: auto; /* Enable vertical scrollbar if needed */
                    }
                    .ql-toolbar.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 4px 4px 0px 0px;
                    }
                    .ql-container.ql-snow {
                      border: 1px solid rgba(145, 158, 171, 0.2);
                      border-radius: 0px 0px 4px 4px;
                    }
                  `}</style>
                </div>
                {isEdit && (
                  <div className="flex flex-row mt-4">
                    <Button
                      className="h-8 w-16 rounded-sm bg-blue-600 mr-2"
                      onClick={handleEditorSave}
                    >
                      {buttonLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 w-16 rounded-sm"
                      onClick={handleEdiorCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default Editor;
