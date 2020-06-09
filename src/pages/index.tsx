import * as React from 'react'

import { PageProps } from 'gatsby'
import Layout, { Page } from '../components/layout'
import Title from '../components/Title'

const IndexPage: React.FC<PageProps> = () => (
  <Layout>
    <Page>
      <Title title="Giannu e Pinotto" subTitle="Teh best from Italy🇮🇹" cta />
    </Page>
  </Layout>
)

export default IndexPage
