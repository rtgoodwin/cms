// import {init} from './CraftGraphiQL.js';
import 'graphiql/graphiql.css';
import './graphiql.scss';
import React from 'react';
import {createRoot} from 'react-dom/client';
import 'graphiql/graphiql.css';
import {CraftGraphiQL} from './components/CraftGraphiQL.jsx';

function initGraphiQl(domTarget) {
  const attributes = domTarget.attributes;
  const schemas = JSON.parse(attributes.schemas.nodeValue);
  const selectedSchema = JSON.parse(attributes.selectedSchema.nodeValue);
  const endpoint = attributes.endpoint.nodeValue;

  const root = createRoot(document.getElementById('graphiql'));
  root.render(
    <CraftGraphiQL
      endpoint={endpoint}
      selectedSchema={selectedSchema}
      schemas={schemas}
    />
  );
}

document.addEventListener('DOMContentLoaded', function () {
  initGraphiQl(document.getElementById('graphiql'));
});
