import { useDispatch, useSelector } from "react-redux";

// RootState and AppDispatch are declared globally in app/store.ts,
// so shared never has to import upwards from the app layer.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
