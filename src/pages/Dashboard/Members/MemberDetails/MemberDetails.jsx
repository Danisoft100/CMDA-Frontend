import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import icons from "~/assets/js/icons";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import Loading from "~/components/Global/Loading/Loading";
import { useGetSingleUserQuery } from "~/redux/api/user/userApi";
import { classNames } from "~/utilities/classNames";

const DashboardMemberDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: member, isLoading } = useGetSingleUserQuery(id);

  const memberInfo = useMemo(() => {
    return {
      "First Name": member?.firstName,
      "Middle Name": member?.middleName,
      "Last Name": member?.lastName,
      Gender: member?.gender,
      Membership: member?.role,
      Region: member?.region,
      "Email Address": member?.email,
      About: member?.bio,
    };
  }, [member]);

  return (
    <div>
      <BackButton to="/dashboard/members" label="Back to Members List" />

      <div className="max-w-screen-md mx-auto shadow h-[calc(100vh-240px)] md:h-[calc(100vh-180px)] overflow-y-auto bg-white rounded-lg pb-5 mt-6">
        <div className="flex gap-3 justify-between items-center p-5 mb-5 bg-white rounded-t-lg sticky top-0 right-0 left-0">
          <h2 className="text-black truncate text-xl md:text-2xl font-bold">{member?.firstName}</h2>
          <Button
            color={member?.role === "student" ? "secondary" : member?.role.includes("global") ? "tertiary" : "primary"}
            onClick={() => navigate("/dashboard/messaging?id=" + member?._id)}
          >
            Message
          </Button>
        </div>

        {member?.avatarUrl ? (
          <img
            className="size-32 md:size-40 bg-cover bg-white p-1 rounded-full mx-auto"
            src={member?.avatarUrl}
            alt=""
          />
        ) : (
          <div className="text-center">
            <span
              className={classNames(
                "inline-flex justify-center items-center text-8xl size-32 md:size-40 border p-1 rounded-full",
                member?.role === "Doctor"
                  ? "bg-onSecondary text-secondary"
                  : member?.role.includes("Global")
                    ? "bg-onTertiary text-tertiary"
                    : "bg-onPrimary text-primary"
              )}
            >
              {icons.person}
            </span>
          </div>
        )}
        <h5 className="text-center font-semibold mt-1">{member?.membershipId}</h5>

        {isLoading ? (
          <Loading height={48} width={48} className="text-primary mx-auto my-40" />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-col-2 md:grid-cols-3 gap-4 md:gap-8 mt-5 p-5 pb-0">
              {Object.entries(memberInfo).map(([key, value]) => (
                <div
                  key={key}
                  className={
                    key === "About" ? "col-span-2 md:col-span-3" : key === "Email Address" ? "col-span-2" : "col-span-1"
                  }
                >
                  <h5 className="font-bold uppercase mb-0.5 text-xs text-gray-dark">{key}</h5>
                  <p className={classNames("text-black text-sm md:text-base", !key.includes("Email") && "capitalize")}>
                    {value || "---"}
                  </p>
                </div>
              ))}
            </div>
            {/* <div className="flex gap-2 px-5 mt-4 md:mt-8">
              {member?.socials?.map((item) => (
                <a
                  key={item.name}
                  href={item.link?.startsWith("http") ? item.link : "https://" + item.link}
                  className="bg-gray-light rounded-full text-lg h-9 w-9 inline-flex justify-center items-center hover:text-primary cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                >
                  {icons[item.name]}
                </a>
              ))}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardMemberDetailsPage;
