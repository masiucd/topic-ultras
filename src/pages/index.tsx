import * as React from 'react'

import { PageProps } from 'gatsby'
import Layout, { Page } from '../components/layout'
import Title from '../components/Title'
import Hero from '../components/elements/Hero'

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <Hero className="Hero" home>
      <Title
        title="Giannu e Pinotto"
        subTitle="Teh best from Italy🇮🇹"
        cta
        bgShadow
      />
    </Hero>
    <Page>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        neque, maiores dolore modi esse et expedita iusto iure asperiores error
        corrupti inventore at nisi laboriosam, obcaecati repellendus a corporis
        omnis sapiente. Inventore porro sequi aliquam incidunt adipisci eligendi
        quae, placeat voluptatem itaque non voluptates illum accusantium alias!
        Fugiat corrupti, sequi ratione porro reprehenderit neque assumenda,
        doloremque tenetur soluta nemo exercitationem ab quis autem tempora quos
        deleniti eum veritatis temporibus debitis labore ea velit modi.
        Repellendus eum ea illo sequi? Magnam enim voluptate, repellendus
        pariatur minima veniam, repudiandae quasi aliquid debitis ad fuga
        voluptas, odio eveniet! Illo doloribus labore dolores aperiam esse!
        Reprehenderit, quas quisquam! Placeat repellat aliquid nihil molestiae
        accusamus facilis id nam eum a impedit vero sapiente explicabo
        dignissimos voluptatem voluptas quas veritatis quae, at suscipit. Eos
        qui error id quaerat rem, vitae pariatur deserunt impedit eligendi ex
        dolores! Illo nemo delectus iusto libero sapiente, provident eligendi
        optio, ad in commodi harum, corrupti earum. Eius, labore totam? Aut esse
        numquam, officia dolore id sequi vitae! Asperiores culpa doloremque
        reiciendis, accusamus saepe ab vel, itaque sed corrupti dolor sequi
        minima similique ducimus explicabo consequatur debitis perspiciatis,
        odio sunt amet alias id sapiente! Quis ipsam enim reiciendis unde,
        debitis maiores commodi?
      </p>
    </Page>
  </Layout>
)

export default IndexPage
