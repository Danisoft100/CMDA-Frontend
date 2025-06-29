import { Link, useNavigate } from "react-router-dom";
import { FAQS } from "~/constants/faqs";
import { FOOTER_LINKS, OFFICES } from "~/constants/footer";
import Button from "~/components/Global/Button/Button";
import welcomePng from "~/assets/images/welcome.webp";
import faqPng from "~/assets/images/faq.webp";
import studentsPng from "~/assets/images/auth/signup-student-img.webp";
import doctorPng from "~/assets/images/auth/signup-doctor-img.webp";
import globalPng from "~/assets/images/auth/signup-global-img.webp";
import globalNetworkPng from "~/assets/images/globalnetwork.webp";
import { classNames } from "~/utilities/classNames";
import { useMemo } from "react";
import { useIsSmallScreen } from "~/hooks/useIsSmallScreen";

const IndexPage = () => {
  const navigate = useNavigate();

  const isMobile = useIsSmallScreen("1023px");

  const CATEGORIES = useMemo(
    () => [
      {
        name: "Students Arm",
        more: "Providing support and resources for medical and dental students to foster their professional and spiritual growth.",
        colors: ["bg-primary/70", "bg-primary"],
        image: studentsPng,
      },
      {
        name: "Doctors Arm",
        more: "Facilitating a network for practicing medical and dental doctors to collaborate, share knowledge, and strengthen their faith.",
        colors: ["bg-secondary/70", "bg-secondary"],
        image: doctorPng,
      },
      {
        name: "Global Network Members Arm",
        more: "Connecting medical and dental professionals around the world to share experiences, resources, and promote global health initiatives.",
        colors: ["bg-tertiary/70", "bg-tertiary"],
        image: isMobile ? globalPng : globalNetworkPng,
      },
    ],
    [isMobile]
  );

  return (
    <div>
      <section className="bg-gray-200 py-10 lg:py-10 bg-cover" style={{ backgroundImage: `url(${welcomePng})` }}>
        <div className="px-8 xl:px-28 flex items-center min-h-[600px]">
          <div className="p-8 lg:p-12 bg-white rounded-3xl w-full lg:w-1/2">
            <h3 className="font-bold text-3xl lg:text-4xl">Welcome to CMDA Nigeria</h3>
            <p className="my-6 lg:text-lg">
              Christian Medical and Dental Association of Nigeria seeks to establish a Christian witness through Medical
              and Dental doctors and students in every community in Nigeria and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate("/signup")} large label="Join us Now" />
              <Button onClick={() => navigate("/login")} large variant="outlined" label="Login Now" />
              <Button onClick={() => navigate("/conferences")} large variant="tertiary" label="View Conferences" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-10">
        <div className="px-8 xl:px-28 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CATEGORIES.map((item, x) => (
            <div
              key={x}
              className={classNames(
                "group rounded-3xl relative bg-cover transition-all cursor-pointer text-onPrimary",
                x > 1 ? "lg:col-span-2 h-[300px] bg-contain" : "h-96 bg-top"
              )}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={classNames("p-10 rounded-3xl h-full flex items-end", item.colors[0])}>
                <h4 className="text-xl font-semibold">{item.name}</h4>
              </div>
              <div
                className={classNames(
                  "absolute bottom-0 left-0 right-0 w-full flex flex-col justify-end",
                  item.colors[1],
                  "h-0 opacity-0 group-hover:h-full group-hover:opacity-100 rounded-3xl p-10 transition-all duration-500 ease-in-out"
                )}
              >
                <h4 className="text-base font-semibold mb-2 lg:text-xl">{item.name}</h4>
                <p className="text-sm lg:text-lg">{item.more}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-10 lg:py-10">
        <div className="px-8 xl:px-28 flex flex-col lg:flex-row gap-10">
          <img className="bg-onPrimaryContainer rounded-3xl w-full lg:w-1/2 h-auto hidden lg:block" src={faqPng} />
          <div className="p-8 lg:p-12 bg-onPrimary rounded-3xl w-full lg:w-1/2">
            <h3 className="font-bold text-2xl lg:text-3xl mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {FAQS.map((faq, index) => (
                <details key={index} className="py-2">
                  <summary className="text-sm cursor-pointer font-medium">
                    <span className="ml-4" />
                    {faq.question}
                  </summary>
                  <p className="text-sm ml-8 mt-3 font-light">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black pt-14 text-onPrimary">
        <div className="px-8 xl:px-28">
          <section className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/4">
              <div className="inline-flex items-center">
                <img src="/CMDALOGO_white.png" className="w-20 md:w-16 object-contain -ml-6 md:-ml-3" />
                <h3 className="text-white font-bold text-sm md:text-xs -ml-3">
                  CHRISTIAN MEDICAL AND DENTAL ASSOCIATION OF NIGERIA <br />
                  <span className="font-light">(CMDA NIGERIA)</span>
                </h3>
              </div>
            </div>
            <div className="w-full lg:w-3/4 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
              {Object.keys(FOOTER_LINKS).map((key) => (
                <div key={key}>
                  <h4 className="text-sm font-semibold capitalize mb-4">{key}</h4>
                  <ul className="space-y-3 list-none">
                    {FOOTER_LINKS[key].map((item) => (
                      <li key={item.name}>
                        <Link className="text-sm hover:underline p-1" to={item.href}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2">
                <h4 className="text-sm font-semibold capitalize mb-4">Visit Us</h4>
                <ul className="space-y-3 list-none">
                  {OFFICES.map((item) => (
                    <li key={item.name} className="text-sm">
                      <span className="font-semibold">{item.name}</span> -{" "}
                      <span className="font-light">{item.address}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="text-center py-8 lg:py-12 mt-8">
            <p className="text-sm">&copy; {new Date().getFullYear()} CMDA Nigeria | All rights reserved.</p>
            <p className="text-xs mt-1">
              Powered by{" "}
              <a
                href="https://www.danisoftsolution.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Danisoft Innovative Solution LTD
              </a>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
