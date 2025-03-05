import React, {useRef} from 'react';

function setSchema(uid) {
  const url = new URL(window.location.href);
  url.searchParams.set('schemaUid', uid);

  location.href = url.toString();
}

export const SchemaSelector = ({items = [], value = ''}) => {
  /**
   * @type {React.MutableRefObject<null|HTMLFormElement>}
   */
  const form = useRef(null);

  function handleChange() {
    form.current?.requestSubmit();
  }

  return (
    <div className="schema-selector">
      <form method="GET" ref={form}>
        <div className="input">
          <div className="select">
            <label htmlFor="schemaUid" className="visually-hidden">
              GraphQL Schema
            </label>
            <select
              name="schemaUid"
              className="select"
              onChange={handleChange}
              defaultValue={value}
            >
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
      </form>
    </div>
  );
};
