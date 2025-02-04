import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesa Scout - Sobre nós",
  description: "Um site que nasceu do amor pelo futebol e a vontade de mostrar de forma prática os jogadores em ascensão",
  openGraph: {
    title: "Mesa Scout - Sobre nós",
    description: "Um site que nasceu do amor pelo futebol e a vontade de mostrar de forma prática os jogadores em ascensão",
    url: "https://mesascout.vercel.app/about", 
    siteName: "Mesa Scout",
    images: [
      {
        url: "/images/logo/mesa_logo_Br01.png", 
        width: 800,
        height: 600,
      },
    ],
  },
};

const About = () => (
  <div>
    <section className="mt-4">
      <h2>About</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, perferendis magnam? Veritatis non dolorum sapiente minus dolorem totam exercitationem blanditiis eos. Nesciunt, non earum, eius dolorem nobis accusantium excepturi qui praesentium inventore dolores, eveniet ad. Quod et impedit quibusdam repellat? Beatae, odio ad debitis vero consequuntur nostrum nam iste dignissimos. Nostrum magni modi possimus facilis ea suscipit perferendis ipsum qui provident veritatis velit, facere alias. Eos, delectus sequi voluptatem ratione deleniti eum minima vero rerum nostrum nemo atque quia, nisi, doloribus veritatis enim numquam amet rem. Fugit sequi obcaecati illum quos inventore est quia. Facere sunt autem tempora consequatur! Sunt!</p>
    </section>
    </div>
  );
  
  export default About;