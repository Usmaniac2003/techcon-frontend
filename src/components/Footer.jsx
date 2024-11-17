import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import AppStore from "../assets/appstore.png";
import PlayStore from "../assets/playstore.png";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/logos/full_logo_light.png";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import BecomePartnerModal from "./BecomePartnerModal";

const Footer = () => {
  const [loading, setLoading] = useState(false); 
  const [openPartnerModal, setOpenPartnerModal] = useState(false); 

  const handleOpenPartnerModal = () => {
    setOpenPartnerModal(true) 
  }
  return (
    <footer className="bg-[#212121] text-white pt-6">
      <div className="container px-10 md:my-12 my-6 flex md:flex-row flex-col justify-between items-end">
        <div className="md:w-[50%]">
          <img src={Logo} width={130} />
          <p className="mt-3 text-sm text-gray-300 font-light md:w-[70%]">
            buildbazm offers a wide range of on-demand home services, including
            cleaning and maintenance, with a focus on providing expertise and
            convenience. With over 250+ verified professionals, they ensure
            trusted and reliable service at competitive prices.
          </p>
        </div>
        <div
          className="flex md:flex-row flex-col w-full my-5 md:my-0 items-center h-full justify-center md:justify-end flex-1"
        >
          {/* <Input
            value={email}
            style={{ width: isMobile ? "100%" : 280, borderColor: "gray" }}
            onInput={(e) => setEmail(e.target.value)}
            required
            className="md:mr-2"
            type="email"
            placeholder="Your Email.."
          /> */}
          <Button onClick={handleOpenPartnerModal} disabled={loading} className="mt-2 md:mt-0 w-full md:w-max" color={"black"} type="submit">
            Become a partner
          </Button>
        </div>
      </div>
      <div className="border-t border-gray-500 py-6 container px-5 mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <img width={125} src={AppStore} />
          </div>
          <div className="flex items-center space-x-2">
            <img width={125} src={PlayStore} />
          </div>
        </div>
        <div className="flex py-8 md:py-0 space-x-6">
          <a target="_blank" href="https://www.facebook.com/buildbazm">
            <FaFacebookF size={24} />
          </a>
          <a target="_blank" href="https://x.com/buildbazmt">
            <FaXTwitter size={24} />
          </a>
          <a target="_blank" href="https://www.instagram.com/buildbazm">
            <FaInstagram size={24} />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@buildbazm">
            <FaTiktok size={24} />
          </a>
        </div>
        <div className="flex space-x-4 text-sm">
          <a href="#faq" className="hover:underline">
            F.A.Q
          </a>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <a href="#sitemap" className="hover:underline">
            Sitemap
          </a>
          <a href="#career" className="hover:underline">
            Career
          </a>
        </div>
      </div>
            {openPartnerModal &&
      <BecomePartnerModal isOpen={openPartnerModal} onClose={() => setOpenPartnerModal(false)}/>
            }
    </footer>
  );
};

export default Footer;
