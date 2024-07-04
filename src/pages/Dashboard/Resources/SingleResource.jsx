import { useParams } from "react-router-dom";
import BackButton from "~/components/Global/BackButton/BackButton";
import { useGetResourceBySlugQuery } from "~/redux/api/resources/resourcesApi";
import formatDate from "~/utilities/fomartDate";

const SingleResource = () => {
  const { slug } = useParams();
  const { data: singleRes } = useGetResourceBySlugQuery(slug, { skip: !slug });

  return (
    <div>
      <BackButton label="Back to Resources" to="/dashboard/resources" />

      <section className="bg-white rounded-2xl p-6 shadow mt-8">
        <span className="capitalize bg-onTertiary text-tertiary px-4 py-2 rounded-lg text-xs font-semibold mb-4 inline-block">
          {singleRes?.category}
        </span>

        {["Artice", "Newsletter"].includes(singleRes?.category) && (
          <img src={singleRes?.featuredImage} className="w-full max-h-[400px] mb-4" />
        )}
        <h2 className="font-bold mb-3 text-lg">{singleRes?.title}</h2>
        <p className="text-gray-dark mb-6" dangerouslySetInnerHTML={{ __html: singleRes?.description }} />

        {["Webinar", "Others"].includes(singleRes?.category) && (
          <div className="relative pb-[56.25%] h-0 overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${slug}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-6">
          {singleRes?.tags?.map((tag) => (
            <span key={tag} className="capitalize bg-gray-light px-4 py-2 rounded text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray text-sm mb-4">
          Posted: <span className="text-black font-medium">{formatDate(singleRes?.createdAt).dateTime}</span>{" "}
        </p>
        <div className="inline-flex items-center gap-4">
          <img src={singleRes?.author?.avatarUrl} className="size-10 rounded-full bg-onPrimary" />
          <p className="text-base font-semibold">{singleRes?.author?.name}</p>
        </div>

        {/* <div className="flex justify-end gap-6">
          <Button variant="outlined" label="Delete Resource" />
          <Button label="Update Resource" onClick={handleUpdate} loading={isLoading} />
        </div> */}
      </section>
    </div>
  );
};

export default SingleResource;
