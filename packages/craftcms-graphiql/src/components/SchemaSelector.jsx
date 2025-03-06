import React from 'react';

export const SchemaSelector = ({items = [], value = ''}) => {
  return (
    <form method="GET" className="schema-selector">
      <div className="field">
        <div className="heading">
          <label htmlFor="schemaUid">Select Schema</label>
        </div>
        <div className="input ltr">
          <div className="select">
            <select name="schemaUid" className="select" defaultValue={value}>
              {Object.keys(items).map((key, index) => {
                return (
                  <option key={key} value={items[key]} data-uid={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <button className="btn" type="submit">
        Go
      </button>
    </form>
  );
};
