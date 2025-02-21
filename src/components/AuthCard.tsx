import LoginForm from "../pages/Login";
import backgroundImage from"../assets/bglogin.png";

//console.log(backgroundImage); // Add t1his line to check the URL

function Authcard() {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <LoginForm />
      </div>
    </>
  );
}

export default Authcard;