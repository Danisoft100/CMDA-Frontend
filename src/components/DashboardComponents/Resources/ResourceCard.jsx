import icons from "~/assets/js/icons";
import { classNames } from "~/utilities/classNames";

const ResourceCard = ({ title, subtitle, type, image, width = 240, className }) => {
  return (
    <div className={classNames("bg-white rounded-2xl border", className)} style={{ width }}>
      <img src={image} className="bg-onPrimary h-32 w-full rounded-t-lg object-cover" />
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span>{["Webinar", "Others"].includes(type) ? icons.play : icons.newspaper}</span>
          <h4 className="text-sm font-bold truncate">{title}</h4>
        </div>
        <p className="text-gray-dark text-xs mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
};

export default ResourceCard;
