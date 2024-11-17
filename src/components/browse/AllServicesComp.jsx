const AllServicesComp = ({ data, serviceCardWidth }) => {
  return (
    <div className="my-4 grid-cols-2 grid md:grid-cols-3 justify-center place-items-center">
      {data.map((service) => {
        return (
          <div className="mb-8" key={service?._id?.service}>
            <div
              className={`home-service-card rounded-lg  text-card-foreground`}
              style={{
                width: serviceCardWidth,
              }}
            >
              <img
                width={"100%"}
                height={250}
                alt={service?.service}
                src={service?._id?.image}
                className="rounded shadow"
                style={{
                  aspectRatio: "300 / 200",
                  objectFit: "cover",
                }}
              />
              <h5 className="md:whitespace-nowrap mt-3 md:text-lg font-semibold leading-none tracking-tight">
                {service?._id?.service}
              </h5>
            </div>

            <div className="mt-3">
              {service?.cities?.map((city) => {
                return (
                  <p key={city?.city}>
                    ●{" "}
                    <a
                      href={`/service/${city?.services[0]?.slug}`}
                      className="italic text-[#f12703]"
                    >
                      {service?._id?.service} in {city?.city}
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllServicesComp;
