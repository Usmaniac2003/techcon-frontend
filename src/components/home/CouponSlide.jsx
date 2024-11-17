const CouponSlide = ({data, AllServices}) => {
    const services = data?.applicableServices?.map((s) => AllServices?.find(s2 => s2?.slug === s)?.title) || []; 
  return (
    <>
      <div className="relative shadow-lg">
        <div
          className="w-full rounded-xl bg-cover bg-center h-[260px] bg-no-repeat"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            backgroundImage:
              `url(${data?.image})`,
          }}
        >
          <div className="absolute bottom-0 right-0 flex h-full flex-col justify-between items-end">
            <div className="p-2 rounded px-4 text-2xl text-white bg-black">
              Get{" "}
              <span className="font-bold text-3xl bg-secondary px-3 text-white">
                {data?.discount}%
              </span>{" "}
              discount for <br />{" "}
              <span className="font-bold italic">{services?.join(",")}</span>
            </div>
            <div className="flex items-end">
              <div className="text-white bg-primary px-2 pb-1">Use code</div>
              <div className="rounded-tl-xl rounded-br-xl bg-black text-white text-lg p-1 px-5 font-bold">
                {data?.code}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponSlide;
