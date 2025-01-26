import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig,Preference } from "mercadopago";

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-315500731018483-012516-55132698f76483e00581dd12ba0fa0f2-2230401187", // Coloca tu access token aquí
});

const app = express();
const port = 3012;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
  try{
      const body = {
          items: [
              {
                  title:req.body.title,
                  quantity: req.body.quantity,
                  unit_price: req.body.unit_price,
               
              },

          ],
          back_urls: {
              success:  'https://github.com/Koala-UN/simon-backend',
              failure: 'http://localhost:5173/',
              pending: 'http://localhost:5173/',
          },
          auto_return: 'approved',
          payment_methods: {
              installments: null,
          },
      };
      const preference = new Preference(client);
      const response = await preference.create({ body });
      console.log(response);
      res.json({ id: response.id, });
  }catch(error){
      console.log(error);
  }

});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
