import { classNames } from "~/utilities/classNames";
import formatDate from "~/utilities/fomartDate";

const EventCard = ({ width = 240, row, title, image, date, type, location, description, className }) => {
  return (
    <div
      className={classNames(
        "bg-white border p-4 rounded-2xl flex overflow-hidden hover:shadow-md transition-shadow duration-300",
        row ? "flex-row gap-4 items-center" : "flex-col gap-2",
        className
      )}
      style={{ width }}
    >
      <img
        src={image}
        className={classNames("bg-onPrimary object-cover h-36 w-full rounded-lg", row && "max-w-[200px] h-28")}
      />
      <div className="truncate">
        <span className="px-2 py-1 capitalize text-tertiary text-xs font-semibold bg-onTertiary rounded-3xl">
          {type}
        </span>
        <h4 className="text-sm font-bold truncate my-2 capitalize">{title}</h4>
        <p className="text-gray-dark text-xs truncate mb-1">{description}</p>
        <p className="text-gray-dark text-xs">{formatDate(date).date + ", " + formatDate(date).time}</p>
        <p className="text-gray-dark text-xs mt-2 truncate">{location}</p>
      </div>
    </div>
  );
};

export default EventCard;
