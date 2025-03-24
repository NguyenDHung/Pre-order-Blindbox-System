const FormatDateTime = (dataDateTime) => {
   const datePart = dataDateTime?.split("T")[0];
   const formattedDate = datePart?.replace(/-/g, "/").split("/").reverse().join("/");
   return formattedDate || ''
}

export { FormatDateTime }