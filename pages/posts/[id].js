import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

import postsPageInitialPathsB34e2Resource from '../../resources/posts-page-initial-paths-b34e2'
import postsPageInitialProps28ed1Resource from '../../resources/posts-page-initial-props-28ed1'

const Posts = (props) => {
  return (
    <>
      <div className="posts-container">
        <Head>
          <title>Posts - Human Operations Executive</title>
          <meta
            property="og:title"
            content="Posts - Human Operations Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(PostsEntity) => (
            <>
              <div className="posts-container1">
                <h1>{PostsEntity?.Title}</h1>
                <span>{PostsEntity?.Preview}</span>
                <span>{PostsEntity?.slug}</span>
                <div className="posts-container2">
                  <Markdown>{PostsEntity?.Content}</Markdown>
                </div>
              </div>
            </>
          )}
          initialData={props.postsEntity}
          persistDataDuringLoading={true}
          key={props?.postsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .posts-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .posts-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Posts.defaultProps = {
  postsEntity: [],
}

Posts.propTypes = {
  postsEntity: PropTypes.array,
}

export default Posts

export async function getStaticPaths() {
  const response = await postsPageInitialPathsB34e2Resource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialProps28ed1Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntity: response?.data?.[0],
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
