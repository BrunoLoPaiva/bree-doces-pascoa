import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Hero start={() => navigate("/builder")} />
    </div>
  );
}
