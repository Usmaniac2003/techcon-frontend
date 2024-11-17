import { Modal, ModalBody, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postApi } from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const FeedbackModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { USER } = useAuthContext();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleHover = (value) => {
    setHoverRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (feedback) {
      try {
        const response = await postApi("api/feedbacks", {
          feedback,
          rating,
          user: USER?._id,
        });
        toast.success("Thank you for your feedback!");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="w-screen z-[1000] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal
        closeOnOverlayClick={false}
        size={"lg"}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader>Give feedback!</ModalHeader>
          <ModalBody>
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <BiStar
                  key={star}
                  className={`w-10 h-10 cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => handleHover(star)}
                  onMouseLeave={() => handleHover(0)}
                />
              ))}
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              rows="4"
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className="flex flex-col items-center mb-4">
              <p className="my-4 text-center text-gray-500">OR</p>
              <Link className="underline" to={"/"}>
                Go to Home
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
