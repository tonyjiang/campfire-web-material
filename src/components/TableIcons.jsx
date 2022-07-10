import {
  AddBox,
  ArrowDownward,
  ArrowUpward,
  Cancel,
  Check,
  Clear,
  Delete,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Search,
} from "@mui/icons-material";
import { forwardRef } from "react";

const TableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  ArrowDownward: forwardRef((props, ref) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ArrowUpward: forwardRef((props, ref) => (
    <ArrowUpward {...props} ref={ref} />
  )),
  Cancel: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
};

export default TableIcons;