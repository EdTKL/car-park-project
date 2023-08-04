import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { IRootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;