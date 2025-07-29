import { format } from "date-fns";

export const formatDate = (dateString) => {
  const date = format(dateString, "dd/MM/yyyy");
  return date;
};


