import React from 'react';
import GraphiQL from 'graphiql';
import {SchemaSelector} from './SchemaSelector.jsx';

export const CraftGraphiQL = ({
  children,
  endpoint,
  selectedSchema,
  schemas,
  ...props
}) => {
  function graphQLFetcher(graphQLParams) {
    return fetch(endpoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Craft-Gql-Schema': selectedSchema.schema,
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'include',
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (responseBody) {
        try {
          return JSON.parse(responseBody);
        } catch (error) {
          return responseBody;
        }
      });
  }

  return (
    <>
      <div className="craft-graphiql-header">
        <h1 className="craft-graphiql-title">Explore the GraphQL API</h1>
        <SchemaSelector items={schemas} value={selectedSchema.schema} />
      </div>
      <div className="graphiql-container">
        <GraphiQL fetcher={graphQLFetcher} />
      </div>
    </>
  );
};
