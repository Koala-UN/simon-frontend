/* import { Cta } from "./Cta";


import Ciudades from './Ciudades';
import { InfoCard } from "./infocard";
import ReservaPasos from "./Instrucciones";
import PresentacionSimon from "./presimon"; */

import { PaymentProvider } from "./components/product/context/paymentProvider";
import Product from "./components/product/product";






function App() {
  return (
    <>  
    <PaymentProvider>
      <Product></Product>
    </PaymentProvider>
    
{/*         <Cta />
      <Ciudades/>
      <PresentacionSimon/>
      <ReservaPasos/>
      <InfoCard/> */}
</>

  );
}

export default App;