// src/routes/config.js
import React from "react";
import { HOME, NOTES } from "./path";
import MeetingNotes from "../views/Standup";
import Project from "../views/Projects";

const routes = [
  {
    path: HOME,
    element: <Project />,
  },
  {
    path: NOTES,
    element: <MeetingNotes />,
  },
];

export default routes;
