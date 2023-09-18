import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Human Operations Executive</title>
          <meta
            property="og:title"
            content="test-page - Human Operations Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_70w6nk) => (
            <>
              <h1>{context_70w6nk?.Name}</h1>
            </>
          )}
          initialData={props.context70w6nkProp}
          persistDataDuringLoading={true}
          key={props?.context70w6nkProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const context70w6nkProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        context70w6nkProp: context70w6nkProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
