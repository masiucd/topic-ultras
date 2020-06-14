import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { IFluidObject } from 'gatsby-background-image'
import styled from 'styled-components'
import Layout, { Page } from '../components/layout'
import Hero from '../components/elements/Hero'
import Title from '../components/Title'

import { handleFlex } from '../components/styles/utils/helpers'

interface ContentFulData {
  desc: string
  image: {
    fluid: IFluidObject
  }
  price: number
  slug: string
  title: string
  story: {
    id: string
    story: string
  }
}

interface Content {
  contentfulTrips: ContentFulData
}

interface PrevNext<T> {
  id: T
  title: T
  desc: T
  price: number
  slug: T
}
interface PageContext {
  tripSlug: string
  prev: PrevNext<string>
  next: PrevNext<string>
}
interface Props {
  pageContext: PageContext
  data: Content
}

const StyledTour = styled.div`
  .head {
    ${handleFlex('row', 'space-between', 'center')};
    h1 {
      font-size: 5rem;
    }
    h3 {
      font-size: 3.5rem;
    }
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }
  p {
    padding: 3.5rem 0;
    font-size: 1.8rem;
  }
`

const NavigationFooter = styled.div`
  ${handleFlex('row', 'space-around', 'center')};
  padding: 2rem 0;
  a {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.black};
    transition: ${({ theme }) => theme.transition.quickTransition};
    padding: 0.3rem 1rem;
    width: 12rem;
    display: block;
    text-align: center;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.black};
    }
  }
`

const SingleTour: React.FC<Props> = ({ pageContext, data }) => {
  const {
    contentfulTrips: {
      desc,
      image,
      price,
      slug,
      title,
      story: { story },
    },
  } = data
  const { prev, next } = pageContext
  return (
    <Layout>
      <Hero heroBg={image.fluid} className="singleTour">
        <Title title={title} subTitle={desc} cta ctaText="Order" page="/" />
      </Hero>
      <Page>
        <StyledTour>
          <div className="head">
            <h1> {title} </h1>
            <h3>From: ${price}</h3>
          </div>
          <p>{story}</p>
          <NavigationFooter>
            {prev && <Link to={`/tours${prev.slug}`}>← Prev</Link>}

            {next && <Link to={`/tours${next.slug}`}>Next →</Link>}
          </NavigationFooter>
        </StyledTour>
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query($tripSlug: String!) {
    contentfulTrips(slug: { eq: $tripSlug }) {
      price
      title
      desc
      slug
      image {
        fluid(quality: 90, maxWidth: 1290) {
          ...GatsbyContentfulFluid
        }
      }
      story {
        id
        story
      }
    }
  }
`

export default SingleTour
