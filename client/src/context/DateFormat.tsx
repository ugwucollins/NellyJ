type monthTypeProp = {
  monthType: "long" | "short" | "numeric" | "2-digit" | "narrow" | undefined;
};
const DateFormater = (date: Date | any, monthType: monthTypeProp | any) => {
  const ActualDate = new Date(date);
  const day = ActualDate.getDate();
  const month = ActualDate.toLocaleString("default", {
    month: monthType,
  });
  const year = ActualDate.getFullYear();
  function getOrandinal(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const dayWithSuffix = `${day}${getOrandinal(day)}`;

  return `${dayWithSuffix}, ${month} ${year}`;
};

export default DateFormater;
