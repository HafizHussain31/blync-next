import React, { useEffect } from "react";
import "./styles.scss";
import assets from "../../assets";
import InputField from "../../components/inputField";
import DropDownComponent from "../../components/dropDown";
import { useState } from "react";
import PrimaryButton from "../../components/primaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomController from "../../components/customController";
import { dropDownValidation } from "../../utils";
import { Checkbox } from "antd";
import { addReplication, getAllCollections, getSourceTables } from "../../redux/reducers/replicationSlice";
import { ErrorToast } from "../../components/errorToast";
import { Toast } from "../../components/toast";
import MultiSelect from "../../components/multiSelect";
import ModalComponent from "../../components/modal";
import SecondaryButton from "../../components/secondaryButton";
import { JSONTree } from 'react-json-tree';

const AddReplication = () => {
  let navigate = useNavigate();

  let location = useLocation();

  const { state } = location;

  const [badgeData, setBadgeData] = useState(state?.data);

  const [selectedCategory, setSelectedCatgory] = useState("");

  const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);

  const [openTableModal, setOpenTableModal] = useState(false);

  const [badgeImageData, setBadgeImageData] = useState(null);

  const [selectedJsonData, setSelectedJsonData] = useState();

  const [sourceTables, setSourceTables] = useState([])
  const [collectionData, setCollectionData] = useState([])
  
  const [documentIdData, setDocumentIdData] = useState([]);

  const theme = {
    scheme: "monokai",
    base00: "#272822",
    base08: "#f92672",
    base0B: "#a6e22e",
    base0A: "#f4bf75",
    base0D: "#66d9ef",
    base0E: "#ae81ff",
    base0C: "#a1efe4",
    base05: "#f8f8f2",
  };

  const [sourceDatabaseTypeData, setSourceDatabaseTypeData] = useState([
    {
      label: 'Sql Server',
      value: 'sql-server',
    },
    {
      label: 'Postgre Sql',
      value: 'postgre-sql',
    },
    {
      label: 'Couchbase',
      value: 'couchbase',
    }
  ]);

  const [mapDataSource, setMapDataSource] = useState([{
    tables: [],
    collectionName: null,
    documentId: null
  }])

  const [sourceDatabaseType, setSourceDatabaseType] = useState(null)

  const [destDatabaseTypeData, setDestDatabaseTypeData] = useState([
    {
      label: 'Couchbase',
      value: 'couchbase',
    },
    {
      label: 'Rest API',
      value: 'rest-api',
    }
  ]);

  const [destDatabaseType, setDestDatabaseType] = useState(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    trigger,
    watch,
    setError
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);

    let {
      replicationName,
      bucketName,
      dDatabaseName,
      dHostName,
      dPassword,
      dUserName,
      sDatabaseName,
      sHostName,
      sPassword,
      sPortNumber,
      sUserName,
    } = data;

    if (sourceTables.length == 0) {
      ErrorToast("Please execute show tables on the source")
      return
    }

    let checkedCountAndData = sourceTables.filter(it => it.isChecked);

    if (checkedCountAndData.length == 0) {
      ErrorToast("Please select atleast one table from source")
      return
    }


    let sourceDbTypeLabel = sourceDatabaseType?.label;
    let sourceDbTypeValue = sourceDatabaseType?.value;

    let destDbTypeLabel = destDatabaseType?.label;
    let destDbTypeValue = destDatabaseType?.value;

    let topics = '';

    let topicsToCollection = '';

    let topicsToDocumentId = '';

    for (let i = 0; i < checkedCountAndData.length; i++) {
      const element = checkedCountAndData[i];

      let {
        changeKey,
        documentId,
        value
      } = element;

      if (changeKey == '') {
        ErrorToast(`Please enter the change key for ${value}`);
        return
      }

      if (documentId == '') {
        ErrorToast(`Please enter the document id for ${value}`);
        return
      }

      topics += `${replicationName}.dbo.${value}`;

      topicsToCollection += `${replicationName}.dbo.${value}=${bucketName}.${dDatabaseName}.${changeKey}`;

      topicsToDocumentId += `${replicationName}.dbo.${value}=/after/${documentId}`;

      if (i != checkedCountAndData.length - 1) {
        topics += ',';
        topicsToCollection += ',';
        topicsToDocumentId += ',';
      }
    }


    let request = {
      "source": sourceDbTypeLabel,
      "destination": destDbTypeLabel,
      "sourceConfig": {
        "name": `${replicationName}-${sourceDbTypeValue}`,
        "config": {
          "connector.class": "io.debezium.connector.sqlserver.SqlServerConnector",
          "tasks.max": "1",
          "database.server.name": replicationName,
          "database.hostname": sHostName,
          "database.port": `${sPortNumber}`,
          "database.user": sUserName,
          "database.password": sPassword,
          "database.dbname": sDatabaseName,
          "database.history.kafka.bootstrap.servers": "localhost:9092",
          "database.history.kafka.topic": `${replicationName}.streamtopic`
        }
      },
      "destinationConfig": {
        "name": `${replicationName}-${destDbTypeValue}`,
        "config": {
          "name": `${replicationName}-${destDbTypeValue}`,
          "connector.class": "com.couchbase.connect.kafka.CouchbaseSinkConnector",
          "tasks.max": "2",
          "topics": topics,
          "couchbase.seed.nodes": dHostName,
          "couchbase.bootstrap.timeout": "10s",
          "couchbase.bucket": bucketName,
          "couchbase.username": dUserName,
          "couchbase.password": dPassword,
          "couchbase.topic.to.collection": topicsToCollection,
          "couchbase.topic.to.document.id": topicsToDocumentId,
          "couchbase.document.id": "/after/id",
          "couchbase.persist.to": "NONE",
          "couchbase.replicate.to": "NONE",
          "key.converter": "org.apache.kafka.connect.storage.StringConverter",
          "value.converter": "org.apache.kafka.connect.json.JsonConverter",
          "value.converter.schemas.enable": "false"
        }
      },
      "connectionname": replicationName,
      "username": "Hafiz"
    }

    addReplication(request).then(res => {
      Toast({ message: "Replication added successfully" });
      navigate(-1);
    }).catch(err => {
      ErrorToast("Something went wrong.");
    })

  }

  const onChangeValue = (value, index, key) => {
    let item = [...sourceTables];

    item[index][key] = value;

    setSourceTables(item);
  }

  const onClickShowSourceTable = async () => {
    const sourceDatabaseType = getValues('sourceDatabaseType');
    const sHostName = getValues('sHostName');
    const sUserName = getValues('sUserName');
    const sPortNumber = getValues('sPortNumber');
    const sPassword = getValues('sPassword');
    const sDatabaseName = getValues('sDatabaseName');

    // if(!sourceDatabaseType){
    //   await trigger('sourceDatabaseType')
    //   return
    // }

    if (!sHostName) {
      await trigger('sHostName')
      return
    }

    if (!sPortNumber) {
      await trigger('sPortNumber')
      return
    }

    if (!sUserName) {
      await trigger('sUserName')
      return
    }

    if (!sPassword) {
      await trigger('sPassword')
      return
    }

    if (!sDatabaseName) {
      await trigger('sDatabaseName')
      return
    };

    let request = {
      "username": sUserName,
      "password": sPassword,
      "database": sDatabaseName,
      "hostname": sHostName
    }

    setSourceTables([])


    getSourceTables(request).then(res => {
      let finalArray = []
      if (res && Array.isArray(res)) {
        let item = [...res];

        for (let i = 0; i < item.length; i++) {
          const {
            tablename,
            columns
          } = item[i];
          let object = {
            value: tablename,
            label: tablename,
            columns
          }

          finalArray.push(object)
        }
      }

      setSourceTables(finalArray);
      collectionListApi()
    }).catch(_err => {

    })

  }

  const collectionListApi = () => {
    getAllCollections().then(res => {
      let finalArray = [];
      if (res && Array.isArray(res)) {
        let item = [...res];

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          let object = {
            value: element,
            label: element
          }

          finalArray.push(object)
        }
      }

      setCollectionData(finalArray)
      setIsOpenRightMenu(true)

    }).catch(_err => {})
  }

  const closeMenu = () => {
    setIsOpenRightMenu(false)
  }

  const onChangeMapData = (value, index, key) => {
    let item = [...mapDataSource];

    item[index][key] = value;

    if (key == 'tables') {
      if(item[index]?.tables?.length > 1){
        item[index]["documentId"] = null;
        setDocumentIdData([]);
      }else{
        let columns = value && Array.isArray(value) && value.length > 0 && value[0].columns && Array.isArray(value[0].columns) && value[0].columns?.length > 0 ? value[0].columns : [];
  
        let item = columns.map(it => {
          return {
            label: it,
            value: it
          }
        });
  
        console.log(item, 'item');
        setDocumentIdData([...item]);
      }
     
    }

    setMapDataSource(item);
  }

  const onClickEyeIcon = (obj) => {
    let {
      tables,
      documentId,
      collectionName
    } = obj

    if (tables.length == 0) {
      ErrorToast("Please select atleast on table")
      return
    }

    if (collectionName == null) {
      ErrorToast("Please select collection name")
      return
    }

    if (tables.length == 1 && documentId == null) {
      ErrorToast("Please select document id")
      return
    }

    if (tables.length > 1) {
      let json = {}
      for (let i = 0; i < tables.length; i++) {
        const element = tables[i];
        let columns = element && element.columns && Array.isArray(element.columns) && element.columns?.length > 0 ? element.columns : [];

        let columnsJson = {}

        for (let i = 0; i < columns.length; i++) {
          const element = columns[i];
          columnsJson = {
            ...columnsJson,
            [element]: 'value'
          }
        }
        json = {
          ...json,
          [element.value]: {
            ...columnsJson
          }
        }
        setSelectedJsonData(json)
      }
      setSelectedJsonData(json)
    } else {
      let columns = tables && Array.isArray(tables) && tables.length > 0 && tables[0].columns && Array.isArray(tables[0].columns) && tables[0].columns?.length > 0 ? tables[0].columns : [];
      let json = {}
      for (let i = 0; i < columns.length; i++) {
        const element = columns[i];
        json = {
          ...json,
          [element]: 'value'
        }
      }
      setSelectedJsonData(json)
    }

  }

  const onClickDeleteIcon = (index) => {
    let item = [...mapDataSource]

    item.splice(index, 1)

    setMapDataSource(item)
  }

  const onClickAddNew = () => {
    let item = [...mapDataSource]

    item.push({
      tables: [],
      collectionName: null,
      documentId: null
    });

    setMapDataSource(item)
  }

  const shouldExpandNodeInitially = () => true;

  return (
    <>
      {isOpenRightMenu && <div className="backdrop" onClick={closeMenu}></div>}
      <div className="add-replication-container">
        <div className="back-to-user-container">
          <img
            src={assets.Icons.left_icon}
            alt="left-icon"
            className="left-icon"
          />
          <span
            className="back-to-user"
            onClick={() => navigate("/main/replications")}
          >
            Back to Replications
          </span>
        </div>
        <div className="title-add-replication">
          <p className="edit-replication-details">{badgeData ? `Edit Replication` : `Create a new Replication`}</p>
        </div>

        <div className="d-flex ms-2">
          <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label className="login-input-label">Replication Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("replicationName", {
                    required: "Replication Name is required",
                    maxLength: {
                      value: 50,
                      message: "Replication Name cannot exceed 50 characters"
                    }
                  })}
                  error={errors.replicationName}
                  messages={errors}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <label className="form-title">Source</label>
              </div>
              <div className="col-6">
                <label className="form-title">Destination</label>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-6">
                <label className="login-input-label">Database Type</label>
                <CustomController
                  name="sourceDatabaseType"
                  control={control}
                  data={sourceDatabaseType}
                  error={errors.sourceDatabaseType}
                  register={register("sourceDatabaseType", dropDownValidation('Source Database Type'))}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropDownComponent
                        options={sourceDatabaseTypeData}
                        borderGreen
                        error={errors.sourceDatabaseType}
                        value={sourceDatabaseType}
                        onChange={(e) => {
                          setSourceDatabaseType(e);
                          onChange(e?.value);
                        }}
                        placeholder="Select a Database Type"
                      />
                    );
                  }}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Database Type</label>
                <CustomController
                  name="destDatabaseType"
                  control={control}
                  data={null}
                  error={errors.destDatabaseType}
                  register={register("destDatabaseType", dropDownValidation('Destination Database Type'))}
                  render={({ field: { onChange } }) => {
                    return (
                      <DropDownComponent
                        options={destDatabaseTypeData}
                        borderGreen
                        error={errors.destDatabaseType}
                        value={destDatabaseType}
                        onChange={(e) => {
                          setDestDatabaseType(e)
                          onChange(e?.value);
                        }}
                        placeholder="Select a Database Type"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Host Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: X.X.X.X"
                  register={register("sHostName", {
                    required: "Host Name is required",
                    maxLength: {
                      value: 50,
                      message: "Replication Name cannot exceed 50 characters"
                    }
                  })}
                  error={errors.sHostName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Host Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: X.X.X.X"
                  register={register("dHostName", {
                    required: "Host Name is required",
                  })}
                  error={errors.dHostName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Port Number</label>
                <InputField
                  type={"number"}
                  placeholder="Eg: 0000"
                  register={register("sPortNumber", {
                    required: "Port Number is required",
                  })}

                  error={errors.sPortNumber}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Bucket</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: Bucket"
                  register={register("bucketName", {
                    required: "Bucket Name is required",
                  })}
                  error={errors.bucketName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">User Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("sUserName", {
                    required: "User Name is required",
                  })}
                  error={errors.sUserName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">User Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxx"
                  register={register("dUserName", {
                    required: "User Name is required",
                  })}
                  error={errors.dUserName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Password</label>
                <InputField
                  type={"password"}
                  placeholder="Eg: *****"
                  register={register("sPassword", {
                    required: "Password is required",
                  })}
                  rightIcon
                  eyeIcon
                  passwordIcon
                  error={errors.sPassword}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Password</label>
                <InputField
                  type={"password"}
                  placeholder="Eg: *****"
                  register={register("dPassword", {
                    required: "Password is required",
                  })}
                  rightIcon
                  eyeIcon
                  passwordIcon
                  error={errors.dPassword}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="login-input-label">Database Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxxx"
                  register={register("sDatabaseName", {
                    required: "Database Name is required",
                  })}
                  error={errors.sDatabaseName}
                  messages={errors}
                />
              </div>
              <div className="col-6">
                <label className="login-input-label">Scope Name</label>
                <InputField
                  type={"text"}
                  placeholder="Eg: xxxxx"
                  register={register("dDatabaseName", {
                    required: "Database Name is required",
                  })}
                  error={errors.dDatabaseName}
                  messages={errors}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <div className="center-button">
                  <PrimaryButton
                    type="button"
                    label={'Show Tables'}
                    onClick={() => onClickShowSourceTable()} />
                </div>

                {/* <div className="mt-5">
                  {
                    sourceTables.map((it, index) => {
                      let {
                        isChecked,
                        value,
                        changeKey,
                        documentId
                      } = it
                      return (
                        <div className="d-flex align-items-center gap-2 mb-4">
                          <Checkbox
                            value={isChecked}
                            onChange={(r) => onChangeValue(r.target.checked, index, "isChecked")
                            } />
                          <label className="ms-1 label-text">{value}</label>
                          {
                            isChecked && <div className="d-flex align-items-center gap-2">
                              <InputField
                                value={changeKey}
                                onChange={(r) => onChangeValue(r.target.value, index, "changeKey")
                                } />
                              <InputField
                                value={documentId}
                                onChange={(r) => onChangeValue(r.target.value, index, "documentId")} />
                            </div>
                          }
                        </div>
                      )
                    })
                  }
                </div> */}
              </div>
              <div className="col-6 center-button">
                <PrimaryButton
                  type="button"
                  label={'Show Collections'}
                  onClick={() => { }} />
              </div>
            </div>

            <div className="col-12 mt-5 center-button">
              <PrimaryButton
                label={'Save Replication'} />
            </div>
          </form>
        </div>
      </div>

      <div className={`right-side-menu ${isOpenRightMenu ? "open" : ""}`}>
        <h2 className="modal-title mb-5">Tables:</h2>
        {/* {
          sourceTables.map(it => {
            return (
              <div>
                <p>{it}</p>
                </div>
            )
          })
        } */}

        {
          mapDataSource.map((it, index) => {
            let {
              tables,
              documentId,
              collectionName
            } = it
            return (
              <div className="d-flex align-items-center mb-4 row">
                <div className="col-4">
                  <MultiSelect
                    options={sourceTables}
                    value={tables}
                    onChange={(e) => {
                      onChangeMapData(e, index, "tables")
                    }}
                  />
                </div>
                <div className="col-3">
                  <DropDownComponent
                    options={collectionData}
                    borderGreen
                    value={collectionName}
                    onChange={(e) => {
                      onChangeMapData(e, index, "collectionName")
                    }}
                    placeholder="Collection Name"
                  />
                </div>
                <div className="col-3">
                  <DropDownComponent
                    options={documentIdData}
                    borderGreen
                    disabled={tables.length > 1}
                    value={documentId}
                    onChange={(e) => {
                      onChangeMapData(e, index, "documentId")
                    }}
                    placeholder={tables.length <= 1 ? "Document id" : "Auto Generated GUID"}
                  />
                </div>

                <div className="col-1">
                  <div className="row gap-2">
                    <div className="col-1"  onClick={() => onClickEyeIcon(it)}><img className="eye-icon" src={assets.Icons.eye} /></div>
                    {mapDataSource.length > 1 && <div className="col-1"  onClick={() => onClickDeleteIcon(index)}><img className="eye-icon" src={assets.Icons.close} /></div>}
                  </div>
                </div>

              </div>
            )
          })
        }
        <div className="row">
          <div className="col-3">
            <SecondaryButton label={'Add New'} icon={assets.Icons.edit} onClick={onClickAddNew} />
          </div>
        </div>
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-3">
            <SecondaryButton label={'Cancel'} className="secondary-button-add" />
          </div>
          <div className="col-3">
            <PrimaryButton label={'Map'} className="secondary-button-add" />
          </div>
        </div>


      </div>

      <ModalComponent show={selectedJsonData != null} setModal={(e) => {
        if (!e) {
          setSelectedJsonData(null)
        }
      }}>
        <img src={assets.Icons.close} className="close-icon" onClick={() => setSelectedJsonData(null)} />
        {/* <pre className="json-data">{selectedJsonData ? JSON.stringify(selectedJsonData, null, 4) : ''}</pre> */}
        <JSONTree data={selectedJsonData} theme={theme} invertTheme={false}  shouldExpandNodeInitially={shouldExpandNodeInitially} />

      </ModalComponent>

    </>
  );
};

export default AddReplication;