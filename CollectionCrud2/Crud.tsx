import * as React from "react";

export interface CustomProp {
  name?: string;
  dataset: ComponentFramework.PropertyTypes.DataSet;
}

export const Crud: React.FC<CustomProp> = (props) => {
  const [nameValue, setNameValue] = React.useState("");
  const [ageValue, setAgeValue] = React.useState("");
  const [jobValue, setJobValue] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");

  const records = props.dataset.records;
  const columns = props.dataset.columns;
  console.log(records);
  console.log(columns);

  // console.log(records);
  // console.log(columns);
  // console.log(Object.keys(records));
  console.log(records[Object.keys(records)[0]]);
  // console.log(records[Object.keys(records)[0]].getFormattedValue("name"));

  // Map over the records and create a label for each one
  const labels = Object.keys(records).map((recordId) => {
    const record = records[recordId];
    // Assuming the record has a 'name' field
    const name = record.getFormattedValue("name");
    return (
      <div onClick={() => setSelectedId(record.getRecordId())} key={recordId}>
        {name}
      </div>
    );
  });

  // setInputValue("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeValue(event.target.value);
  };

  const handleJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobValue(event.target.value);
  };

  const handleUpdateButtonClick = () => {
    const record = records[selectedId];
    console.log(record.getRecordId());
    try {
      if (record.getRecordId()) {
        //@ts-ignore
        record.setValue("name", nameValue);
        //@ts-ignore
        record.setValue("age", ageValue);
        //@ts-ignore
        record.setValue("job", jobValue);
        //@ts-ignore
        record.save();
      }
    } catch (error) {
      console.log(error);
    }

    setNameValue("");
    setAgeValue("");
    setJobValue("");
  };

  const handleButtonClick = async () => {
    try {
      //@ts-ignore
      let record = await props.dataset.newRecord();
      //@ts-ignore
      await record.setValue("name", nameValue);
      //@ts-ignore
      await record.setValue("age", ageValue);
      //@ts-ignore
      await record.setValue("job", jobValue);
      // @ts-ignore
      await record.save();
    } catch (error) {
      console.log(error);
    }

    setNameValue("");
    setAgeValue("");
    setJobValue("");
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <div>{labels ? labels : ""}</div>
      <input
        type="text"
        placeholder="Name"
        value={nameValue}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Age"
        value={ageValue}
        onChange={handleAgeChange}
      />
      <input
        type="text"
        placeholder="Job"
        value={jobValue}
        onChange={handleJobChange}
      />
      <button onClick={handleButtonClick}>Create Record</button>
      <button onClick={handleUpdateButtonClick}>Update Record</button>
    </div>
  );
};
