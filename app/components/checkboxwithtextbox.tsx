import React, { useState, useEffect } from "react";

function CheckboxWithTextbox({
  initialChecked = false,
  collection = "",
  documentId = "",
  checkboxlabel = "name",
  onCheckboxChange,
  onTextboxChange,
  onDocumentIdColumnChange
}) {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [collectionname, setCollectionname] = useState(collection);
  const [documentIdColumn, setDocumentIdColumn] = useState(documentId);

  const handleCheckboxChange = (e: any) => {
    console.log("as", e.target.checked);

    setIsChecked(e.target.checked);
    onCheckboxChange(e.target.checked);
  };

  const handleTextboxChange = (event: any) => {
    setCollectionname(event.target.value);
    onTextboxChange(event.target.value, checkboxlabel);
  };

  const handleDocumentIdColumnChange = (event: any) => {
    setDocumentIdColumn(event.target.value);
    onDocumentIdColumnChange(event.target.value, checkboxlabel);
  };

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  useEffect(() => {
    setCollectionname(collection);
  }, [collection]);

  return (
    <div className="flex-container">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {checkboxlabel}
      </label>

      {isChecked && (
        <input
          className="textbox"
          type="text"
          placeholder="collection name"
          value={collectionname}
          onChange={handleTextboxChange}
        />
      )}

      {isChecked && (
        <input
          className="textbox"
          type="text"
          placeholder="Document ID column (eg. primary key column)"
          value={documentIdColumn}
          onChange={handleDocumentIdColumnChange}
        />
      )}
    </div>
  );
}

export default CheckboxWithTextbox;
