const Footer = () => {
  1;
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <footer className="mt-24 bg-dark-400 pt-20 pb-14 text-white md:mt-40 lg:mt-80">
      <div className="main flex flex-wrap-reverse items-end justify-between gap-8 lg:flex-nowrap">
        <div className=" ">
          {/* <SvgLogo fontSize="8em" /> */}
          <p className="-mt-4" style={{ fontFamily: "Nunito" }}>
            All rights reserved &#169; {getYear()}
          </p>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-20">
          <div>
            <h5 className="font-semibold">Products</h5>
            <ul className="flex flex-col gap-4">
              <li>Interior lights</li>
              <li>Outdoor lights</li>
              <li>LED lamps and tubes</li>
              <li>LED lamps and tubes</li>
              <li>lighting management</li>
              <div className="mt-2 h-[1px] w-full rounded-full bg-white" />
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Applications</h5>
            <ul className="flex flex-col gap-4">
              <li>Offices</li>
              <li>Hotels</li>
              <li>Health establishment</li>
              <li>Tunnels</li>
              <li>Horticulture</li>
              <li>Squares and parks</li>
            </ul>
          </div>
          <div>
            <div className="mt-2 hidden h-[1px] w-full rounded-full bg-white md:block" />
            <ul className="flex flex-col gap-4">
              <li>Fashion</li>
              <li>Sport and entertainment</li>
              <li>Food and supermarkets</li>
              <li>Industrial</li>
              <li>Stadium and Large Public Venues</li>
              <li>Sport and entertainment</li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          ul {
            @apply md:mt-7;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
