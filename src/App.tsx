import { Cta } from "./Cta";


import Ciudades from './Ciudades';
import { InfoCard } from "./infocard";
import ReservaPasos from "./Instrucciones";
import PresentacionSimon from "./presimon";
import CatalogoRestaurantes from "./catalogo";

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