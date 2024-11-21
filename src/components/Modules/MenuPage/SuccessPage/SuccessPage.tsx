import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";




const SuccPage = () => {
    
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/menu/home"); // Redirects to the homepage (adjust the path if needed)
    };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">Payment Success!</h1>
      <p className='text-3xl mt-3'>Your transaction was successful.</p>

      <div className="flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/db5db81d-fdb0-488b-8909-b32824d319b3/9GKIefuhJM.lottie"
          loop={true}
          speed={0.5}
          autoplay
          style={{ width: '400px', height: '400px' }}
        />
      </div>

      <Button onClick={handleGoBack} className="mt-5 bg-orange-500 text-white hover:bg-orange-300">
        Go Back to Homepage
      </Button>



    </div>



  );
};

export default SuccPage;