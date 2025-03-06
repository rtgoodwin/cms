import 'graphiql/graphiql.css';
import './graphiql.scss';
import React from 'react';
import {createRoot} from 'react-dom/client';
import 'graphiql/graphiql.css';
import {CraftGraphiQL} from './components/CraftGraphiQL.jsx';

export function init(domTarget) {
  const attributes = domTarget.attributes;
  const schemas = JSON.parse(attributes.schemas.nodeValue);
  const selectedSchema = JSON.parse(attributes.selectedSchema.nodeValue);
  const endpoint = attributes.endpoint.nodeValue;

  const root = createRoot(domTarget);
  root.render(
    <CraftGraphiQL
      endpoint={endpoint}
      selectedSchema={selectedSchema}
      schemas={schemas}
    />
  );
}
