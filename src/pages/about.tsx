import * as React from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'
import { IFluidObject } from 'gatsby-background-image'
import Layout, { Page } from '../components/layout'
import Hero from '../components/elements/Hero'
import Title from '../components/Title'

interface Props {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
  hero: {
    childImageSharp: {
      fluid: IFluidObject
    }
  }
}

const Body = styled.section`
  padding: 2rem 1rem;
  p {
    font-size: 1.8rem;
  }
`

const AboutPage: React.FC<PageProps<Props>> = ({ data }) => {
  const {
    hero: {
      childImageSharp: { fluid },
    },
  } = data

  return (
    <Layout onTitle="About">
      <Hero className="About" heroBg={fluid}>
        <Title
          title={`About ${data.site.siteMetadata.title}`}
          cta
          ctaText="Tours"
          page="tours"
        />
      </Hero>
      <Page>
        <Body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            commodi, quos in ullam recusandae amet minus quae et velit numquam
            expedita perferendis accusamus asperiores hic exercitationem
            quaerat. Magnam, eligendi! Facere fugit ratione dolor neque officia
            inventore suscipit doloribus distinctio adipisci numquam ducimus
            voluptas similique, hic possimus vero non quibusdam nostrum soluta,
            perferendis totam! Inventore accusantium odit optio fugiat omnis.
            Quisquam vero soluta, magni cupiditate nesciunt, libero quaerat
            asperiores aliquam quos suscipit iste quam dolor. Atque quos
            adipisci nostrum sed, quaerat error dolorum doloribus consequatur
            neque voluptate tempore exercitationem dolor saepe. Error esse
            architecto animi ullam earum neque quam ipsum? Suscipit magnam ut
            excepturi enim voluptatum neque porro ipsa cumque consectetur modi.
            Minima nesciunt reiciendis neque aliquid dolore. Tempore facilis sed
            est nobis eaque dolorem voluptate ipsam impedit atque architecto,
            minima qui inventore provident at excepturi libero molestiae
            molestias dolorum quidem? Dignissimos incidunt animi iste
            voluptatibus ipsa harum, ipsum explicabo aut reprehenderit
            obcaecati, beatae alias tempore consequatur et
            <br />
            <br />
            praesentium, distinctio consectetur cupiditate voluptatum ad qui?
            Cum error, similique eaque eligendi atque perspiciatis nesciunt
            repellat labore soluta temporibus corrupti tempora! Dolore porro
            reprehenderit eos ducimus sed ullam. Rerum eius iusto dicta tenetur
            maxime aliquid ut perspiciatis, cumque exercitationem, provident
            unde. Natus, explicabo ratione non in iste impedit magni numquam
            earum blanditiis repellat! Dicta hic laborum exercitationem
            perspiciatis tempora a laudantium velit doloremque, veritatis
            asperiores labore, amet voluptatibus tenetur molestiae repudiandae
            ex mollitia quo repellat fuga sapiente ducimus saepe eveniet.
            Asperiores animi laborum ea culpa. Corporis, recusandae impedit
            assumenda porro quidem deleniti eveniet magni aut minus praesentium
            quod fuga in nobis? Fuga, autem. Voluptate iste quas nam eius
            ratione iusto odit doloremque rerum, id laboriosam quia soluta ea
            natus.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            nemo minus tempore excepturi maxime expedita atque illo architecto
            laborum, culpa maiores consequuntur dolorum dicta quo, numquam
            accusamus ut, a earum ipsa? Non accusamus provident, quo sint beatae
            tempora eos molestiae inventore labore minima numquam id officia,
            quasi quis quos nemo harum amet asperiores nam unde doloribus, totam
            molestias exercitationem. Cumque voluptas dolores delectus quo
            doloribus officia tenetur, magnam possimus corrupti! Pariatur
            nostrum vel quos hic inventore laboriosam soluta id esse at
            laudantium consequatur neque autem dolores maxime commodi aliquid
            itaque, alias eius nobis. Possimus assumenda commodi voluptatum ea
            mollitia dolore sint ducimus aut dolorem accusamus porro
            voluptatibus, aliquid, beatae inventore hic ab repudiandae alias
            provident at quas. Quo, illo magni! Ratione quod repudiandae
            recusandae incidunt id debitis a voluptas, dolorem et ipsa libero
            rem reiciendis sequi totam quidem magnam cumque?
          </p>
        </Body>
      </Page>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    hero: file(relativePath: { eq: "la3.jpeg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1290) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default AboutPage
