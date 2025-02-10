import { Cta } from "./components/Cta";


import Ciudades from './pages/Ciudades';
import { InfoCard } from "./components/infocard";
import ReservaPasos from "./pages/Instrucciones";
import PresentacionSimon from "./pages/presimon";
import CatalogoRestaurantes from "./pages/catalogo";

function App() {
  return (
    <>  
        <Cta />
      <Ciudades/>
      <PresentacionSimon/>
      <ReservaPasos/>
      <InfoCard/>
      <CatalogoRestaurantes/>
</>
  );
}

export default App;