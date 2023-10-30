import { createAction } from "@reduxjs/toolkit";
import { Option } from "../components/shared/Option";

export const setGridSize = createAction<Option>("setGridSize");
