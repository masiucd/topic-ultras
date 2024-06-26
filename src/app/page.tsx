import {H1, P} from "@/shared/components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function Home() {
  // let result = await db.select().from(foods).all();
  // console.log("result", result);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center border-4 py-2">
      <H1>Nutricheck</H1>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords />
      </div>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque neque,
        corporis rerum et culpa voluptatem autem labore. Officia temporibus amet
        ipsa sint possimus laboriosam? Recusandae nemo omnis ex excepturi labore
        soluta aspernatur animi natus! Nesciunt quo praesentium beatae
        perspiciatis quia necessitatibus libero incidunt architecto.
        Voluptatibus, natus tempore! Quod quia explicabo officiis odit
        exercitationem quae, perspiciatis delectus ratione vero soluta,
        obcaecati ducimus aut! Laudantium fuga repellendus, atque ipsam
        perferendis tempore quae quod. Esse pariatur, voluptatibus sequi
        distinctio cum provident animi sed veritatis dicta, perspiciatis quia
        quibusdam alias. Architecto, odit eligendi! Atque eius, explicabo illum
        tempora dicta libero adipisci repellat blanditiis quos perferendis
        cumque unde impedit voluptatem non, dolore nesciunt ut deleniti aperiam.
        Hic ab asperiores blanditiis voluptatem natus nemo explicabo tempore.
        Voluptate culpa ex dignissimos, officiis vitae ipsa nemo quam sapiente!
        Perferendis suscipit quod voluptatibus! Ullam aperiam consectetur
        asperiores, exercitationem illum vero fuga quod iure officia iste
        laborum molestiae illo, reprehenderit rerum atque temporibus natus omnis
        similique libero, facilis quidem? Neque delectus iste repellendus! Ea,
        velit. Dolorem iste obcaecati eos quod esse reiciendis, explicabo
        repellat et soluta maiores consectetur aut! Molestiae, omnis? Voluptate
        esse, architecto hic nihil ex deserunt provident ea fuga temporibus
        rerum unde aspernatur excepturi incidunt autem quis consectetur natus
        illum sit, ut deleniti. Deserunt omnis itaque quae architecto tempora
        expedita laudantium. Mollitia non fugiat nisi laboriosam delectus.
        Quasi, fugit sapiente porro culpa modi rerum cupiditate magni ratione,
        tempore repellat ab quia ut ex fugiat obcaecati provident similique
        repudiandae dolor est. Doloribus accusamus illo nihil ea provident
        aliquid eligendi sed, eius tempore odit unde mollitia odio deleniti.
        Inventore nihil perferendis, voluptatum dicta ullam eius sequi? Ad
        quasi, optio quibusdam eum tempora dignissimos a quod fugiat facere
        eaque debitis, accusamus molestiae temporibus culpa eveniet
        voluptatibus? Fuga voluptatibus aperiam odit explicabo et vero porro
        illum eum, dolor placeat cumque iusto! Id mollitia sunt praesentium
        magnam dolor molestiae facilis illum ipsam dolorem officia non minus
        velit corrupti quos dignissimos at reprehenderit obcaecati tempore
        dolore, consequuntur libero! Nihil dolor recusandae facere saepe beatae
        tempore a iure exercitationem vero, aliquam enim doloremque corporis
        provident dolorem? Amet vel culpa facilis autem voluptatibus eveniet
        rerum voluptas veniam placeat totam temporibus laboriosam voluptatem
        optio nesciunt, nemo enim aliquid reprehenderit laudantium neque aperiam
        ipsum. Error, ducimus? Doloremque rem deleniti facilis iste eveniet
        officia error totam ut dolorum voluptatum corporis repudiandae veritatis
        ad labore minima dolores, ipsam qui asperiores aut, at pariatur? Quae et
        eaque dolorem odio explicabo vitae non tempora voluptatum illum beatae
        praesentium adipisci ad recusandae, cum eos, error, dolores harum. Optio
        similique vel rem voluptates blanditiis deserunt accusantium distinctio,
        officiis accusamus quisquam recusandae natus! Similique distinctio iusto
        nobis aut consequatur hic, ut adipisci deserunt facere alias iste
        accusamus eum mollitia provident perferendis nostrum maxime obcaecati
        enim accusantium qui voluptas ad? Nesciunt earum eos explicabo soluta
        maiores illum saepe ipsam odio labore odit! Iusto voluptatibus mollitia
        ullam, beatae veritatis id. Officiis deleniti magni laudantium veniam,
        odit placeat eligendi nulla aliquam doloremque id neque omnis saepe
        explicabo dignissimos, similique nam esse fugit ipsum eveniet? Ipsum
        fuga sequi numquam.
      </P>
    </main>
  );
}
